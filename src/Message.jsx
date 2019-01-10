import React, {Component} from 'react';

class Message extends Component {
  render() {
    return (
      <div className="message" key={ this.props.id }>
        <span className="message-username">{ this.props.username ? this.props.username : 'Anonymous' }</span>
        <span className="message-content">{ this.props.content }</span>
      </div>
    );
  }
}

class Notification extends Component {
  render() {
    const prevUser = this.props.prevUser === '' ? 'Anonymous' : this.props.prevUser;
    const currentUser = this.props.currentUser === '' ? 'Anonymous' : this.props.currentUser;
    console.log(this.props.prevUser, this.props.currentUser);
    const notification = `${ prevUser } changed their name to ${ currentUser }.`
    return (
      <div className="message system">
        { notification }
      </div>
    );
  }
}

export { Message, Notification };
