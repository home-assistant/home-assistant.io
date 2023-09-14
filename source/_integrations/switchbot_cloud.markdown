---
title: SwitchBot Cloud
description: Instructions on how to set up SwitchBot Devices.
ha_category:
  - Switch
ha_release: '2023.10'
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@SeraphicRav'
ha_domain: switchbot_cloud
ha_bluetooth: false
ha_platforms:
  - switch
ha_config_flow: true
ha_integration_type: integration
---

The SwitchBot integration allows you to control SwitchBot [devices](https://www.switch-bot.com/).

## Prerequisites

In order to use this integration, you will need to get a token and secret key from the SwitchBot mobile app in Profiles>Preferences>Developer Options.

Please note, device names configured in the SwitchBot app are transferred into Home Assistant.

{% include integrations/config_flow.md %}

## Supported Devices

- Plug (Wi-Fi only), Plug Mini, both the original (model W1901400) and HomeKit-enabled (model W1901401)
- Remotes exposed through the different hubs excepted "Others" (State is inferred from previous commands in Home Assistant and might not reflect reality if you use other ways to control the device)

<div class='note warning'>
Only the switch platform is currently supported.
</div>

## Error codes and troubleshooting

The SwitchBot integration will automatically discover devices using the SwitchBot API.
