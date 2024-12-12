import {Socket} from "phoenix"

let username = sessionStorage.getItem('user_id');
let roomCode = sessionStorage.getItem('room_id');
let socket = new Socket("/socket", {params: {username: username, roomCode: roomCode}})


socket.connect()

let channel = socket.channel(`room${roomCode}`, {username: username, roomCode: roomCode})
let list = $('#chat')
let message = $('#message')

message.on('keypress', event => {
    if (event.keyCode === 13) {
      channel.push('new_message', { message: message.val(), username:username, roomCode: roomCode })
      message.val('')
    }
  })

channel.on('new_message', payload => {
    console.log("Inside channel on before appending")
    list.append(`<b>${payload.username}:</b> ${payload.message}<br>`)
    console.log("Inside channel on after appending")
    list.prop({ scrollTop: list.prop("scrollHeight") })
  })

channel.join()
  .receive("ok", resp => { console.log("Joined successfully", resp) })
  .receive("error", resp => { console.log("Unable to join", resp) })

export default socket