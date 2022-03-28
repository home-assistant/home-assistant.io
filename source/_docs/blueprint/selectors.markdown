---
title: "Selectors"
description: "Documentation on available selectors."
---

Selectors can be used to specify what values are accepted for a blueprint
input. The selector also defines how the input is shown in the user interface.

Some selectors can, for example, show a toggle button to turn something
on or off, while another select can filter a list of devices to show
only devices that have motion-sensing capabilities.

Having good selectors set on your blueprint automation inputs makes a
blueprint easier to use from the UI.

The following selectors are currently available:

- [Action selector](#action-selector)
- [Add-on selector](#add-on-selector)
- [Area selector](#area-selector)
- [Attribute selector](#attribute-selector)
- [Boolean selector](#boolean-selector)
- [Color temperature selector](#color-temperature-selector)
- [Date selector](#date-selector)
- [Date & time selector](#date--time-selector)
- [Device selector](#device-selector)
- [Duration selector](#duration-selector)
- [Entity selector](#entity-selector)
- [Icon selector](#icon-selector)
- [Location selector](#location-selector)
- [Media selector](#media-selector)
- [Number selector](#number-selector)
- [Object selector](#object-selector)
- [RGB color selector](#rgb-color-selector)
- [Select selector](#select-selector)
- [Target selector](#target-selector)
- [Text selector](#text-selector)
- [Theme selector](#theme-selector)
- [Time selector](#time-selector)

If no selector is defined, a text input for a single line will be shown.

## Action selector

The action selector allows the user to input one or more sequences of actions.
On the user interface, the action part of the automation editor will be shown.
The value of the input will contain a list of actions to perform.

![Screenshot of an action selector](/images/blueprints/selector-action.png)

This selector does not have any other options; therefore, it only has its key.

```yaml
action:
```

The output of this selector is a list of actions. For example:

```yaml
# Example Action selector output result
- service: scene.turn_on
  target:
    entity_id: scene.watching_movies
  metadata: {}
```

## Add-on selector

This can only be used on an installation with a Supervisor. For installations
that do not have that, an error will be displayed.

The add-on selector allows the user to input an add-on slug.
On the user interface, it will list all installed add-ons and use the slug of the
selected add-on.

TODO: Update screenshot, with a multiple variant
![Screenshot of an add-on selector](/images/blueprints/selector-addon.png)

This selector does not have any other options; therefore, it only has its key.

```yaml
# Example Add-on selector
addon:
```

The output of this selector is the slug of the selected add-on.
For example: `core_ssh`.

## Area selector

The area selector shows an area finder that can pick a single or multiple areas
based on the selector configuration. The value of the input will be the area ID,
or a list of area IDs, based on if `multiple` is set to `true`.

An area selector can filter the list of areas, based on properties of the devices
and entities that are assigned to those areas. For example, the areas list could
be limited to areas with entities provided by the [ZHA](/integrations/zha)
integration.

In its most basic form, this selector doesn't require any options, which will show
all areas.

TODO: Update screenshot to show multiple as well
![Screenshot of an area selector](/images/blueprints/selector-area.png)

```yaml
area:
```

{% configuration area %}
device:
  description: >
    When device options are provided, the list of areas is filtered by areas
    that at least provide one device that matches the given conditions.
  type: map
  keys:
    integration:
      description: >
        Can be set to an integration domain. Limits the list of areas that
        provide devices by the set integration domain, for example,
        [`zha`](/integrations/zha).
      type: string
      required: false
    manufacturer:
      description: >
        When set, it limits the list of areas that provide devices by the set
        manufacturer name.
      type: string
      required: false
    model:
      description: >
        When set, it limits the list of areas that provide devices that have
        the set model.
      type: string
      required: false
entity:
  description: >
    When entity options are provided, the list of areas is filtered by areas
    that at least provide one entity that matches the given conditions.
  type: map
  required: false
  keys:
    integration:
      description: >
        Can be set to an integration domain. Limits the list of areas that
        provide entities by the set integration domain, for example,
        [`zha`](/integrations/zha).
      type: string
      required: false
    domain:
      description: >
        Limits the list of areas that provide entities of a certain domain(s_,
        for example, [`light`](/integrations/light) or
        [`binary_sensor`](/integrations/binary_sensor). Can be either a string
        with a single domain, or a list of string domains to limit the selection
        to.
      type: [string, list]
      required: false
    device_class:
      description: >
        Limits the list of areas to areas that have entities with a certain
        device class, for example, `motion` or `window`.
      type: device_class
      required: false
multiple:
  description: >
    Allows selecting multiple areas. If set to `true`, the resulting value of
    this selector will be a list instead of a single string value.
  type: boolean
  default: false
  required: false
{% endconfiguration %}

The output of this selector is the area ID, or (in case `multiple` is set to
`true`) a list of area IDs.

```yaml
# Example Area selector output result, when multiple is set to false
living_room

# Example Area selector output result, when multiple is set to true
- living_room
- kitchen
```

### Example area selectors

An example area selector only shows areas that provide one or more lights or
switches provided by the [ZHA](/integrations/zha) integration.

```yaml
area:
  entity:
    integration: zha
    domain:
      - light
      - switch
```

Another example uses the area selector, which only shows areas that provide one
or more remote controls provided by the [deCONZ](/integrations/deconz)
integration. Multiple areas can be selected.

```yaml
area:
  multiple: true
  device:
    multiple: true
    integration: deconz
    manufacturer: IKEA of Sweden
    model: TRADFRI remote control
```

## Attribute selector

The attributes selector shows a list of state attribites from a provided entity
of which one can be selected.

This allows for selecting, e.g., the "Effect" attribute from a light entity, or the
"Next dawn" attribute from the `sun` entity.

![Screenshot of an attribute selector](/images/blueprints/selector-attribute.png)

{% configuration attribute %}
entity_id:
  description: The entity ID of which an state attribute can be selected from.
  type: string
  required: true
{% endconfiguration %}

The output of this selector is the selected attribute key (not the translated or
prettified name shown in the frontend).
For example: `next_dawn`.

## Boolean selector

The boolean selector shows a toggle that allows the user to turn on or off
the selected option. The input's value will contain the boolean value of that
toggle as a boolean value, being `true` or `false`.

![Screenshot of a boolean selector](/images/blueprints/selector-boolean.png)

The boolean selector can be incredibly useful for adding feature switches
to, for example, blueprints.

This selector does not have any other options; therefore, it only has its key.

```yaml
boolean:
```

## Color temperature selector

TODO

```yaml
color_temp:
```

{% configuration color_temp %}
min_mireds:
  description: TODO.
  type: integer
  default: TODO
  required: false
max_mireds:
  description: TODO.
  type: integer
  default: TODO
  required: false
{% endconfiguration %}

## Date selector

TODO

```yaml
date:
```

## Date & time selector

TODO

```yaml
datetime:
```

## Device selector

The device selector shows a device finder that can pick a single or multiple
devices based on the selector configuration. The value of the input will contain
the device ID or a list of device IDs, based on if `multiple` is set to `true`.

A device selector can filter the list of devices, based on things like the
manufacturer or model of the device, the entities the device provides or based
on the domain that provided the device.

![Screenshot of a device selector](/images/blueprints/selector-device.png)

In its most basic form, this selector doesn't require any options, which will show
all devices.

```yaml
device:
```

{% configuration device %}
integration:
  description: >
    Can be set to an integration domain. Limits the list of devices to devices
    provided by the set integration domain.
  type: string
  required: false
manufacturer:
  description: >
    When set, it limits the list of devices to devices provided by the set
    manufacturer name.
  type: string
  required: false
model:
  description: >
    When set, it limits the list of devices to devices that have the set model.
  type: string
  required: false
entity:
  description: >
    When entity options are provided, the list of devices is filtered by devices
    that at least provide one entity that matches the given conditions.
  type: map
  required: false
  keys:
    integration:
      description: >
        Can be set to an integration domain. Limits the list of devices that
        provide entities by the set integration domain, for example,
        [`zha`](/integrations/zha).
      type: string
      required: false
    domain:
      description: >
        Limits the list of devices that provide entities of a certain domain,
        for example, [`light`](/integrations/light)
        or [`binary_sensor`](/integrations/binary_sensor).
      type: string
      required: false
    device_class:
      description: >
        Limits the list of entities to entities that have a certain device
        class, for example, `motion` or `window`.
      type: device_class
      required: false
multiple:
  description: Allows selecting multiple devices. If set to `true`, the resulting value of this selector will be a list instead of a single string value.
  type: boolean
  default: false
  required: false
{% endconfiguration %}

### Example device selector

An example entity selector that, will only show devices that are:

- Provided by the [deCONZ](/integrations/deconz) integration.
- Are a Philips Hue Remote of Model RWL021.
- Provide a battery [sensor](/integrations/sensor).

And this is what is looks like in YAML:

```yaml
device:
  integration: deconz
  manufacturer: Philips
  model: RWL021
  entity:
    domain: sensor
    device_class: battery
```

## Duration selector

TODO

```yaml
duration:
```

## Entity selector

The entity selector shows an entity finder that can pick a single entity or a
list of entities based on the selector configuration. The value of the input
will contain the entity ID, or list of entity IDs, based on if `multiple` is
set to `true`.

An entity selector can filter the list of entities, based on things like the
class of the device, the domain of the entity or the domain that provided the
entity.

![Screenshot of an entity selector](/images/blueprints/selector-entity.png)

In its most basic form, this selector doesn't require any options, which will show
all entities.

```yaml
entity:
```

{% configuration entity %}
exclude_entities:
  description: TODO
  type: list
  required: false
include_entities:
  description: TODO
  type: list
  required: false
integration:
  description: >
    Can be set to an integration domain. Limits the list of entities to entities
    provided by the set integration domain, for example,
    [`zha`](/integrations/zha).
  type: string
  required: false
domain:
  description: >
    Limits the list of entities to entities of a certain domain, for example,
    [`light`](/integrations/light) or
    [`binary_sensor`](/integrations/binary_sensor).
  type: string
  required: false
device_class:
  description: >
    Limits the list of entities to entities that have a certain device class,
    for example, `motion` or `window`.
  type: device_class
  required: false
multiple:
  description: Allows selecting multiple entities. If set to `true`, the resulting value of this selector will be a list instead of a single string value.
  type: boolean
  default: false
  required: false
{% endconfiguration %}

### Example entity selector

An example entity selector that, will only show entities that are:

- Provided by the [ZHA](/integrations/zha) integration.
- From the [Binary Sensor](/integrations/binary_sensor) domain.
- Have presented themselves as devices of a motion device class.
- Allows selecting one or more entities.

And this is what it looks like in YAML:

```yaml
entity:
  multiple: true
  integration: zha
  domain: binary_sensor
  device_class: motion
```

## Icon selector

TODO

```yaml
icon:
```

{% configuration entity %}
placeholder:
  description: TODO
  type: string
  required: false
{% endconfiguration %}

## Location selector

TODO

```yaml
location:
```

{% configuration entity %}
icon:
  description: TODO
  type: str
  required: false
radius:
  description: TODO
  type: bool
  required: false
{% endconfiguration %}

Returns:

```yaml
latitude: X (float)
longitude: X (float)
radius: X (float)
```

## Media selector

TODO

```yaml
media:
```

Returns:

```yaml
entity_id: X
media_content_id: X
media_content_type: X
metadata: X`
```

## Number selector

The number selector shows either a number input or a slider input, that allows
the user to specify a numeric value. The value of the input will contain
the select value.

![Screenshot of a number selector](/images/blueprints/selector-number.png)

On the user interface, the input can either be in a slider or number mode.
Both modes limit the user input by a minimal and maximum value, and can
have a unit of measurement to go with it.

In its most basic form, this selector requires a minimal and maximum value:

```yaml
number:
  min: 0
  max: 100
```

{% configuration number %}
min:
  description: The minimal user-settable number value.
  type: [integer, float]
  required: true
max:
  description: The maximum user-settable number value.
  type: [integer, float]
  required: true
step:
  description: The step value of the number value.
  type: [integer, float]
  required: false
  default: 1
unit_of_measurement:
  description: Unit of measurement in which the number value is expressed in.
  type: string
  required: false
mode:
  description: This can be either `box` or `slider` mode.
  type: string
  required: false
  default: slider
{% endconfiguration %}

### Example number selectors

An example number selector that allows a user a percentage, directly in a
regular number input box.

```yaml
number:
  min: 0
  max: 100
  unit_of_measurement: "%"
```

A more visual variant of this example could be achieved using a slider.
This can be helpful for things like allowing the user to select a
brightness level of lights. Additionally, this example changes the brightness
in incremental steps of 10%.

```yaml
number:
  min: 0
  max: 100
  step: 10
  unit_of_measurement: "%"
  mode: slider
```

## Object selector

The object selector can be used to input arbitrary data in YAML form. This is useful for e.g. lists and dictionaries like service data. The value of the input will contain the provided data.

![Screenshot of an object selector](/images/blueprints/selector-object.png)

This selector does not have any other options; therefore, it only has its key.

```yaml
object:
```

## RGB color selector

TODO

```yaml
color_rgb:
```


## Select selector

The select selector shows a list of available options from which the user can choose. The value of the input contains the value of the selected option. Only a single option can be selected at a time.

![Screenshot of a select selector](/images/blueprints/selector-select.png)

The selector requires a list of options that the user can choose from.

```yaml
select:
  options:
    - Red
    - Green
    - Blue
```

{% configuration select %}
options:
  description: List of options that the user can choose from.
  type: [list, mapping]
  required: true
{% endconfiguration %}

TODO: Add example / description of mapping

```yaml
select:
  options:
    X: Y
```

## Target selector

The target selector is a rather special selector, allowing the user to select
targeted entities, devices or areas for service calls. The value of
the input will contain a special target format, that is accepted by
service calls.

The selectable targets can be filtered, based on entity or device properties.
Areas are only selectable as a target, if some entities or devices match
those properties in those areas.

![Screenshot of a target selector](/images/blueprints/selector-target.png)

In its most basic form, this selector does not require any options, which will allow the
user to target any entity, device or area available in the system.

```yaml
target:
```

{% configuration target %}
device:
  description: >
    When device options are provided, the targets are limited by devices
    that at least match the given conditions.
  type: map
  keys:
    integration:
      description: >
        Can be set to an integration domain. Limits the device targets that
        are provided devices by the set integration domain, for example,
        [`zha`](/integrations/zha).
      type: string
      required: false
    manufacturer:
      description: >
        When set, it limits the targets to devices provided by the set
        manufacturer name.
      type: string
      required: false
    model:
      description: When set, it limits the targets to devices by the set model.
      type: string
      required: false
entity:
  description: >
    When entity options are provided, the targets are limited by entities
    that at least match the given conditions.
  type: map
  required: false
  keys:
    integration:
      description: >
        Can be set to an integration domain. Limits targets to entities
        provided by the set integration domain, for example,
        [`zha`](/integrations/zha).
      type: string
      required: false
    domain:
      description: >
        Limits the targets to entities of a certain domain,
        for example, [`light`](/integrations/light) or
        [`binary_sensor`](/integrations/binary_sensor).
      type: string
      required: false
    device_class:
      description: >
        Limits the targets to entities with a certain
        device class, for example, `motion` or `window`.
      type: device_class
      required: false
{% endconfiguration %}

<div class='note'>

Targets are meant to be used with the `target` property of a service call in
a script sequence. For example:

```yaml
action:
  - service: light.turn_on
    target: !input lights
```

</div>

### Example target selectors

An example target selector that only shows targets that at least provide one
or more lights, provided by the [ZHA](/integrations/zha) integration.

```yaml
target:
  entity:
    integration: zha
    domain: light
```

Another example using the target selector, which only shows targets that
provide one or more remote controls, provided by the
[deCONZ](/integrations/deconz) integration.

```yaml
target:
  device:
    integration: deconz
    manufacturer: IKEA of Sweden
    model: TRADFRI remote control
```


TODO: Describe target result/return values

## Text selector

The text selector can be used to input a text string. The value of the input will contain the selected text.

![Screenshot of a text selector](/images/blueprints/selector-text.png)

Unless `multiline` is set to `true`, this selector behaves exactly like if no selector at all was specified, and will display a single line text input box on the user interface.

```yaml
text:
```

{% configuration text %}
multiline:
  description: Set to true to display the input as a multi-line text box on the user interface.
  type: boolean
  default: false
  required: false
suffix:
  description: TODO
  type: string
  required: false
type:
  description: TODO
  type: string
  required: false
{% endconfiguration %}

Types:
  - "color"
  - "date"
  - "datetime-local"
  - "email"
  - "month"
  - "number"
  - "password"
  - "search"
  - "tel"
  - "text"
  - "time"
  - "url"
  - "week"

## Theme selector

TODO

```yaml
theme:
```

## Time selector

The time selector shows a time input that allows the user to specify a time
of the day. The value of the input will contain the time in 24-hour format,
for example, `23:59:59`.

![Screenshot of a time selector](/images/blueprints/selector-time.png)

This selector does not have any other options; therefore, it only has its key.

```yaml
time:
```
