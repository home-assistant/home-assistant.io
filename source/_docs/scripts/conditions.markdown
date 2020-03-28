---
title: "Conditions"
description: "Documentation about all available conditions."
redirect_from: /getting-started/scripts-conditions/
---

Conditions can be used within a script or automation to prevent further execution. When a condition does not return true, the script or automation stops executing. A condition will look at the system at that moment. For example, a condition can test if a switch is currently turned on or off.

Unlike a trigger, which is always `or`, conditions are `and` by default - all conditions have to be true.

### AND condition

Test multiple conditions in one condition statement. Passes if all embedded conditions are valid.

```yaml
condition:
  condition: and
  conditions:
    - condition: state
      entity_id: 'device_tracker.paulus'
      state: 'home'
    - condition: numeric_state
      entity_id: 'sensor.temperature'
      below: 20
```

If you do not want to combine AND and OR conditions, you can list them sequentially.

The following configuration works the same as the one listed above:

```yaml
condition:
  - condition: state
    entity_id: 'device_tracker.paulus'
    state: 'home'
  - condition: numeric_state
    entity_id: 'sensor.temperature'
    below: 20
```

Currently you need to format your conditions like this to be able to edit them using the [automations editor](/docs/automation/editor/).

### OR condition

Test multiple conditions in one condition statement. Passes if any embedded condition is valid.

```yaml
condition:
  condition: or
  conditions:
    - condition: state
      entity_id: 'device_tracker.paulus'
      state: 'home'
    - condition: numeric_state
      entity_id: 'sensor.temperature'
      below: 20
```

### MIXED AND and OR conditions

Test multiple AND and OR conditions in one condition statement. Passes if any embedded condition is valid.
This allows you to mix several AND and OR conditions together.

```yaml
condition:
  condition: and
  conditions:
    - condition: state
      entity_id: 'device_tracker.paulus'
      state: 'home'
    - condition: or
      conditions:
        - condition: state
          entity_id: sensor.weather_precip
          state: 'rain'
        - condition: numeric_state
          entity_id: 'sensor.temperature'
          below: 20
```

### Numeric state condition

This type of condition attempts to parse the state of the specified entity as a number, and triggers if the value matches the thresholds.

If both `below` and `above` are specified, both tests have to pass.

You can optionally use a `value_template` to process the value of the state before testing it.

```yaml
condition:
  condition: numeric_state
  entity_id: sensor.temperature
  above: 17
  below: 25
  # If your sensor value needs to be adjusted
  value_template: {% raw %}'{{ float(state.state) + 2 }}'{% endraw %}
```

### State condition

Tests if an entity is a specified state.

```yaml
condition:
  condition: state
  entity_id: device_tracker.paulus
  state: 'not_home'
  # optional: trigger only if state was this for last X time.
  for:
    hours: 1
    minutes: 10
    seconds: 5
```

### Sun condition

#### Sun state condition

The sun state can be used to test if the sun has set or risen.

```yaml
condition:
  condition: state  # 'day' condition: from sunrise until sunset
  entity_id: sun.sun
  state: 'above_horizon'
```

```yaml
condition:
  condition: state  # from sunset until sunrise
  entity_id: sun.sun
  state: 'below_horizon'
```

#### Sun elevation condition

The sun elevation can be used to test if the sun has set or risen, it is dusk, it is night, etc. when a trigger occurs.
For an in-depth explanation of sun elevation, see [sun elevation trigger][sun_elevation_trigger].

[sun_elevation_trigger]: /docs/automation/trigger/#sun-elevation-trigger

```yaml
condition:
  condition: and  # 'twilight' condition: dusk and dawn, in typical locations
  conditions:
    - condition: template
      value_template: {% raw %}'{{ state_attr("sun.sun", "elevation") < 0 }}'{% endraw %}
    - condition: template
      value_template: {% raw %}'{{ state_attr("sun.sun", "elevation") > -6 }}'{% endraw %}
```

```yaml
condition:
  condition: template  # 'night' condition: from dusk to dawn, in typical locations
  value_template: {% raw %}'{{ state_attr("sun.sun", "elevation") < -6 }}'{% endraw %}
```

#### Sunset/sunrise condition

The sun condition can also test if the sun has already set or risen when a trigger occurs. The `before` and `after` keys can only be set to `sunset` or `sunrise`. They have a corresponding optional offset value (`before_offset`, `after_offset`) that can be added, similar to the [sun trigger][sun_trigger]. When both keys are used, the result is a logical `and` of separate conditions.

Note that if only `before` key is used, the condition will be `true` _from midnight_ until sunrise/sunset. If only `after` key is used, the condition will be `true` from sunset/sunrise _until midnight_. Therefore, to cover time between sunset and sunrise one need to use `after: sunset` and `before: sunrise` as 2 separate conditions and combine them using `or`.

[sun_trigger]: /docs/automation/trigger/#sun-trigger

<div class='note warning'>
The sunset/sunrise conditions do not work in locations inside the polar circles, and also not in locations with a highly skewed local time zone.

In those cases it is advised to use conditions evaluating the solar elevation instead of the before/after sunset/sunrise conditions.
</div>

```yaml
condition:
  condition: sun
  after: sunset
  after_offset: "-01:00:00"
```

This is 'when light' - equivalent to a state condition on `sun.sun` of `above_horizon`.

```yaml
condition:
  - condition: sun
      after: sunrise
      before: sunset
```

This is 'when dark' - equivalent to a state condition on `sun.sun` of `below_horizon`.

We cannot use both keys in this case as it will always be `false`.

```yaml
condition:
  condition: or
  conditions:
    - condition: sun
      after: sunset
    - condition: sun
      before: sunrise
```

A visual timeline is provided below showing an example of when these conditions are true. In this chart, sunrise is at 6:00, and sunset is at 18:00 (6:00 PM). The green areas of the chart indicate when the specified conditions are true.

<img src='/images/docs/scripts/sun-conditions.svg' alt='Graphic showing an example of sun conditions' />

### Template condition

The template condition tests if the [given template][template] renders a value equal to true. This is achieved by having the template result in a true boolean expression or by having the template render 'true'.

```yaml
condition:
  condition: template
  value_template: "{% raw %}{{ (state_attr('device_tracker.iphone', 'battery_level')|int) > 50 }}{% endraw %}"
```

Within an automation, template conditions also have access to the `trigger` variable as [described here][automation-templating].

[template]: /topics/templating/
[automation-templating]: /getting-started/automation-templating/

### Time condition

The time condition can test if it is after a specified time, before a specified time or if it is a certain day of the week.

```yaml
condition:
  condition: time
  # At least one of the following is required.
  after: '15:00:00'
  before: '02:00:00'
  weekday:
    - mon
    - wed
    - fri
```

Valid values for `weekday` are `mon`, `tue`, `wed`, `thu`, `fri`, `sat`, `sun`.
Note that if only `before` key is used, the condition will be `true` *from midnight* until the specified time.
If only `after` key is used, the condition will be `true` from the specified time *until midnight*.
Time condition windows can span across the midnight threshold if **both** `after` and `before` keys are used. In the example above, the condition window is from 3pm to 2am.

<div class='note tip'>

A better weekday condition could be by using the [Workday Binary Sensor](/integrations/workday/).

</div>

### Zone condition

Zone conditions test if an entity is in a certain zone. For zone automation to work, you need to have set up a device tracker platform that supports reporting GPS coordinates.

```yaml
condition:
  condition: zone
  entity_id: device_tracker.paulus
  zone: zone.home
```

### Examples

```yaml
condition:
  - condition: numeric_state
    entity_id: sun.sun
    value_template: '{{ state.attributes.elevation }}'
    below: 1
  - condition: state
    entity_id: light.living_room
    state: 'off'
  - condition: time
    before: '23:00:00'
    after: '14:00:00'
  - condition: state
    entity_id: script.light_turned_off_5min
    state: 'off'
```
