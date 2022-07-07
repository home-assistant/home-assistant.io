---
title: "Template Light"
description: "Instructions on how to integrate Template Lights into Home Assistant."
ha_category:
  - Light
ha_release: 0.46
ha_iot_class: Local Push
ha_quality_scale: internal
ha_domain: template
---

The `template` platform creates lights that combine integrations and provides the
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
        level_template: "{{ state_attr('sensor.theater_brightness', 'lux')|int }}"
        value_template: "{{ state_attr('sensor.theater_brightness', 'lux')|int > 0 }}"
        temperature_template: "{{states('input_number.temperature_input') | int}}"
        color_template: "({{states('input_number.h_input') | int}}, {{states('input_number.s_input') | int}})"
        effect_list_template: "{{ state_attr('light.led_strip', 'effect_list') }}"
        turn_on:
          service: script.theater_lights_on
        turn_off:
          service: script.theater_lights_off
        set_level:
          service: script.theater_lights_level
          data:
            brightness: "{{ brightness }}"
        set_temperature:
          service: input_number.set_value
          data:
            value: "{{ color_temp }}"
            entity_id: input_number.temperature_input
        set_white_value:
          service: input_number.set_value
          data:
            value: "{{ white_value }}"
            entity_id: input_number.white_value_input
        set_color:
          - service: input_number.set_value
            data:
              value: "{{ h }}"
              entity_id: input_number.h_input
          - service: input_number.set_value
            data:
              value: "{{ s }}"
              entity_id: input_number.s_input
          - service: light.turn_on
            data_template:
              entity_id:
                - light.led_strip
              transition: "{{ transition | float }}"
              hs_color:
                - "{{ hs[0] }}"
                - "{{ hs[1] }}"
        set_effect:
          - service: light.turn_on
            data_template:
              entity_id:
                - light.led_strip
              effect: "{{ effect }}"
        supports_transition_template: "{{ true }}"
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
      unique_id:
        description: An ID that uniquely identifies this light. Set this to a unique value to allow customization through the UI.
        required: false
        type: string
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
      temperature_template:
        description: Defines a template to get the color temperature of the light.
        required: false
        type: template
        default: optimistic
      white_value_template:
        description: Defines a template to get the white value of the light.
        required: false
        type: template
        default: optimistic
      color_template:
        description: Defines a template to get the color of the light. Must render a tuple (hue, saturation)
        required: false
        type: template
        default: optimistic
      supports_transition_template:
        description: Defines a template to get if light supports transition. Should return boolean value (True/False). If this value is `True` transition parameter in a turn on or turn off call will be passed as a named parameter `transition` to either of the scripts.
        required: false
        type: template
        default: false
      effect_list_template:
        description: Defines a template to get the list of supported effects. Must render a list
        required: inclusive
        type: template
        default: optimistic
      effect_template:
        description: Defines a template to get the effect of the light.
        required: inclusive
        type: template
        default: optimistic
      min_mireds_template:
        description: Defines a template to get the min mireds value of the light.
        required: false
        type: template
        default: optimistic
      max_mireds_template:
        description: Defines a template to get the max mireds value of the light.
        required: false
        type: template
        default: optimistic
      icon_template:
        description: Defines a template for an icon or picture, e.g.,  showing a different icon for different states.
        required: false
        type: template
      availability_template:
        description: Defines a template to get the `available` state of the entity. If the template either fails to render or returns `True`, `"1"`, `"true"`, `"yes"`, `"on"`, `"enable"`, or a non-zero number, the entity will be `available`. If the template returns any other value, the entity will be `unavailable`. If not configured, the entity will always be `available`. Note that the string comparison not case sensitive; `"TrUe"` and `"yEs"` are allowed.
        required: false
        type: template
        default: true
      turn_on:
        description: Defines an action to run when the light is turned on.
        required: true
        type: action
      turn_off:
        description: Defines an action to run when the light is turned off.
        required: true
        type: action
      set_level:
        description: Defines an action to run when the light is given a brightness command. The script will only be called if the `turn_on` call only has brightness, and optionally transition.
        required: false
        type: action
      set_temperature:
        description: Defines an action to run when the light is given a color temperature command.
        required: false
        type: action
      set_white_value:
        description: Defines an action to run when the light is given a white value command.
        required: false
        type: action
      set_color:
        description: Defines an action to run when the light is given a color command.
        required: false
        type: action
      set_effect:
        description: Defines an action to run when the light is given an effect command.
        required: inclusive
        type: action
{% endconfiguration %}

### Template and action variables

State-based template entities have the special template variable `this` available in their templates and actions. The `this` variable aids [self-referencing](/integrations/template#self-referencing) of an entity's state and attribute in templates and actions.

## Considerations

If you are using the state of a platform that takes extra time to load, the
Template Light may get an `unknown` state during startup. This results
in error messages in your log file until that platform has completed loading.
If you use `is_state()` function in your template, you can avoid this situation.
For example, you would replace
{% raw %}`{{ states.switch.source.state == 'on' }}`{% endraw %}
with this equivalent that returns `true`/`false` and never gives an unknown
result:
{% raw %}`{{ is_state('switch.source', 'on') }}`{% endraw %}
Transition doesn't have its own script, it will instead be passed as a named parameter `transition` to the `turn_on`, `turn_off`, `brightness`, `color_temp`, `effect`, `hs_color` or `white_value` scripts.
Brightness will be passed as a named parameter `brightness` to either of `turn_on`, `color_temp`, `effect`, `hs_color` or `white_value` scripts if the corresponding parameter is also in the call. In this case the brightness script (`set_level`) will not be called.
If only brightness is passed to `light.turn_on` service call then `set_level` script is called.

## Examples

In this section you will find some real-life examples of how to use this light.

### Theater Volume Control

This example shows a light that is actually a home theater's volume. This
component gives you the flexibility to provide whatever you'd like to send as
the payload to the consumer including any scale conversions you may need to
make; the [Media Player component](/integrations/media_player/) needs a floating
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
            {% if state_attr('media_player.receiver', 'is_volume_muted') %}
              off
            {% else %}
              on
            {% endif %}
          {% else %}
            off
          {% endif %}
        turn_on:
          service: media_player.volume_mute
          target:
            entity_id: media_player.receiver
          data:
            is_volume_muted: false
        turn_off:
          service: media_player.volume_mute
          target:
            entity_id: media_player.receiver
          data:
            is_volume_muted: true
        set_level:
          service: media_player.volume_set
          target:
            entity_id: media_player.receiver
          data:
            volume_level: "{{ (brightness / 255 * 100)|int / 100 }}"
        level_template: >-
          {% if is_state('media_player.receiver', 'on') %}
            {{ (state_attr('media_player.receiver', 'volume_level')|float * 255)|int }}
          {% else %}
            0
          {% endif %}
```

{% endraw %}

### Change The Icon

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
            {% if state_attr('media_player.receiver', 'is_volume_muted') %}
              off
            {% else %}
              on
            {% endif %}
          {% else %}
            off
          {% endif %}
        icon_template: >-
          {% if is_state('media_player.receiver', 'on') %}
            {% if state_attr('media_player.receiver', 'is_volume_muted') %}
              mdi:lightbulb-off
            {% else %}
              mdi:lightbulb-on
            {% endif %}
          {% else %}
            mdi:lightbulb-off
          {% endif %}
        turn_on:
          service: media_player.volume_mute
          target:
            entity_id: media_player.receiver
          data:
            is_volume_muted: false
        turn_off:
          service: media_player.volume_mute
          target:
            entity_id: media_player.receiver
          data:
            is_volume_muted: true
```

{% endraw %}

### Change The Entity Picture

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
            {% if state_attr('media_player.receiver', 'is_volume_muted') %}
              off
            {% else %}
              on
            {% endif %}
          {% else %}
            off
          {% endif %}
        icon_template: >-
          {% if is_state('media_player.receiver', 'on') %}
            {% if state_attr('media_player.receiver', 'is_volume_muted') %}
              /local/lightbulb-off.png
            {% else %}
              /local/lightbulb-on.png
            {% endif %}
          {% else %}
            /local/lightbulb-off.png
          {% endif %}
        turn_on:
          service: media_player.volume_mute
          target:
            entity_id: media_player.receiver
          data:
            is_volume_muted: false
        turn_off:
          service: media_player.volume_mute
          target:
            entity_id: media_player.receiver
          data:
            is_volume_muted: true
```

{% endraw %}
