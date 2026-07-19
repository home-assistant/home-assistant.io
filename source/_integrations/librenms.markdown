---
title: LibreNMS
description: Instructions on how to integrate an LibreNMS instance into Home Assistant.
ha_category:
  - Binary Sensor
ha_release: 2025.8
ha_config_flow: true
ha_iot_class: Local Polling
ha_domain: librenms
ha_platforms:
  - binary_sensor
ha_codeowners:
  - '@mib1185'
ha_integration_type: service
ha_quality_scale: silver
---

This {% term integration %} allows adding an [LibreNMS](https://www.librenms.org/) instance to Home Assistant.

## Prerequisites

You need to [obtain an API token](https://docs.librenms.org/API/#tokens) for your LibreNMS instance.

{% include integrations/config_flow.md %}

{% configuration_basic %}
URL:
  description: "The URL of your LibreNMS instance. (_e.g. `https://librenms.example.com`_)."
API key:
  description: "API key of your user account to connect to your LibreNMS instance."
Verify SSL certificate:
  description: "Whether to verify the SSL certificate when SSL encryption is used to connect to your LibreNMS instance."
{% endconfiguration_basic %}

## Data fetching

The integration polls data every 60 seconds.

## Binary sensors

The following {% term binary_sensor "binary sensor" %} are created.

| Entity | Description | Default enabled |
| --- | --- | --- |
| **Status** | Shows the status if the device is connected or not | ✅ |

## Troubleshooting

In any case, when reporting an issue, please enable [debug logging](/docs/configuration/troubleshooting/#debug-logs-and-diagnostics), restart the integration, and as soon as the issue re-occurs, stop the debug logging again (_download of debug log file will start automatically_). Further, if still possible, please also download the [diagnostics](/integrations/diagnostics/) data. If you have collected the debug log and the diagnostics data, provide them with the issue report.

## Known limitations

There are no known limitations.

## Remove the integration

{% include integrations/remove_device_service.md %}

If the API key is not used anymore, you can remove it from your LibreNMS instance.
