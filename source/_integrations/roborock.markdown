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
  - select
  - sensor
  - switch
  - time
  - vacuum
ha_integration_type: integration
ha_quality_scale: silver
ha_dhcp: true
---

The Roborock {% term integration %} allows you to connect your [Roborock](https://us.roborock.com/pages/robot-vacuum-cleaner) robotic vacuums to your Home Assistant. Roborock vacuums are
intelligent home cleaning robots and, depending on the specific device, may have features
like mopping capabilities, laser navigation, and options for changing cleaning
performance or location in the home. This integration enables you to control and
monitor your Roborock vacuum directly from Home Assistant.

The integration also allows for automation and integration with other smart home
devices. For example, you could send a notification when the vacuum is stuck, or
pause the vacuum when a media player starts playing music.

## Note about compatibility

Roborock recently released a new series of models, Q10 and Q7. This integration does NOT support these models (and likely all future released vacuums). Roborock has changed the protocol for how these devices interact. Therefore, they will not be supported by this integration until they are reverse-engineered.

## Prerequisites

1. Download the Roborock App for iOS or Android.
2. Create an account and log in.
3. Add your Roborock device to the Roborock App (for example, by scanning a QR code).

{% include integrations/config_flow.md %}

{% configuration_basic %}
Email address:
    description: "The email address used to sign in to the Roborock app. A verification code will be sent to this email address when adding the Roborock integration."
Verification code:
    description: "The verification code that is sent to your email address when adding the Roborock integration."
{% endconfiguration_basic %}

{% include integrations/option_flow.md %}

The integration can be configured to specify which Roborock App features are drawn
on the map.

{% configuration_basic %}
Charger:
  description: Show the charger on the map.
Cleaned area:
  description: Show the area cleaned on the map.
Go-to path:
  description: Show the go-to path on the map.
Ignored obstacles:
  description: Show ignored obstacles on the map.
Ignored obstacles with photo:
  description: Show ignored obstacles with photos on the map.
Mop path:
  description: Show the mop path on the map.
No carpet zones:
  description: Show the no carpet zones on the map.
No-go zones:
  description: Show the no-go zones on the map
No mopping zones:
  description: Show the no-mop zones on the map.
Obstacles:
  description: Show obstacles on the map.
Obstacles with photo:
  description: Show obstacles with photos on the map.
Path:
  description: Show the path on the map.
Predicted path:
  description: Show the predicted path on the map.
Vacuum position:
  description: Show the vacuum position on the map.
Virtual walls:
  description: Show virtual walls on the map.
Zones:
  description: Show zones on the map.
{% endconfiguration_basic %}

## Data Updates

This integration uses both local and cloud {% term polling %} and also receives
cloud push events using MQTT. Local communication is preferred when possible.
Map data and routines are always fetched through the cloud, and Dyad and Zeo devices are cloud only.

The integration will automatically discover your Roborock devices using the cloud APIs and get
the needed information to communicate locally with them, if supported. Please ensure your Home Assistant
instance can communicate with the local IP of your device. We recommend setting a static IP
for your Roborock Vacuum to help prevent future issues. The device communicates on port 58867.
Depending on your firewall, you may need to allow communication from Home Assistant to your vacuum on that port.


## Supported functionality

Roborock devices have a variety of features that are supported on some devices but not on others. Only entities that your device supports will be added to your integration.

### Robovac devices

#### Vacuum

The vacuum entity holds the ability to control most things the vacuum can do, such as start a clean, return to the dock, or set the fan speed.

#### Image

- **Map**
  - **Description**: Displays a live map of your Roborock vacuum's cleaning area.

#### Select

- **Mop mode**
  - **Description**: Describes how to mop the floor. On some firmware, it is called 'mop route'.

- **Mop intensity**
  - **Description**: How hard you would like your vacuum to mop.

- **Selected map**
  - **Description**: Choose the map that is loaded on the vacuum.

- **Empty mode**
  - **Description**: You can set the "empty mode" setting including Max, Light, Balanced, and Smart.
  - **Availability**: For vacuum equipped with an auto-empty dock

#### Binary sensor

- **Charging**
  - **Description**: States if the vacuum is currently charging or not.

- **Cleaning**
  - **Description**: States if the vacuum is currently cleaning or not. This is on when the robot is actively moving around or when the robot returns to the dock when the battery is low but a clean is still active and will resume later.

- **Mop attached**
  - **Description**: States if the mop is currently attached.

- **Mop drying status**
  - **Description**: Only available on docks with drying capabilites - States if the mop is currently being driven.

- **Water box attached**
  - **Description**: States if the water box is currently attached.

- **Water shortage**
  - **Description**: States if the water box is low on water - 'Ok' if it has not detected a water shortage.


#### Sensor

- **Cleaning area**
  - **Description**: How much area the vacuum has cleaned in its current run. If the vacuum is not currently cleaning, how much area it has cleaned during its last run.

- **Cleaning time**
  - **Description**: How long the vacuum has been cleaning for. If the vacuum is not currently cleaning, how long it cleaned for in its last run.

- **Cleaning progress**
  - **Description**: Only available on some newer devices - what percent of the current cleaning is completed.

- **Dock error**
  - **Description**: Only available on the non-basic docks - The current error of the vacuum or 'Ok' if none exists.

- **Main brush time left**
  - **Description**: How much time is left before Roborock recommends you replace your main brush.

- **Mop drying remaining time**
  - **Description**: Only available on the non-basic docks - How much time is left until the mop is dry and ready to continue cleaning.

- **Side brush time left**
  - **Description**: How much time is left before Roborock recommends you replace your side brush.

- **Filter time left**
  - **Description**: How much time is left before Roborock recommends you replace your vacuum's air filter.

- **Status**
  - **Description**: The current status of your vacuum. This typically describes the action that is currently being run. For example, 'spot_cleaning' or 'docking'.

- **Last clean begin**
  - **Description**: the last time that your vacuum started cleaning.

- **Last clean end**
  - **Description**: The last time that your vacuum finished cleaning.

- **Total cleaning time**
  - **Description**: The lifetime cleaning duration of your vacuum.

- **Total cleaning area**
  - **Description**: The lifetime cleaning area of your vacuum.

- **Total cleaning count**
  - **Description**: The lifetime cleaning count of your vacuum.

- **Vacuum error**
  - **Description**: The current error with your vacuum, if there is one.

#### Time

- **Do not disturb begin**
  - **Description**: When _Do not disturb_ is enabled, the vacuum does not run or speak after this point.

- **Do not disturb end**
  - **Description**: When _Do not disturb_ is enabled, the vacuum does not run or speak before this point.

#### Switch

- **Child lock**
  - **Description**: This disables the buttons on the vacuum. Nothing happens when the buttons are pushed.

- **Status indicator light**
  - **Description**: This is the LED on the top of your vacuum. The color changes depending on the status of your vacuum.

- **Do not disturb**
  - **Description**: This enables _Do not disturb_ during the time frame you have set in the app or on the time entity. When _Do not disturb_ is enabled, the vacuum does not run or speak.

#### Number

- **Volume**
  - **Description**: This allows you to control the volume of the robot's voice. For example, when it states "Starting cleaning". This allows you to set the volume to 0%, while the app limits it to 20%.

#### Button

There are currently four buttons that allow you to reset the various maintenance items on your vacuum. Pressing the button cannot be undone. For this reason, the buttons are disabled by default to make sure they are not pressed unintentionally.

- **Reset sensor consumable**
  - **Description**: The sensors on your vacuum are expected to be cleaned after 30 hours of use.

- **Reset side brush consumable**
  - **Description**: The side brush is expected to be replaced every 200 hours.

- **Reset main brush consumable**
  - **Description**: The main brush/ roller is expected to be replaced every 300 hours.

- **Reset air filter**
  - **Description**: The air filter is expected to be replaced every 150 hours.

In addition, some vacuums allow routines to be set up in the app. For each of those routines, a button entity will be created, allowing you to trigger it.

#### Actions

##### Action Set Vacuum Goto Position

The `roborock.set_vacuum_goto_position` action will set the vacuum to go to
the specified coordinates.

- **Data attribute**: `entity_id`
  - **Description**: Only act on a specific robot.
  - **Optional**: No.
- **Data attribute**: `x`
  - **Description**: X-coordinate, integer value. The dock is located at x-coordinate 25500.
  - **Optional**: No.
- **Data attribute**: `y`
  - **Description**: Y-coordinate, integer value. The dock is located at y-coordinate 25500.
  - **Optional**: No.

##### Action Get Vacuum Current Position

The `roborock.get_vacuum_current_position` action will get the current position of the vacuum. This
is a cloud call and should only be used for diagnostics. This is not meant to be used for
automations. Frequent requests can lead to rate limiting. 

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

##### Action Get Maps

The `roborock.get_maps` action will return the maps available on the device and
details about any named rooms on each map.

- **Data attribute**: `entity_id`
  - **Description**: Get maps for a specific device
  - **Optional**: No.

This will return the name of the map, and the room names and id numbers. See [How can I clean a specific room? ](#how-can-i-clean-a-specific-room) for more details on how to use the maps response.

### Dyad devices

Roborock wet/dry vacuums currently expose some entities through an MQTT connection - it is currently cloud dependent.

#### Sensor

- **Status**
  - **Description**: The current status of your vacuum. This typically describes the action that is currently being run. For example, 'drying' or 'charging'.

- **Battery**
  - **Description**: The current charge of your device.

- **Filter time left**
  - **Description**: how long until Roborock recommends cleaning/replacing your filter.

- **Brush time left**
  - **Description**: how long until Roborock recommends cleaning/replacing your brush.

- **Error**
  - **Description**: the current error of the device - if one exists - "None" otherwise.

- **Total cleaning time**
  - **Description**: how long you have cleaned with your wet/dry vacuum.


### Zeo Entities

Roborock Zeo One currently exposes some entities through an MQTT connection - it is currently cloud dependent.

#### Sensor

- **State**
  - **Description**: The current state of your washing machine. For example, 'washing' or 'rinsing'.

- **Countdown**
  - **Description**: Countdown for how long until the machine starts.

- **Washing left**
  - **Description**: The amount of time until your machine is done washing.

- **Error**
  - **Description**: The current error of the Zeo, if one exists.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}


## FAQ

### Can I use the Mi home app with this integration?
No. This integration requires information from your Roborock app to set up and uses Roborock's protocols to communicate with your device. You must have your vacuum synced to the Roborock app.

### Can I block internet access for this device?
As of right now - no. When the vacuum is disconnected from the internet, it will attempt to disconnect itself from Wi-Fi and reconnect itself until it can reach the Roborock servers.

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
