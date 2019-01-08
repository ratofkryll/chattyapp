import React, {Component} from 'react';
import { Message, Notification } from './Message.jsx';

class MessageList extends Component {
  render() {
    const message = this.props.messages.map(message => {
      return (<Message username={ message.username } content={ message.content } />);
    });
    return (
      <main className="messages">
        { message }
        <Notification />
      </main>
    );
  }
}

export default MessageList;
