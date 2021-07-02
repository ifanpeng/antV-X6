import React from 'react'
import NavMenu from './conpoments/NavMenu/menu'
import DragElement from './conpoments/DragElement/drag'
import Operation from './conpoments/Operations/changeNode'

import { Graph } from '@antv/x6'
import './css/app.css'
import 'antd/dist/antd.css';

export interface IStage{
    id: string,
    idd?:string,
    kind:string,
    name: string,
    isFinal?: boolean,
    qualifyTeamsCount? : number
  }

export interface Stages{
    stages?: Array<IStage>,
    curStage?:object,
    cell?:any,
    dragList:Array<IStage>,
 }

export default class App extends React.Component {
    container: HTMLDivElement
    private graph: Graph
    refContainer = (container: HTMLDivElement) => {
        this.container = container
    }
    
    /**
     * 
     * @callback onGridChanged 绘制网格
     * @callback onGridSizeChanged 修改网格大小
     * @callback onBackgroundChanged  修改背景
     * @callback onCheckedStage 当前拖到的元素
     * @callback handleStage 修改节点元素
     */
    onGridChanged = (options: any) =>  this.graph.drawGrid(options)

    onGridSizeChanged = (size: number) => this.graph.setGridSize(size)

    onBackgroundChanged = (options: Graph.BackgroundManager.Options) =>  this.graph.drawBackground(options)

    onCheckedStage = (curStage:object|undefined,cell:any) => this.setState({curStage,cell})

    // 编辑单点点击的节点
    handleStage = (key:string,value:any )=> {
       this.setState((state:any) => {
          return {
            curStage : Object.assign({},state.curStage,{[key]:value})
          }
       })
    }
    // 用来保存新增的节点
    saveDragNode = (node:object|undefined):void =>{
      console.log(node);
      
    
    }
  
    render() {
        /**
         * @children NavMenu 导航条
         * @children DragElement 可拖拽元素
         * @children Operation 编辑功能
         */
        return (
            <div style={{width:'100%'}}>
                <NavMenu />
                <div className="app">
                    <div className="app-stencil">
                         <DragElement  />
                    </div>
                    <div className="app-content" ref={this.refContainer} />
                    <div className="opt">
                        <Operation />
                    </div>
                </div>
            </div>
        )
    }
}
