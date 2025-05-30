---
title: Ekey Bionyx
description: Instructions on how to integrate Ekey Bionyx devices into Home Assistant.
ha_category:
  - Event
ha_release: 2025.6.0
ha_iot_class: Local Push
ha_config_flow: true
ha_domain: ekeybionyx
ha_codeowners:
  - '@richardpolzer'
ha_platforms:
  - event
ha_integration_type: integration
---

The `ekeybionyx` integration allows Home Assistant to receive events from your [ekey fingerprint reader](https://www.ekey.net).

{% include integrations/config_flow.md %}

## Event Platform

The webhooks from the ekey device are represented in Home Assistant as events. You can use these events as triggers in automations.

## Current Limitations

- Ekey allows only five webhooks per device
- You cannot link multiple HA instances to the same ekey system

## Installation Instructions

To use the integration, the ekey device needs to be set up in **plus mode**, and the ekey Bionyx Third Party API needs to be enabled in the app.

![Activate Ekey Bionyx Third Party API](/images/integrations/ekeybionyx/activate_third_party_api.png)

{% tip %}
Prefer using local IPs when setting up the integration instead of domain names because the events will be more responsive.
{% endtip %}

After setting up Home Assistant, you need to go to the app and manually assign the created events to fingers that will trigger them.

## Uninstallation Instructions

Based on the limited lifetime of the token, you have two options for cleanly resetting the connection to Home Assistant:

- Delete the integration in Home Assistant, set it up again (triggering the deletion process), and confirm the deletion in the ekey app afterward.
- Delete the integration in Home Assistant, then disable and re-enable the Third Party API in the ekey app. This resets all webhooks.
