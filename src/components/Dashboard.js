import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import * as modalActions from '../store/actions/modal';
import axios from 'axios';

class Dashboard extends React.Component {
  state = {
    boards: []
  }
  componentDidMount() {
    this.loadData();
  }
  loadData = () => {
    axios.get('http://localhost:8000/api/boards')
      .then(res => {
        console.log(res)
        this.setState({
          boards: res.data
        })
      })
      .catch(err => {
        console.log(err)
      })
  }
  openModal = () => {
    this.props.openModal()
  }

  deleteBoard = (id) => {
    axios.delete(`http://localhost:8000/api/boards/${id}`)
      .then(res => {
        console.log("borrado exitosamente")
        this.loadData()
      })
      .catch(err => {
        console.log(err)
      })
  }
  render() {
    const content = this.state.boards.map((board) => {
      return (
        <div className="dashboard-board" style={{
          height: '100px', backgroundColor: board.background, borderRadius: '5px', padding: '5px'
        }}>
          <div className="dashboard-board-title" style={{ position: 'relative', top: '5px', left: '2px' }
          }>
            <Link to={`/board/${board.id}`}>{board.title}</Link>
          </div>
          <button onClick={() => this.deleteBoard(board.id)}>delete</button>
        </div >
      )
    })
    return (
      <div className="dashboard" >
        <div className="dashboard-title">Personal Boards</div>
        <div className="dashboard-grid" style={{ display: 'grid', gridTemplateColumns: 'auto auto auto auto', columnGap: '10px', rowGap: '10px' }}>
          {content}
          <div style={{ backgroundColor: 'transparent' }}>
            <div onClick={this.openModal} style={{ position: 'relative', top: '1px', left: '2px' }}>Create new board</div>
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    openModal: () => dispatch(modalActions.openModal()),
  }
}

export default connect(null, mapDispatchToProps)(Dashboard)