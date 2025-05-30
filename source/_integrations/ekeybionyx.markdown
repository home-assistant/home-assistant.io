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

The `ekeybionyx` integration allows you to get events from your [ekey fingerprint reader](https://www.ekey.net) to Home Assistant.

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

- Delete from HA and then turn the API off and on again in the App. (all webhooks will be reset even outside of HA)
- Delete from HA, Set it up again in HA (it will go through the deletion process) and confirm the deletion in the App afterwards.