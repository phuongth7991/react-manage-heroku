import React, { Component } from 'react'
import { findIndex, filter } from 'lodash'
import './App.css'

import Header from './components/Header'
import TaskForm from './components/TaskForm'
import Control from './components/Control'
import TaskList from './components/TaskList'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tasks: [],
      isDisplayForm: false,
      taskEditing: null,
      filter: {
        name: '',
        status: -1,
      },
      keyword: '',
      sortBy: 'name',
      sortValue: 1,
    }
  }

  componentWillMount() {
    if (localStorage && localStorage.getItem('tasks')) {
      let tasksObj = JSON.parse(localStorage.getItem('tasks'))
      this.setState({
        tasks: tasksObj,
      })
    }
  }

  s4() {
    return Math.floor(1 + Math.random() * 0x10000)
      .toString(16)
      .substring(1)
  }

  generateId() {
    return (
      this.s4() +
      this.s4() +
      this.s4() +
      '-' +
      this.s4() +
      this.s4() +
      '-' +
      this.s4()
    )
  }

  onToggleForm = () => {
    if (this.state.isDisplayForm && this.state.taskEditing !== null) {
      this.setState({
        isDisplayForm: true,
        taskEditing: null,
      })
    } else {
      this.setState({
        isDisplayForm: !this.state.isDisplayForm,
        taskEditing: null,
      })
    }
  }

  onCloseForm = () => {
    this.setState({
      isDisplayForm: false,
    })
  }

  onShowForm = () => {
    this.setState({
      isDisplayForm: true,
    })
  }

  onSubmit = (data) => {
    let { tasks } = this.state
    if (data.id === '') {
      data.id = this.generateId()
      tasks.push(data)
    } else {
      let index = this.findIndex(data.id)
      tasks[index] = data
    }
    this.setState({
      tasks: tasks,
      taskEditing: null,
    })
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }

  onUpdateStatus = (id) => {
    let { tasks } = this.state
    // let index = this.findIndex(id)
    let index = findIndex(tasks, (task) => {
      return task.id === id
    })
    if (index !== -1) {
      tasks[index].status = !tasks[index].status
      this.setState({
        tasks: tasks,
      })
    }
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }

  onDelete = (id) => {
    let { tasks } = this.state
    let index = this.findIndex(id)
    if (index !== -1) {
      tasks.splice(index, 1)
      this.setState({
        tasks: tasks,
      })
    }
    localStorage.setItem('tasks', JSON.stringify(tasks))
    this.onCloseForm()
  }

  onUpdate = (id) => {
    let { tasks } = this.state
    let index = this.findIndex(id)
    let taskEditing = tasks[index]
    this.setState({
      taskEditing: taskEditing,
    })
    this.onShowForm()
  }

  findIndex = (id) => {
    let { tasks } = this.state
    let result = -1
    tasks.forEach((task, index) => {
      if (task.id === id) result = index
    })
    return result
  }

  onFilter = (filterName, filterStatus) => {
    filterStatus = parseInt(filterStatus, 10)
    this.setState({
      filter: {
        name: filterName.toLowerCase(),
        status: filterStatus,
      },
    })
  }

  onSearch = (keyword) => {
    this.setState({
      keyword: keyword,
    })
  }

  onSort = (sortBy, sortValue) => {
    this.setState({
      sortBy: sortBy,
      sortValue: sortValue,
    })
  }

  render() {
    let {
      tasks,
      isDisplayForm,
      taskEditing,
      // filter,
      keyword,
      sortBy,
      sortValue,
    } = this.state

    // if (filter) {
    //   if (filter.name) {
    //     tasks = tasks.filter((task) => {
    //       return task.name.toLowerCase().indexOf(filter.name) !== -1
    //     })
    //   }
    //   tasks = tasks.filter((task) => {
    //     if (filter.status === -1) {
    //       return task
    //     } else {
    //       return task.status === (filter.status === 1)
    //     }
    //   })
    // }

    if (keyword) {
      // tasks = tasks.filter((task) => {
      //   return task.name.toLowerCase().indexOf(keyword) !== -1
      // })
      // Todo: use lodash to control business
      tasks = filter(tasks, (task) => {
        return task.name.toLowerCase().indexOf(keyword.toLocaleString()) !== -1
      })
    }

    if (sortBy === 'name') {
      tasks.sort((a, b) => {
        if (a.name > b.name) return sortValue
        else if (a.name < b.name) return -sortValue
        else return 0
      })
    } else {
      tasks.sort((a, b) => {
        if (a.status > b.status) return -sortValue
        else if (a.status < b.status) return sortValue
        else return 0
      })
    }

    let elmTaskForm =
      isDisplayForm === true ? (
        <TaskForm
          onCloseForm={this.onCloseForm}
          onSubmit={this.onSubmit}
          task={taskEditing}
        />
      ) : (
        ''
      )
    return (
      <div>
        <Header />
        <div className="container">
          <div className="text-center text-uppercase my-3">
            <h2>To do list</h2>
            <hr />
          </div>
          <div className="row">
            <div
              className={
                isDisplayForm === true
                  ? 'col-xs-4 col-sm-4 col-md-4 col-lg-4'
                  : ''
              }
            >
              {elmTaskForm}
            </div>
            <div
              className={
                isDisplayForm === true
                  ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8'
                  : 'col-xs-12 col-sm-12 col-md-12 col-lg-12'
              }
            >
              <div>
                <button
                  type="button"
                  className="btn btn-outline-primary me-2"
                  onClick={this.onToggleForm}
                >
                  <span className="fa fa-plus me-2" />
                  Add
                </button>
              </div>
              <Control
                onSearch={this.onSearch}
                onSort={this.onSort}
                sortBy={sortBy}
                sortValue={sortValue}
              />
              <TaskList
                tasks={tasks}
                onUpdateStatus={this.onUpdateStatus}
                onDelete={this.onDelete}
                onUpdate={this.onUpdate}
                onFilter={this.onFilter}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
