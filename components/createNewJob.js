import React, { useState } from 'react'
import { Button, Row, Col, Card } from 'antd'
import { Input, Select } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { MainContext, useContext } from '../src/context'

const { Option } = Select

export default function CreateNewJob() {

    const { priorities, insertJob } = useContext(MainContext)

    const [newJobName, setNewJobName] = useState('')
    const [newJobPriority, setNewJobPriority] = useState({})

    const handlePriorityChange = (value) => {
        if (value === null) {
            return
        }
        const priorityLevel = value
        const filteredPriority = priorities.filter(entry =>
            entry.id === priorityLevel
        )[0]
        setNewJobPriority(filteredPriority)
    }
    
    return (
        <div className="newJobComponent">
            <h4 className="componentHeader">Create New Job</h4>
            <div className="newJobForm">

                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} align="bottom">
                    <Col flex="1 1 200px">
                        <p className="inputLabel">Job Name</p>
                        <Input
                            className="newJobName"
                            size="medium"
                            placeholder="Job Name"
                            maxLength={255}
                            onChange={e => setNewJobName(e.target.value)}
                        />
                    </Col>
                    <Col flex="1 1 200px">
                        <p className="inputLabel">Job Priority</p>
                        <Select
                            placeholder="Priority"
                            className="newJobPriority"
                            onChange={handlePriorityChange}
                            style={{ width: '100%' }}
                        >
                            {priorities.map((priority) => {
                                return (<Option key={priority.id} value={priority.id}>{priority.label}</Option>)
                            })}
                        </Select>
                    </Col>
                    <Col flex="1 1 200px">
                        <Button
                            type="primary"
                            className="createNewJob"
                            onClick={() => insertJob(newJobName, newJobPriority)}
                            disabled={!newJobName || Object.keys(newJobPriority).length === 0}
                            style={{ width: '100%' }}
                        >
                            <PlusOutlined /> Create
                        </Button>
                    </Col>
                </Row>
            </div>
            <style jsx>{`
                .newJobComponent{
                    margin-bottom: 20px;
                }
                .componentHeader {
                    font-size: 20px; 
                    margin-bottom: 10px;
                    font-weight: 600;
                }
                .inputLabel {
                    margin-bottom: 0;
                    font-size: 14px;
                    color: var(--labelColor);
                }
            `}</style>
        </div>
    )
}