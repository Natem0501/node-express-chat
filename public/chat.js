// const socket = io()

// // initialize:
// // Code in document ready or DOMContentLoaded will only run once (DOM) is ready for JavaScript code to execute. 
// // Code in window load will run once the entire page (images or iframes), not just the DOM, is ready.

// window.addEventListener('load', () => {
//   console.log('Entering window.load')

//   // access important elements in code............
//   const formElement = $("#chatform")[0];  // jQuery CSS selectors return an array - use the first
//   const messageElement = $("#m")[0];      // jQuery CSS selectors return an array - use the first

//   // configure event listeners (use action - NOT ON action)......
//   formElement.addEventListener('submit', submitfunction);   // onsubmit = "return submitfunction();"
//   messageElement.addEventListener('keyup', notifyTyping);   // onkeyup = "notifyTyping();"

//   // additional initialization.........
//   const user = makeid();
//   $('#user').val(user);
//   // emit a chatMessage event from the System along with a message
//   socket.emit('chatMessage', 'System', '<b>' + user + '</b> has joined the discussion');

//   console.log('Exiting window.load')
// })

// // utility function to create a new random user name....
// function makeid() {
//   let text = ''
//   const possible = 'abcdeghijklmnoprstuwxy'
//   for (let i = 0; i < 5; i++) {
//     text += possible.charAt(Math.floor(Math.random() * possible.length))
//   }
//   return text
// }


// // emit a new chatMessage event from the client......
// function submitfunction() {
//   let from = $('#user').val()
//   const message = $('#m').val()
//   if (message !== '') {
//     socket.emit('chatMessage', from, message)
//   }
//   // what language and selector is used below?
//   // set the value to an empty string and
//   // focus on the message box again
//   $('#m').val('').focus()
//   return false; // don't refresh
// }

// // emit a new notifyUser event from the client.........
// function notifyTyping() {
//   let user = $('#user').val()
//   socket.emit('notifyUser', user)
// }

// // how to react to a chatMessage event.................
// socket.on('chatMessage', function (from, msg) {
//   const me = $('#user').val()
//   const color = (from === me) ? 'green' : '#009afd'
//   from = (from === me) ? 'Me' : from
//   $('#messages').append('<li><b style="color:' + color + '">' + from + '</b>: ' + msg + '</li>')
// })

// // how to react to a notifyUser event.................
// socket.on('notifyUser', function (user) {
//   const me = $('#user').val()
//   if (user !== me) {
//     $('#notifyUser').text(user + ' is typing ...')
//   }
//   // 10 seconds after typing stops, set the notify text to an empty string
//   setTimeout(function () { $('#notifyUser').text('') }, 10000)
// })





var user = cookie.get('user');
if (!user) {

  // Ask for the username if there is none set already
  user = prompt('Choose a username:');
  if (!user) {
    alert('We cannot work with you like that!');
  } else {
    // Store it in the cookies for future use
    cookie.set('user', user);
  }
}

var socket = io();

socket.on('count', function (data) {
  $('.user-count').html(data);
});

// When we receive a message
// it will be like { user: 'username', message: 'text' }
socket.on('message', function (data) {
  $('.chat').append('<p><strong>' + data.user + '</strong>: ' + data.message + '</p>');
});

$('form').submit(function (e) {
  // Avoid submitting it through HTTP
  e.preventDefault();

  // Retrieve the message from the user
  var message = $(e.target).find('input').val();

  // Send the message to the server
  socket.emit('message', {
    user: cookie.get('user') || 'Anonymous',
    message: message
  });

  // Clear the input and focus it for a new message
  e.target.reset();
  $(e.target).find('input').focus();
});




