---
title: Roborock
description: Instructions on how to integrate Roborock vacuums into Home Assistant
ha_category:
  - Binary sensor
  - Button
  - Image
  - Number
  - Select
  - Sensor
  - Switch
  - Time
  - Vacuum
ha_iot_class: Local Polling
ha_release: 2023.5
ha_config_flow: true
ha_codeowners:
  - '@Lash-L'
  - '@allenporter'
ha_domain: roborock
ha_platforms:
  - binary_sensor
  - button
  - diagnostics
  - image
  - number
  - scene
  - select
  - sensor
  - switch
  - time
  - vacuum
ha_integration_type: integration
---

The Roborock integration allows you to control your [Roborock](https://us.roborock.com/pages/robot-vacuum-cleaner) vacuum while using the Roborock app.

This integration requires a continuous cloud connection while using the device. However, excluding map data, communication between the integration and the device is conducted locally.

Once you log in with your Roborock account, the integration will automatically discover your Roborock devices and get the needed information to communicate locally with them. Please ensure your Home Assistant instance can communicate with the local IP of your device. We recommend setting a static IP for your Roborock Vacuum to help prevent future issues. The device communicates on port 58867. Depending on your firewall, you may need to allow communication from Home Assistant to your vacuum on that port.

{% include integrations/config_flow.md %}


## Robovac entities

Roborock devices have a variety of features that are supported on some devices but not on others. Only entities that your device supports will be added to your integration.

### Vacuum

The vacuum entity holds the ability to control most things the vacuum can do, such as start a clean, return to the dock, or set the fan speed.

### Select

Mop mode - Describes how to mop the floor. On some firmware, it is called 'mop route'.

Mop intensity - How hard you would like your vacuum to mop.

### Binary sensor

Cleaning - States if the vacuum has a clean currently active. This is on when the robot is actively moving around or when the robot returns to the dock when the battery is low but a clean is still active and will resume later.

Mop attached - States if the mop is currently attached.

Mop drying status - Only available on docks with drying capabilites - States if the mop is currently being driven.

Water box attached - States if the water box is currently attached.

Water shortage - States if the water box is low on water - 'Ok' if it has not detected a water shortage.


### Sensor

Cleaning area - How much area the vacuum has cleaned in its current run.  If the vacuum is not currently cleaning, how much area it has cleaned during its last run.

Cleaning time - How long the vacuum has been cleaning for. If the vacuum is not currently cleaning, how long it cleaned for in its last run.

Cleaning progress - Only available on some newer devices - what percent of the current cleaning is completed.

Dock error - Only available on the non-basic docks - The current error of the vacuum or 'Ok' if none exist

Main brush time left - How much time is left before Roborock recommends you replace your main brush.

Mop drying remaining time - Only available on the non-basic docks - How much time is left until the mop is dry and ready to continue cleaning.

Side brush time left - How much time is left before Roborock recommends you replace your side brush.

Filter time left - How much time is left before Roborock recommends you replace your vacuum's air filter.

Status - The current status of your vacuum. This typically describes the action that is currently being run. For example, 'spot_cleaning' or 'docking'.

Last clean begin - the last time that your vacuum started cleaning.

Last clean end - The last time that your vacuum finished cleaning.

Total cleaning time - The lifetime cleaning duration of your vacuum.

Total cleaning area - The lifetime cleaning area of your vacuum.

Total cleaning count - The lifetime cleaning count of your vacuum.

Vacuum error - The current error with your vacuum, if there is one.

### Time

Do not disturb begin - When _Do not disturb_ is enabled, the vacuum does not run or speak after this point.

Do not disturb end - When _Do not disturb_ is enabled, the vacuum does not run or speak before this point.

### Switch

Child lock - This disables the buttons on the vacuum. Nothing happens when the buttons are pushed.

Status indicator light - This is the LED on the top of your vacuum. The color changes depending on the status of your vacuum.

Do not disturb - This enables _Do not disturb_ during the time frame you have set in the app or on the time entity. When _Do not disturb_ is enabled, the vacuum does not run or speak.

### Number

Volume - This allows you to control the volume of the robot's voice. For example, when it states "Starting cleaning". This allows you to set the volume to 0%, while the app limits it to 20%.

### Button

There are currently four buttons that allow you to reset the various maintenance items on your vacuum. Pressing the button cannot be undone. For this reason, the buttons are disabled by default to make sure they are not pressed unintentionally.

Reset sensor consumable - The sensors on your vacuum are expected to be cleaned after 30 hours of use.

Reset side brush consumable - The side brush is expected to be replaced every 200 hours.

Reset main brush consumable - The main brush/ roller is expected to be replaced every 300 hours.

Reset air filter - The air filter is expected to be replaced every 150 hours.

### Actions

#### Action `roborock.set_vacuum_goto_position`

Go the specified coordinates.

- **Data attribute**: `entity_id`
  - **Description**: Only act on a specific robot.
  - **Optional**: No.
- **Data attribute**: `x_coord`
  - **Description**: X-coordinate, integer value. The dock is located at x-coordinate 25500.
  - **Optional**: No.
- **Data attribute**: `y_coord`
  - **Description**: Y-coordinate, integer value. The dock is located at y-coordinate 25500.
  - **Optional**: No.

#### Action `roborock.get_vacuum_current_position`

Get the current position of the vacuum. This is a cloud call and should only be used for diagnostics. This is not meant to be used for automations. Frequent requests can lead to rate limiting. 

- **Data attribute**: `entity_id`
  - **Description**: Only act on a specific robot.
  - **Optional**: No.

Example:

```yaml
action: roborock.get_vacuum_current_position
target:
  entity_id: vacuum.roborock_s7
data: {}
```

- **Result**: You will get a response like this:

  ```yaml
  vacuum.roborock_s7:
    x: 28081
    y: 25168
  ```

### Image

You can see all the maps within your Roborock account. Keep in mind that they are device-specific. The maps require the cloud API to communicate as the maps are seemingly stored on the cloud. If someone can figure out a way around this - contributions are always welcome.


## Dyad entities

Roborock wet/dry vacuums currently expose some entities through an MQTT connection - it is currently cloud dependent.

### Sensor

Status - The current status of your vacuum. This typically describes the action that is currently being run. For example, 'drying' or 'charging'.

Battery - The current charge of your device.

Filter time left - how long until Roborock recommends cleaning/replacing your filter.

Brush time left - how long until Roborock recommends cleaning/replacing your brush.

Error - the current error of the device - if one exists - "None" otherwise.

Total cleaning time - how long you have cleaned with your wet/dry vacuum.


## Zeo Entities

Roborock Zeo One currently exposes some entities through an MQTT connection - it is currently cloud dependent.

### Sensor

State - The current state of your washing machine. For example, 'washing' or 'rinsing'.

Countdown - Countdown for how long until the machine starts.

Washing left - The amount of time until your machine is done washing.

Error - The current error of the Zeo, if one exists.

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
1. Make sure to first name the rooms in the Roborock app; otherwise, they won't appear in the debug log.
2. Go to {% my developer_call_service service="roborock.get_maps" title="**Developer Tools** > **Actions** > **Roborock: Get Maps**" %}. Select your vacuum as the entity. Note that room IDs and names are only updated on the currently selected map.

   - **Request**: Your request should look like:

      ```yaml
      action: roborock.get_maps
      target:
        entity_id: vacuum.s7_roborock
      ```

   - **Result**: You will get a response like this:

      ```json
      vacuum.s7_roborock:
        maps:
          - flag: 0
            name: Downstairs
            rooms:
              "16": Kitchen
              "17": Living room
      ```

3. Go back to {% my developer_call_service service="vacuum.send_command" title="**Developer Tools** > **Actions** > **Vacuum: Send Command**" %} then type `app_segment_clean` as your command and `segments` with a list of the 2-digit IDs you want to clean. Then, add `repeat` with a number (ranging from 1 to 3) to determine how many times you want to clean these areas.

Example:

```yaml
action: vacuum.send_command
data:
  command: app_segment_clean
  params:
    - segments:
        - 22
        - 23
      repeat: 2
target:
  entity_id: vacuum.s7_roborock

```

## Troubleshooting

### I get a invalid or no user agreement error - but nothing shows up in my app

Roborock servers require accepting a user agreement before using the API, which may block Home Assistant during setup. Additionally, the Roborock may ask you to re-enter the user agreement, even if you have entered it before.  To allow Home Assistant to use the Roborock API, you need to take the following steps:
1. Open your Roborock app.
2. Open **Profile** > **About Us** > **User Agreement & Privacy Policy**.
3. Hit **Revoke authorization**.
4. Log back in and accept the policy.
5. Reload the Roborock integration!

### The integration tells me it cannot reach my vacuum and is using the cloud API and that this is not supported

This integration has the capability to control your devices through the cloud API and the local API. If the local API is not reachable, it will just use the cloud API. We recommend only using the local API as it helps prevent any kind of rate-limiting.

The steps needed to fix this issue are specific to your networking setup. Make sure your Home Assistant instance can communicate on port 58867 with the IP address of your vacuum. This may require changing firewall settings, VLAN configuration, etc.
