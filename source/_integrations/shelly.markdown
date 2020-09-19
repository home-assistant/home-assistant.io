---
title: Shelly
description: Integrate Shelly devices
ha_category:
  - Switch
ha_release: 0.115
ha_codeowners:
  - '@balloob'
  - '@bieniu'
ha_domain: shelly
featured: true
ha_config_flow: true
---

Integrate [Shelly devices](https://shelly.cloud) into Home Assistant.

## Configuration

To add a Shelly device to your installation, go to **Configuration** >> **Integrations** in the UI, click the + to add a new integration and search for Shelly. Devices will be automatically discovered when on the same network and listed on the integrations page. Click on "Configure" of the discovered device to add it to Home Assistant.

A device can also be added manually, click the button with `+` sign on the integrations page and from the list of integrations, select **Shelly** and follow the instructions shown.

## Known issues and limitations

- Only supports firmware 1.8 and later
- Support relays, lights (with brightness), sensors and rollers
