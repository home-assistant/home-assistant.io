---
title: Growatt RS232
description: Instructions on how to integrate your Growatt solar inverter within Home Assistant via the RS232 connection.
ha_category:
  - Sensor
  - Energy
ha_release: 0.113
ha_iot_class: Local Polling
ha_quality_scale: No score
ha_config_flow: true
ha_codeowners:
  - "@ArdescoConsulting"
ha_domain: growatt_rs232
---

These are sensors to collect information from your Growatt inverters using the RS232 connection.

Instead of using the Growatt cloud service, it communicates directly via Modbus over the serial RS232 connector. Good for your privacy and security.

The only thing required is a simple USB to serial RS232 adapter with db9 connector (costing around 15€). Before buying, check if the adapter is compatible with Linux/Windows without having to install extra drivers.

The RS232 db9 connector is un the underside of the inverter. It's under a small cover plate requiring you to remove 2 screws.

## Configuration

Only interactive integration is supported (i.e. no yaml).

Go to Configuration / Integrations / + (in the bottom right corner).

You need to define

1. The USB port your RS232 adapter is using. In Linux normally /dev/ttyUSB0.
2. The Modbus slave address of the inverter. Between 1-247 but normally 1.

## Remarks

Depending on the firmware version of your inverter, not all entities may have data. Just disable those in Configuration / Entities.

When the solar panels generate insufficient power at night, the inverter shuts down completely and hence doesn't provide any data. The entities then show up as unavailable.

Some (very) old inverter versions only provide a proprietary RS232 serial protocol without Modbus. This integration is not compatible with that.
