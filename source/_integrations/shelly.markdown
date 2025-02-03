---
title: Shelly
description: Integrate Shelly devices
ha_category:
  - Binary sensor
  - Climate
  - Cover
  - Energy
  - Event
  - Light
  - Number
  - Select
  - Sensor
  - Switch
  - Text
  - Update
  - Valve
ha_release: 0.115
ha_codeowners:
  - '@balloob'
  - '@bieniu'
  - '@thecode'
  - '@chemelli74'
  - '@bdraco'
ha_iot_class: Local Push
ha_domain: shelly
featured: true
ha_config_flow: true
ha_zeroconf: true
ha_platforms:
  - binary_sensor
  - button
  - climate
  - cover
  - diagnostics
  - event
  - light
  - number
  - select
  - sensor
  - switch
  - text
  - update
  - valve
ha_integration_type: device
---

Integrate [Shelly devices](https://shelly.com) into Home Assistant.

{% include integrations/config_flow.md %}

## Shelly device generations

There are four generations of devices and all generations are supported by this integration. There are some differences in how devices should be configured and in the naming of entities and devices between generations.

Shelly BLU series devices (e.g. Shelly BLU H&T) are not supported; please use BTHome integration to configure such devices with Home Assistant. The exception to this is Shelly BLU TRV, which is supported by this integration via Shelly BLU Gateway Gen3.

## Shelly device configuration (generation 1)

Generation 1 devices use the `CoIoT` protocol to communicate with the integration. `CoIoT` must be enabled in the device settings. Navigate to the local IP address of your Shelly device, **Internet & Security** > **ADVANCED - DEVELOPER SETTINGS** and check the box **Enable CoIoT**.

We recommend using `unicast` for communication. To enable this, enter the local IP address of the Home Assistant server and port `5683` into the **CoIoT peer** field and push **SAVE** button. **This is mandatory for battery operated devices** (even if USB connected). After changing the **CoIoT peer**, the Shelly device needs to be manually restarted.

Home Assistant will display a repair issue for the Shelly device if push updates from this device do not reach the Home Assistant server.

The list below will help you diagnose and fix the problem:

- Check if your Shelly devices have a properly configured `CoIoT peer`.
- If you can't find the `CoIoT peer` settings in the device's web panel, it's probably using an ancient firmware version, and you should update it to the current one.
- If Shelly devices are in a different subnet than the Home Assistant server, you should ensure communication on `UDP` port `5683` between these subnets.
- If Home Assistant is running as a virtual machine or service on an operating system other than Home Assistant OS, you should open `UDP` port `5683` on the device's firewall and/or ensure that communication from this port is redirected to the Home Assistant service.
- The missing push updates may be related to the WiFi network range. If using a WiFi network with several access points, enable **Internet & Security** >> **WiFi Client AP Roaming** option. Consider moving Shelly device closer to the WiFi access point. Consider adding another WiFi access point, which will improve the connection quality with the device.
- If you think your Shelly devices are working correctly and don't want to change your network/configuration, you can ignore the repair issue. Still, you must know you are giving up the best experience of using first-generation Shelly devices with Home Assistant.

## Shelly device configuration (generation 2+)

Generation 2+ devices use the `RPC` protocol to communicate with the integration. **Battery-operated devices** (even if USB connected) may need manual outbound WebSocket configuration if Home Assistant cannot correctly determine your instance's internal URL or the outbound WebSocket was previously configured for a different Home Assistant instance. In this case, navigate to the local IP address of your Shelly device, **Settings** >> **Connectivity** >> **Outbound WebSocket** and check the box **Enable Outbound WebSocket**, under server enter the following address:

`ws://` + `Home_Assistant_local_ip_address:Port` + `/api/shelly/ws` (for example: `ws://192.168.1.100:8123/api/shelly/ws`), click **Apply** to save the settings.
In case your installation is set up to use SSL encryption (HTTP**S** with certificate), an additional `s` needs to be added to the WebSocket protocol, too, so that it reads `wss://` (for example: `wss://192.168.1.100:8123/api/shelly/ws`).

{% note %}
Integration is communicating directly with the device; cloud connection is not needed.
{% endnote %}

## Bluetooth Support

Shelly generation 2+ devices not battery-powered can act as a Bluetooth proxy for advertisements. Active or passive listening can be enabled in the options flow.

{% include integrations/option_flow.md %}

## Range Extender Support

Shelly generation 2+ devices that are not battery-powered can act as a Range Extender.
Devices of the same generations can be configured via those Range Extenders specifying a custom TCP port during the configuration flow.
Currently, only static IP or DHCP reserved IP are supported for the main device.

## Entity naming (generation 1)

The integration uses `Device Name` to name its entities if the device has only one relay or no relays at all.

The integration uses the following strategy to name its entities if the device has more than one relay:

- If `Device Name` or `Channel Name` is set in the device, the integration will use them to generate the entities' name.
- If channel names are set, they will be used in the entity names. The device name will not be used.
- If only the device name is set, and the device has multiple channels, the channel number will be appended to the entity name (e.g., Channel 2).
- In case device name and channel names are not set, the entity name will be generated by the `Device Type`, `Device ID` and `Channel Number`.

Examples:

| Device Name | Channel Name   | Entity Name                     |
| ----------- | -------------- | ------------------------------- |
| `Not set`   | `Not Set`      | shellyswitch25-ABC123 Channel 1 |
| `Not set`   | Kids Room Bulb | Kids Room Bulb                  |
| Kitchen     | `Not Set`      | Kitchen Channel 1               |
| Bedroom     | Round Bulb     | Round Bulb                      |

Names are set from the device web page:

- Device name can be set in **Settings** >> **DEVICE NAME**
- Channel name for single-channel devices can be set in **Settings** >> **CHANNEL NAME**
- Channel name for multi-channel devices can be set in **Settings** >> **CHANNEL NAME** after selecting the channel, by clicking on the channel name.

## Entity naming (generation 2+)

The integration uses the following strategy to name its entities:

- If `Channel Name` is set in the device, the integration will use it to generate the entities' name, e.g. `Kitchen Light`
- If `Channel Name` is set to the default value, the integration will use the `Device ID` and default channel name to generate the entities' name, e.g. `ShellyPro4PM-9808D1D8B912 Switch 0`.

## Cover entities

Shelly 2PM Gen3 supports `tilt` for `cover` entities. To enable this feature, you need to configure the device:

- Change the device profile to `Cover` (**Settings** > **Device profile**)
- Calibrate the cover (**Home** > **Cover** > **Calibration** > **Start**)
- Enable and configure **Slat control** (**Home** > **Cover** > **Slat control**)

## Binary input sensors

### Binary input sensors (generation 1)

Depending on how a device's button type is configured, the integration will create binary sensors corresponding to those inputs. binary sensors are not created when the button type is `momentary` or `momentary_on_release`, for these types you need to use events for your automations.

### Binary input sensors (generation 2+)

For generation 2+ hardware, it's possible to select if a device's input is connected to a button or a switch. Binary sensors are created only if the input mode is set to `switch`. When the input is of type `button` you need to use events for your automations.

## Event entities (generation 1)

If the **BUTTON TYPE** of the switch connected to the device is set to `momentary` or `detached switch`, the integration creates an event entity for this switch. You can use this entity in your automations.

## Event entities (generation 2+)

If the **Input Mode** of the switch connected to the device is set to `Button`, the integration creates an event entity for this switch. You can use this entity in your automations.

## Events

If the **BUTTON TYPE** of the switch connected to the device is set to `momentary` or `detached switch`, integration fires events under the type `shelly.click` when the switch is used. You can use these events in your automations.

Also, some devices do not add an entity for the button/switch. For example, the Shelly Button1 has only one entity for the battery level. It does not have an entity for the button itself. To trigger automations based on button presses, use the `shelly.click` event.

### Listening for events

You can subscribe to the `shelly.click` event type in [Developer Tools/Events](/docs/tools/dev-tools/) in order to examine the event data JSON for the correct parameters to use in your automations. For example, `shelly.click` returns event data JSON similar to the following when you press the Shelly Button1.

```json
Event 0 fired 9:53 AM:
{
    "event_type": "shelly.click",
    "data": {
        "device_id": "e09c64a22553484d804353ef97f6fcd6",
        "device": "shellybutton1-A4C12A45174",
        "channel": 1,
        "click_type": "single",
        "generation": 1
    },
    "origin": "LOCAL",
    "time_fired": "2021-04-28T08:53:12.755729+00:00",
    "context": {
        "id": "e0f379706563aaa0c2c1fda5174b5a0e",
        "parent_id": null,
        "user_id": null
    }
}
```

The `generation` value indicates the generation of the device that is the source of the event.

### Automations

The simplest way to create automations is to use the Home Assistant automation editor. For example, to set an automation triggered by a double press of a particular Shelly Button1:

1. In the Triggers section of the automation, set Trigger Type to `Device`.
2. In the Device dropdown menu. find the Shelly Button1.
3. In the Trigger dropdown menu, select `Button double clicked`.
4. Set any conditions and actions to complete your automation.

You can also create automations using YAML, for example:

```yaml
- alias: "Toggle living room light"
  triggers:
    - trigger: event
      event_type: shelly.click
      event_data:
        device: shellyswitch25-AABBCC
        channel: 1
        click_type: single
  actions:
    - action: light.toggle
      target:
        entity_id: light.living_room

- alias: "Toggle living room lamp"
  triggers:
    - trigger: event
      event_type: shelly.click
      event_data:
        device: shellyswitch25-AABBCC
        channel: 2
        click_type: long
  actions:
    - action: light.toggle
      target:
        entity_id: light.lamp_living_room
```

### Possible values for `click_type`

| Shelly input event | Click Type    |
| ------------------ | ------------- |
| `S`                | `single`      |
| `SS`               | `double`      |
| `SSS`              | `triple`      |
| `L`                | `long`        |
| `SL`               | `single_long` |
| `LS`               | `long_single` |

Generation 2 and 3 devices use the values `btn_down`, `btn_up`, `single_push`, `double_push`, `triple_push` and `long_push` as `click_type`.

{% note %}
Not all devices support all input events. You can check on [Shelly API Reference](https://shelly-api-docs.shelly.cloud/) website what types of Shelly input events your device supports.
{% endnote %}

## Appliance type (generation 1)

Shelly device relays are added to Home Assistant by default as `switch` entities. A relay can be added as a `light` entity if **Settings** >> **APPLIANCE TYPE** value is set to `light`.

## Consumption type (generation 2+)

Shelly device relays are added to Home Assistant by default as `switch` entities. A relay can be added as a `light` entity if **EXTERNAL CONSUMPTION TYPE** value is set to `light`.

## Light transition

Shelly lights supporting light transition:

- Shelly Bulb RGBW
- Shelly DUO
- Shelly Dimmer
- Shelly Dimmer 2
- Shelly RGBW2
- Shelly Vintage

{% note %}
The firmware limits the transition time to 5 seconds.
{% endnote %}

## Device actions

The integration offers device actions which can be triggered by a configuration button.

### OTA firmware update

Trigger device OTA firmware update.

#### Update entities

- Firmware update
  - triggers the OTA firmware update process to the latest stable version
- Beta firmware update (_disabled by default_)
  - triggers the OTA firmware update process to the latest beta version

### Reboot

Trigger reboot of device.

#### Buttons

- Reboot
  - triggers the reboot

## Shelly Thermostatic Radiator Valve (TRV)

Shelly TRV generates 2 entities that can be used to control the device behavior: `climate` and `number`.
The first will allow specifying a temperature, the second instead of a percentage of the valve position.

**Note**: that if you change the valve position then automatic temperature control
 will be disabled.
As soon as you change the temperature, it gets enabled again.

## Shelly Gas with Valve add-on

If you have the Valve add-on connected to Shelly Gas, the integration will create two entities for the valve. The `valve` entity allows you to control the valve, the `sensor` entity shows exact states of the valve.

## CoAP port (generation 1)

In some cases, it may be needed to customize the CoAP UDP port (default: `5683`) your Home Assistant instance is listening to.

In order to change it, add the following key to your {% term "`configuration.yaml`" %}:

```yaml
# Example configuration.yaml entry
shelly:
  coap_port: 12345
```

## Virtual components

Shelly generation 2 devices (Pro models with firmware 1.4.0 or later) and generation 3 devices (with firmware 1.2.0 or later) allow the creation of virtual components. Virtual components are a special set of components that do not initially exist on the device and are dynamically created by the user to interact with Shelly scripts. You can add virtual components to the device configuration in the **Components** section in the device's web panel.

The integration supports the following virtual components:

- `boolean` in `toggle` mode, for which a `switch` platform entity is created
- `boolean` in `label` mode, for which a `binary_sensor` platform entity is created
- `enum` in `dropdown` mode, for which a `select` platform entity is created
- `enum` in `label` mode, for which a `sensor` platform entity is created
- `number` in `field` mode, for which a `number` platform entity in `box` mode is created
- `number` in `slider` mode, for which a `number` platform entity in `slider` mode is created
- `number` in `label` mode, for which a `sensor` platform entity is created
- `text` in `field` mode, for which a `text` platform entity is created
- `text` in `label` mode, for which a `sensor` platform entity is created

## Scripts (generation 2+)

For each device script, the integration creates a `switch` entity that allows you to control the script. These entities are disabled by default.

## Additional info

Shelly devices rely on [SNTP](https://en.wikipedia.org/wiki/Network_Time_Protocol#SNTP) for features like power measurement.
Please check from the device Web UI that the configured server is reachable.

## Known issues and limitations

- Only supports firmware 1.9 and later for generation 1 devices
- Only supports firmware 1.0 and later for generation 2 devices
- The following generation 1 devices only support firmware 1.11 and later (due to incompatible API):
  - Shelly DUO
  - Shelly Bulb RGBW
  - Shelly Dimmer
  - Shelly Dimmer 2
  - Shelly RGBW2
  - Shelly Vintage
- Generation 1 "Shelly 4Pro" and "Shelly Sense" are not supported (devices based on old CoAP v1 protocol)
- Before set up, battery-powered devices must be woken up by pressing the button on the device.
- For battery-powered devices, the `update` platform entities only inform about the availability of firmware updates but are not able to trigger the update process.
- Using the `homeassistant.update_entity` action for an entity belonging to a battery-powered device is not possible because most of the time these devices are sleeping (are offline).
