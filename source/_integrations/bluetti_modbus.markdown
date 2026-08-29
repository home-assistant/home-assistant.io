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

The **BLUETTI Modbus** {% term integration %} connects Home Assistant to your BLUETTI power station over your own network, using the Modbus TCP interface built into the device. There is no account, no API key, and no cloud service involved, so your readings keep arriving in Home Assistant even when your internet connection or the BLUETTI cloud service is down.

If you would rather use BLUETTI's cloud service, for example to control the device or to add a device that has no local Modbus interface, use the [BLUETTI](/integrations/bluetti/) integration instead. You can use both at the same time on the same device.

## Supported devices

This integration has been tested with, or reported to work on, the following power stations:

- Balco260
- EP2000

Modbus TCP is available on devices that have a network connection. If you cannot find the setting on your device, updating its firmware usually adds it.

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
Model:
  description: "The BLUETTI power station model you are connecting to. There is no way for the integration to detect this automatically, so pick the model that matches your device."
{% endconfiguration_basic %}

To adjust the above configuration later, go to {% my integrations title="**Settings** > **Devices & services**" %}, select the integration entry, select {% icon "mdi:dots-vertical" %}, and select **Reconfigure**.

## Supported functionality

Your power station is added as a single device.

### Sensors

- **Battery Voltage**, **Total Battery Voltage**: The battery's voltage.
- **Battery Current**, **Total Battery Current**: The battery's current.
- **Battery SoC**, **Total Battery SoC**: The battery's present charge level.
- **Battery SoH**, **Total Battery SoH**: The battery's state of health.
- **Average Battery Temperature**: The battery's temperature.
- **Total Battery Charged Energy**, **Total Battery Discharged Energy**: Lifetime battery energy counters.
- **AC Output Power**, **Total AC Output Energy**: What the device is feeding to AC loads.
- Per-string solar input (**Input Voltage**, **Input Current**, **Input Power** for PV strings 1 through 4, where the device has that many).
- **PV AC Power**, **PV AC Energy**, **Total PV Input Power**, **Total PV Input Energy**: Combined solar production.
- **Grid Frequency**, **Grid Input Power**: What the device reads from the grid.
- **Total Grid Import Energy**, **Total Grid Export Energy**: Lifetime grid energy counters, where the device reports them.
- **Inverter Status**, **Inverter Fault**, **Inverter Warning**: The inverter's current status and any active fault or warning.
- **Total Inverter Power**, **Inverter Count**: Inverter-level totals.

The following are added as diagnostic entities: **Battery Type**, **Inverter Type**, **Cell Count**, **Battery Cycle Count**, **Temperature Sensor Count**, **Number of Battery Packs**.

The device's charge limits (max charge / min discharge SoC) and its AC output, grid charging, and grid feed-in switches are not exposed by this integration yet, not even as read-only entities. See [Known limitations](#known-limitations) for the full list.

**Total Battery SoC** and **Total Battery SoH** read `0%` on a device with no expansion battery pack attached, which is expected rather than a fault.

## Data updates

The **BLUETTI Modbus** integration {% term polling polls %} the device every 30 seconds. This device's Modbus TCP interface has been found to become unresponsive when polled more often, so the interval is not configurable.

Home Assistant keeps one Modbus connection per address and shares it between the integrations that use it. If the device does not answer a poll, its {% term entity entities %} become unavailable. Home Assistant does not keep showing the last known reading as if it were current.

## Known limitations

- Only sensors are provided by this integration today. The writable settings (AC output, grid charging, grid feed-in), the charge limit values, and the fault/warning bits as proper binary sensors are not available yet.
- The device model cannot be detected automatically; you select it yourself during setup, and setup does not always catch a wrong pick - see [Setup fails after selecting a model](#setup-fails-after-selecting-a-model). If you picked the wrong one, use **Reconfigure** rather than removing and re-adding the integration.
- On a model that reports a serial number over Modbus (Balco260), Home Assistant identifies the device by it: if the address ends up reassigned to a different physical unit, entities go unavailable instead of silently showing the wrong device's data, and reconfiguring the entry to that address is rejected. A model with no serial field (EP2000) is identified by its address, device ID, and port instead, with no way to detect a same-address swap to a different unit; moving the device still requires reconfiguring the entry to the new address either way.
- A device accepts a limited number of Modbus TCP connections at the same time. If another system on your network already polls the device, Home Assistant may not be able to connect.

## Troubleshooting

### The device cannot be reached

If setup or a later poll cannot reach the device, work through the following steps:

1. Make sure the device is powered on and reachable on your network, for example by looking it up in your router.
2. Check that Modbus TCP is still enabled on the device.
3. Check the port. BLUETTI uses `502` by default.
4. Check whether another system is already polling the device, and stop it while you test.

### Setup fails after selecting a model

The model selected during setup is confirmed by successfully reading that model's registers from the device, not by checking the device's real model. EP2000's register map is almost entirely a subset of Balco260's, at the same addresses, so picking **EP2000** for a device that is actually a Balco260 can still pass setup - you get a working entry, just missing the Balco260-only sensors (serial number, ARM/DSP firmware version, grid energy totals, and PV strings 3 and 4). Picking **Balco260** for a device that is really an EP2000 does reliably fail, since Balco260's map includes registers an EP2000 does not answer.

If you are missing sensors you expect, or entities that never leave `unavailable`, reconfigure the entry and try the other model.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}

The Modbus TCP setting stays enabled on the device. You can turn it off in the device's own settings if nothing else uses it.
