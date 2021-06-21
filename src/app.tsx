import React from 'react'
import NavMenu from './conpoments/NavMenu/menu'
import Settings from './conpoments/Settings/settings'
import Element from './conpoments/El/el'

import { Graph } from '@antv/x6'
import './css/app.css'


export default class App extends React.Component {
    container: HTMLDivElement
    private graph: Graph

    componentDidMount() {
    }

   
    
    refContainer = (container: HTMLDivElement) => {
        this.container = container
    }

    /**
     * 
     * @callback onGridChanged 绘制网格
     * @callback onGridSizeChanged 修改网格大小
     * @callback onBackgroundChanged  修改背景
     * 
     */

    onGridChanged = (options: any) => {
        this.graph.drawGrid(options)
    }

    onGridSizeChanged = (size: number) => {
        this.graph.setGridSize(size)
    }
    onBackgroundChanged = (options: Graph.BackgroundManager.Options) => {
        this.graph.drawBackground(options)
    }

    render() {
        return (
            <div>
                <NavMenu />
                <div className="app">
                    <div className="app-stencil">
                         <Element />
                    </div>
                    <div className="app-content" ref={this.refContainer} />
                    <Settings
                        onTypeChange={this.onGridChanged}
                        onGridSizeChange={this.onGridSizeChanged}
                        onBackgroundChanged={this.onBackgroundChanged} />
                </div>
            </div>
        )
    }
}
