---
title: Volumio
description: How to set up the Volumio media player integration
ha_category:
  - Media Player
ha_release: 0.41
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@OnFreund'
ha_domain: volumio
---

The `Volumio` platform allows you to control a [Volumio](https://volumio.org/) media player from Home Assistant.

## Configuration

Menu: **Configuration** -> **Integrations**.

In most cases, your Volumio device should be discovered and you'll simply need to click "Configure" to add it to Home Assistant.

If it's not discovered, you can click on the `+` sign to add an integration and then click on **Volumio**, and finally input the host and port.

<div class='note'>
Volumio versions 2.799 and below do not have a unique id when manually configured, so you will not be able to rename your entity or add your device to an area. If discovery does not work for you, it is advised to upgrade Volumio before configuring.
</div>
