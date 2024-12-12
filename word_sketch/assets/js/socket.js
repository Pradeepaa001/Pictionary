import {Socket} from "phoenix"

let username = sessionStorage.getItem('user_id');

let socket = new Socket("/socket", {params: {username: username}})


socket.connect()

let channel = socket.channel("room", {username: username})
let list = $('#chat')
let message = $('#message')

message.on('keypress', event => {
    if (event.keyCode === 13) {
      channel.push('new_message', { message: message.val(), username:username })
      message.val('')
    }
  })

channel.on('new_message', payload => {
    list.append(`<b>${payload.username || 'Anonymous'}:</b> ${payload.message}<br>`)
    list.prop({ scrollTop: list.prop("scrollHeight") })
  })

channel.join()
  .receive("ok", resp => { console.log("Joined successfully", resp) })
  .receive("error", resp => { console.log("Unable to join", resp) })

export default socket