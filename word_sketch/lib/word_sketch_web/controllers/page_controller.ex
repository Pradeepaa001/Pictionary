defmodule WordSketchWeb.PageController do
  use WordSketchWeb, :controller
  alias WordSketch.Index
  alias WordSketch.Repo
  alias WordSketch.Games.Game

  def home(conn, _params) do
    # The home page is often custom made,
    # so skip the default app layout.
    render(conn, :home, layout: false)
  end

  def room(conn, %{"roomCode" => roomCode}) do
    if Repo.exists?(Game, room_code: roomCode) do
      render(conn, :room, roomCode: roomCode)
    end
  end
end
