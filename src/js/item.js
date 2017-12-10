import  {observable} from 'mobx'

export default class TodoItem {
    id = Math.ceil(Math.random() * 100)
    @observable title
    @observable finished = false

    constructor(title) {
        this.title = title
    }
}