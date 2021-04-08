---
title: Smappee
description: Instructions on how to setup Smappee within Home Assistant.
ha_category:
  - Hub
  - Energy
  - Binary Sensor
  - Sensor
  - Switch
ha_iot_class: Cloud polling
ha_release: 0.64
ha_config_flow: true
ha_codeowners:
  - '@bsmappee'
ha_domain: smappee
ha_zeroconf: true
ha_platforms:
  - binary_sensor
  - sensor
  - switch
---

The Smappee integration will allow users to integrate their Smappee monitors, Smappee Comfort Plugs and Smappee Switches into Home Assistant using the local API, local MQTT broker or the [official cloud API](https://smappee.atlassian.net/wiki/spaces/DEVAPI/overview).

## Local discovery

In most cases, the Smappee Energy, Solar, Plus, Pro and Genius monitors will be automatically discovered by Home Assistant through network scanning.
Those automatically discovered Smappee devices are listed on the integrations page and can be configured without any additional details.
This will provide you a limited number of entities only (realtime power values, solar if applicable and the installed Smappee Comfort Plugs and Smappee Switches).
If your home network doesn't support mDNS you can still manually initiate the Smappee integration by choosing the LOCAL option and entering the IP address of the Smappee monitor through the configuration flow.

If you have API credentials, we strongly suggest you use the Smappee cloud configured integration by following the scheme below.

## Cloud API configuration

To use the Smappee integration you need a personal `client_id` and `client_secret` and add these to your `configuration.yaml` file. The `client_id` and `client_secret` can be obtained by contacting [info@smappee.com](mailto:info@smappee.com) and require a recurring monthly fee.
For any information about the use of the API please refer to the [Smappee API space](https://smappee.atlassian.net/wiki/spaces/DEVAPI/overview).

```yaml
# Example configuration.yaml entry
smappee:
  client_id: YOUR_CLIENT_ID
  client_secret: YOUR_CLIENT_SECRET
```

Once Home Assistant restarted, go to Configuration > Integrations and select the Smappee integration. You will be redirected to a login page and be able to select the locations you would like to use within Home Assistant.

{% configuration %}
client_id:
  description: Your Smappee API client ID.
  required: true
  type: string
client_secret:
  description: Your Smappee API client secret.
  required: true
  type: string
{% endconfiguration %}
