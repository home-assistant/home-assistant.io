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

All dashboard cards and badges that use an entity support flexible name configuration. This allows you to display custom text, show contextual information like area or device names, or show only the entity name.

The name configuration helps you avoid redundant information (like repeating device names on every card) and create more contextual, easier-to-understand dashboards.

## Default name

If you don't set a name on a card or badge, it shows the default name of the entity.
The default name is built from these parts, in this order:

1. The name of the parent device, if the entity belongs to a [child device](/docs/configuration/customizing-entities/#parent-and-child-devices)
2. The name of the device
3. The name of the entity

For example, a `Power` entity of a smart plug device called `Coffee machine` is shown as `Coffee machine Power`.
If the entity represents the main function of its device and you [turned on the attribute](/docs/configuration/customizing-entities/#changing-the-attributes-of-an-entity) **Main entity of the device**, it has the device name and is shown as `Coffee machine`.

Some parts are left out when they would not help to identify the entity:

- If you assign the entity to an area directly, instead of letting it use the area of its device, the device name is left out.
  For example, the `Outdoor temperature` sensor of a device called `Heating controller` is shown as `Heating controller Outdoor temperature`.
  If you assign the sensor to your outdoor area, it's shown as `Outdoor temperature`. 
- If the entity belongs to a child device that has its own area assigned, the parent device name is left out. For example, the main entity of a socket (child device) called `Lamp` on a power strip (parent device) called `Power strip` is shown as `Lamp` instead of `Power strip Lamp`.

To change the default name everywhere in Home Assistant, rename the entity or its device.
To change the name only on one card or badge, set the name in the card or badge as described below.

## Changing the name in the dashboard editor

1. In the top-right corner of your dashboard, select **Edit dashboard** ({% icon "mdi:pencil" %}), then select **Edit** on the card or badge you want to change.
2. If the editor has a **Content** section, expand it.
3. In the **Name** field, choose how to build the name:
   - To combine parts of the name, select **Composed**.
     - To add a part, select **Add**, then select **Entity**, **Device**, **Parent device**, **Area**, or **Floor**.
       To add your own text, enter it in the search field and select it.
     - To change the order, drag the parts.
     - To remove a part, select its {% icon "mdi:close" %} icon.
   - To enter your own name, select **Custom** and enter the name.
4. To go back to the default name, select **Restore default name** ({% icon "mdi:restore" %}).
5. Select **Save**.

You can also set the name in YAML, as described in the following sections.

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

Displays only the entity name. The entity name is the specific function or data point the entity represents, without the device or area name.
If the entity is the main entity of its device and has no name of its own, the device name is shown instead.

```yaml
name:
  type: entity
```

This is useful when you want to avoid repeating the device name, for example, when the card is already grouped with other cards of the same device.

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

### Parent device name

Displays the name of the parent device, if the entity belongs to a [child device](/docs/configuration/customizing-entities/#parent-and-child-devices).
For example, for a socket of a power strip, it shows the name of the power strip.

```yaml
name:
  type: parent_device
```

{% configuration name-parent-device %}
name:
  required: false
  description: Name configuration object.
  type: map
  keys:
    type:
      required: true
      description: "Type of name to display. Use `parent_device` to show the parent device name."
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

This displays the entity name "Temperature" instead of the default name "Living room sensor Temperature", avoiding repetition when the card is already grouped by area.

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
