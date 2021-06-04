import React from 'react'
import { Graph } from '@antv/x6'
import { Settings, Menu } from './settings1'
import './app.css'

export default class Example extends React.Component {
  public container: HTMLDivElement
  private graph: Graph
  componentDidMount() {
    this.graph = new Graph({
      container: this.container,
      grid: {
        visible: true,
      },
      background: { color: '#f0f0f0' }
    })

    const source = this.graph.addNode({
      x: 40,
      y: 40,
      width: 100,
      height: 40,
      label: 'Hello',
    })

    const target = this.graph.addNode({
      x: 200,
      y: 180,
      width: 100,
      height: 40,
      label: 'Grid',
    })

    this.graph.addEdge({
      source,
      target,
    })
  }

  onGridChanged = (options: any) => {
    this.graph.drawGrid(options)
  }

  onGridSizeChanged = (size: number) => {
    this.graph.setGridSize(size)
  }
  onBackgroundChanged = (options: Graph.BackgroundManager.Options) => {
    this.graph.drawBackground(options)
  }

  refContainer = (container: HTMLDivElement) => {
    this.container = container
  }

  render() {
    return (
      <>
        <h1 className="navTitle">流程图</h1>
        <div className="app">
          <Menu refContainer={this.container }  />
          <div className="app-content" ref={this.refContainer} />
          <div className="app-side">
            <Settings
              onChange={this.onGridChanged}
              onGridSizeChange={this.onGridSizeChanged}
              onBackgroundChanged={this.onBackgroundChanged}
            />
          </div>
        </div>
      </>
    )
  }
}
