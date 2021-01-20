---
title: Daikin Madoka AC
description: Instructions on how to integrate Daikin BRC1H thermostat (madoka) devices with Home Assistant.
ha_category:
  - Climate
  - Sensor
ha_release: 2021.1.4
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@mduran80'
ha_domain: daikin_madoka
---

The `Daikin Madoka AC` integration provides support for the Daikin BRC1H thermostats in Home Assistant.

The BRC1H (and its variants) is a thermostat with Bluetooth LE support controlled by mobile apps on Android and iOS.

There is currently support for the following device types within Home Assistant:

- [Climate](#climate)
- [Sensor](#sensor)

## Requirements

- This integration has only been tested on Linux
- Bluetooth adapter
- DBUS support on the system where Home Assistant runs. If run within Docker or custom installation, make sure it is available to your containers by checking that it has access to the dbus(`/var/run/dbus/system_bus_socket` must be present and the container must be run in privileged mode). 

<div class='note'>

* The BRC1H thermostat has requirements:
    * Only one Bluetooth client can be connected at a time. When the thermostat is connected, it is not listed on a Bluetooth devices scan. Therefore, it is required to disconnect and forget any previous connection from the device screen.
    * The Bluetooth pairing requires authorization code and human intervention. The thermostat has to be paired with the system on which the integration is going to be run. For instance, in Linux these steps must be followed:
    * **Remove any previous Bluetooth connections from the thermostat menu.**
    * On the host to be paired, run the following commands in a terminal:
    1. Type `bluetoothctl`
    2. Type `agent off`
    3. Type `agent KeyboardDisplay`
    4. Type `remove <BRC1H_MAC_ADDRESS>`. This step helps to remove unsuccessful previous pairings and makes the device visible.
    5. Type `scan on` and wait until your thermostat Bluetooth MAC address is listed
    6. Type `scan off`
    7. Type `pair <BRC1H_MAC_ADDRESS>`
    8. Type 'yes' when prompted and accept the connection on the thermostat screen. These two actions must be relatively close in time or the thermostat will cancel the operation. The thermostat will be paired with the host.
    

A dedicated Bluetooth adapter is desirable. If you run Home Assistant in a virtual machine, it makes it easiser for the device to be used. In VMWare, make sure to remove the checkbox "Share Bluetooth devices with guests" so the device is fully available to the virtual machine.

</div>

## Configuration

The Daikin integration can be configured via the Home Assistant user interface (menu Configuration > Integrations) The following fields are available:

- List of devices to be integrated. Specify a comma-separated list of MAC addresses 
- Adapter: Name of the Bluetooth adapter to be used for the connections
- Discovery timeout: Scan for Bluetooth devices for the specified interval
- Force device disconnection: It improves the detection of the Bluetooth LE services offered by the device

## Climate

The `daikin madoka` climate platform integrates Daikin air conditioning systems into Home Assistant, enabling control of setting the following parameters:

- [**set_hvac_mode**](/integrations/climate/#service-climateset_hvac_mode) (`off`, `heat`, `cool`, `heat_cool`, or `fan_only`)
- [**target temperature**](/integrations/climate#service-climateset_temperature)
- [**turn on/off**](/integrations/climate#service-climateturn_on)
- [**fan mode**](/integrations/climate#service-climateset_fan_mode) (speed)
- [**swing mode**](/integrations/climate#service-climateset_swing_mode)

Current indoor temperature is displayed.

## Sensor

The `daikin_madoka` sensor platform integrates Daikin air conditioning systems into Home Assistant, enabling displaying the following parameters:

- Indoor temperature


