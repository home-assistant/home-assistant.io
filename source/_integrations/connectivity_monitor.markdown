---
title: Connectivity Monitor
description: Instructions on how to set up and use the Connectivity Monitor integration in Home Assistant.
ha_category:
  - Alarm
  - Automation
  - Network
  - Notifications
  - Sensor
ha_release: 2026.3
ha_iot_class: Local Polling
ha_quality_scale: bronze
ha_config_flow: true
ha_codeowners:
  - '@joshburkard'
ha_domain: connectivity_monitor
ha_integration_type: service
---

The **Connectivity Monitor** {% term integration %} helps you keep track of whether devices are online and reachable.

You can use it to monitor network hosts and devices connected through Bluetooth, ESPHome, Matter, or Zigbee. When a device changes status, the integration can notify you and trigger an automation or script after a delay that you define.

## Supported devices

You can monitor the following device types:

- Network
  - ICMP
  - TCP
  - UDP
  - Active Directory domain controller checks across multiple ports
- Bluetooth
- ESPHome
- Matter
- Zigbee (ZHA)

## Prerequisites

There are no mandatory prerequisites for the integration itself.

Depending on what you want to monitor, you need the matching Home Assistant setup already working. For example:

- Bluetooth
- ESPHome
- Matter
- Zigbee (ZHA)

For Zigbee devices, only the **Zigbee Home Automation** integration is currently supported. Other Zigbee integrations, such as **Zigbee2MQTT**, are not supported.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Update interval (seconds):
  description: "How often Connectivity Monitor checks whether your devices are available. Use a value of 30 seconds or higher."
DNS Server:
  description: "The DNS server used to resolve host names for network devices."
{% endconfiguration_basic %}

## Configuration options

The integration provides additional options when you add a device to monitor.

### General options

These options are available for every supported device type:

{% configuration_basic %}
Enable alerts:
  description: Enable notifications when a device goes offline or comes back online.
Alert Delay (minutes):
  description: "How long Home Assistant waits after detecting a status change before sending a notification. The default is 15 minutes."
Alert Group:
  description: "The notification group that should receive alerts."
Enable Alert Action:
  description: Enable an automation or script when a device goes offline or comes back online.
Action Delay (minutes):
  description: "How long Home Assistant waits after detecting a status change before triggering the selected automation or script."
Alert Action:
  description: "Select an existing automation or script to run. If your automation needs event data from Connectivity Monitor, use the example in the Examples section as a starting point."
{% endconfiguration_basic %}

### Bluetooth

{% configuration_basic %}
Select registered Bluetooth device:
  description: "Select a Bluetooth device that is already known to Home Assistant. To monitor Bluetooth devices, you need a Bluetooth adapter or Bluetooth proxy."
{% endconfiguration_basic %}

### ESPHome

{% configuration_basic %}
ESPHome device:
  description: "Select an ESPHome device that is already known to Home Assistant."
{% endconfiguration_basic %}

### Matter

{% configuration_basic %}
Matter device:
  description: "Select a Matter device that is already known to Home Assistant."
{% endconfiguration_basic %}

### Network

{% configuration_basic %}
Host (IP or FQDN):
  description: "The IP address or fully qualified domain name of the host to monitor."
Device Name:
  description: "The name shown in Home Assistant. If the same device already exists with the same MAC or IEEE address, the existing name is used."
Protocol:
  description: "Select the network check to use: TCP, UDP, ICMP (ping), or Active Directory domain controller."
Port:
  description: "For TCP and UDP checks, you will be asked to choose the port to monitor in an additional step."
{% endconfiguration_basic %}

### Zigbee

{% configuration_basic %}
Zigbee device:
  description: "Select a Zigbee device that is already known to Home Assistant. Zigbee monitoring is currently supported for ZHA devices."
{% endconfiguration_basic %}

## Supported functionality

### Entities

The **Connectivity Monitor** integration provides the following sensor entities.

### Sensors

#### Bluetooth, ESPHome, Matter, and Zigbee devices

- **[DeviceType] Status**
  - **Active**: The device is currently online or reachable.
  - **Inactive**: The device is currently offline or not reachable.
  - **Unknown**: The device has not been detected yet.

#### Network device

- **Overall Status**
  - **Connected**: The host and all configured protocol or port checks are reachable.
  - **Partially Connected**: Some configured checks are reachable, but not all of them.
  - **Disconnected**: None of the configured checks are reachable.
  - **Unknown**: The host has not been detected yet.
- **[Protocol] [Port]**
  - **Connected**: The configured protocol and port are reachable.
  - **Disconnected**: The configured protocol and port are not reachable.

### Lovelace Card

This integration includes a dashboard card that you can add to a Home Assistant dashboard.

To add the card:

1. Open your dashboard in edit mode, and add the Connectivity Monitor card.

   ![Screenshot showing the Connectivity Monitor card in the card picker](/images/integrations/connectivity_monitor/lovelace-001.png)

2. Select the device type and the status you want to display.

   ![Screenshot showing device type and status options for the card](/images/integrations/connectivity_monitor/lovelace-002.png)

3. Save the card to show the current connectivity state.

   ![Example of the Connectivity Monitor dashboard card](/images/integrations/connectivity_monitor/lovelace-003.png)

## Events

The integration fires the following event:

### Event: connectivity_monitor_alert

This event is triggered when a monitored device changes status and the configured alert or action delay has passed. You can use this event to trigger automations.

The event data contains the following fields:

| Field | Type | Description |
| --- | --- | --- |
| `action_entity_id` | string | The entity ID of the Connectivity Monitor action entity that fired the event. You can use this value to match the event to a specific automation or monitored item. |
| `recovered` | boolean | `true` when the monitored device has recovered and is back online, or `false` when the device is offline. |
| `device_name` | string | The name of the monitored device. |
| `device_address` | string | The network address of the monitored device, such as its IP address or hostname. |
| `hours_offline` | integer | The number of whole hours the device has been offline when the event is fired. |
| `minutes_offline` | integer | The number of minutes the device has been offline when the event is fired. This is especially useful for shorter outages. |
| `last_online` | string | The last known time the device was online. |
## Examples

### Use an automation when a device goes offline or comes back online

If you want to run different actions when a device goes offline or recovers, you can listen for the `connectivity_monitor_alert` event.

{% raw %}

```yaml
automation:
  - alias: Connectivity Monitor - Device Alert
    triggers:
      - trigger: event
        event_type: connectivity_monitor_alert
    conditions:
      - condition: template
        value_template: "{{ trigger.event.data.action_entity_id == this.entity_id }}"
    actions:
      - choose:
          - conditions:
              - "{{ trigger.event.data.get('recovered', false) }}"
            sequence:
              - data:
                  title: ✅ {{ trigger.event.data.device_name }} is back online
                  message: >-
                    {{ trigger.event.data.device_name }} ({{
                    trigger.event.data.device_address }}) recovered. Was offline for
                    {% if trigger.event.data.hours_offline >= 1 %}
                      {{ trigger.event.data.hours_offline }} hr(s)
                    {% else %}
                      {{ trigger.event.data.minutes_offline }} min(s)
                    {% endif %} — last seen: {{ trigger.event.data.last_online }} -
                    {{ this.entity_id }}
                action: notify.example_service
        default:
          - data:
              title: ❌ {{ trigger.event.data.device_name }} is offline
              message: >-
                {{ trigger.event.data.device_name }} ({{
                trigger.event.data.device_address }}) offline for {% if
                trigger.event.data.hours_offline >= 1 %}
                  {{ trigger.event.data.hours_offline }} hr(s)
                {% else %}
                  {{ trigger.event.data.minutes_offline }} min(s)
                {% endif %} — last seen: {{ trigger.event.data.last_online }}
                - {{ this.entity_id }}
            action: notify.example_service
    mode: parallel
    max: 10
```

{% endraw %}

## Data updates

The **Connectivity Monitor** integration {% term polling polls %} device status on the interval you configure during setup.

## Known limitations

- Zigbee monitoring currently supports ZHA only.
- Network checks depend on the selected protocol and whether the target host responds to that protocol.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
