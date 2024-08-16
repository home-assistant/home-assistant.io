---
title: Enigma2 (OpenWebif)
description: Instructions on how to integrate an Enigma2 based box running OpenWebif into Home Assistant.
ha_category:
  - Media player
ha_release: '0.90'
ha_iot_class: Local Polling
ha_codeowners:
  - '@autinerd'
ha_domain: enigma2
ha_config_flow: true
ha_platforms:
  - media_player
ha_integration_type: device
---

The `enigma2` platform allows you to control a Linux based set-top box which is running [Enigma2](https://github.com/oe-alliance/oe-alliance-enigma2) with the OpenWebif plugin installed.

[OpenWebif](https://github.com/E2OpenPlugins/e2openplugin-OpenWebif) is an open source web interface for Enigma2 based set-top boxes.

{% include integrations/config_flow.md %}
