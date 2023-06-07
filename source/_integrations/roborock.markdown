---
title: Roborock
description: Instructions on how to integrate Roborock vacuums into Home Assistant
ha_category:
  - Select
  - Vacuum
ha_iot_class: Local Polling
ha_release: 2023.5
ha_config_flow: true
ha_codeowners:
  - '@humbertogontijo'
  - '@Lash-L'
ha_domain: roborock
ha_platforms:
  - select
  - vacuum
ha_integration_type: integration
---

The Roborock integration allows you to control your [Roborock](https://us.roborock.com/pages/robot-vacuum-cleaner) vacuum while using the Roborock app.

This integration requires a cloud connection to set up the device, but it communicates with the device entirely over your home network.

Once you log in with your Roborock account, the integration will automatically discover your Roborock devices and get the needed information to communicate locally with them. Please ensure your Home Assistant instance can communicate with the local IP of your device. We recommend setting a static IP for your Roborock Vacuum to help prevent future issues.

{% include integrations/config_flow.md %}

## FAQ

### Can I use the Mi home app with this integration?
No. This integration requires information from your Roborock app to set up and uses Roborock's protocols to communicate with your device. You must have your vacuum synced to the Roborock app.

### Can I block internet access for this device?
As of right now - no. When the vacuum is disconnected from the internet, it will attempt to disconnect itself from Wi-Fi and reconnect itself until it can reach the Roborock servers. We are looking for the best way to handle this and see what can be blocked while still allowing the vacuum to function. 

### What devices are supported?
If you can add your device to the Roborock app - it is supported. However, some older vacuums like the Roborock S5 must be connected using the Mi Home app and can be set up in Home Assistant through the [Xiaomi Miio](/integrations/xiaomi_miio/) integration.

### What features will you support?
We are working on adding a lot of features to the core integration. We have reverse-engineered over 100 commands. The following are some of the functionalities we plan to add to Home Assistant Core. We ask that you are patient with us as we add them.
- Selective room cleaning
- Dock controls
- Manual vacuum remote control
- Status information such as errors, clean time, consumables, etc.
- Viewing the camera
- Viewing the map

### How can I clean a specific room?
We plan to make the process simplier in the future, but for now it is a multi-step process.
1) Enable debug logging for this integration and reload it.
2) Search your logs for 'Got home data' and then find the attribute rooms.
3) Write the rooms down, they have a name and 6 digit id
4) Go to Developer Tools -> Services -> Vacuum: Send Command and select your vacuum as the entity and 'get_room_mapping' as the command
5) Go back to your logs and look at the response to get_room_mapping, this is a list of the 6 digit ids you saw earlier to 2 digit ids. In your original list of room names and 6 digit ids, replace the 6 digit id with its pairing 2 digit id.
6) Now you have the 2 digit id that your vacuum uses to describe a room.
7) Go back to Developer Tools -> Services -> Vacuum: Send Command then type in app_segment_clean as your command and 'segments' with a list of the two digit ids you want to clean and then 'repeats' with a number 1->3 to determine how many times you want to clean these areas.

Example:
```
service: vacuum.send_command
data:
  command: app_segment_clean
  params:
    - segments:
        - 22
        - 23
    - repeats: 1
target:
  entity_id: vacuum.s7_roborock

```
