import UIStore from './UIStore'
import AsyncStore from '../js/async'

export default class RootStore {
    constructor() {
        this.UIStore = new UIStore()
        this.AsyncStore = new AsyncStore(this.UIStore)
    }
}