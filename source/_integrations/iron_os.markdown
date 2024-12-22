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

## Removing the integration

This integration can be removed by following these steps:

{% include integrations/remove_device_service.md %}
4. Home Assistant will automatically rediscover the device. If you prefer not to see it, select Ignore.
