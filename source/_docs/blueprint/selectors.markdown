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
- [Config entry selector](#config-entry-selector)
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
- [State selector](#state-selector)
- [Target selector](#target-selector)
- [Template selector](#template-selector)
- [Text selector](#text-selector)
- [Theme selector](#theme-selector)
- [Time selector](#time-selector)

Interactive demos of each of these selectors can be found on the
[Home Assistant Design portal](https://design.home-assistant.io/#components/ha-selector).

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
        Limits the list of areas that provide entities of a certain domain(s),
        for example, [`light`](/integrations/light) or
        [`binary_sensor`](/integrations/binary_sensor). Can be either a string
        with a single domain, or a list of string domains to limit the selection to.
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

The output of this selector is `true` when the toggle was on, `false` otherwise.

## Color temperature selector

The color temperature selector provides a select that allows for selecting
a color temperature. The selector returns the number of mireds selected and
allows limiting the range of selectable mireds.

![Screenshot of the Color temperature selector](/images/blueprints/selector-color-temp.png)

```yaml
color_temp:
```

{% configuration color_temp %}
min_mireds:
  description: The minimum color temperature in mireds.
  type: integer
  default: 153
  required: false
max_mireds:
  description: The maximum color temperature in mireds.
  type: integer
  default: 500
  required: false
{% endconfiguration %}

The output of this selector is the number of mired selected, for example, `243`.

## Config entry selector

The config entry selector allows the user to select an integration
configuration entry. The selector returns the entry ID of the selected
integration configuration entry.

![Screenshot of the Configuration entry selector](/images/blueprints/selector-config-entry.png)

```yaml
config_entry:
```

{% configuration config_entry %}
integration:
  description: Limits the list of selectable configuration entries to a single integration domain.
  type: string
  required: false
{% endconfiguration %}

The output of this selector is the entry ID of the config entry, for example, `6b68b250388cbe0d620c92dd3acc93ec`.

## Date selector

The date selector shows a date input that allows the user to specify a date. 

![Screenshot of the Date selector](/images/blueprints/selector-date.png)

This selector does not have any other options; therefore, it only has its key.

```yaml
date:
```

The output of this selector is will contain the date in Year-Month-Day
(`YYYY-MM-DD`) format, for example, `2022-02-22`.

## Date & time selector

The date selector shows a date and time input that allows the user to specify a
date with a specific time. 

![Screenshot of the Date & time selector](/images/blueprints/selector-datetime.png)

This selector does not have any other options; therefore, it only has its key.

```yaml
datetime:
```

The output of this selector is will contain the date in Year-Month-Day
(`YYYY-MM-DD`) format and the time in 24-hour format, for example:
`2022-02-22 13:30:00`.

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
        Limits the list of devices that provide entities of a certain domain(s),
        for example, [`light`](/integrations/light) or
        [`binary_sensor`](/integrations/binary_sensor). Can be either a string
        with a single domain, or a list of string domains to limit the selection
        to.
      type: string
      required: false
    device_class:
      description: >
        Limits the list of entities to entities that have a certain device
        class, for example, `motion` or `window`.
      type: device_class
      required: false
multiple:
  description: >
    Allows selecting multiple devices. If set to `true`, the resulting value of
    this selector will be a list instead of a single string value.
  type: boolean
  default: false
  required: false
{% endconfiguration %}

The output of this selector is the device ID, or (in case `multiple` is set to
`true`) a list of devices IDs.

```yaml
# Example Device selector output result, when multiple is set to false
faadde5365842003e8ca55267fe9d1f4

# Example Device selector output result, when multiple is set to true
- faadde5365842003e8ca55267fe9d1f4
- 3da77cb054352848b9544d40e19de562
```

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

The duration select allow the user to select a time duration. This can be
helpful for, e.g., delays or offsets.

![Screenshot of the Duration selector](/images/blueprints/selector-duration.png)

```yaml
duration:
```

{% configuration attribute %}
enable_days:
  description: When `true`, the duration selector will allow selecting days.
  type: boolean
  default: false
  required: false
{% endconfiguration %}

The output of this selector is a mapping of the time values the user selected.
For example:

```yaml
days: 1 # Only when enable_days was set to true
hours: 12
minutes: 30
seconds: 15
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
  description: List of entity IDs to exclude from the selectable list.
  type: list
  required: false
include_entities:
  description: List of entity IDs to limit the selectable list to.
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
    Limits the list of entities to entities of a certain domain(s), for example,
    [`light`](/integrations/light) or
    [`binary_sensor`](/integrations/binary_sensor). Can be either a string
    with a single domain, or a list of string domains to limit the selection
    to.
  type: [string, list]
  required: false
device_class:
  description: >
    Limits the list of entities to entities that have a certain device class,
    for example, `motion` or `window`.
  type: device_class
  required: false
multiple:
  description: >
    Allows selecting multiple entities. If set to `true`, the resulting value of
    this selector will be a list instead of a single string value.
  type: boolean
  default: false
  required: false
{% endconfiguration %}

The output of this selector is the entity ID, or (in case `multiple` is set to
`true`) a list of entity IDs.

```yaml
# Example entity selector output result, when multiple is set to false
light.living_room

# Example entity selector output result, when multiple is set to true
- light.living_room
- light.kitchen
```

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

The icon selector shows an icon picker that allows the user to select an icon.

```yaml
icon:
```

{% configuration entity %}
placeholder:
  description: Placeholder icon to show, when no icon is selected.
  type: string
  required: false
{% endconfiguration %}

The output of this selector is a string containing the selected icon,
for example: `mdi:bell`.

## Location selector

The location selector allow a user to pick a location from a map and returns
the matching longitude and latitude coordinators. Optionally it supports
selecting the radius of the location.

![Screenshot of the Location selector](/images/blueprints/selector-location.png)

```yaml
location:
```

{% configuration entity %}
icon:
  description: An optional icon to show on the map.
  type: string
  required: false
radius:
  description: >
    Allow selecting the radius of the location. If enabled, the radius will
    be returned in meters.
  type: boolean
  default: false
  required: false
{% endconfiguration %}

The output of this selector is a mapping containing the latitude and longitude
of the selected location, and, if enabled, the radius.
For example:

```yaml
latitude: 50.935
longitude: 6.95
radius: 500 # Only provided when radius was set to true.
```

## Media selector

The media selector is a powerful selector that allows a user to easily select
media to play on a media device. Media can be a lot of things, for example,
cameras, local media, text-to-speech, Home Assistant Dashboads, and many more.

The user selects the device to play media on, and automatically limits the
selectable media suitable for the selected device.

![Screenshot of the Media selector](/images/blueprints/selector-media.png)

```yaml
media:
```

The output of the media selector, is an mapping with information about
the selected media device and the selected media to play. There is also
metadata, which is used by the frontend and should not be used in the
backend.

Example output:

```yaml
entity_id: media_player.living_room
media_content_id: media-source://tts/cloud?message=TTS+Message&language=en-US&gender=female
media_content_type: provider
metadata:
  title: TTS Message
  thumbnail: https://brands.home-assistant.io/_/cloud/logo.png
  media_class: app
  children_media_class: null
  navigateIds:
    - {}
    - media_content_type: app
      media_content_id: media-source://tts
    - media_content_type: provider
      media_content_id: >-
        media-source://tts/cloud?message=TTS+Message&language=en-US&gender=female
```

## Number selector

The number selector shows either a number input or a slider input, that allows
the user to specify a numeric value. The value of the input will contain
the select value.

![Screenshot of a number selector](/images/blueprints/selector-number.png)

On the user interface, the input can either be in a slider or number mode.
Both modes limit the user input by a minimum and maximum value, and can
have a unit of measurement to go with it.

In its most basic form, this selector requires a minimum and maximum value:

```yaml
number:
  min: 0
  max: 100
```

{% configuration number %}
min:
  description: The minimum user-settable number value.
  type: [integer, float]
  required: true
max:
  description: The maximum user-settable number value.
  type: [integer, float]
  required: true
step:
  description: The step size of the number value. Set to `"any"` to allow any number.
  type: [integer, float, "any"]
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

The output of this selector is a number, for example: `42`

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

The output of this selector is a YAML object.

## RGB color selector

The RGB color selector allows the user to select an color from a color picker
from the user interface, and returns the RGB color value.

![Screenshot of the RGB Color selector](/images/blueprints/selector-color-rgb.png)

```yaml
color_rgb:
```

This selector does not have any other options; therefore, it only has its key.

The output of this selector is a list with the three (RGB) color value, for example: `[255, 0, 0]`.

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
  description: > 
    List of options that the user can choose from. Small lists (5 items or less), are displayed as radio buttons. When more items are added, a dropdown list is used.
  type: list
  required: true
multiple:
  description: >
    Allows selecting multiple options. If set to `true`, the resulting value of
    this selector will be a list instead of a single string value.
  type: boolean
  required: false
  default: false
custom_value:
  description: >
    Allows the user to enter and select a custom value (or multiple custom values
    in addition to the listed options if `multiple` is set to `true`).
  type: boolean
  required: false
  default: false
mode:
  description: >
    This can be either `list` (radio buttons) or `dropdown` (combobox) mode.
    When not specified, small lists (5 items or less), are displayed as
    radio buttons. When more items are added, a dropdown list is used. If
    `custom_value` is `true`, this setting will be ignored and the frontend
    will use a `dropdown` input.
  type: string
  required: false
{% endconfiguration %}

Alternatively, a mapping can be used for the options. When you want to return
a different value compared to how it is displayed to the user.

```yaml
select:
  options:
    - label: Red
      value: r
    - label: Green
      value: g
    - label: Blue
      value: b
```

{% configuration select_map %}
options:
  description: > 
    List of options that the user can choose from. Small lists (5 items or less), are displayed as radio buttons. When more items are added, a dropdown list is used.
  type: map
  required: true
  keys:
    label:
      description: The description to show in the UI for this item.
      required: true
      type: string
    value:
      description: The value to return when this label is selected.
      required: true
      type: string
{% endconfiguration %}

When `multiple` is `false`, the output of this selector is the string of
the selected option value. When selecting `Green` in the last example,
it returns: `g`, in the first example it would return `Green`.

When `multiple` is `true`, the output of this selector is the list of selected
option values. In this case, if `Green` was selected, in the first example it
would return ["Green"] and in the last example it returns ["g"].

## State selector

The state selector shows a list of states for a provided entity of which
one can be selected.

![Screenshot of an state selector](/images/blueprints/selector-state.png)

{% configuration state %}
entity_id:
  description: The entity ID of which an state can be selected from.
  type: string
  required: true
{% endconfiguration %}

The output of this selector is the select state (not the translated or
prettified name shown in the frontend).

For example: `heat_cool`.

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
        Limits the targets to entities of a certain domain(s),
        for example, [`light`](/integrations/light) or
        [`binary_sensor`](/integrations/binary_sensor). Can be either a
        with a single domain, or a list of string domains to limit the
        selection to.
      type: [string, list]
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

## Template selector

The template selector can be used to input a Jinja2 template. This is useful
for allowing more advanced user-input that use Jinja2 templates.

![Screenshot of an template selector](/images/blueprints/selector-template.png)

This selector does not have any other options; therefore, it only has its key.

```yaml
template:
```

The output of this selector is a template string.

## Text selector

The text selector can be used to input a text string. The value of the input will contain the selected text.

![Screenshot of text selectors](/images/blueprints/selector-text.png)

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
  description: An optional suffix to show after the text input box.
  type: string
  required: false
type:
  description: > 
    The type of input. This is a browser hint, which can improve
    the client-side validation of the input. The value isn't validated
    by the backend. Possible types are:
    `color`, `date`, `datetime-local`, `email`, `month`, `number`, `password`, `search`, `tel`, `text`, `time`, `url`, `week`.
  type: string
  required: false
{% endconfiguration %}

The output of this selector is a single string value.

## Theme selector

The theme selector allows for selecting a theme from the available themes
installed in Home Assistant.

![Screenshot of the Theme selector](/images/blueprints/selector-theme.png)

```yaml
theme:
```

This selector does not have any other options; therefore, it only has its key.

The output of this selector is will contain the selected theme, for example:
`waves_dark`.

## Time selector

The time selector shows a time input that allows the user to specify a time
of the day. 

![Screenshot of a time selector](/images/blueprints/selector-time.png)

This selector does not have any other options; therefore, it only has its key.

```yaml
time:
```

The output of this selector is will contain the time in 24-hour format,
for example, `23:59:59`.
