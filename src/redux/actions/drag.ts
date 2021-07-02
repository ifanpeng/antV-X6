import { IStage } from '../../app'
import { ADD_DRAG_LIST } from '../constant'

const addDragList = (data:IStage) => ({type:ADD_DRAG_LIST,data})
export {
    addDragList // 保存添加到屏幕的节点
}