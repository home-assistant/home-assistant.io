---
layout: page
title: "Storing secrets"
description: "Storing secrets outside of your configuration.yaml."
date: 2016-07-01 08:30
sidebar: false
comments: false
sharing: true
footer: true
---

The `configuration.yaml` file a plain-text file thus it is readable for everyone who has access to the file. The file contains passwords and API tokens which need to be redacted if you want to share your configuration. This separation can also help you to keep easier track of your passwords and API keys (as they are all stored at one place and no longer spread across the `configuration.yaml` file) if you don't want to  [split up your configuration](/topics/splitting_configuration/).

### {% linkable_title Using secrets.yaml %}

The workflow for the outsourcing in the `secrets.yaml` is very similar to the [splitting of the configuration](/topics/splitting_configuration/). Create a `secrets.yaml` file in your Home assistant configuration directory (The location of the folder differs between operating systems: on OS X and Linux it's `~/.homeassistant` and on Windows it's `%APPDATA%/.homeassistant`).

The entries for password and API keys in the `configuration.yaml` file usually looks like the example below.

```yaml
http:
  api_password: YOUR_PASSWORD
```

Those entries need to be replaced with `!secret` and a identifier.

```yaml
http:
  api_password: !secret http_password
```

The `secrets.yaml` file contains the corresponding password assigned to the identifier.

```yaml
logger: debug
http_password: YOUR_PASSWORD
```

### {% linkable_title Storing passwords in a keyring managed by your OS %}

Using [Keyring](http://pythonhosted.org/keyring/) is an alternative way to `secrets.yaml`. They can be managed from the command line via the keyring script.

```bash
$ hass --script keyring --help
```

To store a password in keyring, replace your password or API key with `!secret` and an identifier in `configuration.yaml` file.

```yaml
http:
  api_password: !secret http_password
```

Create an entry in your keyring.

```bash
$ hass --script keyring set http_password
```

If you launch home Assistant now, you will be prompted for the keyring password to unlock your keyring.

```bash
$ hass
Config directory: /home/fab/.homeassistant
Please enter password for encrypted keyring:
```

<p class='note warning'>
  If your are using the Python Keyring, [autostarting](/getting-started/autostart/) of Home Assistant will no longer work.
</p>
