defmodule WordSketchWeb.PageController do
  use WordSketchWeb, :controller
  alias WordSketch.Words.Word
  alias WordSketch.Repo
  import Ecto.Query

  def room(conn, %{"roomCode" => roomCode}) do
      render(conn, :room, roomCode: roomCode, layout: false)
  end

  def next_word(conn, %{"roomCode" => room_code}) do
    word = Repo.one(from w in Word, order_by: fragment("RANDOM()"))
    json(conn, %{word: word.word})
  end

end
