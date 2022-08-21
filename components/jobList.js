import React, { useState, useEffect } from 'react'
import { Button, Row, Col, Input, Select, Table, Space, Tag, Modal } from 'antd'
import { SearchOutlined, EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { MainContext, useContext } from '../src/context'

const { Option } = Select
const { confirm } = Modal

export default function JobList() {

    const { priorities, tableData, editJob, deleteJob } = useContext(MainContext)


    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: '60%',
            sorter: (a, b) => a.name.localeCompare(b.name)
        },
        {
            title: 'Priority',
            key: 'priority',
            dataIndex: 'priority',
            render: (_, { priority }) => (
                <Tag style={{ width: "100%", textAlign: "center" }} color={priority.bgColor} key={priority.label}>
                    {priority.label}
                </Tag>
            ),
            sorter: (a, b) => b.priority.id - a.priority.id,
            defaultSortOrder: 'ascent'
        },
        {
            title: 'Action',
            key: 'action',
            align: 'right',
            render: (_, record) => (
                <Space size="middle">
                    <Button onClick={() => showEditModal(record)}><EditOutlined /></Button>
                    <Button onClick={() => showConfirm(record)}><DeleteOutlined /></Button>
                </Space>
            ),
        },
    ]

    const [dataSource, setDataSource] = useState(tableData)
    const [searchName, setSearchName] = useState('')
    const [searchTags, setSearchTags] = useState([])
    const [editRecord, setEditRecord] = useState({})
    const [isEditModalVisible, setIsEditModalVisible] = useState(false)

    useEffect(() => {
        setDataSource(tableData)
    }, [tableData])

    const showConfirm = (record) => {
        console.log(record)
        const content = record.name
        confirm({
            title: 'Are you sure you want to delete it?',
            onOk() {
                deleteJob(record)
            },
        })
    }

    const showEditModal = (record) => {
        setEditRecord(record)
        setIsEditModalVisible(true)
    }

    const handleEditModalOk = () => {
        editJob(editRecord)
        setIsEditModalVisible(false)
    }

    const handleEditModalCancel = () => {
        setEditRecord({})
        setIsEditModalVisible(false)
    }

    const handleTagSearchChange = (value) => {
        if (value.length === 0) {
            setDataSource(tableData)
            return
        }
        const currSearchTags = value
        setSearchTags(currSearchTags)
        const filteredData = tableData.filter(entry =>
            currSearchTags.includes(entry.priority.id)
        )
        setDataSource(filteredData)

    }

    const handleNameSearchChange = (e) => {
        const currSearchName = e.target.value.toLowerCase()
        setSearchName(currSearchName)
        const filteredData = tableData.filter(entry =>
            entry.name.toLowerCase().includes(currSearchName)
        )
        setDataSource(filteredData)
    }

    const handleEditJopPriority = (priorityId) => {
        const selectedPriority = priorities.filter(priority => priority.id === priorityId)[0]
        let updatedRecord = { ...editRecord }
        updatedRecord.priority = selectedPriority
        setEditRecord(updatedRecord)
    }

    return (
        <div className="jobListComponent">
            <h4 className="componentHeader">Job List</h4>
            <div className="jobList">
                <div className="searchBar">
                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                        <Col flex="1 1 50%">
                            <Input
                                prefix={<SearchOutlined />}
                                placeholder="Job Name"
                                className="searchJobName"
                                value={searchName}
                                onChange={handleNameSearchChange}
                            />
                        </Col>
                        <Col flex="1 1 50%">
                            <Select
                                mode="multiple"
                                allowClear
                                placeholder="Priority"
                                defaultValue={searchTags}
                                className="searchJobPriority"
                                style={{ width: '100%' }}
                                onChange={handleTagSearchChange}
                            >
                                {priorities.map((priority) => {
                                    return (<Option key={priority.id} value={priority.id}>{priority.label}</Option>)
                                })}
                            </Select>
                        </Col>
                    </Row>
                </div>
                <Row>
                    <Col span={24}>
                        <Table 
                        rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' :  'table-row-dark'}
                        columns={columns} 
                        dataSource={dataSource} 
                        bordered
                        />
                    </Col>

                </Row>
            </div>
            <Modal title="Edit Job Priority" visible={isEditModalVisible} onOk={handleEditModalOk} onCancel={handleEditModalCancel}>
                <Row>
                    <Col span={24} style={{ marginBottom: "10px" }}>
                        <p className="inputLabel">Job Name</p>
                        <Input
                            className="editJobName"
                            value={editRecord.name}
                            disabled
                        />
                    </Col>
                    <Col span={24}>
                        <p className="inputLabel">Job Priority</p>
                        <Select
                            placeholder="Priority"
                            className="editJobPriority"
                            defaultValue={editRecord?.priority?.id}
                            onChange={handleEditJopPriority}
                            style={{ width: '100%' }}
                        >
                            {priorities.map((priority) => {
                                return (<Option key={priority.id} value={priority.id}>{priority.label}</Option>)
                            })}
                        </Select>
                    </Col>
                </Row>
            </Modal>
            <style jsx>{`
            
                .searchBar {
                    padding: 10px;
                    background: var(--tableColor);
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