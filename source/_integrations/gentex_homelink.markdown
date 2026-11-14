---
description: Instructions on how to set up your HomeLink devices with Home Assistant.
ha_release: 2026.1
ha_domain: gentex_homelink
---

The **HomeLink** {% term integration %} allows you to integrate your [HomeLink](https://homelink.com) devices in Home Assistant. The HomeLink app allows [HomeLink](https://homelink.com) owners to trigger smart home routines in a variety of cloud-based home automation platforms from the comfort of their vehicle. When you arrive home, one HomeLink button press can adjust the thermostat, turn on lights, disarm the security system, unlock the door, and begin playing your favorite music.

## Prerequisites

HomeLink is only compatible with HomeLink devices accessible via the HomeLink App. To prepare for an integration with Home Assistant:

{% include integrations/config_flow.md %}

During setup, you will be redirected to the HomeLink sign-in page to sign in. After you authorize Home Assistant, your HomeLink devices will be added automatically. You can use their buttons as device triggers in automations.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
