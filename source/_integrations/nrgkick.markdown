---
title: NRGkick
description: Integrate the NRGkick Gen2 mobile EV charger using the local REST JSON API.
ha_category:
  - Energy
ha_iot_class: Local Polling
ha_quality_scale: bronze
ha_release: 2026.1
ha_codeowners:
  - "@andijakl"
ha_domain: nrgkick
ha_integration_type: device
ha_config_flow: true
ha_zeroconf: true
ha_platforms:
  - binary_sensor
  - number
  - sensor
  - switch
related:
  - url: https://www.nrgkick.com/en/
    title: NRGkick Website
---

The **NRGkick** {% term integration %} allows you to monitor and control
the NRGkick mobile EV charger (Wallbox) by DiniTech with Home Assistant.
The wallbox is smart home friendly and allows detailed monitoring with
80+ data points and flexible control of charging behavior.

The integration connects directly to the device on your local network using the
local REST JSON API. No cloud connection is required.

## Supported devices

- NRGkick Gen2 (Smart Cable / Flexible Wallbox)

{% note %}
The NRGkick is available in different variants, including the 16A and 32A
models, as well as models with cellular (SIM) and GPS capabilities. All are
compatible with this integration.

The NRGkick 16A light model needs the "NRGkick App incl. Bluetooth/Wi-FI
connectivity" as one-time upgrade to use the local API.
{% endnote %}

## Unsupported devices

- NRGkick Gen1 (Bluetooth-only)

## Prerequisites

- Home Assistant and the NRGkick device need to be on the same local network.
- Your NRGkick device needs to have SmartModule firmware 4.0.0.0 or newer.
- The REST JSON API needs to be enabled in the NRGkick app.

To enable the API:

1. Open the NRGkick app from the manufacturer on your smartphone.
2. Go to **Extended** > **Local API**.
3. Enable **JSON API**.
4. Optional: Enable authentication and set a username and password.

{% include integrations/config_flow.md %}

### Discovery and setup

Home Assistant can discover NRGkick devices automatically on your local network.

- If a device is discovered, select the notification, or go to **Settings** >
  **Devices & services**, and add the discovered **NRGkick** integration.
- If the device is not discovered, add it manually and enter the device host.

If you enabled authentication in the NRGkick app, enter the username and
password during setup.

{% configuration_basic %}
Host:
  description: >
    The hostname or IP address of your NRGkick device, for example,
    `nrgkick.local` or `192.0.2.10`.
Username:
  description: Username for HTTP Basic Authentication (optional).
Password:
  description: Password for HTTP Basic Authentication (optional).
{% endconfiguration_basic %}

## Configuration options

{% configuration_basic %}
Scan interval:
  description: >
    How often Home Assistant polls the device for updates.
    The default is 30 seconds.
    The allowed range is 10 to 300 seconds.
{% endconfiguration_basic %}

## Supported functionality

The integration provides entities to monitor and control charging.

### Monitoring

The integration creates sensors for common measurements, including:

- Power, energy, voltage, current, and frequency (total and per-phase).
- Charging status, charge rate, relay state, and session metrics.
- Warnings and error codes.
- Temperatures (availability depends on the connected attachment).
- Network details, such as IP address and Wi-Fi signal strength.

Some sensors are only available on NRGkick SIM models (cellular and GPS).
These entities are disabled by default and can be enabled in the entity
settings.

The integration also provides binary sensors for common on/off states, such as
whether charging is active.

### Controls

The integration provides controls to adjust charging behavior:

- **Charging current** (number): Set the current limit.
- **Charge pause** (switch): Pause or resume charging.
- **Energy limit** (number): Set an energy limit per session. A value of 0 means
  unlimited.
- **Phase count** (number): Set the number of phases, if supported by the
  device and attachment.

### Key entities

Entity IDs depend on your device name in Home Assistant. The examples below
assume the default device name of `NRGkick`.

- `sensor.nrgkick_charging_current`: Charging current.
- `sensor.nrgkick_charged_energy`: Charged energy.
- `sensor.nrgkick_status`: Charging status.
- `binary_sensor.nrgkick_charging`: On when charging is active.
- `switch.nrgkick_charge_pause`: Pause or resume charging.
- `number.nrgkick_current_set`: Charging charging current.
- `number.nrgkick_energy_limit`: Energy limit for a session (0 means unlimited).

## Examples

### Pause charging during peak hours

This {% term automation %} pauses charging at 5 PM and resumes at 10 PM.

```yaml
automation:
  - alias: "NRGkick - Pause charging during peak hours"
    triggers:
      - trigger: time
        at: "17:00:00"
    actions:
      - action: switch.turn_on
        target:
          entity_id: switch.nrgkick_charge_pause

  - alias: "NRGkick - Resume charging after peak hours"
    triggers:
      - trigger: time
        at: "22:00:00"
    actions:
      - action: switch.turn_off
        target:
          entity_id: switch.nrgkick_charge_pause
```

### Start charging when solar production is sufficient

This example starts charging when your solar production exceeds 3 kW.

```yaml
automation:
  - alias: "NRGkick - Start solar charging"
    triggers:
      - trigger: numeric_state
        entity_id: sensor.solar_power
        above: 3000
    conditions:
      - condition: state
        entity_id: binary_sensor.nrgkick_charging
        state: off
      - condition: state
        entity_id: switch.nrgkick_charge_pause
        state: on
    actions:
      - action: switch.turn_off
        target:
          entity_id: switch.nrgkick_charge_pause
      - action: number.set_value
        target:
          entity_id: number.nrgkick_current_set
        data:
          value: 16
```

## Data updates

The integration polls the device for updates.

- Default scan interval: 30 seconds.
- Minimum scan interval: 10 seconds.

## Known limitations

- Per-phase values for L2 and L3 are only available when the power source and
  session are using multiple phases.
- Some temperature sensors depend on the connected attachment and may not be
  available.
- Cellular and GPS sensors are only available on SIM models.

## Troubleshooting

### Can't connect to the device

If setup fails with a connection error:

- Verify the device is reachable on your network.
- Verify the REST JSON API is enabled in the NRGkick app.
- If you use authentication, verify the username and password.

### Entities show unavailable

- Verify the device is powered on and connected.
- Under **Settings** > **Devices & services**, select **NRGkick**, then reload
  the integration.
- Increase the scan interval if your network is unstable.

### Some phase sensors are missing or show unknown

This is expected when charging with a single-phase power source. Those sensors
usually provide values only when a three-phase source is available and active.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
