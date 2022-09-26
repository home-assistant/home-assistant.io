---
title: Template
description: Instructions on how to integrate Template Sensors into Home Assistant.
ha_category:
  - Binary Sensor
  - Sensor
ha_release: 0.12
ha_iot_class: Local Push
ha_quality_scale: internal
ha_codeowners:
  - '@PhracturedBlue'
  - '@tetienne'
  - '@home-assistant/core'
ha_domain: template
ha_platforms:
  - alarm_control_panel
  - binary_sensor
  - button
  - cover
  - fan
  - light
  - lock
  - number
  - select
  - sensor
  - switch
  - vacuum
  - weather
ha_integration_type: integration
---

The `template` integration allows creating entities which derive their values from other data. This is done by specifying [templates](/docs/configuration/templating/) for properties of an entity, like the name or the state.

Sensors, binary (on/off) sensors, buttons, numbers and selects are covered on this page. For other types, please see the specific pages:

- [Alarm Control Panel](/integrations/alarm_control_panel.template/)
- [Cover](/integrations/cover.template/)
- [Fan](/integrations/fan.template/)
- [Light](/integrations/light.template/)
- [Lock](/integrations/lock.template/)
- [Switch](/integrations/switch.template/)
- [Vacuum](/integrations/vacuum.template/)
- [Weather](/integrations/weather.template/)

Sensor, binary sensor, button, number and select template entities are defined in your YAML configuration files, directly under the `template:` key and cannot be configured via the UI. You can define multiple configuration blocks as a list. Each block defines sensor/binary sensor/number/select entities and can contain an optional update trigger.

_For old sensor/binary sensor configuration format, [see below](#legacy-binary-sensor-configuration-format)._

## State-based template binary sensors, buttons, numbers, selects and sensors

Template entities will by default update as soon as any of the referenced data in the template updates.

For example, you can have a template that takes the averages of two sensors. Home Assistant will update your template sensor as soon as either source sensor updates.

{% raw %}

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

{% endraw %}


## Trigger-based template binary sensors, buttons, numbers, selects and sensors

If you want more control over when an entity updates, you can define a trigger. Triggers follow the same format and work exactly the same as [triggers in automations][trigger-doc]. This feature is a great way to create entities based on webhook data ([example](#storing-webhook-information)), or update entities based on a schedule.

Whenever the trigger fires, all related entities will re-render and it will have access to [the trigger data](/docs/automation/templating/) in the templates.

Trigger-based entities do not automatically update when states referenced in the templates change. This functionality can be added back by defining a [state trigger](/docs/automation/trigger/#state-trigger) for each entity that you want to trigger updates.

The state, including attributes, of trigger-based sensors and binary sensors is restored when Home Assistant is restarted. The state of other trigger-based template entities is not restored.

{% raw %}

```yaml
# Example configuration entry
template:
  - trigger:
      - platform: time_pattern
        # This will update every night
        hours: 0
        minutes: 0
    sensor:
      # Keep track how many days have past since a date
      - name: "Not smoking"
        state: '{{ ( ( as_timestamp(now()) - as_timestamp(strptime("06.07.2018", "%d.%m.%Y")) ) / 86400 ) | round(default=0) }}'
        unit_of_measurement: "Days"
```

{% endraw %}

{% configuration %}
trigger:
  description: Define an automation trigger to update the entities. Optional. If omitted will update based on referenced entities. [See trigger documentation](/docs/automation/trigger).
  required: false
  type: list
unique_id:
  description: The unique ID for this config block. This will be prefixed to all unique IDs of all entities in this block.
  required: false
  type: string
sensor:
  description: List of sensors
  required: true
  type: map
  keys:
    state:
      description: Defines a template to get the state of the sensor.
      required: true
      type: template
    unit_of_measurement:
      description: "Defines the units of measurement of the sensor, if any. This will also display the value based on the user profile Number Format setting and influence the graphical presentation in the history visualization as a continuous value."
      required: false
      type: string
      default: None
    state_class:
      description: "The [state_class](https://developers.home-assistant.io/docs/core/entity/sensor#available-state-classes) of the sensor. This will also display the value based on the user profile Number Format setting and influence the graphical presentation in the history visualization as a continuous value."
      required: false
      type: string
      default: None
binary_sensor:
  description: List of binary sensors
  required: true
  type: map
  keys:
    state:
      description: The sensor is `on` if the template evaluates as `True`, `yes`, `on`, `enable` or a positive number. Any other value will render it as `off`. The actual appearance in the frontend (`Open`/`Closed`, `Detected`/`Clear` etc) depends on the sensor’s device_class value
      required: true
      type: template
    delay_on:
      description: The amount of time (e.g. `0:00:05`) the template state must be ***met*** before this sensor will switch to `on`. This can also be a template.
      required: false
      type: time
    delay_off:
      description: The amount of time the template state must be ***not met*** before this sensor will switch to `off`. This can also be a template.
      required: false
      type: time
    auto_off:
      description: "**Requires a trigger.** After how much time the entity should turn off after it rendered 'on'."
      required: false
      type: time
"[both sensor and binary_sensor entities]":
  description: Fields that can be used above for both sensors and binary sensors.
  required: false
  type: map
  keys:
    picture:
      description: Defines a template for the entity picture of the sensor.
      required: false
      type: template
    attributes:
      description: Defines templates for attributes of the sensor.
      required: false
      type: map
      keys:
        "attribute: template":
          description: The attribute and corresponding template.
          required: true
          type: template
    device_class:
      description: Sets the class of the device, changing the device state and icon that is displayed on the UI (see below). It does not set the `unit_of_measurement`.
      required: false
      type: device_class
      default: None
number:
  description: List of numbers
  required: true
  type: map
  keys:
    state:
      description: Template for the number's current value.
      required: true
      type: template
    set_value:
      description: Defines actions to run when the number value changes. The variable `value` will contain the number entered.
      required: true
      type: action
    step:
      description: Template for the number's increment/decrement step.
      required: true
      type: template
    min:
      description: Template for the number's minimum value.
      required: false
      type: template
      default: 0.0
    max:
      description: Template for the number's maximum value.
      required: false
      type: template
      default: 100.0
    optimistic:
      description: Flag that defines if number works in optimistic mode.
      required: false
      type: boolean
      default: false
select:
  description: List of selects
  required: true
  type: map
  keys:
    state:
      description: Template for the select's current value.
      required: true
      type: template
    select_option:
      description: Defines actions to run to select an option from the `options` list. The variable `option` will contain the option selected.
      required: true
      type: action
    options:
      description: Template for the select's available options.
      required: true
      type: template
    optimistic:
      description: Flag that defines if select works in optimistic mode.
      required: false
      type: boolean
      default: false
button:
  description: List of buttons
  required: true
  type: map
  keys:
    press:
      description: Defines actions to run to press the button.
      required: true
      type: action
"[all sensor, binary sensor, button, number, select entities]":
  description: Fields that can be used above for sensors, binary sensors, buttons, numbers, and selects.
  required: false
  type: map
  keys:
    name:
      description: Defines a template to get the name of the entity.
      required: false
      type: template
    unique_id:
      description: An ID that uniquely identifies this entity. Will be combined with the unique ID of the configuration block if available. This allows changing the `name`, `icon` and `entity_id` from the web interface.
      required: false
      type: string
    icon:
      description: Defines a template for the icon of the entity.
      required: false
      type: template
    availability:
      description: Defines a template to get the `available` state of the entity. If the template either fails to render or returns `True`, `"1"`, `"true"`, `"yes"`, `"on"`, `"enable"`, or a non-zero number, the entity will be `available`. If the template returns any other value, the entity will be `unavailable`. If not configured, the entity will always be `available`. Note that the string comparison not case sensitive; `"TrUe"` and `"yEs"` are allowed.
      required: false
      type: template
      default: true

{% endconfiguration %}

The above configuration variables describe a configuration section. The template integration allows defining multiple sections.

```yaml
# Example configuration.yaml entry with two sections
template:
  # Define state-based template entities
  - sensor:
      ...
  - binary_sensor:
      ...

  # Define trigger-based template entities
  - trigger:
      ...
    sensor:
      ...
    binary_sensor:
      ...
```

[trigger-doc]: /docs/automation/trigger

## Template and action variables

State-based and trigger-based template entities have the special template variable `this` available in their templates and actions. The `this` variable is the [state object](/docs/configuration/state_object) of the entity and aids [self-referencing](#self-referencing) of an entity's state and attribute in templates and actions. Trigger-based entities also provide [the trigger data](/docs/automation/templating/). 

## Rate limiting updates

When there are entities present in the template and no triggers are defined, the template will be re-rendered when one of the entities changes states. To avoid this taking up too many resources in Home Assistant, rate limiting will be automatically applied if too many states are observed.

<p class='note'>
<a href='#trigger-based-template-sensors'>Define a trigger</a> to avoid a rate limit and get more control over entity updates.
</p>

When `states` is used in a template by itself to iterate all states on the system, the template is re-rendered each
time any state changed event happens if any part of the state is accessed. When merely counting states, the template
is only re-rendered when a state is added or removed from the system. On busy systems with many entities or hundreds of
thousands state changed events per day, templates may re-render more than desirable.

In the below example, re-renders are limited to once per minute because we iterate over all available entities:

{% raw %}

```yaml
template:
  - binary_sensor:
      - name: "Has Unavailable States"
        state: "{{ states | selectattr('state', 'in', ['unavailable', 'unknown', 'none']) | list | count }}"
```

{% endraw %}

In the below example, re-renders are limited to once per second because we iterate over all entities in a single domain (sensor):

{% raw %}

```yaml
template:
  - binary_sensor:
      - name: "Has Unavailable States"
        state: "{{ states.sensor | selectattr('state', 'in', ['unavailable', 'unknown', 'none']) | list | count }}"
```

{% endraw %}

If the template accesses every state on the system, a rate limit of one update per minute is applied. If the template accesses all states under a specific domain, a rate limit of one update per second is applied. If the template only accesses specific states, receives update events for specifically referenced entities, or the `homeassistant.update_entity` service is used, no rate limit is applied.

## Considerations

### Startup

If you are using the state of a platform that might not be available during startup, the Template Sensor may get an `unknown` state. To avoid this, use `is_state()` function in your template. For example, you would replace {% raw %}`{{ states.switch.source.state == 'on' }}`{% endraw %} with this equivalent that returns `true`/`false` and never gives an `unknown` result:

{% raw %}

```yaml
{{ is_state('switch.source', 'on') }}
```

{% endraw %}

## Examples

In this section, you find some real-life examples of how to use template sensors.

### Trigger based sensor and binary sensor storing webhook information

Template entities can be triggered using any automation trigger, including webhook triggers. Use a trigger-based template entity to store this information in template entities.

{% raw %}

```yaml
template:
  - trigger:
      - platform: webhook
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

{% endraw %}

You can test this trigger entity with the following CURL command:

```bash
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"temperature": 5, "humidity": 34, "motion": true}' \
  http://homeassistant.local:8123/api/webhook/my-super-secret-webhook-id
```

### Turning an event into a trigger based binary sensor

You can use a trigger-based template entity to convert any event or other automation trigger into a binary sensor. The below configuration will turn on a binary sensor for 5 seconds when the automation trigger triggers.

```yaml
template:
  - trigger:
      platform: event
      event_type: my_event
    binary_sensor:
      - name: Event recently fired
        auto_off: 5
        state: "true"
```

### State based sensor exposing sun angle

This example shows the sun angle in the frontend.

{% raw %}

```yaml
template:
  - sensor:
      - name: Sun Angle
        unit_of_measurement: "°"
        state: "{{ '%+.1f'|format(state_attr('sun.sun', 'elevation')) }}"
```

{% endraw %}

### State based sensor modifying another sensor's output

If you don't like the wording of a sensor output, then the Template Sensor can help too. Let's rename the output of the [Sun component](/integrations/sun/) as a simple example:

{% raw %}

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

{% endraw %}

### State based sensor with multiline template with an `if` test

This example shows a multiple line template with an `if` test. It looks at a sensing switch and shows `on`/`off` in the frontend, and shows 'standby' if the power use is less than 1000 watts.

{% raw %}

```yaml
template:
  - sensor:
      - name: "Kettle"
        state: >
          {% if is_state('switch.kettle', 'off') %}
            off
          {% elif state_attr('switch.kettle', 'W')|float < 1000 %}
            standby
          {% elif is_state('switch.kettle', 'on') %}
            on
          {% else %}
            failed
          {% endif %}
```

{% endraw %}

### State based sensor changing the unit of measurement of another sensor

With a Template Sensor, it's easy to convert given values into others if the unit of measurement doesn't fit your needs.

{% raw %}

```yaml
template:
  - sensor:
      - name: "Transmission Down Speed"
        unit_of_measurement: "kB/s"
        state: "{{ states('sensor.transmission_down_speed')|float * 1024 }}"

      - name: "Transmission Up Speed"
        unit_of_measurement: "kB/s"
        state: "{{ states('sensor.transmission_up_speed')|float * 1024 }}"
```

{% endraw %}

### State based binary sensor - Washing Machine Running

This example creates a washing machine "load running" sensor by monitoring an
energy meter connected to the washer. During the washer's operation, the energy meter will fluctuate wildly, hitting zero frequently even before the load is finished. By utilizing `delay_off`, we can have this sensor only turn off if there has been no washer activity for 5 minutes.

{% raw %}

```yaml
# Determine when the washing machine has a load running.
template:
  - binary_sensor:
      - name: "Washing Machine"
        delay_off:
          minutes: 5
        state: >
          {{ states('sensor.washing_machine_power')|float > 0 }}
```

{% endraw %}

### State based binary sensor - Is Anyone Home

This example is determining if anyone is home based on the combination of device tracking and motion sensors. It's extremely useful if you have kids/baby sitter/grand parents who might still be in your house that aren't represented by a trackable device in Home Assistant. This is providing a composite of Wi-Fi based device tracking and Z-Wave multisensor presence sensors.

{% raw %}

```yaml
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

{% endraw %}

### State based binary sensor - Device Tracker sensor with Latitude and Longitude Attributes

This example shows how to combine a non-GPS (e.g., NMAP) and GPS device tracker while still including latitude and longitude attributes

{% raw %}

```yaml
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

{% endraw %}

### State based binary sensor - Change the icon when a state changes

This example demonstrates how to use template to change the icon as its state changes. This icon is referencing its own state.

{% raw %}

```yaml
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

{% endraw %}

A more advanced use case could be to set the icon based on the sensor's own state like above, but when triggered by an event. This example demonstrates a binary sensor that turns on momentarily, such as when a doorbell button is pressed. 

The binary sensor turns on and sets the matching icon when the appropriate event is received. After 5 seconds, the binary sensor turns off automatically. To ensure the icon gets updated, there must be a trigger for when the state changes to off. 

{% raw %}

```yaml
template:
  - trigger:
      - platform: event
        event_type: YOUR_EVENT
      - platform: state
        entity_id: binary_sensor.doorbell_rang
        to: "off"
    binary_sensor:
      name: doorbell_rang
      icon: "{{ (trigger.platform == 'event') | iif('mdi:bell-ring-outline', 'mdi:bell-outline') }}"
      state: "{{ trigger.platform == 'event' }}"
      auto_off:
        seconds: 5
```

{% endraw %}

### State based select - Control Day/Night mode of a camera

This show how a state based template select can be used to call a service.

{% raw %}


```yaml
template:
  select:
    - name: "Porch Camera Day-Night Mode"
      unique_id: porch_camera_day_night_mode
      state: "{{ state_attr('camera.porch_camera_sd', 'day_night_mode') }}"
      options: "{{ ['off', 'on', 'auto'] }}"
      select_option:
        - service: tapo_control.set_day_night_mode
          data:
            day_night_mode: "{{ option }}"
          target:
            entity_id: camera.porch_camera_sd
```

{% endraw %}

### Self referencing

This example demonstrates how the `this` variable can be used in templates for self-referencing.

{% raw %}

```yaml
template:
  - sensor:
      - name: test
        state: "{{ this.attributes.test | default('Value when missing') }}"
        # not: "{{ state_attr('sensor.test', 'test') }}"
        attributes:
          test: "{{ now() }}"
```

{% endraw %}

## Legacy binary sensor configuration format

_This format still works but is no longer recommended. [Use modern configuration](#configuration-variables)._

This format is configured as a platform for the `binary_sensor` integration and not directly under the `template` integration.

{% raw %}

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: template
    sensors:
      sun_up:
        friendly_name: "Sun is up"
        value_template: {{ state_attr('sun.sun', 'elevation') > 0 }}
```

{% endraw %}

{% configuration %}
sensors:
  description: List of your sensors.
  required: true
  type: map
  keys:
    sensor_name:
      description: The slug of the sensor.
      required: true
      type: map
      keys:
        friendly_name:
          description: Name to use in the frontend.
          required: false
          type: string
        unique_id:
          description: An ID that uniquely identifies this binary sensor. Set this to a unique value to allow customization through the UI.
          required: false
          type: string
        device_class:
          description: Sets the [class of the device](/integrations/binary_sensor/), changing the device state and icon that is displayed on the frontend.
          required: false
          type: device_class
          default: None
        value_template:
          description: The sensor is `on` if the template evaluates as `True` and `off` otherwise. The actual appearance in the frontend (`Open`/`Closed`, `Detected`/`Clear` etc) depends on the sensor’s device_class value
          required: true
          type: template
        availability_template:
          description: Defines a template to get the `available` state of the entity. If the template either fails to render or returns `True`, `"1"`, `"true"`, `"yes"`, `"on"`, `"enable"`, or a non-zero number, the entity will be `available`. If the template returns any other value, the entity will be `unavailable`. If not configured, the entity will always be `available`. Note that the string comparison not case sensitive; `"TrUe"` and `"yEs"` are allowed.
          required: false
          type: template
          default: true
        icon_template:
          description: Defines a template for the icon of the sensor.
          required: false
          type: template
        entity_picture_template:
          description: Defines a template for the entity picture of the sensor.
          required: false
          type: template
        attribute_templates:
          description: Defines templates for attributes of the sensor.
          required: false
          type: map
          keys:
            "attribute: template":
              description: The attribute and corresponding template.
              required: true
              type: template
        delay_on:
          description: The amount of time the template state must be ***met*** before this sensor will switch to `on`. This can also be a template.
          required: false
          type: time
        delay_off:
          description: The amount of time the template state must be ***not met*** before this sensor will switch to `off`. This can also be a template.
          required: false
          type: time
{% endconfiguration %}

## Legacy Sensor configuration format

_This format still works but is no longer recommended. [Use modern configuration](#configuration-variables)._

This format is configured as a platform for the `sensor` integration and not directly under the `template` integration.

{% raw %}

```yaml
# Example configuration.yaml entry
sensor:
  - platform: template
    sensors:
      solar_angle:
        friendly_name: "Sun angle"
        unit_of_measurement: "degrees"
        value_template: "{{ state_attr('sun.sun', 'elevation') }}"

      sunrise:
        value_template: "{{ state_attr('sun.sun', 'next_rising') }}"
```

{% endraw %}

{% configuration %}
  sensors:
    description: Map of your sensors.
    required: true
    type: map
    keys:
      friendly_name:
        description: Name to use in the frontend.
        required: false
        type: string
      friendly_name_template:
        description: Defines a template for the name to be used in the frontend (this overrides friendly_name).
        required: false
        type: template
      unique_id:
        description: An ID that uniquely identifies this sensor. Set this to a unique value to allow customization through the UI.
        required: false
        type: string
      unit_of_measurement:
        description: "Defines the units of measurement of the sensor, if any. This will also display the value based on the user profile Number Format setting and influence the graphical presentation in the history visualization as a continuous value."
        required: false
        type: string
        default: None
      value_template:
        description: Defines a template to get the state of the sensor.
        required: true
        type: template
      icon_template:
        description: Defines a template for the icon of the sensor.
        required: false
        type: template
      entity_picture_template:
        description: Defines a template for the entity picture of the sensor.
        required: false
        type: template
      attribute_templates:
        description: Defines templates for attributes of the sensor.
        required: false
        type: map
        keys:
          "attribute: template":
            description: The attribute and corresponding template.
            required: true
            type: template
      availability_template:
        description: Defines a template to get the `available` state of the component. If the template returns `true`, the device is `available`. If the template returns any other value, the device will be `unavailable`. If `availability_template` is not configured, the component will always be `available`.
        required: false
        type: template
        default: true
      device_class:
        description: Sets the class of the device, changing the device state and icon that is displayed on the UI (see below). It does not set the `unit_of_measurement`.
        required: false
        type: device_class
        default: None
{% endconfiguration %}

## Event `event_template_reloaded`

Event `event_template_reloaded` is fired when Template entities have been reloaded and entities thus might have changed.

This event has no additional data.
