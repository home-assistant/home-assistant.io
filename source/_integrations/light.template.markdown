---
title: "Template Light"
description: "Instructions on how to integrate Template Lights into Home Assistant."
ha_category:
  - Light
  - Helper
ha_release: 0.46
ha_iot_class: Local Push
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/core'
ha_domain: template
ha_platforms:
  - light
ha_integration_type: helper
related:
  - docs: /docs/configuration/
    title: Configuration file
---

The `template` platform creates lights that combine integrations and provides the
ability to run scripts or invoke actions for each of the on, off, and
brightness commands of a light.

To enable Template Lights in your installation, add the following to your
{% term "`configuration.yaml`" %} file:

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
        hs_template: "({{states('input_number.h_input') | int}}, {{states('input_number.s_input') | int}})"
        effect_list_template: "{{ state_attr('light.led_strip', 'effect_list') }}"
        turn_on:
          action: script.theater_lights_on
        turn_off:
          action: script.theater_lights_off
        set_level:
          action: script.theater_lights_level
          data:
            brightness: "{{ brightness }}"
        set_temperature:
          action: input_number.set_value
          data:
            value: "{{ color_temp }}"
            entity_id: input_number.temperature_input
        set_hs:
          - action: input_number.set_value
            data:
              value: "{{ h }}"
              entity_id: input_number.h_input
          - action: input_number.set_value
            data:
              value: "{{ s }}"
              entity_id: input_number.s_input
          - action: light.turn_on
            data:
              entity_id:
                - light.led_strip
              transition: "{{ transition | float }}"
              hs_color:
                - "{{ hs[0] }}"
                - "{{ hs[1] }}"
        set_effect:
          - action: light.turn_on
            data:
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
      hs_template:
        description: Defines a template to get the HS color of the light. Must render a tuple (hue, saturation).
        required: false
        type: template
        default: optimistic
      rgb_template:
        description: Defines a template to get the RGB color of the light. Must render a tuple or a list (red, green, blue).
        required: false
        type: template
        default: optimistic
      rgbw_template:
        description: Defines a template to get the RGBW color of the light. Must render a tuple or a list (red, green, blue, white).
        required: false
        type: template
        default: optimistic
      rgbww_template:
        description: Defines a template to get the RGBWW color of the light. Must render a tuple or a list (red, green, blue, cold white, warm white).
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
        description: Defines an action to run when the light is turned on. May receive variables `brightness` and/or `transition`.
        required: true
        type: action
      turn_off:
        description: Defines an action to run when the light is turned off. May receive variable `transition`.
        required: true
        type: action
      set_level:
        description: Defines an action to run when the light is given a brightness command. The script will only be called if the `turn_on` call only has brightness, and optionally transition. Receives variables `brightness` and optionally `transition`.
        required: false
        type: action
      set_temperature:
        description: Defines an action to run when the light is given a color temperature command. Receives variable `color_temp`. May also receive variables `brightness` and/or `transition`.
        required: false
        type: action
      set_hs:
        description: "Defines an action to run when the light is given a hs color command. Available variables: `hs` as a tuple, `h` and `s`"
        required: false
        type: action
      set_rgb:
        description: "Defines an action to run when the light is given an RGB color command. Available variables: `rgb` as a tuple, `r`, `g` and `b`."
        required: false
        type: action
      set_rgbw:
        description: "Defines an action to run when the light is given an RGBW color command. Available variables: `rgbw` as a tuple, `rgb` as a tuple, `r`, `g`, `b` and `w`."
        required: false
        type: action
      set_rgbww:
        description: "Defines an action to run when the light is given an RGBWW color command. Available variables: `rgbww` as a tuple, `rgb` as a tuple, `r`, `g`, `b`, `cw` and `ww`."
        required: false
        type: action
      set_effect:
        description: Defines an action to run when the light is given an effect command. Receives variable `effect`. May also receive variables `brightness` and/or `transition`.
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
Transition doesn't have its own script, it will instead be passed as a named parameter `transition` to the `turn_on`, `turn_off`, `brightness`, `color_temp`, `effect`, `hs_color`, `rgb_color`, `rgbw_color` or `rgbww_color` scripts.
Brightness will be passed as a named parameter `brightness` to either of `turn_on`, `color_temp`, `effect`, `hs_color`, `rgb_color`, `rgbw_color` or `rgbww_color` scripts if the corresponding parameter is also in the call. In this case, the brightness script (`set_level`) will not be called.
If only brightness is passed to `light.turn_on` action, then `set_level` script is called.

## Examples

In this section you will find some real-life examples of how to use this light.

### Theater Volume Control

This example shows a light that is actually a home theater's volume. This
integration gives you the flexibility to provide whatever you'd like to send as
the payload to the consumer including any scale conversions you may need to
make; the [media player integration](/integrations/media_player/) needs a floating
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
          action: media_player.volume_mute
          target:
            entity_id: media_player.receiver
          data:
            is_volume_muted: false
        turn_off:
          action: media_player.volume_mute
          target:
            entity_id: media_player.receiver
          data:
            is_volume_muted: true
        set_level:
          action: media_player.volume_set
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
          action: media_player.volume_mute
          target:
            entity_id: media_player.receiver
          data:
            is_volume_muted: false
        turn_off:
          action: media_player.volume_mute
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
          action: media_player.volume_mute
          target:
            entity_id: media_player.receiver
          data:
            is_volume_muted: false
        turn_off:
          action: media_player.volume_mute
          target:
            entity_id: media_player.receiver
          data:
            is_volume_muted: true
```

{% endraw %}

### Make a global light entity for a multi-segment WLED light

This example shows how to group together 2 RGBW segments from the same WLED controller into a single usable light

{% raw %}

```yaml
light:
  - platform: template
    lights:
      wled_global:
        unique_id: 28208f257b54c44e50deb2d618d44710
        friendly_name: "Multi-segment Wled control"
        value_template: "{{ states('light.wled_master') }}"
        level_template: "{{ state_attr('light.wled_master', 'brightness')|d(0,true)|int }}"
        rgbw_template: (
          {{ (state_attr('light.wled_segment_0', 'rgbw_color')[0]|d(0) + state_attr('light.wled_segment_1', 'rgbw_color')[0]|d(0))/2 }},
          {{ (state_attr('light.wled_segment_0', 'rgbw_color')[1]|d(0) + state_attr('light.wled_segment_1', 'rgbw_color')[1]|d(0))/2 }},
          {{ (state_attr('light.wled_segment_0', 'rgbw_color')[2]|d(0) + state_attr('light.wled_segment_1', 'rgbw_color')[2]|d(0))/2 }},
          {{ (state_attr('light.wled_segment_0', 'rgbw_color')[3]|d(0) + state_attr('light.wled_segment_1', 'rgbw_color')[3]|d(0))/2 }}
          )
        effect_list_template: "{{ state_attr('light.wled_segment_0', 'effect_list') }}"
        effect_template: "{{ state_attr('light.wled_segment_0', 'effect') if state_attr('light.wled_segment_0', 'effect') == state_attr('light.wled_segment_1', 'effect') else none }}"
        availability_template: "{{ not is_state('light.wled_master', 'unknown') }}"

        turn_on:
          action: light.turn_on
          entity_id: light.wled_segment_0, light.wled_segment_1, light.wled_master
        turn_off:
          action: light.turn_off
          entity_id: light.wled_master
        set_level:
          action: light.turn_on
          entity_id: light.wled_master
          data:
            brightness: "{{ brightness }}"
        set_rgbw:
          action: light.turn_on
          entity_id: light.wled_segment_0, light.wled_segment_1
          data:
            rgbw_color:
              - "{{ r }}"
              - "{{ g }}"
              - "{{ b }}"
              - "{{ w }}"
            effect: "Solid"
        set_effect:
          action: light.turn_on
          entity_id: light.wled_segment_0, light.wled_segment_1
          data:
            effect: "{{ effect }}"
```

{% endraw %}
