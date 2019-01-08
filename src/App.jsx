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
  render() {
    return (
      <div>
        <Navbar />
        <MessageList />
        <ChatBar />
      </div>
    );
  }
}
export default App;
