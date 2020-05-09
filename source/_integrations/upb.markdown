---
title: Universal Powerline Bus (UPB)
description: Instructions on how to setup Univseral Powerline Bus integration.
ha_category:
  - Light
  - Scene
ha_release: "0.110"
ha_config_flow: true
ha_quality_scale: platinum
ha_iot_class: Local Polling
ha_codeowners:
  - '@gwww'
---

The UPB integration allows Home Assistant to connect to a Universal Powerline Bus Powerline Interface Module (UPB PIM) to get status and control UPB devices and UPB links. The UPB PIM may be connected either to a serial port or over TCP. The integration implements the following platforms:
- Light

## Configuration

To add UPB to your installation, go to **Configuration** >> **Integrations** in the UI, click the button with `+` sign and from the list of integrations select **Universal Powerline Bus (UPB)**.

The UPB integration requires that an export from the `UPStart` UPB configuration program. To create an export, in `UPStart`, click the UPB button in the top left and select **Export to File**. This will create a file with the `.upe` extension. The file must be placed somewhere in your Home Assistant installation, for example, in the configuration directory.
