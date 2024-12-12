import { Socket } from "phoenix"

document.addEventListener("DOMContentLoaded", () => {
    const button = document.querySelector("button");
    const input = document.getElementById("name");
    const roomcode = document.getElementById("roomcode")

    button.addEventListener("click", () => {
        const userName = input.value.trim();
        const roomCode = roomcode.value.trim();
        if (userName && roomCode) {
            sessionStorage.setItem('user_id', userName);
            sessionStorage.setItem('room_id', roomCode)
            console.log(userName, roomCode)
            window.location.href = `/index/room${roomCode}`; 
        } else {
            alert("Please enter your name and room code!");
        }
    });
  });
  