defmodule WordSketchWeb.RoomChannel do
  use Phoenix.Channel
  alias WordSketch.Chat


  def join("room" <> roomCode, _payload, socket) do
    {:ok, socket}
  end

  def handle_in("new_message", %{"message" => message, "username" => username, "roomCode" => roomCode}, socket) do
    modified_message = Chat.process_message(username, message, "startgame")
    broadcast!(socket, "new_message", %{
      message: modified_message,
      username: username,
      roomCode: roomCode
    })
    {:noreply, socket}
  end

end
