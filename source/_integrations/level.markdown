---
title: Level Lock
description: Connect your Level account to control Level smart locks in Home Assistant.
ha_release: '2025.10'
ha_iot_class: Cloud Push
ha_category:
  - Lock
ha_domain: levelhome
ha_integration_type: hub
ha_platforms:
  - lock
ha_brand: true
---

[Level](https://level.co/) smart locks connect to Home Assistant through your Level account. This integration uses the Level Home mobile app to authorize access and provides cloud push updates for near-instant state changes.

Some Level locks also support Matter and can be added locally through the Matter integration.

{% my add_matter_device badge domain="matter" %}

[Learn more about Matter in Home Assistant.](/integrations/matter/)

## Prerequisites

- A Level smart lock already set up in the Level Home mobile app.
- A Level account that can access the lock.

## Installation

1. In Home Assistant, go to **Settings** > **Devices & services**.
2. Select **Add integration** and search for `Level Lock`.
3. Enter your email address or phone number.
4. Open the Level Home mobile app and enter the verification code shown in Home Assistant.
5. Return to Home Assistant and select **Submit** to finish setup.

## Removal

1. In Home Assistant, go to **Settings** > **Devices & services**.
2. Select the **Level Lock** integration.
3. Select **Remove** and confirm.

## Service actions

This integration does not register custom service actions. Use the standard [`lock.lock`](/integrations/lock/#action-locklock) and [`lock.unlock`](/integrations/lock/#action-lockunlock) service actions for Level lock entities.
