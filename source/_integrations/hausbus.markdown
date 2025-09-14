---
title: Haus-Bus
description: Instructions on setting up Haus-Bus.de components within Home Assistant.
ha_category:
  - Hub
  - Light
  - Switch
  - Cover
  - Sensor
ha_iot_class: Local Push
ha_release: '2023.8'
ha_config_flow: true
ha_codeowners:
  - '@hausbus'
ha_domain: hausbus
ha_platforms:
  - binary_sensor
  - button
  - cover
  - event
  - light
  - sensor
  - switch
  
ha_zeroconf: true
ha_integration_type: hub
---

The hausbus integration allows you to control and monitor all actors and sensors developed by haus-bus.de

These include:

- Relay modules
- Dimmer modules
- Shutter modules
- RGB Dimmer modules
- Multi pushbuttons with sensors for temperature, brightness and humidity
- IO modules with additional 1-Wire support
- 0-10V or 1-10V modules
- Smart plugs with power meassurement
- Motion and presence sensors
- RFID readers
- High power regulators

{% include integrations/config_flow.md %}

## Support for special events of push buttons and binary inputs

In addition to pressed and released, the Haus-Bus multi-buttons support various special events such as click, double-click, held-start and held-end.

To achieve maximum compatibility and user convenience, these are implemented both as event entities and as device triggers.

This also applies to digital inputs to which external push buttons could be connected. 
However, these are also implemented as binary sensors so that they can also be used with a switch or window contact.


## Support for special commands

The hausbus integration supports all standard functions of the respective entity platforms. 

In addition, special functions are offered via services whose name begins with the prefix "hausbus." as well as via automation actions.


## Support for special configurations

The hausbus integration provides all available configuration options for any haus-bus.de module type via service whose name always follow the pattern "hausbus.TYPE_set_configuration"

All available configuration parameters and values are documented on the [haus-bus.de webpage](https://www.haus-bus.de/ha).


## Installation of haus-bus.de modules for Home Assistant

For more information on connecting Haus-Bus.de components to operate them in a Home Assistant system, 
visit our dedicated documentation page at [www.haus-bus.de/ha](https://www.haus-bus.de/ha)





# Overview of all Haus-Bus sensors and actuators


## General functions

### Additional functions via service:

- **discover_devices**  
  Starts a new device discovery.

- **reset_device**  
  Resets the specified module.



## Relays and digital outputs

Home Assistant standard functions: [**Switch entity**](https://www.home-assistant.io/integrations/switch/)

### Additional functions via service and automation action:

**switch_off**  
Switches off a relay with the specified off delay.

- `off_delay`  
  If configured greater than 0, the switch will turn off after the given time.  
  Range: 0–65535, Default: 0 (No delay)


**switch_on**  
Switches on a relay for the specified duration and with on delay.

- `duration`  
  If configured greater than 0, the switch will turn off after this time.  
  Range: 0–65535, Default: 0 (No delay)

- `on_delay`  
  If configured greater than 0, the switch will turn on after the given time.  
  Range: 0–65535, Default: 0 (No delay)


**switch_toggle**  
Toggles a relay in intervals with specified on/off times and number of repetitions.

- `off_time`  
  Duration the relay is off during a toggle cycle.  
  Range: 1–255, Default: 1

- `on_time`  
  Duration the relay is on during a toggle cycle.  
  Range: 1–255, Default: 1

- `quantity`  
  Number of toggle cycles. 0 = infinite.  
  Range: 1–255, Default: 0 (Toggle indefinitely)


## Roller shutters

Home Assistant standard functions: [**Cover entity**](https://www.home-assistant.io/integrations/cover/)

### Additional functions via service and automation action:

**cover_toggle**  
Starts the cover in the opposite direction as last time.


### Additional configuration via service:

**cover_set_configuration**  
Defines all possible configuration values for a cover channel.

- `close_time`  
  Time for fully closing the cover (open → closed).  
  Range: 1–255, Default: 30

- `open_time`  
  Time for fully opening the cover (closed → open).  
  Range: 1–255, Default: 30

- `invert_direction`  
  Inverts UP and DOWN directions.  
  Default: False


## 230V Dimmer

Home Assistant standard functions: [**Light entity**](https://www.home-assistant.io/integrations/light/)

### Additional functions via service and automation action:

**dimmer_set_brightness**  
Turns on a dimmer and optionally sets the duration.

- `brightness`  
  Brightness in percent (0–100%), Default: 100%

- `duration`  
  On-duration in seconds, Default: 0 s (Permanent)


**dimmer_start_ramp**  
Starts a dimmer ramp in the specified direction or toggles to the opposite of the last action.

- `direction`  
  Ramp direction, Default: `up`  
  - `up`: Dim brighter  
  - `down`: Dim darker  
  - `toggle`: Opposite of last dim direction

**dimmer_stop_ramp**  
Stops a previously started dimmer ramp.


### Additional configuration via service:

**dimmer_set_configuration**  
Defines all available configuration values of a dimmer channel.

- `mode`  
  Working mode of the dimmer, Default: `dimm_trailing_edge`  
  - `dimm_trailing_edge`: Trailing edge dimmer  
  - `dimm_leading_edge`: Leading edge dimmer  
  - `switch_only`: Switch only  

- `dimming_time`  
  Time in 50 ms steps to go from 0% to 100% brightness (1–255).  
  Default: 12

- `ramp_time`  
  Time in 50 ms steps for dimmer ramps (1–255).  
  Default: 60

- `dimming_start_brightness`  
  Start brightness of a dim action (0–100%).  
  Default: 0%

- `dimming_end_brightness`  
  End brightness of a dim action (0–100%).  
  Default: 100%


## RGB Dimmer

Home Assistant standard functions: [**Light entity**](https://www.home-assistant.io/integrations/light/)

### Additional functions via service and automation action:

**rgb_set_color**  
Turns on an RGB light and optionally sets the color and duration.

- `brightness_red`  
  Brightness for red in percent (0–100%). Default: 100%

- `brightness_green`  
  Brightness for green in percent (0–100%). Default: 100%

- `brightness_blue`  
  Brightness for blue in percent (0–100%). Default: 100%

- `duration`  
  On-duration in seconds. Default: 0 s (Permanent)


### Additional configuration via service:

**rgb_set_configuration**  
Defines all available configuration values of an RGB channel.

- `dimming_time`  
  Fade time (50 ms steps) from 0% to 100% when setting a new brightness via `set_brightness`.  
  Range: 1–255, Default: 12


## LED

Home Assistant standard functions: [**Light entity**](https://www.home-assistant.io/integrations/light/)

### Additional functions via service and automation action:

**led_set_brightness**  
Turns on an LED and optionally sets the brightness.

- `brightness`  
  Brightness in percent (0–100%). Default: 100%


## Buttons

Home Assistant standard functions: [**Binary sensor entity**](https://www.home-assistant.io/integrations/binary_sensor/)

### Additional functions via service and automation action:

**button_simulate_press**  
Simulates a button press.


## Analog inputs

Home Assistant standard functions: [**Sensor entity**](https://www.home-assistant.io/integrations/sensor/)

### Additional configuration via service:

**analog_input_set_configuration**  
Defines all configuration values of an analog input channel.

- `min_voltage`  
  Voltage corresponding to 0%. Range: 0–10000 mV.  
  Default: 0

- `max_voltage`  
  Voltage corresponding to 100%. Range: 0–10000 mV.  
  Default: 10000

- `invert`  
  Inverts the input.  
  Default: False


## Temperature sensors

Home Assistant standard functions: [**Sensor entity**](https://www.home-assistant.io/integrations/sensor/)

### Additional configuration via service:

**temperature_sensor_set_configuration**  
Defines all configuration values of a temperature sensor channel.

- `offset`  
  Temperature offset in 0.1 °C steps (signed). Range: -1280–1270.  
  Default: 0


## Events

Home Assistant standard functions: [**Event entity**](https://www.home-assistant.io/integrations/event/)

### Event types

- **short_press** – A short button press  
- **long_press** – A long button press  
- **double_press** – A double button press  


## Device triggers

Home Assistant standard functions: [**Device triggers**](https://www.home-assistant.io/docs/automation/trigger/#device-trigger)

### Trigger types

- **short_press** – Fires when a button is pressed shortly  
- **long_press** – Fires when a button is pressed for a long duration  
- **double_press** – Fires when a button is pressed twice  


## Device actions

Home Assistant standard functions: [**Device actions**](https://www.home-assistant.io/docs/automation/action/device/)

### Action types

- **switch_on** – Turns on a relay  
- **switch_off** – Turns off a relay  
- **switch_toggle** – Toggles a relay  
- **cover_open** – Opens a cover  
- **cover_close** – Closes a cover  
- **cover_stop** – Stops a cover  
- **cover_toggle** – Toggles cover movement  
- **dimmer_set_brightness** – Sets brightness of a dimmer  
- **dimmer_start_ramp** – Starts dimming ramp  
- **dimmer_stop_ramp** – Stops dimming ramp  
- **rgb_set_color** – Sets color of an RGB dimmer  
- **led_set_brightness** – Sets brightness of an LED  
- **button_simulate_press** – Simulates a button press  


## Device conditions

Home Assistant standard functions: [**Device conditions**](https://www.home-assistant.io/docs/automation/condition/#device-condition)

### Condition types

- **is_on** – Checks if a relay is on  
- **is_off** – Checks if a relay is off  
- **cover_is_open** – Checks if a cover is open  
- **cover_is_closed** – Checks if a cover is closed  
- **cover_is_opening** – Checks if a cover is opening  
- **cover_is_closing** – Checks if a cover is closing  
- **light_is_on** – Checks if a dimmer or RGB is on  
- **light_is_off** – Checks if a dimmer or RGB is off  
- **button_is_pressed** – Checks if a button is pressed  
