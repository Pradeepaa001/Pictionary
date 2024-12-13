defmodule WordSketchWeb.PageController do
  use WordSketchWeb, :controller
  # alias WordSketch.Games.Game
  # alias WordSketch.Repo
  # import Ecto.Query

  def room(conn, %{"roomCode" => roomCode}) do
      render(conn, :room, roomCode: roomCode, layout: false)
  end


  # defp check_room_exists(room_code) do
  #   query = from g in Game,
  #           where: g.room_code == ^room_code,
  #           select: count(g.id) > 0

  #   Repo.one(query)
  # end

end
