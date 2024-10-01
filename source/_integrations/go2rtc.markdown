---
title: go2rtc
description: Instructions on how to setup go2rtc in Home Assistant.
ha_config_flow: true
ha_release: 2024.11
ha_iot_class: Local Polling
ha_codeowners:
  - '@home-assistant/core'
ha_domain: go2rtc
related:
  - docs: /installation/
---

The go2rtc {% term integration %} will connect to a go2rtc instance and will provide a WebRTC proxy for all your cameras.

{% include integrations/config_flow.md %}

If you are running Home Assistan with

    - {% term "Home Assistant Operating System" %}
    - {% term "Home Assistant Supervised" %}
    - {% term "Home Assistant Container" %}
    
than the go2rtc binary is already preinstalled in the container and the config flow will pick it automatically.

If you are running {% term "Home Assistant Core" %}, than you need to setup a go2rtc instance and provide the URL in the config flow.
Please refer to https://github.com/AlexxIT/go2rtc/

