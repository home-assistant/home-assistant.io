---
title: Insteon
description: Instructions on how to set up an Insteon Modem (PLM or Hub) locally within Home Assistant.
ha_category:
  - Binary Sensor
  - Cover
  - Fan
  - Hub
  - Light
  - Sensor
  - Switch
ha_iot_class: Local Push
ha_release: 0.39
ha_domain: insteon
ha_codeowners:
  - '@teharris1'
ha_config_flow: true
ha_platforms:
  - binary_sensor
  - climate
  - cover
  - fan
  - light
  - lock
  - switch
ha_integration_type: integration
ha_dhcp: true
---

<p class='note warning'>The Insteon apps (Director or Insteon for Hub) are a paid service utilizing the Insteon cloud to control an Insteon Hub. Home Assistant does not require the use of the Insteon app but can operate in conjunction with the app if desired.</p>

This integration adds support for integrating your INSTEON network with Home Assistant. It has been tested with all USB and serial PowerLinc Modems (PLM) including [2413U], [2448A7], [2413S] and [2412S] models. It has also been tested to work with the [2242] and [2245] Hubs.

_If you have factory reset your device please see the instructions <a href="#recovering-after-factory-resetting-the-hub">Recovering After Factory Resetting The Hub</a> for how to proceed._

{% include integrations/config_flow.md %}

<p class='img'>
<img src='/images/integrations/insteon/insteon-products.jpg' alt='Overview of supported Insteon modems & hubs'>
Overview of supported Insteon modems & hubs
</p>

[2413U]: https://www.insteon.com/powerlinc-modem-usb
[2413S]: https://www.insteon.com/support-knowledgebase/get-started-2413s
[2412S]: https://www.insteon.com/powerlinc-modem-serial
[2448A7]: https://www.insteon.com/support-knowledgebase/2014/12/10/usb-wireless-adapter-quick-start-guide
[2245]: https://www.insteon.com/insteon-hub/
[2242]: https://www.insteon.com/support-knowledgebase/2014/9/26/insteon-hub-owners-manual

## Autodiscovery

The first time autodiscovery runs, any device that is already linked to the modem will be identified. This process may require up to 60 seconds per device. Subsequent startups will occur much quicker using cached device information. If a device is not recognized during autodiscovery, trigger the device, such as toggling a button, to force the device to send a message to the modem. The device will then be discovered. You may need to trigger the device a few times. If the device is still not identified, relink the device to the modem following the linking instructions using the [Insteon Panel](#insteon-panel).

## Insteon Panel

<p class='img>
<img src='/images/integrations/insteon/insteon-panel.png' alt='Insteon panel'>
The Insteon panel allows for product specific configuration of Insteon devices and Insteon scenes.
</p>

The following capabilities are available in the Insteon panel:

- **Add device**: In order for any two Insteon devices to talk with one another, they must be linked. For an overview of device linking, please read the Insteon page on [understanding linking]. To link a device to the modem open the Insteon panel from the left side bar and select the **Add device** button. The following options are available during the linking process:
  - **Device address**: Enter the address of the device, such as `1A.2B.3C`, to link a specific device remotely. Not all devices support remote linking. If a device does not support remote linking, press the `Set` button on the device to put the device in linking mode.
  - **Link multiple**: To add multiple devices in a single session, select the **Add multiple** checkbox.
- **Scenes**: Insteon scenes can be created, changed or deleted using the **Scenes** tab of the Insteon panel.
- **Device Properties**: Insteon device properties, such as the LED brightness, can be managed using the Insteon panel. To see the available properties of a device, select the device from the list of devices in the Insteon panel. This will display the list of available properties for the specific device on the **Properties** tab. Each device type will have a different set of properties and not all devices have properties.
  - **Read device properties**:  Use the **Load from device** button to read the properties from the device.
  - **Change device properties**: Select the specific property from the list of properties. Use the dialog box to edit the property value. This does not write the change to the device.
  - **Write property changes**: Use the **Write to device** button to save the property changes to the device.
  - **Undo changes**: Property changes can be undone before they are written to the device by selecting the **Undo changes** button.
- **Device All-Link Database**: The Insteon All-Link Database (ALDB) contains the list of links to other devices in the Insteon network. The All-Link Database can be managed using the Insteon Panel. To see the All-Link Database of a device, select the device from the list of devices in the Insteon panel and select the **All-Link Database** tab.
  - **Read the ALDB**: Use the **Load from device** button to read the current ALDB records from the device.
  - **Add a record**: Use the **Create ALDB record** button to add a record to the All-Link Database. This does not write to the device.
  - **Modify a record**: To modify an existing record, select the record and use the dialog box to change the record as needed. This does not write to the device.
  - **Add default links**: There are a set of default records that need to exist in the ALDB in order for a device to communicate correctly to the modem. Use the **Add default links** button to add these links to the device. This **does** write to the device.
  - **Write changes to the device**: Use the **Write changes** button to write added or changed records to the device.
  - **Undo changes**: ALDB record changes can be undone prior to being written to the device using the **Undo changes** button.

<p class='note warning'>If you choose to use the Insteon app, it is recommended to add devices and scenes using the Insteon app. Home Assistant will see the devices and scenes as well.</p>
<p class='note warning'>Editing a device's All-Link Database can cause the device to become unresponsive. If this occurs, simply relink the device to the modem using the **Add device** directions in the [Insteon Panel](#insteon-panel).</p>

[understanding linking]: https://www.insteon.com/support-knowledgebase/2015/1/28/understanding-linking

## INSTEON Scenes

Triggering an INSTEON scene on or off is done via automations. Two services are provided to support this feature:

- **insteon.scene_on**
  - **group**: (required) The INSTEON scene number to trigger.
- **insteon.scene_off**
  - **group**: (required) The INSTEON scene to turn off

```yaml
automation:
  # Trigger an INSTEON scene 25
  - id: trigger_scene_25_on
    alias: "Turn on scene 25"
    action:
      - service: insteon.scene_on
        group: 25
```

## Events and Mini-Remotes

Mini-Remote devices do not appear as Home Assistant entities, they generate events. The following events are available:

- **insteon.button_on**
  - **address**: (required) The Insteon device address in lower case without dots (e.g., 1a2b3c)
  - **button**: (Optional) The button id in lower case. For a 4-button remote the values are `a` to `d`. For an 8 button remote the values are `a` to `h`. For a one-button remote this field is not used.
- **insteon.button_off**
  - **address**: (required) The Insteon device address in lower case without dots (e.g., 1a2b3c)
  - **button**: (Optional) The button id in lower case. For a 4-button remote the values are a to d. For an 8 button remote the values are `a` to `h`. For a one-button remote this field is not used.

This allows the mini-remotes to be configured as triggers for automations. Here is an example of how to use these events for automations:

```yaml
automation:
  # 4 or 8 button remote with button c pressed
  - id: light_on
    alias: "Turn a light on"
    trigger:
      - platform: event
        event_type: insteon.button_on
    event_data:
      address: 1a2b3c
      button: c
    condition:
      - condition: state
        entity_id: light.some_light
        state: "off"
    action:
      - service: light.turn_on
        target:
          entity_id: light.some_light

  # single button remote
  - id: light_off
    alias: "Turn a light off"
    trigger:
      - platform: event
        event_type: insteon.button_on
    event_data:
      address: 1a2b3c
    condition:
      - condition: state
        entity_id: light.some_light
        state: "off"
    action:
      - service: light.turn_on
        target:
          entity_id: light.some_light
```

## Services

The following services are available:

- **insteon.add_all_link**: Puts the Insteon Modem (IM) into All-Linking mode. The IM can be set as a controller or a responder. If the IM is a controller, put the IM into linking mode then press the SET button on the device. If the IM is a responder, press the SET button on the device then put the IM into linking mode.
- **insteon.delete_all_link**: Tells the Insteon Modem (IM) to remove an All-Link record from the All-Link Database of the IM and a device. Once the IM is set to delete the link, press the SET button on the corresponding device to complete the process.
- **insteon.load_all_link_database**: Load the All-Link Database for a device. WARNING - Loading a device All-Link database may take a LONG time and may need to be repeated to obtain all records.
- **insteon.print_all_link_database**: Print the All-Link Database for a device. Requires that the All-Link Database is loaded first.
- **insteon.print_im_all_link_database**: Print the All-Link Database for the INSTEON Modem (IM).
- **insteon.add_default_links**: Add a set of default links between the modem and the device to facilitate proper communication between them.

## Device Overrides

<p class='note warning'>Device overrides are not used to add a device to the Insteon integration. They are only used if a device that was linked correctly to the Insteon Modem but is not appearing in Home Assistant.

There are two primary uses for the **device override** feature:

- Devices that do not respond during autodiscovery. This is common for battery operated devices. Before using a device override, please trigger the device a few times and it will likely be discovered by Home Assistant.
- Devices that have not been fully developed. This allows an unknown device to be mapped to a device that operates similarly to another device.

Device overrides can be set up using the integrations page inside the configuration panel.

## Recovering After Factory Resetting The Hub

Many users tried to factory reset their Insteon Hub when the Insteon app stopped working in April 2022. If you are one of those users, you can perform the following steps to connect it to Home Assistant and get all of your devices up and working again.

1. Log into Home Assistant and add the Insteon integration. Select Insteon Hub v2 if you have a 2245-xxx or Hub V1 if you have a 2242-xxx.

2. Follow the instructions on screen to add the integration.

    - You will need the IP address of the Hub which you should be able to find on your network router. See the documentation for your specific router for instructions.

    - If you have a Hub v2 you will need the default username and password which are printed on the bottom of the Hub

3. Add devices to the Hub using the instructions for adding devices to the INSTEON integration using the [Insteon Panel]](#insteon-panel)

Once your devices are linked to the Hub again they will appear in Home Assistant automatically.
