
'use strict';

var React = require('react');
var MessageActions = require('../actions/ChatMessageActions');

var ENTER_KEY_CODE = 13;

var MessageSubmit = React.createClass({
  getInitialState: function() {
    return {
      text: ''
    };
  },

  render: function() {
    return (
      <textarea className="message-submit-textarea" name="message" value={this.state.text} 
        onChange={this._onChange} onKeyDown={this._onKeyDown} />
    )
  },

  _onChange: function(event, value) {
    this.setState({
      text: event.target.value
    });
  },

  _onKeyDown: function(event) {
    if (event.keyCode === ENTER_KEY_CODE) {
      event.preventDefault();
      var text = this.state.text.trim();
      if (text) {
    
        MessageActions.createMessage(text);
      }
      this.setState({
        text: ""
      });
    }
  }

});

module.exports = MessageSubmit;