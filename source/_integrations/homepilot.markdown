---
title: "Rademacher HomePilot"
description: "Instructions for connecting Rademacher HomePilot devices."
ha_release: "0.38"
ha_category: Cover
ha_iot_class: "Local Polling"
ha_config_flow: true
ha_codeowners:
  - '@nico0302'
ha_domain: homepilot
---

The [Rademacher HomePilot](https://www.rademacher.de/smart-home/produkte/homepilot) integration allows you to connect your Rademacher HomePilot Hub or Smart2Smart Bridge with Home Assistant.
The [pyhomepilot libary](https://github.com/Nico0302/pyhomepilot) is used for communicating.

Support is currently limited to automatic blinds.

## Configuration

To add the Rademacher HomePilot integration to your installation:

- Go to the Integrations menu: **Configuration** >> **Integrations** in the UI.
- Click the button with the `+` sign at the bottom right of the screen.
- Select **Rademacher HomePilot** from the list of integrations.
- Fill in the IP adress or hostname of your Rademacher Hub or Bridge under **Host**.
- If you protected your Rademacher Hub or Bridge with a password you should also enter it.
- Click on **SUBMIT** to complete the setup.

