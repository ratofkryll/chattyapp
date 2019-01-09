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
    this.handleSubmit = this.handleSubmit.bind(this);
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

/* TODO - Change from 'onSubmit' to 'onKeyup', ref 'keyCode === 13' to deal with Safari being a giant pile of fuck. */
  handleSubmit(event) {
    event.preventDefault();
    console.log('New message!');
    const message = this.state;
    this.props.socket.send(JSON.stringify(message));
    this.setState({
      content: ''
    })
  }

  render() {
    return (
      <footer>
        <form className="chatbar" onSubmit={ this.handleSubmit }>
          <input name="username" type="text" className="chatbar-username" onChange={ this.handleChangeUsername } placeholder="Your Name (Optional)" defaultValue={ this.props.currentUser ? this.props.currentUser : null } />
          <input name="message" type="text" className="chatbar-message" onChange={ this.handleChangeContent } placeholder="Type a message and hit ENTER" value={ this.state.content } />
          <input type="submit" className="hidden-submit" />
        </form>
      </footer>
    );
  }
}

export default ChatBar;
