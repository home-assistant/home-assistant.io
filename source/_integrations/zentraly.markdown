---
title: Zentraly
description: Instructions on how to integrate Zentraly devices with Home Assistant.
ha_category:
  - Binary sensor
  - Button
  - Climate
  - Energy
  - Number
  - Select
  - Sensor
  - Switch
ha_release: "2026.10"
ha_iot_class: Local Push
ha_config_flow: true
ha_zeroconf: true
ha_codeowners:
  - '@zentralySAU'
ha_domain: zentraly
ha_integration_type: hub
ha_platforms:
  - binary_sensor
  - button
  - climate
  - number
  - select
  - sensor
  - switch
ha_quality_scale: bronze
---

The **Zentraly** {% term integration %} lets you control supported thermostats, a radiator, smart plugs, switches, boiler devices, and gateways from [Zentraly](https://zentraly.com), a manufacturer of smart home devices for heating, lighting, and electrical control.

The integration communicates directly with Zentraly devices over the local network using a WebSocket connection and does not require a cloud service.

Devices with a direct network connection are automatically discovered using Zeroconf. Supported child devices communicate through a configured Zentraly parent.

## Prerequisites

Before setting up the integration:

1. Make sure the Zentraly device is powered on.
2. Make sure the Zentraly device is installed and registered in the Zentraly app, available from the Google Play Store and Apple App Store.
3. Make sure the Zentraly device is connected to the same local network as Home Assistant.
4. Enable third-party connections for the device from the advanced device settings in the Zentraly app.
5. Make sure the Zentraly device is reachable from the Home Assistant host.
6. Get the device password from the **About device** section in the Zentraly app. You need this password during setup.

{% include integrations/config_flow.md %}

{% note %}
Devices with a direct network connection must be discovered before setup; entering an IP address is not supported. The manual configuration path opens a selector for adding a child to an existing parent. It does not set up an undiscovered network device.
{% endnote %}

Under **Discovered**, find the Zentraly device with your device ID and select **Configure**. Enter the device password from the **About device** section in the Zentraly app and submit the form. Home Assistant verifies the connection and password before adding the device.

{% configuration_basic %}
Password:
  description: "The device password shown in the Zentraly app. This is not your Zentraly account password."
{% endconfiguration_basic %}

### Adding a child device

Configure the parent first. ZTTIN supports one ZTBIN child. ZTHZB, ZTHG2, and ZTAAK support ZTTWZ, ZTTZB, ZTBZB, ZTAAI, ZTBZH, ZTEIE, and ZTMWZ, without a child-count limit imposed by the integration. The child must be reachable through the selected parent.

1. Go to {% my integrations title="**Settings** > **Devices & services**" %} and add **Zentraly**. If prompted, choose **Configure another instance of Zentraly**.
2. In **Add Zentraly child device**, select the parent.
3. Enter the child device ID and MAC address.
4. Submit the form. Home Assistant validates the child through the parent and adds it to the existing integration entry.
5. Optionally edit the device name and area, then select **Finish**. Closing this optional form keeps the added child and discards unsaved name and area changes.

Alternatively, use **Add device** on the configured parent entry when that option is available. Both paths use the same validation. Adding a child does not create a separate network connection or require a separate password.

Only loaded parents with a supported child model and available capacity can accept a child. If no parents are configured, configure a supported parent first. If parents exist but none are available, check their connection and available capacity. Child-only models are not discovered directly through Zeroconf.

The child MAC address can contain 12 or 16 hexadecimal digits. Use the address shown for that child, including all digits. The optional area selector lists existing areas; create a new area in **Settings** > **Areas, labels & zones** before assigning it to a child.

{% configuration_basic %}
Parent device:
  description: "The configured Zentraly device through which the child communicates."
Device ID:
  description: "The device ID of the child, including its model prefix."
MAC address:
  description: "The MAC address of the child, not the parent."
{% endconfiguration_basic %}

### Updating the password

If authentication fails after the device password changes, Home Assistant requests reauthentication. Enter the current device password from the Zentraly app. The integration retains the configured device and child devices and reconnects using the updated password.

## Supported devices

| Model | Device | Setup | Channels |
| --- | --- | --- | --- |
| ZTTIN | Wireless Wi-Fi thermostat | Zeroconf; supports one ZTBIN child | 1 |
| ZTBIN | Wireless boiler device | Child of ZTTIN | 1 |
| ZTTWZ | Zentraly Home Wi-Fi thermostat | Zeroconf or child of a gateway | 1 |
| ZTMWZ | Zentraly Home mini Wi-Fi thermostat | Zeroconf or child of a gateway | 1 |
| ZTTZB | Zentraly Home thermostat | Child of a gateway | 1 |
| ZTAAI | Zentraly Home mini thermostat | Child of a gateway | 1 |
| ZTREA | Electric radiator | Zeroconf | 1 |
| ZTEIM | Zentraly mini smart plug | Zeroconf | 1 |
| ZTEIE | Zentraly Home Kinetic Wi-Fi smart plug | Zeroconf or child of a gateway | 1 |
| ZTIKS | Kinetic Wi-Fi switch | Zeroconf | 1 |
| ZTIKD | Dual Kinetic Wi-Fi switch | Zeroconf | 2 |
| ZTBZB | Zentraly Home boiler module | Child of a gateway | 1 |
| ZTBZH | Zentraly Home mini boiler module | Child of a gateway | 1 |
| ZTHZB | Zentraly Home gateway | Zeroconf; supports seven child models | — |
| ZTHG2 | Zentraly Home Plus gateway | Zeroconf; supports seven child models | — |
| ZTAAK | Zentraly Home Light gateway | Zeroconf; supports seven child models | — |

In this table, a gateway is ZTHZB, ZTHG2, or ZTAAK. Other parent-child combinations are not supported. Each ZTIKD channel has independent controls. Gateways provide configuration controls and a reset button; they do not require a primary control entity.

Each device uses its device ID as its default name. Device information includes its commercial model name, model code, MAC address, and firmware and hardware versions when available.

## Supported functionality

Entities depend on the device model. Configuration controls are grouped as configuration entities; diagnostic readings are identified as diagnostic entities where applicable.

### Thermostats and radiator

ZTTIN, ZTTWZ, ZTMWZ, ZTTZB, ZTAAI, and ZTREA provide a climate entity with current and target temperature, heating demand, off/manual/automatic modes, and the Away preset. The target range is 5–30 °C in 0.5 °C steps. All supported thermostats also report current humidity. ZTREA does not provide a humidity reading.

Changing the target temperature puts the device into manual mode. If a `climate.set_temperature` action also specifies `hvac_mode`, that mode is applied after the temperature. Automatic mode uses the device's own schedule; Home Assistant does not edit that schedule.

For the thermostats, Away displays the target temperature reported by the thermostat. Their separate **Away temperature** configuration control sets the value used by the device. Changing that control does not itself activate Away.

ZTREA instead provides a separate Away temperature reading to the climate entity, which displays it while Away is active. It does not expose the thermostat configuration controls listed below.

All climate models provide **Child lock** and **Reset device**. ZTTIN, ZTTWZ, ZTMWZ, and ZTREA provide **Always-on display**. ZTTWZ, ZTMWZ, and ZTREA expose Wi-Fi signal power when connected directly. ZTTZB and ZTAAI provide a separate battery sensor with a percentage from 0 to 100; battery is not an attribute of the climate entity.

### Thermostat configuration

ZTTIN, ZTTWZ, and ZTMWZ provide the following configuration controls. ZTTZB and ZTAAI provide **Away temperature** and **Temperature correction**, but do not provide display brightness or display selection.

| Control | Values | Behavior |
| --- | --- | --- |
| Away temperature | 5–30 °C, step 1 °C | Configures the device's Away setpoint |
| Temperature correction | −6–6 °C, step 0.1 °C | Correction applied by the device |
| Display brightness | 0–100%, step 1% | Available while Always-on display is enabled |
| Display selection | Temperature or Time | Available while Always-on display is enabled |

Home Assistant reads existing settings from the device instead of supplying preset defaults. Temperature correction is a separate number entity; the climate entity does not apply an additional correction. Disabling Always-on display makes the brightness and display selection controls unavailable.

### Boiler and OpenTherm features

ZTBIN, ZTTWZ, ZTBZB, and ZTBZH expose the output type: **On/Off** or **OpenTherm**. OpenTherm features are available when the device reports an OpenTherm connection and the corresponding readings are available.

| Entity type | OpenTherm features |
| --- | --- |
| Sensors | Error ID, central heating setpoint, modulation level, central heating water pressure, domestic hot water flow rate, feed temperature, domestic hot water temperature, and domestic hot water setpoint |
| Binary sensors | Heating water active, domestic hot water enabled, and winter mode |
| Switch | Comfort mode |
| Button | Reset boiler |

These setpoint sensors are readings, not controls for changing boiler setpoints. ZTBIN, ZTBZB, and ZTBZH also provide a **Boiler** binary sensor, **Forced mode**, and **Reset device**. ZTBIN additionally provides an RSSI signal sensor.

ZTBZB and ZTBZH provide **Boiler ignition delay** and **Boiler shutdown delay**, each from 0 to 10 minutes in one-minute steps. Zero is a normal setting. These configuration parameters apply to both On/Off and OpenTherm outputs. Home Assistant writes the selected value; the device controls the timing.

The gateways and the battery-powered thermostats do not expose OpenTherm entities.

### Smart plugs

ZTEIM and ZTEIE provide:

- **Power** switch and **Operation mode** selection.
- Voltage, current, power, daily energy, and Wi-Fi signal sensors.
- **Always-on LED** and **Return to schedule** settings.
- High-voltage, low-voltage, and high-power protection switches with separate limit controls.
- **Timer** and **Reset device**.

| Setting | Range | Step |
| --- | --- | --- |
| High voltage limit | 245–265 V | 5 V |
| Low voltage limit | 150–190 V | 5 V |
| High power limit | 200–2200 W | 50 W |
| Timer | 1–1440 minutes | 1 minute |

ZTEIE additionally provides **Disconnect on error** as a configuration switch. Editing it changes that parameter on the device without adding recovery logic in Home Assistant.

Wi-Fi signal is omitted when ZTEIE is configured as a child. Electrical power measurements remain available.

The protection settings are handled by the device. Configuring them does not create an independent protection automation in Home Assistant.

The operation mode selector allows **Manual** and **Auto**. **Timer** can appear as a reported mode and is activated by programming the timer rather than selecting it directly. Timer changes are sent after a three-second delay so successive edits can be combined. This operational timer can display a remaining duration.

### ZTIKS and ZTIKD switches

ZTIKS has one channel and ZTIKD has two independently controlled channels. Each channel provides:

- **Power**.
- **Operation mode**, with **Manual** and **Auto** options.
- **Return to schedule**.
- **Automatic shut-off** enable switch.
- **Automatic shut-off duration**, from 1 to 30 minutes in one-minute steps.

Turning a channel on or off selects manual mode for that channel. Automatic shut-off duration is a stored setting used by the device each time the channel turns on. It is not a remaining-time countdown and does not change the operation mode when edited.

Both models provide one shared Wi-Fi signal sensor and a device reset button. Home Assistant does not simulate their shut-off timers or initiate recovery actions after power loss.

### Gateways

ZTHZB, ZTHG2, and ZTAAK provide **Always-on LED** and **Reset device**. The LED control is a configuration entity. A gateway can therefore have only configuration entities and a reset button while still serving as the connection for its children.

## Zentraly automation examples

You can use the Zentraly climate entity in Home Assistant automations. For example, you can automatically change the target temperature at a specific time.

{% include docs/paste_yaml_tip.md %}

### Automation: Set the target temperature at night

This example sets the target temperature of a Zentraly thermostat to 18 °C every day at 22:00. In the automation editor, use a time trigger and the **Set thermostat target temperature** action, selecting your thermostat as the target. Setting the target temperature selects manual mode.

For the YAML example, replace `climate.example` with your thermostat entity ID.

{% details "YAML example for setting the target temperature" %}

{% example %}
automation: |
  alias: "Set Zentraly temperature at night"
  triggers:
    - trigger: time
      at: "22:00:00"
  actions:
    - action: climate.set_temperature
      target:
        entity_id: climate.example
      data:
        temperature: 18
{% endexample %}

{% enddetails %}

## Data updates

Zentraly receives state reports over a local WebSocket connection. Reports update the fields they contain without clearing unrelated fields.

For eleven models, the integration also reads entity state every five minutes as a synchronization fallback. Periodic state and firmware/hardware version reads are disabled for ZTTZB, ZTAAI, ZTHZB, ZTHG2, and ZTAAK. Initial reads, reads after reconnection, explicit reads, reads following actions, writes, reports, and the gateway connection keepalive remain available. Each child uses its own model's policy, independently of its parent. ZTBIN RSSI is updated only through reports.

A parent and its children share a connection. Updates are routed to the corresponding device and endpoint, including each ZTIKD channel. If the parent connection is lost, its devices become unavailable while the integration reconnects. A child that stops responding can become unavailable without affecting a responding sibling or parent.

Firmware and hardware versions are refreshed every 24 hours for models with periodic polling enabled. A failed version reading preserves the last known value. Discovery of a changed IP address or port reloads the configured connection.

For models that support both direct and child connections, the Wi-Fi signal entity is created only for a direct connection. When the device is configured as a child, the integration removes any existing Wi-Fi signal entity for that child and does not send Wi-Fi signal reads. Electrical power and other supported radio measurements remain available.

## Troubleshooting

- **Network device not discovered:** Check that third-party connections are enabled, the device is reachable, and Home Assistant and the device are on the same local network.
- **No parent listed:** Configure a ZTTIN or supported gateway first, check that its entry is loaded, and confirm that it supports the child. ZTTIN has a one-child limit; the three gateways have no child-count limit imposed by the integration.
- **Child cannot be added:** Check the child device ID and full MAC address and that it responds through the selected parent. Duplicate devices and unsupported parent-child combinations are rejected.
- **Invalid password:** Use the password from the device's **About device** section, not your Zentraly account password.
- **Display controls unavailable:** Enable **Always-on display** on ZTTIN, ZTTWZ, or ZTMWZ.
- **OpenTherm entities unavailable:** Check the device's reported output type and OpenTherm connection.
- **Connection busy:** Wait and retry the action. This message does not by itself mean the device is offline.

## Removing the integration

To remove a child independently, remove its device subentry from the parent integration entry. Removing the parent integration entry also removes its configured child subentries from Home Assistant. These operations do not reset or unpair the physical devices.

{% include integrations/remove_device_service.md %}
