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

The `ekeybionyx` integration allows you get events from your [ekey fingerprint reader](https://www.ekey.net) to Home Assistant.

{% include integrations/config_flow.md %}

## Event Plattform

The webhooks from the ekey device are represented in Home Assistant as `event` entities. You can automate based on their state.

## Current Limitations

- Ekey allows only 5 Webhooks per Device
- You cannot link multiple HA instances to the same ekey System

## Installation Instructions

In order to use the integration the ekey device needs to be set up in **plus mode** and the ekey Bionyx Third Party Api needs to be enabled in the App.

![Activate Ekey Bionyx Third Party Api](/images/integrations/ekeybionyx/activate_third_party_api.png)

After setting up Home Assistant you need to go to the app and manually assign the created Events to fingers that will trigger them.

## Uninstallation Instructions

Based on the limited lifetime of the token you have 2 options of cleanly resetting the connection to Home Assistant:

- Delete from HA and then turn the API off and on again in the App. (all webhooks will be reset even outside of HA)
- Delete from HA, Set it up again in HA (it will go through the deletion process) and confirm the deletion in the App afterwards.
