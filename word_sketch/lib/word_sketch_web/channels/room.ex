defmodule WordSketchWeb.RoomChannel do
  use Phoenix.Channel

  def join("room", _payload, socket) do
    {:ok, socket}
  end

  def handle_in("new_message", %{"message" => message, "username" => username}, socket) do
    broadcast!(socket, "new_message", %{
      message: message,
      username: username,
    })
    {:noreply, socket}
  end

end
