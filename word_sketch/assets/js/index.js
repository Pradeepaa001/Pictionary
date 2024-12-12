import { Socket } from "phoenix"

document.addEventListener("DOMContentLoaded", () => {
    const button = document.querySelector("button");
    const input = document.getElementById("name");
  
    button.addEventListener("click", () => {
        const userName = input.value.trim();

        if (userName) {

            sessionStorage.setItem('user_id', userName);
            console.log(userName)
            window.location.href = "/index/room"; 
        } else {
            alert("Please enter your name!");
        }
    });
  });
  