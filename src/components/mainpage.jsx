import React, {Component} from 'react'
import {observable, action} from 'mobx'
import {observer} from 'mobx-react'

@observer
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
        return (
            <div>
                <div>
                    Todo List
                </div>
                <input
                    type = 'text'
                    value={this.newTitle}
                    onChange={this.handleInputTitle}
                />
                <div onClick={this.handleAddItem}>Add One Todo Item</div>
                <ul>
                    {
                        this.props.store.todos.map(item => {
                            return (<li key={item.title}>
                                        {item.title}
                                    <div onClick={() => {this.props.store.deleteTodo(item.title)}}>X</div>
                            </li>)
                        })
                    }
                </ul>
            </div>
        )
    }
}
