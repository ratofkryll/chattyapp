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
    this.handleMessageKeyDown = this.handleMessageKeyDown.bind(this);
    this.handleUsernameKeyDown = this.handleUsernameKeyDown.bind(this);
  }

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

  handleMessageKeyDown(event) {
    if (event.keyCode === 13) {
      console.log('Client: Message sent!');
      const message = {
        type: 'postMessage',
        username: this.state.username,
        content: this.state.content
      }
      this.props.socket.send(JSON.stringify(message));
      this.setState({
        content: ''
      })
    }
  }

  handleUsernameKeyDown(event) {
    if (event.keyCode === 13 && this.props.currentUser !== this.state.username) {
      console.log('Client: Username change sent!');
      const notification = {
        type: 'postNotification',
        username: this.state.username,
        content: `${ this.props.currentUser ? this.props.currentUser : 'Anonymous' } changed their name to ${this.state.username}.`
      }
      this.props.socket.send(JSON.stringify(notification));
      this.props.changeUser(this.state.username);
    }
  }

  render() {
    return (
      <footer className="chatbar">
          <input name="username" type="text" className="chatbar-username" onChange={ this.handleChangeUsername } onKeyDown={ this.handleUsernameKeyDown } placeholder="Your Name (Optional)" />
          <input name="message" type="text" className="chatbar-message" onChange={ this.handleChangeContent } onKeyDown={ this.handleMessageKeyDown } placeholder="Type a message and hit ENTER" value={ this.state.content } />
      </footer>
    );
  }
}

export default ChatBar;
