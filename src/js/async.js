import { observable, action, runInAction} from 'mobx'
import {asyncAction} from 'mobx-utils'

function fakeAsyn(timeout = 3000) {
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            resolve('have done')
        }, timeout);
    })
}

export default class Async {
    @observable statePromise = 'pending' // pending done error
    @observable stateWait = 'pending'
    UIstore

    // 引用另一个store
    // constructor(UIstore) {
    //     this.UIstore = UIstore
    //     console.log('UIStore:', this.UIstore.listLenght)
    // }

    // 联合store
    constructor(rootStore) {
        this.rootStore = rootStore
        this.UIstore = rootStore.UIstore
    }
 
    // 繁琐的方式
    // @action
    // testAsync() {
    //     this.state = 'loading'
    //     fakeAsyn().then(this.testSuccess, this.testError)
    // }

    // @action.bound
    // testSuccess(ret) {
    //     console.log('promiss success')
    //     this.state = 'done'
    // }

    // @action.bound
    // testError(ret) {
    //     console.log('promiss error')
    //     this.statr = 'error'
    // }

    // 推荐的方式
    @action
    testAsync() {
        this.statePromise = 'pending'
        fakeAsyn(2000).then(
            action('testSuccess',ret => {
                this.statePromise = 'done'
            }),
            action('testError', error => {
                this.statePromise = 'error'
            })
        )
    }

    @action
    async testWait() {
        this.stateWait = 'pending'
        try {
            const project = await fakeAsyn(1000)
            runInAction(() => {
                this.stateWait = 'done'
            })
        } catch (error) {
            runInAction(() => {
                this.stateWait = 'error'
            })
        }
    }
}