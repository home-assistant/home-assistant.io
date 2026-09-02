---
title: Ecowitt Modbus
description: Instructions on how to integrate Fine Offset / Ecowitt Modbus weather sensors within Home Assistant.
ha_category:
  - Sensor
ha_release: "2026.10"
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@iainchesworth'
ha_domain: ecowitt_modbus
ha_platforms:
  - diagnostics
  - sensor
ha_integration_type: device
ha_quality_scale: gold
---

The **Ecowitt Modbus** {% term integration %} reads [Fine Offset / Ecowitt](https://www.ecowitt.com/) weather sensors over Modbus.

These are the wired, RS-485 members of the Ecowitt range. They are separate products from the wireless sensors that report to an Ecowitt gateway, which the [Ecowitt](/integrations/ecowitt/) integration handles instead.

## Supported devices

| Device | Description |
| ------ | ----------- |
| WS90 | All-in-one weather sensor array with no moving parts. Measures light, UV index, temperature, humidity, wind speed, gust speed, wind direction, rainfall, and pressure. |
| WN69LP | Wired 7-in-1 sensor array with a mechanical anemometer and a tipping-bucket rain gauge. Measures the same quantities, and additionally reports its own battery and supply voltage. |

## Unsupported devices

Wireless Ecowitt sensors, and the gateways they report to (GW1000, GW2000, and similar), do not speak Modbus. Use the [Ecowitt](/integrations/ecowitt/) integration for those.

## Prerequisites

- The sensor is reachable over Modbus. This is typically an RTU-over-TCP serial gateway bridging the sensor's RS-485 connection onto your network, rather than the sensor speaking Modbus TCP natively.
- The host or IP address and port of that gateway. Most gateways use port 502.
- The sensor's Modbus device address. Both models ship with a factory default (`0x90`/144 for the WS90, `0x24`/36 for the WN69LP) and only need a different value if you have changed it.

{% include integrations/config_flow.md %}

You are asked for the model first. The sensors do not report which model they are, so this cannot be detected.

## Configuration

{% configuration_basic %}
Model:
  description: The model printed on the sensor, either `WS90` or `WN69LP`.
Host:
  description: The hostname or IP address of the gateway the sensor is connected to.
Port:
  description: The Modbus TCP port of the gateway. Defaults to `502`.
Device address:
  description: The sensor's Modbus device address. Defaults to the factory setting for the selected model.
{% endconfiguration_basic %}

During setup, the integration reads the sensor at the given address and checks that the readings are consistent with the selected model. Setup does not complete unless they are.

## Supported functionality

### Sensors

These entities are created for both models:

- **Light**: Light intensity.
- **UV index**: Current UV index.
- **Temperature**: Ambient temperature.
- **Humidity**: Relative humidity.
- **Wind speed**: Current wind speed.
- **Gust speed**: Current gust speed.
- **Wind direction**: Wind direction, in degrees.
- **Rainfall**: Cumulative rainfall total.
- **Absolute pressure**: Absolute atmospheric pressure, uncorrected for altitude.

The WS90 additionally creates:

- **Rain counter**: The same cumulative total as **Rainfall**, read from a separate register at 0.01 mm resolution instead of 0.1 mm. Disabled by default, because it duplicates a sensor that is already there.

The WN69LP additionally creates:

- **Battery voltage**: The sensor's internal battery voltage. Re-measured by the device once a minute.
- **Supply voltage**: The external DC supply voltage. Re-measured once a minute. Disabled by default.
- **Recent rainfall**: A second rainfall total, cleared at the same time as **Rainfall**. Disabled by default: the specification does not define what period it covers.

### Diagnostics

The integration provides {% term diagnostics %} for each configured sensor, covering its decoded readings, its RS-485 and sampling settings, and the state of the polling. The host address and anything identifying the individual unit are redacted.

## Data updates

The integration {% term polling polls %} each sensor every 30 seconds.

How often a sensor has new data to give is a property of the device, not of this integration:

- The **WS90** refreshes wind readings every 2 seconds and everything else every 8.75 seconds.
- The **WN69LP** samples on an interval set in its own configuration, 16 seconds by default. Battery and supply voltage are refreshed once a minute regardless.

Polling faster than the sensor measures would return the same values again, so the interval is not configurable.

## Ecowitt Modbus automation examples

{% include docs/paste_yaml_tip.md %}

### Automation: Closing the awning when it gets windy

Gust speed is the reading to act on for wind protection, since it catches short peaks that average wind speed smooths away.

- **Trigger**: Numeric state of the gust speed sensor, above 40 km/h
- **Action**: Close the awning cover

{% details "YAML example for closing an awning in high wind" %}

{% example %}
automation: |
  alias: "Close the awning when it gets windy"
  triggers:
    - trigger: numeric_state
      entity_id: sensor.ws90_gust_speed
      above: 40
      for: "00:00:30"
  actions:
    - action: cover.close_cover
      target:
        entity_id: cover.awning
{% endexample %}

{% enddetails %}

### Automation: Warning when UV levels get high

- **Trigger**: Numeric state of the UV index sensor, above 6
- **Action**: Send a notification

{% details "YAML example for a high UV warning" %}

{% example %}
automation: |
  alias: "Warn when the UV index is high"
  triggers:
    - trigger: numeric_state
      entity_id: sensor.ws90_uv_index
      above: 6
      for: "00:05:00"
  actions:
    - action: notify.notify
      data:
        message: >
          UV index is {{ states('sensor.ws90_uv_index') }}. Cover up before
          going outside.
{% endexample %}

{% enddetails %}

Rainfall is reported as a running total rather than an amount per period, so an automation that needs "how much rain fell today" should read it through a [utility meter](/integrations/utility_meter/) or a [statistics](/integrations/statistics/) sensor rather than using the value directly.

## Known limitations

### The WN69LP cannot be identified

The WN69LP has no model or serial-number register. Two consequences follow:

- Setup cannot positively confirm the model. It checks that the readings fall within the ranges a weather sensor can physically produce, which rules out most unrelated devices, but it cannot distinguish a WN69LP from another device whose registers happen to decode plausibly at the same addresses.
- A WN69LP is identified by where it answers, not by what it is. If a different WN69LP is put at the same address, its readings are published under the original sensor's entities. Moving a WN69LP to a new address is a [reconfiguration](#reconfiguration); the integration cannot tell that apart from a second sensor being added, so it has to be told.

The WS90 reports both a fixed device code and a device ID, so neither limitation applies to it.

### Automatic reporting is not used

Both sensors can be configured to push readings unprompted instead of answering polls. The integration always polls, and does not change that setting.

### The sensors' write commands are not exposed

Neither the rainfall reset nor the software reset is available as an action.

### Altitude is not corrected for

The pressure sensor reports absolute pressure. Converting it to sea-level pressure is left to a [template sensor](/integrations/template/), since it depends on your altitude.

## Reconfiguration

If a sensor moves to a different gateway, port, or device address, reconfigure the existing entry rather than adding a new one, so that its history is kept:

1. Go to {% my integrations title="**Settings** > **Devices & services**" %}.
2. Select the Ecowitt Modbus integration, then the entry for the sensor.
3. Open the three-dot {% icon "mdi:dots-vertical" %} menu, then select **Reconfigure**.
4. Update the settings and submit the form.

The new address is checked before anything is saved. A WS90 entry compares the device ID it finds there and refuses to adopt a different sensor; a WN69LP entry cannot, for the reason given above, so check the address before confirming.

The model cannot be changed. A different model is a different device, and should be added as its own entry.

## Troubleshooting

### Setup fails with "Failed to connect"

#### Symptom: the form reports that the device cannot be reached

The address form shows "Failed to connect" when submitted.

#### Description

Nothing answered Modbus at that host, port, and device address. Either the gateway is unreachable, or the sensor behind it is not responding at the address given.

#### Resolution

1. Confirm the gateway is reachable at the host and port you entered.
2. Confirm the gateway is set to transparent RTU-over-TCP mode. A gateway configured to translate to Modbus TCP framing, or pinned to a fixed slave address, will not pass these requests through correctly.
3. Confirm the sensor's device address. It is the factory default unless you have changed it; if you are unsure, the manufacturer's configuration tool can read it back.
4. Confirm the RS-485 wiring, including A/B polarity and that the sensor is powered.
5. If another Modbus client is connected to the same gateway, disconnect it. Most serial gateways accept only one client at a time.

### Setup fails with "not the selected model"

#### Symptom: the form reports that the device is not the selected model

The address form shows that the device does not answer as the selected model.

#### Description

Something is answering at that address, but its registers are not consistent with the model chosen on the first step.

#### Resolution

1. Check the model printed on the sensor and start again with the right one.
2. If the model is right, check the device address. Another Modbus device on the same bus may be answering at that address instead.

### All entities went unavailable at once

#### Symptom: every entity for one sensor is unavailable

All of a sensor's entities show as unavailable at the same time.

#### Description

Either the sensor stopped answering, or — for a WS90 — a different sensor started answering at its address.

#### Resolution

1. Check the gateway and the sensor's power and wiring. Entities recover on their own once the sensor answers again; no reload is needed.
2. Check whether another Modbus client has taken the gateway's single connection.
3. If the entry itself is in an error state reporting a different serial number, a different WS90 is answering at that address. Either restore the original sensor, or reconfigure the entry if the sensor was deliberately replaced.

### Readings are implausible

#### Symptom: values are wrong by a factor, or wildly out of range

Readings appear but do not match reality.

#### Description

The most likely cause is that the address is being served by a different Modbus device whose registers happen to decode without error.

#### Resolution

1. Download the {% term diagnostics %} for the entry and check the full set of readings. A device that is not the selected model usually produces several obviously wrong values, not just one.
2. Check that no other device on the bus shares the same address.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
