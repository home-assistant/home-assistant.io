---
title: "Lovelace YAML mode"
description: "Advanced users can switch on YAML mode for editing the Lovelace UI."
---

It is possible to customize your Home Assistant interface by writing in YAML instead of via the UI. To do so, you configure the Lovelace integration to be in YAML mode by adding the following to your `configuration.yaml`:

```yaml
lovelace:
  mode: yaml
```

Restart Home Assistant for the mode to be changed. Create a new file `<config>/ui-lovelace.yaml` and add your Lovelace configuration. A good way to start this file is to copy and paste the "Raw configuration" from the UI so your manual configuration starts the same as your existing UI.

- Go into the `Overview` tab.
- Click the three dots menu (top-right) and click on `Configure UI`.
- Click the three dots menu again and click on `Raw config editor`.
- There you see the configuration for your current Lovelace UI. Copy that into the `<config>/ui-lovelace.yaml` file.

Once you take control of your UI via YAML, the Home Assistant interface for modifying it won't be available anymore and new entities will not automatically be added to your UI.

When you make changes to `ui-lovelace.yaml`, you don't have to restart Home Assistant or refresh the page. Just hit the refresh button in the menu at the top of the UI.

To revert back to using the UI to edit your Lovelace interface, remove the `lovelace` section from your `configuration.yaml` and copy the contents of your `ui-lovelace.yaml` into the raw configuration section of Home Assistant and restart.

### Advanced configuration

You can define multiple dashboards that all have their own YAML file, and add custom resources that are shared by all dashboards.

The key of the dashboard is used as the URL, this needs to contain a hyphen (`-`).

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

You can also add YAML dashboards when your main dashboard is UI configurated:
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
  description: "List of resources that should be loaded when you use Lovelace. Only use this when mode is `yaml`."
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
      description: The icon to show in the sidebar.
      type: string
    show_in_sidebar:
      required: false
      description: Should this view be shown in the sidebar.
      type: boolean
      default: true
    require_admin:
      required: false
      description: Should this view be only accessible for admin users.
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
