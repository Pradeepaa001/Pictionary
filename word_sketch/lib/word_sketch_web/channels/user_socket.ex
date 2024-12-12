defmodule WordSketchWeb.UserSocket do
  use Phoenix.Socket

  channel "room", WordSketchWeb.RoomChannel

  @impl true
  def connect(%{"username" => username, "vsn" => _vsn}, socket, _connect_info) do
    {:ok, assign(socket, :username, username)}
  end

  @impl true
  def id(socket), do: "user_socket: #{socket.assigns.username}"

end
