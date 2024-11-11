---
title: Knocki
description: Instructions on how to setup Knocki devices in Home Assistant.
ha_category:
  - Event
ha_config_flow: true
ha_release: 2024.7
ha_iot_class: Cloud Push
ha_codeowners:
  - '@joostlek'
  - '@jgatto1'
  - '@JakeBosh'
ha_domain: knocki
ha_platforms:
  - event
ha_integration_type: hub
---

The **Knocki** {% term integration %} allows you to trigger your favorite automations simply by tapping custom patterns (such as triple taps) on ordinary surfaces.

## Prerequisites

- You must have a [Knocki device](http://knocki.com).

- Completed the setup process in the **Knocki** mobile app, as described in steps 1-7 below.

1. Open the Knocki Mobile App. It’s a free download on [iOS](https://apps.apple.com/us/app/knocki/id1238395440) and [Android](https://play.google.com/store/apps/details?id=com.knocki.mobileapp).
2. Using the app, log-in or create a new Knocki account.
3. From the app’s home screen, select a Knocki or [add a Knocki](https://support.knocki.com/hc/en-us/articles/12769368448659-How-Do-Add-a-Knocki-to-My-Account).
4. On the app’s device screen, select a gesture or [add a gesture](https://support.knocki.com/hc/en-us/articles/360013333634-Creating-a-Gesture).
5. Next, select the [add a task](https://support.knocki.com/hc/en-us/articles/12920956118291-How-do-I-Add-Tasks-to-a-Knocki) option.
6. Scroll down the task menu and select Home Assistant.
7. Follow the in-app instructions to add the Home Assistant task.

{% include integrations/config_flow.md %}

## Automation example

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %} and in the lower right corner, select  **Create Automation**.
2. Select **Create new automation**.
3. Select **Add Trigger**, select **Entity** as the trigger type.
   - Search for the name of the task (as you named it in the Knocki app). Select the entity with that name appended to it.
   - Select **State** as the type of entity change.
4. Select **Add action** and choose whatever action(s) you’d like the automation to trigger.
5. Finally, test the action by tapping the associated gesture pattern.
