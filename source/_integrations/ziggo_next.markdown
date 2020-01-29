---
title: Ziggo Mediabox Next
description: Instructions on how to integrate one or more Ziggo Mediabox Next settop boxes into Home Assistant.
logo: ziggo.png
ha_category:
  - Media Player
ha_iot_class: Cloud Push
ha_release: '0.105.0'
ha_config_flow: true
ha_codeowners:
  - '@Sholofly'
---

The `Ziggo Next` integration allows you to control a [Ziggo Mediabox Next](https://www.ziggo.nl/televisie/mediaboxen/mediabox-next/#mediabox-next) using Home Assistant.

## Set up

1. Navigate to `Configuration -> Integrations` and press the plus button in the bottom right corner. Select `Ziggo Next` from the list of integrations.
2. Fill in your credentials. These are the same credentials that you also use on ziggogo.tv or the Ziggo Go app to log in.
3. Select a country. Currently only `nl` and `ch` are supported.
4. Click `Submit`.

The channel information (numbers and names) are downloaded from ziggo.nl on startup.
