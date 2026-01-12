---
title: ekey bionyx
description: Instructions on how to integrate ekey bionyx devices into Home Assistant.
ha_category:
  - Event
ha_release: '2025.10'
ha_iot_class: Local Push
ha_config_flow: true
ha_domain: ekeybionyx
ha_codeowners:
  - '@richardpolzer'
ha_platforms:
  - event
ha_integration_type: hub
ha_quality_scale: bronze
---

The **ekey bionyx** {% term integration %} allows Home Assistant to receive events from your [ekey fingerprint reader](https://www.ekey.net).

## Prerequisites

- The **ekey bionyx** app.
- The ekey device needs to be set up in **plus mode** in the app.
- The ekey bionyx Third-Party API needs to be enabled in the app.

![Activate ekey bionyx Third Party API](/images/integrations/ekeybionyx/activate_third_party_api.png)

{% include integrations/config_flow.md %}

{% tip %}
Prefer using local IPs when setting up the {% term integration %} instead of domain names because the events will be more responsive.
{% endtip %}

Once the {% term integration %} is added, open the ekey app and assign events to the fingers you wish to use as triggers.

## Supported functionality

The **ekey bionyx** {% term integration %} provides the following entities.

### Events

The functions defined during setup are represented in Home Assistant as events. You can use these events as triggers in automations.

## Limitations

- The ekey {% term integration %} allows only five functions per ekey system.
- You cannot link multiple Home Assistant instances to the same ekey system.

## Removing the integration

Based on the limited lifetime of the token, you have two options for cleanly resetting the connection to Home Assistant:

- Delete the {% term integration %} in Home Assistant, set it up again (triggering the deletion process), and abort when you are in the step of naming the functions.
- Delete the {% term integration %} in Home Assistant, then disable and re-enable the Third-Party API in the ekey app (this resets all functions and webhooks, even outside of Home Assistant).
