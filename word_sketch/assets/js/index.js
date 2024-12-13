import { Socket } from "phoenix"

document.addEventListener("DOMContentLoaded", () => {
    const joinbutton = document.getElementById("start-game");
    const createbutton = document.getElementById("create-room");
    const input = document.getElementById("name");
    const roomcode = document.getElementById("roomcode");
    const csrfToken = document.querySelector("meta[name='csrf-token']").getAttribute("content");
    const socket = new Socket("/socket", {});
        socket.connect();

    const checkRoomExists = async (roomCode) => {
        
        const channel = socket.channel(`room${roomCode}`);
        
        try {
            await new Promise((resolve, reject) => {
                channel
                    .join()
                    .receive("ok", () => resolve())
                    .receive("error", (resp) => reject(resp))
                    .receive("timeout", () => reject("Timeout"));
            });
            const response = await new Promise((resolve, reject) => {
                channel.push("check_room", { room_code: roomCode })
                    .receive("ok", (response) => resolve(response))
                    .receive("error", (error) => reject(error))
                    .receive("timeout", () => reject("Timeout"));;
            });
            
            channel.leave();
            return response.exists;
        } catch (error) {
            console.log("Error details:", error);
            if(channel){
                channel.leave();
            }    
            throw error;
        }
    };    
    joinbutton.addEventListener("click", async () => {
        const userName = input.value.trim();
        const roomCode = roomcode.value.trim();
        
        if (userName && roomCode) {
            try {
                console.log("Checking room:", roomCode);
                const exists = await checkRoomExists(roomCode);
                console.log("Room exists:", exists);
                if (exists) {
                    sessionStorage.setItem('user_id', userName);
                    sessionStorage.setItem('room_id', roomCode)
                    window.location.href = `room${roomCode}`;
                } else {
                    alert(" Please check the room code or create a new room.");
                }
            } catch (error) {
                console.error("Error checking room:", error);
                alert("Error checking room existence");
            }
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
  