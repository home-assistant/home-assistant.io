---
title: AVM FRITZ!Box Tools
description: Instructions on how to integrate AVM FRITZ!Box based routers into Home Assistant.
ha_category:
  - Presence Detection
ha_release: '0.10'
ha_domain: fritz
ha_config_flow: true
ha_codeowners:
  - '@mammuth'
  - '@AaronDavidSchneider'
  - '@chemelli74'
ha_iot_class: Local Polling
ha_platforms:
  - device_tracker
ha_ssdp: true
---

The `fritz` platform offers presence detection by looking at connected devices to a [AVM FRITZ!Box](https://avm.de/produkte/fritzbox/) based router.

{% include integrations/config_flow.md %}

<div class='note'>
TR-064 needs to be enabled in the FRITZ!Box network settings for Home Assistant to login and read device info.
</div>

See the [device tracker integration page](/integrations/device_tracker/) for instructions how to configure the people to be tracked.
