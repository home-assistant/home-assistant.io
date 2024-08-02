---
title: IronOS
description: Instructions on how to integrate IronOS-based Pinecil V2 devices with Home Assistant.
ha_category:
  - Number
  - Sensor
ha_iot_class: Local Polling
ha_release: 2024.8
ha_config_flow: true
ha_codeowners:
  - '@tr4nt0r'
ha_domain: iron_os
ha_integration_type: integration
ha_platforms:
  - number
  - sensor
---

The **IronOS** {% term integration %} seamlessly connects Home Assistant with PINE64's Pinecil V2 soldering irons, allowing for remote monitoring and control. This integration provides real-time updates on temperature, power, and various other settings and diagnostic information.

## Minimum requirements

- **Pinecil V2** requires IronOS v2.21 or higher to connect to Home Assistant. Please refer to the [Pinecil Wiki](https://wiki.pine64.org/wiki/Pinecil_Firmware#Overview) for update instructions.

{% include integrations/config_flow.md %}

## Number controls

- **Setpoint temperature:** Allows to set the desired target temperature for the soldering iron tip.

## Sensors

- **Tip temperature:** Monitors the current temperature of the soldering iron tip.
- **Handle temperature:** Displays the temperature of the soldering iron handle.
- **Estimated power:** Shows the estimated power consumption of the soldering iron.
- **DC input voltage:** Reports the voltage level being supplied to the soldering iron.
- **Last movement time:** Indicates when the soldering iron was last in motion (relative to the uptime of the device), useful for activity monitoring.
- **Operating mode:** Indicates the current operational state of the soldering iron, such as idle, soldering, boost, sleeping, settings, or debug.
- **Max tip temperature:** Indicates the maximum temperature that the currently inserted soldering iron tip supports.
- **Power level:** Displays the duty cycle of the pulse-width modulation (PWM) in percent, indicating the current power output of the soldering iron (for example, "50%" for a 50% duty cycle).
- **Power source:** Identifies the current power source used by the soldering iron, such as DC input, USB Quick Charge, USB Power Delivery, or USB Power Delivery VBUS.
- **Raw tip voltage:** Measures the raw voltage at the soldering iron's thermocouple, which is then offset compensated and converted to the tip temperature.
- **Tip resistance:** Indicates the resistance of the currently inserted soldering iron tip (for example, "6.2 Ω" for short tips, "8 Ω" for normal tips)
- **Uptime:** Tracks the total operating time of the soldering iron since its last power-on.
- **Hall effect strength:** (Optional) This feature requires the device to be [modified with a hall effect sensor](https://wiki.pine64.org/wiki/Pinecil_Hall_Effect_Sensor). If a neodymium magnet is attached to the stand, it enables proximity detection and can be utilized to calibrate when the iron enters sleep mode based on its proximity to the stand.
