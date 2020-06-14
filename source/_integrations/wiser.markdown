---
title: Drayton Wiser
description: Wiser Heating Component for Home Assistant.
ha_category:
  - Hub
  - Climate
  - Water Heater
  - Sensor
ha_release: 0.112.0
ha_iot_class: Local Polling
ha_codeowners:
  - '@asantaga'
  - '@msp1974'
ha_domain: wiser
ha_config_flow: true 
---

The `wiser` integration platform is used as an interface to the Drayton Wiser collection of devices.

There is currently support for the following device types within Home Assistant:

- Climate 
- Water Heater - for water heater zones.
- Sensor - for some additional information of the zones.
- Room Thermostats
- SmartPlugs

## Introduction

- **Climate platforms**

  - List of climate entities for each Room
  - Animated icons for the Rooms to let you know which rooms are actually being heated (credit @msp1974)
  - Allows setting of temperatures from HA
  - Allows setting of boost temperature using Home Assistant Presets
  - Displays icon if radiator is heating (heat flowing) or not

- **Switch platform(s)**

  - Allows the switching of various system switches including EcoMode, ComfortMode, AwayMode, Valve Protection and AwayModeAffectsWater
  - Allows the switching of the wiser system smartplugs

- **Sensor Platforms**

  - TRV Sensor
    - Each TRV is represented by a Sensor platform. Many attributes are exposed including extensive information about the device, such as WIFI Signal strength, firmware version, battery levels and zigbee information (including if connection to hub is direct or via repeater) etc
  - Room Thermostats Sensors
    - Displayed attributes include battery levels, humidity etc
  - Smartplug displayed as a sensor, firmware etc
    - Service providing ability to turn smartplug on, off or set to auto schedule
  - Heathub sensor
    - Attributes include zigbee channel , see https://support.metageek.com/hc/en-us/articles/203845040-ZigBee-and-WiFi-Coexistence for information on how zigbee and WIFI co-existence
  - Drayton Wiser Cloud Status Sensor
    - Nice to be able to have automation when things aren't working :-)
  - Heating Relay status Sensor
    - Nice to know when the heating is on/off.
      - This is nice to use in conjunction with the Climate platform when graphing data using Grafana
  - Hot Water relay status Sensor
    - Nice to know when the hot water is on/off.
    - Also a service which allows you to modify the state of the hotwater
  - Operation Mode Sensor (aka away sensor)
    - This sensor returns the away status of the heathub, being either `away` or `normal`.
  - Battery Sensors for all the battery devices

- **Services**

  - `wiser.boost_heating` : Provides ability to boost the heating in a particular room
  - `wiser.set_smartplug_mode` : Provides ability to set the mode of a smartplug to either `manual` or `auto`.  Setting the smartplug "state" is done by setting the state of the switch component.
  - `wiser.copy_schedule`, `wiser.get_schedule` and`wiser.set_schedule` :  Ability to manipulate the schedules for the TRVs
  - `wiser.set_hot_water_mode` : Provides ability to turn a hot water **on**/**off** or **auto**. Valid values include `on`, `off` or `auto` Setting it to auto makes it follow the current scheduleService

  ![img](../../images/integrations/wiser/uiexample.jpg)

## Configuration

### PreRequisites

Before you can use the component you need to find the HeatHub secret key, this involves a couple of steps.

- Press the setup button on your HeatHub, the light will start flashing
- Look for the Wi-Fi network (SSID) called ‘WiserHeatXXX’ where XXX is random
- Connect to the network from a Windows/Linux/Mac machine
- Execute the following REST call
- For Windows use `Invoke-RestMethod -Method Get -UseBasicParsing -Uri http://192.168.8.1/secret/`
- For Linux (or Windows WSL) use curl `http://192.168.8.1/secret`

This will return a string which will contain your system secret, save it somewhere and obviously don't share this :-)

- Press the setup button on the HeatHub again and it will go back to normal operations
- The HeatHub IP Address is found automatically by Home Assistant but if for some reason it isnt you can find Your HEATHUB IP Using your router. On many routers it usually identifies itself as the something like WiserHeatXXXXXX

### Setting up the Wiser Integration

- To use your Drayton thermostats in your installation, go to **Configuration** >> **Integrations** in the UI, click the discovered Drayton Wiser Integration configure button , or add integration and select **Wiser Heat Hub Setup** from the list



![HeatHubImage](../../images/integrations/wiser/heatupsetup.jpg)

- The user interface will request you the following parameters

  - 'ipaddress' is the iP address of the Wiser Heat Hub
  - `boost_temp` is the delta temperature the radiator should be set to when boosted, default is 2
  - `boost_time` is the time (in seconds) for which a boost should be active for, default is 30mins

  

Alternatively, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry with multiple accounts
wiser:
  host: <ENTER YOUR HEATHUB IP HERE>
  password: <ENTER YOUR SECRET TOKEN, OBTAINED EARLIER>
  scan_interval: 300
  boost_temp: 2
  boost_time: 30

```

- After this  the integration will add a all your TRVs, Sensors. RoomStats etc. to HomeAssistant



## Managing Schedules with Home Assistant

### Getting a Schedule

Use the service `wiser.get_schedule`

This will require you to provide the entity ID of the wiser device and a file to copy this schedule to. It is recommended to create a directory in your config directory to store these.

Note : If you are running HA within a docker container then the directory will be absolute to the container, if you have mapped the config directory to a local directory then all is good but the directory name given to the service must be a docker container address.

E.g. if you specify the filename as `/config/schedule.yaml`then `get_schedule` writes the file into the directory within the container. Providing you have mapped the config directory (using the -v or volumes: in docker-compose) then you can read this from a host directory (e.g. /home/haconfig.

### Setting a Schedule

Use the service `wiser.set_schedule`

This will require you to provide the entity ID of the wiser device and a file containing the schedule.

A good place to start is to get a schedule from a device and see the file structure. You can add times and temps within each day as you see fit. As file created using the `wiser.get_schedule` service looks like below:

```
Name: Dining Room
Description: Schedule for Dining Room
Type: Heating
Monday:
  - Time: 07:30
    Temp: 21
  - Time: 08:30
    Temp: 15
  - Time: 16:30
    Temp: 20
  - Time: 22:30
    Temp: 15
Tuesday:
  - Time: 07:30
    Temp: 21
  - Time: 08:30
    Temp: 15
  - Time: 16:30
    Temp: 20
  - Time: 22:30
    Temp: 15
Wednesday:
  - Time: 07:30
    Temp: 21
  - Time: 08:30
    Temp: 15
  - Time: 16:30
    Temp: 20
  - Time: 22:30
    Temp: 15
Thursday:
  - Time: 07:30
    Temp: 21
  - Time: 08:30
    Temp: 15
  - Time: 16:30
    Temp: 20
  - Time: 22:30
    Temp: 15
Friday:
  - Time: 07:30
    Temp: 21
  - Time: 08:30
    Temp: 15
  - Time: 16:30
    Temp: 20
  - Time: 22:30
    Temp: 15
Saturday:
  - Time: 07:00
    Temp: 19
  - Time: 10:00
    Temp: 17
  - Time: 16:00
    Temp: 20
  - Time: 23:00
    Temp: 15
Sunday:
  - Time: 08:30
    Temp: 21
```

If you are creating your own file (or editing one you have copied from a wiser device), you can use the 2 special day names of 'Weekdays' and 'Weekends' instead of listing individual days.

e.g.

```
Name: Test Room
Description: Schedule for Test Room
Type: Heating
Weekdays:
  - Time: 07:30
    Temp: 21.5
  - Time: 08:30
    Temp: 15
  - Time: 16:30
    Temp: 20
  - Time: 22:30
    Temp: 15
Weekends:
  - Time: 07:00
    Temp: 19
  - Time: 10:00
    Temp: 17
  - Time: 16:00
    Temp: 20.5
  - Time: 23:00
    Temp: 15
```

You can also use a mixture of these special day names and normal days to override a specific day (providing the specific days names are below these special ones!).

```
Name: Test Room
Description: Schedule for Test Room
Type: Heating
Weekdays:
  - Time: 07:30
    Temp: 21.5
  - Time: 08:30
    Temp: 15
  - Time: 16:30
    Temp: 20
  - Time: 22:30
    Temp: 15
Weekends:
  - Time: 07:00
    Temp: 19
  - Time: 10:00
    Temp: 17
  - Time: 16:00
    Temp: 20.5
  - Time: 23:00
    Temp: 15
Tuesday:
  - Time: 08:00
    Temp: 21.5
  - Time: 20:00
    Temp: 18.0
```

### Copying a Schedule

Use the service `wiser.copy_schedule`

This will require you to provide an entity ID of the device to copy from and the entity ID of the device to copy to and will copy the schedule between them.

## Network Topology

You can now determine if the TRV is connected to the heathub directly or via a smartplug repeater.

Each TRV sensor now has three special network related attributes

| Attribute        | Meaning                                                      |
| ---------------- | ------------------------------------------------------------ |
| `node_id`        | The node Id of the device                                    |
| `parent_node_id` | If this value is zero (0) then the device is connected direct to the heathub. A non zero value points to the smartplug/repeater for which this device is being routed through. Smartplugs always have this value as zero |
| `hub_route`      | Calculated convenience attribute which the evaluates to either `direct` or `repeater` based on if the device is connected direct or not to the heathub |

## Battery Values

For each battery driven device sensor the following attributes are available `battery_voltage`, `battery_percentage` and `battery_level`. From conversations with Wiser technical support they recommend changing the batteries for any TRV when it reaches battery voltage of "26" or *OneThird* battery level. Given that RoomStats do not need to drive a valve, their battery levels can be lower.

An obvious ideal candidate for a Home Assistant automation to remind you to change the batteries :-)

Note : If you power cycle your HomeHub, with more than a minute or so when it is off, we've noticed that the devices will not have the battery info for a short period of time (maybe 30mins to 1hr) , just wait and the battery values will appear.