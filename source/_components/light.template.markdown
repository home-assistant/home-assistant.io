---
layout: page
title: "Template Light"
description: "Instructions how to integrate Template Lights into Home Assistant."
date: 2016-05-18 20:32
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Light
ha_release: 0.46
ha_iot_class: "Local Push"
logo: home-assistant.png
---

The `template` platform creates lights that combine components and provides the
ability to run scripts or invoke services for each of the on, off, and
brightness commands of a light.

To enable Template Lights in your installation, add the following to your
`configuration.yaml` file:

{% raw %}
```yaml
# Example configuration.yaml entry
light:
  - platform: template
    lights:
      theater_lights:
        friendly_name: "Theater Lights"
        level_template: "{{ sensor.theater_brightness.attributes.lux|int }}"
        color_template: "{{ sensor.avg_color_from_camera.attributes.color }}"
        value_template: "{{ sensor.theater_brightness.attributes.lux|int > 0 }}"
        turn_on:
          service: script.theater_lights_on
        turn_off:
          service: script.theater_lights_off
        set_level:
          service: script.theater_lights_level
          data_template:
            brightness: "{{ brightness }}"
        set_color:
          service: script.theater_set_color
          data_template:
            color: "{{ color }}"
```
{% endraw %}

{% configuration %}
  lights:
    description: List of your lights.
    required: true
    type: map
    keys:
      friendly_name:
        description: Name to use in the frontend.
        required: false
        type: string
      entity_id:
        description: A list of entity IDs so the light only reacts to state changes of these entities. This can be used if the automatic analysis fails to find all relevant entities.
        required: false
        type: [string, list]
      value_template:
        description: Defines a template to get the state of the light.
        required: false
        type: template
        default: optimistic
      level_template:
        description: Defines a template to get the brightness of the light.
        required: false
        type: template
        default: optimistic
      color_template:
        description: Defines a template to get the RGB color of the light.
        required: false
        type: template
        default: optimistic
      turn_on:
        description: Defines an action to run when the light is turned on.
        required: true
        type: action
      turn_off:
        description: Defines an action to run when the light is turned off.
        required: true
        type: action
      set_level:
        description: Defines an action to run when the light is given a brightness command.
        required: false
        type: action
      set_color:
        description: Defines an action to run when the RGB color of the light is changed.
        required: false
        type: action
{% endconfiguration %}

## {% linkable_title Considerations %}

If you are using the state of a platform that takes extra time to load, the
Template Light may get an `unknown` state during startup. This results
in error messages in your log file until that platform has completed loading.
If you use `is_state()` function in your template, you can avoid this situation.
For example, you would replace
{% raw %}`{{ states.switch.source.state == 'on' }}`{% endraw %}
with this equivalent that returns `true`/`false` and never gives an unknown
result:
{% raw %}`{{ is_state('switch.source', 'on') }}`{% endraw %}

## {% linkable_title Examples %}

In this section you will find some real life examples of how to use this light.

### {% linkable_title Theater Volume Control %}

This example shows a light that is actually a home theater's volume. This
component gives you the flexibility to provide whatever you'd like to send as
the payload to the consumer including any scale conversions you may need to
make; the [Media Player component](/components/media_player/) needs a floating
point percentage value from `0.0` to `1.0`.

{% raw %}
```yaml
light:
  - platform: template
    lights:
      theater_volume:
        friendly_name: "Receiver Volume"
        value_template: >-
          {% if is_state('media_player.receiver', 'on') %}
            {% if states.media_player.receiver.attributes.is_volume_muted %}
              off
            {% else %}
              on
            {% endif %}
          {% else %}
            off
          {% endif %}
        turn_on:
          service: media_player.volume_mute
          data:
            entity_id: media_player.receiver
            is_volume_muted: false
        turn_off:
          service: media_player.volume_mute
          data:
            entity_id: media_player.receiver
            is_volume_muted: true
        set_level:
          service: media_player.volume_set
          data_template:
            entity_id: media_player.receiver
            volume_level: "{{ (brightness / 255 * 100)|int / 100 }}"
        level_template: >-
          {% if is_state('media_player.receiver', 'on') %}
            {{ (states.media_player.receiver.attributes.volume_level|float * 255)|int }}
          {% else %}
            0
          {% endif %}
```
{% endraw %}

### {% linkable_title Change The Icon %}

This example shows how to change the icon based on the light state.

{% raw %}
```yaml
light:
  - platform: template
    lights:
      theater_volume:
        friendly_name: "Receiver Volume"
        value_template: >-
          {% if is_state('media_player.receiver', 'on') %}
            {% if states.media_player.receiver.attributes.is_volume_muted %}
              off
            {% else %}
              on
            {% endif %}
          {% else %}
            off
          {% endif %}
        icon_template: >-
          {% if is_state('media_player.receiver', 'on') %}
            {% if states.media_player.receiver.attributes.is_volume_muted %}
              mdi:lightbulb-off
            {% else %}
              mdi:lightbulb-on
            {% endif %}
          {% else %}
            mdi:lightbulb-off
          {% endif %}
        turn_on:
          service: media_player.volume_mute
          data:
            entity_id: media_player.receiver
            is_volume_muted: false
        turn_off:
          service: media_player.volume_mute
          data:
            entity_id: media_player.receiver
            is_volume_muted: true
```
{% endraw %}

### {% linkable_title Change The Entity Picture %}

This example shows how to change the entity picture based on the light state.

{% raw %}
```yaml
light:
  - platform: template
    lights:
      theater_volume:
        friendly_name: "Receiver Volume"
        value_template: >-
          {% if is_state('media_player.receiver', 'on') %}
            {% if states.media_player.receiver.attributes.is_volume_muted %}
              off
            {% else %}
              on
            {% endif %}
          {% else %}
            off
          {% endif %}
        icon_template: >-
          {% if is_state('media_player.receiver', 'on') %}
            {% if states.media_player.receiver.attributes.is_volume_muted %}
              /local/lightbulb-off.png
            {% else %}
              /local/lightbulb-on.png
            {% endif %}
          {% else %}
            /local/lightbulb-off.png
          {% endif %}
        turn_on:
          service: media_player.volume_mute
          data:
            entity_id: media_player.receiver
            is_volume_muted: false
        turn_off:
          service: media_player.volume_mute
          data:
            entity_id: media_player.receiver
            is_volume_muted: true
```
{% endraw %}

### {% linkable_title Handle discreet number of colors %}

Some devices have fixed colors you can choose from instead of the regular RGB spectrum (cheap IR lights for example). Here is an example that deals with these kind of devices.

{% raw %}
```yaml
light:
  - platform: template
    lights:
      led_strip:
        turn_on:
          service: switch.turn_on
          data:
            entity_id: switch.led_strip
        turn_off:
          service: switch.turn_off
          data:
            entity_id: switch.led_strip
        value_template: "{{ states.switch.led_strip.state }}"
        set_color:
            service: python_script.color
            data_template:
              entity_id: broadlink_send_packet_192_168_1_25
              color: "{{ color }}"
              codes: 
                  red: 'JgBYAAABM5QTFRAWERMTExMTExMRFBIUFDYUNxE5FTURFRE5EjgSOREUEhQSOBIUERUTExUTEBQSORE5ExMSOBE5EjgTNxM3FQAFRgABMUoTAAxdAAExSRQADQU=' #RED
                  green: 'JgBQAAABMpQUEhQSFRETExIUExMUEhMTEzcUNxM3FDYUEhI5EjgSOBM4EBgQOBIUFBIUEhMTFBIUEhM4EhQSOBI4EzgSOBI4FgAFRwABMkoTAA0FAAAAAAAAAAA=' #GREEN
                  blue: 'JgBYAAABMJYRFREUERYSExMSFBITExMTETkRORE5ETkSFBM3EzcTNxEVETkRORIUERUSFBMSFBITNxMTExMRORE5ETkRORE5EgAFSgABLksRAAxhAAEwShMADQU=' #BLUE
                  ...
```
{% endraw %}

And you can use the following script that finds the closest color from a list of named colors :

{% raw %}
```python
entity_id = data.get('entity_id')
c1 = data.get('color', [255, 255, 255])
codes = data.get('codes', {}) # color name : IR code base 64 for broadlink
colors = { # Standard colors of IR remote lights
  'red':      [255,20,20],
  'green':    [20,255,20],
  'blue':     [20,20,255],
  'white':    [255,255,255],
  'orange':   [255,125,20],
  'gold':     [255,178,20],
  'beige':    [255,219,20],
  'yellow':   [255,255,20],
  'turquoise':[20,255,178],
  'cyan':     [20,255,255],
  'aqua':     [20,178,255],
  'royal':    [20,125,255],
  'violet':   [125,20,255],
  'purple':   [178,20,255],
  'pink':     [219,20,255],
  'magenta':  [255,20,255]
  }

if entity_id is not None:
  minimum = 195075 # Maximum distance
  winer = -1
  c1 = c1[1:-1].split(",")
  for code, c2 in colors.items():
    distance = (int(c1[0]) - c2[0])**2 + (int(c1[1]) - c2[1])**2 + (int(c1[2]) - c2[2])**2
    if distance < minimum :
      winner = code
      minimum = distance
  logger.info("Selected color : {}".format(winner))
  service_data = {'packet': [codes[winner]] }
  hass.services.call('switch', entity_id, service_data, False)
```
{% endraw %}


