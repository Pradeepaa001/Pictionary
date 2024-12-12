defmodule WordSketchWeb.UserSocket do
  use Phoenix.Socket

  channel "room*", WordSketchWeb.RoomChannel

  # @impl true
  # def connect(%{"username" => username, "vsn" => _vsn}, socket, _connect_info) do
  #   {:ok, assign(socket, :username, username)}
  # end

  @impl true
  def connect(params, socket, _connect_info) do
    case params do
      %{"username" => username,"roomCode" => roomCode, "vsn" => _vsn} -> {:ok, assign(socket, %{ username: username, roomCode: roomCode})}
      %{"username" => username, "vsn" => _vsn} ->  {:ok, assign(socket, %{ username: username, roomCode: ""})}
      %{"roomCode" => roomCode, "vsn" => _vsn} ->  {:ok, assign(socket, %{ username: "Anonymous", roomCode: roomCode})}
      %{"vsn" => _vsn} -> {:ok, assign(socket, %{ username: "Anonymous", roomCode: ""})}
    end
  end

  @impl true
  def id(socket), do: "user_socket: #{socket.assigns.username}"

  def code(socket), do: socket.assigns.roomCode

end
