import React, {Component} from 'react';

class OnlineCounter extends Component {
  render() {
    return (
      <span className="counter">{this.props.userCount} { this.props.userCount === 1 ? 'user' : 'users' } online</span>
    )
  }
}

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        <OnlineCounter userCount={ this.props.userCount } />
      </nav>
    );
  }
}

export default Navbar;
