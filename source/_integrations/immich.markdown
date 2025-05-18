---
title: Immich
description: Instructions on how to integrate an immich instance into Home Assistant.
ha_category:
  - Sensor
ha_release: 2025.6
ha_config_flow: true
ha_iot_class: Local Polling
ha_domain: immich
ha_platforms:
  - sensor
ha_codeowners:
  - '@mib1185'
ha_integration_type: service
---

This integration allows adding an [immich](https://immich.app/) instance to Home Assistant.

## Prerequisites

You need to [obtain an API key](https://immich.app/docs/features/command-line-interface#obtain-the-api-key) for your user in your immich instance.

{% include integrations/config_flow.md %}

{% configuration_basic %}
URL:
  description: "The URL of your immich instance. (_e.g. `https://immich.example.com`_)."
API key:
  description: "API key to connect to your immich instance."
Verify SSL certificate:
  description: "Whether to verify the SSL certificate when SSL encryption is used to connect to your immich instance."
{% endconfiguration_basic %}

## Data fetching

Data are polled every 60 seconds.

## Sensors

The following {% term sensors %} are created

| Entity | Description | Default enabled |
| --- | --- | --- |
| **Disk size** | Overall size of the disk | ✅ |
| **Disk available** | Free space on the disk  | ✅ |
| **Disk used** | Used space on the disk | ❌ |
| **Disk usage** | Usage of the disk in percentage | ❌ |
| **Photos count** | Count of stored photos | ✅ |
| **Videos count** | Count of stored videos | ✅ |
| **Disk used by photos** | Used disk space by photos | ❌ |
| **Disk used by videos** | Used disk space by videos | ❌ |

## Troubleshooting

In any case, when reporting an issue, please enable [debug logging](/docs/configuration/troubleshooting/#debug-logs-and-diagnostics), restart the integration, and as soon as the issue reoccurs stop the debug logging again (_download of debug log file will start automatically_).

## Remove the integration

{% include integrations/remove_device_service.md %}

If the API key is not used anymore, you can remove it from your immich instance.
