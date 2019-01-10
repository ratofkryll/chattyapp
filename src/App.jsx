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

  addNewMessage(message) {
    const newMessages = this.state.messages.concat(message);
    this.setState({ messages: newMessages })
  }

  changeUser(newUser) {
    this.setState({currentUser: { name: newUser }})
  }

  componentDidMount() {
    this.socket.onopen = () => {
      console.log('Client: Connected to server!');
    }

    this.socket.onmessage = (event) => {
      console.log('Client: Send!');
      const message = JSON.parse(event.data);
      this.addNewMessage(message);
    }
  }

  render() {
    return (
      <div>
        <Navbar />
        <MessageList messages={ this.state.messages } />
        <ChatBar currentUser={ this.state.currentUser.name } addNewMessage={ this.addNewMessage } changeUser={ this.changeUser } socket={ this.socket } />
      </div>
    );
  }
}
export default App;
