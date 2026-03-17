---
title: Avi-on
description: Instructions on how to setup GE Avi-on Bluetooth dimmers within Home Assistant.
ha_category:
  - Light
ha_iot_class: Assumed State
ha_release: 0.37
ha_domain: avion
ha_platforms:
  - light
ha_integration_type: integration
ha_quality_scale: legacy
---

Support for the Avi-on Bluetooth dimmer switch [Avi-on](https://avi-on.com/).

## Setup

If you want to add your devices manually (like in the example below) then you need to get the API key. The API key can be obtained by executing the following command:

```bash
$ curl -X POST -H "Content-Type: application/json" \
    -d '{"email": "fakename@example.com", "password": "password"}' \
    https://api.avi-on.com/sessions | jq
```

with the email and password fields replaced with those used when registering the device via the mobile app. The pass phrase field of the output should be used as the API key in the configuration.

## Configuration

To enable these lights, add the following lines to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
light:
  - platform: avion
```

There are two ways to configure this integration: username & password, or list of devices. You must choose one.

{% configuration %}
username:
  description: The username used in the Avion app. If username and password are both provided, all associated switches will automatically be added to your configuration.
  required: false
  type: string
password:
  description: The password used in the Avion app.
  required: false
  type: string
devices:
  description: An optional list of devices with their Bluetooth addresses.
  required: false
  type: list
  keys:
    name:
      description: A custom name to use in the frontend.
      required: false
      type: string
    api_key:
      description: The API Key.
      required: true
      type: string
    id:
      description: The ID of the dimmer switch. Only needed for independent control of multiple devices.
      required: true
      type: string
{% endconfiguration %}

## Full example

If username and password are not supplied, devices must be configured manually like so:

```yaml
# Manual device configuration.yaml entry
light:
  - platform: avion
    devices:
      00:21:4D:00:00:01:
        name: Light 1
        api_key: YOUR_API_KEY
```

For independent control of multiple devices, you must specify each device's ID (integer starting with 1). Each switch's ID can be guessed or detected from the Avi-on API.

```yaml
# Manual device configuration.yaml entry
light:
  - platform: avion
    devices:
      00:21:4D:00:00:01:
        name: Light 1
        api_key: YOUR_API_KEY
        id: 1
      00:21:4D:00:00:02:
        name: Light 1
        api_key: YOUR_API_KEY
        id: 2
```
