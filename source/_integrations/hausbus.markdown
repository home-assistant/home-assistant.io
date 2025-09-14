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

All available configuration parameters and values are documented on the [www.haus-bus.de/ha](https://www.haus-bus.de/ha).


## Installation of haus-bus.de modules for Home Assistant

For more information on connecting Haus-Bus.de components to operate them in a Home Assistant system, 
visit our dedicated documentation page at [www.haus-bus.de/ha](https://www.haus-bus.de/ha)




## Overview of all Haus-Bus sensors and actuators


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

**led_off**  
Turns off an LED and optionally considers a delay.

- `off_delay`  
  Delay in seconds before switching off.  
  Default: 0 s (No delay)


**led_on**  
Turns on an LED and considers brightness, duration, and turn-on delay.

- `brightness`  
  Brightness in percent (0–100 %).  
  Default: 100 %

- `duration`  
  Turn-on duration in seconds.  
  Default: 0 s (Permanent)

- `on_delay`  
  Delay in seconds before switching on.  
  Default: 0 s (No delay)


**led_blink**  
Makes an LED blink with a given pattern and number of repetitions.

- `brightness`  
  Brightness in percent (0–100 %).  
  Default: 100 %

- `off_time`  
  Duration of the off phase in the blink pattern.  
  Range: 0–255, Default: 1

- `on_time`  
  Duration of the on phase in the blink pattern.  
  Range: 0–255,


## Buttons and digital inputs

Home Assistant standard functions: [**Event entity**](https://www.home-assistant.io/integrations/event/)

### Additional events via Event entity and Device Trigger:

- `button_pressed`  
  Button was pressed or digital input (e.g., window contact) was closed.

- `button_released`  
  Button was released or digital input was opened.

- `button_clicked`  
  Button was pressed and released.  
  Needed if double click or hold is used, as these events also report `button_pressed` at the beginning.

- `button_double_clicked`  
  Button was double clicked.

- `button_hold_start`  
  Button is being held down.

- `button_hold_end`  
  Button was released after being held.

### Example usage with a button controlling a dimmer:

- `button_clicked` → Toggle lamp on/off  
- `button_hold_start` → Start dimming ramp (lamp brightens while button is held)  
- `button_hold_end` → Stop dimming ramp (lamp stays at achieved brightness)  
- `button_double_clicked` → Set predefined brightness (e.g., 50%)

If double click or hold is not needed, it is better to use the standard events of the **Binary Sensor entity** or alternatively:

- `button_pressed` → Toggle lamp on/off  

This ensures optimal reaction time, as the clicked event is slightly delayed to allow detection of a double click or hold.

### Example usage with a digital input (switch or window contact):

For this use case, the standard events of the **Binary Sensor entity** are usually sufficient and optimal, so device triggers are not needed.  
If desired:

- `button_pressed` → Window contact closed  
- `button_released` → Window contact opened

### Additional functions via service and automation action:

**push_button_configure_events**  
Disables all events of this input for a certain time or enables them again.

- `event_activation_status`  
  Desired state of input events.  
  Default: ENABLED  
  - `DISABLED`: Disable all events  
  - `ENABLED`: Enable all events  
  - `INVERT`: Invert current status

- `disabled_duration`  
  Events remain disabled for the specified time.  
  Default: 0 (permanent off), Range: 1–255

### Additional configuration via service:

**push_button_set_configuration**  
Sets all configuration parameters for the input.

- `hold_timeout`  
  Duration the button must be pressed to generate `button_hold_start` event.  
  Default: 100 ms, Range: 1–255

- `double_click_timeout`  
  Time window to press the button again to generate `button_double_clicked` event.  
  Default: 50 ms, Range: 1–255

- `event_button_pressed_active`  
  True if `button_pressed` event should be sent.  
  Default: True

- `event_button_released_active`  
  True if `button_released` event should be sent.  
  Default: True

- `event_button_hold_start_active`  
  True if `button_hold_start` event should be sent.  
  Default: False (delays `button_clicked` accordingly)

- `event_button_hold_end_active`  
  True if `button_hold_end` event should be sent.  
  Default: False

- `event_button_clicked_active`  
  True if `button_clicked` event should be sent.  
  Default: False

- `event_button_double_clicked_active`  
  True if `button_double_clicked` event should be sent.  
  Default: False (delays `button_clicked` accordingly)

- `led_feedback_active`  
  True if LED of the Haus-Bus multi-button shows pressed button automatically.  
  Default: True

- `inverted`  
  True if the logic of this input should be inverted.  
  Default: False

- `debounce_time`  
  Debounce time of the input.  
  Default: 40 ms  
  - 40 ms: For buttons  
  - 10 ms: For high-frequency signals  
  Range: 1–254

## Temperature sensor

Home Assistant standard functions: [**Sensor entity**](https://www.home-assistant.io/integrations/sensor/)

### Additional configuration via service:

**temperatur_sensor_set_configuration**  
Sets all configuration parameters for a temperature sensor.

- `correction`  
  Correction value to adjust the reported temperature. Can be positive or negative and is added to the reported sensor value.  
  Range: -10 to 10, Step: 0.1, Unit: °C, Default: -2

- `auto_event_diff`  
  Temperature change that triggers a new event. Instead of a fixed interval, an update is triggered when this change occurs.  
  Range: 0.1–20, Step: 0.1, Unit: °C, Default: 0.5

- `manual_event_interval`  
  Interval for reported temperature values, independent of changes.  
  Default: 5 minutes  
  Options: 1 second, 5 seconds, 10 seconds, 30 seconds, 1 minute, 5 minutes, 10 minutes, 20 minutes, 30 minutes, 60 minutes


## Humidity sensor

Home Assistant standard functions: [**Sensor entity**](https://www.home-assistant.io/integrations/sensor/)

### Additional configuration via service:

**humidity_sensor_set_configuration**  
Sets all configuration parameters for a humidity sensor.

- `correction`  
  Correction value to adjust the reported humidity. Can be positive or negative and is added to the reported sensor value.  
  Range: -100 to 100, Step: 0.1, Unit: %, Default: 0

- `auto_event_diff`  
  Humidity change that triggers a new event. Instead of a fixed interval, an update is triggered when this change occurs.  
  Range: 0.1–100, Step: 0.1, Unit: %, Default: 1

- `manual_event_interval`  
  Interval for reported humidity values, independent of changes.  
  Default: 5 minutes  
  Options: 1 second, 5 seconds, 10 seconds, 30 seconds, 1 minute, 5 minutes, 10 minutes, 20 minutes, 30 minutes, 60 minutes


## Brightness sensor

Home Assistant standard functions: [**Sensor entity**](https://www.home-assistant.io/integrations/sensor/)

### Additional configuration via service:

**brightness_sensor_set_configuration**  
Sets all configuration parameters for a brightness sensor.

- `correction`  
  Correction value to adjust the reported brightness. Can be positive or negative and is added to the reported sensor value.  
  Range: -100 to 100, Step: 10, Unit: lux, Default: 0

- `auto_event_diff`  
  Brightness change that triggers a new event. Instead of a fixed interval, an update is triggered when this change occurs.  
  Range: 10–100, Step: 10, Unit: lux, Default: 30

- `manual_event_interval`  
  Interval for reported brightness values, independent of changes.  
  Default: 5 minutes  
  Options: 1 second, 5 seconds, 10 seconds, 30 seconds, 1 minute, 5 minutes, 10 minutes, 20 minutes, 30 minutes, 60 minutes

## RFID reader

Home Assistant standard functions: [**Sensor entity**](https://www.home-assistant.io/integrations/sensor/)

- `last_tag`  
  Last read RFID tag

- `last_time`  
  Timestamp of the last read operation

- `last_error`  
  Last error


### Additional event:

A Home Assistant event is sent whenever an RFID tag is read:

- `event_typ`  
  hausbus_rfid_event

- `device_Id`  
  Sending device

- `tag`  
  Read RFID tag

## Power measurement

Home Assistant standard functions: [**Sensor entity**](https://www.home-assistant.io/integrations/sensor/)

### Additional configuration via service:

**power_meter_sensor_set_configuration**  
Sets all configuration parameters for a power meter sensor.

- `correction`  
  Correction value to adjust the reported power. Can be positive or negative and is added to the reported sensor value.  
  Range: -100 to 100, Step: 0.1, Unit: kW, Default: 0

- `auto_event_diff`  
  Power change that triggers a new event. Instead of a fixed interval, an update is triggered when this change occurs.  
  Range: 0.1–100, Step: 0.1, Unit: kW, Default: 1

- `manual_event_interval`  
  Interval for reported power values, regardless of changes.  
  Default: 5 minutes  
  Options: 1 second, 5 seconds, 10 seconds, 30 seconds, 1 minute, 5 minutes, 10 minutes, 20 minutes, 30 minutes, 60 minutes

## SSR Power Controller

Home Assistant standard functions: [**Number entity**](https://www.home-assistant.io/integrations/number/)

The solid state relay controller is exposed via a standard Number entity, allowing power to be set from 0 to 100%.

## Analog Input

Home Assistant standard functions: [**Sensor entity**](https://www.home-assistant.io/integrations/sensor/)

### Additional configuration via service:

**analog_eingang_set_configuration**  
Sets all configuration parameters for an analog input channel.

- `correction`  
  Correction value to adjust the reported analog input. Can be positive or negative and is added to the reported value.  
  Range: -100 to 100, Step: 1, Default: 0

- `auto_event_diff`  
  Analog input change that triggers a new event. Instead of a fixed interval, an update is triggered when this change occurs.  
  Range: 10–100, Step: 1, Default: 30

- `manual_event_interval`  
  Interval for reported values regardless of changes.  
  Options: 1 second, 5 seconds, 10 seconds, 30 seconds, 1 minute, 5 minutes, 10 minutes, 20 minutes, 30 minutes, 60 minutes  
  Default: 5 minutes

