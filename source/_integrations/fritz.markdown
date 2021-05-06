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

The configuration in the UI asks for a username. Starting from FRITZ!OS 7.24 the FRITZ!Box creates a random username for the admin user if you didn't set one yourself. This can be found after logging into the FRITZ!Box and visiting System -> FRITZ!Box Users -> Users. The username starts with `fritz` followed by four random numbers. Under properties on the right it says `created automatically`. Prior to FRITZ!OS 7.24 the default username was `admin`.

See the [device tracker integration page](/integrations/device_tracker/) for instructions how to configure the people to be tracked.
