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
  channel.push("start_timer", { time: 60 })

  // Make a guess
  document.getElementById("guess-button").addEventListener("click", () => {
    const user = "Player1"
    channel.push("make_guess", { user: user })
  })
  
  // Handle timer updates
  channel.on("timer_update", payload => {
    console.log(`Time left: ${payload.time_left}`)
    document.getElementById("timer").innerText = `Time left: ${payload.time_left} seconds`;
  })
  
  // Handle game over
  channel.on("game_over", payload => {
    console.log(`Game Over! Winner: ${payload.winner.user}`, `Time: ${payload.winner.time} seconds`)
  })
  
export default socket