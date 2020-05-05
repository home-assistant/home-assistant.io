---
title: Smappee
description: Instructions on how to setup Smappee within Home Assistant.
ha_release: 0.64
ha_category:
  - Hub
  - Energy
  - Sensor
  - Switch
ha_iot_class: Local Push
ha_domain: smappee
---

The `smappee` integration adds support for the [Smappee](https://www.smappee.com/) controller for energy monitoring and Comport plug switches.

There is currently support for the following device types within Home Assistant:

- Sensor
- Switch

Will be automatically added when you connect to the Smappee controller.

The smappee integration gets information from [Smappee API](https://smappee.atlassian.net/wiki/spaces/DEVAPI/overview). Note: their cloud API now requires a subscription fee of €2.50 per month for Smappee Energy/Solar or €3 per month for Smappee Plus.

## Configuration

Info on how to get API access is described in the [smappy wiki](https://github.com/EnergieID/smappy/wiki).

To use the `smappee` integration in your installation, add the following to your `configuration.yaml` file:

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

{% configuration %}
host:
  description: Your Local Smappee unit IP.
  required: false
  type: string
host_password:
  description: Your Local Smappee password.
  required: false
  type: string
client_id:
  description: Your Smappee API client ID.
  required: false
  type: string
client_secret:
  description: Your Smappee API client secret.
  required: false
  type: string
username:
  description: Your My Smappee username.
  required: false
  type: string
password:
  description: Your My Smappee password.
  required: false
  type: string
{% endconfiguration %}
