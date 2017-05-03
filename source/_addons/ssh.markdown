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

Setup a [ssh](https://openssh.org/) server. Allow to access severals hass.io folders with ssh client. It allow also to do some tunneling for access from outside. It should by used only on a ResinOS platform, generic linux would have here own ssh server.

```json
{
  "authorized_keys": [
    "ssh-rsa AKDJD3839...== my-key"
  ]
}
```

Option variables:

- **authorized_keys** (*Required*): default empty. Your public-keys for authorized keyfile. Every element will be a line inside that file.
