---
title: IronOS
description: Instructions on how to integrate IronOS-based Pinecil V2 devices with Home Assistant.
ha_category:
  - Binary sensor
  - Button
  - Number
  - Select
  - Sensor
  - Switch
  - Update
ha_iot_class: Local Polling
ha_release: 2024.8
ha_config_flow: true
ha_codeowners:
  - '@tr4nt0r'
ha_domain: iron_os
ha_integration_type: integration
ha_platforms:
  - binary_sensor
  - button
  - diagnostics
  - number
  - select
  - sensor
  - switch
  - update
---

The **IronOS** {% term integration %} seamlessly connects Home Assistant with PINE64's Pinecil V2 soldering irons, allowing for remote monitoring and control. This integration provides real-time updates on temperature, power, and various other settings and diagnostic information.

## About IronOS

**IronOS** is an open-source firmware for smart soldering irons, offering advanced features like power negotiation, battery protection, and customizable settings. Originally developed for the TS100, it now supports a wide range of devices, including the Pinecil V2, the first model with BLE support. The firmware is feature-complete and available in 31 languages.

## How you can use this integration

The IronOS integration lets you monitor and control your smart soldering iron from Home Assistant and automate related tasks. For example, you can turn on a fume extractor automatically when the soldering iron enters soldering mode, and turn it off when the iron is laid down. You can also monitor the temperature of the tip and handle, as well as power draw and input voltage, directly on dashboards.

## Minimum requirements

- **Pinecil V2** requires IronOS v2.21 or higher to connect to Home Assistant. Please refer to the [Pinecil Wiki](https://wiki.pine64.org/wiki/Pinecil_Firmware#Overview) for update instructions.

## Prerequisites

The IronOS integration requires your device to be within Bluetooth range of Home Assistant, which must be equipped with a [Bluetooth adapter](/integrations/bluetooth/). If the device is out of range, an [ESPHome Bluetooth proxy](https://esphome.io/projects/?type=bluetooth) can be placed within range. In this case, a Bluetooth adapter on Home Assistant is not required.

Home Assistant will detect nearby IronOS devices. Discovered devices will show up on {% my integrations title="Settings > Devices & services" %} in the discovered section.

{% include integrations/config_flow.md %}

### Configuration parameters

{% configuration_basic %}
"Address":
  description: "The Bluetooth address of the detected IronOS device."
{% endconfiguration_basic %}

## Number controls

- **Setpoint temperature:** Allows to set the desired target temperature for the soldering iron tip.

## Binary sensors

- **Soldering tip:** Indicates whether a soldering tip is currently connected to the device.

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
- **Button locking mode:** Configures whether buttons can be locked to prevent accidental presses, with options for disabled, full locking, or boost only.
- **Display orientation mode:** Sets the display orientation with options for left-handed, right-handed, or automatic adjustment.
- **Startup behavior:** Defines the mode the device enters on power-up: disabled, sleeping mode, idle mode (heat-off until moved), or soldering mode.

### User interface settings

- **Scrolling speed:** Adjusts the speed of the description text scrolling in the menu, with options for slow or fast.
- **Temperature display unit:** Sets the unit for displaying temperature as Celsius (C°) or Fahrenheit (F°).
- **Animation speed:** Adjusts the pace of icon animations in the menu, with options for off, slow, medium, or fast.
- **Boot logo duration:** Sets the duration for the boot logo, with options for off, 1–5 seconds, or loop.
- **Animation loop:** Controls whether menu animations should loop continuously. This setting is applicable only when animation speed is enabled.
- **Detailed idle screen:** Enables a more detailed view on the idle screen, showing text with additional information compared to the default icon-based view.
- **Detailed solder screen:** Enables a more detailed view on the soldering screen in a text-based format, reducing the use of graphical visuals.
- **Invert screen:** Inverts the OLED screen colors.
- **Swap +/- buttons:** Reverses the button assignment for incrementing and decrementing temperature on adjustment screens.
- **Cool down screen flashing:** Enables the idle screen to blink the tip temperature when it exceeds 50°C, serving as a tip is still hot warning.

### Power management

- **Keep-awake pulse duration:** Specifies the duration of the power pulse to keep connected power banks awake. Shorter durations minimize power waste and unnecessary heating.
- **Keep-awake pulse delay:** Adjusts the interval between power pulses. Longer delays reduce unwanted heating, but must be short enough to prevent the power bank from shutting off.
- **Keep-awake pulse intensity:** Enables and sets the wattage of the power pulse. The power pulse briefly activates the heater to draw sufficient power, preventing connected power banks from entering sleep mode.
- **Power source:** Sets the power source type, with options for an external power supply or 3S to 6S battery configurations.
- **Min. voltage per cell:** Sets the minimum voltage per battery cell before shutdown. This value is multiplied by the cell count (for example, 3S: 3–3.7V, 4–6S: 2.4–3.7V).
- **Power Delivery timeout:** Defines how long the firmware will attempt to negotiate USB-PD before switching to Quick Charge. Lower values are recommended for faster PD negotiation.
- **Power limit:** Sets a custom wattage cap for the device to maintain the **average** power below this value. Note: Peak power cannot be controlled. When using USB-PD, the limit will be the lower of this setting and the power supply's advertised wattage.
- **Quick Charge voltage:** Adjusts the maximum voltage for Quick Charge negotiation. Does not affect USB-PD. Ensure the setting aligns with the current rating of your power supply for safety.
- **Power Delivery 3.1 EPR (Extended Power Range):** Enables EPR mode, allowing input voltages up to 28V with a [compatible USB-C power supply](https://wiki.pine64.org/wiki/Pinecil_Power_Supplies#EPR_PD3.1,_140W_Chargers)

### Advanced settings

These settings are intended for technically experienced users and require careful consideration before changes.

- **Voltage divider:** Fine-tunes the measured voltage to account for variations in the voltage sense resistors between units.
- **Calibration offset:** Adjusts the calibration of the thermocouple measurements, which determine the temperature displayed for the tip.
- **Calibrate CJC (Cold Junction Compensation):** Initiates thermocouple calibration at the next boot to improve temperature accuracy. Only needed if temperature readings are consistently inaccurate. Ensure the device is at room temperature before calibrating. For more details, see the [documentation](https://ralim.github.io/IronOS/Settings/#setting-calibrate-cjc-at-next-boot).

### Save & restore

- **Save settings:** Saves the current configuration to apply it permanently. Use this after making changes to ensure they persist across device reboots.
- **Restore default settings:** Resets all configuration options to their factory defaults. Note: This action cannot be undone, and all custom settings will be lost. To preserve custom settings, create a {% term scene %} before restoring defaults.

## Automations

Get started with this automation example for IronOS with a ready-to-use blueprint!

### Soldering fume extractor automation

Automatically activate the fume extractor when soldering begins and deactivate it when the soldering iron is idle.

{% my blueprint_import badge blueprint_url="https://community.home-assistant.io/t/ironos-soldering-fume-extractor-automation-pinecil-v2/802156" %}

{% details "Example YAML configuration" %}

{% raw %}

```yaml
triggers:
  - trigger: state
    entity_id: sensor.pinecil_operating_mode
    to: soldering
    id: start soldering
    from:
  - trigger: state
    entity_id: sensor.pinecil_operating_mode
    from: soldering
    to: idle
    id: stop soldering
actions:
  - if:
      - condition: trigger
        id:
          - start soldering
    then:
      - action: switch.turn_on
        target:
          entity_id: switch.fume_extractor
  - if:
      - condition: trigger
        id:
          - stop soldering
    then:
      - action: switch.turn_off
        target:
          entity_id: switch.fume_extractor
```

{% endraw %}

{% enddetails %}

## Data updates

This integration maintains an active Bluetooth connection while the device is powered on, refreshing the data every 5 seconds.

### Known Limitations

- IronOS does not support turning on, waking from sleep, or waking from idle mode via Bluetooth. These actions are restricted to ensure safety and prevent unintended operation of the device.
- Updating the device from Home Assistant is not possible, as IronOS does not support over-the-air (OTA) updates.

### Troubleshooting

- **Error: `Characteristic f6d70xxx-5a10-4eba-aa55-33e27f9bc533 was not found!`**:
  
  When using an ESPHome BLE Proxy, this error may occur because the maximum number of GATT characteristics cached is too small. IronOS exposes more than 60 characteristics on the Pinecil V2, which exceeds the default limit. To fix this, recompile the firmware of your ESPHome Bluetooth proxy with the following settings:  

  ```yaml
  esp32:
    board: ${board}
    framework:
      type: esp-idf
      sdkconfig_options:
        CONFIG_BT_GATTC_MAX_CACHE_CHAR: "100"
  ```

In any case, when reporting an issue, please enable [debug logging](/docs/configuration/troubleshooting/#debug-logs-and-diagnostics), restart the integration, and as soon as the issue reoccurs, stop the debug logging again (_download of debug log file will start automatically_). Further, if still possible, please also download the [diagnostics](/integrations/diagnostics) data. If you have collected the debug log and the diagnostics data, provide them with the issue report.

## Removing the integration

This integration can be removed by following these steps:

{% include integrations/remove_device_service.md %}
4. Home Assistant will automatically rediscover the device. If you prefer not to see it, select Ignore.
