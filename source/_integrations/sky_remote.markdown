---
title: Sky Remote Control
description: The Sky Remote integration allows you to control a Sky box with Home Assistant.
ha_category:
  - Remote
ha_release: 2024.12
ha_domain: sky_remote
ha_config_flow: true
ha_codeowners:
  - '@dunnmj'
  - '@saty9'
ha_iot_class: Assumed State
ha_platforms:
  - remote
ha_integration_type: device
related:
  - docs: /docs/configuration/
    title: Configuration file
---

The **Sky Remote Control** {% term integration %} lets you control a [Sky](https://www.sky.com/) box using Home Assistant.

## Supported models

This integration is intended to control Sky+ HD and Sky Q satellite receiver boxes with a LAN port. It will not control Sky stream pucks.

{% include integrations/config_flow.md %}

{% configuration_basic %}
host:
  description: "Hostname or IP address of your Sky device (e.g., 192.168.1.250). This can typically be found in your Sky box network settings or router's DHCP client list."
  required: true
  type: string
{% endconfiguration_basic %}

## Remote

The Sky Remote platform will create a [Remote](/integrations/remote/) entity for the device. This entity allows you to send commands via the `remote.send_command` action.

{% include integrations/actions.md %}
