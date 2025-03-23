Based on the information available, here's a draft for the README file of the [Pradeepaa001/Pictionary](https://github.com/Pradeepaa001/Pictionary) repository:

---

# Pictionary

This project is a multi-room, multiplayer Pictionary game developed using the Phoenix framework. It allows multiple users to join different rooms and play the classic drawing and guessing game in real-time.

## Features

- **Multi-Room Support**: Users can create or join multiple rooms to play with different groups.
- **Real-Time Gameplay**: Leveraging Phoenix's real-time capabilities, players can draw and guess words simultaneously.
- **User-Friendly Interface**: An intuitive interface ensures a seamless gaming experience.

## Installation

To set up the project locally, follow these steps:

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/Pradeepaa001/Pictionary.git
   ```


2. **Navigate to the Project Directory**:

   ```bash
   cd Pictionary
   ```


3. **Install Dependencies**:

   - **Elixir and Phoenix**: Ensure you have Elixir and Phoenix installed. If not, follow the [official guide](https://hexdocs.pm/phoenix/installation.html).

   - **Dependencies**: Fetch and install the necessary dependencies:

     ```bash
     mix deps.get
     ```

4. **Set Up the Database**:

   ```bash
   mix ecto.setup
   ```


5. **Start the Phoenix Server**:

   ```bash
   mix phx.server
   ```


6. **Access the Application**:

   Open your browser and navigate to `http://localhost:4000` to start playing.
