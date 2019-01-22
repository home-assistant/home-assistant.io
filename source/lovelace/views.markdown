---
layout: page
title: "Views"
description: "The Lovelace UI is a powerful and configurable interface for Home Assistant."
date: 2018-07-01 10:28 +00:00
sidebar: true
comments: false
sharing: true
footer: true
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
      description: List of entities IDs to display as badge.
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
      default: "false"
    background:
      required: false
      description: Style the background using CSS, more info below.
      type: string
    theme:
      required: false
      description: Themes view and cards, more info below.
      type: string
{% endconfiguration %}

## {% linkable_title Paths %}

You can link to one view from another view by its path. For this use cards that support navigation (`navigation_path`). Do not use special characters in paths.

### {% linkable_title Example %}

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

## {% linkable_title Icons %}

If you define an icon the title will be used as a tool-tip.

### {% linkable_title Example %}

```yaml
- title: Garden
  icon: mdi:flower
```

## {% linkable_title Panel mode %}

This renders the first card on full width, other cards in this view will not be rendered. Good for cards like `map`, `stack` or `picture-elements`.

### {% linkable_title Example %}

```yaml
- title: Map
  panel: true
  cards:
    - type: map
      entities:
        - device_tracker.demo_paulus
        - zone.home
```

## {% linkable_title Background %}

Style the background of views using [CSS](https://en.wikipedia.org/wiki/Cascading_Style_Sheets). For wallpapers you probably want to use the example below, more options can be found [here](https://developer.mozilla.org/en-US/docs/Web/CSS/background).

### {% linkable_title Example %}

```yaml
- title: Living room
  background: center / cover no-repeat url("/local/background.png") fixed
```

## {% linkable_title Themes %}

Set a separate [theme](/components/frontend/#themes) for the view and its cards.

### {% linkable_title Example %}

```yaml
- title: Home
  theme: happy
```
