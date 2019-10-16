---
title: "Views"
description: "The Lovelace UI is a powerful and configurable interface for Home Assistant."
---

To display cards on the UI you have to define them in views. Views sort cards in columns based on their `card size`. If you want to group some cards you have to use `stack` cards.

<p class="img">
  <img src="/images/lovelace/lovelace_views.png" alt="Views toolbar">
  Use titles and icons to describe the content of views.
</p>

{% configuration views %}
views:
  required: true
  description: A list of view configurations.
  type: list
  keys:
    title:
      required: true
      description: The title or name.
      type: string
    badges:
      required: false
      description: List of entities IDs or `badge` objects to display as badges.
      type: list
    cards:
      required: false
      description: Cards to display in this view.
      type: list
    path:
      required: false
      description: Paths are used in the URL, more info below.
      type: string
      default: view index
    icon:
      required: false
      description: Icon-name from Material Design Icons.
      type: string
    panel:
      required: false
      description: Renders the view in panel mode, more info below.
      type: boolean
      default: false
    background:
      required: false
      description: Style the background using CSS, more info below.
      type: string
    theme:
      required: false
      description: Themes view and cards, more info below.
      type: string
    visible:
      required: false
      description: "Hide/show the view tab from all users or a list of individual `visible` objects."
      type: [boolean, list]
      default: true
{% endconfiguration %}

## Options For Badges

If you define badges as objects instead of strings (by adding `entity:` before entity ID), allowing you to add more customizations:

{% configuration badges %}
entity:
  required: true
  description: Home Assistant entity ID.
  type: string
name:
  required: false
  description: Overwrites friendly name.
  type: string
icon:
  required: false
  description: Overwrites icon or entity picture.
  type: string
image:
  required: false
  description: The URL of an image.
  type: string
{% endconfiguration %}

## Options For Visible

If you define `visible` as objects instead of a boolean to specify conditions for displaying the view tab:

{% configuration badges %}
user:
  required: true
  description: User id that can see the view tab.
  type: string
{% endconfiguration %}

### Example

View config:

```yaml
- title: Living room
  badges:
    - device_tracker.demo_paulus
    - entity: light.ceiling_lights
      name: Ceiling Lights
      icon: mdi:bulb
    - entity: switch.decorative_lights
      image: /local/lights.png
```

## Paths

You can link to one view from another view by its path. For this use cards that support navigation (`navigation_path`). Do not use special characters in paths.

### Example

View config:

```yaml
- title: Living room
  # the final path is /lovelace/living_room
  path: living_room
```

Picture card config:

```yaml
- type: picture
  image: /local/living_room.png
  tap_action:
    action: navigate
    navigation_path: /lovelace/living_room
```

## Icons

If you define an icon the title will be used as a tool-tip.

### Example

```yaml
- title: Garden
  icon: mdi:flower
```

## Panel mode

This renders the first card on full width, other cards in this view will not be rendered. Good for cards like `map`, `stack` or `picture-elements`.

### Example

```yaml
- title: Map
  panel: true
  cards:
    - type: map
      entities:
        - device_tracker.demo_paulus
        - zone.home
```

## Themes

Set a separate [theme](/integrations/frontend/#themes) for the view and its cards.

### Example

```yaml
- title: Home
  theme: happy
```

### Background

You can style the background of your views with a [theme](/integrations/frontend/#themes). You can use the CSS variable `lovelace-background`. For wallpapers you probably want to use the example below, more options can be found [here](https://developer.mozilla.org/en-US/docs/Web/CSS/background).

#### Example

```yaml
# Example configuration.yaml entry
frontend:
  themes:
    example:
      lovelace-background: center / cover no-repeat url("/local/background.png") fixed
```
