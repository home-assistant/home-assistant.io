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

### Setup

Menu: *Configuration* -> *Integrations*

Fill the form:

* The ip-address or hostname of the **host**
* Optional a **password** if you configured it in your hosts settings (recommended)

