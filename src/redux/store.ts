import { createStore, combineReducers} from 'redux'
import nodeReducer from './reducers/addNode'
import editReducer from './reducers/editNode'

// 汇总reducer
const AllReducer = combineReducers({
    nodeReducer,
    editReducer
})
export default createStore(AllReducer)