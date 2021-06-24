import React, { Component } from 'react'
import MiniMap from './miniMap'
import '../../css/changeNode.css'
import { Card, Input, Switch, Form,Empty  } from 'antd';

interface IProps{
    curStage:any,
    cell:any,
    handleStage:(key:string,value:any) => void
}

export default class ChangeNode extends Component<IProps> {
    formRef:any = React.createRef()
    componentDidUpdate(){
        const { curStage } = this.props
        this.formRef.current.setFieldsValue(curStage)
    }
    // 初始化form表单
    setFrom = (key:string, value:any) => {
        const curStage = Object.assign({}, this.props.curStage, { [key]: value })
        this.formRef.current.setFieldsValue(curStage)
        this.setState({curStage})
    }
    // 修改是否必填
    onChangedFinal = (key:string) => {
       return (e: boolean) => {
        this.formRef.current.resetFields(['qualifyTeamsCount'])
        this.setFrom('isFinal',e)
        this.props.handleStage(key,e)
       }
    }
    // 修改符合要求的战队数量
    onChangedCount = (key:string) => {
       return (e:any) => {
            if(/[^\d]/g.test(e.target.value)) return this.formRef.current.resetFields(['qualifyTeamsCount'])
            this.setFrom('qualifyTeamsCount',e.target.value * 1)
            this.props.handleStage(key,e.target.value )
       }
    }
   
    // 修改name
    onChangeName = (key:string) => {
       return (e:any) => {
        this.props.handleStage(key,e.target.value )
        this.props.cell.attr({
            label: { 
                text: e.target.value 
            }
          })
       }
    }
    render() {
        const { curStage } = this.props
        const isShow = JSON.stringify(curStage) === '{}'
        return (
            <div className="edit-container">
                <div className="edit">
                    <Card title="编辑" bordered={false} style={{ margin: '0 auto' }}>
                            <Form
                            style={{display: isShow ? 'none' :  'block'}}
                              ref={this.formRef}
                              initialValues={curStage}
                              >
                                <Form.Item
                                    label="Kind："
                                    name="kind"
                                >
                                    <Input disabled />
                                </Form.Item>
                                <Form.Item
                                    label="Name"
                                    name="name"
                                >
                                   <Input onChange={this.onChangeName('name')} />
                                </Form.Item>
                              {
                                curStage.hasOwnProperty('isFinal') ?
                                  <>
                                    <Form.Item
                                    label="isFinal："
                                    name="isFinal"
                                >
                                    <Switch onChange={this.onChangedFinal('isFinal')} checked={curStage.isFinal} />
                                </Form.Item>
                                <Form.Item
                                    label="qualifyTeamsCount："
                                    name="qualifyTeamsCount"
                                    rules={[{ required: curStage.isFinal, message: '必填项' }]}
                                >
                                    <Input onChange={this.onChangedCount('qualifyTeamsCount')} />
                                </Form.Item>
                                  </>
                                  : null
                              }
                            </Form>
                          <Empty style={{display: isShow ? 'block' :  'none'}} description="暂无数据" />
                    </Card>
                </div>
                <MiniMap />
            </div>
        )
    }
}
