---
title: Plugwise USB-stick
description: Plugwise USB-stick integration.
ha_category:
  - Sensor
  - Switch
ha_iot_class: Local Push
ha_release: 0.111
ha_codeowners:
  - '@brefra'
ha_domain: plugwise_stick
---

This integration enables switching of the relay and monitoring of consumed power of the legacy [Plugwise](https://plugwise.com) Circle+, [Circle](https://www.plugwise.com/en_US/products/circle) and [Stealth](https://www.plugwise.com/en_US/products/stealth) devices.

<div class='note'>

  Be aware this integration does **not** support the more recent [Plug](https://www.plugwise.com/en_US/products/plug) devices, which can be identified by having a local button as opposed to the old Circles which don't have a button at all.
  If you want to control the new Plugwise devices like the Plugwise Anna thermostat and plugs check out the [Plugwise](/integrations/plugwise/) integration.

</div>

This integration requires to have a Plugwise USB-stick and Circle+ to communicate directly to the Plugwise devices. The additional Plugwise devices should be linked to the Circle+.
There is currently support for the following Plugwise devices types within Home Assistant:

- Circle+
- [Circle](https://www.plugwise.com/en_US/products/circle)
- [Stealth](https://www.plugwise.com/en_US/products/stealth)

## Configuration

From the Home Assistant front page go to **Configuration** and then select **Integrations** from the list.
Use the plus button in the bottom right to add a new integration called **Plugwise USB-Stick**.

In the set up wizard at the 'USB Device Path' it will list all detected serial ports available to Home Assistant. You need to pick the serialport of the connected Plugwise USB-Stick.
If required the selection list contains the possibility to manually enter the device path.

When you press `Submit` and the integration will try to initialize the USB-Stick at the supplied device path. If the connection to the USB-stick is initialized successfully, it will automatically do a discovery of all linked Plugwise nodes stored at the Circle+ device.
An error will be displayed in the wizard if Home Assistant can't access the USB-stick or the connection fails.

The integration will automatically save the connection by the serial path (eg `/dev/serial/by-id/*`) to keep the connection consistent between system restarts.

## Switches

A `switch` entity will be automatically created for the Circle+, Circle and Steath devices to control the power to the attached load. If required the switch control can be disabled in Home Assistant.

## Sensors

The following `sensor` entities will automatically be created. Some `sensor` entities are less useful and disabled by default. If required these can be enabled from the `Devices` panel in the `Configuration` page of the web interface.

- **Ping roundtrip**
  Network roundtrip time (milliseconds).

- **Power use**
  Average power use during 1 second measurement (Watt).

- **Power usage 8 seconds**
  Average power use during 8 seconds measurement (Watt).

- **Power consumption current hour**
  Total power consumption during this hour (kWh).

- **Power consumption previous hour**
  Total power consumption during previous hour (kWh).

- **Power consumption today**
  Total power usage from today to the present (kWh).

- **Power consumption yesterday**
  Total power usage from yesterday (kWh).

- **Power production current hour**
  Total power production during this hour (kWh).

- **Power production previous hour**
  Total power production during previous hour (kWh).

## Known issues

The following Plugwise are not supported:

- [Scan](https://www.plugwise.com/en_US/products/scan)
- [Sense](https://www.plugwise.com/en_US/products/sense)
- [Switch](https://www.plugwise.com/en_US/products/switch)
- [Sting](https://www.plugwise.com/en_US/products/sting)
- [Stealth-M](https://www.plugwise.com/en_US/products/stealth-m)

Currently there is no support for linking (or removing) nodes from the Plugwise network. You still need the Plugwise [Source software](https://www.plugwise.com/en_US/source) for that.

The sensors are automatically refreshed. The used refresh time is based on the number linked devices.

When a device is not reachable it will be marked as unavailable. Every hour another attempt is made to check whether the device is available again. If this is the case, the device will be made available again in Home Assistant. After this, the sensors will also be updated again.
