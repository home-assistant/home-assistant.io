---
title: "RFXtrx Switch"
description: "Instructions on how to integrate RFXtrx switches into Home Assistant."
ha_category:
  - Switch
ha_release: 0.7.5
ha_domain: rfxtrx
---

The `rfxtrx` platform support switches that communicate in the frequency range of 433.92 MHz.

## Configuration

First you have to set up your [RFXtrx hub](/integrations/rfxtrx/).
The easiest way to find your switches is to add this to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
switch:
  platform: rfxtrx
  automatic_add: true
```

Launch your Home Assistant and go to the website.
Push your remote and your device should be added:

<p class='img'>
<img src='/images/integrations/rfxtrx/switch.png' />
</p>

Here the name is `0b11000102ef9f210010f70` and you can verify that it works from the frontend.
Then you should update your configuration to:

```yaml
# Example configuration.yaml entry
switch:
  platform: rfxtrx
  devices:
    0b11000102ef9f210010f70:
      name: device_name
```

{% configuration %}
devices:
  description: A list of devices.
  required: false
  type: list
  keys:
    name:
      description: Override the name to use in the frontend.
      required: true
      type: string
    fire_event:
      description: Fires an event even if the state is the same as before, for example, a doorbell switch. Can also be used for automations.
      required: false
      default: false
      type: boolean
automatic_add:
  description: To enable the automatic addition of new switches.
  required: false
  default: false
  type: boolean
signal_repetitions:
  description: Because the RFXtrx device sends its actions via radio and from most receivers, it's impossible to know if the signal was received or not. Therefore you can configure the switch to try to send each signal repeatedly.
  required: false
  type: integer
{% endconfiguration %}

<div class='note warning'>

This integration and the [RFXtrx binary sensor](/integrations/binary_sensor.rfxtrx/) can steal each other's devices when setting the `automatic_add` configuration parameter to `true`. Set `automatic_add` only when you have some devices to add to your installation, otherwise leave it to `false`.

</div>

<div class='note warning'>
If a device ID consists of only numbers, please make sure to surround it with quotes.
This is a known limitation in YAML, because the device ID will be interpreted as a number otherwise.
</div>

Generate codes:

If you need to generate codes for switches you can use a template (useful for example COCO switches).

- Go to home-assistant-IP:8123/dev-template
- Use this code to generate a code:

```yaml
{% raw %}0b11000{{ range(100,700) | random | int }}bc0cfe0{{ range(0,10) | random | int }}010f70{% endraw %}
```

- Use this code to add a new switch in your `configuration.yaml`
- Launch your Home Assistant and go to the website.
- Enable learning mode on your switch (i.e., push learn button or plug it in a wall socket)
- Toggle your new switch in the Home Assistant interface

## Examples

Basic configuration with 3 devices:

```yaml
# Example configuration.yaml entry
switch:
  platform: rfxtrx
  automatic_add: false
  signal_repetitions: 2
  devices:
    0b1100ce3213c7f210010f70:
      name: Movement1
    0b11000a02ef2gf210010f50:
      name: Movement2
    0b1111e003af16aa10000060:
      name: Door
      fire_event: true
```

Light hallway if doorbell is pressed (when is sun down):

```yaml
# Example configuration.yaml entry
switch:
  platform: rfxtrx
  automatic_add: false
  devices:
    0710014c440f0160:
      name: Hall
    "0710010244080780":
      name: Door
      fire_event: true

automation:
  - alias: Switch the light on when doorbell rings if the sun is below the horizon and the light was off
    trigger:
      platform: event
      event_type: button_pressed
      event_data: {"entity_id": "switch.door"}
    condition:
      condition: and
      conditions:
        - condition: state
          entity_id: sun.sun
          state: "below_horizon"
        - condition: state
          entity_id: switch.hall
          state: 'off'
    action:
      - service: switch.turn_on
        entity_id: switch.hall
```

Use remote to enable scene (using event_data):

```yaml
# Example configuration.yaml entry
switch:
  platform: rfxtrx
  automatic_add: false
  devices:
    0b1100ce3213c7f210010f70:
      name: Light1
    0b11000a02ef2gf210010f50:
      name: Light2
    0b1111e003af16aa10000060:
      name: Keychain remote
      fire_event: true
scene:
  name: Livingroom
  entities:
    switch.light1: on
    switch.light2: on

automation:
  - alias: Use remote to enable scene
    trigger:
      platform: event
      event_type: button_pressed
      event_data: {"state": "on", "entity_id": "switch.keychain_remote"}
    action:
      service: scene.turn_on
      entity_id: scene.livingroom
```
