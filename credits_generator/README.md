credits_generator
=================

This tool can be used to update the [Home Assistant's Credits page](https://home-assistant.io/developers/credits/).

```bash
$ cd credits_generator
$ npm install
```

Set your personal GitHub access token as environmental variable.

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

