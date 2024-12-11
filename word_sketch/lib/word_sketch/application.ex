defmodule WordSketch.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  @impl true
  def start(_type, _args) do
    children = [
      WordSketchWeb.Telemetry,
      WordSketch.Repo,
      {DNSCluster, query: Application.get_env(:word_sketch, :dns_cluster_query) || :ignore},
      {Phoenix.PubSub, name: WordSketch.PubSub},
      # Start the Finch HTTP client for sending emails
      {Finch, name: WordSketch.Finch},
      # Start a worker by calling: WordSketch.Worker.start_link(arg)
      # {WordSketch.Worker, arg},
      # Start to serve requests, typically the last entry
      WordSketchWeb.Endpoint
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: WordSketch.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  @impl true
  def config_change(changed, _new, removed) do
    WordSketchWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
