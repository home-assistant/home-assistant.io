---
layout: page
title: "Smappee"
description: "Instructions on how to setup Smappee within Home Assistant."
date: 2018-02-26 08:37
sidebar: true
comments: false
sharing: true
footer: true
logo: smappee.png
ha_release: "0.64"
ha_category: Hub
---

The `smappee` component adds support for the [Smappee](https://www.smappee.com/) controller for energy monitoring and Comport plug switches.

Switches and Sensors are supported - and will be automatically added when you connect to the Smappee controller.

The smappee component gets information from [Smappee API](https://smappee.atlassian.net/wiki/display/DEVAPI/API+Methods).

## {% linkable_title Configuration %}

Info on how to get API access is described in the [smappy wiki](https://github.com/EnergieID/smappy/wiki).

To use the `smappee` component in your installation, add the following to your `configuration.yaml` file:


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
