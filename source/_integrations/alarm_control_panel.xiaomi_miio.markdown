---
title: "Xiaomi Gateway Alarm"
description: "Instructions on how to integrate your Xiaomi Gateway Alarm within Home Assistant."
logo: xiaomi.png
ha_category:
  - Alarm
ha_iot_class: Local Polling
ha_release: "0.110"
ha_domain: xiaomi_miio
---

The `xiaomi_miio` alarm_control_panel platform allows you to control the state of your Xiaomi Gateway Alarm.

Please follow the instructions on [Retrieving the Access Token](/integrations/vacuum.xiaomi_miio/#retrieving-the-access-token) to get the API token to use during configuration.

## Features

- Turn on/off Alarm
- See the status of Alarm (armed_away, disarmed, arming)

## Configuration

To set up the Xiaomi gateway, click Configuration in the sidebar, then click Integrations and then click the + icon in the lower right and find xiaomi_miio. Select the option "Connect to a Xiaomi Gateway" and click submit. You will then be presented with a form in which you will need to fill in the "IP address" and 32 characters "token". Optionally, you can specify a different name for the gateway. After you click submit, you will have the opportunity to select the area that your devices are located.

{% configuration %}
host:
  description: The IP address of your Xiaomi gateway.
  required: true
  type: string
token:
  description: The API token of your Xiaomi gateway.
  required: true
  type: string
name:
  description: The name of your Xiaomi gateway.
  required: false
  type: string
  default: Xiaomi Gateway
{% endconfiguration %}
