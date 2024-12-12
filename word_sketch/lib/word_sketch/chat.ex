defmodule WordSketch.Chat do
  def process_message(user, message, target_word) do
    if String.downcase(String.trim(message)) === target_word do
      user <> " guessed the word."
    else
      message
    end
  end
end
