---
title: "Multiple Dashboards"
description: "Multiple powerful and configurable dashboards in Home Assistant."
---

You can define multiple dashboards in Home Assistant. Each dashboard can be added to the sidebar. This makes it possible to create separate control dashboards for each individual part of your house.

You can manage your dashboards via the user interface. Go to **Settings** -> **Dashboards**. Here you can see all defined dashboards and create new ones.

## Using YAML for the default dashboard

To change the default dashboard, create a new file `ui-lovelace.yaml` in your configuration directory and add the following section to your `configuration.yaml` and restart Home Assistant:

```yaml
lovelace:
  mode: yaml
```

A good way to start this file is to copy and paste the "Raw configuration" from the UI so your manual configuration starts the same as your existing UI.

- Click `Overview` in your sidebar.
- Click the three dots menu (top-right) and click on `Edit Dashboard`.
- Click the three dots menu again and click on `Raw configuration editor`.
- There you see the configuration for your current dashboard. Copy that into the `<config>/ui-lovelace.yaml` file.

Once you take control of your UI via YAML, the Home Assistant interface for modifying it won't be available anymore and new entities will not automatically be added to your UI.

When you make changes to `ui-lovelace.yaml`, you don't have to restart Home Assistant or refresh the page. Just hit the refresh button in the menu at the top of the UI.

To revert back to using the UI to edit your dashboard, remove the `lovelace` section from your `configuration.yaml` and copy the contents of your `ui-lovelace.yaml` into the raw configuration section of Home Assistant and restart.

## Adding more dashboards with YAML

It is also possible to use YAML to define multiple dashboards. Each dashboard will be loaded from its own YAML file.

```yaml
lovelace:
  mode: yaml
  # Include external resources only add when mode is yaml, otherwise manage in the resources in the dashboard configuration panel.
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
      filename: dashboards.yaml
```

{% configuration dashboards %}
mode:
  required: true
  description: "In what mode should the main dashboard be, `yaml` or `storage` (UI managed)."
  type: string
resources:
  required: false
  description: "List of resources that should be loaded. Only use this when mode is `yaml`. If you change anything here, click the three dots menu (top-right) and click on `Reload resources` to pick up changes without restarting Home Assistant. You can also call `lovelace.reload_resources` service directly."
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
  description: Additional YAML dashboards. The key is used for the URL and should contain a hyphen (`-`)
  type: map
  keys:
    mode:
      required: true
      description: "The mode of the dashboard, this should always be `yaml`. Dashboards in `storage` mode can be created in the configuration panel."
      type: string
    filename:
      required: true
      description: "The file in your `config` directory where the configuration for this panel is."
      type: string
    title:
      required: true
      description: "The title of the dashboard, will be used in the sidebar."
      type: string
    icon:
      required: false
      description: The icon to show in the sidebar. You can use any icon from [MaterialDesignIcons.com](https://materialdesignicons.com). Prefix the icon name with `mdi:`, ie `mdi:home`.
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

As a super minimal example of a dashboard config, here's the bare minimum you will need for it to work:

```yaml
title: My Awesome Home
views:
    # View tab title.
  - title: Example
    cards:
        # The markdown card will render markdown text.
      - type: markdown
        title: Dashboard
        content: >
          Welcome to your **dashboard**.
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
        title: Dashboard
        content: >
          Welcome to your **dashboard**.
```
