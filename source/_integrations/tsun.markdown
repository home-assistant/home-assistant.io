---
title: TSUN
description: Monitor supported TSUN micro-inverters over the local network.
ha_category:
  - Energy
ha_config_flow: true
ha_domain: tsun
ha_integration_type: device
ha_iot_class: Local Polling
ha_platforms:
  - sensor
ha_release: 2026.10
ha_codeowners:
  - '@jptstar'
---

The **TSUN** {% term integration %} connects supported
[TSUN](https://www.tsun-ess.com/) micro-inverters directly to Home Assistant
over the local network. It provides production and energy measurements without
requiring a cloud service or proxy. All communication with the micro-inverter
is read-only.

## Supported devices

The following devices have been tested on physical hardware:

- TSOL-MP3000, with six PV inputs
- TSOL-MX500, with one PV input

Other TSUN micro-inverters that use compatible local communication may also
work. The integration validates the device response during setup and creates
only the measurements provided by the detected device.

## Prerequisites

- The micro-inverter logger must be powered on. A solar-powered logger may be
  unavailable at night.
- Home Assistant must be able to reach the logger on the local network.
- You need the logger's IP address or hostname.

The default TCP port is `8899`. During setup, Home Assistant tries to read the
numeric **SN** automatically from the logger's local status page. If it cannot
be read, the setup form asks you to enter it manually. Use the numeric
**Device serial number** shown on the local status page or printed on the
logger label, not the alphanumeric micro-inverter serial number.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: The IP address or hostname of the micro-inverter logger.
Port:
  description: The local TCP port used by the logger. The default is `8899`.
SN:
  description: The numeric logger SN used for local communication. This field is shown only when Home Assistant cannot read it automatically.
{% endconfiguration_basic %}

## Supported functionality

The integration creates one device for each configured micro-inverter and
provides the following sensors when supported by that device:

- AC voltage, current, frequency, and power
- AC energy today and total AC energy
- PV voltage, current, power, energy today, and total energy for each detected
  PV input
- Total DC power calculated from the available PV power measurements

The number of PV inputs and the available measurements are detected from the
device response.

## Data updates

The integration {% term polling polls %} the micro-inverter every 20 seconds.
When the logger is not reachable, its entities become unavailable. Home
Assistant resumes updates automatically when communication is restored.

## Known limitations

- A solar-powered logger can be unreachable at night.
- Automatic SN detection depends on the logger's local status page. If this
  page is unavailable or its credentials have been changed, enter the numeric
  SN manually.
- Only the TSOL-MP3000 and TSOL-MX500 have currently been validated on
  physical hardware.
- This initial version does not provide network discovery, controls, alarms,
  or communication diagnostics.

## Troubleshooting

### The device cannot be set up

1. Configure the integration while the micro-inverter and its logger are
   powered on.
2. Confirm that Home Assistant can reach the logger's IP address and TCP port.
3. Check firewall, VLAN, and Wi-Fi client-isolation settings.
4. If automatic SN detection fails, enter the numeric **Device serial number**
   from the logger status page or label.

### The sensors are unavailable at night

This is expected when the logger is powered by the PV input. The integration
will resume polling automatically after the logger starts again.

## Removing the integration

This integration follows standard integration removal. Removing it does not
change any setting on the micro-inverter.

{% include integrations/remove_device_service.md %}
