import React from 'react'
import { Graph, Addon } from '@antv/x6'
import '../../css/el.css'
const { Dnd } = Addon



export default class Example extends React.Component {
  private graph: Graph
  private dnd: any
  container: HTMLDivElement

  componentDidMount() {
    console.log(document.querySelector('.app-content') as HTMLDivElement);

    const graph = new Graph({
      container: document.querySelector('.app-content') as HTMLDivElement,
      grid: true,
      history: true,
      snapline: {
        enabled: true,
        sharp: true,
      },
      scroller: {
        enabled: true,
        pannable: true,
      },
      minimap: {
        container: document.querySelector('.map') as HTMLDivElement,
        enabled: true,
        width: 400,   
        height: 400,
      },
      mousewheel: {
        enabled: true,
        modifiers: ['ctrl', 'meta'],
      },
      connecting: {
        snap: true,
      }
    })
    
   
    Graph.registerNode(
      'my-rect',
      {
        inherit: 'rect',
        width: 120,
        height: 50
      },
      true,
    )
    graph.centerContent()
    this.dnd = new Dnd({
      target: graph,
      scaled: false,
      animation: true
    })
    this.graph = graph

    // 节点删除功能
    graph.on('node:mouseenter', ({ node }) => {
      node.addTools({
        name: 'button-remove',
        args: {
          rotate: true,
          x: '100%',
          y: 0,
          offset: { x: -10, y: 10 },
        },
      })
    })
    graph.on('node:mouseleave', ({ node }) => {
      node.removeTools()
    })
  }

  startDrag = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = e.currentTarget
    const type = target.getAttribute('data-type')!
    const curStage = ['cs', 'fs', 'js'].indexOf(type) + 1
    const curDate = ['start', 'end'].indexOf(type) + 1
    const stages = ['初赛', '复赛', '决赛']

    const date = ['开始', '结束']
    const node =
      curStage
        ? this.graph.createNode({
          width: 100,
          height: 50,
          shape:'my-rect',
          attrs: {
            label: {
              text: stages[curStage - 1],
              fill: '#6a6c8a',
            },
            body: {
              stroke: '#108ee9',
              strokeWidth: 1,
              ry: 10,
              rx: 10
            }
          },
          ports:{
              items: [
                { group: 'in', id: 'in1' },
                { group: 'in', id: 'in2' },
                { group: 'out', id: 'out1' },
                { group: 'out', id: 'out2' },
              ],
              groups: {
                in: {
                  position: { name: 'top' },
                  zIndex: 1,
                  attrs: {
                    circle: {
                      r: 4,
                      magnet: true,
                      stroke: '#108ee9',
                      strokeWidth: 1,
                      fill: '#fff',
                    },
                  },
                },
                out: {
                  position: { name: 'bottom' },
                  zIndex: 1,
                  attrs: {
                    circle: {
                      r: 4,
                      magnet: true,
                      stroke: '#108ee9',
                      strokeWidth: 1,
                      fill: '#fff',
                    },
                  },
                },
              }
          }
        })
        : this.graph.createNode({
          width: 60,
          height: 60,
          shape: 'html',
          ports:{
            items: [
              { group: 'in', id: 'in1' },
              { group: 'out', id: 'out1' },
            ],
            groups: {
              in: {
                position: 'top',
                zIndex: 10,
                attrs: {
                  circle: {
                    r: 4,
                    magnet: true,
                    stroke: '#108ee9',
                    strokeWidth: 1,
                    fill: '#fff',
                  },
                },
              },
              out: {
                position: 'bottom',
                zIndex: 10,
                attrs: {
                  circle: {
                    r: 4,
                    magnet: true,
                    stroke: '#108ee9',
                    strokeWidth: 1,
                    fill: '#fff',
                  },
                },
              },
            }
          },
          html: () => {
            const wrap = document.createElement('div')
            wrap.style.width = '100%'
            wrap.style.height = '100%'
            wrap.style.display = 'flex'
            wrap.style.alignItems = 'center'
            wrap.style.justifyContent = 'center'
            wrap.style.border = '1px solid #108ee9'
            wrap.style.background = '#fff'
            wrap.style.borderRadius = '100%'
            wrap.innerText = date[curDate - 1]
            return wrap
          },
        })
    this.dnd.start(node, e.nativeEvent as any)
  }

  render() {
    return (
      <div>
        <div className="dnd-wrap">
          <div
            data-type="cs"
            className="dnd-rect"
            onMouseDown={this.startDrag}
          >
            初赛
          </div>

          <div
            data-type="fs"
            className="dnd-rect"
            onMouseDown={this.startDrag}
          >
            复赛
          </div>


          <div
            data-type="js"
            className="dnd-rect"
            onMouseDown={this.startDrag}
          >
            决赛
          </div>


          <div
            data-type="start"
            className="dnd-circle"
            onMouseDown={this.startDrag}
          >
            开始
          </div>

          <div
            data-type="end"
            className="dnd-circle"
            onMouseDown={this.startDrag}
          >
            结束
          </div>
        </div>
      </div>
    )
  }
}
