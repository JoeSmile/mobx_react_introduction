import React from 'react'
import {render} from 'react-dom'
import DevTools from 'mobx-react-devtools'

import MainPage from './components/mainpage'

import mobxStore from './store/liststore'

const store = new mobxStore()
store.init()

render(
    <div>
        <DevTools/>
        <MainPage store={store}/>
    </div>,
    document.getElementById('root')
)

