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

### {% linkable_title Python Keyring %}

Using [Keyring](http://pythonhosted.org/keyring/) is an alternative way to `secrets.yaml` but requires that `keyring` is installed (incl. its command-line tools). This can be done with:

```bash
$ pip3 install keyring
```

Replace your password or API key with `!secret` and an identifier in `configuration.yaml` file.

```yaml
http:
  api_password: !secret http_password
```

Create an entry in your keyring. The service (SERVICE) is `homeassistant` and the identifier is the USERNAME in the keyring context.

```bash
$ keyring set homeassistant http_password
Password for 'http_password' in 'homeassistant': 
Please set a password for your new keyring: 
Please confirm the password: 
```

If the command-line tool `keyring` is not available, launch `python3` and do the process manually.

```python
>>> import keyring
>>> keyring.set_password("homeassistant", "http_password", "12345")
Please set a password for your new keyring: 
Please confirm the password: 
>>> keyring.get_password("homeassistant", "http_password")
'12345'
>>> keyring.get_keyring()
<EncryptedKeyring at /home/your_user/.local/share/python_keyring/crypted_pass.cfg>
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

