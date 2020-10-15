---
title: Adaptive Lighting
description: How to set up Adaptive Lighting with Home Assistant
ha_category:
  - Automation
  - Light
ha_release: 0.117
ha_domain: adaptive_lighting
ha_codeowners:
  - '@basnijholt'
ha_config_flow: true
---

The `adaptive_lighting` platform changes the settings of your lights throughout the day.
It uses the position of the sun to calculate the color temperature and brightness that is most fitting for that time of the day.
Scientific research has shown that this helps to maintain your natural circadian rhythm (your biological clock) and might lead to improved sleep, mood, and general well-being.

In practical terms, this means that after the sun sets, the brightness of your lights will decrease to a certain minimum brightness, while the color temperature will be at its coolest color temperature at noon, after which it will decrease and reach its warmest color at sunset.
Around sunrise, the opposite will happen.

Additionally, the integration provides a way to define and set your lights in "sleep mode".
When "sleep mode" is enabled, the lights will be at a minimal brightness and have a very warm color.

The integration creates two switches.
The first switch `switch.adaptive_lighting_default` (with name `"default"`) turns the Adaptive Lighting on or off.
It has several attributes that show the current light settings.
The second switch is `switch.adaptive_lighting_sleep_mode_default` (with name `"default"`) that when activated, turns on "sleep mode".

## Taking back control

Although having your lights automatically adapt is great most of the time, there might be times at which you want to set the lights to a different color/brightness and keep it that way.
For this purpose, the integration (when `take_over_control` is enabled) automatically detects whether someone (e.g., person toggling the light switch) or something (automation) changes the lights.
If this happens *and* the light is already on, the light that was changed gets marked as "manually controlled" and the Adaptive Lighting component will stop adapting that light until it turns off and on again (or if you use the service call `adaptive_lighting.set_manual_control`).
This mechanism works by listening to all `light.turn_on` calls and by noting that the component did not make the call.
Additionally, there is an option to detect all state changes (when `detect_non_ha_changes` is enabled), so also changes to the lights that were not made by a `light.turn_on` call (e.g., through an app or via something outside of Home Assistant.)
It does this by comparing a light's state to Adaptive Lighting's previously used settings.
Whenever a light gets marked as "manually controlled", an `adaptive_lighting.manual_control` event is fired, such that one can use this information in automations.

## Configuration

This integration is both fully configurable through YAML _and_ the frontend. (**Configuration** -> **Integrations** -> **Adaptive Lighting**, **Adaptive Lighting** -> **Options**)
Here, the options in the frontend and in YAML have the same names.

```yaml
# Example configuration.yaml entry
adaptive_lighting:
  lights:
    - light.living_room_lights
```

{% configuration %}
name:
  description: The name to use when displaying this switch.
  required: false
  default: default
  type: string
lights:
  description: List of light entities for Adaptive Lighting to control (may be empty).
  required: false
  type: list
  default: []
adapt_brightness:
  description: Whether Adaptive Lighting should adjust brightness of lights (if supported by the light).
  required: false
  default: true
  type: boolean
adapt_color_temp:
  description: Whether Adaptive Lighting should adjust color temperature of lights (if supported by the light).
  required: false
  default: true
  type: boolean
adapt_rgb_color:
  description: Whether Adaptive Lighting should adjust RGB color of lights (if supported by the light).
  required: false
  default: true
  type: boolean
prefer_rgb_color:
  description: Whether to use RGB color adjustment instead of native light color temperature.
  required: false
  default: false
  type: boolean
initial_transition:
  description: How long the first transition is when the lights go from `off` to `on` (or when "sleep mode" is (de)activated).
  required: false
  default: 1
  type: time
transition:
  description: How long the transition is when the lights change, in seconds.
  required: false
  default: 45
  type: integer
interval:
  description: Period between adapting the lights, in seconds.
  required: false
  default: 90
  type: integer
min_brightness:
  description: The minimum percent of brightness to set the lights to.
  required: false
  default: 1
  type: integer
max_brightness:
  description: The maximum percent of brightness to set the lights to.
  required: false
  default: 100
  type: integer
min_color_temp:
  description: The coldest color temperature to set the lights to, in Kelvin.
  required: false
  default: 2000
  type: integer
max_color_temp:
  description: The warmest color temperature to set the lights to, in Kelvin.
  required: false
  default: 5500
  type: integer
sleep_brightness:
  description: Brightness of lights while the sleep mode is enabled.
  required: false
  default: 1
  type: integer
sleep_color_temp:
  description: Color temperature of lights while the sleep mode is enabled.
  required: false
  default: 1000
  type: integer
sunrise_time:
  description: Override the sunrise time with a fixed time.
  required: false
  type: time
sunrise_offset:
  description: Change the sunrise time with a positive or negative offset.
  required: false
  default: 0
  type: time
sunrise_time:
  description: Override the sunset time with a fixed time.
  required: false
  type: time
sunset_offset:
  description: Change the sunset time with a positive or negative offset.
  required: false
  default: 0
  type: time
only_once:
  description: Whether to keep adapting the lights (false) or to only adapt the lights as soon as they are turned on (true).
  required: false
  default: false
  type: boolean
take_over_control:
  description: If another source calls `light.turn_on` while the lights are on and being adapted, disable Adaptive Lighting.
  required: false
  default: true
  type: boolean
detect_non_ha_changes:
  description: Whether to detect state changes and stop adapting lights, even not from `light.turn_on`. Needs `take_over_control` to be enabled. Note that by enabling this option, it calls 'homeassistant.update_entity' every 'interval'!
  required: inclusive
  default: false
  type: boolean
{% endconfiguration %}

Full example:

```yaml
# Example configuration.yaml entry
adaptive_lighting:
- name: "default"
  lights: []
  adapt_brightness: true
  adapt_color_temp: true
  adapt_rgb_color: true
  prefer_rgb_color: false
  transition: 45
  initial_transition: 1
  interval: 90
  min_brightness: 1
  max_brightness: 100
  min_color_temp: 2000
  max_color_temp: 5500
  sleep_brightness: 1
  sleep_color_temp: 1000
  sunrise_time: "08:00:00"  # override the sunrise time
  sunrise_offset: "00:15:00"
  sunset_time:
  sunset_offset: -1800  # in seconds
  take_over_control: true
  detect_non_ha_changes: false
  only_once: false

```

### Services

`adaptive_lighting.apply` applies Adaptive Lighting settings to lights on demand.

| Service data attribute    | Optional | Description                                                             |
|---------------------------|----------|-------------------------------------------------------------------------|
| `entity_id`               |       no | The `entity_id` of the switch with the settings to apply.               |
| `lights`                  |       no | A light (or list of lights) to apply the settings to.                   |
| `transition`              |      yes | The number of seconds for the transition.                               |
| `adapt_brightness`        |      yes | Whether to change the brightness of the light or not.                   |
| `adapt_color_temp`        |      yes | Whether to adapt the color temperature on supporting lights.            |
| `adapt_rgb_color`         |      yes | Whether to adapt the color temperature with `rgb_color`.                |
| `turn_on_lights`          |      yes | Whether to turn on lights that are currently off.                       |

`adaptive_lighting.set_manual_control` can mark (or unmark) whether a light is "manually controlled", meaning that when a light has `manual_control`, the light is not adapted.

| Service data attribute    | Optional | Description                                                                                        |
|---------------------------|----------|----------------------------------------------------------------------------------------------------|
| `entity_id`               |       no | The `entity_id` of the switch in which to (un)mark the light as being "manually controlled".       |
| `lights`                  |       no | A light (or list of lights) to apply the settings to.                                              |
| `manual_control`          |       no | Whether to mark (true) or unmark (false) the light as "manually controlled".                       |


## Automation examples

Reset the `manual_control` status of a light after an hour.
```yaml
- alias: "Adaptive lighting: reset manual_control after 1 hour"
  mode: parallel
  trigger:
    platform: event
    event_type: adaptive_lighting.manual_control
  variables:
    light: "{{ trigger.event.data.entity_id }}"
    switch: "{{ trigger.entity_id }}"
  action:
    - delay: "01:00:00"
    - condition: template
      value_template: "{{ light in state_attr('switch', 'manual_control') }}"
    - service: adaptive_lighting.set_manual_control
      data:
        entity_id: "{{ switch }}"
        lights: "{{ light }}"
        manual_control: false
```

Toggle multiple Adaptive Lighting switches to "sleep mode" using an `input_boolean.sleep_mode`.
```yaml
- alias: "Adaptive lighting: toggle 'sleep mode'"
  trigger:
    - platform: state
      entity_id: input_boolean.sleep_mode
    - platform: homeassistant
      event: start  # in case the states aren't properly restored
  variables:
    sleep_mode: "{{ states('input_boolean.sleep_mode') }}"
  action:
    service: "switch.turn_{{ sleep_mode }}"
    entity_id:
      - switch.adaptive_lighting_sleep_mode_living_room
      - switch.adaptive_lighting_sleep_mode_bedroom
```
