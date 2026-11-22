---
description: Integration to control Samsung TVs and air conditioners using an infrared transmitter.
ha_release: 2026.6
ha_domain: samsung_infrared
---

The **Samsung Infrared** {% term integration %} lets you control a Samsung TV or air conditioner using any infrared transmitter previously configured in Home Assistant.

Because the integration communicates over infrared, it operates in a one-way, fire-and-forget fashion: commands are sent to the device but there is no feedback channel to confirm its current state. The integration therefore uses assumed states.

## Supported devices

The integration supports:

- Samsung TVs that can be controlled via the standard Samsung infrared protocol.
- Samsung air conditioners that use the Samsung AC 0292 infrared protocol.

{% details "Example TV remotes" %}

![BN59-01315Q](/images/integrations/samsung_infrared/samsung-bn59-01315q.jpg)

{% enddetails %}

## Prerequisites

{% include integrations/infrared_controlled.md %}

For example, you can use an ESPHome device with an IR LED pointed at your Samsung TV or air conditioner.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Device type:
  description: The type of Samsung device to control. Choose **TV** or **AC** (air conditioner).
Infrared transmitter:
  description: The infrared transmitter entity to use for sending commands. This must be an entity provided by a hardware integration (such as ESPHome) that has already been set up with an IR transmitter.
{% endconfiguration_basic %}

## Supported functionality

The **Samsung Infrared** integration provides the following entities, depending on the device type selected during setup.

### AC

#### Climate

Available when **AC** is selected as the device type.

- **Samsung AC**: Represents the Samsung air conditioner and allows you to control it via IR commands. Supported features include turn on, turn off, HVAC mode (off, auto, cool, heat, dry, fan only), target temperature (16-30°C, in 1°C steps), and fan mode (auto, low, medium, high).

### TV

#### Buttons

Available when **TV** is selected as the device type.

- **Power**: Toggles the TV power state.
- **Source**: Cycles through input sources, including TV, HDMI 1 to HDMI 4, USB drives, DLNA devices, and other available sources.
- **Settings**: Opens the TV settings menu.
- **Info**: Displays program information.
- **Exit**: Exits the current menu or app.
- **Return**: Returns to the previous screen or menu.
- **Home**: Opens the TV home screen.
- **Red**, **Green**, **Yellow**, **Blue**: Color buttons for special functions (function depends on the current context).
- **Up**, **Down**, **Left**, **Right**: Navigation buttons for menu navigation.
- **OK**: Confirms selections in menus.
- **Previous channel**: Switches to the previously viewed channel.
- **Number 0-9**: Number keys for channel selection and text input.
- **Fast forward**: Fast forwards playback.
- **Rewind**: Rewinds playback.
- **Record**: Starts recording (if supported by the TV).
- **Tools**: Opens the tools menu.
- **Browser**: Opens the web browser.
- **AD/Subtitle**: Toggles audio description or subtitles.
- **E-Manual**: Opens the electronic manual.

#### Media player

Available when **TV** is selected as the device type.

- **Samsung TV**: Represents the Samsung TV and allows you to control it via IR commands. Supported features include turn on, turn off, volume up, volume down, mute, channel up, channel down, play, pause, stop, and source selection (TV, HDMI 1, HDMI 2, HDMI 3, HDMI 4).

## Use cases

The integration can be used to:
 - Add an IR-controlled air conditioner to a climate schedule.
 - Turn off a TV or air conditioner when nobody is watching.
 - Control an older TV or air conditioner that does not have smart functionality.
 - Avoid the need to connect your TV to the internet if you are concerned about privacy.

### Automation examples

#### Automation: Turn off the TV when nobody is in the same room

If you pair the Samsung Infrared integration with a smart plug with power monitoring capabilities, you can detect whether a TV is on (see the **Known limitations** section) and turn it off when no one is in the room.

- **Trigger**: Occupancy cleared
  - **Target**: Living room occupancy sensor
  - **For at least**: 00:15:00
- **Condition**: Power value (above 10 W for at least 1 minute)
  - **Target**: TV power sensor
- **Action**: Press button
  - **Target**: Samsung TV power button

{% include docs/paste_yaml_tip.md %}

{% details "YAML example for turning off the TV when the room is empty" %}

{% example %}
alias: "Turn TV off if the room is empty"
triggers:
  - trigger: occupancy.cleared
    target:
      entity_id: binary_sensor.living_room_occupancy
    options:
      for:
        minutes: 15
conditions:
  - condition: power.is_value
    target:
      entity_id: sensor.tv_power
    options:
      behavior: any
      for: '00:01:00'
      threshold:
        type: above
        value:
          active_choice: number
          number: 10
          unit_of_measurement: W
actions:
  - action: button.press
    target:
      entity_id: button.samsung_tv_power
{% endexample %}

{% enddetails %}

#### Automation: Turn on the TV in the morning

You could also configure an automation to turn a TV on in the morning.

 - **Trigger**: Time: It is 9:00 am
- **Action**: Press button

{% details "YAML example for turning on the TV at 09:00 every day" %}

{% example %}
triggers:
  - trigger: time
    at: '09:00:00'
    weekday:
      - mon
      - tue
      - wed
      - thu
      - fri
      - sat
      - sun
conditions: []
actions:
  - action: media_player.turn_on
    metadata: {}
    target:
      entity_id: media_player.samsung_tv
    data: {}
{% endexample %}

{% enddetails %}

## Known limitations

- The integration uses assumed state, meaning Home Assistant cannot read the actual state of the device (for example, whether the TV is on or off, or the AC's current room temperature).
  - You may still be able to detect the increased power draw when a TV is on using a smart plug with power monitoring capabilities.
- For the media player, volume control is step-based only; there is no way to set an absolute volume level.
- For the climate entity, swing mode is not currently configurable through the UI and is always sent as off.

## Troubleshooting

{% details "Buttons are unavailable" %}

### Symptom

In the Device info page, all buttons are greyed out and the "Activity" panel shows they are "Unavailable".

#### Description

The integration only works if a functional infrared transmitter is configured and enabled.

#### Resolution

1. Check that your Infrared Proxy Transmitter device is connected to power.
2. Check that the transmitter has been configured in Home Assistant.
3. Check that the transmitter entity is enabled.

{% enddetails %}

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
