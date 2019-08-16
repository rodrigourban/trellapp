import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { connect } from 'react-redux';
import * as modalActions from '../store/actions/modal';
import * as apiActions from '../store/actions/api'
import logo from '../assets/Boards.png'

class Dashboard extends React.Component {
  componentDidMount() {
    this.props.getBoards()
  }
  openModal = () => {
    this.props.openModal()
  }

  deleteBoard = (id) => {
    this.props.deleteBoard(id);
  }
  render() {
    const content = this.props.boards.map((board) => {
      return (
        <NavLink to={`/board/${board.id}`} className="dashboard-board" style={{
          position: 'relative',
          height: '100px', backgroundColor: board.background, borderRadius: '5px',
          padding: '5px', textDecoration: 'none', color: '#fffff'
        }}>
          <div className="dashboard-board-title" style={{ position: 'relative', top: '10px', left: '2px' }
          }>
            <div style={{ fontSize: '16px', lineHeight: '20px', color: '#fffff', fontWeight: '700', color: 'rgb(255,255,255)' }}>{board.title}</div>
          </div>
          <div onClick={() => this.deleteBoard(board.id)} style={{ width: '30px', position: 'absolute', right: '-10px', top: '-5px' }} >...</div>
        </NavLink >
      )
    })
    return (
      <div className="dashboard" style={{ width: '90%', marginLeft: '1.5rem', marginTop: '1rem' }}>
        <div className="dashboard-title" style={{ marginBottom: '5px', padding: '5px', lineHeight: '25px' }}><img src={logo} height="25" width="25" style={{ marginRight: '5px', verticalAlign: 'bottom' }} />Personal Boards</div>
        <div className="dashboard-grid" style={{ display: 'grid', gridTemplateColumns: 'auto auto auto auto', columnGap: '10px', rowGap: '10px' }}>
          {content}
          <div style={{ backgroundColor: 'transparent', margin: 'auto' }} onClick={this.openModal}>
            Create new board
          </div>
        </div>
      </div >
    )
  }
}

const mapStateToProps = state => {
  return {
    boards: state.api.boards
  }
}

const mapDispatchToProps = dispatch => {
  return {
    openModal: () => dispatch(modalActions.openModal()),
    getBoards: () => dispatch(apiActions.getBoards()),
    deleteBoard: (id) => dispatch(apiActions.deleteBoard(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)