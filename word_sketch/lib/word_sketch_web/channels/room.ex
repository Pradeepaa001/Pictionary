# defmodule WordSketchWeb.RoomChannel do
#   use Phoenix.Channel

#   def join("room" <> roomCode, _payload, socket) do
#     {:ok, socket}
#   end
#   def handle_in("start_timer", %{"time" => time}, socket) do
#     WordSketch.GameTimer.start_link(time)
#     {:noreply, socket}
#   end

#   def handle_in("new_message", %{"message" => message, "username" => username, "roomCode" => roomCode}, socket) do
#     broadcast!(socket, "new_message", %{
#       message: message,
#       username: username,
#       roomCode: roomCode
#     })
#     {:noreply, socket}
#   end

# end
# defmodule WordSketchWeb.RoomChannel do
#   use Phoenix.Channel
#   alias WordSketchWeb.GameTimer
#   alias WordSketch.Chat


#   def join("room" <> roomCode, _payload, socket) do
#     {:ok, socket}
#   end
#   def handle_in("start_timer", %{"time" => time}, socket) do
#     WordSketch.GameTimer.start_link(time, socket.assigns.roomCode)
#     {:noreply, socket}
#   end

#   def handle_in("new_message", %{"message" => message, "username" => username, "roomCode" => roomCode}, socket) do
#     modified_message = Chat.process_message(username, message, "startgame")
#     broadcast!(socket, "new_message", %{
#       message: modified_message,
#       username: username,
#       roomCode: roomCode
#     })
#     {:noreply, socket}
#   end
#   def handle_in("make_guess", %{"user" => user}, socket) do
#     guess_time = WordSketch.GameTimer.get_time()
#     WordSketch.GameTimer.guess_correct(user, guess_time)
#     {:noreply, socket}
#   end

#   # Push timer updates to the client
#   def handle_info(%{event: event, time_left: time_left}, socket) do
#     push(socket, "timer_update", %{event: event, time_left: time_left})
#     {:noreply, socket}
#   end

#   def handle_info(%{event: :game_over, winner: winner}, socket) do
#     push(socket, "game_over", %{winner: winner})
#     {:stop, :normal, socket}
#   end

# end
defmodule WordSketchWeb.RoomChannel do
  use Phoenix.Channel
  alias WordSketch.GameTimer
  alias WordSketch.Chat

  def join("room" <> roomCode, _payload, socket) do
    IO.inspect(roomCode, label: "Room joined with code")
    {:ok, socket}
  end

  def handle_in("start_timer", %{"time" => time}, socket) do
    # Start the timer with the specified time and roomCode
    GameTimer.start_link(time, socket.assigns.roomCode)
    {:noreply, socket}
  end

  def handle_in("new_message", %{"message" => message, "username" => username, "roomCode" => roomCode}, socket) do
    # Process the message (if needed) and broadcast to the room
    modified_message = Chat.process_message(username, message, "startgame")
    broadcast!(socket, "new_message", %{
      message: modified_message,
      username: username,
      roomCode: roomCode
    })
    {:noreply, socket}
  end

  def handle_in("make_guess", %{"user" => user}, socket) do
    # Get time from the timer and register the correct guess
    guess_time = GameTimer.get_time(socket.assigns.roomCode)
    GameTimer.guess_correct(socket.assigns.roomCode, user, guess_time)
    {:noreply, socket}
  end

  # Push timer updates to the client
  def handle_info(%{event: :time_update, time_left: time_left}, socket) do
    push(socket, "timer_update", %{time_left: time_left})
    {:noreply, socket}
  end

  # Handle game over event and notify the client
  def handle_info(%{event: :game_over, winner: winner}, socket) do
    push(socket, "game_over", %{winner: winner})
    {:stop, :normal, socket}
  end
end
