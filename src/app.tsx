import React from 'react'
import { Settings } from './settings'
import { Graph, Addon, Shape } from '@antv/x6'
import './app.css'

const { Stencil } = Addon
const { Rect, Circle } = Shape

export default class Example extends React.Component {
    private container: HTMLDivElement
    private stencilContainer: HTMLDivElement
    private graph: Graph

    componentDidMount() {
        this.graph = new Graph({
            container: this.container,
            grid: true,

            snapline: {
                enabled: true,
                sharp: true,
            },
            scroller: {
                enabled: true,
                pannable: true,
            },
            mousewheel: {
                enabled: true,
                modifiers: ['ctrl', 'meta'],
            },
            connecting: {
                snap: true,
              }
        })
        const source = this.graph.addNode({
            x: 130,
            y: 30,
            width: 100,
            height: 40,
            attrs: {
                label: {
                    text: 'Hello',
                    fill: '#6a6c8a',
                },
                body: {
                    stroke: '#31d0c6',
                },
            },
        })

        const target = this.graph.addNode({
            x: 320,
            y: 240,
            width: 100,
            height: 40,
            attrs: {
                label: {
                    text: 'World',
                    fill: '#6a6c8a',
                },
                body: {
                    stroke: '#31d0c6',
                },
            },
        })

        this.graph.addEdge({ source, target })


        // 内容居中
        this.graph.centerContent()

        const stencil = new Stencil({
            title: '工具',
            target: this.graph,
            search(cell, keyword) {
                return cell.shape.indexOf(keyword) !== -1
            },
            placeholder: '搜索形状名',
            notFoundText: '没有找到输入的形状',
            collapsable: true,
            stencilGraphWidth: 350,
            stencilGraphHeight: 180,
            groups: [
                {
                    name: 'group1',
                    title: '分组1',
                    collapsable: true
                }
            ],
        })

        this.stencilContainer.appendChild(stencil.container)

        Shape.Rect.define({
            shape: 'custom-rect',
            width: 160, // 默认宽度
            height: 160, // 默认高度
            magnet: true,
            ports: [
                {
                    id: 'port1',
                    attrs: {
                      circle: {
                        r: 6,
                        magnet: true,
                        stroke: '#31d0c6',
                        strokeWidth: 2,
                        fill: '#fff',
                      },
                    },
                  }, 
                { id: 'port2' }, 
                { id: 'port3' },
              ],
            attrs: {
              body: {
                // rx: 10, // 圆角矩形
                // ry: 10,
                strokeWidth: 1,
                fill: '#5755a1',
                stroke: '#5755a1',
              },
              label: {
                fill: '#fff',
                fontSize: 18,
                refX: 10, // x 轴偏移，类似 css 中的 margin-left
                textAnchor: 'left', // 左对齐
              },
             
            },
          })

          this.graph.addNode({
            x: 100,
            y: 60,
            shape: 'custom-rect',
            label: 'My Custom Rect', // label 继承于基类的自定义选项
          });
        
        const r = new Rect({
            width: 100,
            height: 50,
            attrs: {
                rect: { stroke: '#a6c4ff', strokeWidth: 1 },
                text: { text: '流程节点', fill: 'black' },
            },
        })


        const c2 = new Circle({
            width: 80,
            height: 80,
            attrs: {
                circle: {  'stroke-width': 1, stroke: '#a6c4ff' },
                text: { text: '链接节点', fill: 'black' },
            },
        })

        const r2 = new Rect({
            width: 100,
            height: 50,
            attrs: {
                body: {
                    rx: 25,
                    ry: 25,
                  },
                rect: { fill: '#fff', stroke: '#a6c4ff', strokeWidth: 1 },
                text: { text: '起始节点', fill: 'black' },
            },
        })



        stencil.load([r, c2, r2.clone()], 'group1')
    }

    refContainer = (container: HTMLDivElement) => {
        this.container = container
    }

    refStencil = (container: HTMLDivElement) => {
        this.stencilContainer = container
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
                <h1 className="navTitle">流程图</h1>
                <div className="app">
                    <div className="app-stencil" ref={this.refStencil} />
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
