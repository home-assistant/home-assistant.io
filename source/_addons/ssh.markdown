---
layout: page
title: "SSH Server"
description: "Allow logging in remotely to your server using SSH."
date: 2017-04-30 13:28
sidebar: true
comments: false
sharing: true
footer: true
---

Setting up a [SSH](https://openssh.org/) server allows access to hass.io folders with SSH client. It also allows tunneling for access from an external network. Please note that you only need to do this on a ResinOS platform as most Linux flavors have their own SSH server.

```json
{
  "authorized_keys": [
    "ssh-rsa AKDJD3839...== my-key"
  ]
}
```

Configuration variables:

- **authorized_keys** (*Required*): Your public-keys for authorized keyfile. Every element will be a line inside that file.
