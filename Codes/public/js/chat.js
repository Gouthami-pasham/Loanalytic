$(function() {
  var user = sessionStorage.getItem("userName");
    if(user == "Admin"){
        $("#chatbox").hide();
    }
    else{
        $("#chatbox").show();
        var panelList = document.getElementsByClassName('panel');
        for (var i = 0; i < panelList.length; ++i) {
            var item = panelList[i];  
            $(item).find('.panel-body').slideUp();
            $(item).find('div.panel-heading span.icon_minim').addClass('panel-collapsed');
        }
    }
});


var socket = io()

$(document).on('click', '.panel-heading span.icon_minim', function(e) {
  var $this = $(this);
  if (!$this.hasClass('panel-collapsed')) {
      $this.parents('.panel').find('.panel-body').slideUp();
      $this.addClass('panel-collapsed');
      $this.removeClass('fa-minus').addClass('fa-plus');
  } else {
      $this.parents('.panel').find('.panel-body').slideDown();
      $this.removeClass('panel-collapsed');
      $this.removeClass('fa-plus').addClass('fa-minus');
  }
});
$(document).on('focus', '.panel-footer input.chat_input', function(e) {
  var $this = $(this);
  if ($('#minim_chat_window').hasClass('panel-collapsed')) {
      $this.parents('.panel').find('.panel-body').slideDown();
      $('#minim_chat_window').removeClass('panel-collapsed');
      $('#minim_chat_window').removeClass('fa-plus').addClass('fa-minus');
  }
});
$(document).on('click', '#new_chat', function(e) {
  var size = $(".chat-window:last-child").css("margin-left");
  size_total = parseInt(size) + 400;
  alert(size_total);
  var clone = $("#chat_window_1").clone().appendTo(".container");
  clone.css("margin-left", size_total);
});
$(document).on('click', '.icon_close', function(e) {
  //$(this).parent().parent().parent().parent().remove();
  $("#chatbox").hide();
});

// send function start

function send() {
  var chat = $("#btn-input").val();
  var dt = new Date();
  const user = $('#user').val()
  var time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();

  if (chat == "") {
      alert('Enter Message');
  } else {

    $('#btn-input').val('');
    socket.emit('chatMessage', user, chat)
  }
  
}

function notifyTyping() {
  const user = $('#user').val()
  socket.emit('notifyUser', user)
}

$(function () {
  //const name  = window.prompt("Enter your user name");
  //const name = randomString()
  var user =  sessionStorage.getItem("userName")
  $('#user').val(user)
  // emit a chatMessage event from the System along with a message
  //socket.emit('chatMessage', 'System', '<b>' + name + '</b> has joined the discussion')
})

// how to react to a chatMessage event.................
socket.on('chatMessage', function (from, msg) {
  var dt = new Date();
  var time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
  const me = $('#user').val()
  var body = "";
  var user = sessionStorage.getItem("userName");
    if(user == "Admin"){
        $("#chatbox").show();

    }
  if(from == me){
     body = '<div class="row msg_container base_sent">' +
    '<div class="col-md-10 col-sm-10 col-xs-9 ">' +
    '<div class="messages msg_sent">' +
    '<p>' + msg + '</p>' +
    ' <time datetime="2009-11-13T20:00">'+'Me'+' • Today ' + time + '</time>' +
    '</div>' +
    '</div>' +
    '<div class="col-md-2 col-sm-2 col-xs-2 avatar">' +
    '<img class="chatimg" src="images/sender.jpg" class=" img-responsive ">' +
    '</div>' +
    '</div>';
  }
  else{
    body = '<div class="row msg_container base_receive">' +
    '<div class="col-md-2 col-sm-2 col-xs-2 avatar">' +
    '<img class="chatimg" src="images/receiver.jpg" class="img-responsive">' +
    '</div>' +
    '<div class="col-md-10 col-sm-10 col-xs-9 ">' + '<div class="messages msg_sent">' +
    '<p>' + msg + '</p>' +
    '<time datetime="2009-11-13T20:00">' + from + ' • Today ' + time + '</time>' +
    '</div>' +
    '</div>' +
    '</div>';
  }
  $(body).appendTo("#messagebody");
  $('#btn-input').val('');
  $("#messagebody").animate({
      scrollTop: $("#messagebody")[0].scrollHeight
  }, 'slow');
})

// how to react to a notifyUser event.................
socket.on('notifyUser', function (user) {
  const me = $('#user').val()
  if (user !== me) {
    $('#notifyUser').text(user + ' is typing ...')
  }
  // 10 seconds after typing stops, set the notify text to an empty string
  setTimeout(function () { $('#notifyUser').text('') }, 10000)
})

// send function end

$("#btn-chat").click(function() {
  send()
});

$('#btn-input').keypress(function(e) {
  if (e.which == 13) {
      send()
  }
});