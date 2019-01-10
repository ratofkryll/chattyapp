import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: this.props.currentUser,
      content: ''
    }

    this.handleChangeUsername = this.handleChangeUsername.bind(this);
    this.handleChangeContent = this.handleChangeContent.bind(this);
    this.onEnter = this.onEnter.bind(this);
    this.enterNotification = this.enterNotification.bind(this);
  }

  handleChangeUsername = (event) => {
    let username = event.target.value;
    this.setState({
      username: username
    });
  }

  handleChangeContent = (event) => {
    let content = event.target.value;
    this.setState({
      content: content
    });
  }

  onEnter = (event) => {
    if(event.keyCode == 13) {
      const message = {
        type: 'postMessage',
        username: this.state.username,
        content: this.state.content
      }
      this.props.socket.send(JSON.stringify(message));
      this.setState({ content: '' });
    }
  }

  enterNotification = (event) => {
    if(event.keyCode == 13) {
      this.props.changeUser(event);
    }
  }

  changeUser = (event) => {
    if (this.props.user.currentUser.name !== this.state.user) {
      const notification = {
        type: postNotification,
        content: `${this.props.currentUser.name} has changed their name to ${this.state.user}`
      }
      this.props.socket.send(JSON.stringify(notification));
      this.props.changeUser(this.state.user);
    }
  }

  render() {
    return (
      <footer className="chatbar">
        <input name="username" type="text" className="chatbar-username" onChange={ this.handleChangeUsername } onKeyUp={ this. enterNotification } placeholder="Your Name (Optional)" defaultValue={ this.state.username } />
        <input name="message" type="text" className="chatbar-message" onChange={ this.handleChangeContent } onKeyUp={ this.onEnter } placeholder="Type a message and hit ENTER" value={ this.state.content } />
        <input type="submit" className="hidden-submit" />
      </footer>
    );
  }
}

export default ChatBar;
