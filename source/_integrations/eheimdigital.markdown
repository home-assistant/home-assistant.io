---
title: EHEIM Digital
description: Instructions on how to set up EHEIM Digital with Home Assistant.
ha_category:
  - Climate
  - Light
  - Number
  - Select
  - Sensor
  - Switch
  - Time
ha_release: 2025.1
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@autinerd'
ha_domain: eheimdigital
ha_integration_type: hub
ha_platforms:
  - climate
  - diagnostics
  - light
  - number
  - select
  - sensor
  - switch
  - time
ha_quality_scale: platinum
ha_zeroconf: true
---

The **EHEIM Digital** {% term integration %} allows you to control your [EHEIM Digital](https://eheim.com/en_GB/aquatics/eheim-digital/) smart aquarium devices from Home Assistant.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
    description: "The IP address or hostname of your EHEIM Digital main device. Defaults to `eheimdigital.local`, an IP address should only be necessary if the hostname doesn't work."
    required: true
    type: string
{% endconfiguration_basic %}

## Data updates

The integration connects locally via WebSocket to the EHEIM Digital main device and requests data updates for all devices every 15 seconds by default.

## How you can use this integration

You can use this integration to control and monitor your EHEIM Digital aquarium devices directly from Home Assistant. This includes adjusting settings such as temperature, light brightness, and filter speed, as well as monitoring the status of your devices.

- **Receive notifications**: Get notified about important events, such as when the filter needs servicing or if there is an error with the device.
- **More flexible day/night cycles**: Use Home Assistant's automation and scripting capabilities to create more complex day/night cycles for your aquarium devices than the native EHEIM Digital interface allows.
- **Integrate with other devices**: While EHEIM Digital devices can interact with each other in a limited sense (for example, the EHEIM autofeeder can pause the filter pump after feeding), this integration allows you to automate and control your EHEIM Digital devices in conjunction with other smart home devices.

## Supported devices and entities

Currently, the following devices and entities are supported:

### [EHEIM classicLEDcontrol+e](https://eheim.com/en_GB/aquatics/technology/lighting-control/classicledcontrol-e/classicledcontrol-e)

#### Lights

- **Brightness**: Controlling the brightness of both light channels
- **Daycycle mode effect**: Automatically controls the brightness based on the daytime as configured on the device

### [EHEIM thermocontrol+e](https://eheim.com/en_GB/aquatics/eheim-digital/aquarium-heaters/)

#### Climate

- **Target temperature**: Controlling the target temperature of the heater (which corresponds to the day temperature in Bio and Smart mode)
- **Presets / Operation mode**: Switching between Manual, Bio and Smart mode

#### Number

- **Temperature offset**: Setting an offset between the measured temperature and the real temperature
- **Night temperature offset**: Setting the offset for the night temperature in Bio mode

#### Time

- **Day start time**: Setting the start time for the day temperature in Bio mode
- **Night start time**: Setting the start time for the night temperature in Bio mode

### [EHEIM classicVARIO+e](https://eheim.com/en_GB/aquatics/technology/external-filters/classicvario-e-250/classicvario-e-250)

#### Number

- **Manual speed**: Setting the pump speed in Manual mode
- **Day speed**: Setting the pump speed for the day in Bio mode
- **Night speed**: Setting the pump speed for the night in Bio mode

#### Select

- **Filter mode**: Setting the filter mode
  - Manual mode: The filter uses the **manual speed**
  - Pulse mode: The filter uses a high and low pulse, the speeds are configured via **high pulse speed** and **low pulse speed**, the durations are configured via **high pulse duration** and **low pulse duration**
  - Bio mode: The filter uses a day and night rhythm, the speeds are configured via **day speed** and **night speed**, the start times of day and night are configured via **day start time** and **night start time**

#### Sensor

- **Current pump speed**: Displays the current pump speed
- **Remaining hours until service**: Displays the remaining time until the filter needs to be serviced
- **Error code**: Displays the current error code of the device (No error, Rotor stuck, air in filter)

#### Switch

- **Pump**: Turning on and off the filter pump

#### Time

- **Day start time**: Setting the start time for the day pump speed in Bio mode
- **Night start time**: Setting the start time for the night pump speed in Bio mode

### All supported devices

#### Number

- **System LED brightness**: Controlling the brightness of the system LED

## Automations

### Send a notification when the filter has an error

You can set up an automation to notify you when the filter has an error. This example uses the `notify.notify` service to send a notification:

{% details "Example automation to notify about filter errors" %}

{% raw %}

```yaml
alias: Notify about filter error
description: "This automation sends a notification when the filter has an error."
mode: single
triggers:
  - trigger: state
    entity_id:
      - sensor.aquarienfilter_error_code
    to:
      - rotor_stuck
      - air_in_filter
conditions: []
actions:
  - action: notify.notify
    metadata: {}
    data:
      title: The filter has a problem!
```

{% endraw %}

{% enddetails %}

## Known limitations

- The integration does not support other EHEIM Digital devices than those listed above. More devices will be added in future updates. It is, however, supported to have an unsupported device as the main device and supported devices as sub-devices, even though the unsupported device will not have any entities shown in Home Assistant.

## Removing the integration

This integration follows standard integration removal, no extra steps are required.

{% include integrations/remove_device_service.md %}
