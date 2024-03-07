---
title: "Views"
description: "A view is a tab inside a dashboard."
---

A view is a tab inside a dashboard. Views control the layout.

<p class='img'>
    <img src='/images/dashboards/layout-types.png' alt='The three basic view layouts: Panel, sidebar, and masonry'>
    The three basic view layouts: panel, sidebar, and masonry
</p>

There are four different view types:

- **Panel**: Displays one card in full width. For example a map or an image.
- **Sidebar**: Arranges cards in 2 columns, a wide one and a smaller one on the right.
- **Masonry (default)**: Arranges cards in columns based on their card size.
- **Sections (experimental)**: Arranges cards in a grid system and lets you group them in sections.

## Adding a view to a dashboard

1. To add a view to your user interface, in the top right corner, select the pencil icon.
2. Then, select the `+` button in the top menu bar.

    <p class="img">
      <img src="/images/dashboards/views.png" alt="Views toolbar">
      Use titles and icons to describe the content of views.
    </p>

## Path

You can link to one view from a card in another view when using cards that support navigation (`navigation_path`). The string supplied here will be appended to the string `/lovelace/` to create the path to the view. Do not use special characters in paths. Do not begin a path with a number. This will cause the parser to read your path as a view index.

### Example

View configuration:

```yaml
- title: Living room
  # the final path is /lovelace/living_room
  path: living_room
```

Picture card configuration:

```yaml
- type: picture
  image: /local/living_room.png
  tap_action:
    action: navigate
    navigation_path: /lovelace/living_room
```

## View icon

If you define a view icon, the icon instead of the title will be displayed, the title will then be used as a tool-tip.

### Example

```yaml
- title: Garden
  icon: mdi:flower
```

## Visible

You can specify the visibility of views as a whole or per-user. (Note: This is only for the display of the tabs. The URL path is still accessible)

### Example

```yaml
views:
  - title: Ian
    visible:
      - user: 581fca7fdc014b8b894519cc531f9a04
    cards:
      ...
  - title: Chelsea
    visible:
      - user: 6e690cc4e40242d2ab14cf38f1882ee6
    cards:
      ...
  - title: Admin
    visible: db34e025e5c84b70968f6530823b117f
    cards:
      ...
```

### Options for visible objects

If you define `visible` as objects instead of a boolean to specify conditions for displaying the view tab:

{% configuration badges %}
user:
  required: true
  description: User ID that can see the view tab (unique hex value found on the Users configuration page).
  type: string
{% endconfiguration %}

## Type

You can change the layout of a view by using a different view type. The default is [`masonry`](/dashboards/masonry).

### Example

```yaml
- title: Map
  type: panel
  cards:
    - type: map
      entities:
        - device_tracker.demo_paulus
        - zone.home
```

## Theme

Set a separate [theme](/integrations/frontend/#themes) for the view and its cards.

### Example

```yaml
- title: Home
  theme: happy
```

## Background

You can style the background of your views with a [theme](/integrations/frontend/#themes). You can use the CSS variable `lovelace-background`. For wallpapers you probably want to use the example below, more options can be found [here](https://developer.mozilla.org/en-US/docs/Web/CSS/background).

### Example

```yaml
# Example configuration.yaml entry
frontend:
  themes:
    example:
      lovelace-background: center / cover no-repeat url("/local/background.png") fixed
```

## Subview

A "View" can be marked as "Subview". Subviews won’t show up in the navigation bar on top of the sidebar. Subviews can, for instance, be used to show detailed information; you could link to this subview from a page with a clean look with only basic information (by using [cards that support the `navigate` action](/dashboards/actions)). Think of a view with a few thermostats and a subview with status information on the heating/cooling device.

When on the subview, the navigation bar only shows the name of the subview and a back button (no icon is shown).
By default, clicking on back button will navigate to the previous view but a custom back path (`back_path`) can be set.

You can access subviews from other parts of your dashboard by using [cards that support the `navigate` action](/dashboards/actions).

### Example

Simple subview:

```yaml
- title: Map
  subview: true
```

Subview with custom back path:

```yaml
- title: Map
  subview: true
  back_path: /lovelace/home
```

{% configuration views %}
views:
  required: true
  description: A list of view configurations.
  type: list
  keys:
    type:
      required: false
      description: The type of the view.
      type: string
      default: masonry
    title:
      required: true
      description: The title or name.
      type: string
    badges:
      required: false
      description: List of entities IDs or `badge` objects to display as badges. Note that badges do not show when view is in panel mode.
      type: list
    cards:
      required: false
      description: Cards to display in this view.
      type: list
    path:
      required: false
      description: Paths are used in the URL.
      type: string
      default: view index
    icon:
      required: false
      description: Icon-name from Material Design Icons. You can use any icon from [Material Design Icons](https://pictogrammers.com/library/mdi/). Prefix the icon name with `mdi:`, ie `mdi:home`. Only for "View", not for "Subview".
      type: string
    background:
      required: false
      description: Style the background using CSS.
      type: string
    theme:
      required: false
      description: Themes view and cards.
      type: string
    visible:
      required: false
      description: "Hide/show the view tab from all users or a list of individual `visible` objects."
      type: [boolean, list]
      default: true
    subview:
      required: false
      description: Mark the view as "Subview".
      type: boolean
      default: false
    back_path:
      required: false
      description: Only for "Subview". Path to navigate when clicking on back button.
      type: string
{% endconfiguration %}

### Example

View configuration:

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

Subview configuration:

```yaml
- title: "Energieprijzen"
  path: "energieprijzen"
  subview: true
  back_path: "/ui-data/climate"

  cards:
    - type: entities
      entities:
        - sensor.today_avg_price
```

## Related topics

- [Masonry view](/dashboards/masonry/)
- [Panel view](/dashboards/panel/)
- [Sidebar view](/dashboards/sidebar/)
- [Sections view](/dashboards/sections/)