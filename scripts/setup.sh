#!/usr/bin/env bash

set -e

echo "Creating .env file..."
if [ ! -f .env ]; then
  cp .env.sample .env
else
  read -p "File .env already exists. Do you want to overwrite it? (Y/n)" yn

  if echo "$yn" | grep '^[Yy]\?$'; then
    cp .env.sample .env
  fi
fi

if git config --get core.hooksPath &>/dev/null; then
  echo "Git hooks are already configured."
else
  read -p "Do you want to configure git hooks? (Y/n)" yn

  if echo "$yn" | grep '^[Yy]\?$'; then
    echo "Configuring git hooks..."
    git config core.hooksPath .hooks
  fi
fi

echo "Done!"
