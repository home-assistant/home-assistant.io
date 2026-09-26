---
title: BLUETTI Modbus
description: Instructions on how to integrate a BLUETTI power station with Home Assistant over Modbus TCP.
ha_category:
  - Energy
  - Sensor
ha_release: 2026.10
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@chpego'
ha_domain: bluetti_modbus
ha_platforms:
  - sensor
ha_integration_type: device
ha_quality_scale: bronze
---

The **BLUETTI Modbus** {% term integration %} connects Home Assistant to your [BLUETTI](https://www.bluettipower.com/) power station over your own network, using the Modbus TCP interface built into the device. There is no account, no API key, and no cloud service involved, so your readings keep arriving in Home Assistant even when your internet connection or the BLUETTI cloud service is down.

## Supported devices

This integration has been tested with, or reported to work on, the following power stations:

- Balco260

During setup, the integration checks the model the device reports and refuses any other.

Modbus TCP is available on devices that have a network connection. If you cannot find the setting on your device, updating its firmware usually adds it.

EP2000 is not supported yet: reports so far indicate that model does not expose Modbus TCP on its retail firmware.

## Prerequisites

Modbus TCP is turned off by default, so you need to enable it on the device itself first, through its built-in local web server (enabled by default).

{% important %}
Modbus TCP support is only available on some device models and firmware versions. If you cannot find these settings, your device does not support this yet.
{% endimportant %}

1. Make sure the computer you are using is on the same network as the device.
2. Find the device's IP address on the network configuration page of the BLUETTI app.
3. Open that IP address in a browser to reach the device's local web page.
4. Sign in. The username is `admin`; the password is your BLUETTI app password, or blank if you never set one.
5. Go to **Settings** > **Modbus TCP**, turn on **Enable**, set **Port** to `502`, and select **Settings** to save.

You also need the hostname or IP address of the device on your network. Giving the device a fixed address in your router keeps Home Assistant pointed at the right one.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: "The hostname or IP address of your BLUETTI power station. For example, `192.168.1.100`."
Port:
  description: "The port the device listens on for Modbus requests. The BLUETTI default is `502`."
Device ID:
  description: "The Modbus device ID of the power station, as configured on the device itself. The default is `1`. You only need to change this if your device was given another ID."
{% endconfiguration_basic %}

## Supported functionality

Your power station is added as a single device.

### Sensors

- **Battery voltage**, **Total battery voltage**: The battery's voltage.
- **Battery current**, **Total battery current**: The battery's current. The device only reports its magnitude, so it reads the same whether the battery is charging or discharging.
- **Battery SoC**: The battery's present charge level.
- **Total battery charged energy**, **Total battery discharged energy**: Lifetime battery energy counters, in Wh.
- **AC output power**, **AC output voltage**, **AC output current**, **Total AC output energy**: What the device is feeding to AC loads.
- **PV 1 input voltage**, **PV 1 input current**, **PV 1 input power**, and the same for **PV 2** to **PV 4**: Each of the four solar inputs (MPPT trackers). An input with no panel connected reads 0.
- **PV AC power**, **PV AC energy**, **Total PV input power**, **Total PV input energy**: Combined solar production.
- **Grid frequency**, **Grid voltage**, **Grid current**, **Grid input power**: What the device reads from the grid.
- **Total grid import energy**, **Total grid export energy**: Lifetime grid energy counters, where the device reports them.
- **Inverter status**: The inverter's current status.
- **Inverter voltage**, **Inverter current**, **Total inverter power**: The inverter's output. The power is negative while the inverter charges the battery.

The following are added as diagnostic entities: **Battery SoH**, **Battery type**, **Battery cycle count**, **Cell count**, **Temperature sensor count**, **Inverter type**, **Inverter count**, **PV 1 input type** to **PV 4 input type**, **DC PV input count**, **AC PV input count**.

The device's charge limits (max charge / min discharge SoC) and its AC output, grid charging, and grid feed-in switches are not exposed by this integration yet, not even as read-only entities. See [Known limitations](#known-limitations) for the full list.

The serial number appears on the device's info page too, alongside the ARM, DSP, and IoT module firmware versions ({% my integrations title="**Settings** > **Devices & services**" %}, select the integration entry, then the device) - neither is a sensor.

## Data updates

The **BLUETTI Modbus** integration {% term polling polls %} the device every 30 seconds. This device's Modbus TCP interface has been found to become unresponsive when polled more often, so the interval is not configurable.

Home Assistant keeps one Modbus connection per address and shares it between the integrations that use it. If the device does not answer a poll, its {% term entity entities %} become unavailable. Home Assistant does not keep showing the last known reading as if it were current.

## Known limitations

- Only sensors are provided by this integration today. The writable settings (AC output, grid charging, grid feed-in), the charge limit values, and the fault/warning bits as proper binary sensors are not available yet.
- The battery pack summary (charge level and state of health across all packs, the pack count, the battery status, and the time to full or empty) is not available yet, and neither are BC260 expansion packs.
- Grid, AC output, and inverter voltage and current are only provided for the first phase.
- The device is not discovered automatically yet; add it by its address.
- There is no way yet to change a device's address, port, or device ID without removing and re-adding the integration.
- Home Assistant identifies the device by its serial number: if the address ends up reassigned to a different physical unit, entities go unavailable instead of silently showing the wrong device's data.
- A device accepts a limited number of Modbus TCP connections at the same time. If another system on your network already polls the device, Home Assistant may not be able to connect.

## Troubleshooting

### The device cannot be reached

If setup or a later poll cannot reach the device, work through the following steps:

1. Make sure the device is powered on and reachable on your network, for example by looking it up in your router.
2. Check that Modbus TCP is still enabled on the device.
3. Check the port. BLUETTI uses `502` by default.
4. Check whether another system is already polling the device, and stop it while you test.

### Entities are unavailable for a short time

About once an hour, the device drops its Modbus connection or answers a request with a damaged reply. The integration retries at once and reconnects if needed. If that still fails, the entities show as unavailable until the next poll, 30 seconds later. No action is needed.

### The device is not a supported model

Setup stops with this error when the device at that address does not report itself as a Balco260. Check the address and device ID, and see [Supported devices](#supported-devices).

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}

The Modbus TCP setting stays enabled on the device. You can turn it off in the device's own settings if nothing else uses it.
