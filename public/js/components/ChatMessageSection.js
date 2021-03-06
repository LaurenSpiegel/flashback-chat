'use strict';

var React = require('react');
var MessageStore = require('../stores/ChatMessageStore');
var MessageItem = require('./ChatMessageItem');
var MessageSubmit = require('./ChatMessageSubmit');
var MessageActions = require('../actions/ChatMessageActions');

// fetch the current state data from the stores 
var getStateFromStores = function() {
  return {
    messages: MessageStore.getMessages()
  }
};

// create a MessageItem component for a given message 
var createMessageItemForMessage = function(message) {
  return (
    <MessageItem message={message} key={message.code} /> 
  );
};

var MessageSection = React.createClass({

  getInitialState: function() {
    return getStateFromStores();
  },

  componentDidMount: function() {
    MessageStore.addChangeListener(this._onChange);

    // populate the chat with previous messages from the database 
    MessageActions.getMessages();
    this._scrollToBottom();
  },

  componentWillUnmount: function() {
    MessageStore.removeChangeListener(this._onChange);
  },

  render: function() {
    var messageItems = [];
    for (var key in this.state.messages) {
      var message = this.state.messages[key];
      //Add code so colors alternate and have unique keys
    
      message.code = messageItems.length + 1;
      
      messageItems.push(createMessageItemForMessage(message));
    };
    return (
      <div className='message-section'>
        <ul className="message-list" ref="messageList">
          {messageItems}
        </ul>
      </div>
    );
  },

  componentDidUpdate: function() {
    this._scrollToBottom();
  },

  _scrollToBottom: function() {
    var ul = this.refs.messageList.getDOMNode();
    ul.scrollTop = ul.scrollHeight;
  },

  _onChange: function() {
    this.setState(getStateFromStores());
  }
});

module.exports = MessageSection;
