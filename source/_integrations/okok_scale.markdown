---
title: OKOK Scale
description: Instructions to configure the OKOK Scale integration into Home Assistant.
ha_category:
  - Health
  - Sensor
ha_release: 2026.11
ha_iot_class: Local Push
ha_codeowners:
  - '@rrooggiieerr'
ha_config_flow: true
ha_domain: okok_scale
ha_integration_type: device
ha_platforms:
  - diagnostics
  - sensor
ha_bluetooth: true
ha_quality_scale: platinum
---

The **OKOK Scale** {% term integration %} allows you to connect your [OKOK·International App](https://okokapp.com/) supported scale to Home Assistant. This lets you keep an eye on your weight over time in Home Assistant, chart it on a dashboard, and use each new measurement in your automations.

## Use cases

- Track your weight over time with the history graph or a statistics graph on a dashboard, without depending on the OKOK cloud app.
- Get a notification with your weight as soon as you step off the scale.
- Calculate derived values, such as your body mass index (BMI), with a template sensor.
- Trigger a morning routine, for example turning on the bathroom lights or starting the coffee machine, when you weigh yourself.
- Get reminded to replace the batteries before the scale stops working.

## Supported devices

The following device is known to be supported by the integration:

- Tristar WG-2440

Other scales that work with the OKOK·International app are likely to work as well, as long as they broadcast their measurements in one of the supported data formats. See [Known limitations](#known-limitations).

## Prerequisites

This integration requires a working [Bluetooth](/integrations/bluetooth/) setup, either a local Bluetooth adapter or an [ESPHome Bluetooth proxy](/integrations/esphome/). The scale is battery-powered and only broadcasts while it is awake, so make sure it is awake by doing a measurement before adding it.

{% include integrations/config_flow.md %}

## Supported functionality

The **OKOK Scale** {% term integration %} provides the following {% term entities %}.

### Sensors

A scale exposes the following sensors:

- **Weight**: the measured weight. The unit follows the unit the scale is set to: kilograms or pounds. Measurements in stones and pounds are converted to pounds, and measurements in jin are converted to kilograms.
- **Impedance**: the measured body impedance in ohms (Ω), if supported by the scale. You need to stand on the scale barefoot for this to be measured.
- **Battery**: the scale battery percentage.
- **Signal strength**: the Bluetooth signal strength (diagnostic, disabled by default).

{% important %}
Updates of the battery sensor, and of the impedance sensor on most scales, require an active Bluetooth connection and relatively close proximity. If you use a <a href="/integrations/bluetooth/#remote-adapters-bluetooth-proxies/" target="_blank">Bluetooth proxy</a>, ensure it supports active connections.
{% endimportant %}

## Data updates

The scale broadcasts its measurements over Bluetooth while it is awake. The integration listens to these broadcasts ({% term "Local Push" %}) and only updates the sensors when the scale reports a final, stabilized measurement. Intermediate readings while the weight is still settling are ignored.

- **Weight** is read from the broadcasts, so it is updated as soon as a measurement is finished.
- **Impedance** is included in the broadcasts of some scales. Other scales only provide it over an active Bluetooth connection. When the integration detects that a scale supports impedance, it connects to the scale after each measurement to read it.
- **Battery** is read over an active Bluetooth connection: the first time the scale is seen after Home Assistant starts, after each measurement on scales that support impedance, and otherwise at most once a day.

Between measurements the scale goes to sleep and stops broadcasting. The sensors then keep their last value instead of becoming unavailable, and are marked as having an assumed state.

## Known limitations

- The scale only broadcasts for a short time after a measurement. Values are only updated when you use the scale, so there is no live reading.
- Measurements are not linked to a person. If several people use the same scale, all measurements end up on the same weight sensor. You can use automations or template sensors to assign measurements to people, for example based on the weight range.
- The integration provides the raw impedance only. Body composition values such as body fat percentage are not calculated, because they depend on personal data such as height, age, and sex.
- Battery updates, and impedance updates on most scales, need a Bluetooth adapter or proxy in range that supports active connections. With a passive-only adapter, only the weight is updated.
- Some scales always report a battery level of 0%.
- Scales that broadcast using data format 10 or 26 are not supported yet.

## Examples

### Send a notification with your weight

This automation sends a notification to your phone after each finished measurement. Replace `sensor.okok_scale_2345_weight` with the entity ID of your scale's weight sensor, and `notify.mobile_app_your_phone` with your notification service.

{% raw %}

```yaml
automation:
  - alias: "Notify weight measurement"
    triggers:
      - trigger: state
        entity_id: sensor.okok_scale_2345_weight
        not_from:
          - unknown
          - unavailable
        not_to:
          - unknown
          - unavailable
    actions:
      - action: notify.mobile_app_your_phone
        data:
          title: "New measurement"
          message: >
            You weigh {{ trigger.to_state.state }}
            {{ trigger.to_state.attributes.unit_of_measurement }}.
```

{% endraw %}

### Calculate your body mass index

This template sensor calculates your body mass index (BMI) from the weight sensor. Replace `1.80` with your height in meters. This example assumes the scale is set to kilograms.

{% raw %}

```yaml
template:
  - sensor:
      - name: "Body mass index"
        unique_id: body_mass_index
        state_class: measurement
        state: >
          {% set weight = states('sensor.okok_scale_2345_weight') | float(0) %}
          {% set height = 1.80 %}
          {{ (weight / (height ** 2)) | round(1) }}
        availability: >
          {{ has_value('sensor.okok_scale_2345_weight') }}
```

{% endraw %}

## Troubleshooting

### The scale is not discovered

1. Make sure that the scale is awake and broadcasting by doing a measurement.
2. Make sure your scale is in range of the Bluetooth adapter or proxy.
3. Make sure the [Bluetooth](/integrations/bluetooth/) integration is set up and working.

### The weight does not update

The weight only updates after a finished measurement. Step on the scale and wait until the reading on the display is stable. If the sensor still doesn't update, move the scale closer to your Bluetooth adapter or proxy.

### The battery or impedance does not update

These values need an active Bluetooth connection to the scale.

- Make sure a Bluetooth adapter or proxy that supports active connections is in range of the scale. If you see the error **No connectable Bluetooth adapter is in range** in the logs, none of your adapters can connect to the scale.
- Make sure the OKOK·International app is not connected to the scale at the same time. Most scales only accept one connection at a time.
- For impedance, stand on the scale barefoot and wait until the measurement is finished.

### Sensors show an assumed state

This is expected. The scale sleeps between measurements, so the sensors keep the value of the last measurement and are marked as assumed until the next measurement.

### Reporting an issue

If your scale is not supported or reports wrong values, enable [debug logging](/docs/configuration/troubleshooting/#debug-logs-and-diagnostics), do a measurement, and include the debug logs and the [diagnostics](/integrations/diagnostics/) of the integration in your issue. The diagnostics contain the last Bluetooth broadcast of the scale, which helps to add support for new data formats.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
