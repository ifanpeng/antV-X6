import { IStage } from '../../app'
import { EDIT_CURSTAGE } from '../constant'

const editStage = (data:IStage) => ({type:EDIT_CURSTAGE,data})
export {
    editStage // 编辑选中的节点
}