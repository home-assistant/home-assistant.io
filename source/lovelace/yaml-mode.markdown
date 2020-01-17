---
title: "Lovelace YAML mode"
description: "Advanced users can switch on YAML mode for editing the Lovelace UI."
---

It is possible to customize your Home Assistant interface by writing in YAML instead of via the UI. To do so, you configure the Lovelace integration to be in yaml mode by adding the following to your `configuration.yaml`:

```yaml
lovelace:
  mode: yaml
```

Restart Home Assistant for the mode to be changed. Create a new file `<config>/ui-lovelace.yaml` and add your Lovelace configuration. A good way to start this file is to copy and paste the "Raw config" from the UI so your manual configuration starts the same as your existing UI.

- Go into the `Overview` tab.
- Click the three dots menu (top-right) and click on `Configure UI`.
- Click the three dots menu again and click on `Raw config editor`.
- There you see the config for your current Lovelace UI. Copy that into the `<config>/ui-lovelace.yaml` file.

Once you take control of your UI via YAML, the Home Assistant interface for modifying it won't be available anymore and new entities will not automatically be added to your UI.

When you make changes to `ui-lovelace.yaml`, you don't have to restart Home Assistant or refresh the page. Just hit the refresh button in the menu at the top of the UI.

To revert back to using the UI to edit your Lovelace interface, remove the `lovelace` section from your `configuration.yaml` and copy the contents of your `ui-lovelace.yaml` into the raw config section of Home Assistant and restart.


As a super minimal example, here's the bare minimum you will need for this to work:

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

A slightly more advanced example shows additional elements which can be used to customize your frontend.

```yaml
title: My Awesome Home
# Include external resources
resources:
  - url: /local/my-custom-card.js
    type: js
  - url: /local/my-webfont.css
    type: css

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
