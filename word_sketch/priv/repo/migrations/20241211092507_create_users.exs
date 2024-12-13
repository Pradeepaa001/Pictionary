defmodule WordSketch.Repo.Migrations.CreateUsers do
  use Ecto.Migration

  def change do
    create table(:users) do
      add :username, :string
      add :roomcode, :string
      add :role, :string, default: "player"
      add :score, :integer, default: 0
      timestamps()
    end


  create index(:users, [:username])
  create index(:users, [:roomcode])

  end
end
