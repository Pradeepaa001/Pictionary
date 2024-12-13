import { Socket } from "phoenix"

document.addEventListener("DOMContentLoaded", () => {
    const joinbutton = document.getElementById("start-game");
    const createbutton = document.getElementById("create-room");
    const input = document.getElementById("name");
    const roomcode = document.getElementById("roomcode");
    const csrfToken = document.querySelector("meta[name='csrf-token']").getAttribute("content");

    joinbutton.addEventListener("click", () => {
        const userName = input.value.trim();
        const roomCode = roomcode.value.trim();
        if (userName && roomCode) {   
            sessionStorage.setItem('user_id', userName);
            sessionStorage.setItem('room_id', roomCode)
            window.location.href = `room${roomCode}`;
        //     fetch(`/room_exists?/${roomCode}`)
        //       .then(response => response.json())
        //       .then(data => {
        //         if (data.exists) {
        //             sessionStorage.setItem('user_id', userName);
        //             sessionStorage.setItem('room_id', roomCode)
        //             window.location.href = `room${roomCode}`; 
        //         } else {
        //               alert("No such room exists");
        //         }
        //     })
        //     .catch(error => console.error("Error checking room:", error)); 
        } else {
            alert("Please enter your name and room code!");
        }
    });

    createbutton.addEventListener("click", () => {
        const userName = input.value.trim();
        console.log(userName);
        if (userName) {
            const creator_name = userName;
            fetch("/create_room", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'x-csrf-token': csrfToken,
                },
                body: JSON.stringify({ creator_name: creator_name })
            })
            .then(response => response.json())
            .then(data => {
                if (data.room_code) {
                    sessionStorage.setItem('user_id', creator_name); 
                    sessionStorage.setItem('room_id', data.room_code);  
                    window.location.href = `room${data.room_code}`;
                } else {
                    alert("Error creating room!");
                }
            })
            .catch(error => {
                console.error("Error:", error);
                alert("There was an error creating the room.");
            });
        } else {
            alert("Please enter your Name");
        }
    });

  });
  