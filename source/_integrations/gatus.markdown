---
title: Gatus
description: Instructions on how to integrate Gatus with Home Assistant.
ha_category:
  - Sensor
  - System monitor
ha_release: 2026.7
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@TN-1'
ha_domain: gatus
ha_integration_type: service
ha_platforms:
  - sensor
ha_quality_scale: bronze
---

The **Gatus** {% term integration %} connects Home Assistant with your Gatus monitoring dashboard.

## About Gatus

Gatus is a developer-oriented health dashboard that gives you the ability to monitor your services using HTTP, ICMP, TCP, and even DNS queries as well as evaluate the result of said queries by using a list of conditions on values like the status code, the response time, the certificate expiration, the body and many others. The icing on top is that each of these health checks can be paired with alerting via Slack, Teams, PagerDuty, Discord, Twilio and many more.

## How you can use this integration

This integration allows you to track the status of your **Gatus** endpoints directly in Home Assistant. You can use these entities in dashboards, automations, and scripts to react to service outages or monitor uptime trends within your smart home setup.

## Prerequisites

To set up the **Gatus** integration, you need the **URL** of your Gatus instance (for example: `https://gatus.example.org`).

{% include integrations/config_flow.md %}

## Data updates

This integration retrieves data from your Gatus instance every 30 seconds.

## Troubleshooting

The **Gatus** integration relies on an active internet connection to communicate with your Gatus instance, unless it's running locally. If you encounter issues, verify that your network connection is stable and your Gatus instance is accessible.

In any case, when reporting an issue, please enable [debug logging](/docs/configuration/troubleshooting/#debug-logs-and-diagnostics), restart the integration, and as soon as the issue reoccurs, stop the debug logging again (*download of debug log file will start automatically*). Further, if still possible, please also download the [diagnostics](/integrations/diagnostics) data. If you have collected the debug log and the diagnostics data, provide them with the issue report.

## Removing the integration

This integration can be removed by following these steps:

{% include integrations/remove_device_service.md %}

