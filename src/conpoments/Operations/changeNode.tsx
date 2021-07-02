import React, { Component } from 'react'
import { connect } from 'react-redux'
import MiniMap from './miniMap'
import { editStage } from '../../redux/actions/edit'

import '../../css/changeNode.css'
import { Card, Input, Switch, Form,Empty  } from 'antd';

interface IProps{
    curStage: object|null
}
class ChangeNode extends Component<IProps> {
    formRef:any = React.createRef()
    componentDidUpdate(){
        this.formRef.current.setFieldsValue(this.props.curStage)
    }
    // 初始化form表单
    setFrom = (key:string, value:any) => {
    }
    // 修改是否必填
    onChangedFinal = (key:string) => {
      return () => {}
    }
    // 修改符合要求的战队数量
    onChangedCount = (key:string) => {
       return (e:any) => {
            if(/[^\d]/g.test(e.target.value)) return this.formRef.current.resetFields(['qualifyTeamsCount'])
            this.setFrom('qualifyTeamsCount',e.target.value * 1)
       }
    }
   
    // 修改name
    onChangeName = (key:string) => {
       return (e:any) => {
       
       
       }
    }
    render() {
        const isShow = JSON.stringify(this.props.curStage) === '{}'
        return (
            <div className="edit-container">
                <div className="edit">
                    <Card title="编辑" bordered={false} style={{ margin: '0 auto' }}>
                            <Form
                            style={{display: isShow ? 'none' :  'block'}}
                              ref={this.formRef}
                              initialValues={this.props.curStage!}
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
                                this.props.hasOwnProperty('isFinal') ?
                                  <>
                                    <Form.Item
                                    label="isFinal："
                                    name="isFinal"
                                >
                                    <Switch onChange={this.onChangedFinal('isFinal')} checked={true} />
                                </Form.Item>
                                <Form.Item
                                    label="qualifyTeamsCount："
                                    name="qualifyTeamsCount"
                                    rules={[{ required: false, message: '必填项' }]}
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

export default connect(
    (state:any) => {
        console.log(state);
        
        return {curStage : state.editReducer.curStage}
    },
   {
    editStage
   }
)(ChangeNode)