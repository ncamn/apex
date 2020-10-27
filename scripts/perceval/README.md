# perceval

## Getting started

The script reads some of its configuration from environment variables. One of the easiest ways to configure your environment is to work with a `.env` file.

You can create one at the project's root with the following content, and replace the dummy values accordingly.

```text
HEADLESS="true"
MESSENGER_EMAIL="dummy@dummy.com"
MESSENGER_PASSWORD="dummy"
CONVERSATION_ID="dummy"
SPOTIFY_USER_ID="dummy"
```

The script itself does not read `.env` files, so you must load it by hand or by using a plugin for you shell (ex: [dotenv](https://github.com/ohmyzsh/ohmyzsh/tree/master/plugins/dotenv) for `zsh`).

Finally, you can fetch the script dependencies, build its TypeScript sources and run it with `yarn`, `yarn build` and `yarn start` (in the order).

## Selectors

You can override the CSS selectors used to scrape Messenger by copying the `config.yml` file to a new `config.override.yml` file next to it, and updating the values in the file according to your need.

## Tested NodeJs versions

* NodeJS v14.3
