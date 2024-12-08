---
title: IronOS
description: Instructions on how to integrate IronOS-based Pinecil V2 devices with Home Assistant.
ha_category:
  - Number
  - Sensor
  - Update
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
  - update
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


## Update

- **Firmware:** The update entity indicates if the firmware is up-to-date or if there is a newer IronOS version available for your device. For more information on how to update your device, please refer to the [IronOS documentation](https://ralim.github.io/IronOS/).

## Device settings and configuration

The following controls allow you to customize the settings and options for your soldering device. Some controls are deactivated by default, as they are either advanced settings, less critical, or usually do not require adjustment.

### Basic settings

- **Boost temperature:** Sets the temperature for boost mode, which temporarily overrides the soldering temperature when the front button is held down.
- **Sleep temperature:** The temperature the device drops to after a specified period of inactivity (no movement or button presses).
- **Sleep timeout:** The duration of inactivity required before the device enters sleep mode and drops to the sleep temperature.

- **Long-press temperature step:** The temperature adjustment increment when holding down a button. Defaults to 10°.
- **Short-press temperature step:** The temperature adjustment increment when briefly pressing a button. Defaults to 1°.
- **Motion sensitivity:** Controls how sensitive the device is to movement. Higher values increase sensitivity (for example, 0 = motion detection is off).
- **Hall effect sensitivity:** Configures the sensitivity of the hall effect sensor (if present) for detecting a magnet to activate sleep mode.
- **Display brightness:** Adjusts the brightness of the soldering iron's display.

### Power management

- **Keep-awake pulse duration:** Specifies the duration of the power pulse to keep connected power banks awake. Shorter durations minimize power waste and unnecessary heating.
- **Keep-awake pulse delay:** Adjusts the interval between power pulses. Longer delays reduce unwanted heating, but must be short enough to prevent the power bank from shutting off.
- **Keep-awake pulse intensity:** Enables and sets the wattage of the power pulse. The power pulse briefly activates the heater to draw sufficient power, preventing connected power banks from entering sleep mode.
- **Min. voltage per cell:** Sets the minimum voltage per battery cell before shutdown. This value is multiplied by the cell count (for example, 3S: 3–3.7V, 4–6S: 2.4–3.7V).
- **Power Delivery timeout:** Defines how long the firmware will attempt to negotiate USB-PD before switching to Quick Charge. Lower values are recommended for faster PD negotiation.
- **Power limit:** Sets a custom wattage cap for the device to maintain the **average** power below this value. Note: Peak power cannot be controlled. When using USB-PD, the limit will be the lower of this setting and the power supply's advertised wattage.
- **Quick Charge voltage:** Adjusts the maximum voltage for Quick Charge negotiation. Does not affect USB-PD. Ensure the setting aligns with the current rating of your power supply for safety.

### Advanced settings

These settings are intended for technically experienced users and require careful consideration before changes.

- **Voltage divider:** Fine-tunes the measured voltage to account for variations in the voltage sense resistors between units.
- **Calibration offset:** Adjusts the calibration of the thermocouple measurements, which determine the temperature displayed for the tip.
