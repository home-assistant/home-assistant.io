---
layout: page
title: "Creating custom UI"
description: "Introduction to create custom ui for Home Assistant."
date: 2017-02-04 13:00
sidebar: true
comments: false
sharing: true
footer: true
ha_release: 0.38
---
If you would like to use your own [State card](/developers/frontend_add_card/) without merging your code into [home-assistant-polymer](https://github.com/home-assistant/home-assistant-polymer/) you can create your own implementation.

- Put the element source file and its dependencies in `www/custom_ui/` directory under your homeassistant config directory.

For example if creating a state card for the `light` domain named `my_custom_light_card` put `state-card-my_custom_light_card.html` in `www/custom_ui/`.

That file should implement `<state-card-my_custom_light_card>` tag with Polymer.

In `state-card-my_custom_light_card.html` you should use `<link rel="import">` to import all the dependencies **not** used by Homeassistant UI.
Do not import any dependencies used by Homeassistant UI.
Importing those will work in `development: 1` mode, but will fail in production mode.

- In the `customize:` section of `configuration.yaml` put `custom_ui_state_card: <element-name>`.

For example:
```yaml
homeassistant:
  customize:
    - entity_id: light
      custom_ui_state_card: my_custom_light_card
```


For more possibilities, see the [Custom UI section](/cookbook/#user-interface) on our Examples page.
