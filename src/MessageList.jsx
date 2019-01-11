import React, {Component} from 'react';
import { Message, Notification } from './Message.jsx';

class MessageList extends Component {
  render() {
    const message = this.props.messages.map((message) => {
      if (message.type === 'incomingMessage') {
        return (<Message key={ message.id } username={ message.username } content={ message.content } />);
      } else if (message.type === 'incomingNotification') {
        console.log(this.props.currentUser);
        return (<Notification key={ message.id } content={ message.content } />);
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
