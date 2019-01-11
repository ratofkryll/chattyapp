import React, { Component } from 'react';
import Navbar from './Navbar.jsx';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {
  constructor(props) {
    super(props);

    this.socket = new WebSocket('ws://localhost:3001');

    this.state = {
      userCount: 0,
      currentUser: { name: '' },
      messages: []
    }
    this.addNewMessage = this.addNewMessage.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }

  changeUser(newUser) {
    this.setState({ currentUser: {name: newUser} } );
  }

  addNewMessage(message) {
    const newMessage = {
      id: message.id,
      type: message.type,
      username: message.username,
      content: message.content
    }
    const newMessages = this.state.messages.concat(newMessage);
    this.setState({ messages: newMessages })
  }

  componentDidMount() {
    /* Catches and filters data coming from the server */
    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (typeof data === 'number') {
        this.setState({ userCount: data })
      }
      this.addNewMessage(data);
    }
  }

  render() {
    return (
      <div>
        <Navbar socket={ this.socket } userCount={ this.state.userCount } />
        <MessageList messages={ this.state.messages } />
        <ChatBar currentUser={ this.state.currentUser.name } addNewMessage={ this.addNewMessage } changeUser={ this.changeUser } socket={ this.socket } />
      </div>
    );
  }
}
export default App;
