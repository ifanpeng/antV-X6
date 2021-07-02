import { EDIT_CURSTAGE } from '../constant'

export interface Action {
    type:string,
    data:object|null
}

const initState = {}

export default function editReducer(state=initState,action:Action) : object {
    const { type,data } = action
    switch (type) {
        case EDIT_CURSTAGE:
            return Object.assign({},state,data)
        default:
           return initState
    }
}


