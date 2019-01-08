import React, {Component} from 'react';

class Message extends Component {
  render() {
    console.log(this.props.content);
    return (
      <div className="message" key={ this.props.id }>
        <span className="message-username">{ this.props.username }</span>
        <span className="message-content">{ this.props.content }</span>
      </div>
    );
  }
}

class Notification extends Component {
  render() {
    return (
      <div className="message system">
        Anonymous1 changed their name to nomnom.
      </div>
    );
  }
}

export { Message, Notification };
