---
title: Uptime Kuma
description: Instructions on how to integrate Uptime Kuma with Home Assistant.
ha_category:
  - Sensor
  - Update
ha_iot_class: Cloud Polling
ha_release: 2025.8
ha_config_flow: true
ha_codeowners:
  - '@tr4nt0r'
ha_domain: uptime_kuma
ha_integration_type: integration
ha_platforms:
  - diagnostics
  - sensor
  - update
ha_quality_scale: platinum
---

The **Uptime Kuma** {% term integration %} connects Home Assistant with your Uptime Kuma monitoring tool.

## About Uptime Kuma

Uptime Kuma is an open-source, free, and easy-to-use self-hosted monitoring tool used to track the uptime and performance of websites, applications, and other services.

## How you can use this integration

This integration allows you to track the status of your **Uptime Kuma** monitors directly in Home Assistant. You can use these entities in dashboards, automations, and scripts to react to service outages or monitor uptime trends within your smart home setup.

## Prerequisites

To set up the **Uptime Kuma** integration, you need an **API key** and the **URL** of your Uptime Kuma instance (for example: `https://uptime.example.org`).

You can create an API key by logging into your Uptime Kuma instance, navigating to **{% icon "mdi:cog" %} Settings → API Keys** and selecting **{% icon "mdi:plus" %}Add API Key**.

{% include integrations/config_flow.md %}

{% configuration_basic %}
"URL":
  description: "Address of your Uptime Kuma instance. Example: `https://uptime.example.com`."
"Verify SSL certificate":
  description: "Enable SSL certificate verification for secure connections."
"API key":
  description: "An API key to authenticate with your Uptime Kuma instance."
{% endconfiguration_basic %}

## Sensors

- **Status**: The current status of the monitor. Possible states: *up*, *down*, *pending*, or *maintenance*.
- **Response time**: Time in milliseconds taken for the last status check.
- **Certificate expiry**: Number of days remaining before the SSL certificate expires.
- **Monitor type**: The type of check being performed (e.g., HTTP(s), TCP, ping).
- **Monitored hostname**: The hostname or IP address being monitored (if applicable).
- **Monitored port**: The port number used by the monitored service (if applicable).
- **Monitored URL**: The full URL of the monitored service (if applicable).

## Update

- **Uptime Kuma version**: The update entity indicates if Uptime Kuma is up-to-date or if there is a newer Uptime Kuma version available. For more information on how to update your Uptime Kuma instance, please refer to the [documentation](https://github.com/louislam/uptime-kuma/wiki/%F0%9F%86%99-How-to-Update). If you are using the Uptime Kuma community add-on, you will receive an update notification in Home Assistant as soon as the add-on is updated.

## Automations

Get started with this automation example to create an Uptime Kuma warning light that changes color based on the monitor's status.

{% details "Example YAML configuration" %}

{% raw %}

```yaml
actions:
  - choose:
      - conditions:
          - condition: state
            entity_id: sensor.uptime_kuma_my_service
            state: down
        sequence:
          - action: light.turn_on
            data:
              color_name: red
            target:
              entity_id: light.warning_light
      - conditions:
          - condition: state
            entity_id: sensor.uptime_kuma_my_service
            state: pending
        sequence:
          - action: light.turn_on
            data:
              color_name: yellow
            target:
              entity_id: light.warning_light
      - conditions:
          - condition: state
            entity_id: sensor.uptime_kuma_my_service
            state: maintenance
        sequence:
          - action: light.turn_on
            data:
              color_name: blue
            target:
              entity_id: light.warning_light
      - conditions:
          - condition: state
            entity_id: sensor.uptime_kuma_my_service
            state: up
        sequence:
          - action: light.turn_on
            data:
              color_name: green
            target:
              entity_id:
                - light.warning_light
triggers:
  - trigger: state
    entity_id:
      - sensor.uptime_kuma_my_service
```

{% endraw %}

{% enddetails %}

## Data updates

This integration retrieves data from your Uptime Kuma instance every 30 seconds.

## Known limitations

- Uptime Kuma's API does not expose unique identifiers for monitors. Because of this, using the same name for multiple monitors will cause only one of them to appear in Home Assistant. Renaming a monitor will result in new entities being created, while the old (stale) entities will remain unless manually removed.

## Troubleshooting

The **Uptime Kuma** integration relies on an active internet connection to communicate with your Uptime Kuma instance, unless it's running locally. If you encounter issues, verify that your network connection is stable and your Uptime Kuma instance is accessible.

In any case, when reporting an issue, please enable [debug logging](/docs/configuration/troubleshooting/#debug-logs-and-diagnostics), restart the integration, and as soon as the issue reoccurs, stop the debug logging again (*download of debug log file will start automatically*). Further, if still possible, please also download the [diagnostics](/integrations/diagnostics) data. If you have collected the debug log and the diagnostics data, provide them with the issue report.

## Removing the integration

This integration can be removed by following these steps:

{% include integrations/remove_device_service.md %}

4. You can now remove the API key used for Home Assistant from Uptime Kuma, unless it is also used by other integrations or applications.
