import { IStage} from '../app'
import { ADD_DRAG_LIST,SET_CURSTAGE } from './constants'

const addDragList = (data:IStage) => ({type:ADD_DRAG_LIST,data})
const handleStage = (data:IStage) => ({type:SET_CURSTAGE,data})
export {
    addDragList, // 保存添加到屏幕的节点
    handleStage // 编辑选中的节点
}