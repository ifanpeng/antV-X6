import React from 'react'
import { connect } from 'react-redux'
import { Graph, Addon } from '@antv/x6'
import '../../css/el.css'
import { IStage } from '../../app'
import { addDragList } from '../../redux/actions/drag'
const { Dnd } = Addon

interface IProps{
  stageList:any,
  curStage:any,
  addDragList: (data:IStage) => void
}


class DragElement extends React.Component<IProps>{
  private graph: Graph
  private dnd: any
  componentDidMount() {
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
        snap: true,  // 开启自动吸附
        allowBlank:false, // 不允许连接到空白处
        allowMulti:'withPort', //  起始和终止节点之间可以创建多条边，但必须要要链接在不同的链接桩上
        allowNode:false, // 是否允许边链接到节点（非节点上的链接桩)
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
    const that = this
    graph.centerContent()
    this.dnd = new Dnd({
      target: graph,
      scaled: false,
      animation: true,
      // 检测节点是否成功放到指定容器
      validateNode(node:any){
        // const idd = 0
        // const { id }  = node.store.data.attrs.body
        that.props.addDragList(that.props.curStage)
       return true
      }
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
    graph.on('node:click', ({cell}) => {
      const { id } = cell.attr().body
      console.log(id)
      
      })
  }
    startDrag = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      const stages  = this.props.stageList
      const target = e.currentTarget
      const type = target.getAttribute('data-type')
      const curStage = stages.find((obj:IStage) => obj.id  === type)
      const node =
      curStage?.hasOwnProperty('isFinal') ? this.graph.createNode({
          width: 100,
          height: 50,
          shape:'my-rect',
          connector: {
            name: 'rounded',
            args: {
              radius: 20
            },
          },
          attrs: {
            label: {
              text: curStage.name,
              fill: '#6a6c8a',
            },
            body: {
              id: curStage.id,
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
                    }
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
          attrs:{
            label: {
              text: curStage?.name,
              fill: '#6a6c8a',
            },
            body: {
              id: curStage?.id,
              stroke: '#108ee9',
              strokeWidth: 1,
              ry: 60,
              rx: 60
            }
          },
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
    
        })
    this.dnd.start(node, e.nativeEvent as any)
  }

  render() {
    return (
      <div>
        <div className="dnd-wrap">
          <div
            data-type="stage1"
            className="dnd-rect"
            onMouseDown={this.startDrag}
          >
            初赛
          </div>

          <div
            data-type="stage2"
            className="dnd-rect"
            onMouseDown={this.startDrag}
          >
            复赛
          </div>


          <div
            data-type="stage3"
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

export default connect(
  (state:any) => ({
    stageList: state.nodeReducer.stages,
    curStage: state.editReducer
  }),
  {
    addDragList
  }
)(DragElement)