import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      content: ''
    }

    this.handleChangeUsername = this.handleChangeUsername.bind(this);
    this.handleChangeContent = this.handleChangeContent.bind(this);
    this.handleMessageKeyUp = this.handleMessageKeyUp.bind(this);
    this.handleUsernameKeyUp = this.handleUsernameKeyUp.bind(this);
  }

  /* Saves text entered in the inputs */
  handleChangeUsername(event) {
    let username = event.target.value;
    this.setState({
      username: username
    });
  }

  handleChangeContent(event) {
    let content = event.target.value;
    this.setState({
      content: content
    });
  }

  /* Sends message data to server & resets message input */
  handleMessageKeyUp(event) {
    if (event.keyCode === 13) {
      const message = {
        type: 'postMessage',
        username: this.state.username,
        content: this.state.content
      }
      this.props.socket.send(JSON.stringify(message));
      this.setState({
        content: ''
      });
    }
  }

  /* Sends notification data to server & updates currentUser in App state */
  handleUsernameKeyUp(event) {
    if (event.keyCode === 13 && this.props.currentUser !== this.state.username) {
      const notification = {
        type: 'postNotification',
        username: this.state.username,
        content: `${ this.props.currentUser ? this.props.currentUser : 'Anonymous' } changed their name to ${this.state.username ? this.state.username : 'Anonymous'}.`
      }
      this.props.socket.send(JSON.stringify(notification));
      this.props.changeUser(this.state.username);
    }
  }

  render() {
    return (
      <footer className="chatbar">
          <input type="text" className="chatbar-username" onChange={ this.handleChangeUsername } onKeyUp={ this.handleUsernameKeyUp } placeholder="Your Name (Optional)" />
          <input type="text" className="chatbar-message" onChange={ this.handleChangeContent } onKeyUp={ this.handleMessageKeyUp } placeholder="Type a message and hit ENTER" value={ this.state.content } />
      </footer>
    );
  }
}

export default ChatBar;
