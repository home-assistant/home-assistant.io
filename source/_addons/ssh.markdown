---
title: "SSH Server"
description: "Allow logging in remotely to Hass.io using SSH."
featured: true
---

Setting up an [SSH](https://openssh.com/) server allows access to your Hass.io folders with any SSH client. It also includes a command-line tool to access the [Hass.io API](https://github.com/home-assistant/hassio/blob/dev/API.md). Try it out:

```bash
hassio help
```

<div class='note'>

This add-on will not enable you to install packages or do anything as root. This is not allowed with Hass.io.

</div>

To use this add-on, you must have a private/public key to log in. To generate them, follow the [instructions for Windows][win] and [these for other platforms][other]. It is possible to set a password for login since version 2.0 but for high security use private/public keys. You can not run both variants at the same time.

To start this add-on for the first time, you either need to include a key (enclosed in quotation marks, on a single line without line breaks) or set a password in the options section.

```json
{
  "authorized_keys": [
    "ssh-rsa AKDJD3839...== my-key"
  ],
  "password": ""
}
```

The username for login over SSH is `root`. The complete login command is `ssh root@hassio.local`.

After logging in, you will find yourself in this add-on's container. The Home Assistant configuration directory is mounted on the path `/config`.

{% configuration %}
authorized_keys:
  description: Your public keys for the authorized key file. Every element will be a line inside that file.
  required: false
  type: string
password:
  description: Set a password for login. We do **NOT** recommend this variant.
  required: false
  type: string
{% endconfiguration %}

<div class='videoWrapper'>
<iframe width="560" height="315" src="https://www.youtube.com/embed/L7PCPQYwspo" frameborder="0" allowfullscreen></iframe>
</div>

[win]: https://www.digitalocean.com/community/tutorials/how-to-create-ssh-keys-with-putty-to-connect-to-a-vps
[other]: https://help.github.com/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent/

<div class='note'>
This add-on is not compatible if Hass.io was installed via the generic Linux installer.
</div>
