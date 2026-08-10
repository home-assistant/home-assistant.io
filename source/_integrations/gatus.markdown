---
title: Gatus
description: Instructions on how to integrate Gatus with Home Assistant.
ha_category:
  - Binary sensor
  - Sensor
ha_release: 2026.8
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@TN-1'
ha_domain: gatus
ha_integration_type: service
ha_platforms:
  - binary_sensor
  - sensor
ha_quality_scale: silver
---

The **Gatus** {% term integration %} connects Home Assistant with your [Gatus](https://gatus.io) monitoring instance. Gatus is a developer-oriented health dashboard that lets you monitor your services using HTTP, ICMP, TCP, and DNS queries, and evaluate results based on conditions like status codes, response times, certificate expiration, and response bodies.

## Use cases

- Display the live status of your self-hosted services on a Home Assistant dashboard.
- Trigger automations or send notifications when a monitored service goes down or comes back up.
- Combine endpoint status with other Home Assistant entities to coordinate responses to outages, such as switching to a backup service or alerting specific people.

## Prerequisites

You need the base URL of your Gatus instance, for example `http://gatus.local:8080` or `https://status.example.com`.

{% include integrations/config_flow.md %}

{% configuration_basic %}
URL:
  description: "The full base URL of your Gatus status page instance, including the protocol and port. For example: `http://gatus.local:8080` or `https://status.example.com`."
{% endconfiguration_basic %}

### Supported versions

This integration supports **Gatus version 5.x.x or higher**

## Supported functionality

The **Gatus** {% term integration %} provides the following entities.

### Binary sensors

For each endpoint configured in Gatus, the integration creates the following binary sensor:

- **Connectivity**: Reports `on` (connected) when the most recent check for that endpoint succeeded, and `off` (disconnected) when it failed.

### Sensors

For each endpoint configured in Gatus, the integration creates the following sensors:

- **Certificate expiration**: Reports the remaining SSL certificate validity in days of the most recent health check.
- **Response time**: Reports the check latency in milliseconds (ms) of the most recent health check.
- **Status code**: Reports the numeric status code of the most recent health check. For HTTP endpoints, this is the HTTP status code.

## Gatus automation examples

Here are a few ideas to get you started.

{% include docs/paste_yaml_tip.md %}

### Send a notification when a service goes down

Get notified the moment one of your monitored endpoints fails its health check.

To create this automation in the UI:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %} and create a new automation.
2. Add a **State** trigger.
3. In **Entity**, select the Gatus binary sensor for the endpoint you want to monitor.
4. In **To**, enter `off`.
5. Add the **Send a notification message** action.
6. In **Target**, select the notification entity for your device, for example **My Phone** (`notify.my_phone`).
7. In **Message**, enter `Service {{ trigger.to_state.name }} is down!`.

{% details "Example YAML configuration" %}

{% example %}
automation: |
  alias: "Notify when a Gatus endpoint goes down"
  triggers:
    - trigger: state
      entity_id: binary_sensor.my_gatus_endpoint
      to: "off"
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_phone
      data:
        message: "Service {{ trigger.to_state.name }} is down!"
{% endexample %}

{% enddetails %}

### Send a notification when a service recovers

Get notified when a previously failing endpoint comes back online.

To create this automation in the UI:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %} and create a new automation.
2. Add a **State** trigger.
3. In **Entity**, select the Gatus binary sensor for the endpoint you want to monitor.
4. In **From**, enter `off`.
5. In **To**, enter `on`.
6. Add the **Send a notification message** action.
7. In **Target**, select the notification entity for your device, for example **My Phone** (`notify.my_phone`).
8. In **Message**, enter `Service {{ trigger.to_state.name }} is back online.`.


{% details "Example YAML configuration" %}

{% example %}
automation: |
  alias: "Notify when a Gatus endpoint recovers"
  triggers:
    - trigger: state
      entity_id: binary_sensor.my_gatus_endpoint
      from: "off"
      to: "on"
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_phone
      data:
        message: "Service {{ trigger.to_state.name }} is back online."
{% endexample %}

{% enddetails %}

## Data updates

The integration {% term polling polls %} your Gatus instance every 30 seconds.

## Reconfiguration

If you need to update the connection details (URL) of your Gatus instance, you can reconfigure the integration:

1. Go to {% my integrations title="**Settings** > **Devices & services**" %}.
2. Select the **Gatus** integration card.
3. Select the three dots menu {% icon "mdi:dots-vertical" %}, and then select **Reconfigure**.
4. Update the URL of your Gatus instance.
5. Select **Submit**.

Reconfiguring or reloading the integration will automatically discover and add any newly configured endpoints as new binary sensor and sensor entities.

## Known limitations

- The integration shows the result of the most recent health check. Historical results stored by Gatus are not available as entities.
- The integration requires a manual reload or reconfiguration to discover when a new endpoint is added or removed.
- The integration currently does not support authenticated instances.

## Troubleshooting

### Can't set up the integration

#### Symptom: "Unable to connect"

The setup form shows an error saying it cannot connect to your Gatus instance.

#### Resolution

1. Confirm your Gatus instance is running and reachable from your Home Assistant host.
2. Check that the URL you entered is correct and includes the protocol and port, for example `http://gatus.local:8080`.
3. If Gatus is behind a reverse proxy or uses HTTPS, make sure the certificate is valid and the URL matches exactly.
4. Check your firewall rules to confirm Home Assistant is allowed to reach the Gatus host on the configured port.

### Entities are unavailable

If entities become unavailable after setup, Home Assistant could not reach your Gatus instance during the last data refresh. Check your network connection and confirm the Gatus instance is still running. Entities will recover automatically once the connection is restored.

## Diagnostics

The Gatus integration supports [diagnostic data collection](/docs/configuration/troubleshooting/#download-diagnostics) to help troubleshoot issues. If you're experiencing problems with the integration, you can download diagnostic information to include when reporting issues.

The diagnostic data contains the status of all Gatus endpoints monitored by the integration. It does not include the URL you entered to connect to Gatus.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}

