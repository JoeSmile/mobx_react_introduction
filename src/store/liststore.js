import { observable, computed, action, autorun } from 'mobx'
import TodoItem from './item'
export default class TodoListModel {
    @observable todos = []
    @observable price = 0
    @observable amount = 1
    @observable listLenght = 0
    
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

        this.listLenght = this.todos.length
    }

    
    @action
    addTodo(title) {
        this.todos.push(new TodoItem(title))
        this.listLenght = this.todos.length
    }

    @action
    deleteTodo(title){
        for (let i = 0; i < this.todos.length; i++) {
            if (this.todos[i].title === title) {
                this.todos.splice(i,1)
                break
            }
        }
        this.listLenght = this.todos.length
    }

    //注意: action.bound 不要和箭头函数一起使用；箭头函数已经是绑定过的并且不能重新绑定。
    @action.bound
    increment() {
        this.listLenght ++
    }

    @computed get total() {
        return this.price * this.amount;
    }

    @computed get getLength() {
        return  this.listLenght
    }

    set total(value) {
        this.amount = Mail.ceil(value / this.price)
    }

    printLog = autorun(() => console.log('autorun:',this.listLenght))
}