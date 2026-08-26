---
title: LibreNMS
description: Instructions on how to integrate a LibreNMS instance into Home Assistant.
ha_category:
  - Binary Sensor
ha_release: 2026.9
ha_config_flow: true
ha_iot_class: Local Polling
ha_domain: librenms
ha_platforms:
  - binary_sensor
ha_codeowners:
  - '@mib1185'
ha_integration_type: service
ha_quality_scale: bronze
---

This {% term integration %} allows you to add a [LibreNMS](https://www.librenms.org/) instance to Home Assistant.

## Prerequisites

You need to [obtain an API key (token)](https://docs.librenms.org/API/#tokens) for your LibreNMS instance.

{% include integrations/config_flow.md %}

{% configuration_basic %}
URL:
  description: "The URL of your LibreNMS instance. (_e.g. `https://librenms.example.com`_)."
API key:
  description: "API key of your user account to connect to your LibreNMS instance."
Verify SSL certificate:
  description: "Whether to verify the SSL certificate when SSL encryption is used to connect to your LibreNMS instance."
{% endconfiguration_basic %}

## Data updates

The integration polls data every 60 seconds.

## Binary sensors

The following {% term binary_sensor %} entities are created.

| Entity | Description | Default enabled |
| --- | --- | --- |
| **Status** | Shows the status if the device is connected or not | ✅ |

## Troubleshooting

When reporting an issue, enable [debug logging](/docs/configuration/troubleshooting/#debug-logs-and-diagnostics), restart the integration, and once the issue recurs, disable debug logging again (_the debug log download starts automatically_). If possible, also download the [diagnostics](/integrations/diagnostics/) data, and include both the debug log and diagnostics data with your issue report.

## Known limitations

There are no known limitations.

## Remove the integration

{% include integrations/remove_device_service.md %}

If you no longer use the API key, you can remove it from your LibreNMS instance.
