defmodule WordSketch.Repo.Migrations.CreateGames do
  use Ecto.Migration

  def change do
    create table(:games) do
      add :room_code, :string, unique: true
      add :creator_name, :string, unique: true
      add :creator_id, references(:users, on_delete: :nothing)
      add :word_id, references(:words, on_delete: :nothing)
      add :status, :string, default: "active"

      timestamps()
    end

    create index(:games, [:room_code])
    create index(:games, [:creator_name])

  end
end
