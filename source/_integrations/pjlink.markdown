---
title: PJLink
description: Instructions on how to integrate PJLink enabled projectors into Home Assistant.
ha_category:
  - Media player
ha_release: 0.76
ha_iot_class: Local Polling
ha_domain: pjlink
ha_platforms:
  - media_player
ha_config_flow: true
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
---

The **PJLink** {% term integration %} allows you to control PJLink-compatible projectors from Home Assistant using the [PJLink protocol](https://pjlink.jbmia.or.jp/english/index.html).

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
    description: "IP address or hostname of the device. Example: `192.168.1.2`"
Port:
    description: "Port on which the PJLink service runs on the device."
Password:
    description: "Password to authenticate with the projector."
{% endconfiguration_basic %}
