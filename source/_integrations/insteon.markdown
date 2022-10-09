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

<p class='note warning'>The Insteon company has shut down and turned off its cloud as of April 2022. Recently the service has been restarted but as a paid offering. Time will tell how successful this new model will be.</p>

This integration adds support for integrating your INSTEON network with Home Assistant. It is known to work with the [2413U] USB and [2412S] RS242 flavors of PLM and the [2448A7] USB stick. It has also been tested to work with the [2242] and [2245] Hubs. Device support is provided by the underlying [pyinsteon] package.

_If you have factory reset your device please see the instructions <a href="#recovering-after-factory-resetting-the-hub">Recovering After Factory Resetting The Hub</a> for how to proceed._

{% include integrations/config_flow.md %}

<p class='img'>
<img src='/images/integrations/insteon/insteon-products.jpg' alt='Overview of supported Insteon modems & hubs'>
Overview of supported Insteon modems & hubs
</p>

[pyinsteon]: https://github.com/pyinsteon/pyinsteon
[2413U]: https://www.insteon.com/powerlinc-modem-usb
[2412S]: https://www.insteon.com/powerlinc-modem-serial
[2448A7]: https://www.insteon.com/support-knowledgebase/2014/12/10/usb-wireless-adapter-quick-start-guide
[2245]: https://www.insteon.com/insteon-hub/
[2242]: https://www.insteon.com/support-knowledgebase/2014/9/26/insteon-hub-owners-manual

## Autodiscovery

The first time autodiscovery runs, the duration may require up to 60 seconds per device. Subsequent startups will occur much quicker using cached device information. If a device is not recognized during autodiscovery, trigger the device, such as toggling a button, to force the device to send a message to the modem. The device will then be discovered. You may need to trigger the device a few times.

## Adding Devices to the INSTEON Integration

In order for any two Insteon devices to talk with one another, they must be linked. For an overview of device linking, please read the Insteon page on [understanding linking]. The Insteon Modem module supports All-Linking through [Developer Tools] service calls. The following services are available:

- **insteon.add_all_link**: Puts the Insteon Modem (IM) into All-Linking mode. The IM can be set as a controller or a responder. If the IM is a controller, put the IM into linking mode then press the SET button on the device. If the IM is a responder, press the SET button on the device then put the IM into linking mode.

Other services that support the management of the All-Link Database are:
- **insteon.delete_all_link**: Tells the Insteon Modem (IM) to remove an All-Link record from the All-Link Database of the IM and a device. Once the IM is set to delete the link, press the SET button on the corresponding device to complete the process.
- **insteon.load_all_link_database**: Load the All-Link Database for a device. WARNING - Loading a device All-Link database may take a LONG time and may need to be repeated to obtain all records.
- **insteon.print_all_link_database**: Print the All-Link Database for a device. Requires that the All-Link Database is loaded first.
- **insteon.print_im_all_link_database**: Print the All-Link Database for the INSTEON Modem (IM).
- **insteon.add_default_links**: Add a set of default links between the modem and the device to facilitate proper communication between them.

[understanding linking]: https://www.insteon.com/support-knowledgebase/2015/1/28/understanding-linking
[Developer Tools]: /docs/tools/dev-tools/

## INSTEON Scenes

Trigger an INSTEON scene on or off, is done via automations. Two services are provided to support this feature:

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

3. Add devices to the Hub using the instructions for [Adding Devices to the INSTEON Integration](#adding-devices-to-the-insteon-integration)

Once your devices are linked to the Hub again they will appear in Home Assistant automatically.
