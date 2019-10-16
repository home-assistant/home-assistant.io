---
title: "Lovelace YAML mode"
description: "Advanced users can switch on the advanced YAML mode."
---

It is possible to write your Lovelace config in YAML instead of via the UI. To do so, you will need to configure the Lovelace integration to be in yaml mode by adding the following to your `configuration.yaml`:

```yaml
lovelace:
  mode: yaml
```

Restart Home Assistant for the mode to be changed. Create a new file `<config>/ui-lovelace.yaml` and add the following content. Adjust the entity names to entities that exist in your Home Assistant installation.

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

Your previously customized Lovelace UI won't be modifiable anymore and won't follow after you start writing code in the `<config>/ui-lovelace.yaml` file, but you can easily import it if you wish.

  - Go in the `Overview` tab.
  - Go in the three dots menu (top-right) and click on `Configure UI`.
  - Go in the three dots menu again and click on `Raw config editor`.
  - There you see the config for your actual Lovelace UI, you can copy that into the `<config>/ui-lovelace.yaml` file.

Navigate to `<YOUR HASS URL>/lovelace`. When you make changes to `ui-lovelace.yaml`, you don't have to restart Home Assistant or refresh the page. Just hit the refresh button in the menu at the top of the UI.

To revert to using the UI to edit Lovelace, remove the `configuration.yaml` Lovelace entry and copy your `lovelace.yaml` content back into the raw config section of Home Assiatant and restart.
