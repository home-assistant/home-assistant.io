---
title: OPNsense
description: Instructions on how to configure OPNsense integration
ha_category:
  - Hub
  - Presence detection
ha_release: 0.105
ha_codeowners:
  - '@mtreinish'
ha_domain: opnsense
ha_iot_class: Local Polling
ha_platforms:
  - device_tracker
ha_integration_type: integration
ha_quality_scale: legacy
ha_config_flow: true
---

[OPNsense](https://opnsense.org/) is an open source FreeBSD based firewall
and routing platform. There is currently support for the following device types
within Home Assistant:

- [Presence detection](#presence-detection)

{% include integrations/config_flow.md %}

{% configuration_basic %}
URL:
  description: "The full URL for the router API. Ex. `https://router.local:443/api`"
API key:
  description: "The API key."
API secret:
  description: "The API key secret."
Verify SSL:
  description: "Whether the SSL certificate should be verified."
Tracker interfaces:
  description: "Optionally restrict the interfaces used for device scanning."
{% endconfiguration_basic %}

You can update the verify SSL and tracker interfaces settings after installation. To do so,
reconfigure the device via
{% my integrations title="**Settings** > **Devices & services**" %},
select {% icon "mdi:dots-vertical" %} for the device you wish to update,
and select **Reconfigure**.

The API key and API secret values are acquired from your OPNsense
router using the web interface. For more information on this procedure, refer
to the OPNsense [documentation](https://docs.opnsense.org/development/how-tos/api.html#creating-keys).

User with API Key requires privileges for Type:

- GUI Name: Diagnostics: ARP Table
- GUI Name: Status: Interfaces
- GUI Name: System: Firmware

## Presence detection

This platform allows you to detect presence by looking at devices connected to an OPNsense router.
