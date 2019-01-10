import React, {Component} from 'react';
import { Message, Notification } from './Message.jsx';

class MessageList extends Component {
  render() {
    const message = this.props.messages.map((message) => {
      if (message.type === 'message') {
        return (<Message key={ message.id } username={ message.username } content={ message.content } />);
      } else if (message.type === 'notification') {
        return (<Notification key={ message.id } prevUser={ this.props.prevUser } currentUser={ this.props.currentUser } />);
      }
    });
    return (
      <main className="messages">
        { message }
      </main>
    );
  }
}

export default MessageList;
