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
defmodule WordSketchWeb.RoomChannel do
  use Phoenix.Channel
  alias WordSketchWeb.GameTimer
  def join("room" <> roomCode, _payload, socket) do
    {:ok, socket}
  end
  def handle_in("start_timer", %{"time" => time}, socket) do
    WordSketch.GameTimer.start_link(time, socket.assigns.roomCode)
    {:noreply, socket}
  end

  def handle_in("new_message", %{"message" => message, "username" => username, "roomCode" => roomCode}, socket) do
    broadcast!(socket, "new_message", %{
      message: message,
      username: username,
      roomCode: roomCode
    })
    {:noreply, socket}
  end
  def handle_in("make_guess", %{"user" => user}, socket) do
    guess_time = WordSketch.GameTimer.get_time()
    WordSketch.GameTimer.guess_correct(user, guess_time)
    {:noreply, socket}
  end

  # Push timer updates to the client
  def handle_info(%{event: event, time_left: time_left}, socket) do
    push(socket, "timer_update", %{event: event, time_left: time_left})
    {:noreply, socket}
  end

  def handle_info(%{event: :game_over, winner: winner}, socket) do
    push(socket, "game_over", %{winner: winner})
    {:stop, :normal, socket}
  end

end
