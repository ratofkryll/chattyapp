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

    this.state = {
      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
        {
          id: 1,
          username: "Bob",
          content: "Has anyone seen my marbles?",
        },
        {
          id: 2,
          username: null,
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        }
      ]
    }
    this.addNewMessage = this.addNewMessage.bind(this);
  }

  addNewMessage(message) {
    let id = 4;
    let newMessage = {
      id: id,
      username: message.username ? message.username : null,
      content: message.content
    }
    const messages = this.state.messages.concat(newMessage);
    this.setState({ messages: messages })
  }

  componentDidMount() {
    console.log('componentDidMount <App />');
    setTimeout(() => {
      console.log('Simulating incoming message.');
      const newMessage = { id: 3, username: 'Michelle', content: 'Hello there!' };
      const messages = this.state.messages.concat(newMessage);
      this.setState({ messages: messages })
    }, 3000);
  }

  render() {
    return (
      <div>
        <Navbar />
        <MessageList messages={ this.state.messages } />
        <ChatBar currentUser={ this.state.currentUser.name } addNewMessage={ this.addNewMessage } />
      </div>
    );
  }
}
export default App;
