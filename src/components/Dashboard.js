import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import * as actions from '../store/actions/actions';
const sampleBoards = [{
  id: 0,
  title: 'Example board 1',
  backgroundColor: 'rgb(176,70,50)'
},
{
  id: 1,
  title: 'Example board 2',
  backgroundColor: 'rgb(137,96,158)'
},
{
  id: 2,
  title: 'Example board 3',
  backgroundColor: 'rgb(81,152,57)'
}]

class Dashboard extends React.Component {
  state = {
    boards: sampleBoards
  }
  openModal = () => {
    console.log("GAY")
    this.props.openModal()
  }
  render() {
    const content = this.state.boards.map((board) => {
      return (
        <Link to="/boardname" className="dashboard-board" style={{
          height: '100px', backgroundColor: board.backgroundColor, borderRadius: '5px', padding: '5px'
        }} key={board.id}>
          <div className="dashboard-board-title" style={{ position: 'relative', top: '5px', left: '2px' }
          } >
            {board.title}
          </div >
        </Link >
      )
    })
    return (
      <div className="dashboard" >
        <div className="dashboard-title">Personal Boards</div>
        <div className="dashboard-grid" style={{ display: 'grid', gridTemplateColumns: 'auto auto', columnGap: '10px', rowGap: '10px' }}>
          {content}
          <div style={{ backgroundColor: 'transparent' }}>
            <div to="/create" onClick={this.openModal} style={{ position: 'relative', top: '1px', left: '2px' }}>Create new board</div>
          </div>
        </div>
      </div>
    )
  }
}
const mapDispatchToProps = dispatch => {
  return {
    openModal: () => dispatch(actions.openModal())
  }
}

export default connect(null, mapDispatchToProps)(Dashboard)