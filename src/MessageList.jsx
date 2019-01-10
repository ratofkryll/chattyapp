import React, {Component} from 'react';
import { Message, Notification } from './Message.jsx';

class MessageList extends Component {
  render() {
    const message = this.props.messages.map((message) => {
      if (message.type === 'message') {
        return (<Message key={ message.id } username={ message.username } content={ message.content } />);
      } else if (message.type === 'notification') {
        console.log(message);
        return (<Notification key={ message.id } prevUser={ message.prevUsername } currentUser={ message.username } />);
      }
    });
    return (
      <main className="messages">
        {this.props.messages.map(message => {
          switch(message.type) {
            case 'incomingMessage':
              return (<Message message={ message } key={ message.id } />);
              break;
            case 'incomingNotification':
              return (
                <div className="message system" key={ message.id }>
                  { message.content }
                </div>)
              break;
            default:
              throw new Error('Unknown event type ', message.type);
          }
        })}
      </main>
    );
  }
}

export default MessageList;
