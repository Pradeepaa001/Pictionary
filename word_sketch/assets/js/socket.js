import {Socket} from "phoenix"

let socket = new Socket("/socket", {params: { userToken: "123"}})

socket.connect()

let channel = socket.channel("room", {})
let list = $('#chat')
let message = $('#message')

message.on('keypress', event => {
    if (event.keyCode == 13) {
      channel.push('new_message', { message: message.val() })
      message.val('')
    }
  })

channel.on('new_message', payload => {
    list.append(`<b>${payload.name || 'Anonymous'}:</b> ${payload.message}<br>`)
    list.prop({ scrollTop: list.prop("scrollHeight") })
  })

channel.join()
  .receive("ok", resp => { console.log("Joined successfully", resp) })
  .receive("error", resp => { console.log("Unable to join", resp) })

export default socket