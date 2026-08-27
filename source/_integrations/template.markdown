---
title: Template
description: Instructions on how to integrate Template Sensors into Home Assistant.
ha_category:
  - Alarm Control Panel
  - Binary sensor
  - Button
  - Cover
  - Device Tracker
  - Event
  - Fan
  - Helper
  - Image
  - Light
  - Lock
  - Number
  - Select
  - Sensor
  - Switch
  - Update
  - Vacuum
  - Weather
ha_release: 0.12
ha_iot_class: Local Push
ha_quality_scale: internal
ha_codeowners:
  - '@Petro31'
  - '@home-assistant/core'
ha_domain: template
ha_platforms:
  - alarm_control_panel
  - binary_sensor
  - button
  - cover
  - device_tracker
  - event
  - fan
  - image
  - light
  - lock
  - number
  - select
  - sensor
  - switch
  - update
  - vacuum
  - weather
ha_integration_type: helper
ha_config_flow: true
related:
  - docs: /docs/templating/
    title: About templating
  - docs: /docs/templating/patterns/
    title: Common template patterns
  - docs: /docs/templating/debugging/
    title: Debugging templates
  - docs: /template-functions/
    title: Template functions reference
  - docs: /docs/configuration/
    title: Configuration file
  - docs: /docs/blueprint/
    title: About blueprints
---

The **Template** {% term integration %} allows creating entities which derive their values from other data. This is done by specifying [templates](/docs/templating/) for properties of an entity, like the name or the state.

There is currently support for the following device types within Home Assistant:

- [Alarm control panel](#alarm-control-panel)
- [Binary sensor](#binary-sensor)
- [Button](#button)
- [Cover](#cover)
- [Device Tracker](#device-tracker)
- [Event](#event)
- [Fan](#fan)
- [Image](#image)
- [Light](#light)
- [Lock](#lock)
- [Number](#number)
- [Select](#select)
- [Sensor](#sensor)
- [Switch](#switch)
- [Update](#update)
- [Vacuum](#vacuum)
- [Weather](#weather)

{% include integrations/config_flow.md %}

{% important %}
To be able to add **{% my helpers title="Helpers" %}** via the user interface, you should have `default_config:` in your {% term "`configuration.yaml`" %}. It should already be there by default unless you removed it.
{% endimportant %}

{% note %}
Configuration using our user interface provides a more limited subset of options, making this integration more accessible while covering most use cases.

If you need more specific features for your use case, the manual [YAML-configuration section](#yaml-configuration) of this integration might provide them.
{% endnote %}

## YAML configuration

Entities are defined in your YAML configuration files under the `template:` key. You can define multiple configuration blocks as a list. Each block defines sensor/binary sensor/number/select entities and can contain optional update triggers.

### State-based template entities

Template entities by default update as soon as any of the referenced data in the template updates.

For example, you can have a template that takes the averages of two sensors. Home Assistant updates your template sensor as soon as either source sensor updates.

```yaml
template:
  - sensor:
      - name: "Average temperature"
        unit_of_measurement: "°C"
        state: >
          {% set bedroom = states('sensor.bedroom_temperature') | float %}
          {% set kitchen = states('sensor.kitchen_temperature') | float %}

          {{ ((bedroom + kitchen) / 2) | round(1, default=0) }}
```

### Trigger-based template entities

If you want more control over when an entity updates, you can define triggers. Triggers follow the same format and work exactly the same as [triggers in automations][trigger-doc]. This feature is a great way to create entities based on webhook data ([example](#trigger-based-sensor-and-binary-sensor-storing-webhook-information)), or update entities based on a schedule.

Whenever a trigger fires, all related entities re-render and have access to [the trigger data](/docs/automation/templating/) in the templates.

Trigger-based entities do not automatically update when states referenced in the templates change. This functionality can be added back by defining a [state trigger](/docs/automation/trigger/#state-trigger) for each entity that you want to trigger updates.

The state, including attributes, of trigger-based sensors and binary sensors is restored when Home Assistant is restarted. The state of other trigger-based template entities is not restored.

{% note %}
Buttons do not support using `trigger` or `action` options.
{% endnote %}

```yaml
# Example configuration entry
template:
  - triggers:
      - trigger: time_pattern
        # This updates every night
        hours: 0
        minutes: 0
    sensor:
      # Keep track how many days have past since a date
      - name: "Not smoking"
        state: '{{ ( ( as_timestamp(now()) - as_timestamp(strptime("06.07.2018", "%d.%m.%Y")) ) / 86400 ) | round(default=0) }}'
        unit_of_measurement: "Days"
```

### Configuration reference

{% configuration trigger-based %}
actions:
  description: Define actions to be executed when the trigger fires (for trigger-based entities only). Optional. Variables set by the action script are available when evaluating entity templates. This can be used to interact with anything using actions, in particular actions with [response data](/docs/scripts/perform-actions#use-templates-to-handle-response-data). [See action documentation](/docs/automation/action).
  required: false
  type: list
conditions:
  description: Define conditions that have to be met after a trigger fires and before any actions are executed or sensor updates are performed (for trigger-based entities only). Optional. [See condition documentation](/docs/automation/condition).
  required: false
  type: list
triggers:
  description: Define one or multiple automation triggers to update the entities. Optional. If omitted updates based on referenced entities. [See trigger documentation](/docs/automation/trigger).
  required: false
  type: list
unique_id:
  description: The unique ID for this config block. This is prefixed to all unique IDs of all entities in this block.
  required: false
  type: string
variables:
  description: Key-value pairs of variable definitions which can be referenced and used in the templates below (for trigger-based entities only). Mostly used by blueprints. With State-based template entities, variables are only resolved when the configuration is loaded or reloaded. Trigger based template entities resolve variables between triggers and actions.
  required: false
  type: map
  keys:
    "variable_name: value":
      description: The variable name and corresponding value.
      required: true
      type: string

{% endconfiguration %}

## Common Device Configuration Options

Each entity platform has its own set of configuration options, but there are some common options that can be used across all entity platforms.

```yaml
# Example configuration.yaml entry
template:
  - binary_sensor:
      # Common configuration options
    - default_entity_id: binary_sensor.my_alert
      unique_id: my_unique_sensor_id
      variables:
        my_entity: sensor.watts
      availability: "{{ my_entity | has_value }}"
      icon: "{{ 'mdi:flash-alert' if states(my_entity) | float > 100 else 'mdi:flash' }}"
      name: "{{ states(my_entity) }} Alert"
      # Entity specific configuration options
      state: "{{ states(my_entity) | float > 100}}"
      device_class: problem
```

{% configuration device %}
  availability:
    description: Defines a template to get the `available` state of the entity. If the template either fails to render or returns `True`, `"1"`, `"true"`, `"yes"`, `"on"`, `"enable"`, or a non-zero number, the entity is `available`. If the template returns any other value, the entity is `unavailable`. If not configured, the entity is always `available`. Note that the string comparison is not case sensitive; `"TrUe"` and `"yEs"` are allowed.
    required: false
    type: template
    default: true
  conditions:
    description: Define conditions that have to be met before template entity updates are performed (for trigger-based entities only). Optional. [See condition documentation](/docs/automation/condition).
    required: false
    type: list
  default_entity_id:
    description: Use `default_entity_id` instead of name for automatic generation of the entity id. For example, `sensor.my_awesome_sensor`. When used without a `unique_id`, the entity id updates during restart or reload if the entity id is available. If the entity id already exists, the entity id is created with a number at the end. When used with a `unique_id`, the `default_entity_id` is only used when the entity is added for the first time.
    required: false
    type: string
  icon:
    description: Defines a template for the icon of the entity.
    required: false
    type: template
  picture:
    description: Defines a template for the entity picture of the sensor.
    required: false
    type: template
  name:
    description: Defines a template to get the name of the entity.
    required: false
    type: template
  unique_id:
    description: An ID that uniquely identifies this entity. It is combined with the unique ID of the configuration block if available. This allows changing the `name`, `icon` and `entity_id` from the web interface. Changing the `entity_id` from the web interface overwrites the value in `default_entity_id`.
    required: false
    type: string
  variables:
    description: Key-value pairs of variable definitions which can be referenced and used in the templates below (for trigger-based entities only). Mostly used by blueprints. With State-based template entities, variables are only resolved when the configuration is loaded or reloaded. Trigger based template entities resolve variables between triggers and actions.
    required: false
    type: map
    keys:
      "variable_name: value":
        description: The variable name and corresponding value.
        required: true
        type: string

{% endconfiguration %}

## Alarm Control Panel

The template alarm control panel platform allows you to create a alarm control panels with templates to define the state and scripts to define each actions.

Alarm control panel entities can be created from the frontend in the Helpers section or via YAML.

```yaml
# Example state-based configuration.yaml entry
template:
  - alarm_control_panel:
      - name: "Alarm Control Panel 1"
        state: "{{ states('input_select.panel_1_state') }}"
        arm_away:
          action: script.arm_panel_away
        arm_home:
          action: script.arm_panel_home
        disarm:
          action: script.disarm_panel
```

```yaml
# Example trigger-based configuration.yaml entry
template:
  - triggers:
      - trigger: state
        entity_id: input_select.panel_1_state
    alarm_control_panel:
      - name: "Alarm Control Panel 1"
        state: "{{ states('input_select.panel_1_state') }}"
        arm_away:
          action: script.arm_panel_away
        arm_home:
          action: script.arm_panel_home
        disarm:
          action: script.disarm_panel
```

{% configuration alarm_control_panel %}
alarm_control_panel:
  description: List of alarm control panels
  required: true
  type: map
  keys:
    arm_away:
      description: Defines an action to run when the alarm is armed to away mode.
      required: false
      type: action
    arm_custom_bypass:
      description: Defines an action to run when the alarm is armed to custom bypass mode.
      required: false
      type: action
    arm_home:
      description: Defines an action to run when the alarm is armed to home mode.
      required: false
      type: action
    arm_night:
      description: Defines an action to run when the alarm is armed to night mode.
      required: false
      type: action
    arm_vacation:
      description: Defines an action to run when the alarm is armed to vacation mode.
      required: false
      type: action
    attributes:
      description: >
        Defines templates for attributes of the entity. The following attributes are not allowed inside the attributes map: `code_format`, `changed_by`, and `code_arm_required`.
      required: false
      type: map
      keys:
        "attribute: template":
          description: The attribute and corresponding template.
          required: true
          type: template
    code_arm_required:
      description: If true, the code is required to arm the alarm.
      required: false
      type: boolean
      default: true
    code_format:
      description: One of `number`, `text` or `no_code`. Format for the code used to arm/disarm the alarm.
      required: false
      type: string
      default: number
    disarm:
      description: Defines an action to run when the alarm is disarmed.
      required: false
      type: action
    optimistic:
      description: Flag that defines if the alarm control panel works in optimistic mode. When enabled, the alarm control panel's state updates immediately when a new option is chosen through the UI or actions, without waiting for the template defined in `state` to update. When disabled (default), the alarm control panel updates only when the `state` template returns a new value.
      required: false
      type: boolean
      default: false
    state:
      description: "Defines a template to set the state of the alarm panel. Only the states `armed_away`, `armed_custom_bypass`, `armed_home`, `armed_night`, `armed_vacation`, `arming`, `disarmed`, `disarming`, `pending`, and `triggered` are used."
      required: false
      type: template
    trigger:
      description: Defines an action to run when the alarm is triggered.
      required: false
      type: action
{% endconfiguration %}

## Binary Sensor

The template binary sensor platform allows you to create binary sensors with templates to define the state and attributes.

Binary sensor entities can be created from the frontend in the Helpers section or via YAML.

```yaml
# Example state-based configuration.yaml entry
template:
  - binary_sensor:
      - name: Sun Up
        state: >
          {{ is_state("sun.sun", "above_horizon") }}
```

```yaml
# Example trigger-based configuration.yaml entry
template:
  - triggers:
    - trigger: state
      entity_id: sun.sun
    binary_sensor:
      - name: Sun Up
        state: >
          {{ is_state("sun.sun", "above_horizon") }}
```

{% configuration binary-sensor %}
binary_sensor:
  description: List of binary sensors
  required: true
  type: list
  keys:
    attributes:
      description: Defines templates for attributes of the entity.
      required: false
      type: map
      keys:
        "attribute: template":
          description: The attribute and corresponding template.
          required: true
          type: template
    auto_off:
      description: "**Requires a trigger.** After how much time the entity should turn off after it rendered 'on'."
      required: false
      type: time
    delay_off:
      description: The amount of time the template state must be ***not met*** before this sensor switches to `off`. This can also be a template.
      required: false
      type: time
    delay_on:
      description: The amount of time (for example, `0:00:05`) the template state must be ***met*** before this sensor switches to `on`. This can also be a template.
      required: false
      type: time
    device_class:
      description: Sets the class of the device, changing the device state and icon that is displayed on the UI (see below). It does not set the `unit_of_measurement`.
      required: false
      type: device_class
      default: None
    state:
      description: The sensor is `on` if the template evaluates as `True`, `yes`, `on`, `enable`, or a positive number. The sensor is `unknown` if the template evaluates as `None`. Any other value renders it as `off`. The actual appearance in the frontend (such as `Open`/`Closed` or `Detected`/`Clear`) depends on the sensor's device_class value.
      required: true
      type: template

{% endconfiguration %}

### State based binary sensor - Washing Machine Running

This example creates a washing machine "load running" sensor by monitoring an
energy meter connected to the washer. During the washer's operation, the energy meter fluctuates wildly, hitting zero frequently even before the load is finished. By utilizing `delay_off`, we can have this sensor only turn off if there has been no washer activity for 5 minutes.

```yaml
# Example configuration.yaml entry
# Determine when the washing machine has a load running.
template:
  - binary_sensor:
      - name: "Washing Machine"
        delay_off:
          minutes: 5
        state: >
          {{ states('sensor.washing_machine_power') | float > 0 }}
```

### State based binary sensor - Is Anyone Home

This example is determining if anyone is home based on the combination of device tracking and motion sensors. It's extremely useful if you have kids/baby sitter/grand parents who might still be in your house that aren't represented by a trackable device in Home Assistant. This is providing a composite of Wi-Fi based device tracking and Z-Wave multisensor presence sensors.

```yaml
# Example configuration.yaml entry
template:
  - binary_sensor:
      - name: People home
        state: >
          {{ is_state('device_tracker.sean', 'home')
             or is_state('device_tracker.susan', 'home')
             or is_state('binary_sensor.office_124', 'on')
             or is_state('binary_sensor.hallway_134', 'on')
             or is_state('binary_sensor.living_room_139', 'on')
             or is_state('binary_sensor.porch_ms6_1_129', 'on')
             or is_state('binary_sensor.family_room_144', 'on') }}
```

### State based binary sensor - device tracker sensor with latitude and longitude attributes

This example shows how to combine a non-GPS (for example, NMAP) and GPS device tracker while still including latitude and longitude attributes

```yaml
# Example configuration.yaml entry
template:
  - binary_sensor:
      - name: My Device
        state: >
          {{ is_state('device_tracker.my_device_nmap', 'home') or is_state('device_tracker.my_device_gps', 'home') }}
        device_class: "presence"
        attributes:
          latitude: >
            {% if is_state('device_tracker.my_device_nmap', 'home') %}
              {{ state_attr('zone.home', 'latitude') }}
            {% else %}
              {{ state_attr('device_tracker.my_device_gps', 'latitude') }}
            {% endif %}
          longitude: >
            {% if is_state('device_tracker.my_device_nmap', 'home') %}
              {{ state_attr('zone.home', 'longitude') }}
            {% else %}
              {{ state_attr('device_tracker.my_device_gps', 'longitude') }}
            {% endif %}
```

### State based binary sensor - Change the icon when a state changes

This example demonstrates how to use template to change the icon as its state changes. This icon is referencing its own state.

```yaml
# Example configuration.yaml entry
template:
  - binary_sensor:
      - name: Sun Up
        state: >
          {{ is_state("sun.sun", "above_horizon") }}
        icon: >
          {% if is_state("binary_sensor.sun_up", "on") %}
            mdi:weather-sunset-up
          {% else %}
            mdi:weather-sunset-down
          {% endif %}
```

### Trigger based binary sensor - Change state and icon when a custom event is received

A more advanced use case could be to set the icon based on the sensor's own state like above, but when triggered by an event. This example demonstrates a binary sensor that turns on momentarily, such as when a doorbell button is pressed.

The binary sensor turns on and sets the matching icon when the appropriate event is received. After 5 seconds, the binary sensor turns off automatically. To ensure the icon gets updated, there must be a trigger for when the state changes to off.

```yaml
# Example configuration.yaml entry
template:
  - triggers:
      - trigger: event
        event_type: YOUR_EVENT
      - trigger: state
        entity_id: binary_sensor.doorbell_rang
        to: "off"
    binary_sensor:
      name: doorbell_rang
      icon: "{{ (trigger.platform == 'event') | iif('mdi:bell-ring-outline', 'mdi:bell-outline') }}"
      state: "{{ trigger.platform == 'event' }}"
      auto_off:
        seconds: 5
```

## Button

The template button platform allows you to create button entities with scripts to define each action.

Button entities can be created from the frontend in the Helpers section or via YAML.

```yaml
# Example configuration.yaml entry
template:
  - button:
      - name: Fast Forward
        press:
          action: remote.send_command
          target:
            entity_id: remote.living_room
          data:
            command: fast_forward
```

{% configuration button %}
button:
  description: List of buttons
  required: true
  type: map
  keys:
    attributes:
      description: Defines templates for attributes of the entity. The `device_class` attribute is not allowed inside attributes map.
      required: false
      type: map
      keys:
        "attribute: template":
          description: The attribute and corresponding template.
          required: true
          type: template
    press:
      description: Defines actions to run to press the button.
      required: true
      type: action
{% endconfiguration %}

## Cover

The template cover platform allows you to create covers with templates to define the state and scripts to define each action.

```yaml
# Example state-based configuration.yaml entry
template:
  - cover:
      - name: Garage Door
        state: "{{ states('sensor.garage_door') | float > 0 }}"
        device_class: garage
        open_cover:
          action: script.open_garage_door
        close_cover:
          action: script.close_garage_door
        stop_cover:
          action: script.stop_garage_door
```

```yaml
# Example trigger-based configuration.yaml entry
template:
  - triggers:
      - trigger: state
        entity_id: sensor.garage_door
    cover:
      - name: Garage Door
        state: "{{ trigger.to_state.state | float(0) > 0 }}"
        device_class: garage
        open_cover:
          action: script.open_garage_door
        close_cover:
          action: script.close_garage_door
        stop_cover:
          action: script.stop_garage_door
```

{% configuration cover %}
cover:
  description: Characteristics of a cover
  type: map
  keys:
    attributes:
      description: >
        Defines templates for attributes of the entity. The following attributes are not allowed inside the attributes map: `is_closed`, `current_position`, `current_tilt_position`, and `device_class`.
      required: false
      type: map
      keys:
        "attribute: template":
          description: The attribute and corresponding template.
          required: true
          type: template
    close_cover:
      description: Defines an action to close the cover.
      required: inclusive
      type: action
    device_class:
      description: Sets the [class of the device](/integrations/cover/), changing the device state and icon that is displayed on the frontend.
      required: false
      type: string
    open_cover:
      description: Defines an action to open the cover. If `open_cover` is specified, `close_cover` must also be specified. At least one of `open_cover` and `set_cover_position` must be specified.
      required: inclusive
      type: action
    optimistic:
      description: Force cover position to use [optimistic mode](#cover-optimistic-mode).
      required: false
      type: boolean
      default: false
    position:
      description: Defines a template to get the position of the cover. Legal values are numbers between `0` (closed) and `100` (open). If the template produces a `None` value, the current position is set to `unknown`.
      required: false
      type: template
    set_cover_position:
      description: Defines an action to set to a cover position (between `0` and `100`). The variable `position` contains the entity's set position.
      required: false
      type: action
    set_cover_tilt_position:
      description: Defines an action to set the tilt of a cover (between `0` and `100`). The variable `tilt` contains the entity's set tilt position.
      required: false
      type: action
    state:
      description: Defines a template to get the state of the cover. Valid output values from the template are `open`, `opening`, `closing` and `closed` which are directly mapped to the corresponding states. In addition, `1`, `true`, `yes`, `on`, and `enable` are valid as a synonym to `open` and `0`, `false`, `no`, `off`, and `disable` are a synonym to `closed`. If [both a `state` and a `position` template](#combining-state-and-position-templates) are specified, only `opening` and `closing` derive from the `state` template. If the template produces a `None` value the state is set to `unknown`.
      required: false
      type: template
    stop_cover:
      description: Defines an action to stop the cover.
      required: false
      type: action
    tilt:
      description: Defines a template to get the tilt state of the cover. Legal values are numbers between `0` (closed) and `100` (open). If the template produces a `None` value, the current tilt state is set to `unknown`.
      required: false
      type: template
    tilt_optimistic:
      description: Force cover tilt position to use [optimistic mode](#cover-optimistic-mode).
      required: false
      type: boolean
      default: false

{% endconfiguration %}

### Cover Optimistic Mode

In optimistic mode, the cover position state is maintained internally. This mode is automatically enabled if neither `state` or `position` are specified. Note that this is unlikely to be very reliable without some feedback mechanism, since there is otherwise no way to know if the cover is moving properly. The cover can be forced into optimistic mode by using the `optimistic` attribute. There is an equivalent mode for `tilt_position` that is enabled when `tilt` is not specified or when the `tilt_optimistic` attribute is used.

### Combining `state` and `position` templates

If both a `state` and a `position` are specified, only `opening` and `closing` states are set directly from the `state`. The `open` and `closed` states are instead derived from the cover position.

| value_template output | result                               |
| --------------------- | ------------------------------------ |
| open                  | state defined by `position_template` |
| closed                | state defined by `position_template` |
| true                  | state defined by `position_template` |
| false                 | state defined by `position_template` |
| opening               | state set to `opening`               |
| closing               | state set to `closing`               |
| <any other output>    | No change of state or position       |

### State based cover - Garage Door

This example converts a garage door with a controllable switch and position sensor into a cover. The condition check is optional, but suggested if you use the same switch to open and close the garage.

```yaml
template:
  - cover:
      - name: Garage Door
        device_class: garage
        position: "{{ states('sensor.garage_door') }}"
        open_cover:
          - condition: state
            entity_id: sensor.garage_door
            state: "off"
          - action: switch.turn_on
            target:
              entity_id: switch.garage_door
        close_cover:
          - condition: state
            entity_id: sensor.garage_door
            state: "on"
          - action: switch.turn_off
            target:
              entity_id: switch.garage_door
        stop_cover:
          action: switch.turn_on
          target:
            entity_id: switch.garage_door
        icon: >-
          {% if states('sensor.garage_door') | float > 0 %}
            mdi:garage-open
          {% else %}
            mdi:garage
          {% endif %}
```

### State based cover - Optimistic Garage Door with Momentary Switch

This example converts a garage door with a momentary switch.

```yaml
template:
  - cover:
      - name: Garage Door
        device_class: garage
        open_cover:
          - action: switch.turn_on
            target:
              entity_id: switch.garage_door
        close_cover:
          - action: switch.turn_on
            target:
              entity_id: switch.garage_door
        stop_cover:
          - action: switch.turn_on
            target:
              entity_id: switch.garage_door
```

## Device tracker

The template device_tracker platform allows you to create device_tracker entities with templates for `latitude` and `longitude` to define the state. The state of the device_tracker is determined by the location (`latitude` and `longitude`). When the location is inside the Home zone, the state will be `home`. When the location is inside any other zone, the state will be the zone's name. When the location is not inside any zone, the state will be `not_home`.

```yaml
# Example state-based configuration.yaml entry
template:
  - device_tracker:
      - name: Car Location
        latitude: "{{ states('sensor.latitude') }}"
        longitude: "{{ states('sensor.longitude') }}"
```

```yaml
# Example trigger-based configuration.yaml entry
template:
  - triggers:
    - trigger: webhook
      webhook_id: my_car_location
    device_tracker:
      - name: Car Location
        latitude: "{{ trigger.json.latitude }}"
        longitude: "{{ trigger.json.longitude }}"
        location_accuracy: "{{ trigger.json.resolution }}"
```

{% configuration device_tracker %}
device_tracker:
  description: List of device trackers
  required: true
  type: map
  keys:
    attributes:
      description: >
        Defines templates for attributes of the entity. The following attributes are not allowed inside the attributes map: `tracking_type`, `source_type`, `in_zones`, `latitude`, `longitude`, and `gps_accuracy`.
      required: false
      type: map
      keys:
        "attribute: template":
          description: The attribute and corresponding template.
          required: true
          type: template
    in_zones:
      description: Defines a template for a list of zones for the device_tracker. The list must contain `zone` entity IDs. The list of zones has a lower priority than `latitude` and `longitude`. If the `in_zones` template is omitted, `latitude` and `longitude` are required.
      required: false
      type: template
    latitude:
      description: Defines a template for the device_trackers latitude. Legal values are numbers between `-90` and `90`. If the template produces a `None` value, the state is set to `unknown`. If `latitude` and `longitude` are omitted, `in_zones` is required.
      required: false
      type: template
    location_accuracy:
      description: Defines a template for the device_trackers location accuracy in meters.
      required: false
      type: template
    longitude:
      description: Defines a template for the device_trackers longitude. Legal values are numbers between `-180` and `180`. If the template produces a `None` value, the state is set to `unknown`. If `latitude` and `longitude` are omitted, `in_zones` is required.
      required: false
      type: template

{% endconfiguration %}

## Event

The template event platform allows you to create events with templates to define the state.

```yaml
# Example state-based configuration.yaml entry
template:
  - event:
      - name: Scene Controller
        device_class: button
        event_type: "{{ states('input_select.scene_controller_button_press') }}"
        event_types: "{{ ['single', 'double', 'hold'] }}"
```

```yaml
# Example trigger-based configuration.yaml entry
template:
  - triggers:
      - trigger: event
        event_type: zwave_js_notification
        event_data:
          node_id: 14
    event:
      - name: Lock Operation
        event_type: "{{ trigger.event.data.event_label }}"
        event_types: "{{ ['Keypad lock operation', 'Keypad unlock operation'] }}"
```

{% configuration event %}
event:
  description: List of events
  required: true
  type: map
  keys:
    device_class:
      description: Sets the [class of the device](/integrations/event/), changing the device state and icon that is displayed on the frontend.
      required: false
      type: string
    event_type:
      description: Template for the event's last fired event type.
      required: true
      type: template
    event_types:
      description: Template for the event's available event types.
      required: true
      type: template

{% endconfiguration %}

## Fan

The template fan platform allows you to create fans with templates to define the state and scripts to define each action.

Fan entities can be created from the frontend in the Helpers section or via YAML.

```yaml
# Example state-based configuration.yaml entry
template:
  - fan:
      - name: "Bedroom fan"
        state: "{{ states('input_boolean.state') }}"
        percentage: "{{ states('input_number.percentage') }}"
        preset_mode: "{{ states('input_select.preset_mode') }}"
        oscillating: "{{ states('input_select.osc') }}"
        direction: "{{ states('input_select.direction') }}"
        turn_on:
          action: script.fan_on
        turn_off:
          action: script.fan_off
        set_percentage:
          action: script.fans_set_speed
          data:
            percentage: "{{ percentage }}"
        set_preset_mode:
          action: script.fans_set_preset_mode
          data:
            preset_mode: "{{ preset_mode }}"
        set_oscillating:
          action: script.fan_oscillating
          data:
            oscillating: "{{ oscillating }}"
        set_direction:
          action: script.fan_direction
          data:
            direction: "{{ direction }}"
        speed_count: 6
        preset_modes:
          - 'auto'
          - 'smart'
          - 'whoosh'
```

```yaml
# Example trigger-based configuration.yaml entry
template:
  - triggers:
      - trigger: state
        entity_id:
          - input_boolean.state
          - input_number.percentage
          - input_select.preset_mode
          - input_select.osc
          - input_select.direction
    fan:
      - name: "Bedroom fan"
        state: "{{ states('input_boolean.state') }}"
        percentage: "{{ states('input_number.percentage') }}"
        preset_mode: "{{ states('input_select.preset_mode') }}"
        oscillating: "{{ states('input_select.osc') }}"
        direction: "{{ states('input_select.direction') }}"
        turn_on:
          action: script.fan_on
        turn_off:
          action: script.fan_off
        set_percentage:
          action: script.fans_set_speed
          data:
            percentage: "{{ percentage }}"
        set_preset_mode:
          action: script.fans_set_preset_mode
          data:
            preset_mode: "{{ preset_mode }}"
        set_oscillating:
          action: script.fan_oscillating
          data:
            oscillating: "{{ oscillating }}"
        set_direction:
          action: script.fan_direction
          data:
            direction: "{{ direction }}"
        speed_count: 6
        preset_modes:
          - 'auto'
          - 'smart'
          - 'whoosh'
```

{% configuration fan %}
fan:
  description: List of fans
  required: true
  type: map
  keys:
    attributes:
      description: >
        Defines templates for attributes of the entity. The following attributes are not allowed inside the attributes map: `preset_mode`, `preset_modes`, `direction`, `oscillating`, `percentage`, and `percentage_step`.
      required: false
      type: map
      keys:
        "attribute: template":
          description: The attribute and corresponding template.
          required: true
          type: template
    direction:
      description: "Defines a template to get the direction of the fan. Valid values: `forward`, `reverse`."
      required: false
      type: template
    optimistic:
      description: Flag that defines if the fan works in optimistic mode. When enabled, the fan's state updates immediately when a new option is chosen through the UI or actions, without waiting for the template defined in `state` to update. When disabled (default), the fan updates only when the `state` template returns a new value.
      required: false
      type: boolean
      default: false
    oscillating:
      description: "Defines a template to get the oscillation state of the fan. The fan is oscillating if the template evaluates to `1`, `true`, `yes`, `on`, or `enable`.  The fan is not oscillating if the template evaluates to `0`, `false`, `no`, `off`, or `disable`."
      required: false
      type: template
    percentage:
      description: Defines a template to get the speed percentage of the fan.
      required: false
      type: template
    preset_mode:
      description: Defines a template to get the preset mode of the fan.
      required: false
      type: template
    preset_modes:
      description: List of preset modes the fan is capable of. This is an arbitrary list of strings and must not contain any speeds.
      required: false
      type: [string, list]
      default: []
    set_percentage:
      description: Defines an action to run when the fan is given a speed percentage command.
      required: false
      type: action
    set_preset_mode:
      description: Defines an action to run when the fan is given a preset command.
      required: false
      type: action
    set_oscillating:
      description: Defines an action to run when the fan is given an oscillation state command.
      required: false
      type: action
    set_direction:
      description: Defines an action to run when the fan is given a direction command.
      required: false
      type: action
    speed_count:
      description: The number of speeds the fan supports. Used to calculate the percentage step for the `fan.increase_speed` and `fan.decrease_speed` actions.
      required: false
      type: integer
      default: 100
    state:
      description: "Defines a template to get the state of the fan. The fan is `on` if the template evaluates to `1`, `true`, `yes`, `on`, or `enable`.  The fan is `off` if the template evaluates to `0`, `false`, `no`, `off`, or `disable`. The fan is `unknown` if the template evaluates as `None`."
      required: true
      type: template
    turn_on:
      description: Defines an action to run when the fan is turned on.
      required: true
      type: action
    turn_off:
      description: Defines an action to run when the fan is turned off.
      required: true
      type: action

{% endconfiguration %}

### Converting from speeds to percentage

When converting a fan with 3 speeds from the old fan entity model, the following percentages can be used:

0 - `off`
33 - `low`
66 - `medium`
100 - `high`

### State based fan - Helper fan

This example uses an input_boolean and an input_number to mimic a fan, and the example shows multiple actions for `set_percentage`.

```yaml
template:
  - fan:
      - name: "Helper Fan"
        state: "{{ states('input_boolean.state') }}"
        turn_on:
          - action: input_boolean.turn_on
            target:
              entity_id: input_boolean.state
        turn_off:
          - action: input_boolean.turn_off
            target:
              entity_id: input_boolean.state
        speed_count: 6
        percentage: >
          {{ states('input_number.percentage') if is_state('input_boolean.state', 'on') else 0 }}
        set_percentage:
          - action: input_boolean.turn_{{ 'on' if percentage > 0 else 'off' }}
            target:
              entity_id: input_boolean.state
          - action: input_number.set_value
            target:
              entity_id: input_number.percentage
            data:
              value: "{{ percentage }}"
```

### State based fan - Fan with preset modes

This example uses an existing fan with only a percentage. It extends the percentage value into usable preset modes without a helper entity.

```yaml
template:
  - fan:
      - name: "Preset Mode Fan Example"
        state: "{{ states('fan.percentage_fan') }}"
        turn_on:
          - action: fan.turn_on
            target:
              entity_id: fan.percentage_fan
        turn_off:
          - action: fan.turn_off
            target:
              entity_id: fan.percentage_fan
        percentage: >
          {{ state_attr('fan.percentage_fan', 'percentage') }}
        speed_count: 3
        set_percentage:
          - action: fan.set_percentage
            target:
              entity_id: fan.percentage_fan
            data:
              percentage: "{{ percentage }}"
        preset_modes:
          - "off"
          - "low"
          - "medium"
          - "high"
        preset_mode: >
          {% if is_state('fan.percentage_fan', 'on') %}
            {% if state_attr('fan.percentage_fan', 'percentage') == 100  %}
              high
            {% elif state_attr('fan.percentage_fan', 'percentage') == 66 %}
              medium
            {% else %}
              low
            {% endif %}
          {% else %}
            off
          {% endif %}
        set_preset_mode:
          - action: fan.set_percentage
            target:
              entity_id: fan.percentage_fan
            data:
              percentage: >-
                {% if preset_mode == 'high' %}
                  100
                {% elif preset_mode == 'medium' %}
                  66
                {% elif preset_mode == 'low' %}
                  33
                {% else %}
                  0
                {% endif %}
```

## Image

The template image platform allows you to create image entities with templates to define the image URL.

Image entities can be created from the frontend in the Helpers section or via YAML.

```yaml
# Example state-based configuration.yaml entry
template:
  - image:
      - name: "My Image"
        url: "http://example.com/image.jpg"
```

```yaml
# Example trigger-based configuration.yaml entry
template:
  - triggers:
      - trigger: state
        entity_id:
          - input_boolean.state
    image:
      - name: "My Image"
        url: >
          {% if is_state('input_boolean.state', 'on') %}
            http://example.com/image_on.jpg
          {% else %}
            http://example.com/image_off.jpg
          {% endif %}
```

{% configuration image %}
image:
  description: List of images
  required: true
  type: map
  keys:
    attributes:
      description: Defines templates for attributes of the entity. The `access_token` attribute is not allow inside attributes map.
      required: false
      type: map
      keys:
        "attribute: template":
          description: The attribute and corresponding template.
          required: true
          type: template
    url:
      description: The URL on which the image is served.
      required: true
      type: template
    verify_ssl:
      description: Enable or disable SSL certificate verification. Set to false to use an http-only URL, or you have a self-signed SSL certificate and haven't installed the CA certificate to enable verification.
      required: false
      type: boolean
      default: true
{% endconfiguration %}

### Using locally hosted images

You can also use images hosted locally in the `www` folder (see [Hosting files](/integrations/http/#hosting-files)). The `url` value must be a full URL (it needs to start with `http://` or `https://`), so `/local/...` on its own is not supported. For example, if your image is stored at `/config/www/test.png`, set `url` to `http://homeassistant.local:8123/local/test.png` or `http://192.168.1.10:8123/local/test.png`, depending on how Home Assistant is configured and the local IP address.


## Light

The template light platform allows you to create lights with templates to define the state and scripts to define each action.

Light entities can be created from the frontend in the Helpers section or via YAML.

```yaml
# Example state-based configuration.yaml entry
template:
  - light:
      - name: "Theater Lights"
        level: "{{ state_attr('sensor.theater_brightness', 'lux') | int }}"
        state: "{{ state_attr('sensor.theater_brightness', 'lux') | int > 0 }}"
        temperature: "{{states('input_number.temperature_input') | int}}"
        hs: "({{states('input_number.h_input') | int}}, {{states('input_number.s_input') | int}})"
        effect_list: "{{ state_attr('light.led_strip', 'effect_list') }}"
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
        supports_transition: "{{ true }}"
```

```yaml
# Example trigger-based configuration.yaml entry
template:
  - triggers:
      - trigger: state
        entity_id:
        - sensor.theater_brightness
        - input_number.temperature_input
        - input_number.h_input
        - input_number.s_input
        - light.led_strip
    light:
      - name: "Theater Lights"
        level: "{{ state_attr('sensor.theater_brightness', 'lux') | int }}"
        state: "{{ state_attr('sensor.theater_brightness', 'lux') | int > 0 }}"
        temperature: "{{states('input_number.temperature_input') | int}}"
        hs: "({{states('input_number.h_input') | int}}, {{states('input_number.s_input') | int}})"
        effect_list: "{{ state_attr('light.led_strip', 'effect_list') }}"
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
        supports_transition: "{{ true }}"
```

### Wrapping WLED presets as light effects

This example creates a template light that wraps an RGBW WLED device and exposes its saved presets (predefined combinations of effects, colors, and brightness stored on the device) as selectable effects directly in the light entity. This is useful if you prefer to pick presets from the effects list in a light card on your dashboard, without having to use a separate select entity.

The template light mirrors the state, brightness, and RGBW color of the underlying WLED light entity. Selecting an effect sends the matching preset name to the WLED preset select entity.

```yaml
template:
  - light:
      - name: "WLED bedroom with presets"
        unique_id: wled_preset_light
        state: "{{ states('light.wled_bedroom') }}"
        level: "{{ state_attr('light.wled_bedroom', 'brightness') | default(0, true) | int }}"
        rgbw: "{{ state_attr('light.wled_bedroom', 'rgbw_color') }}"
        effect_list: "{{ state_attr('select.wled_bedroom_preset', 'options') }}"
        effect: "{{ states('select.wled_bedroom_preset') }}"
        availability: "{{ not is_state('light.wled_bedroom', 'unavailable') }}"
        turn_on:
          action: light.turn_on
          target:
            entity_id: light.wled_bedroom
        turn_off:
          action: light.turn_off
          target:
            entity_id: light.wled_bedroom
        set_level:
          action: light.turn_on
          target:
            entity_id: light.wled_bedroom
          data:
            brightness: "{{ brightness }}"
        set_rgbw:
          action: light.turn_on
          target:
            entity_id: light.wled_bedroom
          data:
            rgbw_color: "{{ rgbw }}"
            effect: "Solid"
        set_effect:
          action: select.select_option
          target:
            entity_id: select.wled_bedroom_preset
          data:
            option: "{{ effect }}"
```

{% configuration light %}
light:
  description: List of your lights.
  required: true
  type: map
  keys:
    attributes:
      description: >
        Defines templates for attributes of the entity. The following attributes are not allowed inside the attributes map: `min_color_temp_kelvin`, `max_color_temp_kelvin`, `effect_list`, `effect`, `supported_color_modes`, `color_mode`, `brightness`, `color_temp_kelvin`, `hs_color`, `rgb_color`, `xy_color`, `rgbw_color`, and `rgbww_color`.
      required: false
      type: map
      keys:
        "attribute: template":
          description: The attribute and corresponding template.
          required: true
          type: template
    effect:
      description: Defines a template to get the effect of the light.
      required: inclusive
      type: template
      default: optimistic
    effect_list:
      description: Defines a template to get the list of supported effects. Must render a list.
      required: inclusive
      type: template
      default: optimistic
    hs:
      description: Defines a template to get the HS color of the light. Must render a tuple (hue, saturation).
      required: false
      type: template
      default: optimistic
    level:
      description: Defines a template to get the brightness of the light.
      required: false
      type: template
      default: optimistic
    min_mireds:
      description: Defines a template to get the minimum mired value of the light.
      required: false
      type: template
      default: optimistic
    max_mireds:
      description: Defines a template to get the maximum mired value of the light.
      required: false
      type: template
      default: optimistic
    optimistic:
      description: Flag that defines if the light works in optimistic mode. When enabled, the light's state updates immediately when a new option is chosen through the UI or actions, without waiting for the template defined in `state` to update. When disabled (default), the light updates only when the `state` template returns a new value.
      required: false
      type: boolean
      default: false
    rgb:
      description: Defines a template to get the RGB color of the light. Must render a tuple or a list (red, green, blue).
      required: false
      type: template
      default: optimistic
    rgbw:
      description: Defines a template to get the RGBW color of the light. Must render a tuple or a list (red, green, blue, white).
      required: false
      type: template
      default: optimistic
    rgbww:
      description: Defines a template to get the RGBWW color of the light. Must render a tuple or a list (red, green, blue, cold white, warm white).
      required: false
      type: template
      default: optimistic
    set_effect:
      description: Defines a set of actions (script) to run when the light is given an effect command. The script executes only if the light is turned on with an `effect`. The `set_effect` script receives the variable `effect`. It may also receive variables `brightness`, `brightness_pct`, and/or `transition`.
      required: inclusive
      type: action
    set_level:
      description: "Defines a set of actions (script) to run when the light is asked to change its brightness. This script runs only when `light.turn_on` is called with a brightness value (`brightness` or `brightness_pct`) and no color, color temperature, or effect parameter. When it runs, it receives the variable `brightness` (a value between 0 and 255), `brightness_pct` (a value between 0 and 100), and also `transition` if that was part of the call and `supports_transition` is `true`. If brightness is combined with a color, color temperature, or effect, the matching color, temperature, or effect script runs instead and receives the brightness value as a variable."
      required: false
      type: action
    set_temperature:
      description: Defines a set of actions (script) to run when the light is given a color temperature command. The script executes only if the light is turned on with a `color_temp` or `color_temp_kelvin`. The script receives the variables `color_temp` and `color_temp_kelvin`, and may also receive variables `brightness`, `brightness_pct`, and/or `transition`.
      required: false
      type: action
    set_hs:
      description: Defines a set of actions (script) to run when the light is given a hs color command. The script executes only if the light is turned on with an `hs_color`.  The script receives the variables `hs` as a tuple, `h`, and `s`, and may also receive variables `brightness`, `brightness_pct`, and/or `transition`.
      required: false
      type: action
    set_rgb:
      description: Defines a set of actions (script) to run when the light is given an RGB color command. The script executes only if the light is turned on with an `rgb_color`.  The script receives the variables `rgb` as a tuple, `r`, `g`, and `b`, and may also receive `brightness`, `brightness_pct`, and/or `transition`.
      required: false
      type: action
    set_rgbw:
      description: Defines a set of actions (script) to run when the light is given an RGBW color command. The script executes only if the light is turned on with `rgbw_color`.  The script receives the variables `rgbw` and `rgb` as tuples, `r`, `g`, `b`, and `w`, and may also receive `brightness`, `brightness_pct`, and/or `transition`.
      required: false
      type: action
    set_rgbww:
      description: Defines a set of actions (script) to run when the light is given an RGBWW color command. The script executes only if the light is turned on with a `rgbww_color`.  The script receives the variables `rgbww` and `rgb` as tuples, `r`, `g`, `b`, `cw`, and `ww`, and may also receive `brightness`, `brightness_pct`, and/or `transition`.
      required: false
      type: action
    set_xy:
      description: Defines a set of actions (script) to run when the light is given an XY color command. The script executes only if the light is turned on with an `xy_color`.  The script receives the variables `xy` as a tuple, `x` and `y`, and may also receive `brightness`, `brightness_pct`, and/or `transition`.
      required: false
      type: action
    state:
      description: Defines a template to set the state of the light. If not defined, the light optimistically assumes all commands are successful. The light is `on` if the template evaluates to `1`, `true`, `yes`, `on`, or `enable`.  The light is `off` if the template evaluates to `0`, `false`, `no`, `off`, or `disable`. The light is `unknown` if the template evaluates as `None`.
      required: false
      type: template
      default: optimistic
    supports_transition:
      description: Defines a template to get if the light supports transition. Should return a boolean value (True/False). If this value is `True`, the transition parameter in a `turn on` or `turn off` call is passed as a named parameter `transition` in either of the scripts.
      required: false
      type: template
      default: false
    temperature:
      description: Defines a template to get the color temperature of the light. The template must return the color temperature in mireds. If you are using a `color_temp_kelvin` attribute from another source, convert the value to mireds by dividing 1000000 by the `color_temp_kelvin` result.
      required: false
      type: template
      default: optimistic
    turn_on:
      description: Defines an action to run when the light is turned on. May receive the variables `brightness` and/or `transition`.
      required: true
      type: action
    turn_off:
      description: Defines an action to run when the light is turned off. May receive the variable `transition`.
      required: true
      type: action
    xy:
      description: Defines a template to get the XY color of the light. Must render a tuple or a list (X, Y).
      required: false
      type: template
      default: optimistic

{% endconfiguration %}

### Light considerations

When `light.turn_on` is called, Home Assistant selects exactly one script to run based on the parameters included in the call. The first match in the following order wins:

1. `color_temp_kelvin` (or `color_temp`) is provided and `set_temperature` is defined.
2. `effect` is provided and `set_effect` is defined.
3. `hs_color` is provided and `set_hs` is defined.
4. `rgbww_color` is provided and `set_rgbww` is defined.
5. `rgbw_color` is provided and `set_rgbw` is defined.
6. `rgb_color` is provided and `set_rgb` is defined.
7. `brightness` (or `brightness_pct`) is provided and `set_level` is defined.
8. `rgb_color` is provided and `set_rgb` is defined.
9. `xy_color` is provided and `set_xy` is defined.
10. `brightness` (or `brightness_pct`) is provided and `set_level` is defined.
11. None of the above match, and `turn_on` is called.

Whichever script is selected, it also receives `brightness` as a variable when the call included brightness, and `transition` as a variable when the call included transition and `supports_transition` is `true`. For example, when you turn a light on with a color and a brightness at the same time, the relevant color script runs (not `set_level`), and it can still use the `brightness` variable.

There is no separate script for transitions. The `transition` value is passed as a variable to whichever script is selected, including `turn_off`.

### State based light - Theater Volume Control

This example shows a light that is actually a home theater's volume. This
integration gives you the flexibility to provide whatever you'd like to send as
the payload to the consumer including any scale conversions you may need to
make; the [media player integration](/integrations/media_player/) needs a floating
point percentage value from `0.0` to `1.0`.

```yaml
# Example configuration.yaml entry
template:
  - light:
      - name: Receiver Volume
        state: >-
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
            volume_level: "{{ (brightness / 255 * 100) | int / 100 }}"
        level: >-
          {% if is_state('media_player.receiver', 'on') %}
            {{ (state_attr('media_player.receiver', 'volume_level') | float * 255) | int }}
          {% else %}
            0
          {% endif %}
```

### State based light - Make a global light entity for a multi-segment WLED light

This example shows how to group together 2 RGBW segments from the same WLED controller into a single usable light.

```yaml
template:
  - light:
        unique_id: 28208f257b54c44e50deb2d618d44710
        name: Multi-segment Wled control
        state: "{{ states('light.wled_master') }}"
        level: "{{ state_attr('light.wled_master', 'brightness') | d(0,true) | int }}"
        rgbw: (
          {{ (state_attr('light.wled_segment_0', 'rgbw_color')[0] | d(0) + state_attr('light.wled_segment_1', 'rgbw_color')[0] | d(0))/2 }},
          {{ (state_attr('light.wled_segment_0', 'rgbw_color')[1] | d(0) + state_attr('light.wled_segment_1', 'rgbw_color')[1] | d(0))/2 }},
          {{ (state_attr('light.wled_segment_0', 'rgbw_color')[2] | d(0) + state_attr('light.wled_segment_1', 'rgbw_color')[2] | d(0))/2 }},
          {{ (state_attr('light.wled_segment_0', 'rgbw_color')[3] | d(0) + state_attr('light.wled_segment_1', 'rgbw_color')[3] | d(0))/2 }}
          )
        effect_list: "{{ state_attr('light.wled_segment_0', 'effect_list') }}"
        effect: "{{ state_attr('light.wled_segment_0', 'effect') if state_attr('light.wled_segment_0', 'effect') == state_attr('light.wled_segment_1', 'effect') else none }}"
        availability: "{{ not is_state('light.wled_master', 'unknown') }}"

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

## Lock

The template lock platform allows you to create locks with templates to define the state and scripts to define each action.

Lock entities can be created from the frontend in the Helpers section or via YAML.

```yaml
# Example state-based configuration.yaml entry
template:
  - lock:
      - name: Garage door
        state: "{{ is_state('sensor.door', 'on') }}"
        lock:
          action: switch.turn_on
          target:
            entity_id: switch.door
        unlock:
          action: switch.turn_off
          target:
            entity_id: switch.door
```

```yaml
# Example trigger-based configuration.yaml entry
template:
  - triggers:
      - trigger: state
        entity_id: sensor.door
    lock:
      - name: Garage door
        state: "{{ trigger.to_state.state == 'on' }}"
        lock:
          action: switch.turn_on
          target:
            entity_id: switch.door
        unlock:
          action: switch.turn_off
          target:
            entity_id: switch.door
```

{% configuration lock %}
lock:
  description: List of locks
  required: true
  type: map
  keys:
    attributes:
      description: >
        Defines templates for attributes of the entity. The following attributes are not allowed inside the attributes map: `changed_by` and `code_format`.
      required: false
      type: map
      keys:
        "attribute: template":
          description: The attribute and corresponding template.
          required: true
          type: template
    code_format:
      description: Defines a template to get the `code_format` attribute of the entity. This template must evaluate to a valid [Python regular expression](https://docs.python.org/3/library/re.html#regular-expression-syntax) or `None`. If it evaluates to a not-`None` value, you are prompted to enter a code when interacting with the lock. The code is matched against the regular expression, and the lock/unlock actions are executed only if they match. The actual _validity_ of the entered code must be verified within these actions. If there's a syntax error in the template, the entity is `unavailable`. If the template fails to render for other reasons or if the regular expression is invalid, no code is accepted, and the lock/unlock actions are never be invoked.
      required: false
      type: template
      default: None
    lock:
      description: Defines an action to run when the lock is locked.
      required: true
      type: action
    open:
      description: Defines an action to run when the lock is opened.
      required: false
      type: action
    optimistic:
      description: Flag that defines if the lock works in optimistic mode. When enabled, the lock's state updates immediately when a new option is chosen through the UI or actions, without waiting for the template defined in `state` to update. When disabled (default), the lock updates only when the `state` template returns a new value.
      required: false
      type: boolean
      default: false
    state:
      description: Defines a template to set the state of the lock. Valid output values from the template are `locked`, `unlocked`, `open`, `locking`, `unlocking`, `opening`, and `jammed`, which are directly mapped to the corresponding states. In addition,  `1`, `true`, `yes`, `on`, and `enable` are valid as synonyms to `locked` while `0`, `false`, `no`, `off`, and `disable` are valid as synonyms to `unlocked`. If the template produces a `None` value, the state is set to `unknown`.
      required: false
      default: optimistic
      type: template
    unlock:
      description: Defines an action to run when the lock is unlocked.
      required: true
      type: action
{% endconfiguration %}

### State based lock - Lock from a switch

This example shows a lock that copies data from a switch.

```yaml
template:
  - lock:
      - name: Garage Door
        state: "{{ is_state('switch.source', 'on') }}"
        lock:
          action: switch.turn_on
          target:
            entity_id: switch.source
        unlock:
          action: switch.turn_off
          target:
            entity_id: switch.source
```

### State based lock - Optimistic mode

This example shows a lock in optimistic mode. This lock immediately changes state after command and does not wait for state updates from the sensor.

```yaml
template:
  - lock:
      - name: Garage Door
        state: "{{ is_state('sensor.skylight.state', 'on') }}"
        optimistic: true
        lock:
          action: switch.turn_on
          target:
            entity_id: switch.source
        unlock:
          action: switch.turn_off
          target:
            entity_id: switch.source
```

### State based lock - Sensor and Two Switches

This example shows a lock that takes its state from a sensor, and uses two momentary switches to control a device.

```yaml
template:
  - lock:
      - name: Garage Door
        state: "{{ is_state('sensor.skylight.state', 'on') }}"
        lock:
          action: switch.turn_on
          target:
            entity_id: switch.skylight_open
        unlock:
          action: switch.turn_on
          target:
            entity_id: switch.skylight_close
```

### State based lock - Secret code

This example shows a lock that copies data from a switch. It needs a PIN code defined as a [secret](/docs/configuration/secrets) to unlock and no code to lock. Note that the actual validity check of the code is part of the `unlock` action and should always happen there or in scripts called from these actions. In this way, you can not only perform code checks against static values, but also dynamic ones (for instance, TOTPs).

```yaml
template:
  - lock:
      - name: Garage Door
        state: "{{ is_state('switch.source', 'on') }}"
        code_format: "{{ '\\d{4}' if is_state('switch.source', 'on') else None }}"
        lock:
          - action: switch.turn_on
            target:
              entity_id: switch.source
        unlock:
          - variables:
              pin: !secret garage_door_pin
          - condition: "{{ code | int == pin | int }}"
          - action: switch.turn_off
            target:
              entity_id: switch.source
```

In `secrets.yaml`:

```yaml
garage_door_pin: "1234"
```

## Number

The template number platform allows you to create number entities with templates to define the state and scripts to define each action.

Number entities can be created from the frontend in the Helpers section or via YAML.

```yaml
# Example state-based configuration.yaml entry
template:
  - number:
      - name: Desk Height
        unit_of_measurement: "in"
        state: "{{ states('sensor.desk_height') }}"
        set_value:
          - action: script.set_desk_height
            data:
              value: "{{ value }}"
        step: 0.5
        min: 1
        max: 24
        icon: mdi:ruler
```

```yaml
# Example trigger-based configuration.yaml entry
template:
  - triggers:
      - trigger: state
        entity_id: sensor.desk_height
    number:
      - name: Desk Height
        unit_of_measurement: "in"
        state: "{{ states('sensor.desk_height') }}"
        set_value:
          - action: script.set_desk_height
            data:
              value: "{{ value }}"
        step: 0.5
        min: 1
        max: 24
        icon: mdi:ruler
```

{% configuration number %}
number:
  description: List of numbers
  required: true
  type: map
  keys:
    attributes:
      description: >
        Defines templates for attributes of the entity. The following attributes are not allowed inside the attributes map: `min`, `max`, `step`, and `mode`.
      required: false
      type: map
      keys:
        "attribute: template":
          description: The attribute and corresponding template.
          required: true
          type: template
    max:
      description: Template for the number's maximum value.
      required: false
      type: template
      default: 100.0
    min:
      description: Template for the number's minimum value.
      required: false
      type: template
      default: 0.0
    optimistic:
      description: Flag that defines if the number works in optimistic mode. When enabled, the number's state updates immediately when changed through the UI or actions, without waiting for the template defined in `state` to update. When disabled (default), the number updates only when the `state` template returns a new value.
      required: false
      type: boolean
      default: false
    set_value:
      description: Defines actions to run when the number value changes. The variable `value` contains the number entered.
      required: true
      type: action
    state:
      description: Template for the number's current value. When omitted, the state is set to the `value` provided by the `set_value` action.
      required: false
      type: template
      default: optimistic
    unit_of_measurement:
      description: Defines the units of measurement of the number, if any.
      required: false
      type: string
      default: None
    step:
      description: Template for the number's increment/decrement step.
      required: false
      type: template
      default: 1.0

{% endconfiguration %}

### State based number - Changing the unit of measurement of another number

This example demonstrates the usage of a template number with a unit of measurement set to change a unit-less value of another number entity.

```yaml
template:
  - number:
      - name: "Cutting Height"
        unit_of_measurement: "cm"
        unique_id: automower_cutting_height
        state: "{{ states('number.automower_cutting_height_raw') | int(0) * 0.5 + 1.5 }}"
        set_value:
          - action: number.set_value
            target:
              entity_id: number.automower_cutting_height_raw
            data:
              value: "{{ (value - 1.5) * 2 }}"
        step: 0.5
        min: 2
        max: 6
        icon: mdi:ruler
```

## Select

The template select platform allows you to create select entities with templates to define the state and scripts to define each action.

Select entities can be created from the frontend in the Helpers section or via YAML.

```yaml
# Example state-based configuration.yaml entry
template:
  - select:
      - name: Camera Day-Night Mode
        state: "{{ state_attr('camera.porch', 'day_night_mode') }}"
        options: "{{ ['off', 'on', 'auto'] }}"
        select_option:
          - action: script.porch_camera_day_night_mode
            data:
              day_night_mode: "{{ option }}"
```

```yaml
# Example trigger-based configuration.yaml entry
template:
  - triggers:
      - trigger: state
        entity_id: camera.porch
        attribute: day_night_mode
    select:
      - name: Camera Day-Night Mode
        state: "{{ state_attr('camera.porch', 'day_night_mode') }}"
        options: "{{ ['off', 'on', 'auto'] }}"
        select_option:
          - action: script.porch_camera_day_night_mode
            data:
              day_night_mode: "{{ option }}"
```

{% configuration select %}
select:
  description: List of selects
  required: true
  type: map
  keys:
    attributes:
      description: Defines templates for attributes of the entity. The `options` attribute is not allow inside attributes map.
      required: false
      type: map
      keys:
        "attribute: template":
          description: The attribute and corresponding template.
          required: true
          type: template
    optimistic:
      description: Flag that defines if the select works in optimistic mode. When enabled, the select's state updates immediately when a new option is chosen through the UI or actions, without waiting for the template defined in `state` to update. When disabled (default), the select updates only when the `state` template returns a new value.
      required: false
      type: boolean
      default: false
    options:
      description: Template for the select's available options.
      required: true
      type: template
    select_option:
      description: Defines actions to run to select an option from the `options` list. The variable `option` contains the option selected.
      required: false
      type: action
    state:
      description: Template for the select's current value. When omitted, the state is set to the `option` provided by the `select_option` action.
      required: false
      type: template
      default: optimistic
{% endconfiguration %}

### State based select - Control Day/Night mode of a camera

This show how a state based template select can be used to perform an action.

```yaml
template:
  select:
    - name: "Porch Camera Day-Night Mode"
      unique_id: porch_camera_day_night_mode
      state: "{{ state_attr('camera.porch_camera_sd', 'day_night_mode') }}"
      options: "{{ ['off', 'on', 'auto'] }}"
      select_option:
        - action: tapo_control.set_day_night_mode
          data:
            day_night_mode: "{{ option }}"
          target:
            entity_id: camera.porch_camera_sd
```

## Sensor

The template sensor platform allows you to create sensors with templates to define the state and attributes.

Sensor entities can be created from the frontend in the Helpers section or via YAML.

```yaml
# Example state-based configuration.yaml entry
template:
  - sensor:
      - name: "Kettle"
        state: >
          {% if is_state('switch.kettle', 'off') %}
            off
          {% elif state_attr('switch.kettle', 'W') | float < 1000 %}
            standby
          {% elif is_state('switch.kettle', 'on') %}
            on
          {% else %}
            failed
          {% endif %}
```

```yaml
# Example trigger-based configuration.yaml entry
template:
  - triggers:
      - trigger: state
        entity_id: sensor.outside_temperature
        not_to:
        - unknown
        - unavailable
    sensor:
      - name: Outside Temperature
        device_class: temperature
        unit_of_measurement: °C
        state: "{{ (states('sensor.outside_temperature') | float - 32) * 5/9 }}"
```

{% configuration sensor %}
sensor:
  description: List of sensors
  required: true
  type: list
  keys:
    attributes:
      description: Defines templates for attributes of the entity.
      required: false
      type: map
      keys:
        "attribute: template":
          description: The attribute and corresponding template.
          required: true
          type: template
    last_reset:
      description: "Defines a template that describes when the state of the sensor was last reset. Must render to a valid `datetime`. Only available when `state_class` is set to `total`"
      required: false
      type: template
      default: None
    state:
      description: "Defines a template to get the state of the sensor. If the sensor is numeric, that is, it has a `state_class` or a `unit_of_measurement`, the state template must render to a number or to `none`. The state template must not render to a string, including `unknown` or `unavailable`. An `availability` template may be defined to suppress rendering of the state template."
      required: true
      type: template
    state_class:
      description: "The [state_class](https://developers.home-assistant.io/docs/core/entity/sensor#available-state-classes) of the sensor. This also displays the value based on the user profile number format setting and influences the graphical presentation in the history visualization as a continuous value. If you desire to include the sensor in {% term "Long-term statistics" %}, include this key and assign the appropriate value."
      required: false
      type: string
      default: None
    unit_of_measurement:
      description: "Defines the units of measurement of the sensor, if any. This also displays the value based on the user profile number format setting and influences the graphical presentation in the history visualization as a continuous value."
      required: false
      type: string
      default: None

{% endconfiguration %}

### State based sensor - Exposing sun angle

This example shows the sun angle in the frontend.

```yaml
template:
  - sensor:
      - name: Sun Angle
        unit_of_measurement: "°"
        state: "{{ '%+.1f' | format(state_attr('sun.sun', 'elevation')) }}"
```

### State based sensor - Modifying another sensor's output

If you don't like the wording of a sensor output, then the Template Sensor can help too. Let's rename the output of the [Sun integration](/integrations/sun/) as a simple example:

```yaml
template:
  - sensor:
      - name: "Sun State"
        state: >
          {% if is_state('sun.sun', 'above_horizon') %}
            up
          {% else %}
            down
          {% endif %}
```

### State based sensor - Changing the unit of measurement of another sensor

With a Template Sensor, it's easy to convert given values into others if the unit of measurement doesn't fit your needs.
Because the sensors do math on the source sensor's state and need to render to a numeric value, an availability template is used
to suppress rendering of the state template if the source sensor does not have a valid numeric state.

```yaml
template:
  - sensor:
      - name: "Transmission Down Speed"
        unit_of_measurement: "kB/s"
        state: "{{ states('sensor.transmission_down_speed') | float * 1024 }}"
        availability: "{{ is_number(states('sensor.transmission_down_speed')) }}"

      - name: "Transmission Up Speed"
        unit_of_measurement: "kB/s"
        state: "{{ states('sensor.transmission_up_speed') | float * 1024 }}"
        availability: "{{ is_number(states('sensor.transmission_up_speed')) }}"
```

### Trigger based sensor - Using conditions to control updates

This example shows how to store the last valid value of a temperature sensor. It updates as long as the source sensor has a valid (numeric) state. Otherwise, the template sensor's state remains unchanged.

```yaml
template:
  - triggers:
      trigger: state
      entity_id: sensor.outside_temperature
    conditions:
      - condition: template
        value_template: "{{ is_number(states('sensor.outside_temperature')) }}"
    sensor:
      - name: Outside Temperature last known value
        state: "{{ states('sensor.outside_temperature') }}"
```

This example shows how to filter negative and positive values from an existing sensor. The same trigger will conditionally update a sensor that contains the positive values and a sensor that contains the negative values.

```yaml
template:
  - triggers:
      trigger: state
      entity_id: sensor.source_value
    sensor:
      - name: Positive values
        conditions:
          - condition: numeric_state
            entity_id: sensor.source_value
            above: 0
        state: "{{ states('sensor.source_value') }}"

      - name: Negative values
        conditions:
          - condition: numeric_state
            entity_id: sensor.source_value
            below: 0
        state: "{{ states('sensor.source_value') | float | abs }}"
```

## Switch

The template switch platform allows you to create switches with templates to define the state and scripts to define each action.

Switch entities can be created from the frontend in the Helpers section or via YAML.

```yaml
# Example state-based configuration.yaml entry
template:
  - switch:
      - name: Skylight
        state: "{{ is_state('binary_sensor.skylight', 'on') }}"
        turn_on:
          action: switch.turn_on
          target:
            entity_id: switch.skylight_open
        turn_off:
          action: switch.turn_off
          target:
            entity_id: switch.skylight_close
```

```yaml
# Example trigger-based configuration.yaml entry
template:
  - triggers:
      - trigger: state
        entity_id: binary_sensor.skylight
    switch:
      - name: Skylight
        state: "{{ is_state('binary_sensor.skylight', 'on') }}"
        turn_on:
          action: switch.turn_on
          target:
            entity_id: switch.skylight_open
        turn_off:
          action: switch.turn_off
          target:
            entity_id: switch.skylight_close
```

{% configuration switch %}
switch:
  description: List of switches
  required: true
  type: map
  keys:
    attributes:
      description: Defines templates for attributes of the entity. The `device_class` attribute is not allow inside attributes map.
      required: false
      type: map
      keys:
        "attribute: template":
          description: The attribute and corresponding template.
          required: true
          type: template
    optimistic:
      description: Flag that defines if the switch works in optimistic mode. When enabled, the switch's state updates immediately when a new option is chosen through the UI or actions, without waiting for the template defined in `state` to update. When disabled (default), the switch updates only when the `state` template returns a new value.
      required: false
      type: boolean
      default: false
    state:
      description: Defines a template to set the state of the switch. If not defined, the switch optimistically assumes all commands are successful. The switch is `on` if the template evaluates to `1`, `true`, `yes`, `on`, or `enable`.  The switch is `off` if the template evaluates to `0`, `false`, `no`, `off`, or `disable`. The switch is `unknown` if the template evaluates as `None`.
      required: false
      type: template
      default: optimistic
    turn_off:
      description: Defines an action or list of actions to run when the switch is turned off.
      required: true
      type: action
    turn_on:
      description: Defines an action or list of actions to run when the switch is turned on.
      required: true
      type: action

{% endconfiguration %}

### State based switch - Invert a Switch

This example shows a switch that is the inverse of another switch.

```yaml
template:
  - switch:
      - state: "{{ not is_state('switch.target', 'on') }}"
        availability: "{{ has_value('switch.target') }}"
        turn_on:
          action: switch.turn_off
          target:
            entity_id: switch.target
        turn_off:
          action: switch.turn_on
          target:
            entity_id: switch.target
```

### State based switch - Toggle Switch

This example shows a switch that takes its state from a sensor and toggles a switch.

```yaml
template:
  - switch:
      - name: "Blind"
        state: "{{ is_state_attr('switch.blind_toggle', 'sensor_state', 'on') }}"
        turn_on:
          action: switch.toggle
          target:
            entity_id: switch.blind_toggle
        turn_off:
          action: switch.toggle
          target:
            entity_id: switch.blind_toggle
```

### State based switch - Sensor and Two Switches

This example shows a switch that takes its state from a sensor, and uses two
momentary switches to control a device.

```yaml
template:
  - switch:
      - name: "Skylight"
        value_template: "{{ is_state('sensor.skylight', 'on') }}"
        turn_on:
          action: switch.turn_on
          target:
            entity_id: switch.skylight_open
        turn_off:
          action: switch.turn_on
          target:
            entity_id: switch.skylight_close
```

### State based switch - Optimistic Switch

This example switch with an assumed state based on the actions performed. This switch immediately changes state after a `turn_on`/`turn_off` command.

```yaml
template:
  - switch:
      - name: "Blind"
        turn_on:
          action: switch.toggle
          target:
            entity_id: switch.blind_toggle
        turn_off:
          action: switch.toggle
          target:
            entity_id: switch.blind_toggle
```

## Update

The template update platform allows you to create update entities with templates to define the state and a script to define the install action.

Update entities can be created from the frontend in the Helpers section or via YAML.

```yaml
# Example state-based configuration.yaml entry
template:
  - update:
      - name: Frigate
        installed_version: "{{ states('sensor.installed_version') }}"
        latest_version: "{{ states('sensor.latest_version') }}"
        install:
          action: script.update_frigate
```

```yaml
# Example trigger-based configuration.yaml entry
template:
  - triggers:
      - trigger: time
        at: "00:00:00"
    update:
      - name: Frigate
        installed_version: "{{ states('sensor.installed_version') }}"
        latest_version: "{{ states('sensor.latest_version') }}"
        install:
          action: script.update_frigate
```

{% configuration update %}
update:
  description: List of update entities
  required: true
  type: map
  keys:
    attributes:
      description: >
        Defines templates for attributes of the entity. The following attributes are not allowed inside the attributes map: `auto_update`, `display_precision`, `installed_version`, `in_progress`, `latest_version`, `release_summary`, `release_url`, `skipped_version`, `title`, `update_percentage`, and `device_class`.
      required: false
      type: map
      keys:
        "attribute: template":
          description: The attribute and corresponding template.
          required: true
          type: template
    backup:
      default: false
      description: Enable or disable the `automatic backup before update` option in the update repair. When disabled, the `backup` variable always provides `False` during the `install` action, and it does not accept the `backup` option.
      required: false
      type: boolean
    device_class:
      description: Sets the class of the device, changing the device state and icon that is displayed on the UI.
      required: false
      type: device_class
      default: None
    in_progress:
      description: Defines a template to get the in-progress state.
      required: false
      type: template
    install:
      description: Defines actions to run when the update is installed. Receives variables `specific_version` and `backup` when enabled.
      required: false
      type: action
    installed_version:
      description: Defines a template to get the installed version. When the value of `installed_version` matches the value of `latest_version`, the update entity state is `on`.
      required: true
      type: template
    latest_version:
      description: Defines a template to get the latest version. When the value of `installed_version` matches the value of `latest_version`, the update entity state is `on`.
      required: true
      type: template
    release_summary:
      description: Defines a template to get the release summary.
      required: false
      type: template
    release_url:
      description: Defines a template to get the release URL.
      required: false
      type: template
    specific_version:
      default: false
      description: Enable or disable using the `version` variable with the `install` action. When disabled, the `specific_version` variable always provides `None` in the `install` actions.
      required: false
      type: boolean
    title:
      description: Defines a template to get the update title.
      required: false
      type: template
    update_percent:
      description: Defines a template to get the update completion percentage.
      required: false
      type: template
{% endconfiguration %}

## Vacuum

The template vacuum platform allows you to create vacuum entities with templates to define the state and scripts to define each action.

Vacuum entities can be created from the frontend in the Helpers section or via YAML.

```yaml
# Example state-based configuration.yaml entry
template:
  - vacuum:
      - name: Living Room Vacuum
        start:
          action: script.vacuum_start
```

```yaml
# Example trigger-based configuration.yaml entry
template:
  - triggers:
      - trigger: state
        entity_id: sensor.living_room_vacuum_state
    vacuum:
      - name: Living Room Vacuum
        state: "{{ states('sensor.living_room_vacuum_state') }}"
        start:
          action: script.vacuum_start
```

```yaml
# Example state-based configuration.yaml entry with segment cleaning
template:
  - vacuum:
      - name: Living Room Vacuum
        clean_segments:
          action: script.vacuum_start
          data:
            segment_ids: "{{ segment_ids }}"
        segments: >-
          {{ [
            {'id': '1', 'name': 'Kitchen'},
            {'id': '2', 'name': 'Living room', 'group': 'Upstairs'},
          ] }}
        start:
          action: script.vacuum_start
        unique_id: living_room_vacuum

```

{% configuration vacuum %}
vacuum:
  description: List of vacuum entities
  required: true
  type: map
  keys:
    attributes:
      description: Defines templates for attributes of the entity.
      required: false
      type: map
      keys:
        "attribute: template":
          description: The attribute and corresponding template.
          required: true
          type: template
    battery_level:
      description: "Defines a template to get the battery level of the vacuum. Legal values are numbers between `0` and `100`."
      required: false
      type: template
    clean_segments:
      description: Defines an action to run when the vacuum is given a clean area command. The action receives the `segment_ids` variable, which contains the list of selected area segment IDs. Requires `unique_id` and `segments`.
      required: inclusive
      type: action
    clean_spot:
      description: Defines an action to run when the vacuum is given a clean spot command.
      required: false
      type: action
    fan_speed:
      description: Defines a template to get the fan speed of the vacuum.
      required: false
      type: template
    fan_speeds:
      description: List of fan speeds supported by the vacuum.
      required: false
      type: [string, list]
    locate:
      description: Defines an action to run when the vacuum is given a locate command.
      required: false
      type: action
    optimistic:
      description: Flag that defines if the vacuum works in optimistic mode. When enabled, the vacuum's state updates immediately when a new option is chosen through the UI or actions, without waiting for the template defined in `state` to update. When disabled (default), the vacuum updates only when the `state` template returns a new value.
      required: false
      type: boolean
      default: false
    pause:
      description: Defines an action to run when the vacuum is paused.
      required: false
      type: action
    return_to_base:
      description: Defines an action to run when the vacuum is given a return to base command.
      required: false
      type: action
    segments:
      description: Defines a template to get the segments of the vacuum. Expects a list of dictionaries with keys `id`, `name`, and optional `group`. Requires `unique_id` and `clean_segments`.
      required: inclusive
      type: template
    set_fan_speed:
      description: Defines an action to run when the vacuum is given a command to set the fan speed.
      required: false
      type: action
    start:
      description: Defines an action to run when the vacuum is started.
      required: true
      type: action
    state:
      description: "Defines a template to get the state of the vacuum. Valid value: `docked`/`cleaning`/`idle`/`paused`/`returning`/`error`"
      required: false
      default: optimistic
      type: template
    stop:
      description: Defines an action to run when the vacuum is stopped.
      required: false
      type: action
{% endconfiguration %}

### State based vacuum - Control vacuum with Harmony Hub

This example shows how you can use a Template Vacuum to control an IR vacuum cleaner using the [Harmony Hub Remote integration](/integrations/harmony).

```yaml
vacuum:
  - platform: template
    vacuums:
      living_room_vacuum:
        start:
          - action: remote.send_command
            target:
              entity_id: remote.harmony_hub
            data:
              command: Clean
              device: 52840686
        return_to_base:
          - action: remote.send_command
            target:
              entity_id: remote.harmony_hub
            data:
              command: Home
              device: 52840686
        clean_spot:
          - action: remote.send_command
            target:
              entity_id: remote.harmony_hub
            data:
              command: SpotCleaning
              device: 52840686
```

### State based vacuum - Custom attributes

This example shows how to add custom attributes.

```yaml
vacuum:
  - platform: template
    vacuums:
      living_room_vacuum:
        value_template: "{{ states('sensor.vacuum_state') }}"
        battery_level_template: "{{ states('sensor.vacuum_battery_level') | int }}"
        fan_speed_template: "{{ states('sensor.vacuum_fan_speed') }}"
        attribute_templates:
          status: >-
            {% if (states('sensor.robot_vacuum_robot_cleaner_movement') == "after" and states('sensor.robot_vacuum_robot_cleaner_cleaning_mode') == "stop")  %}
              Charging to Resume
            {% elif states('sensor.robot_vacuum_robot_cleaner_cleaning_mode') == "auto" %}
              Cleaning
            {% else %}
              Charging
            {% endif %}
```

## Weather

The template weather platform allows you to create weather entities with templates to define the state and attributes.

State-based templates of weather entities can be created from the frontend in the helpers section or using YAML. Trigger-based weather templates can only be created via YAML.

```yaml
# Example state-based configuration.yaml entry
template:
  - weather:
      - name: "My Weather Station"
        condition: "{{ states('weather.my_region') }}"
        temperature: "{{ states('sensor.temperature') | float }}"
        temperature_unit: "°C"
        humidity: "{{ states('sensor.humidity') | float }}"
        forecast_daily: "{{ state_attr('weather.my_region', 'forecast_data') }}"
```

```yaml
# Example trigger-based configuration.yaml entry
template:
  - triggers:
      - trigger: state
        entity_id:
          - weather.my_region
          - sensor.temperature
          - sensor.humidity
    weather:
      - name: "My Weather Station"
        condition: "{{ states('weather.my_region') }}"
        temperature: "{{ states('sensor.temperature') | float }}"
        temperature_unit: "°C"
        humidity: "{{ states('sensor.humidity') | float }}"
        forecast_daily: "{{ state_attr('weather.my_region', 'forecast_data') }}"
```

{% configuration weather %}
weather:
  description: List of weather entities
  required: true
  type: map
  keys:
    apparent_temperature:
      description: The current apparent (feels-like) temperature.
      required: false
      type: template
    attributes:
      description: >
        Defines templates for attributes of the entity. The following attributes are not allowed inside the attributes map: `temperature`, `apparent_temperature`, `dew_point`, `temperature_unit`, `humidity`, `ozone`, `cloud_coverage`, `uv_index`, `pressure`, `pressure_unit`, `wind_bearing`, `wind_gust_speed`, `wind_speed`, `wind_speed_unit`, `visibility`, `visibility_unit`, and `precipitation_unit`.
      required: false
      type: map
      keys:
        "attribute: template":
          description: The attribute and corresponding template.
          required: true
          type: template
    cloud_coverage:
      description: The current cloud coverage.
      required: false
      type: template
    condition:
      description: The current weather condition.
      required: true
      type: template
    dew_point:
      description: The current dew point.
      required: false
      type: template
    forecast_daily:
      description: Daily forecast data.
      required: false
      type: template
    forecast_hourly:
      description: Hourly forecast data.
      required: false
      type: template
    forecast_twice_daily:
      description: Twice daily forecast data.
      required: false
      type: template
    humidity:
      description: The current humidity.
      required: true
      type: template
    ozone:
      description: The current ozone level.
      required: false
      type: template
    precipitation_unit:
      description: Unit for precipitation output. Valid options are km, mi, ft, m, cm, mm, in, yd.
      required: false
      type: string
    pressure:
      description: The current air pressure.
      required: false
      type: template
    pressure_unit:
      description: Unit for pressure_template output. Valid options are Pa, hPa, kPa, bar, cbar, mbar, mmHg, inHg, psi.
      required: false
      type: string
    temperature:
      description: The current temperature.
      required: true
      type: template
    temperature_unit:
      description: Unit for temperature_template output. Valid options are °C, °F, and K.
      required: false
      type: string
    uv_index:
      description: The current UV index.
      required: false
      type: template
    visibility:
      description: The current visibility.
      required: false
      type: template
    visibility_unit:
      description: Unit for visibility_template output. Valid options are km, mi, ft, m, cm, mm, in, yd.
      required: false
      type: string
    wind_gust_speed:
      description: The current wind gust speed.
      required: false
      type: template
    wind_speed:
      description: The current wind speed.
      required: false
      type: template
    wind_speed_unit:
      description: Unit for wind_speed_template output. Valid options are m/s, km/h, mph, mm/d, in/d, and in/h.
      required: false
      type: string
    wind_bearing:
      description: The current wind bearing.
      required: false
      type: template

{% endconfiguration %}

### Condition

The `condition` *must* match one of the Home Assistant defined conditions. See the [weather condition mapping](/integrations/weather/#condition-mapping). If it does not, the state will be 'unknown' so will not be usable in a dashboard.

### Weather Forecast data

The weather forecast options should return a list of dictionaries, where each dictionary contains [forecast information](/integrations/weather/#action-weatherget_forecasts) for the current timeframe. The data is slightly different for each forecast type: `hourly`, `daily`, and `twice_daily`.

#### Hourly Weather Forecast

The `hourly` forecast should contain 24 dictionaries, where each dictionary represents a specific hour within the next 24 hour period. The `hourly` data should start at the current hour and end 24 hours from that point. The `datetime` in each dictionary should represent the start of the hour in your local timezone.

#### Daily Weather Forecast

The `daily` forecast should contain dictionaries, where each dictionary represents a specific day within any desired timeframe. The `daily` data should start at midnight tonight and end on the last day of your desired timeframe, incrementing 1 day at a time. The `datetime` in each dictionary should represent midnight for each night in your local timezone.

#### Twice Daily Weather Forecast

The `twice_daily` forecast should contain dictionaries, where each dictionary represents a specific 12 hour period within any desired timeframe. The `twice_daily` should start at the closest 12 hour period and end on the last 12 hour period of your desired timeframe. The `datetime` in each dictionary should represent midnight or noon for each day in your local timezone. Keep in mind, `is_daytime` is mandatory in every dictionary output to `twice_daily` forecasts.

### Trigger based weather - Weather Forecast from response data

This example demonstrates how to use an `action` to call a [action with response data](/docs/scripts/perform-actions/#use-templates-to-handle-response-data)
and use the response in a template.

```yaml
template:
  - triggers:
      - trigger: time_pattern
        hours: /1
    actions:
      - action: weather.get_forecasts
        data:
          type: hourly
        target:
          entity_id: weather.home
        response_variable: hourly
    sensor:
      - name: Weather Forecast Hourly
        unique_id: weather_forecast_hourly
        state: "{{ now().isoformat() }}"
        attributes:
          forecast: "{{ hourly['weather.home'].forecast }}"
```

#### Video tutorial

This video tutorial explains how to set up a trigger based template that uses an action to retrieve the weather forecast (precipitation).

<lite-youtube videoid="zrWqDjaRBf0" videotitle="How to create Action Template Sensors in Home Assistant" posterquality="maxresdefault"></lite-youtube>

## Combining multiple template entities

The template integration allows defining multiple sections.

```yaml
# Example configuration.yaml entry with two sections
template:
  # Define state-based template entities
  - sensor:
      ...
  - binary_sensor:
      ...

  # Define trigger-based template entities
  - triggers:
      ...
    sensor:
      ...
    binary_sensor:
      ...
```

[trigger-doc]: /docs/automation/trigger

### Trigger based sensor and binary sensor storing webhook information

Template entities can be triggered using any automation trigger, including webhook triggers. Use a trigger-based template entity to store this information in template entities.

```yaml
template:
  - triggers:
      - trigger: webhook
        webhook_id: my-super-secret-webhook-id
    sensor:
      - name: "Webhook Temperature"
        state: "{{ trigger.json.temperature }}"
        unit_of_measurement: °C

      - name: "Webhook Humidity"
        state: "{{ trigger.json.humidity }}"
        unit_of_measurement: %

    binary_sensor:
      - name: "Motion"
        state: "{{ trigger.json.motion }}"
        device_class: motion
```

You can test this trigger entity with the following CURL command:

```bash
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"temperature": 5, "humidity": 34, "motion": true}' \
  http://homeassistant.local:8123/api/webhook/my-super-secret-webhook-id
```

## Template and action variables

State-based and trigger-based template entities have the special template variable `this` available in their templates and actions. The `this` variable is the current [state object](/docs/configuration/state_object) of the entity and aids [self-referencing](#self-referencing) of an entity's state and attributes in templates and actions. Trigger-based entities also provide [the trigger data](/docs/automation/templating/).

{% note %}
Self-referencing using `this` provides the state and attributes for the entity before rendering the templates to calculate a new state. In other words, it contains the previous state.
{% endnote %}

### Self referencing

This example demonstrates how the `this` variable can be used in templates for self-referencing.

```yaml
template:
  - sensor:
      - name: test
        state: "{{ this.attributes.test | default('Value when missing') }}"
        # not: "{{ state_attr('sensor.test', 'test') }}"
        attributes:
          test: "{{ now() }}"
```

## Optimistic mode

For template entities that support interactivity (like `number` and `select`), you can enable optimistic mode by setting the `optimistic` parameter to `true`. This affects how the entity's state updates when you interact with it:

- **With optimistic mode disabled (default)**: When you interact with the entity (for example, selecting a new option in a dropdown or setting a new number value), the entity's state in Home Assistant updates only after the underlying template defined in the `state` parameter returns the new value.

- **With optimistic mode enabled**: When you interact with the entity, the entity's state in Home Assistant immediately updates to reflect your change, without waiting for the `state` template to update. This provides a more responsive UI experience but may not reflect the actual state if the underlying action fails or takes time to complete.

Optimistic mode is particularly useful when:

- The underlying system doesn't provide immediate feedback
- You want a more responsive UI experience
- You're confident the action succeeds

When optimistic mode is disabled (default), you get more accuracy but potentially a less responsive UI, as the entity only updates after confirmation from the underlying system.

## Rate limiting updates

When there are entities present in the template and no triggers are defined, the template re-renders when one of the entities changes states. To avoid this taking up too many resources in Home Assistant, rate limiting is automatically applied if too many states are observed.

{% tip %}
<a href='#trigger-based-template-sensors'>Define a trigger</a> to avoid a rate limit and get more control over entity updates.
{% endtip %}

When [`states`](/template-functions/states/) is used in a template by itself to iterate all states on the system, the template is re-rendered each
time any state changed event happens if any part of the state is accessed. When merely counting states, the template
is only re-rendered when a state is added or removed from the system. On busy systems with many entities or hundreds of
thousands state changed events per day, templates may re-render more than desirable.

In the below example, re-renders are limited to once per minute because we iterate over all available entities:

```yaml
template:
  - binary_sensor:
      - name: "Has Unavailable States"
        state: "{{ states | selectattr('state', 'in', ['unavailable', 'unknown', 'none']) | list | count }}"
```

In the below example, re-renders are limited to once per second because we iterate over all entities in a single domain (sensor):

```yaml
template:
  - binary_sensor:
      - name: "Has Unavailable States"
        state: "{{ states.sensor | selectattr('state', 'in', ['unavailable', 'unknown', 'none']) | list | count }}"
```

If the template accesses every state on the system, a rate limit of one update per minute is applied. If the template accesses all states under a specific domain, a rate limit of one update per second is applied. If the template only accesses specific states, receives update events for specifically referenced entities, or the `homeassistant.update_entity` action is used, no rate limit is applied.

## Automation template trigger

The automation template trigger runs an automation when a template changes from false to true. It is useful when the condition you need cannot be expressed with a state, numeric state, or device trigger.

A template is considered true when it renders `true`, `yes`, `on`, `enable`, or a non-zero number. It is considered false when it renders any other value.

{% example %}
trigger: |
  trigger: template
  value_template: "{{ is_state('device_tracker.paulus', 'home') }}"
  for:
    minutes: 5
{% endexample %}

Home Assistant tracks the entities that are referenced in the template and evaluates the template again when one of those entities changes state. If a template does not reference an entity, it is evaluated once per minute.

You can use `for` to require the template to stay true for a set time. Templates in `for` are evaluated when `value_template` becomes true.

{% note %}
The `for` option does not survive a Home Assistant restart or the reload of automations. To keep a time target across restarts, store the target time in an `input_datetime` helper and use that helper in your automation.
{% endnote %}

## Considerations

### Startup

If you are using the state of a platform that might not be available during startup, the Template Sensor may get an `unknown` state. To avoid this, use the [`states()`](/template-functions/states/) function in your template. For example, you should replace {% raw %}`{{ states.sensor.moon.state }}`{% endraw %} with this equivalent that returns the state and never results in `unknown`: {% raw %}`{{ states('sensor.moon') }}` {% endraw %}.

The same would apply to the [`is_state()`](/template-functions/is_state/) function. You should replace {% raw %}`{{ states.switch.source.state == 'on' }}`{% endraw %} with this equivalent that returns `true`/`false` and never gives an `unknown` result:

```yaml
{{ is_state('switch.source', 'on') }}
```

## Using blueprints

If you're just starting out and are not really familiar with templates, we recommend that you start with {% term blueprint %} template entities. These are template entities which are ready-made by the community and that you only need to configure.

Each blueprint contains the "recipe" for creating a single template entity, but you can create multiple template entities based on the same blueprint.

To create your first template entity based on a blueprint, open up your `configuration.yaml` file and add:

```yaml
# Example configuration.yaml template entity based on a blueprint located in config/blueprints/template/homeassistant/inverted_binary_sensor.yaml
template:
  - use_blueprint:
      path: homeassistant/inverted_binary_sensor.yaml # relative to config/blueprints/template/
      input:
        reference_entity: binary_sensor.foo
    name: Inverted foo
    unique_id: inverted_foo
```

If you look at the blueprint definition, you notice it has one input defined (`reference_entity`), which expects a `binary_sensor` entity ID. When you create a template entity based on that blueprint, you have to tell it which of your `binary_sensor` entities it should use to fill that spot.

### Importing blueprints

Home Assistant can import blueprints from the Home Assistant forums, GitHub, and GitHub gists.

1. To import a blueprint, first [find a blueprint you want to import][blueprint-forums].
   - If you just want to practice importing, you can use this URL:

      ```text
      https://github.com/home-assistant/core/blob/dev/homeassistant/components/template/blueprints/inverted_binary_sensor.yaml
      ```

2. Download the file and place it under `config/blueprints/template/<source or author>/<blueprint name>.yaml`
3. Use a config similar to the one above to create a new template entity based on the blueprint you just imported.
4. Make sure to fill in all required inputs.

The blueprint can now be used for creating template entities.

[blueprint-forums]: /get-blueprints

## Event `event_template_reloaded`

Event `event_template_reloaded` is fired when Template entities have been reloaded and entities thus might have changed.

This event has no additional data.
