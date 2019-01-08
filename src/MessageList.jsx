import React, {Component} from 'react';
import { Message, Notification } from './Message.jsx';

class MessageList extends Component {
  render() {
    return (
      <main className="messages">
        <Message />
        <Notification />
      </main>
    );
  }
}

export default MessageList;
