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
ha_integration_type: device
---

The **Knocki** {% term integration %} allows you to trigger your favorite automations simply by tapping custom patterns (such as triple taps) on ordinary surfaces.

## Requirements

Before you begin the setup process, you must have a [Knocki device](http://knocki.com).

## Setup Instructions

Start the setup process in the knocki mobile app (steps 1-7), and complete the process in Home Assistant (steps 8-13).

1. Open the Knocki Mobile App. It’s a free download on [iOS](https://apps.apple.com/us/app/knocki/id1238395440) and [Android](https://play.google.com/store/apps/details?id=com.knocki.mobileapp).
2. Using the app, log-in or create a new Knocki account.
3. From the app’s home screen, select a Knocki or [add a Knocki](https://support.knocki.com/hc/en-us/articles/12769368448659-How-Do-Add-a-Knocki-to-My-Account).
4. On the app’s device screen, select a gesture or [add a gesture](https://support.knocki.com/hc/en-us/articles/360013333634-Creating-a-Gesture).
5. Next, select the [add a task](https://support.knocki.com/hc/en-us/articles/12920956118291-How-do-I-Add-Tasks-to-a-Knocki) option.
6. Scroll down the task menu and select Home Assistant.
7. Follow the in-app instructions to add the Home Assistant task.
8. In Home Assistant, add the Knocki Integration by clicking the blue "Add Integration" button.
9. You should see entities for each Knocki Task that you already created in the Knocki app, and the corresponding Knocki device IDs. If any entities are missing, please select "reload" from the device’s menu.
10. Go to settings in Home Assistant, and select "+ CREATE AUTOMATION" and then choose the "Create new automation" option.  
11. Select "+ADD TRIGGER."  
a. Select "Entity" as the trigger type.  
b. Search for the name of the task (as you named it in the Knocki app). Select the entity with that name appended to it.  
c. Select "State" as the type of entity change.
12. Select "+ADD ACTION" and choose whatever action(s) you’d like the automation to trigger.
13. Finally, test the action by tapping the associated gesture pattern. If the new automation isn’t triggering successfully, you need to select the "reload" option from the devices page for Knocki on Home Assistant, and it should start working.

## Troubleshooting

### My Knocki devices or entities in aren’t showing up (or aren’t updating) on Home Assistant

Knocki devices and entities will not be listed in Home Assistant until you’ve added a Home Assistant tasks via the Knocki mobile app. See steps 1-7. If they still aren’t showing up or aren’t updating, please select “reload” from the device’s menu in Home Assistant.

### There’s another issue I need help with

If you’re experiencing any other issues or need general help, please reach out to [support@knocki.com](mailto:support@knocki.com).

{% include integrations/config_flow.md %}
