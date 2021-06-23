import React, { Component } from 'react'
import MiniMap from './miniMap'
import '../../css/changeNode.css'
import { Card, Input, Switch, Form } from 'antd';

export default class ChangeNode extends Component {
   formRef:any = React.createRef()
    state = {
        id: "stage1",
        stages: [
            {
                kind: 'start',
                name: '初赛',
                id: 'stage1',
                isFinal: true,
                qualifyTeamsCount: 10
            },
            {
                kind: 'rematch',
                name: '复赛',
                id: 'stage2',
                isFinal: false,
                qualifyTeamsCount: 10
            },
            {
                kind: 'end',
                name: '决赛',
                id: 'stage3',
                isFinal: false,
                qualifyTeamsCount: 10
            }
        ],
        // 当前阶段
        curStage: {
            kind: '未知',
            name: '未知',
            id: '',
            isFinal: false,
            qualifyTeamsCount: 10
        },
    }
    componentDidMount() {
        const { stages, id } = this.state
        const curStage = stages.find(obj => id === obj.id)
        this.formRef.current.setFieldsValue(curStage)
        this.setState({ curStage })
    }

    onChangedFinal = (e: boolean) => {
        this.formRef.current.resetFields(['qualifyTeamsCount'])
        this.setFrom('isFinal',e)
    }
    onChangedCount = (e:any) => {
        if(/[^\d]/g.test(e.target.value)) return this.formRef.current.resetFields(['qualifyTeamsCount'])
        this.setFrom('qualifyTeamsCount',e.target.value * 1)
    }
    setFrom = (key:string, value:any) => {
        const curStage = Object.assign({}, this.state.curStage, { [key]: value })
        this.formRef.current.setFieldsValue(curStage)
        this.setState({curStage})
    }
  
    render() {
        const { curStage } = this.state
      
        return (
            <div className="edit-container">
                <div className="edit">
                    <Card title="编辑" bordered={false} style={{ margin: '0 auto' }}>
                        <Form
                        ref={this.formRef}
                        initialValues={curStage}
                        >
                            <Form.Item
                                label="Kind："
                                name="kind"
                            >
                                <Input  />
                            </Form.Item>
                            <Form.Item
                                label="Name"
                                name="name"
                            >
                               <Input  />
                            </Form.Item>
                            <Form.Item
                                label="isFinal："
                                name="isFinal"
                            >
                                <Switch onChange={this.onChangedFinal} checked={curStage.isFinal} />
                            </Form.Item>
                            <Form.Item
                                label="qualifyTeamsCount："
                                name="qualifyTeamsCount"
                                rules={[{ required: curStage.isFinal, message: '必填项' }]}
                            >
                                <Input onChange={this.onChangedCount} />
                            </Form.Item>
                        </Form>
                    </Card>
                </div>
                <MiniMap />
            </div>
        )
    }
}
