import React from 'react'

class Dashboard extends React.Component {
  state = {
    boards: []
  }
  render() {
    const content = this.state.boards.map((board) => {
      <div className="dashboard-board" style={{ backgroundColor: board.background }} key={board.id}>
        <h1 className="dashboard-board-title">
          {board.title}
        </h1>
      </div>
    })
    return (
      <div className="dashboard">
        <div className="dashboard-title">Personal Boards</div>
        <div className="dashboard-grid">
          <div>
            Create new board
          </div>
        </div>
      </div>
    )
  }
}

export default Dashboard