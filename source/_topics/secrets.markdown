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

The `configuration.yaml` file a plain-text file thus it is readable for everyone who has access to the file. The file contains passwords and API tokens which need to be redacted if you want to share your configuration. This separation can also help you to keep easier track of your passwords and API keys (as they are all stored at one place and no longer spread across the `configuration.yaml` file) if you don't want to  [split up your configuration](topics/splitting_configuration/).

### {% linkable_title Using secrets.yaml %}

The workflow for the outsourcing in the `secrets.yaml` are very similar to the [splitting of the configuration](topics/splitting_configuration/). Create a `secrets.yaml` file in your Home assistant configuration directory (The location of the folder differs between operating systems: on OS X and Linux it's `~/.homeassistant` and on Windows it's `%APPDATA%/.homeassistant`).

The entries for password and API keys in the `configuration.yaml` file usally looks like the example below.

```yaml
http:
  api_password: YOUR_PASSWORD
```

Those entries need to be replaced with `!secret` and a identifier.

```yaml
http:
  api_password: !secret http_password
```

The `secrets.yaml` files stored the corresponding password assigned to the identifier.

```yaml
debug: 0
http_password: YOUR_PASSWORD
```

### {% linkable_title Python Keyring %}

Using [Keyring](http://pythonhosted.org/keyring/) is an alternative way to `secrets.yaml` but requires that `keyring` is installed (incl. its command-line tools). This can be done with:

```bash
$ pip3 install keyring
```

Replaced your password or API key with `!secret` and an identifier in `configuration.yaml` file.

```yaml
http:
  api_password: !secret http_password
```

Create an entry in your keyring. The service is (SERVICE) `homeassistant` and the identifier is the USERNAME. 

```bash
$ keyring-3.4 set homeassistant http_password
Password for 'http_password' in 'homeassistant': YOUR_PASSWORD
```


