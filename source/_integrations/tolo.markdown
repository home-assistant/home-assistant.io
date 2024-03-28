---
title: TOLO Sauna
description: Control your TOLO Sauna and Steam Bath with Home Assistant.
ha_release: '2021.12'
ha_category:
  - Climate
  - Health
  - Light
ha_domain: tolo
ha_config_flow: true
ha_codeowners:
  - '@MatthiasLohr'
ha_iot_class: Local Polling
ha_platforms:
  - binary_sensor
  - button
  - climate
  - fan
  - light
  - number
  - select
  - sensor
  - switch
ha_dhcp: true
ha_integration_type: integration
---

The TOLO integration allows to control [Steamtec TOLO](https://www.tolosauna.com/) devices with Home Assistant.


## Prerequisites

To be able to connect to your TOLO system via Home Assistant, you need to have the TOLO App Control Box, which is also required to be able to control your TOLO system using your mobile phone.
Connect the TOLO App Control Box to your network.
For auto detection, your Home Assistant instance needs to be connected to the same network broadcast domain as your TOLO App Control Box (which is usually true for normal home networks).
However, you can also manually define the IP to which the Home Assistant TOLO integration should connect to.
Please use your router to find out the IP address of your TOLO App Control Box.


## Features

**General notice:**
A TOLO system can be equipped with many optional accessoires, such as [lights](#light-control), [fans](#fan-control), [aroma oil injectors](#aroma-therapy), [sole nebulizer](#salt-bath) and [descaling pump](#sweeping-and-descaling).
The TOLO system does not report back which optional accessories are attached. Therefore, the TOLO integration always provides all possible entities even if the features are not available due to missing optional accessories.


### Sauna operating mode

The TOLO integration offers a climate entity to control the general operating mode of your TOLO system.
This can either be *Off*, *Heat*, or *Dry*.

  - *Off*: Energy is shut down, the water boiler is empty (or will be emptied soon, see [Sweeping and Descaling](#sweeping-and-descaling)).
  - *Heat*: This is the normal operating mode for enjoying your sauna or steam bath.
    If *Power timer* is set to a value greater than zero, the TOLO system will automatically turn off after the amount of minutes configured in the *Power timer* setting.
    If *Power timer* is set to zero, the TOLO system will run indefinitely, until it is turned off manually.
  - *Dry*: In this mode, everything is turned off except the fan.
    This mode can be used when shutting down the TOLO system to reduce humidity in the room.
    After the time configured in *Fan timer* (see [Fan Control](#fan-control)) has passed, the fan and the TOLO system will automatically turn to *Off*.


### Temperature and humidity

The TOLO system allows setting a target temperature between 35°C and 60°C.
The TOLO system will heat and continue to produce steam until the room temperature sensor reaches the configured target temperature.

Target humidity can be set between 60% and 99%.
Once the configured humidity is reached, the steam generator will stop producing steam.
If then the humidity is below 6% (this value is hardcoded by TOLO systems and cannot be changed by the TOLO integration), the TOLO system will start to produce steam again.
This setting is only recognized if the TOLO system is equipped with a humidity sensor (not part of the default configuration).
If no humidity sensor is present, steam production will only depend on the temperature.


### Light control

The TOLO system allows to connect RGB LEDs, which can be controlled by the TOLO integration.
The TOLO system provides two modes for LED operation, *manual* and *automatic*.

  - *Manual*: When turned on, the RGB LEDs will stick to the same color until it is manually changed by pressing the *Next color* button.
  - *Automatic*: When turned on, the RGB LEDs will slowly fade from one color to another.


### Fan control

The TOLO system allows to connect a fan, which can be used to reduce the humidity after the steam generation has been turned off.
Once activated, the fan will automatically turn off between 1 and 60 minutes, depending on the *Fan timer* setting.


### Aroma therapy

The TOLO system allows to connect an aroma oil injector with slots for either one or two aroma flavors.
When enabled, the aroma pump will work every 5 minutes for 5 seconds each.
Unfortunately, the TOLO system does not allow to change these intervals.
For shorter intervals between pump activations, the TOLO manual suggests to manually disable and enable *Aroma therapy*.


### Salt bath

The TOLO system allows to connect a sole nebulizer, which can be used to inject salt spray in your sauna or steam bath room to allow for a salt bath.
Using the *Salt bath timer*, the salt bath feature can be configured to run indefinitely (set *Salt bath timer* to 0) or for a pre-defined time between 1 and 60 minutes.


### Sweeping and descaling

The TOLO system has a built-in system for sweeping and descaling.
This feature is currently not supported by the TOLO integration and will be added in an upcoming release.


### Diagnostic information

Beside the controls described above, the TOLO integration provides following diagnostic information:
  - *Power timer*:
    The remaining time the TOLO system will produce steam after it has been turned on.
  - *Fan timer*:
    The remaining time the fan will be on after it has been turned on.
  - *Salt bath timer*:
    The remaining time the salt bath will be active after it has been turned on.
  - *Tank temperature*:
    Current temperature of the water in the water tank.
    Should be close to 100°C when in *Heat* mode.
  - *Water level*:
    The current water level in the water tank.
    This should be 0% when off and 100% when in *Heat* mode.
  - *Water in/out valves*:
    Indicates if the TOLO system currently lets water run in or out.
    When starting up, *Water in valve* should be open while *Water out valve* should be closed.
    During *Heat* operation, both valves should be normally closed except short moments where consumed water needs to be refilled.
    When off, the *Water out valve* should remain open.


{% include integrations/config_flow.md %}
