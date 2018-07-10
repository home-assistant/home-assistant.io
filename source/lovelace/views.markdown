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

{% configuration %}
views:
  required: true
  description: A list of view configurations.
  type: list
  keys:
    title:
      required: true
      description: A title for this view.
      type: string
    cards:
      required: true
      description: List of cards to render in this view.
      type: list
    id:
      required: false
      description: The id to use in URL path of this view.
      type: string
      default: view index
    icon:
      required: false
      description: The icon for the view.
      type: string
    panel:
      required: false
      description: Renders the view in panel mode.
      type: boolean
      default: "false"
{% endconfiguration %}

<p class='img'>
  <img src='/images/lovelace/lovelace_views.gif' alt='Screenshot of views'>
  Use titles or icons for views in the toolbar.
</p>

## {% linkable_title IDs %}

The ID is used link to this view from other cards, on a different views, that support navigation (`navigation_path`). Do not use special characters here.

### {% linkable_title Example %}

View config:

```yaml
- title: Living room
  id: living_room
```

Picture card config:

```yaml
- type: picture
  image: /local/living_room.png
  navigation_path: /lovelace/living_room
```

## {% linkable_title Icons %}

You can use icons instead of text-titels for your view. The title will be used as a tooltip in this case.

### {% linkable_title Example %}

```yaml
- title: Garden
  icon: mdi:flower
```

## {% linkable_title Panel mode %}

This renders the first card on full view size, other cards in this view will not be rendered. Good for cards like map, stack or picture-elements.

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

## {% linkable_title Themes %}

You can set a [theme](/frontend/#themes) per view. Theme is currently only partially usable (font color works).

### {% linkable_title Example %}

```yaml
- title: Home
  theme: dark-mode
```

## {% linkable_title Backround %}

You can style the background of views using CSS. For wallpapers you probably want to use the example below, more options can be found [here](https://developer.mozilla.org/en-US/docs/Web/CSS/background).

### {% linkable_title Example %}

```yaml
- title: Living room
  background: center / cover no-repeat url("/local/background.png") fixed
```
