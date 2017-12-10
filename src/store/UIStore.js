import { observable, computed, action, autorun, autorunAsync, Atom, when, toJS } from 'mobx'
import TodoItem from '../js/item'

export default class TodoListModel {
    @observable todos = []
    @observable price = 10
    @observable amount = 1
    @observable listLenght = 0
    @observable asycDoubleLength = 0
    @observable tick = ''

    atom
    intervalHandler
    currentDateTime

    constructor(rootStore) {
        this.rootStore = rootStore

        this.atom = new Atom (
            "Clock",
            // 第二个参数(可选的): 当 atom 从未被观察到被观察时的回调函数
            () => this.startTicking(),
            // 第三个参数(可选的): 当 atom 从被观察到不再被观察时的回调函数
            // 注意同一个 atom 在这两个状态之间转换多次
            () => this.stopTicking()
        )

        when(
            // 一旦...
            () => this.listLenght > 3,
            // ... 然后
            () => console.log('when game over!', toJS(this.todos))
    );
    }

    startTicking() {
        this.tick()
        this.intervalHandler = setInterval(
            () => this.tick(),
            1000
        );
        console.log('clock start running')
    }

    stopTicking() {
        console.log('clock is stopped')
        clearInterval(this.intervalHandler);
        this.intervalHandler = null;
    }

    tick() {
        this.currentDateTime = new Date()
        this.atom.reportChanged()
    }

    getTime() {
        if (this.atom.reportObserved()) {
            return this.currentDateTime;
        } else {
            return new Date();
        }
    }

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
        return this.price * this.listLenght;
    }

    @computed get getLength() {
        return  this.listLenght
    }

    set total(value) {
        this.amount = Mail.ceil(value / this.price)
    }


    stopAutoRun = autorun(() => console.log('autorun:',this.listLenght))

    stopAutorunAsync = autorunAsync(() => {
        this.asycDoubleLength = this.listLenght * 2
        setTimeout(() => {
            console.log("stopAutorunAsync: ",this.asycDoubleLength)
        },200 )
    })
    
}