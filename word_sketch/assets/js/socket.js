import { Socket } from "phoenix"

document.addEventListener('DOMContentLoaded', () => {
    let username = sessionStorage.getItem('user_id');
    let roomCode = sessionStorage.getItem('room_id');
    let currentTargetWord = 'startgame';

    if (!username || !roomCode) {
        console.error('User or Room not found in session storage');
        return;
    }
    const roomCodeElement = document.getElementById('room-code');
    if (roomCodeElement) {
        roomCodeElement.textContent = roomCode;
    }

    const socket = new Socket("/socket", { params: { username: username, roomCode: roomCode } })
    socket.connect()

    const channel = socket.channel(`room:${roomCode}`, { username: username, roomCode: roomCode })  
    const list = $('#chat')
    const message = $('#message')

    const canvas = document.getElementById("drawing-canvas");
    const ctx = canvas.getContext("2d");
    const colorPicker = document.getElementById("color-picker");
    const brushSizeInput = document.getElementById("brush-size");
    const clearCanvasButton = document.getElementById("clear-canvas");

    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;

    function sendDrawingData(type, data) {
        channel.push('draw', { 
            type: type,
            ...data,
            username: username,
            roomCode: roomCode 
        });
    }

    canvas.addEventListener("mousedown", (e) => {
        if (!canvas) return;
        
        isDrawing = true;
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        lastX = x;
        lastY = y;

        sendDrawingData('start', { 
            x: x, 
            y: y, 
            color: colorPicker.value, 
            lineWidth: brushSizeInput.value 
        });
    });

    canvas.addEventListener("mousemove", (e) => {
        if (!isDrawing) return;
        
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        ctx.strokeStyle = colorPicker.value;
        ctx.lineWidth = brushSizeInput.value;
        ctx.lineJoin = "round";
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.stroke();
        
        sendDrawingData('draw', { 
            x: x, 
            y: y, 
            color: colorPicker.value, 
            lineWidth: brushSizeInput.value 
        });
        
        lastX = x;
        lastY = y;
    });

    canvas.addEventListener("mouseup", () => stopDrawing());
    canvas.addEventListener("mouseout", () => stopDrawing());

    function stopDrawing() {
        if (isDrawing) {
            isDrawing = false;
            sendDrawingData('end', {});
        }
    }

    channel.on('draw', payload => {
        if (payload.username === username) return; 

        ctx.strokeStyle = payload.color;
        ctx.lineWidth = payload.lineWidth;
        ctx.lineJoin = "round";
        ctx.lineCap = "round";

        switch(payload.type) {
            case 'start':
                ctx.color = colorPicker;
                ctx.beginPath();
                ctx.moveTo(payload.x, payload.y);
                break;
            case 'draw':
                ctx.color = colorPicker;
                ctx.lineTo(payload.x, payload.y);
                ctx.stroke();
                break;
            case 'end':
                ctx.closePath();
                break;
            case 'clear':
              ctx.clearRect(0, 0, canvas.width, canvas.height);
              break;
        }
    });

    clearCanvasButton.addEventListener("click", () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        sendDrawingData('clear', {});
    });

    channel.on('clear', () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });

    message.on('keypress', event => {
        if (event.keyCode === 13) {
            channel.push('new_message', { 
                message: message.val(), 
                username: username, 
                roomCode: roomCode,
                targetword: currentTargetWord
            })
            message.val('')
        }
    })

    channel.on('new_message', payload => {
        currentTargetWord = payload.targetword;
        list.append(`<b>${payload.username}:</b> ${payload.message}<br>`)
        list.prop({ scrollTop: list.prop("scrollHeight") })
    })

    channel.join()
        .receive("ok", resp => { console.log("Joined successfully", resp) })
        .receive("error", resp => { console.log("Unable to join", resp) })

    channel.push("start_timer", { time: 60 })


// Listen for time updates from the server
channel.on("timer_update", payload => {
  let timeLeft = payload.time_left;
  updateTimer(timeLeft);
})

// Function to update the countdown timer in the HTML
function updateTimer(timeLeft) {
  let minutes = Math.floor(timeLeft / 60);
  let seconds = timeLeft % 60;
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  document.getElementById("countdown").innerText = `${minutes}:${seconds}`;
}




})

export default socket