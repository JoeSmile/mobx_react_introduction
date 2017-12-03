import { observable, computed, action } from 'mobx'
import TodoItem from './item'
export default class TodoListModel {
    @observable todos = []

    @action
    init() {
        this.todos = [{
            title: 'one',
            finished: false
        },{
            title: 'two',
            finished: false
        },{
            title: 'three',
            finished: false
        }]
    }

    @action
    addTodo(title) {
        this.todos.push(new TodoItem(title))
    }

    @action
    deleteTodo(title){
        for (let i = 0; i < this.todos.length; i++) {
            if (this.todos[i].title === title) {
                this.todos.splice(i,1)
                break
            }
        }
    }
}