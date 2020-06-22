---
title: "Button Card"
sidebar_label: Button
description: "The Button card allows you to add buttons to perform tasks."
---

The Button card allows you to add buttons to perform tasks.

<p class='img'>
<img src='/images/lovelace/lovelace_entity_button_card.png' alt='Screenshot of the button card'>
Screenshot of the Button card.
</p>

## Visual Editor

<p class='img'>
<img src='https://i.imgur.com/HJybKBf.jpg' alt='Screenshot of the button card Visual Editor'>

### Fields

- **Entity**. Choose a Home Assistant entity from the dropdown menu.
- **Name**. Enter a name for the button. The default is the entity name.
- **Icon**. Choose an icon to overwrite the default entity picture or entity icon. 
- **Show Name?** Toggle to show or hide the button name. 
- **Show Icon?** Toggle to show or hide the button icon.
- **Icon Height**. Enter a custom height for the icon. The height is automatically set if no height is entered. 
- **Theme**. Choose a card theme from the dropdown menu.
- **Tap Action**. Choose an action from the dropdown menu. This action is taken on card tap. See [action documentation](/lovelace/actions/#tap-action).
- **Hold Action**. Choose an action from the dropdown menu. This action is taken on card tap and hold. See [action documentation](/lovelace/actions/#hold-action).

## YAML

### Required Variables

```yaml
type: button # string
```

- **type**. Button card.

### Optional Variables

```yaml
entity: light.living_room # string 
```
- **entity**. Home Assistant entity ID.

```yaml
name: Living Room Light # string // default: name of entity
```

- **name**. Overwrites the default name with a friendly name

```yaml
icon: hass:lightbulb # string // default: entity domain icon
```

- **icon**. Overwrites default entity picture or entity icon.

```yaml
show_name: false # boolean // default: true
```
- **show_name**. Shows/hides name.

```yaml
show_icon: true # boolean // default: true
```

- **show_icon**. Shows/hides icon.

```yaml
icon_height: 25px # string // default: auto
```

- **icon_height**. Sets the height for the icon. This is in pixels which is handled by the configuration UI.
- Advanced users can use other CSS values.

``` yaml
state_color: true # boolean // default: true
```

- **state_color**. Set to `true` to have icons colored when entity is active

```yaml
tap_action: # map
  action: toggle
```

- **tap_action**. Action taken on card tap. See [action documentation](/lovelace/actions/#tap-action)

```yaml
hold_action: # map
  action: more-info
```

- **hold_action** Action taken on card tap and hold. See [action documentation](/lovelace/actions/#hold-action).

```yaml
double_tap_action: # map 
  action: none
```

- **double_tap_action** Action taken on card double tap. See [action documentation](/lovelace/actions/#double-tap-action).

```yaml
theme: darkish # string
```

- **theme**. Set to any theme within `themes.yaml`


### Options For Exemptions

```yaml
user: USER_ID # string // required
```

**user**. User id that can see the view tab.


## Examples

Title and Script Service Example:

```yaml
type: button
name: Turn Off Lights
tap_action:
  action: call-service
  service: script.turn_on
  service_data:
    entity_id: script.turn_off_lights
```

<p class='img'>
<img src='/images/lovelace/lovelace_entity_button_complex_card.png' alt='Screenshot of the button card'>
Screenshot of the Button card with Title and Script Service.
</p>
