---
title: "Card naming"
description: "Customize how entity names are displayed on dashboard cards."
related:
  - docs: /dashboards/tile/
    title: Tile card
  - docs: /dashboards/button/
    title: Button card
  - docs: /dashboards/entities/
    title: Entities card
---

All dashboard cards and badges that use an entity support flexible name configuration. This allows you to display custom text, show contextual information like area or device names, or use the entity name instead of its friendly name.

The name configuration helps you avoid redundant information (like repeating device names on every card) and create more contextual, easier-to-understand dashboards.

## Simple string name

The simplest way to set a custom name is to use a string to override the entity's display name.

```yaml
name: "My custom name"
```

{% configuration name-string %}
name:
  required: false
  description: A custom string to display as the name.
  type: string
{% endconfiguration %}

## Name object

The name can also be configured as an object with a `type` property to display contextual information about the entity.

### Entity name

Displays the entity name instead of the friendly name. The entity name is the specific function or data point the entity represents, without the device or area prefix.

```yaml
name:
  type: entity
```

This is useful when you want to avoid repeating device or area names that are already included in the friendly name.

{% configuration name-entity %}
name:
  required: false
  description: Name configuration object.
  type: map
  keys:
    type:
      required: true
      description: "Type of name to display. Use `entity` to show the entity name."
      type: string
{% endconfiguration %}

### Device name

Displays the name of the device the entity belongs to.

```yaml
name:
  type: device
```

{% configuration name-device %}
name:
  required: false
  description: Name configuration object.
  type: map
  keys:
    type:
      required: true
      description: "Type of name to display. Use `device` to show the device name."
      type: string
{% endconfiguration %}

### Area name

Displays the name of the area the entity is assigned to.

```yaml
name:
  type: area
```

{% configuration name-area %}
name:
  required: false
  description: Name configuration object.
  type: map
  keys:
    type:
      required: true
      description: "Type of name to display. Use `area` to show the area name."
      type: string
{% endconfiguration %}

### Floor name

Displays the name of the floor where the entity's area is located.

```yaml
name:
  type: floor
```

{% configuration name-floor %}
name:
  required: false
  description: Name configuration object.
  type: map
  keys:
    type:
      required: true
      description: "Type of name to display. Use `floor` to show the floor name."
      type: string
{% endconfiguration %}

### Custom text

Displays custom static text using the object syntax. This is useful when combining with other name types in a list.

```yaml
name:
  type: text
  text: "My label"
```

{% configuration name-text %}
name:
  required: false
  description: Name configuration object.
  type: map
  keys:
    type:
      required: true
      description: "Type of name to display. Use `text` to show custom text."
      type: string
    text:
      required: true
      description: The custom text to display.
      type: string
{% endconfiguration %}

## Combining multiple name parts

You can combine multiple name components by using a list. This allows you to create hybrid names with contextual information. A space is automatically added between each component.

If a name component does not have a value, like when an entity has no area assigned, Home Assistant will automatically skip that component. This means only the components with values will be shown, and you will not see empty spaces or errors in the card name.
```yaml
name:
  - type: area
  - type: device
```

This example would display something like "Living Room Light Switch".

{% configuration name-list %}
name:
  required: false
  description: A list of names to combine. Each item must be a name object.
  type: list
{% endconfiguration %}

## Examples

### Simple string name

```yaml
type: tile
entity: light.living_room_ceiling_light
name: "Ceiling light"
```

This is the simplest way to set a custom name, overriding the entity's display name with a static string.

### Using entity name to avoid repetition

```yaml
type: tile
entity: sensor.living_room_sensor_temperature
name:
  type: entity
```

This displays the entity name "Temperature" instead of the full friendly name "Living room sensor Temperature", avoiding repetition when the card is already grouped by area.

### Combining device and area

```yaml
type: tile
entity: media_player.living_room_tv
name:
  - type: area
  - type: device
```

This combines the area name with the device name, displaying something like "Living room TV".

### Using custom text with other name types

```yaml
type: button
entity: switch.kitchen_lights
name:
  - type: area
  - type: text
    text: "lights"
```

This would display "Kitchen lights" by combining the area name with custom text.
