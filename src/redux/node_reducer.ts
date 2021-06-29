import { ADD_DRAG_LIST } from './constants'
import { Stages } from '../app'

export interface Action {
    type: string,
    data: any
}
const initState:Stages = {
    stages:[{
        id: 'stage1',
        kind: "stage1",
        name: '初赛',
        isFinal: false,
        qualifyTeamsCount : 16
      },
      {
        id: 'stage2',
        kind: "stage2",
        name: '复赛',
        isFinal: false,
        qualifyTeamsCount : 4
      },
      {
        id: 'stage3',
        kind: "stage3",
        name: '决赛',
        isFinal: true,
        qualifyTeamsCount : 10
      },
      {
        id:'start',
        kind: "start",
        name: "开始"
      },
      {
        id:'end',
        kind: "end",
        name: "结束"
      }],
    dragList: [],
    curStage:{}, 
    cell:null
}


function nodeReducer(state = initState, action : Action) : any {
    const { type , data } = action
    switch (type) {
        case ADD_DRAG_LIST:
            return [data,...state.dragList]
        default:
            break;
    }
}
export default nodeReducer 