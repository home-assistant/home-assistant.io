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

Put the element source file and its dependencies in `www/custom_ui/` directory under your Home Assistant [configuration](/docs/configuration/) directory.

For example if creating a state card for the `light` domain named `state-card-my-custom-light` put `state-card-my-custom-light.html` in `www/custom_ui/`.

That file should implement `<state-card-my-custom-light>` tag with Polymer.

In `state-card-my-custom-light.html` you should use `<link rel="import">` to import all the dependencies **not** used by Home Assistant's UI.
Do not import any dependencies used by the Home Assistant UI.
Importing those will work in `development: 1` mode, but will fail in production mode.

1) In the `customize:` section of the `configuration.yaml` file put `custom_ui_state_card: state-card-my-custom-light`.
2) In the `frontend` section use `extra_html_url` to specify the URL to load.

For example:
```yaml
homeassistant:
  customize:
    light.bedroom:
      custom_ui_state_card: state-card-my-custom-light

frontend:
  extra_html_url:
    - /local/custom_ui/state-card-my-custom-light.html
```

For more possibilities, see the [Custom UI section](/cookbook/#user-interface) on our Examples page.
