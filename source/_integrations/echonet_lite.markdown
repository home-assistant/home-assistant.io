---
title: HEMS Echonet Lite
description: Instructions on how to integrate ECHONET Lite devices using the HEMS Echonet Lite integration.
ha_release: 2026.2
ha_iot_class: Local Polling
ha_codeowners:
  - '@sayurin'
ha_domain: echonet_lite
ha_config_flow: true
ha_platforms:
   - switch
ha_category:   
  - Switch
ha_integration_type: hub
ha_quality_scale: bronze
related:
  - url: https://echonet.jp/
    title: ECHONET Consortium (Japanese only)
---

The **HEMS Echonet Lite** {% term integration %} allows you to integrate ECHONET Lite compatible devices into Home Assistant. [ECHONET Lite](https://echonet.jp/) is a communication protocol standard widely used in Japan for smart home appliances, including air conditioners, solar power systems, storage batteries, and more.

This integration automatically discovers ECHONET Lite devices on your local network using multicast communication (224.0.23.0:3610) and creates entities based on the device capabilities.

## Supported devices

The following device classes have been verified with real hardware and are fully supported:

- **Home air conditioner** (Class code: 0x0130)
  - Mitsubishi Electric, Kirigamine Z series
- **Air cleaner** (Class code: 0x0135)
  - Sharp, KI-SX70-W
- **Household solar power generation** (Class code: 0x0279)
  - Sharp, SUNVISTA
- **Storage battery** (Class code: 0x027D)
  - Sharp, SUNVISTA
- **Switch (supporting JEM-A/HA terminals)** (Class code: 0x05FD)
  - Panasonic, HF-JA1
- **Controller** (Class code: 0x05FF)
  - Sharp, JH-RVB1
  - Sharp, JH-RWL8

## Experimental devices

The following device classes are implemented but have not been tested with real hardware. Enable the **Enable experimental device classes** option in the [configuration options](#configuration-options) to use these devices:

- **Sensors** (Group code: 0x00)
  - Crime prevention sensor (0x0002)
  - Emergency button (0x0003)
  - Human detection sensor (0x0007)
  - Temperature sensor (0x0011)
  - Humidity sensor (0x0012)
  - Bath heating status sensor (0x0016)
  - CO2 sensor (0x001B)
  - VOC sensor (0x001D)
  - Electric energy sensor (0x0022)
  - Current sensor (0x0023)
  - Illuminance sensor (0x00D0)
- **Air conditioners** (Group code: 0x01)
  - Ventilation fan (0x0133)
  - Air conditioner ventilation fan (0x0134)
  - Package-type commercial air conditioner (indoor unit) (0x0156)
  - Package-type commercial air conditioner (outdoor unit) (0x0157)
- **Housings / Facilities** (Group code: 0x02)
  - Electrically operated blind/shade (0x0260)
  - Electrically operated rain sliding door/shutter (0x0263)
  - Electric water heater (0x026B)
  - Electric lock (0x026F)
  - Instantaneous water heater (0x0272)
  - Bathroom heater dryer (0x0273)
  - Cold or hot water heat source equipment (0x027A)
  - Floor heater (0x027B)
  - Fuel cell (0x027C)
  - EV charger and discharger (0x027E)
  - Watt-hour meter (0x0280)
  - Water flowmeter (0x0281)
  - Gas meter (0x0282)
  - Power distribution board metering (0x0287)
  - Low-voltage smart electric energy meter (0x0288)
  - High-voltage smart electric energy meter (0x028A)
  - Smart electric energy meter for sub-metering (0x028D)
  - Distributed generator's electric energy meter (0x028E)
  - Bidirectional high voltage smart electric energy meter (0x028F)
  - General lighting (0x0290)
  - Mono functional lighting (0x0291)
  - EV charger (0x02A1)
  - Lighting system (0x02A3)
  - Extended lighting system (0x02A4)
  - Multiple input PCS (0x02A5)
  - Hybrid water heater (0x02A6)
  - Frequency regulation (0x02A7)
- **Cookings / Households** (Group code: 0x03)
  - Refrigerator (0x03B7)
  - Cooking heater (0x03B9)
  - Rice cooker (0x03BB)
  - Commercial showcase (0x03CE)
  - Washer and dryer (0x03D3)
  - Commercial showcase outdoor unit (0x03D4)
- **Audiovisuals** (Group code: 0x06)
  - Television (0x0602)

## Prerequisites

1. Ensure your ECHONET Lite compatible devices are connected to the same network as Home Assistant.
2. Make sure your network allows UDP multicast traffic on address 224.0.23.0 port 3610.
3. If running Home Assistant in a container or VM, ensure multicast traffic is properly forwarded.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Network interface:
    description: "Select the network interface to use for ECHONET Lite communication. Select **Auto** to let Home Assistant automatically detect the appropriate interface."
{% endconfiguration_basic %}

## Configuration options

The integration provides the following configuration options, which can be changed after setup via {% my integrations title="**Settings** > **Devices & services**" %} > **HEMS Echonet Lite** > **Configure**:

{% configuration_basic %}
Enable experimental device classes:
    description: "When enabled, device classes that have not been verified with real hardware will also be registered. These may not work correctly."
{% endconfiguration_basic %}

## Supported functionality

The **HEMS Echonet Lite** integration provides the following entity platforms based on device capabilities.

### Switches

On/off control for features such as:

- Power-saving mode
- Humidifier function
- Air purification mode
- Ventilation settings

## Data updates

The **HEMS Echonet Lite** integration uses both {% term polling %} and event-driven updates:

- **Polling interval**: Device properties are polled every 60 seconds.
- **Discovery interval**: New devices are discovered every hour via multicast.
- **Event-driven**: Devices that support property change notifications (INF) will push updates immediately.

## Known limitations

- Only IPv4 networks are supported.
- The integration requires UDP multicast support on the network.
- Some device properties may not be available if the device does not advertise them in its property map.
- Currently, only the switch platform is implemented; other entity platforms (sensor, climate, etc.) are not yet available.

## Troubleshooting

### No devices discovered

After setting up the integration, no devices appear at all.

To resolve this issue, try the following steps:

1. Verify your ECHONET Lite devices are powered on and connected to the network.
2. Check that UDP multicast traffic (224.0.23.0:3610) is allowed on your network.
3. If using Docker, ensure the container uses `network_mode: host` or has proper multicast routing.
4. Try selecting a specific network interface instead of Auto in the integration settings.
5. Check the Home Assistant logs for any error messages related to HEMS.

### Some devices not discovered

Some ECHONET Lite devices appear, but others do not.

To resolve this issue, try the following steps:

1. If the missing device is an experimental device class, enable **Enable experimental device classes** in the [configuration options](#configuration-options).
2. Some devices may take longer to respond. Wait a few minutes and check again, as discovery runs periodically.
3. Try reloading the integration from {% my integrations title="**Settings** > **Devices & services**" %} > **HEMS Echonet Lite** > {% icon "mdi:dots-vertical" %} > **Reload**.
4. Verify the missing device supports ECHONET Lite. Some appliances have ECHONET Lite disabled by default and require enabling via the manufacturer's app or settings.

### Devices show as unavailable

Devices were discovered but later show as unavailable.

To resolve this issue, try the following steps:

1. Check the device's network connection.
2. Verify the device hasn't entered a power-saving mode that disables network communication.
3. Check {% my repairs title="**Settings** > **System** > **Repairs**" %} for any issues reported by the integration and follow the suggested resolution.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
