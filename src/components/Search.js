import React, { Component } from 'react'

class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      keyword: '',
    }
  }

  onChange = (event) => {
    let target = event.target
    let name = target.name
    let value = target.value

    this.setState({
      [name]: value,
    })
  }

  onSearch = () => {
    this.props.onSearch(this.state.keyword)
  }

  render() {
    let { keyword } = this.state
    return (
      <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
        <div className="input-group mb-3">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            name="keyword"
            value={keyword}
            onChange={this.onChange}
          />
          <button
            className="btn btn-outline-success"
            type="button"
            onClick={this.onSearch}
          >
            Search
          </button>
        </div>
      </div>
    )
  }
}

export default Search
