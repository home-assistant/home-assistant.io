---
title: Roborock
description: Instructions on how to integrate Roborock vacuums into Home Assistant
ha_category:
  - Select
  - Sensor
  - Switch
  - Vacuum
ha_iot_class: Local Polling
ha_release: 2023.5
ha_config_flow: true
ha_codeowners:
  - '@humbertogontijo'
  - '@Lash-L'
ha_domain: roborock
ha_platforms:
  - diagnostics
  - select
  - sensor
  - switch
  - vacuum
ha_integration_type: integration
---

The Roborock integration allows you to control your [Roborock](https://us.roborock.com/pages/robot-vacuum-cleaner) vacuum while using the Roborock app.

This integration requires a cloud connection to set up the device, but it communicates with the device entirely over your home network.

Once you log in with your Roborock account, the integration will automatically discover your Roborock devices and get the needed information to communicate locally with them. Please ensure your Home Assistant instance can communicate with the local IP of your device. We recommend setting a static IP for your Roborock Vacuum to help prevent future issues. The device communicates on port 58867. Depending on your firewall, you may need to allow communication from Home Assistant to your vacuum on that port.

{% include integrations/config_flow.md %}

## FAQ

### Can I use the Mi home app with this integration?
No. This integration requires information from your Roborock app to set up and uses Roborock's protocols to communicate with your device. You must have your vacuum synced to the Roborock app.

### Can I block internet access for this device?
As of right now - no. When the vacuum is disconnected from the internet, it will attempt to disconnect itself from Wi-Fi and reconnect itself until it can reach the Roborock servers. We are looking for the best way to handle this and see what can be blocked while still allowing the vacuum to function. 

### What devices are supported?
If you can add your device to the Roborock app - it is supported. However, some older vacuums like the Roborock S5 must be connected using the Mi Home app and can be set up in Home Assistant through the [Xiaomi Miio](/integrations/xiaomi_miio/) integration.

### What features will you support?
We are working on adding a lot of features to the core integration. We have reverse-engineered over [100 commands](https://python-roborock.readthedocs.io/en/latest/api_commands.html). The documentation is currently very bare-bones, and we are looking for users to help us make it more complete. The following are some of the functionalities we plan to add to Home Assistant Core. We ask that you are patient with us as we add them.
- Selective room cleaning
- Dock controls
- Manual vacuum remote control
- Status information such as errors, clean time, consumables, etc.
- Viewing the camera
- Viewing the map

### How can I clean a specific room?
We plan to make the process simpler in the future, but for now, it is a multi-step process.
1) Make sure to first name the rooms in the Roborock app; otherwise, they won't appear in the debug log.
2) [Enable debug logging](/docs/configuration/troubleshooting/#enabling-debug-logging) for this integration and reload it.
3) Search your logs for 'Got home data' and find the attribute rooms.
4) Write the rooms down; they have a name and 6 digit ID.
5) Go to {% my developer_call_service service="vacuum.send_command" title="**Developer Tools** > **Services** > **Vacuum: Send Command**" %}. Select your vacuum as the entity and `get_room_mapping` as the command.
6) Go back to your logs and look at the response to `get_room_mapping`. This is a list of the 6-digit IDs you saw earlier to 2-digit IDs. In your original list of room names and 6-digit IDs, replace the 6-digit ID with its pairing 2-digit ID.
7) Now, you have the 2-digit ID that your vacuum uses to describe a room.
8) Go back to {% my developer_call_service service="vacuum.send_command" title="**Developer Tools** > **Services** > **Vacuum: Send Command**" %} then type `app_segment_clean` as your command and `segments` with a list of the 2-digit IDs you want to clean. Then, add `repeat` with a number (ranging from 1 to 3) to determine how many times you want to clean these areas.

Example:
```yaml
service: vacuum.send_command
data:
  command: app_segment_clean
  params:
    - segments:
        - 22
        - 23
    - repeat: 1
target:
  entity_id: vacuum.s7_roborock

```
