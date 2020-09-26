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

To add a Shelly device to your installation, make sure they are connected to your Wi-Fi network first. Next, go to **Configuration** >> **Integrations** in the UI. If the new device is on the same network as Home Assistant, it is discovered automatically. Clicking "Configure" on the discovered device, adds it to Home Assistant. If your device isn't discovered automatically, click the button with `+` sign on the integrations page and from the list of integrations, select **Shelly** and follow the instructions shown.

<div class="note">
Integration is communicating directly with the device; cloud connection is not needed.
</div>

## Known issues and limitations

- Only supports firmware 1.8 and later
- Support relays, lights (with brightness), sensors and rollers
- Support for battery powered devices is currently very limited
