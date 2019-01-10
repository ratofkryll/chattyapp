import React, { Component } from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
      </nav>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);

    this.socket = new WebSocket('ws://localhost:3001');

    this.state = {
      currentUser: { name: '' },
      messages: []
    }
    this.addNewMessage = this.addNewMessage.bind(this);
    this.setCurrentUser = this.setCurrentUser.bind(this);
  }

  setCurrentUser(notification) {
    const newCurrentUser = { name: notification.username };
    const newNotification = {
      id: notification.id,
      type: 'notification',
      prevUsername: this.state.currentUser.name,
      username: notification.username,
      message: ''
    };
    const newMessages = this.state.messages.concat(newNotification);
    this.setState({
      currentUser: newCurrentUser,
      messages: newMessages
    });
  }

  addNewMessage(message) {
    const newMessage = {
      id: message.id,
      type: 'message',
      prevUsername: message.username,
      username: message.username,
      content: message.content
    }
    const newMessages = this.state.messages.concat(newMessage);
    this.setState({ messages: newMessages })
  }

  componentDidMount() {
    this.socket.onopen = () => {
      console.log('Client: Connected to server!');
    }

    this.socket.onmessage = (event) => {
      console.log('Client: Send!');
      const message = JSON.parse(event.data);
      this.state.currentUser.name !== message.username  ? this.setCurrentUser(message) : this.addNewMessage(message);
    }
  }

  render() {
    return (
      <div>
        <Navbar />
        <MessageList messages={ this.state.messages } />
        <ChatBar currentUser={ this.state.currentUser.name } addNewMessage={ this.addNewMessage } socket={ this.socket } />
      </div>
    );
  }
}
export default App;
