import React, {Component} from 'react';

class OnlineCounter extends Component {
  render() {
    return (
      <span className="counter">1 user online</span>
    )
  }
}

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        <OnlineCounter />
      </nav>
    );
  }
}

export default Navbar;
