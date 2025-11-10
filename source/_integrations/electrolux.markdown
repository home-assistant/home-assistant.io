---
title: Electrolux
description: Instructions on how to set up the Electrolux official integration within Home Assistant.
ha_release: 2025.12
ha_iot_class: Cloud Push
ha_codeowners:
  - '@electrolux-oss'
ha_domain: electrolux
ha_integration_type: integration
ha_config_flow: true
ha_category:
  - Binary sensor
  - Button
  - Climate
  - Fan
  - Hub
  - Humidifier
  - Number
  - Select
  - Sensor
  - Switch
  - Vacuum
ha_platforms:
  - binary_sensor
  - button
  - climate
  - fan
  - humidifier
  - number
  - select
  - sensor
  - switch
  - vacuum
ha_quality_scale: bronze
related:
  - url: https://developer.electrolux.one/documentation
    title: Electrolux Group for Developers documentation
---

The **Electrolux** {% term integrations %} enables users to connect and control their home appliances via the [official third-party API](https://developer.electrolux.one).

[Electrolux Group](https://www.electroluxgroup.com/) is a global appliance manufacturer that designs and produces solutions for taste, care, and wellbeing experiences. The company develops and sells products under several consumer brands, including **Electrolux**, **AEG**, and **Frigidaire**.

## Use cases

- Monitor multiple sensors of Electrolux appliances and trigger automations based on sensor data.
- Track the status of the appliances.
- Control appliance settings, such as start/stop, mode selection, or other configurable options.

{% note %}
Note that feature availability may vary depending on the appliance model.
{% endnote %}

## Supported devices

The integration supports the following appliance types:

- **Air Conditioner**: `AC`, `CA`, `Azul`, `Bogong`, `Panther`, `Telic`.
- **Air Purifier**: `Muju`, `Fuji`, `Purea9`, `Verbier`, `Wella5`, `Wella7`.
- **Dehumidifier**:`DH`, `Husky`.
- **Robot Vacuum Cleaner**:`Purei9`, `Gordias`, `Cybele`, `700Series`.
- **Dishwasher**:`DW`.
- **Washer Dryer**:`WD`.
- **Washing Machine**:`WM`.
- **Tumble Dryer**:`TD`.
- **Refrigerator**:`CR`.
- **Hob**:`HB`.
- **Hood**:`HD`.
- **Oven**:`OV`, `SO`.

## Prerequisites

1. Log in to the [Electrolux Group for Developers](https://developer.electrolux.one/login) using the same account you use in the Electrolux Group mobile apps.
2. Navigate to the **Dashboard**.
3. Create a new **API key**.
4. Generate the **Access Token** and **Refresh Token**.

Once these credentials are obtained, you can use them to configure the Electrolux integration in Home Assistant.

{% note %}
These tokens are for a single integration. Generate new ones for additional integrations.
{% endnote %}

{% include integrations/config_flow.md %}

Enter the following:
{% configuration_basic %}
API key:
    description: "Your developer API key from Electrolux Group for Developers."
Access Token:
    description: "The access token provided by Electrolux Group for Developers to access your devices."
Refresh Token:
    description: "The refresh token used to renew your access token."
{% endconfiguration_basic %}

## Supported functionality

The **Electrolux** {% term integrations %} provides the following entities.

{% note %}
Entity availability depends on the appliance type and model. Some entities may not be supported by certain appliances and could appear as unavailable or not appear at all.
{% endnote %}

### Binary sensor

{% details "List of binary sensors" %}

- **Drawer status**
  - **Description**: Shows if the drawer of the appliance is open or closed.
  - **Available for appliance types**: Hood.
- **Auto switch off event**
  - **Description**: The Auto Switch Off event indicates when the appliance can be automatically turned off.
  - **Available for appliance types**: Hood.

{% enddetails %}

### Button

{% details "List of button entities" %}

The availability of each button entity depends on the current state of the appliance. Button entities may be enabled or disabled based on what the appliance can do at that moment. This entity is used to control the appliance with the following actions:

- **Start**
  - **Description**: Begin operation.
  - **Available for appliance types**: Oven, Washing machine, Dryer, Washer dryer, Dishwasher.
- **Pause**
  - **Description**: Temporarily pause operation.
  - **Available for appliance types**: Washing machine, Dryer, Washer dryer, Dishwasher.
- **Resume**
  - **Description**: Continue a paused operation.
  - **Available for appliance types**: Washing machine, Dryer, Washer dryer, Dishwasher.
- **Stop**
  - **Description**: Stop the appliance.
  - **Available for appliance types**: Oven, Washing machine, Dryer, Washer dryer, Dishwasher.

{% enddetails %}

### Climate

{% details "List of climate entities" %}

Climate entity allow controlling and reporting the appliance’s climate-related functions, such as changing the mode, setting the target temperature, turning the appliance on or off, adjusting the fan, and reading the current temperature.

{% enddetails %}

### Fan

{% details "List of fan entities" %}

Fan entity is used for Air Purifier and Dehumidifier appliances to control the fan speed.

{% enddetails %}

### Humidifier

{% details "List of humidifier entities" %}

Humidifier entity is used for Dehumidifier appliances to control operating modes, set the target humidity, read the current humidity, and turn the appliance on or off.
{% enddetails %}

### Number

{% details "List of number entities" %}

- **Target Temperature**
  - **Description**: Set or report the target temperature.
  - **Available for appliance types**: Oven, Fridge.
- **Duration**
  - **Description**: Set or report the oven cooking duration.
  - **Available for appliance types**: Oven.
- **Light Intensity**
  - **Description**: Adjust or report the light brightness.
  - **Available for appliance types**: Hood.
- **Light Color Temperature**
  - **Description**: Adjust or report the light color temperature.
  - **Available for appliance types**: Hood.
{% enddetails %}

### Select

{% details "List of select entities" %}

- **Temperature**
  - **Description**: Used to select or report the analog temperature setting. 
  - **Available for appliance types**: Washing machine, Washer Dryer.
- **Spin Speed**
  - **Description**: Used to select or report the spin speed.
  - **Available for appliance types**: Washing machine, Washer Dryer.
- **Program**
  - **Description**: Used to select or report the program.
  - **Available for appliance types**: Oven, Washing machine, Dryer, Washer dryer, Dishwasher.
- **Fan Level**
  - **Description**: Used to select the fan level.
  - **Available for appliance types**: Hob, Hood.
- **Hood State**
  - **Description**: Used to select or report the current state of the hood.
  - **Available for appliance types**: Hob.
- **Sound Tone**
  - **Description**: Used to select the sound tone.
  - **Available for appliance types**: Hob.
{% enddetails %}

### Sensor

{% details "List of sensors" %}

- **Air filter state**
  - **Description**: Reports air filter status. 
  - **Available for appliance types**: Refrigerator.
- **Appliance mode**
  - **Description**: Reports hood mode.
  - **Available for appliance types**: Hood, Hob.
- **Appliance state**
  - **Description**: Reports the current appliance state.
  - **Available for appliance types**: Oven, Washing machine, Dryer, Washer dryer, Dishwasher, Refrigerator, Hood, Hob.
- **Battery**
  - **Description**: Reports the battery level.
  - **Available for appliance types**: RVC.
- **Charcoal filter timer**
  - **Description**:  Reports time for charcoal filter.
  - **Available for appliance types**: Hood.
- **Connection state**
  - **Description**: Reports if the appliance is connected to the network.
  - **Available for appliance types**: All appliances.
- **Current temperature**
  - **Description**: Reports the current cavity temperature.
  - **Available for appliance types**: Oven.
- **Cycle phase**
  - **Description**: Reports the current wash/dry cycle phase.
  - **Available for appliance types**: Washing machine, Dryer, Washer dryer, Dishwasher.
- **Door state**
  - **Description**: Reports whether the door is open or closed.
  - **Available for appliance types**: Oven, Washing machine, Dryer, Washer dryer, Dishwasher, Refrigerator.
- **Duration / Target Duration**
  - **Description**: Reports remaining time.
  - **Available for appliance types**: Oven, Washing machine, Dryer, Washer dryer, Dishwasher, Hood, Hob.
- **Filter charcoal enable**
  - **Description**: Reports if charcoal filter is active.
  - **Available for appliance types**: Hood.
- **Food probe state**
  - **Description**: Reports the food probe state.
  - **Available for appliance types**: Oven.
- **Food probe temperature**
  - **Description**:  Reports food probe temperature.
  - **Available for appliance types**: Oven.
- **Grease filter time**
  - **Description**: Reports time for grease filter.
  - **Available for appliance types**: Hood.
- **Human centric light state**
  - **Description**: Reports status of adaptive lighting.
  - **Available for appliance types**: Hood.
- **PM1**
  - **Description**: Reports concentration of fine particles <1µm.
  - **Available for appliance types**: Air purifier.
- **PM2.5**
  - **Description**: Reports concentration of fine particles <2.5µm.
  - **Available for appliance types**: Air purifier.
- **PM10**:
  - **Description**: Reports concentration of particles up to 10µm.
  - **Available for appliance types**: Air purifier.
- **Pot detected**
  - **Description**: Detects pot presence on zone.
  - **Available for appliance types**: Hob.
- **Reminder time**:
  - **Description**: Reports reminder timer.
  - **Available for appliance types**: Hob.
- **Remote control**
  - **Description**: Reports the remote control status.
  - **Available for appliance types**: Oven, Washing machine, Dryer, Washer dryer, Dishwasher, Hood, Hob.  
- **Residual heat state**:
  - **Description**: Reports residual heat in a zone.
  - **Available for appliance types**: Hob.
- **Running time**
  - **Description**: Reports the appliance running time.
  - **Available for appliance types**: Oven.
- **Sound volume**:
  - **Description**: Reports current sound level setting.
  - **Available for appliance types**: Hood.
- **Start at / Stop at**
  - **Description**: Reports or schedules program start/stop time.
  - **Available for appliance types**: Oven, Washing machine, Dryer, Washer dryer, Dishwasher.
- **Target temperature**
  - **Description**: Reports cavity target temperature.
  - **Available for appliance types**: Refrigerator.
- **TVOC**
  - **Description**: Reports total volatile organic compounds.
  - **Available for appliance types**: Air purifier.
- **TVOC filter time**
  - **Description**: Reports time for TVOC filter.
  - **Available for appliance types**: Hood.
- **UI lock mode**
  - **Description**: Reports if the user interface is locked.
  - **Available for appliance types**: Washing machine, Dryer, Washer dryer, Dishwasher, Refrigerator, Hob.
- **Vacation mode**
  - **Description**: Reports if vacation/holiday mode is enabled.
  - **Available for appliance types**: Refrigerator.
- **Water filter state**
  - **Description**: Reports water filter status.
  - **Available for appliance types**: Refrigerator.
- **Water hardness**
  - **Description**: Reports water hardness.
  - **Available for appliance types**: Washing machine, Dryer, Washer dryer, Dishwasher.
- **Windows notification**
  - **Description**: Reports if a window needs to be opened.
  - **Available for appliance types**: Hob.

{% enddetails %}

### Switch

{% details "List of switch entities" %}

- **Cavity Light**
  - **Description**: Turns the oven cavity light on or off.
  - **Available for appliance types**: Oven.
- **Child Lock**
  - **Description**: Enables the child lock function.
  - **Available for appliance types**: Hob.
{% enddetails %}

### Vacuum

{% details "List of vacuum entities" %}

Vacuum entity allows controlling Electrolux group RVC by starting, stopping, pausing, returning to the charging dock, adjusting the fan speed, and reporting the current state.
{% enddetails %}

## Actions

The integration provides the following actions.

### Action: Get interactive maps

{% note %}
This action is specific to **Pure i8** and **Pure i9** Robot Vacuum Cleaners (RVC) and may not be compatible with other RVC models.
{% endnote %}

The `electrolux.get_interactive_maps` action retrieves the available interactive maps along with their related zones. The response includes a list of interactive maps that can be used for zone-based cleaning and automation.
For more information about Interactive maps, refer to the [official documentation](<https://developer.electrolux.one/documentation/reference#getInteractiveMaps>).

- **Data attribute**: `entity_id`
  - **Description**: The ID of the entity to get the interactive map for.
  - **Optional**: No

```yaml
action: electrolux.get_interactive_maps
data: 
  entity_id: vacuum.purei_rvc
```

### Action : Get memory maps


{% note %}
This action is specific to **Gordias** and **Cybele** Robot Vacuum Cleaners (RVC) and may not be compatible with other RVC models.
{% endnote %}


The `electrolux.get_memory_maps` action retrieves the available memory maps for the RVC along with their related rooms. The response includes a list of memory maps that can be used for room-based cleaning and automation.
For more information about Memory maps, refer to the [official documentation](https://developer.electrolux.one/documentation/reference#getMemoryMaps).

- **Data attribute**: `entity_id`
  - **Description**: The ID of the entity to get the memory map for.
  - **Optional**: No

```yaml
action: electrolux.get_memory_maps
data: 
  entity_id: vacuum.gordias_rvc
```

### Action: Vacuum send command

The `vacuum.send_command` action allows sending zone/room cleaning commands.

#### Clean Zone command

{% note %}
This action is specific to **Pure i8** and **Pure i9** Robot Vacuum Cleaners (RVC) and may not be compatible with other RVC models.
{% endnote %}

This action allows sending a cleaning command for specific zones to compatible robotic vacuum models.

```yaml
action: vacuum.send_command
data:
  command: clean_zones
  params:
    map_id: e9de80d2-5862-44d4-be70-8486d874dbd5
    zone_ids:
      - 1df10b9b-35cb-4830-ba04-377572cba898
    power_mode: 1
target:
  entity_id: vacuum.purei_rvc
```

#### Clean Gordias Room command

{% note %}
This action is specific to **Gordias** Robot Vacuum Cleaners (RVC) and may not be compatible with other RVC models.
{% endnote %}

This action allows sending a cleaning command for specific rooms to compatible robotic vacuum models.

```yaml
action: vacuum.send_command
data:
  command: clean_gordias_rooms
  params:
    map_id: 1748953648
    room_ids:
      - 10
    sweepMode: 0
    vacuumMode: standard
    waterPumpRate: "off"
    numberOfCleaningRepetitions: 1
target:
  entity_id: vacuum.gordias_rvc
```

#### Clean Cybele Room command

{% note %}
This action is specific to **Cybele** Robot Vacuum Cleaners (RVC) and may not be compatible with other RVC models.
{% endnote %}

This action allows sending a cleaning command for specific rooms to compatible robotic vacuum models.

Example for clean Cybele room command, with general settings:

```yaml
action: vacuum.send_command
data:
  command: clean_cybele_rooms
  params:
    map_id: 4259230
    room_ids_names:
      - [1, "Kitchen"]
      - [2, "Living Room"]
      - [3, "Bedroom"]
    globalSettingsCleaning: True
target:
  entity_id: vacuum.cybele_rvc
```

Example for clean Cybele room command, with custom settings:

```yaml
action: vacuum.send_command
data:
  command: clean_cybele_rooms
  params:
    map_id: 4259230
    room_ids_names:
      - [1, "Kitchen"]
      - [2, "Living Room"]
      - [3, "Bedroom"]
    globalSettingsCleaning: False
    cleaningType: vacuum
    vacuumMode: standard
    waterPumpRate: "off"
    numberOfCleaningRepetitions: 1
target:
  entity_id: vacuum.cybele_rvc
```

## Example

### Notify When Refrigerator Air Filter Needs Replacement

```yaml
alias: Notify when fridge air filter needs replacement
triggers:
  - trigger: state
    entity_id:
      - sensor.my_fridge_air_filter_state
    to: CHANGE
conditions: []
actions:
  - action: notify.send_message
    metadata: {}
    data:
      message: Refrigerator air filter needs replacement!
```

### Start Dehumidifier When Humidity Is High

```yaml
alias: Dehumidify when humidity exceeds 70%
triggers:
  - device_id: c2e3b509e6469322364a5a6469e518e9
    domain: humidifier
    entity_id: 107f50b7d1b87f6ccca6020c2300c2c6
    type: current_humidity_changed
    trigger: device
    above: 70
conditions: []
actions:
  - type: turn_on
    device_id: c2e3b509e6469322364a5a6469e518e9
    entity_id: 107f50b7d1b87f6ccca6020c2300c2c6
    domain: humidifier

```

## Known limitations

- The Electrolux Group third-party API does not provide full parity with the mobile app. Some options, or settings available in the app may be unavailable or limited when accessed through the API.

## Removing the integration

{% include integrations/remove_device_service.md %}
