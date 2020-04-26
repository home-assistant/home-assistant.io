---
title: Blastbot Cloud
description: Instructions on integrating Blastbot Cloud with Home Assistant.
ha_category:
  - Switch
  - Climate
  - Remote
ha_release: "0.110"
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@Rodmg'
ha_domain: blastbot_cloud
---

The `blastbot_cloud` integration will allow users to integrate their Blastbot Cloud devices into Home Assistant and use its climate, switch and remote functionalities to automate their homes.

Please visit the [Blastbot website](https://blastbot.io/en/) for further information about Blastbot devices.

There is currently support for the following device types within Home Assistant:

- **Switch**: Reports on `Blastbot Smart Switch` and `Blastbot Smart Plug` devices which can be turned on and off.
- **Climate**: Reports on AC controls created in Blastbot Cloud that allow controlling AC devices via IR with `Blastbot Smart Control` and `Blastbot Hub` Devices.
- **Remote**: Allows sending IR and RF (433Mhz OOK) commands configured in Blastbot Cloud that can be sent via `Blastbot Smart Control` (IR only) and `Blastbot Hub` (IR and RF) Devices. Each "button" in Blastbot Cloud will be represented by an Entity in Home Assistant with an always-off toggle switch. The command will be sent in either on or off commands of the switch.

## Configuration

To use Blastbot devices in your installation, add your Blastbot Cloud account from the integrations page.
