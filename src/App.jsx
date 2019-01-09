import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

{/* Render navbar */}
class Navbar extends Component {
  render() {
    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
      </nav>
    );
  }
}

{/* Render all app components */}
class App extends Component {
  constructor(props) {
    super(props);

    this.socket = new WebSocket('ws://localhost:3001');

    this.state = {
      currentUser: {name: ''},
      messages: []
    }
    this.addNewMessage = this.addNewMessage.bind(this);
  }

  addNewMessage(message) {
    let newMessage = {
      id: message.id,
      username: message.username,
      content: message.content
    }
    const messages = this.state.messages.concat(newMessage);
    this.setState({ messages: messages })
  }

  componentDidMount() {
    console.log('componentDidMount <App />');

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
        <ChatBar currentUser={ this.state.currentUser.name } addNewMessage={ this.addNewMessage } socket={ this.socket } />
      </div>
    );
  }
}
export default App;
