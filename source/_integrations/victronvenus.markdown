---
title: "Victron Venus OS Integration"
description: "Documentation for the Victron Venus integration"
ha_release: "2025.3"
ha_category: Energy
ha_iot_class: "Local Push"
ha_config_flow: true
ha_codeowners:
  - '@JohansLab'
ha_domain: victronvenus

---

The [Victron](https://www.victronenergy.com/) Venus OS integration allows connection to 
a [Victron Venus OS device](https://www.victronenergy.com/monitoring).
 that has local MQTT enabled. This add-on will automatically configure the
  integration through UPnP/Simple Service Discovery Protocol if possible.

## Installation and Configuration

### Prerequisites

This integration requires a Venus OS device configured to expose its MQTT interface.
To configure it on your device the following steps can be followed:

1. Open the Venus local web console. It is typically available at 
[http://venus.local.](http://venus.local./). 
2. Navigate to Settings > Services and activate MQTT on LAN.

### Setup in Home Assistant

If MQTT is enabled the installation should be picked up automatically with 
UPnP/Simple Service Discovery Protocol. In case the device is not picked up automatically
it can be added manually.

To add the integration manually, add the integration using Home Assistant's
menu. It will prompt for the following information:

1. Host name - Default venus.local. You can also enter an IP address
2. Port - the default MQTT port is 1883.
3. User name - this is optional and the default is empty. 
4. Password - this is optional and the default is empty.
5. Use SSL - indicates whether the connection should be made via SSL.

Not that the Venus settings on the device does not allow you to configure
a username and password via the Venus web console.

+{% warning %}  
+Using default empty credentials is not recommended if your device is accessible from the internet. 
+Consider implementing network isolation or firewall rules to restrict access to your local network.  
+{% endwarning %}  

The connection typically fail for the following reasons:

1. Device is not configured for MQTT, please see [Prerequisites]
2. The network connection to the device is unstable (e.g. due to weak WiFi signal
or similar). This can cause name look-up failures. For unstable connections using
the IP address of the device can alleviate the problem.


## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}

## Integration Functionality

The integration currently only provides sensors.

### List of exposes sensors

#### Grid Sensors

- The number of grid phases e.g. 1 for single-phase, or 3 for three-phase.
If there is a grid failure then the number of phases will be 0. This can be used
detect grid failure.
- The AC voltage, current and power for each of the available grid phases.
- The combined voltage, current and power for the combined grid input.
- The lifetime running total of all energy consumed from the grid, or fed back
to the grid. These figures generally only makes sense as delta values.

#### Solar Panels

- The DC voltage, current and power of the solar panels.
- The lifetime running total yield of the solar panels. These figures generally
only makes sense as delta values.
- The maximum power produced by the solar panels for the current day.

#### Batteries

- The DC voltage, current and power of the batteries.
- The temperature of the battery.
- The lifetime running total of energy charged and discharged from the battery.
These figures generally only makes sense as delta values.
- The current capacity and installed capacity of the batteries in Ampere-Hours (Ah).
- The state of charge of the batteries.

#### Consumption

- The AC Load in watts on the inverter input.
- The Critical Loads in watts on the inverter output.

## Limitations

The integration currently has the following limitations:

- The integration was built and tested against an installation consisting of a
single-phase grid-tied Multiplus Inverter, with a single MPPT Solar Charger and
a battery that contains its own BMS. Your installation might have a different
configuration.
- The integration does not currently support generators and other configuration
 options.
- The integration currently only exposes sensors, it does not yet allow changing
Venus OS settings from Home Assistant.
- This integration was not tested with MQTT with SSL. 


## Advanced Troubleshooting Options

### Verify that the Venus device is visible on your network:

```bash
ping venus.local.
```

#### Verify that MQTT is working and available

1. Download an application like [MQTT Explorer](http://mqtt-explorer.com/) and
connect to your venus device.
2. Find your serial number under the topic hierarchy e.g. "N/<serial>/system/0/Serial"
3. Publish the number "1" to the topic "R/<serial>/keepalive"
4. You should see various parameters of your system reflected under the "N/<serial>" 
hierarchy.
