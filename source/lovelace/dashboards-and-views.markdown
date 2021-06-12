---
title: "Dashboards and Views"
description: "The Lovelace UI is a powerful and configurable interface for Home Assistant."
---

You can define multiple dashboards in Lovelace. Each dashboard can be added to the sidebar. This makes it possible to create separate control dashboards for each individual part of your house.

You can manage your dashboards via the user interface. Go to **Configuration** -> **Lovelace Dashboards**. Here you can see all defined dashboards and create new ones.

### Using YAML for the default dashboard

To change the default dashboard, create a new file `ui-lovelace.yaml` in your configuration directory and add the following section to your `configuration.yaml` and restart Home Assistant:

```yaml
lovelace:
  mode: yaml
```

A good way to start this file is to copy and paste the "Raw configuration" from the UI so your manual configuration starts the same as your existing UI.

- Click `Overview` in your sidebar.
- Click the three dots menu (top-right) and click on `Edit Dashboard`.
- Click the three dots menu again and click on `Raw configuration editor`.
- There you see the configuration for your current Lovelace UI. Copy that into the `<config>/ui-lovelace.yaml` file.

Once you take control of your UI via YAML, the Home Assistant interface for modifying it won't be available anymore and new entities will not automatically be added to your UI.

When you make changes to `ui-lovelace.yaml`, you don't have to restart Home Assistant or refresh the page. Just hit the refresh button in the menu at the top of the UI.

To revert back to using the UI to edit your Lovelace interface, remove the `lovelace` section from your `configuration.yaml` and copy the contents of your `ui-lovelace.yaml` into the raw configuration section of Home Assistant and restart.

### Adding more dashboards with YAML

It is also possible to use YAML to define multiple dashboards. Each dashboard will be loaded from its own YAML file.

```yaml
lovelace:
  mode: yaml
  # Include external resources only add when mode is yaml, otherwise manage in the resources in the lovelace configuration panel.
  resources:
    - url: /local/my-custom-card.js
      type: module
    - url: /local/my-webfont.css
      type: css
  # Add more dashboards
  dashboards:
    lovelace-generated: # Needs to contain a hyphen (-)
      mode: yaml
      filename: notexist.yaml
      title: Generated
      icon: mdi:tools
      show_in_sidebar: true
      require_admin: true
    lovelace-hidden:
      mode: yaml
      title: hidden
      show_in_sidebar: false
      filename: hidden.yaml
```

You can also add YAML dashboards when your main dashboard is UI configured:

```yaml
lovelace:
  mode: storage
  # Add yaml dashboards
  dashboards:
    lovelace-yaml:
      mode: yaml
      title: YAML
      icon: mdi:script
      show_in_sidebar: true
      filename: lovelace.yaml
```

{% configuration Lovelace %}
mode:
  required: true
  description: "In what mode should the main Lovelace panel be, `yaml` or `storage` (UI managed)."
  type: string
resources:
  required: false
  description: "List of resources that should be loaded when you use Lovelace. Only use this when mode is `yaml`. If you change anything here, click the three dots menu (top-right) and click on `Reload resources` for Lovelace to pick up changes without restarting Home Assistant. You can also call `lovelace.reload_resources` service directly."
  type: list
  keys:
    url:
      required: true
      description: The URL of the resource to load.
      type: string
    type:
      required: true
      description: "The type of resource, this should be either `module` for a JavaScript module or `css` for a StyleSheet."
      type: string
dashboards:
  required: false
  description: Additional Lovelace YAML dashboards. The key is used for the URL and should contain a hyphen (`-`)
  type: map
  keys:
    mode:
      required: true
      description: "The mode of the dashboard, this should always be `yaml`. Dashboards in `storage` mode can be created in the Lovelace configuration panel."
      type: string
    filename:
      required: true
      description: "The file in your `config` directory where the Lovelace configuration for this panel is."
      type: string
    title:
      required: true
      description: "The title of the dashboard, will be used in the sidebar."
      type: string
    icon:
      required: false
      description: The icon to show in the sidebar. You can use any icon from [MaterialDesignIcons.com](http://materialdesignicons.com). Prefix the icon name with `mdi:`, ie `mdi:home`.
      type: string
    show_in_sidebar:
      required: false
      description: Should this dashboard be shown in the sidebar.
      type: boolean
      default: true
    require_admin:
      required: false
      description: Should this dashboard be only accessible for admin users.
      type: boolean
      default: false
{% endconfiguration %}

As a super minimal example of a Lovelace dashboard config, here's the bare minimum you will need for it to work:

```yaml
title: My Awesome Home
views:
    # View tab title.
  - title: Example
    cards:
        # The markdown card will render markdown text.
      - type: markdown
        title: Lovelace
        content: >
          Welcome to your **Lovelace UI**.
```

A slightly more advanced example:

```yaml
title: My Awesome Home
views:
    # View tab title.
  - title: Example
    # Unique path for direct access /lovelace/${path}
    path: example
    # Each view can have a different theme applied. Theme should be defined in the frontend.
    theme: dark-mode
    # The cards to show on this view.
    cards:
        # The filter card will filter entities for their state
      - type: entity-filter
        entities:
          - device_tracker.paulus
          - device_tracker.anne_there
        state_filter:
          - 'home'
        card:
          type: glance
          title: People that are home

        # The picture entity card will represent an entity with a picture
      - type: picture-entity
        image: https://www.home-assistant.io/images/default-social.png
        entity: light.bed_light

    # Specify a tab icon if you want the view tab to be an icon.
  - icon: mdi:home-assistant
    # Title of the view. Will be used as the tooltip for tab icon
    title: Second view
    cards:
        # Entities card will take a list of entities and show their state.
      - type: entities
        # Title of the entities card
        title: Example
        # The entities here will be shown in the same order as specified.
        # Each entry is an entity ID or a map with extra options.
        entities:
          - light.kitchen
          - switch.ac
          - entity: light.living_room
            # Override the name to use
            name: LR Lights

        # The markdown card will render markdown text.
      - type: markdown
        title: Lovelace
        content: >
          Welcome to your **Lovelace UI**.
```

### Views

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
      description: List of entities IDs or `badge` objects to display as badges. Note that badges do not show when view is in panel mode.
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
      description: Icon-name from Material Design Icons. You can use any icon from [MaterialDesignIcons.com](http://materialdesignicons.com). Prefix the icon name with `mdi:`, ie `mdi:home`.
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

#### Example

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

## Path

You can link to one view from a card in another view when using cards that support navigation (`navigation_path`). The string supplied here will be appended to the string `/lovelace/` to create the path to the view. Do not use special characters in paths. Do not begin a path with a number. This will cause the parser to read your path as a view index.

#### Example

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

#### Example

```yaml
- title: Garden
  icon: mdi:flower
```

## Visible

You can specify the visibility of views as a whole or per-user. (Note: This is only for the display of the tabs. The URL path is still accessible)

#### Example

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

### Options For Visible

If you define `visible` as objects instead of a boolean to specify conditions for displaying the view tab:

{% configuration badges %}
user:
  required: true
  description: User ID that can see the view tab (unique hex value found on the Users configuration page).
  type: string
{% endconfiguration %}

## Panel

Setting panel true sets the view to panel mode. In this mode the first card is rendered full-width, other cards in the view will not be rendered. This mode is good when using cards like `map`, `stack` or `picture-elements`. Note that badges will not appear in Panel Mode.

#### Example

```yaml
- title: Map
  panel: true
  cards:
    - type: map
      entities:
        - device_tracker.demo_paulus
        - zone.home
```

## Theme

Set a separate [theme](/integrations/frontend/#themes) for the view and its cards.

#### Example

```yaml
- title: Home
  theme: happy
```

## Background

You can style the background of your views with a [theme](/integrations/frontend/#themes). You can use the CSS variable `lovelace-background`. For wallpapers you probably want to use the example below, more options can be found [here](https://developer.mozilla.org/en-US/docs/Web/CSS/background).

#### Example

```yaml
# Example configuration.yaml entry
frontend:
  themes:
    example:
      lovelace-background: center / cover no-repeat url("/local/background.png") fixed
```
