import Head from 'next/head'
import Header from '../components/header'
import Footer from '../components/footer'
import CreateNewJob from '../components/createNewJob'
import JobList from '../components/jobList'
import {notification} from 'antd'
import React, { useEffect, useState } from 'react'
import { MainContext } from '../src/context.js'

const defaultPriorities = [
  {
    id: 1,
    label: "Urgent",
    bgColor: "#bb2124"
  },
  {
    id: 2,
    label: "Regular",
    bgColor: "#f0ad4e"
  },
  {
    id: 3,
    label: "Trivial",
    bgColor: "#5bc0de"
  }
]

export default function Home() {
  const [tableData, setTableData] = useState([])
  const [priorities, setPriorities] = useState([])

  useEffect(() => {
    getLocalData()
    fetchPriorities()
  }, [])

  useEffect(() => {
    setLocalData(tableData)
  },[tableData])

  const fetchPriorities = () => {
    fetch("http://localhost:3001/api/priorities").then((response) => {
      if (response.ok) {
        return response.json()
      }
      throw new Error('Something went wrong')
    })
    .then((responseJson) => {
      setPriorities(responseJson)
    })
    .catch((error) => {
      notification.open({
        message: 'Fetch Failed!',
        description:
          'Priority fetch failed. Priorities were set manually.',
      })
    })
    setPriorities(defaultPriorities)
  }

  const getLocalData = () => {
    const localData = localStorage.getItem('localData') 
    localData === "null" ? setTableData([]) : setTableData(JSON.parse(localData))
  }

  const setLocalData = (data) => {
    localStorage.setItem('localData', JSON.stringify(data))
  }

  const insertJob = (jobName, jobPriority) => {
    const newJob = {
      key: Date.now(),
      name: jobName,
      priority: jobPriority
    }
    console.log(tableData,newJob)
    setTableData([...tableData, newJob])
  }

  const editJob = (record) => {
    const newTableData = tableData.map(obj => {
      if (obj.key === record.key) {
        return { ...obj, priority: record.priority }
      }
      return obj
    })
    setTableData(newTableData)
  }

  const deleteJob = (record) => {
    console.log(record)
    const newTableData = tableData.filter(obj => obj.key !== record.key)
    setTableData(newTableData)
  }

  const contextData = {
    priorities,
    tableData,
    insertJob,
    editJob,
    deleteJob
  }

  return (
    <MainContext.Provider value={contextData} style={{ height: '100%' }}>
      <Head>
        <title>Kişisel İş Takip Uygulaması</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <Header />
      </header>
      <main>
        <CreateNewJob />
        <JobList />
      </main>
      <footer>
        <Footer />
      </footer>

      <style jsx>{`
        main {
          
          margin: 0 auto;
          padding: 15px 20px 50px 20px;
        }
        footer {
          position: fixed;
          left: 0;
          bottom: 0;
          width: 100%;
        }
`}</style>
    </MainContext.Provider>
  )
}
