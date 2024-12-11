defmodule WordSketch.Repo.Migrations.CreateGames do
  use Ecto.Migration

  def change do
    create table(:games) do
      add :creator_id, references(:users, on_delete: :nothing), null: false
      add :word_id, references(:words, on_delete: :nothing), null: false
      add :status, :string, default: "active"

      timestamps()
    end

    create index(:games, [:creator_id])
  end
end
