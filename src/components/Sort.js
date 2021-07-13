import React, { Component } from 'react'

class Sort extends Component {
  onClick = (sortBy, sortValue) => {
    this.props.onSort(sortBy, sortValue)
  }

  render() {
    return (
      <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
        <div className="dropdown">
          <button
            className="btn btn-outline-dark dropdown-toggle"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Sort By
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li onClick={() => this.onClick('name', 1)}>
              <a
                className={
                  this.props.sortBy === 'name' && this.props.sortValue === 1
                    ? 'dropdown-item sort-selected'
                    : 'dropdown-item'
                }
                href="/#"
              >
                <span className="me-3">
                  <i className="fa fa-sort-alpha-asc" aria-hidden="true" />
                </span>
                Name A-Z
              </a>
            </li>
            <li onClick={() => this.onClick('name', -1)}>
              <a
                className={
                  this.props.sortBy === 'name' && this.props.sortValue === -1
                    ? 'dropdown-item sort-selected'
                    : 'dropdown-item'
                }
                href="/#"
              >
                <span className="me-3">
                  <i className="fa fa-sort-alpha-desc" aria-hidden="true" />
                </span>
                Name Z-A
              </a>
            </li>
            <hr />
            <li onClick={() => this.onClick('status', 1)}>
              <a
                className={
                  this.props.sortBy === 'status' && this.props.sortValue === 1
                    ? 'dropdown-item sort-selected'
                    : 'dropdown-item'
                }
                href="/#"
              >
                Active
              </a>
            </li>
            <li onClick={() => this.onClick('status', -1)}>
              <a
                className={
                  this.props.sortBy === 'status' && this.props.sortValue === -1
                    ? 'dropdown-item sort-selected'
                    : 'dropdown-item'
                }
                href="/#"
              >
                Un Active
              </a>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

export default Sort
