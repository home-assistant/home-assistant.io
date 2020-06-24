---
title: Home Connect
description: Instructions on how to set up the Home Connect integration within Home Assistant.
logo: homeconnect.png
ha_category:
  - Hub
  - Binary Sensor
  - Sensor
  - Switch
ha_iot_class: Cloud Push
ha_release: '0.110'
ha_domain: home_connect
ha_codeowners:
  - '@DavidMStraub'
ha_config_flow: true
---

The Home Connect integration allows users to integrate their home appliances supporting the Home Connect standard for Bosch and Siemens using the [official cloud API](https://developer.home-connect.com).

The integration will add one Home Assistant device for each connected home appliance which will have the following entities:

- A power switch
- If the device has programs, switches for each of the individual programs will be added. Note that program options cannot be configured currently.
- If the device has programs, a timestamp sensor for remaining time and a numeric sensor for the progress percentage.

Note that it depends on the appliance and on API permissions which of the features are supported. A notable limitation is that oven programs cannot be started currently.

## Installation

### Installation using a developer account

1. Visit [https://developer.home-connect.com](https://developer.home-connect.com) and sign up for a developer account.
2. Under [Applications](https://developer.home-connect.com/applications), register a new App:

- Application ID: Home Assistant (or whatever name makes sense to you)
- OAuth Flow: Authorization Code Grant Flow
- Redirect URI  : `<YOUR_HOME_ASSISTANT_URL>/auth/external/callback`

3. Add the client ID and client secret to your `configuration.yaml` (see below).
4. Once Home Assistant has restarted, go to Configuration > Integrations.
5. Select the Home Connect integration.

### Configuration

```yaml
# Example configuration.yaml entry

home_connect:
  client_id: CLIENT_ID
  client_secret: CLIENT_SECRET
```

{% configuration %}
client_id:
  description: Your Home Connect client ID.
  required: true
  type: string
client_secret:
  description: Your Home Connect client secret.
  required: true
  type: string
{% endconfiguration %}
