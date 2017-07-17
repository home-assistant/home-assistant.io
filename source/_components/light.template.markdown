---
layout: page
title: "Template Light"
description: "Instructions how to integrate Template lights into Home Assistant."
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

The `template` platform creates lights that combine components and provides the ability to run scripts or invoke services for each of the on, off, and brightness commands of a light. 

To enable Template lights in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
light:
  - platform: template
    lights:
      theater_lights:
        friendly_name: "Theater Lights"
        value_template: "{% raw %}{{is_state('sensor.theater_brightness.attributes.lux > 0'}}{% endraw %}"
        turn_on:
          service: script.theater_lights_on
        turn_off:
          service: script.theater_lights_off
        set_level:
          service: script.theater_lights_level
          data_template:
          brightness: "{% raw %}{{brightness}}{% endraw %}"
        level_template: "{% raw %}{{is_state('sensor.theater_brightness.attributes.lux'}}{% endraw %}"
```

Configuration variables:

- **lights** array (*Required*): List of your lights.
  - **friendly_name** (*Optional*): Name to use in the Frontend.
  - **value_template** (*Optional*): Defines a [template](/topics/templating/) to get the state of the light. If not provided the component defaults to optimisitc state determination.
  - **turn_on** (*Required*): Defines an [action](/getting-started/automation/) to run when the light is turned on.
  - **turn_off** (*Required*): Defines an [action](/getting-started/automation/) to run when the light is turned off.
  - **set_level** (*Optional*): Defines an [action](/getting-started/automation/) to run when the light is given a brightness command.
  - **level_template** (*Optional): Defines a [template](/topics/templating/) to get the brightness of the light. If not provided the component defaults to optimisitc brightness determination.
  - **entity_id** (*Optional*): Add a list of entity IDs so the switch only reacts to state changes of these entities. This will reduce the number of times the light will try to update it's state.


## {% linkable_title Considerations %}

If you are using the state of a platform that takes extra time to load, the template light may get an 'unknown' state during startup. This results in error messages in your log file until that platform has completed loading. If you use is_state() function in your template, you can avoid this situation. For example, you would replace {% raw %}'{{ states.switch.source.state }}'{% endraw %} with this equivalent that returns true/false and never gives an unknown result:
{% raw %}'{{ is_state('switch.source', 'on') }}'{% endraw %}

## {% linkable_title Examples %}

In this section you will find some real life examples of how to use this light.

### {% linkable_title Theater Volume Control %}

This example shows a light that is actually a home theater's volume. This component gives you the flexibility to provide whatever you'd like to send as the payload to the consumer including any scale conversions you may need to make; the media_player component needs a floating point percentage value 0.0-1.0

```yaml
light:
  - platform: template
    lights:
      theater_volume:
        friendly_name: 'Receiver Volume'
        value_template: >-
          {% raw %}
          {%- if is_state("media_player.receiver", "on") -%}
                {%- if states.media_player.receiver.attributes.is_volume_muted -%}
                        off
                {%- else -%}
                        on
                {%- endif -%}
          {%- else -%}
            off
          {%- endif -%}
          {% endraw %}
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
          data:
            entity_id: media_player.receiver
          data_template:
            volume_level: '{% raw %}{{((brightness / 255 * 100) | int)/100}}{% endraw %}'
        level_template: >-
          {% raw %}
          {%- if is_state("media_player.receiver", "on") -%}
            {{(255 * states.media_player.receiver.attributes.volume_level) | int}}
          {%- else -%}
            0
          {%- endif -%}
          {% endraw %}
```
