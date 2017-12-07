import UIStore from './liststore'
import AsyncStore from './async'

export default class RootStore {
    constructor() {
        this.UIStore = new UIStore()
        this.AsyncStore = new AsyncStore(this.UIStore)
    }
}