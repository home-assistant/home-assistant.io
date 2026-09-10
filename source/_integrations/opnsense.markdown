---
title: OPNsense
description: Instructions on how to configure OPNsense integration
ha_category:
  - Hub
  - Presence detection
ha_release: 0.105
ha_codeowners:
  - '@HarlemSquirrel'
  - '@Snuffy2'
ha_domain: opnsense
ha_iot_class: Local Polling
ha_platforms:
  - device_tracker
ha_integration_type: hub
ha_quality_scale: legacy
ha_config_flow: true
---

[OPNsense](https://opnsense.org/) is an open source FreeBSD based firewall
and routing platform. There is currently support for the following device types
within Home Assistant:

- [Presence detection](#presence-detection)
- [Sensors](#sensors)


{% include integrations/config_flow.md %}

{% configuration_basic %}
URL:
  description: "The full URL for the router API. For example, `https://router.local:443/api`"
API key:
  description: "The API key."
API secret:
  description: "The secret that pairs with your API key and is required for authentication."
Verify SSL:
  description: "Whether to verify the router's SSL certificate. Keep this enabled unless your router uses a self-signed certificate in a trusted environment. Disabling certificate verification reduces security, because Home Assistant can no longer confirm that it is connecting to the correct router."
Tracker interfaces:
  description: "Optionally restrict the interfaces used for device scanning."
{% endconfiguration_basic %}

The API key and API secret values are acquired from your OPNsense
router using the web interface. For more information on this procedure, refer
to the OPNsense [documentation](https://docs.opnsense.org/development/how-tos/api.html#creating-keys).

The API user requires the following privileges:

- GUI Name: Diagnostics: ARP Table
- GUI Name: Status: Interfaces
- GUI Name: System: Firmware

## Presence detection

This platform allows you to detect presence by looking at devices connected to an OPNsense router.

## Sensors

These sensors are automatically created and associated with each tracker entity:

- **Interface**: The name of the interface the device is connected to (for example, "LAN").

The following are also added but are disabled by default:

- **Expired**: If the connection has become idle.
- **Expires**: When the connection will expire if the device doesn't check in again.
