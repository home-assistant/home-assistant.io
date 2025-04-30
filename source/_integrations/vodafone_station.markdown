---
title: Vodafone Station
description: Instructions on how to integrate Vodafone Station routers into Home Assistant.
ha_category:
  - Button
  - Presence detection
  - Sensor
ha_release: 2023.9
ha_domain: vodafone_station
ha_config_flow: true
ha_codeowners:
  - '@paoloantinori'
  - '@chemelli74'
ha_iot_class: Local Polling
ha_platforms:
  - button
  - device_tracker
  - diagnostics
  - sensor
ha_integration_type: hub
ha_quality_scale: platinum
---

The **Vodafone Station** {% term integration %} allows you to control your [Vodafone Station](https://www.vodafone.it/privati/area-supporto/assistenza-dispositivi/vodafone-station.html) based router.

The integration provides information about your internet connection and the connected devices.

## Supported devices

The integration supports only Sercomm models so far.

### Tested models

This {% term integration %} was tested against the following models from Sercomm:

- Vodafone Power Station (SHG3000)
- Vodafone Power Station WiFi 6 (SHG3060)
- Vodafone WiFi 6 Station (RHG3006)
- Vodafone Gigabox (SHG3000) - supplied by [Vodafone Ireland](https://deviceguides.vodafone.ie/vodafone/gigabox-windows-10/)
- Vodafone H300S

{% include integrations/config_flow.md %}

{% configuration_basic %}
  host:
    description: The IP address of the Vodafone Station router.
  username:
    description: The username of the Vodafone Station router.
  password:
    description: The password of the Vodafone Station router.
{% endconfiguration_basic %}

{% include integrations/option_flow.md %}

{% configuration_basic %}
  consider home:
    description: Number of seconds that must elapse before considering a disconnected device "not at home".
{% endconfiguration_basic %}

## Supported functionality

There is support for the following platform types within Home Assistant:

- **Device tracker** - presence detection by looking at connected devices.
- **Sensor** - external IP address, uptime, firmware, resources and network monitors.
- **Button** - restart router, dsl/fiber/internet key connections.

## Examples

### Automation: reconnect / get new IP every night

```yaml
automation:
- alias: "Reconnect Vodafone Station (Fiber)"
  triggers:
    - trigger: time
      at: "05:00:00"
  actions:
    - action: button.press
      target:
        entity_id: button.vodafone_station_xxxx_reconnect_fiber
```

### Automation: notify connected device not home

```yaml
automation:
- alias: "Apple TV disconnect"
  triggers:
    - platform: state
      entity_id: device_tracker.appletv
      to: "not_home"
  actions:
    -  action: notify.mobile_app_phone
       data:
         message: "TV lost network connection"
```

### Automation: notify router CPU usage too high

```yaml
automation:
- alias: "Vodafone Station CPU high cpu usage"
  triggers:
    - platform: numeric_state
      entity_id: sensor.vodafone_station_xxxx_cpu_usage
      above: 80
  actions:
    - action: notify.mobile_app_phone
       data:
         message: "Router CPU above 80%."
```

## Data updates

This integration {% term polling polls %} data from the device every 30 seconds by default.

## Additional info

### Device tracker

**Note**: If you don't want to automatically track newly detected devices, disable the {% term integration %} system option `Enable new added entities`.

## Troubleshooting

### Can’t set up the device

#### Symptom: "User already logged-in"

When trying to set up the integration, the form shows the message "User already logged-in".

##### Description

This means that there is already a logged session to the Vodafone Station router.

##### Resolution

To resolve this issue, log out from all active sessions, or, if the session was abruptly closed, wait for the router timeout (usually 60 seconds).

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
