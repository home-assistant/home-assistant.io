---
title: "keyring"
description: "Script to store secrets in a keyring"
---

Using [Keyring](https://github.com/jaraco/keyring) is an alternative way to `secrets.yaml`. The secrets can be managed from the command line via the `keyring` script.

```bash
$ hass --script keyring --help
```

To store a password in keyring, replace your password or API key with `!secret` and an identifier in `configuration.yaml` file.

```yaml
integration1:
  api_key: !secret integration1_key
```

Create an entry in your keyring.

```bash
$ hass --script keyring set integration1_key
```

If you launch Home Assistant now, you will be prompted for the keyring password to unlock your keyring.

```bash
$ hass
Config directory: /home/homeassistant/.homeassistant
Please enter password for encrypted keyring:
```

<div class='note warning'>

  If you are using the Python Keyring, [autostarting](/getting-started/autostart/) of Home Assistant will no longer work.

</div>
