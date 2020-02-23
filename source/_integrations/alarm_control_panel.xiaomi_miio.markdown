---
title: "Xiaomi Gateway Alarm"
description: "Instructions on how to integrate your Xiaomi Gateway Alarm within Home Assistant."
logo: xiaomi.png
ha_category:
  - Alarm
ha_iot_class: Local Polling
ha_release: 0.107
---

The `xiaomi_miio` alarm_control_panel platform allows you to control the state of your Xiaomi Gateway Alarm.

Please follow the instructions on [Retrieving the Access Token](/integrations/vacuum.xiaomi_miio/#retrieving-the-access-token) to get the API token to use in the `configuration.yaml` file.

## Features

- Turn on/off Alarm
- See status of Alarm (armed_away, disarmed, arming)

## Configuration

To add the xiaomi gateway alarm to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entries
alarm_control_panel:
  - platform: xiaomi_miio
    host: GATEWAY_IP_ADDRESS
    token: YOUR_TOKEN
```

{% configuration %}
host:
  description: The IP address of your xiaomi gateway.
  required: true
  type: string
token:
  description: The API token of your xiaomi gateway.
  required: true
  type: string
name:
  description: The name of your xiaomi gateway.
  required: false
  type: string
  default: Xiaomi Gateway Alarm
{% endconfiguration %}
