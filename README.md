<div align="center">
  <img src="https://github.com/user-attachments/assets/957df16d-6f5f-4534-8da1-dc517f6f3eae" alt="FalseBott"><br>
  <sub>Your least favorite Discord bot</sub>
</div>

## Usage

The below usage instructions assume you have a working [Discord
bot](https://discord.com/developers/docs/intro) and [OpenAI API
key](https://platform.openai.com/account/api-keys), as well as a non-Windows
machine.

## Development

### Prerequisites

Since the bot is written for Node.js, you will need to have Node.js installed:

- [Node.js](https://nodejs.org/en/download/package-manager)

The bot runs on **Discord** and uses **OpenAI's** API to generate responses, so
make sure to have the following:

- [Discord app](https://discord.com/developers/applications)
- [OpenAI API key](https://platform.openai.com/api-keys)

These can be created with the default settings.

### Setup

Install dependencies:

```console
npm ci
```

If you want to install the git hooks, run:

```console
npm run setup
```

These will run the linter and tests before pushing.

### Running

Run the bot locally:

```console
npm run dev
```

### Testing

Run tests:

```console
npm test
```

## License

[MIT](LICENSE)
