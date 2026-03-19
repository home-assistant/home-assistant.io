---
title: NRGkick
description: Integrate the NRGkick Gen2 mobile EV charger using the local REST JSON API.
ha_category:
  - Energy
ha_iot_class: Local Polling
ha_quality_scale: silver
ha_release: 2026.2
ha_codeowners:
  - '@andijakl'
ha_domain: nrgkick
ha_integration_type: device
ha_config_flow: true
ha_zeroconf: true
ha_platforms:
  - diagnostics
  - number
  - sensor
  - switch
related:
  - url: https://www.nrgkick.com/
    title: NRGkick Website
---

The **NRGkick** {% term integration %} allows you to monitor the [NRGkick](https://www.nrgkick.com/) mobile EV charger (Wallbox) by DiniTech with Home Assistant. The wallbox is smart home friendly and allows detailed monitoring with 80+ data points.

The integration connects directly to the device on your local network using the local REST JSON API. No cloud connection is required.

## Supported devices

- NRGkick Gen2 (Smart Cable / Flexible Wallbox)

{% note %}
The NRGkick is available in different variants, including the 16A and 32A models, as well as models with cellular (SIM) and GPS capabilities. All are compatible with this integration.

The NRGkick 16A light model needs the "NRGkick App incl. Bluetooth/Wi-Fi connectivity" as one-time upgrade to use the local API.
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

If you enabled authentication in the NRGkick app, enter the username and password during setup.

{% configuration_basic %}
Host:
  description: |
    The hostname or IP address of your NRGkick device, for example, `nrgkick.local` or `192.0.2.10`.
Username:
  description: Username for HTTP Basic Authentication (optional).
Password:
  description: Password for HTTP Basic Authentication (optional).
{% endconfiguration_basic %}

## Supported functionality

The integration provides entities to monitor charging and control charging settings.

### Sensors

The integration creates the following sensors:

#### Device information

##### General

- **Rated current** (A): Max rated current of the NRGkick.

##### Connector

- **Connector phase count**: Phase count of the connected attachment.
- **Connector max current** (A): Max current of the connected attachment.
- **Connector type**: Attachment type (for example Type 2, CEE, domestic).
- **Connector serial**: Attachment serial number (disabled by default).

##### Grid

- **Grid voltage** (V): Detected grid voltage type.
- **Grid frequency** (Hz): Detected grid frequency.

##### Network

- **SSID**: Wi-Fi network name of the currently connected network (disabled by default).
- **Signal strength** (dBm): Wi-Fi signal strength (RSSI).

##### Cellular (only if available)

These sensors are only available on NRGkick SIM models and are disabled by default.

- **Cellular operator**: Cellular network operator.
- **Cellular signal strength** (dBm): Cellular signal strength (RSSI).
- **Cellular mode**: Cellular mode.

#### Device values

##### Energy

- **Total charged energy** (kWh): Total charged energy overall.
- **Charged energy** (kWh): Charged energy during the most recent charge session.

##### Powerflow

- **Charging current** (A): Max current signaled to the EV.
- **Peak power** (W): Highest power during the most recent charge session (disabled by default).
- **Total active power** (W): Total active power across all phases.
- **Total reactive power** (var): Total reactive power across all phases (disabled by default).
- **Total apparent power** (VA): Total apparent power across all phases (disabled by default).
- **Total power factor** (%): Power factor across all phases (disabled by default).
- **Charging voltage** (V): Average charging voltage across phases.
- **Powerflow grid frequency** (Hz): Grid frequency reported in powerflow data (disabled by default).
- **L1 voltage** (V): Voltage on phase L1 (disabled by default).
- **L1 current** (A): Current on phase L1.
- **L1 active power** (W): Active power on phase L1.
- **L1 reactive power** (var): Reactive power on phase L1 (disabled by default).
- **L1 apparent power** (VA): Apparent power on phase L1 (disabled by default).
- **L1 power factor** (%): Power factor on phase L1 (disabled by default).
- **L2 voltage** (V): Voltage on phase L2 (disabled by default).
- **L2 current** (A): Current on phase L2.
- **L2 active power** (W): Active power on phase L2.
- **L2 reactive power** (var): Reactive power on phase L2 (disabled by default).
- **L2 apparent power** (VA): Apparent power on phase L2 (disabled by default).
- **L2 power factor** (%): Power factor on phase L2 (disabled by default).
- **L3 voltage** (V): Voltage on phase L3 (disabled by default).
- **L3 current** (A): Current on phase L3.
- **L3 active power** (W): Active power on phase L3.
- **L3 reactive power** (var): Reactive power on phase L3 (disabled by default).
- **L3 apparent power** (VA): Apparent power on phase L3 (disabled by default).
- **L3 power factor** (%): Power factor on phase L3 (disabled by default).
- **Neutral current** (A): Current on neutral conductor (N) (disabled by default).

##### General

- **Charging rate**: Charging rate with considered user defined average consumption of the EV in Kilometer per Hour.
- **Vehicle connected since**: Timestamp derived from the device-reported connection time.
- **Vehicle charging time** (s): Charging time of the most recent charge session.
- **Status**: Charging status (for example standby, connected, charging, error).
- **Charge count**: Vehicle plug-in cycle count.
- **RCD trigger**: Indicates if the RCD got triggered and which type.
- **Warning code**: Current warning code reported by the device.
- **Error code**: Current error code reported by the device.

##### Temperatures

- **Housing temperature** (°C): NRGkick housing temperature.
- **Connector L1 temperature** (°C): Attachment phase 1 temperature.
- **Connector L2 temperature** (°C): Attachment phase 2 temperature.
- **Connector L3 temperature** (°C): Attachment phase 3 temperature.
- **Domestic plug 1 temperature** (°C): Domestic attachment pin 1 temperature.
- **Domestic plug 2 temperature** (°C): Domestic attachment pin 2 temperature.

### Controls

The integration creates the following controls.

#### Switches

- **Charging enabled**: Turn on to enable charging. Turn off to pause charging.

#### Numbers
- **Charging current** (A): Set the charging current (6 A to the maximum supported by your device and the connected attachment).
- **Phase count**: Set the number of phases (1 to 3, depending on the connected attachment).
- **Energy limit** (Wh): Set an energy limit for the current charging session (0 = no limit).

### Key entities

Entity IDs depend on your device name in Home Assistant. The examples below assume the default device name of `NRGkick`.

- `sensor.nrgkick_charging_current`: Charging current.
- `sensor.nrgkick_charged_energy`: Charged energy.
- `sensor.nrgkick_status`: Charging status.
- `number.nrgkick_charging_current`: Set the charging current.
- `number.nrgkick_energy_limit`: Set an energy limit for the current charging session (0 = no limit).
- `number.nrgkick_phase_count`: Set the number of phases.
- `switch.nrgkick_charging_enabled`: Turn on to enable charging. Turn off to pause charging.

## Data updates

The integration {% term polling polls %} the device for updates.

- Polling interval: 30 seconds.
- You cannot change the polling interval.

## Known limitations

- The maximum charging current and phase count depend on the connected attachment.
- Per-phase values for L2 and L3 are only available when the power source and session are using multiple phases.
- Some temperature sensors depend on the connected attachment and may not be available.
- Cellular and GPS sensors are only available on SIM models.

## Troubleshooting

### Can't connect to the device

If setup fails with a connection error:

- Verify the device is reachable on your network.
- Verify the REST JSON API is enabled in the NRGkick app.
- If you use authentication, verify the username and password.

### Entities show unavailable

- Verify the device is powered on and connected.
- Under {% my integrations title="**Settings** > **Devices & services**" %}, select **NRGkick**, then reload the integration.
- If your network is unstable, verify Wi-Fi coverage.

### Some phase sensors are missing or show as unknown

This is expected when charging with a single-phase power source. Those sensors usually provide values only when a three-phase source is available and active.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
