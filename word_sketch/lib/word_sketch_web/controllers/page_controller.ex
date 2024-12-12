defmodule WordSketchWeb.PageController do
  use WordSketchWeb, :controller

  def home(conn, _params) do
    # The home page is often custom made,
    # so skip the default app layout.
    render(conn, :home, layout: false)
  end

  def index(conn, _params) do
    render(conn, :index, layout: false)
  end

  def room(conn, %{"roomCode" => roomCode}) do
    render(conn, :room, roomCode: roomCode)
  end

end
