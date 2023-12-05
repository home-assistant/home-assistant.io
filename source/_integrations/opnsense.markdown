---
title: OPNSense
description: Instructions on how to configure OPNsense integration
ha_category:
  - Hub
  - Presence detection
ha_release: 0.105
ha_codeowners:
  - '@mtreinish'
  - '@rtm516'
ha_domain: opnsense
ha_iot_class: Local Polling
ha_platforms:
  - device_tracker
ha_integration_type: integration
ha_config_flow: true
---

[OPNsense](https://opnsense.org/) is an open source HardenedBSD based firewall
and routing platform. There is currently support for the following device types
within Home Assistant:

- [Presence detection](#presence-detection)

{% include integrations/config_flow.md %}

The API key and API secret values are acquired from your OPNsense
router using the web interface. For more information on this procedure, refer
to the OPNsense [documentation](https://docs.opnsense.org/development/how-tos/api.html#creating-keys).

User with API Key requires privileges for Type: 

- GUI Name: Diagnostics: ARP Table
- GUI Name: Diagnostics: Network Insight

## Presence detection

This platform allows you to detect presence by looking at devices connected to an OPNsense router.
