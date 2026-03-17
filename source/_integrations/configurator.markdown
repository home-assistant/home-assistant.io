---
title: Configurator
description: Instructions on how to integrate the configurator into your integrations.
ha_category:
  - Other
ha_release: 0.7
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/core'
ha_domain: configurator
ha_integration_type: system
---

{% caution %}
This integration is intended for developers.
{% endcaution %}

The **Configurator** {% term integration %} allows integrations to request information from the user. It is currently implemented as the minimum viable product:

- It supports showing a text, image, and a button to the user.
- Input fields can be defined with a description, and optional type.
- It will trigger a callback when the button is pressed.

The Hue integration in [the demo](https://demo.home-assistant.io/) and Plex are implemented using the configurator. See [the source of the demo integration](https://github.com/home-assistant/home-assistant/tree/dev/homeassistant/components/demo) for a simple example.

See [the source](https://github.com/home-assistant/home-assistant/tree/dev/homeassistant/components/configurator) for more details on how to use the configurator integration.
