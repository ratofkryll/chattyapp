import React, { Component } from 'react';
import Navbar from './Navbar.jsx';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {
  constructor(props) {
    super(props);

    this.socket = new WebSocket('ws://localhost:3001');

    this.state = {
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
    console.log(this.state.currentUser)
    this.socket.onopen = () => {
      console.log('Client: Connected to server!');
    }

    this.socket.onmessage = (event) => {
      console.log('Client: Data received!');
      const data = JSON.parse(event.data);
      console.log(data);
        this.addNewMessage(data);
    }
  }

  render() {
    console.log(this.state.currentUser)
    return (
      <div>
        <Navbar socket={ this.socket } />
        <MessageList messages={ this.state.messages } />
        <ChatBar currentUser={ this.state.currentUser.name } addNewMessage={ this.addNewMessage } changeUser={ this.changeUser } socket={ this.socket } />
      </div>
    );
  }
}
export default App;
