import React, {Component} from 'react'
import {observable, action} from 'mobx'
import {observer} from 'mobx-react'

@observer
export default class ASync extends React.Component {
    
    componentDidMount() {
        const {store} = this.props
        store.testAsync()
        store.testWait()
    }

    render() {
        const {store} = this.props
        return (
        <div>
            <div>statePromise:{store.statePromise}</div>
            <div>stateWait:{store.stateWait}</div>
        </div>)
    }
}