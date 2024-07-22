---
title: Aurora ABB PowerOne Solar PV
description: Instructions on how to integrate an Aurora ABB PowerOne solar inverter within Home Assistant.
ha_category:
  - Energy
  - Sensor
ha_release: 0.96
ha_iot_class: Local Polling
ha_codeowners:
  - '@davet2001'
ha_domain: aurora_abb_powerone
ha_platforms:
  - sensor
ha_config_flow: true
ha_integration_type: device
---

This implements a direct RS485 connection to a solar inverter in the
PVI-3.0/3.6/4.2-TL-OUTD ABB series, and may work on others.
The inverter was formerly made by PowerOne who got taken over by ABB.

The TCP/IP method of communicating with inverters is supported by the
Python library, but not by this implementation in this integration.

This integration creates the inverter as a device with three sensors, reporting live power output in Watts, energy generated in kWh and device temperature.

Note the PV inverter will be unresponsive to communications when in darkness, 
so the sensors will report 'Unavailable' during the night.

The RS485 connection can be made using a low-cost USB-RS485 converter. It works using a 2-wire interface but an interface with a separate ground reference may be more reliable.

{% include integrations/config_flow.md %} 

The inverter will need to be on (i.e. in daylight) and connected correctly in order to do the first-time setup. Normally it is sufficient to select the correct serial port and leave the default address `2`.
