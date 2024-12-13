defmodule WordSketchWeb.IndexController do
  use WordSketchWeb, :controller
  alias WordSketch.Index
  alias WordSketch.Repo

  def index(conn, _params) do
    render(conn, :index , layout: false)
  end

  def create_room(conn, %{"creator_name" => creator_name}) do
    case Index.create_room(creator_name) do
      {:ok, %{room_id: room_id, room_code: room_code, creator_name: creator_name}} ->
        json(conn, %{room_id: room_id, room_code: room_code, creator_name: creator_name})
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> json(%{errors: changeset.errors})
    end
  end

  def game_exists(conn, %{"room_code" => room_code}) do
    IO.puts(room_code)
    case Repo.get_by(Game, room_code: room_code) do
      nil ->
        json(conn, %{exists: false})
      game ->
        json(conn, %{exists: true})
    end
  end


end
