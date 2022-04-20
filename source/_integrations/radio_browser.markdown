---
title: Radio Browser
description: Instructions on how to integrate Radio Browser into Home Assistant.
ha_category:
  - Media Source
  - Multimedia
ha_release: 2022.3
ha_iot_class: Cloud Polling
ha_domain: radio_browser
ha_config_flow: true
ha_codeowners:
  - '@frenck'
ha_integration_type: integration
---

The Radio Browser integration allows you to use the directory of
radio stations collected on [Radio Browser](https://www.radio-browser.info)
in Home Assistant.

All radio stations can be browsed and played via the Media panel in
Home Assistant.

Additionally, when creating automations, the "Play Media" action can be used
to pick a station from the directory. This makes it possible to create
an automation that e.g., starts playing your favorite radio station on your
Cast devices.

{% include integrations/config_flow.md %}
