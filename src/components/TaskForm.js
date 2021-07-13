import React, { Component } from 'react'

class TaskForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: '',
      name: '',
      status: false,
    }
  }

  componentWillMount() {
    if (this.props.task) {
      this.setState({
        id: this.props.task.id,
        name: this.props.task.name,
        status: this.props.task.status,
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.task) {
      this.setState({
        id: nextProps.task.id,
        name: nextProps.task.name,
        status: nextProps.task.status,
      })
    } else if (!nextProps.task) {
      this.setState({
        id: '',
        name: '',
        status: false,
      })
    }
  }

  onCloseForm = () => {
    this.props.onCloseForm()
  }

  onSubmit = (event) => {
    event.preventDefault()
    this.props.onSubmit(this.state)
    // Todo Cancel input and Close form
    this.onCancel()
    this.onCloseForm()
  }

  onChangeForm = (event) => {
    let target = event.target
    let name = target.name
    let value = target.value
    if (name === 'status') {
      value = target.value === 'true'
    }
    this.setState({
      [name]: value,
    })
  }

  onCancel = () => {
    this.setState({
      name: '',
      status: false,
    })
  }

  render() {
    let { id } = this.state
    return (
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">
            {id !== '' ? 'Update Job' : 'Add job'}
            <span onClick={this.onCloseForm} style={{ marginLeft: '12rem' }}>
              <i className="fa fa-times" aria-hidden="true" />
            </span>
          </h3>
        </div>
        <div className="card-body">
          <form onSubmit={this.onSubmit}>
            <div className="form-group mb-3">
              <label>Name :</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={this.state.name}
                onChange={this.onChangeForm}
              />
            </div>
            <div className="mb-3">
              <label>Status</label>
              <select
                className="form-control"
                required="required"
                name="status"
                value={this.state.status}
                onChange={this.onChangeForm}
              >
                <option value={true}>Active</option>
                <option value={false}>Un Active</option>
              </select>
            </div>
            <br />
            <div className="text-center">
              <button type="submit" className="btn btn-success">
                Confirm
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-danger"
                onClick={this.onCancel}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default TaskForm
