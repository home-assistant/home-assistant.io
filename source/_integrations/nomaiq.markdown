---
title: NomaIQ
description: Control your NomaIQ devices with Home Assistant.
ha_category:
  - Light
ha_release: 2025.6
ha_domain: nomaiq
ha_integration_type: integration
ha_codeowners:
  - '@mnfjorge'
ha_config_flow: true
ha_platforms:
  - light
ha_iot_class: Cloud Polling
---

The {{ page.title }} {% term integration %} provides support for devices controlled by the NomaIQ app.

## Supported devices

This integration was only tested with a Garage Door Opener. Currently it only loads the Light entity.

If you don't see a light entity loaded, then this integration doesn't support your device yet. Please reach out so I can work on it for you (or open a PR yourself).

## Prerequisites

First, set up your device in the NomaIQ app before using this integration.
To configure this integration, you will need the credentials (login and password) used to connect to the NomaIQ app.

{% include integrations/config_flow.md %}

## Light

This integration supports the following functionalities:

- [`turn_on`](/integrations/light#action-light-turn-on)
- [`turn_off`](/integrations/light#action-light-turn-off)
