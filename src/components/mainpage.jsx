import React, {Component} from 'react'
import {observable, action} from 'mobx'
import { observer,Provider, inject } from 'mobx-react'
@inject('store') @observer
export default class MainPage extends React.Component {
    @observable newTitle = ''
  
    @action
    handleInputTitle = (e) => {
        this.newTitle = e.target.value
    }

    @action
    handleAddItem = () => {
        this.props.store.addTodo(this.newTitle)
        this.newTitle = ''
    }

    render() {
        const lenght = this.props.store.getLength
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
                    <span>There are </span>
                    <span>{lenght}</span>
                    <span>lists wait to be solved</span>
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
            </div>
        )
    }
}
