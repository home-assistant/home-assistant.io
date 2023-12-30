---
title: Govee Lights - Local API
description: Instructions on how to integrate Govee Lights with Govee Local API
ha_category:
  - Lights
ha_release: 2024.1
ha_iot_class: Local Push
ha_codeowners:
  - '@Galorhallen'
ha_domain: govee_light_api
ha_config_flow: true
ha_platforms:
  - light
ha_integration_type: integration
---

Integrates [Govee](https://www.govee.com/) Lights into Home Assistant using Local API control.

To enable local control on your Govee device, refer to the instructions available [here](https://app-h5.govee.com/user-manual/wlan-guide).

{% include integrations/config_flow.md %}

## Supported devices

- H615A
- H618A
- H619A

<div class='note'>
It is highly probable that all devices listed <a href="https://app-h5.govee.com/-manual/wlan-guide">here</a> are compatible with this integration.
However, they have not been tested.
</div>

{% configuration %}
bind_address:
    description: The LAN address of the device where Home Assistant is running.
    default: The local IP address of Home Assistant
    required: true
    type: string
discovery_interval:
    description: The time, in seconds, controlling the frequency of multicast discovery messages sent by Home Assistant.
    default: 60
    required: true
    type: integer
multicast_address:
    description: The multicast IPv4 address to which Home Assistant sends discovery messages.
    default: 239.255.255.250
    required: true
    type: string
listening_port:
    description: The UDP port on which Home Assistant will listen for responses from Govee devices.
    default: 4002
    required: true
    type: integer
target_port:
    description: The UDP port of the Govee devices where Home Assistant sends commands.
    default: 4001
    required: true
    type: integer
{% endconfiguration %}
