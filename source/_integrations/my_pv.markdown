---
description: Instructions on how to integrate my-PV devices into Home Assistant.
ha_release: '2026.10'
ha_domain: my_pv
---

The **my-PV** {% term integration %} lets you control and monitor devices made by [my-PV](https://www.my-pv.com/) from Home Assistant. my-PV builds power electronics that turn surplus solar electricity into heat, for example by driving a heating element in a hot water tank.

The integration communicates directly with the device over your local network. No cloud account is required.

## Use cases

- Monitor tank temperatures, heating power, and PV power on your dashboard or in the energy-related cards.
- Change the hot water target temperature from Home Assistant, for example to store more heat on sunny days.
- Turn hot water heating on or off, or enable or disable boost mode, from an {% term automation %}, for example when you go on holiday.

## Supported devices

The following devices are supported by this integration:

- AC ELWA 2
- AC•THOR range
- HEA•THOR IoT
- SOL•THOR

## Unsupported devices

The following devices are not supported by this integration:

- AC ELWA-E
- ELWA immersion heater
- WiFi Meter

If you try to add an unsupported device, setup stops with the message that the device is not supported.

## Prerequisites

- The my-PV device must be connected to the same network as Home Assistant, and you need to know its IP address or hostname if it is not discovered automatically.
- Depending on the firmware version, your device may require a password. If you have not set a custom password, use the **device key** instead. You can find the device key in the {% icon "mdi:information-outline" %} **Info** menu of your my-PV device. For the HEA•THOR IoT, the device key is printed on the device label.

You can change the password through the web interface of your my-PV device.

{% include integrations/config_flow.md %}

Home Assistant can discover my-PV devices on your network automatically using DHCP and zeroconf. A discovered device shows up under **Settings** > **Devices & services**, where you can select **Add** to set it up. If your device is not discovered, you can add it manually.

{% configuration_basic %}
Host:
  description: "The IP address or hostname of your my-PV device. You can find it in your router or in the device's web interface."
Password:
  description: "The password or device key of your my-PV device. You are only asked for this if your device requires authentication."
{% endconfiguration_basic %}

## Supported functionality

The integration adds one device per my-PV unit. The device information includes the model, serial number, firmware and hardware version, and a link to the device's web interface.

Which entities are created depends on your device model, its firmware, and how it is configured. The integration only creates entities for values your device reports.

### Water heater

When the device is configured for hot water heating and has a temperature sensor connected, a [water heater](/integrations/water_heater/) entity is created. It provides:

- **Current temperature**: The temperature measured by the temperature sensor.
- **Target temperature**: The hot water target temperature.
- **Operation mode**: `Off` or `Electric`. You can also use the turn on and turn off actions.

### Climate

When the device is configured for space heating and has a temperature sensor connected, a [climate](/integrations/climate/) entity is created. It provides:

- **Current temperature**: The temperature measured by the temperature sensor.
- **Target temperature**: The space target temperature.
- **Operation mode**: `Off` or `Heat`. You can also use the turn on and turn off actions.

### Switches

- **Hot water heating**: When the device is configured for hot water heating but has no temperature sensor connected, a switch named after the device is created instead of the water heater entity. Use it to turn heating on or off.
- **Boost mode**: Enables or disables boost mode on devices that offer it as a simple on/off setting. This does not start or stop boost heating itself; it sets whether the device is allowed to boost.

### Selects

- **Boost mode**: On devices that can boost through different outputs, selects the boost target: `Off` (boost mode disabled), `On` (the main load, usually the heating element), `Relay`, `SELV relay`, or `AUX relay`. The available options depend on your device. Like the switch, this configures boost mode and does not start or stop boost heating itself.

### Numbers

- **Boost target temperature**: The temperature the hot water is heated to during boost.
- **Minimum hysteresis**: How far the temperature has to drop below the target temperature before heating starts again. Disabled by default.
- **Maximum hysteresis**: How far the temperature has to rise above the target temperature before heating stops. Disabled by default.

### Sensors

- **Device status**: What the device is doing: `Standby`, `Heat`, `Boost`, `Heating finished`, `No connection / Disabled`, `Failure`, or `Block active`.
- **Power**: The power the device is currently using for heating.
- **Temperature 1** to **Temperature 4**: The temperatures measured by the connected sensors. If only one sensor is available, the entity is called **Temperature**.
- **Current phase L1** to **Current phase L3**: The current per phase. On single-phase devices, the entity is called **Current**.
- **Voltage phase L1** to **Voltage phase L3**: The voltage per phase. On single-phase devices, the entity is called **Voltage**.
- **PV power** and **PV voltage**: The power and voltage of the solar panels connected directly to the device, for devices that support this.

The following diagnostic sensors are disabled by default:

- **Device temperature**: The internal temperature of the device's power stage.
- **Mains frequency**
- **Network mode**: `LAN`, `WLAN`, or `AP`.
- **Uptime**
- **Wi-Fi signal strength**

### Buttons

- **Restart**: Restarts the my-PV device.

### Updates

- **Firmware**: Shows the firmware version installed on the device and the latest version available for it. When a newer version is available, you can install it from Home Assistant. While the update is being installed, the entity shows its progress. The device checks for new firmware about once a day. This entity is only created when the device reports both its installed and its latest firmware version.

## Examples

Here are a few ideas to get you started. Replace the entity IDs with those of your own devices.

{% include docs/paste_yaml_tip.md %}

### Automation: Raise the hot water temperature on sunny afternoons

On sunny days, there is often more solar power than you need. By raising the target temperature around noon, your hot water tank stores more of that energy as heat. This example uses a weather entity, so you need a weather integration set up in Home Assistant.

- **Trigger**: Time: at 12:00
- **Condition**: Entity state: your weather entity is `Sunny`
- **Action**: Water heater: Set target temperature
  - **Target**: your my-PV water heater
  - **Temperature**: 65

The temperature is in the unit your Home Assistant uses. This example assumes Celsius. If your Home Assistant uses Fahrenheit, use 149 instead. Make sure the value is within your device's temperature range.

The target temperature stays at the new value until you change it. To go back to your usual temperature, create a second automation that sets it back, for example at 18:00.

{% details "YAML example for raising the hot water temperature on sunny afternoons" %}

{% example %}
automation: |
  alias: "Raise hot water temperature on sunny afternoons"
  triggers:
    - trigger: time
      at: "12:00:00"
  conditions:
    - condition: state
      entity_id: weather.home
      state: "sunny"
  actions:
    - action: water_heater.set_temperature
      target:
        entity_id: water_heater.my_pv_ac_thor_9s
      data:
        temperature: 65
{% endexample %}

{% enddetails %}

### Automation: Turn hot water heating off while you are away

When you go on holiday, there is no need to keep your hot water tank warm. This example uses a toggle {% term helper %} to tell Home Assistant you are away. To create one, go to **Settings** > **Devices & services** > **Helpers**, select **Create helper** > **Toggle**, and name it, for example, `Vacation mode`. Turn the toggle on when you leave.

- **Trigger**: Entity state: `Vacation mode` changes to `On`
- **Action**: Water heater: Turn off
  - **Target**: your my-PV water heater

To turn heating back on when you return, create a second automation that triggers when `Vacation mode` changes to `Off` and uses the **Water heater: Turn on** action on your my-PV water heater.

{% details "YAML example for turning off hot water heating while you are away" %}

{% example %}
automation: |
  alias: "Turn off hot water heating when away"
  triggers:
    - trigger: state
      entity_id: input_boolean.vacation_mode
      to: "on"
  actions:
    - action: water_heater.turn_off
      target:
        entity_id: water_heater.my_pv_ac_thor_9s
{% endexample %}

{% enddetails %}

## Data updates

The **my-PV** integration {% term polling polls %} the device every 5 seconds. If the device reports that it is receiving too many requests, the integration keeps the last known values and slows down polling to every 10 seconds.

## Known limitations

- The water heater entity only supports hot water heating. Other operating modes of my-PV devices, such as room heating, are not available as a water heater.
- Entities are created when the integration is set up. If you change the configuration of the device, for example by connecting an extra temperature sensor, reload the integration to update the entities.
- The IP address or hostname cannot be changed through the UI. If the device is discovered on a new IP address, Home Assistant updates it automatically. Otherwise, remove the integration and add it again.

## Troubleshooting

### The device cannot be found or connected to

- Check that the device is powered on and connected to your network, and that you can open its web interface from a browser.
- Make sure Home Assistant and the device are on the same network. Discovery does not work across VLANs or subnets unless your network forwards mDNS.
- Give the device a fixed IP address in your router, so its address does not change.

### Authentication fails

- Check that you entered the custom password you set on the device. If no custom password is set, use the device key from the {% icon "mdi:information-outline" %} **Info** menu or, for the HEA•THOR IoT, from the device label.
- If you change the password on the device after setup, Home Assistant notifies you that reauthentication is required. Follow the notification under **Settings** > **Devices & services** and enter the new password. All entities and settings are kept.

### "Too many requests" when changing a setting

The device limits how often it accepts requests. Wait a few seconds and try again.

### An entity is missing

Entities are only created for values your device reports. Check the configuration in the web interface of your my-PV device, then reload the integration. Some diagnostic entities are disabled by default and need to be enabled first.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
