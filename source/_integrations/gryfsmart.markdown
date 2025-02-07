
---
title: GryfSmart
description: Instructions on how to integrate GryfSmart within Home Assistant.
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
ha_codeowners:
  - '@karlowiczpl'
ha_integration_type: hub
---

# GryfSmart integration for Home Assistant

This document describes how to configure and use the *GryfSmart* integration with Home Assistant. The integration supports both YAML configuration and Config Flow (UI-based setup).

---

## Important integration information

### How to use the ID

The ID is a combination of the driver ID and the cell number (for outputs, inputs, etc.):

```
XY
- X is the driver ID
- Y is the cell number
```

### Communication

To connect *GryfSmart*, you can use either a physical RS-232 connection or a USB/RS-232 converter. You need to know the address of the device. Typically, it is **/dev/ttyS0** for a physical RS-232 port or **/dev/ttyUSB0** for a converter. You can list all devices using the following commands:

**If you are using a converter:**
```bash
ls /dev/ttyUSB*  # Lists USB converter devices
```

**If you are using a physical port:**
```bash
ls /dev/ttyS*    # Lists physical RS-232 ports
```

### Module count

The module count refers to the number of modules in the network.

### Entities

*GryfSmart* driver supports five types of functions:

- *Relay Output (O)*
- *Input (I)*
- *PWM*
- *Temperature Input (T)*
- *Cover Output*

#### Light

- **Type of function:** Relay Output
- **Services:** `turn_on`, `turn_off`
- **Icon:** lightbulb
- **Entity type:** light
- **Configuration scheme:** Classic
- **Device class:** None

#### Switch

- **Type of function:** Relay Output
- **Services:** `turn_on`, `turn_off`, `toggle`
- **Icon:** switch, outlet
- **Entity type:** switch
- **Configuration scheme:** Device class
- **Device class:** switch, outlet
- **Default device class:** switch

#### Thermostat

- **Type of function:** Relay Output and Temperature Input
- **Services:** `turn_on`, `turn_off`, `toggle`, `set_temperature`
- **Entity type:** climate
- **Configuration scheme:** Thermostat  
  ```yaml
  thermostat:
    - name: YOUR_THERMOSTAT_NAME  # Name of the entity
      t_id: YOUR_THERMOMETER_ID   # Thermometer ID
      o_id: YOUR_OUTPUT_ID        # Output ID
  ```
  In Config Flow, enter the **t_id** into the **Extra** parameter and the **o_id** into the **ID** parameter.
- **Device class:** None

#### Binary input

- **Type of function:** Input
- **Services:** None
- **Icon:** Specific to the chosen device class
- **Entity type:** binary_sensor
- **Configuration scheme:** Device class
- **Device class:** door, garage_door, heat, light, motion, window, smoke, sound, power
- **Default device class:** opening

#### PWM

- **Type of function:** PWM
- **Services:** `turn_on`, `turn_off`, `toggle`, `set_value`
- **Icon:** lightbulb
- **Entity type:** light
- **Configuration scheme:** Classic
- **Device class:** None

#### Thermometer

- **Type of function:** Temperature Input
- **Services:** None
- **Icon:** thermometer
- **Entity type:** sensor
- **Configuration scheme:** Classic
- **Device class:** None

#### Input

- **Type of function:** Input
- **Services:** None
- **Icon:** switch
- **Entity type:** sensor
- **Configuration scheme:** Classic
- **Device class:** None
- **Extra information:**  
  - If the input is a short press and release, the sensor state is 2.  
  - If it is a long press, the state is 3.

---

## Configuring via YAML

### Example configuration tree

```yaml
gryfsmart:
  port: "YOUR_PORT_PATH"          # e.g., /dev/ttyS0 or /dev/ttyUSB0
  module_count: 10                # Number of modules in the network
  states_update: true             # Enable asynchronous state updates
  lights:                         # Lights (relay output) elements
    - name: "Living Room Lamp"
      id: 11                      # Combined ID: controller 1, pin 1
    - name: "Kitchen Lamp"
      id: 28                      # Combined ID: controller 2, pin 8
  buttons:                        # Buttons (inputs)
    - name: "Living Room Panel"
      id: 17                      # Combined ID: controller 1, pin 7
  climate:                        # Regulator (climate) elements
    - name: "Regulator"
      o_id: 34                    # Combined ID: controller 3, pin 4
      t_id: 21                    # Combined ID: controller 2, pin 1
  binary_input:
    - name: "Binary Sensor"
      id: 34
      device_class: door
```

### Configuration variables

{% configuration %}
port:
  description: RS-232 port location.
  required: true
  type: string
  default: "/dev/ttyS0"

module_count:
  description: Number of modules in the network.
  required: true
  type: integer

states_update:
  description: Enable asynchronous state updates.
  required: false
  type: boolean
  default: true
{% endconfiguration %}

### Configuration schemes

#### Classic scheme

```yaml
gryfsmart:
  lights:
    - name: "Example Lamp"
      id: 11  # Combined ID: controller 1, pin 1
```

#### Device class scheme

```yaml
gryfsmart:
  p_cover:
    - name: "Example Blind"
      id: 12
      device_class: door  # Optional device class
```

---

## Configuring via Config Flow

The **Extra** parameter corresponds to the **device_class** if it exists. For thermostats, the **Extra** parameter maps to **t_id**. If not applicable, this parameter is not required. The integration also supports editing individual devices and configurations. After making changes, reload the integration for updates to take effect.

---

## Helper entities

The configuration automatically generates two helper entities—**gryf_in** and **gryf_out**:

- **gryf_in:** Receives incoming messages.
- **gryf_out:** Handles outgoing messages.

If you are not an experienced *GryfSmart* installer, you may ignore these details.

---

