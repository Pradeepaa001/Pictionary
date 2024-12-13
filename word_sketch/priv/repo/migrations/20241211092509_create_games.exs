defmodule WordSketch.Repo.Migrations.CreateGames do
  use Ecto.Migration

  def change do
    create table(:games) do
      add :room_code, :string, null: false, unique: true
      add :creator_name, :string, null: false, unique: true
      add :creator_id, references(:users, on_delete: :nothing)
      add :word_id, references(:words, on_delete: :nothing), null: false
      add :status, :string, default: "active"

      timestamps()
    end

    create index(:games, [:room_code])
    create index(:games, [:creator_name])

  end
end
