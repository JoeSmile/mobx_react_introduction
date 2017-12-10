import React from 'react'
import {render} from 'react-dom'
import DevTools from 'mobx-react-devtools'
import { Provider } from 'mobx-react'
// page
import MainPage from './components/mainpage'
import ASync from './components/async'

//store
import UIStore from './store/UIStore'
import AsyncStore from './js/async'
import RootStore from './store/rootStore'

// 不联合的写法
const _store = new UIStore()
_store.init()

const _asyncStore = new AsyncStore(_store)

// render(
//     <div>
//         <MainPage store={_store}/>
//         <ASync store={_asyncStore}/>
//         <DevTools/>
//     </div>,
//     document.getElementById('root')
// )

render(
        <div>
            <Provider store = {(new RootStore()).UIStore}>
                <MainPage />
            </Provider>
            <ASync store={_asyncStore}/>
            <DevTools/>
        </div>
    ,
    document.getElementById('root')
)
