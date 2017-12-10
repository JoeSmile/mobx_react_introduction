import React, {Component} from 'react'
import {observable, action, autorun, extendObservable, intercept} from 'mobx'
import { observer, Provider, inject } from 'mobx-react'

import Clock from '../js/clock'

@inject('store') @observer
export default class MainPage extends React.Component {
    @observable newTitle = ''
    @observable time = ''

    autoTransformFunc
    transformedData

    @action
    handleInputTitle = (e) => {
        this.newTitle = e.target.value
    }

    @action
    handleAddItem = () => {
        this.props.store.addTodo(this.newTitle)
        this.newTitle = ''
    }

    componentDidMount() {
        this.clock = new Clock()
        const disposer = autorun(() => this.time = this.clock.getTime().getSeconds())

        //给UIstore附加一个值
        extendObservable(this.props.store,{
            extendObservableItem: 'xxxxxx'
        })

        // 拦截器修改obsevable的值
        // intercept(this.props.store, 'listLenght', change => {
        //     console.log('intercept:',change.newValue)
        //     change.newValue = 99999
        //     return change
        // })
    }

    render() {
        const { getLength, stopAutoRun }= this.props.store
        return (
            <div>
                <div>
                    Todo List
                </div>
                <div>
                    <input type = 'text' value={this.newTitle} onChange={this.handleInputTitle}/>
                    <span onClick={this.handleAddItem}> ADD </span>
                </div>
                <div>
                    <span>There are  </span>
                    <span>{getLength}</span>
                    <span> lists wait to be solved</span>
                    <span onClick={this.props.store.increment} style={{border: '1px solid black'}}> autorun test </span>
                </div>
                <ul>
                    {
                        this.props.store.todos.map(item => {
                            return (<li key={item.title}>
                                        {item.title}
                                    <span onClick={() => {this.props.store.deleteTodo(item.title)}}> - </span>
                            </li>)
                        })
                    }
                </ul>
                <div onClick={() => stopAutoRun()}>stop auto run</div>
                <div>{'clock is running :' + this.time}</div>

            </div>
        )
    }
}
