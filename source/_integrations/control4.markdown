---
title: Control4
description: Instructions on adding a Control4 system to Home Assistant.
ha_release: '0.114'
ha_category:
  - Light
  - Media Player
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@lawtancool'
ha_domain: control4
ha_ssdp: true
ha_platforms:
  - light
  - media_player
ha_integration_type: integration
---

The **Control4** {% term integration %} allows you to control and monitor lights and Room Media from your local Control4 system. Your Control4 controller must be running OS 3.0+.

## Prerequisites

Before setting up, you should assign a static IP address/DHCP reservation on your router to your Control4 controller. Home Assistant must be able to communicate with the controller over the local network; 4Sight remote access is not supported.

{% include integrations/config_flow.md %}

## Options

The Control4 {% term integration %} offers additional options in {% my integrations title="**Settings** > **Devices & Services**" %} > **Control4** > **Options**:

{% configuration %}
Seconds between updates:
  description: How often Home Assistant will poll the Control4 controller for state updates. Very frequent polling could cause the controller to lag, especially with many devices.
  required: false
  type: integer
  default: 5
{% endconfiguration %}
