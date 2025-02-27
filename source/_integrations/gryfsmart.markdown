---
title: GRYFSMART
description: Instructions on how to integrate GryfSmart components with Home Assistant.
ha_release: 2025.1
ha_category:
    - Binary sensor
    - Climate
    - Sensor
    - Switch
    - Light
ha_iot_class: Local Pushing
ha_config_flow: true
ha_domain: gryfsmart
ha_platforms:
    - Binary sensor
    - Climate
    - Sensor
    - Switch
    - Light
    - binary_sensor
ha_codeowners:
    - "@karlowiczpl"
ha_integration_type: hub
---

# The [GryfSmart](https://gryfsmart.pl) integration for home assistant allows you to connect to GryfSmart devices

This document describes how to configure and use the GryfSmart integration. The integration support Config Flow (UI-based setup), and requires RS232 interface.

There is currently support for the following device types within Home Assistant:

 - [Light](#141-Light)
 - [Switch](#142-Switch)
 - [Thermostat](#143-Thermostat)
 - [Binary Input](#144-Binary-Input)
 - [PWM](#145-PWM)
 - [Termometer](#146-Thermometer)
 - [Input](#147-Input)

{% include integrations/config_flow.md %}

## 1. Important Integration Information

### 1.1 How to Use the ID

The ID is a combination of the driver ID and the cell number (for outputs,
inputs, etc.).

17

- 1 is the driver ID
- 7 is the cell number

### 1.2 Communication

To connect gryfsmart, you can use either a Physical RS-232 connection or a
USB/RS-232 converter. You need to know the address of the device. Typically, it
is "/dev/ttyS0" for a physical RS-232 port, or "/dev/ttyUSB0" for a converter.

### 1.3 Module Count

The module count is the number of modules in the network.

### 1.4 Entities

**gryfsmart driver supports 5 types of functions:**

- **Relay Output (O)**
- **Input (I)**
- **PWM**
- **Temperature Input (T)**
- **Cover Output(S)**

#### 1.4.1 Light

- **Type of function:** Relay Output
- **Services:** turn_on, turn_off
- **Icon:** lightbulb
- **Entity type:** light
- **Configuration scheme:** classic
- **Device class:** None

#### 1.4.2 Switch

- **Type of function:** Relay Output
- **Services:** turn_on, turn_off, toggle
- **Icon:** switch, outlet
- **Entity type:** switch
- **Device class:** switch, outlet
- **Default device class:** switch

#### 1.4.3 Thermostat

- **Type of function:** Relay Output and Temperature Input
- **Services:** turn_on, turn_off, toggle, set_temperature
- **Entity type:** climate
In Config Flow, you enter the t_id into the "extra" parameter
and the o_id into the "id" parameter.

- **Device class:** None

#### 1.4.4 Binary Input

- **Type of function:** Input
- **Services:** None
- **Icon:** Specific for the chosen device class
- **Entity type:** binary_sensor
- **Device class:** door, garage_door, heat, light, motion,
window, smoke, sound, power
- **Default device class:** opening

#### 1.4.5 PWM

- **Type of function:** PWM
- **Services:** turn_on, turn_off, toggle, set_value
- **Icon:** lightbulb
- **Entity type:** light
- **Device class:** None

#### 1.4.6 Thermometer

- **Type of function:** Temperature Input
- **Services:** None
- **Icon:** thermometer
- **Entity type:** sensor
- **Device class:** None

#### 1.4.7 Input

- **Type of function:** Input
- **Services:** None
- **Icon:** switch
- **Entity type:** sensor
- **Device class:** None
- **Extra information:**  
  If the input is a short press and release, the sensor state is 2;
if it is a long press, the state is 3.



## 2. Configuration via Config Flow

The "extra" parameter corresponds to the device_class if it exists. In the case
of a thermostat, the "extra" parameter maps to **t_id** instead. Otherwise, this
parameter is not required. Additionally, the integration supports editing of
individual devices and configuration. Please note that after making changes,
you must reload the integration for the changes to take effect.

## 4. Helper Entities

Additionally, the configuration automatically generates two entities—**gryf_in**
and **gryf_out**. The **gryf_in** entity receives incoming messages, and the
**gryf_out** entity handles outgoing messages. However, if you are not an
experienced GRYF SMART installer, you may ignore these details.
