---
layout: page
title: "Smappee"
description: "Instructions how to setup Smappee within Home Assistant."
date: 2018-01-06 16:15
sidebar: true
comments: false
sharing: true
footer: true
logo: smappee.png
ha_release: "0.62"
ha_category: Hub
---

[Smappee](https://www.smappee.com/) controller for energy monitoring and Comport plug switches.

Switches and Sensors are supported - and will be automatically added when you connect to the Smappee controller.

The smappee component gets information from [Smappee API](https://smappee.atlassian.net/wiki/display/DEVAPI/API+Methods) using the [smappy](https://github.com/EnergieID/smappy) pypy module

<p class='note'>
Info on how to get api access is described in the [smappy wiki](https://github.com/EnergieID/smappy/wiki)
</p>

# Configuration

```yaml
# Example configuration.yaml entry
smappee:
    host: 10.0.0.5
    client_id: YOUR_CLIENT_ID
    client_secret: YOUR_CLIENT_SECRET
    username: YOUR_MYSMAPPEE_USERNAME
    password: YOUR_MYSMAPPEE_PASSWORD
```

```yaml
# Minimal example configuration.yaml entry
smappee:
    host: 10.0.0.5
```

```yaml
# Cloud only example configuration.yaml entry
smappee:
    client_id: YOUR_CLIENT_ID
    client_secret: YOUR_CLIENT_SECRET
    username: YOUR_MYSMAPPEE_USERNAME
    password: YOUR_MYSMAPPEE_PASSWORD
```

Configuration variables:

- **host** (*Optional*): Your Local Smappee unit IP.
- **host_password** (*Optional*): Your Local Smappee password.
- **client_id** (*Optional*): Your Smappee API client_id.
- **client_secret** (*Optional*): Your Smappee API client_secret.
- **username** (*Optional*): Your My Smappee username.
- **password** (*Optional*): Your My Smappee password.
