import React, { Component } from 'react'
import MiniMap from './miniMap'
import '../../css/changeNode.css'
import { Card,  Input  } from 'antd';

export default class ChangeNode extends Component {
    render() {
        return (
            <div className="edit-container">
                <div className="edit">
                    <Card title="编辑" bordered={false} style={{margin: '0 auto'}}>
                        <Input />
                    </Card>
                </div>
               <MiniMap />
            </div>
        )
    }
}
