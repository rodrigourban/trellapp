import React from 'react';
import Board from './components/Board';
import Navbar from './components/Nav';
import Boardd from './components/Dashboard'
import Popover from './components/Popover';
import * as actions from './store/actions/actions'
import Aux from './hoc/AuxHoc'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

class Main extends React.Component {
  render() {
    return (
      <Aux className="bija">
        <Popover isOpen={this.props.popOver} closeModal={this.props.closeModal} />
        <Router className="main">
          <Navbar></Navbar>
          <Route path="/" exact component={Boardd} />
          <Route path="/boardname" component={Board} />
          <Route path="/create" component={Popover} />
        </Router>
      </Aux>
    )
  }
}
const mapStateToProps = state => {
  return {
    popOver: state.modal,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    closeModal: () => dispatch(actions.closeModal())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Main);