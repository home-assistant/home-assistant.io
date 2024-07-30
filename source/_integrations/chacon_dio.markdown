---
title: Chacon Dio
description: Instructions on how to integrate your Chacon Dio devices within Home Assistant.
ha_category:
  - Cover
ha_release: 2024.8
ha_iot_class: Cloud Push
ha_config_flow: true
ha_codeowners:
  - '@cnico'
ha_domain: chacon_dio
ha_platforms:
  - cover
ha_integration_type: integration
---

[Chacon Dio devices](https://chacon.com/en/) are connected home devices that can be controlled via RF 433 MHz or Wi-Fi.
This {% term integrations %} gives you access to the Wi-Fi connection so that Home Assistant can list your Chacon Dio devices and interact with them in real time, the same way the vendor's smartphone application does.

There is currently support for the following information within Home Assistant:

- Cover devices (get statuses, move up, down, stop, and move to a given percentage)

## Prerequisites

You will need to use the standalone app for this device to register a username and password.

- [Google](https://play.google.com/store/apps/details?id=com.chacon.dioone&hl=en)
- [Apple](https://apps.apple.com/fr/app/dio-one/id1493503504?l=en)

{% include integrations/config_flow.md %}

## Tips

You can use the [group integration](/integrations/group) to group entities as the application proposes (for example covers of the first floor).
You can use any Cover card to have a specific display of the covers.
