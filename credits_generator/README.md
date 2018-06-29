credits_generator
=================

This tool can be used to update the [Credits page for Home Assistant](https://home-assistant.io/developers/credits/).

Setup
-----

Fetch the dependencies with `npm`.
```bash
$ cd credits_generator
$ npm install
```

Usage
-----
Go to https://github.com/settings/tokens/new and generate a new GitHub personal access token.
Give the token any name and select the `public_repo` and `read:user` scopes.


Set the environment variable `GITHUB_TOKEN` to the new token.

```bash
$ export GITHUB_TOKEN=<Your GitHub access token>
```

Run the script.

```bash
$ node update_credits.js
```

Commit the changes (depending on our setup).

```bash
$ git commit ../source/developers/credits.markdown
$ git push upstream
```

