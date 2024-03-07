---
title: Lutron
description: Instructions on how to use Lutron devices with Home Assistant.
ha_category:
  - Cover
  - Fan
  - Hub
  - Light
  - Scene
  - Switch
ha_release: 0.37
ha_iot_class: Local Polling
ha_codeowners:
  - '@cdheiser'
  - '@wilburCForce'
ha_domain: lutron
ha_platforms:
  - binary_sensor
  - cover
  - fan
  - light
  - scene
  - switch
ha_integration_type: integration
ha_config_flow: true
---

[Lutron](http://www.lutron.com/) is an American lighting control company. They have several lines of home automation devices that manage light switches/dimmers, occupancy sensors, HVAC controls, etc. The `lutron` integration in Home Assistant is responsible for communicating with the main hub for these systems.

Presently, there's only support for communicating with the [RadioRA 2](http://www.lutron.com/en-US/Products/Pages/WholeHomeSystems/RadioRA2/Overview.aspx) Main Repeater and only handle light switches, dimmers, and seeTouch keypad scenes.

## Configuration

When configured, the `lutron` integration will automatically discover the rooms and their associated switches/dimmers as configured by the RadioRA 2 software from Lutron. Each room will be treated as a separate group.

To use Lutron RadioRA 2 devices in your installation, you'll need to first create a username/password in your Lutron programming software. Once a telnet username/password has been programmed, you can follow the instructions from the next chapter.

{% include integrations/config_flow.md %}

<div class='note'>

It is recommended to assign a static IP address to your main repeater. This ensures that it won't change IP addresses, so you won't have to change the `host` if it reboots and comes up with a different IP address.

</div>

<div class='note'>

If you are using RadioRA2 software version 12 or later, the default `lutron` user with password `integration` is not configured by default. To configure a new telnet user, go to **Settings** > **Integration** in your project and add a new telnet login. Once configured, use the transfer tab to push your changes to the RadioRA2 main repeater(s).

</div>

## Keypad buttons

Individual buttons on keypads are not represented as entities. Instead, they fire events called `lutron_event` whose payloads include `id`, `action`, and `uuid` attributes.

The `id` attribute includes the name of the keypad and the name of the button, normalized the same way entity names are. For example, if the keypad is called "Kitchen Keypad" and the button is called "Dinner" the event's `id` will be `kitchen_keypad_dinner`. If the button has not been assigned a name by the Lutron system installer then the button will have a name of "Unknown Button". In this case the `id` will be suffixed with the underlying Lutron button number and will be of the form `kitchen_keypad_unknown_button_1`. The `uuid` is available to distinguish buttons with the same name on one keypad.

The `action` attribute varies depending on the button type.

For raise/lower buttons (dimmer buttons, shade controls, etc.) there will be two values, `pressed` and `released`, fired when the button is pressed and when it's released, respectively.

For single-action buttons (scene selection, etc.), `action` will be `single`, and there will only be one event fired. This is a limitation of the Lutron controller which doesn't give Home Assistant any way of knowing when a single-action button is released.

## Keypad LEDs

Each full-width button on a Lutron SeeTouch, Hybrid SeeTouch, and Tabletop SeeTouch Keypad has an LED that can be controlled by Home Assistant. A service call of switch.turn_off or switch.turn_on against the appropriate LED entity will control the keypad LED.

Keep in mind that the Lutron system will also control the LED state independent of Home Assistant, according to the programming of the RadioRA2 system. This also means you can query LED states to determine if a certain scene is active, since the LED will have been illuminated by the RadioRA2 repeaters. This includes the "phantom" LEDs of Main Repeater Keypad buttons; even though there is no physical button or LED, the RadioRA2 system tracks the scenes and will "light" the LED that can be queried.

If a button is not programmed to control any lights or other devices in the RadioRA2 system but is given a name in the programming software, it will be available to fire events in Home Assistant. However, since there is no way to have a scene "active" on a button with no devices associated, the Main Repeater will automatically extinguish the keypad LED a few seconds after the button press. If you wish to have Home Assistant light the keypad LED after a button press, you will need to delay your service call to light the LED for several seconds, so it arrives after the Main Repeater has sent the command to turn it off.

## Scene

This integration uses keypad programming to identify scenes.  Currently, it works with seeTouch, hybrid seeTouch, main repeater, homeowner, Pico, and seeTouch RF tabletop keypads.
The Lutron scene platform allows you to control scenes programmed into your SeeTouch keypads.

After setup, scenes will appear in Home Assistant using the area, keypad and button name.

## Occupancy sensors

Any configured Powr Savr occupancy sensors will be added as occupancy binary sensors. Lutron reports occupancy for an area, rather than reporting individual sensors. Sensitivity and timeouts are controlled on the sensors themselves, not in software.

## Example automations

``` yaml
- alias: "keypad button pressed notification"
  trigger:
    - platform: event
      event_type: lutron_event
      event_data:
        id: office_pico_on
        action: single
  action:
    - service: notify.telegram
      data:
        message: "pico just turned on!"
```
