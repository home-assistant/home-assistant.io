---
title: OPNsense
description: Instructions on how to configure OPNsense integration
ha_category:
  - Hub
  - Presence detection
ha_release: 0.105
ha_codeowners:
  - '@Snuffy2'
ha_domain: opnsense
ha_iot_class: Local Polling
ha_platforms:
  - device_tracker
ha_integration_type: integration
ha_quality_scale: bronze
ha_config_flow: true
---

[OPNsense](https://opnsense.org/) is an open source FreeBSD based firewall
and routing platform. There is currently support for the following device types
within Home Assistant:

- [Presence detection](#presence-detection)

## Configuration

Before you add the integration, create an API key and secret in OPNsense.
For the full process, refer to the OPNsense
[API key documentation](https://docs.opnsense.org/development/how-tos/api.html#creating-keys).
The API user needs these privileges:

- GUI Name: Diagnostics: ARP Table
- GUI Name: Diagnostics: Network Insight

{% important %}
This integration version requires OPNsense firmware earlier than `25.7`.
{% endimportant %}

{% include integrations/config_flow.md %}

## Configuration options

{% configuration_basic %}
URL:
  description: "The URL of your OPNsense API endpoint."
API Key:
  description: "The API key for your OPNsense API user."
API Secret:
  description: "The API secret for your OPNsense API user."
Verify SSL:
  description: "Enable this if you want Home Assistant to verify your OPNsense SSL certificate."
Tracker interfaces:
  description: "Optional list of interfaces to track. Enter values as a comma-separated list or one per line. Leave empty to track all interfaces."
{% endconfiguration_basic %}

## Migrating from YAML configuration

{% warning %}
YAML configuration for OPNsense is deprecated and will be removed in Home Assistant 2026.10.
{% endwarning %}

If you already configured OPNsense in `configuration.yaml`, Home Assistant
imports that setup into the UI automatically. After the import:

1. Remove the `opnsense:` block from your `configuration.yaml` file.
2. Restart Home Assistant.


## Presence detection

This platform allows you to detect presence by looking at devices connected to an OPNsense router.
