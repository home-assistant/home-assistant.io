---
title: Template
description: Instructions on how to integrate Template Sensors into Home Assistant.
ha_category:
  - Binary sensor
  - Button
  - Helper
  - Image
  - Number
  - Select
  - Sensor
ha_release: 0.12
ha_iot_class: Local Push
ha_quality_scale: internal
ha_codeowners:
  - '@PhracturedBlue'
  - '@home-assistant/core'
ha_domain: template
ha_platforms:
  - alarm_control_panel
  - binary_sensor
  - button
  - cover
  - fan
  - image
  - light
  - lock
  - number
  - select
  - sensor
  - switch
  - vacuum
  - weather
ha_integration_type: helper
ha_config_flow: true
related:
  - docs: /docs/configuration/
    title: Configuration file
  - docs: /docs/blueprint/
    title: About blueprints
---

The `template` integration allows creating entities which derive their values from other data. This is done by specifying [templates](/docs/configuration/templating/) for properties of an entity, like the name or the state.

Sensors, binary (on/off) sensors, buttons, images, numbers, and selects are covered on this page. They can be configured using [UI](#configuration) or [YAML](#yaml-configuration) file.

For other types, please see the specific pages:

- [Alarm control panel](/integrations/alarm_control_panel.template/)
- [Cover](/integrations/cover.template/)
- [Fan](/integrations/fan.template/)
- [Light](/integrations/light.template/)
- [Lock](/integrations/lock.template/)
- [Switch](/integrations/switch.template/)
- [Vacuum](/integrations/vacuum.template/)
- [Weather](/integrations/weather.template/)

{% include integrations/config_flow.md %}

{% important %}
To be able to add **{% my helpers title="Helpers" %}** via the user interface, you should have `default_config:` in your {% term "`configuration.yaml`" %}. It should already be there by default unless you removed it.
{% endimportant %}

{% note %}
Configuration using our user interface provides a more limited subset of options, making this integration more accessible while covering most use cases.

If you need more specific features for your use case, the manual [YAML-configuration section](#yaml-configuration) of this integration might provide them.
{% endnote %}

## YAML configuration

Entities (sensors, binary sensors, buttons, images, numbers, and selections) are defined in your YAML configuration files under the `template:` key. You can define multiple configuration blocks as a list. Each block defines sensor/binary sensor/number/select entities and can contain an optional update trigger.

_For old sensor/binary sensor configuration format, [see below](#legacy-binary-sensor-configuration-format)._

### State-based template binary sensors, buttons, images, numbers, selects and sensors

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


### Trigger-based template binary sensors, buttons, images, numbers, selects and sensors

If you want more control over when an entity updates, you can define a trigger. Triggers follow the same format and work exactly the same as [triggers in automations][trigger-doc]. This feature is a great way to create entities based on webhook data ([example](#trigger-based-sensor-and-binary-sensor-storing-webhook-information)), or update entities based on a schedule.

Whenever the trigger fires, all related entities will re-render and it will have access to [the trigger data](/docs/automation/templating/) in the templates.

Trigger-based entities do not automatically update when states referenced in the templates change. This functionality can be added back by defining a [state trigger](/docs/automation/trigger/#state-trigger) for each entity that you want to trigger updates.

The state, including attributes, of trigger-based sensors and binary sensors is restored when Home Assistant is restarted. The state of other trigger-based template entities is not restored.

{% raw %}

```yaml
# Example configuration entry
template:
  - trigger:
      - trigger: time_pattern
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

### Configuration reference

{% configuration %}
trigger:
  description: Define an automation trigger to update the entities. Optional. If omitted will update based on referenced entities. [See trigger documentation](/docs/automation/trigger).
  required: false
  type: list
unique_id:
  description: The unique ID for this config block. This will be prefixed to all unique IDs of all entities in this block.
  required: false
  type: string
condition:
  description: Define conditions that have to be met after a trigger fires and before any actions are executed or sensor updates are performed. Optional. [See condition documentation](/docs/automation/condition).
  required: false
  type: list
action:
  description: Define actions to be executed when the trigger fires. Optional. Variables set by the action script are available when evaluating entity templates. This can be used to interact with anything using actions, in particular actions with [response data](/docs/scripts/perform-actions#use-templates-to-handle-response-data). [See action documentation](/docs/automation/action).
  required: false
  type: list
variables:
  description: Key-value pairs of variable definitions which can be referenced and used in the templates below. Mostly used by blueprints.
  required: false
  type: map
  keys:
    "variable_name: value":
      description: The variable name and corresponding value.
      required: true
      type: string
sensor:
  description: List of sensors
  required: true
  type: map
  keys:
    state:
      description: "Defines a template to get the state of the sensor. If the sensor is numeric, i.e. it has a `state_class` or a `unit_of_measurement`, the state template must render to a number or to `none`. The state template must not render to a string, including `unknown` or `unavailable`. An `availability` template may be defined to suppress rendering of the state template."
      required: true
      type: template
    unit_of_measurement:
      description: "Defines the units of measurement of the sensor, if any. This will also display the value based on the user profile Number Format setting and influence the graphical presentation in the history visualization as a continuous value."
      required: false
      type: string
      default: None
    state_class:
      description: "The [state_class](https://developers.home-assistant.io/docs/core/entity/sensor#available-state-classes) of the sensor. This will also display the value based on the user profile Number Format setting and influence the graphical presentation in the history visualization as a continuous value. If you desire to include the sensor in long-term statistics, include this key and assign it the appropriate value"
      required: false
      type: string
      default: None
    last_reset:
      description: "Defines a template that describes when the state of the sensor was last reset. Must render to a valid `datetime`. Only available when `state_class` is set to `total`"
      required: false
      type: template
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
    unit_of_measurement:
      description: Defines the units of measurement of the number, if any.
      required: false
      type: string
      default: None
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
image:
  description: List of images
  required: true
  type: map
  keys:
    url:
      description: The URL on which the image is served.
      required: true
      type: template
    verify_ssl:
      description: Enable or disable SSL certificate verification. Set to false to use an http-only URL, or you have a self-signed SSL certificate and haven’t installed the CA certificate to enable verification.
      required: false
      type: boolean
      default: true
weather:
  description: List of weather entities
  required: true
  type: map
  keys:
    condition_template:
      description: The current weather condition.
      required: true
      type: template
    temperature_template:
      description: The current temperature.
      required: true
      type: template
    dew_point_template:
      description: The current dew point.
      required: false
      type: template
    apparent_temperature_template:
      description: The current apparent (feels-like) temperature.
      required: false
      type: template
    temperature_unit:
      description: Unit for temperature_template output. Valid options are °C, °F, and K.
      required: false
      type: string
    humidity_template:
      description: The current humidity.
      required: true
      type: template
    pressure_template:
      description: The current air pressure.
      required: false
      type: template
    pressure_unit:
      description: Unit for pressure_template output. Valid options are Pa, hPa, kPa, bar, cbar, mbar, mmHg, inHg, psi.
      required: false
      type: string
    wind_speed_template:
      description: The current wind speed.
      required: false
      type: template
    wind_gust_speed_template:
      description: The current wind gust speed.
      required: false
      type: template
    wind_speed_unit:
      description: Unit for wind_speed_template output. Valid options are m/s, km/h, mph, mm/d, in/d, and in/h.
      required: false
      type: string
    wind_bearing_template:
      description: The current wind bearing.
      required: false
      type: template
    ozone_template:
      description: The current ozone level.
      required: false
      type: template
    cloud_coverage_template:
      description: The current cloud coverage.
      required: false
      type: template
    visibility_template:
      description: The current visibility.
      required: false
      type: template
    visibility_unit:
      description: Unit for visibility_template output. Valid options are km, mi, ft, m, cm, mm, in, yd.
      required: false
      type: string
    forecast_daily_template:
      description: Daily forecast data.
      required: false
      type: template
    forecast_hourly_template:
      description: Hourly forecast data.
      required: false
      type: template
    forecast_twice_daily_template:
      description: Twice daily forecast data.
      required: false
      type: template
    precipitation_unit:
      description: Unit for precipitation output. Valid options are km, mi, ft, m, cm, mm, in, yd.
      required: false
      type: string
"[all sensor, binary sensor, button, image, number, select, weather entities]":
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
      description: Defines a template to get the `available` state of the entity. If the template either fails to render or returns `True`, `"1"`, `"true"`, `"yes"`, `"on"`, `"enable"`, or a non-zero number, the entity will be `available`. If the template returns any other value, the entity will be `unavailable`. If not configured, the entity will always be `available`. Note that the string comparison is not case sensitive; `"TrUe"` and `"yEs"` are allowed.
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

#### Video tutorial

This video tutorial explains how to set up a Trigger based template that makes use of an action to retrieve the weather forecast (precipitation).

<lite-youtube videoid="zrWqDjaRBf0" videotitle="How to create Action Template Sensors in Home Assistant" posterquality="maxresdefault"></lite-youtube>

### Template and action variables

State-based and trigger-based template entities have the special template variable `this` available in their templates and actions. The `this` variable is the current [state object](/docs/configuration/state_object) of the entity and aids [self-referencing](#self-referencing) of an entity's state and attributes in templates and actions. Trigger-based entities also provide [the trigger data](/docs/automation/templating/).

{% note %}
Self-referencing using `this` provides the state and attributes for the entity before rendering the templates to calculate a new state. To access the new state, use the `value` or `value_json` variable.
{% endnote %}

### Rate limiting updates

When there are entities present in the template and no triggers are defined, the template will be re-rendered when one of the entities changes states. To avoid this taking up too many resources in Home Assistant, rate limiting will be automatically applied if too many states are observed.

{% tip %}
<a href='#trigger-based-template-sensors'>Define a trigger</a> to avoid a rate limit and get more control over entity updates.
{% endtip %}

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

If the template accesses every state on the system, a rate limit of one update per minute is applied. If the template accesses all states under a specific domain, a rate limit of one update per second is applied. If the template only accesses specific states, receives update events for specifically referenced entities, or the `homeassistant.update_entity` action is used, no rate limit is applied.

### Considerations

#### Startup

If you are using the state of a platform that might not be available during startup, the Template Sensor may get an `unknown` state. To avoid this, use the `states()` function in your template. For example, you should replace {% raw %}`{{ states.sensor.moon.state }}`{% endraw %} with this equivalent that returns the state and never results in `unknown`: {% raw %}`{{ states('sensor.moon') }}` {% endraw %}. 

The same would apply to the `is_state()` function. You should replace {% raw %}`{{ states.switch.source.state == 'on' }}`{% endraw %} with this equivalent that returns `true`/`false` and never gives an `unknown` result:

{% raw %}

```yaml
{{ is_state('switch.source', 'on') }}
```

{% endraw %}

## Using blueprints

If you're just starting out and are not really familiar with templates, we recommend that you start with {% term blueprint %} template entities. These are template entities which are ready-made by the community and that you only need to configure.

Each blueprint contains the "recipe" for creating a single template entity, but you can create multiple template entities based on the same blueprint.

To create your first template entity based on a blueprint, open up your `configuration.yaml` file and add:

```yaml
# Example configuration.yaml template entity based on a blueprint located in config/blueprints/homeassistant/inverted_binary_sensor.yaml
template:
  - use_blueprint:
      path: homeassistant/inverted_binary_sensor.yaml # relative to config/blueprints/template/
      input:
        reference_entity: binary_sensor.foo
    name: Inverted foo
    unique_id: inverted_foo
```

If you look at the blueprint definition, you will notice it has one input defined (`reference_entity`), which expects a `binary_sensor` entity ID. When you create a template entity based on that blueprint, you will have to tell it which of your `binary_sensor` entities it should use to fill that spot.

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

## Examples

In this section, you find some real-life examples of how to use template sensors.

### Trigger based sensor and binary sensor storing webhook information

Template entities can be triggered using any automation trigger, including webhook triggers. Use a trigger-based template entity to store this information in template entities.

{% raw %}

```yaml
template:
  - trigger:
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
      trigger: event
      event_type: my_event
    binary_sensor:
      - name: Event recently fired
        auto_off: 5
        state: "true"
```

### Using conditions with triggers to control status updates

This example shows how to store the last valid value of a temperature sensor. It will update as long as the source sensor has a valid (numeric) state. Otherwise, the template sensor's state will remain unchanged. 

{% raw %}

```yaml
template:
  - trigger:
      trigger: state
      entity_id: sensor.outside_temperature
    condition:
      - condition: template
        value_template: "{{ is_number(states('sensor.outside_temperature')) }}"
    sensor:
      - name: Outside Temperature last known value
        state: "{{ states('sensor.outside_temperature') }}"
```

{% endraw %}

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

If you don't like the wording of a sensor output, then the Template Sensor can help too. Let's rename the output of the [Sun integration](/integrations/sun/) as a simple example:

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
Because the sensors do math on the source sensor's state and need to render to a numeric value, an availability template is used
to suppress rendering of the state template if the source sensor does not have a valid numeric state.

{% raw %}

```yaml
template:
  - sensor:
      - name: "Transmission Down Speed"
        unit_of_measurement: "kB/s"
        state: "{{ states('sensor.transmission_down_speed')|float * 1024 }}"
        availability: "{{ is_number(states('sensor.transmission_down_speed')) }}"

      - name: "Transmission Up Speed"
        unit_of_measurement: "kB/s"
        state: "{{ states('sensor.transmission_up_speed')|float * 1024 }}"
        availability: "{{ is_number(states('sensor.transmission_up_speed')) }}"
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

### State based binary sensor - device tracker sensor with latitude and longitude attributes

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

{% endraw %}

### State based select - Control Day/Night mode of a camera

This show how a state based template select can be used to perform an action.

{% raw %}


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

### Trigger based handling of action response data

This example demonstrates how to use an `action` to call a [action with response data](/docs/scripts/perform-actions/#use-templates-to-handle-response-data)
and use the response in a template.

{% raw %}

```yaml
template:
  - trigger:
      - trigger: time_pattern
        hours: /1
    action:
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

{% endraw %}

### Number entity changing the unit of measurement of another number

This example demonstrates the usage of a template number with a unit of measurement set to change a unit-less value of another number entity.

{% raw %}

```yaml
template:
  - number:
      - name: "Cutting Height"
        unit_of_measurement: "cm"
        unique_id: automower_cutting_height
        state: "{{ states('number.automower_cutting_height_raw')|int(0) * 0.5 + 1.5 }}"
        set_value:
          - service: number.set_value
            target:
              entity_id: number.automower_cutting_height_raw
            data:
              value: "{{ (value - 1.5) * 2 }}"
        step: 0.5
        min: 2
        max: 6
        icon: mdi:ruler
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
        value_template: "{{ state_attr('sun.sun', 'elevation') > 0 }}"
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
        description: Defines a template to get the `available` state of the integration. If the template returns `true`, the device is `available`. If the template returns any other value, the device will be `unavailable`. If `availability_template` is not configured, the integration will always be `available`.
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
