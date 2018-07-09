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

These are exactly as before, tab views with icons or text that help you manage large dashboards with many entities. The views have now deep links like `/lovelace/0`. You can also assign your own [custom ids](/lovelace/views/#custom-id).

- Using custom id in view, for [nicer navigation paths](/lovelace/views/#custom-id) in URLs.
- Using [icons](/lovelace/views/#icons) instead of text.
- Using a card to [fill a complete view](/lovelace/views/#panel-view), just like panels.
- Using [themes](/lovelace/views/#themes) in views.

| Name | Type | Default | Description
| ---- | ---- | ------- | -----------
| title | string | Optional | Text title of the view
| id | string | number | The id to use in URL path of this view
| icon | string | Optional | The material design icon for the view, uses this instead of title
| panel | boolean | false | Marks view as a panel reusing the first card in the list

<p class='img'>
<img src='/images/lovelace/lovelace_views.gif' alt='Screenshot of views'>
Screenshot of views.
</p>

## {% linkable_title Icons %}

You can use icons instead of text for your view tabs. The title in the example will be used as a tooltip.

### {% linkable_title Example %}

```yaml
views:
- icon: mdi:settings
  title: Debugging
```

## {% linkable_title Panel view %}

This type of view uses the first card in the `cards` array to expand it to occupy the complete view space, similar to panels. One very good practical use will be for floor plan type of cards.

### {% linkable_title Example %}

```yaml
views:
- icon: mdi:settings
  id: debug
  title: Floorplan
  panel: true
    cards:
      - type: picture-elements
        image: /local/floorplans/main.jpg
        elements:
          - type: state-icon
            tap_action: toggle
            entity: light.ceiling_lights
            style:
              top: 47%
              left: 42%
```

## {% linkable_title Themes %}

You can also set a [theme](/frontend/#themes) per view.

> Theme is currently only partially usable (font color works)

```yaml
views:
- icon: mdi:heart
  id: debug
  title: Home
  theme: dark-mode
```

## {% linkable_title Custom ID %}

You can now assign a custom id to a view, for nicer navigation paths in URLs. This id allows you to deep-link navigation to this view from cards that allow `navigation_path`.

### {% linkable_title Example %}

View:

```yaml
views:
- icon: mdi:settings
  id: debugging
```

Picture card:

```yaml
- type: picture
  image: /local/debug.jpg
  navigation_path: /lovelace/debugging
```
