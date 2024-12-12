defmodule WordSketchWeb.RoomChannel do
  use Phoenix.Channel

  def join("room" <> roomCode, _payload, socket) do
    {:ok, socket}
  end

  def handle_in("new_message", %{"message" => message, "username" => username, "roomCode" => roomCode}, socket) do
    broadcast!(socket, "new_message", %{
      message: message,
      username: username,
      roomCode: roomCode
    })
    {:noreply, socket}
  end

end
