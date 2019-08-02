import React from 'react';
import Board from './components/Board';
import Navbar from './components/Nav';
import Aux from './hoc/AuxHoc'


class Main extends React.Component {
  render() {
    return (
      <Aux className="bija">
        <Navbar></Navbar>
        <main className="main">
          <Board></Board>

        </main>
      </Aux>
    )
  }
}

export default Main;