---
title: Micropel
description: How to integrate Micropel PLCs.
ha_category:
  - Hub
ha_release: '2021.10'
ha_iot_class: Local Polling 
ha_config_flow: false
ha_codeowners:
  - '@vkorecky'
ha_domain: micropel
ha_platforms:
  - binary_sensor
  - climate
  - sensor
---

[Micropel](http://www.micropel.cz/) is a producer of PLCs (Programmable Logic Controllers) witch use proprietary protocol for communication with outside world.  The integration adheres strictly to the vendor's specification. 
- [EPNP protocol specification](http://www.micropel.cz/images/stories/Dokumenty/EPNP.pdf)
- [Simple EPNP protocol specification](http://www.micropel.cz/images/stories/Dokumenty/simple_epnp_pub_1_4.pdf)

This integration supports all Micropel devices and TCP/IP HUBs like CA4, CA5 and PLCs with Ethernet connector.

# Calculation of entity addresses and bit masks
Each device stores variables on different addresses in PLC memory RAM. You can find below how to transform I/O pin, fixed variable and Simple variable to proper address and mask.

Note: Mask is use only for binary variables (true / false)

## MPC300 devices

### WORD variables
Formula:
- address = starting_address + (index_of_variable * 2)

**I variables (I0-I31):**
- starting_address = 0x0
- Example: I17 address = 0x0 + (17*2) = 0x22

**O variables (O0-O31):**
- starting_address = 0x40
- Example: O17 address = 0x40 + (17*2) = 0x62

**D variables (D0-D63):**
- starting_address = 0x80
- Example: D34 address = 0x80 + (34*2) = 0xC4

**W variables (W0-W127)**
- starting_address = 0x100
- Example: W17 address = 0x100 + (17*2) = 0x122

### BIT (boolean) variables
Formulas:
- address = starting_address + int(index_of_variable/8)
- bit_index = index_of_variable % 8

**X bits (X0-X31)**
- starting_address = 0x200
- Example: X17 
  - address = 0x200 + int(17/8) = 0x200 + int(2.125) = 0x200 + 2 = 0x202
  - bit_index = 17 % 8 = 1

**Y bits (Y0-Y31)**
- starting_address = 0x204
- Example: Y17
  - address = 0x204 + int(17/8) = 0x204 + int(2.125) = 0x204 + 2 = 0x202 
  - bit_index = 17 % 8 = 1

**M bits (M0-M127)**
- starting_address = 0x0208
- Example: M77
  - address = 0x0208 + int(77/8) = 0x0208 + int(9.625) = 0x0208 + 9 = 0x211
  - bit_index = 77 % 8 = 5

**B bits (B0-B127)**
- starting_address = 0x218
- Example: B17
  - address = 0x218 + int(17/8) = 0x218 + int(2.125) = 0x218 + 2 = 0x202
  - bit_index = 17 % 8 = 1

### Fixed variables and bits in RAM
Formulas:
- address = 0x8010 + fixed_address_of_variable
- bit_index = 0  (constant)

Example: Variable from PLC RAM at address 0x549 
   - address = 0x8010 + 0x549 = 0x8559

## MPC400 devices
### WORD variables
Formula:
- address = starting_address + (index_of_variable * 2)

**D variables (D0-D63):**
- starting_address = 0x80
- Example: D34 address = 0x80 + (34*2) = 0xC4

### BIT (boolean) variables
Formulas:
- address = starting_address + int(index_of_variable/8)
- bit_index = index_of_variable % 8

**M bits (M0-M127)**
- starting_address = 0x0208
- Example: M77
  - address = 0x0208 + int(77/8) = 0x0208 + int(9.625) = 0x0208 + 9 = 0x211
  - bit_index = 77 % 8 = 5

### Fixed variables and bits in RAM
Formulas:
- address = 0x8010 + fixed_address_of_variable
- bit_index = 0  (constant)

Example: Variable from PLC RAM at address 0x549 
   - address = 0x8010 + 0x549 = 0x8559

# Configuring Micropel

First, you define how to communicate with your Micropel network (PESNET) and after that you define the information being exchanged. The Micropel integration allows you to use multiple connections.

## Configuring Micropel common parameters (HUB configuration)

Part of the configuration is common for all types of communication. Add the following to your `configuration.yaml` file:

```yaml
micropel:
  - name: ca4
    type: MPC300
    host: 192.168.2.2
    port: 10001
    password: 0
```
{% configuration %}
name:
  description: Name for this hub. Must be unique, so it is required when setting up multiple instances.
  required: false
  default: "micropel_hub"
  type: string
type:
  description: Type of communication. All communication types use TCP/IP. Possible values are `MPC300` Older generation of PLC and communicators. Use this type for MPC300 PLC and CA4 communicator. `MPC400` New generation of devices. Use this type for MPC400 PLC and CA5 communicator.
  required: true
  type: string
host:
  description: The IP address of your Micropel PLC or CA4/CA5 device, e.g., `192.168.1.1`.
  required: true
  type: string
port:
  description: The network port for the communication.
  required: true
  type: integer
password:
  description: Password for encryption of communication. This password is set in Micropel configuration tools. Value "0" means no encryption and it is the default value by the vendor.
  required: true
  type: string
{% endconfiguration %}

## Configuring multiple connections

Multiple connections are possible with identical/different `type:`.

```yaml
# Example configuration.yaml entry for multiple TCP connections (new and old devices)
micropel:
  - name: ca4
    type: MPC300
    host: 192.168.2.2
    port: 10001
    password: 0

  - name: ca5
    type: MPC400
    host: 192.168.2.45
    port: 10001
    password: 12345
```

Remark: `name:`is required for multiple connections, because it needs to be unique.


# Configure Micropel platforms

Micropel platform entities are configured next to the HUB configuration.

## Configuring platform binary sensor

The Micropel binary sensor allows you to gather data from coils which as per standard have state ON/OFF.

To use your Micropel binary sensors in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry for binary_sensor configuration
binary_sensor:
- platform: micropel
  scan_interval: 10
  binary_sensors:
    - unique_id: pool_pump
      name: Pool pump
      hub: ca5
      plc: 0
      address: 0x204
      bit_index: 0    
```

{% configuration %}
binary_sensor:
  description: Definition of binary sensors section.
  required: false
  type: [map]
  keys:
    platform:
      description: Constant value "micropel" defining of the used platform. 
      required: true
      type: string
    scan_interval:
      description: Defines the update interval of the entity in seconds, if scan_interval = 0 polling is stopped. Entities are unavailable until the first response is received, except for entities with scan_interval = 0, these entities are available from startup.
      required: false
      type: integer
      default: 15
    binary_sensors:
      description: A list of all binary_sensors available in this Micropel instance, omit if there are no binary_sensors.
      required: false
      type: [map]
      keys:         
        unique_id:
          description: Unique id of the element which is used in Home Assistant to show the history of value and other stuff.
          required: true
          type: string
        name:
          description: Name for the platform entity which must be unique within the platform.
          required: true
          type: string
        hub:
          description: Name of the HUB configuration
          required: true
          type: string
        plc:
          description: Address of the PLC in PESNET network. PLCs can be connected to the local "network" by a serial communication cable. Each PLC has a unique address/number in the network in the range 0-254.
          required: true
          type: integer
        address:
          description: Address of the Register. Please check the section [Calculation of entity addresses and bit masks](#calculation-of-entity-addresses-and-bit-masks) first. 
          required: true
          type: integer
        bit_index:
          description: Each register contains 8 bits it means 8 binary sensors. You have to specify in which position in the register is your binary sensor. Value can be 0, 1, 2, 3, 4, 5, 6, 7. Please check the section [Calculation of entity addresses and bit masks](#calculation-of-entity-addresses-and-bit-masks) first. 
          required: true 
          type: integer
{% endconfiguration %}

## Configuring platform switch

To use your Micropel switches in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
switch:
- platform: micropel
  scan_interval: 10
  switches:
    - unique_id: pool_filtration
      name: Pool filtration
      hub: ca5
      plc: 0
      address: 0x211
      bit_index: 5
```

{% configuration %}
switch:
  description: Definition of switches section.
  required: false
  type: [map]
  keys:
    platform:
      description: Constant value "micropel" defining of the used platform. 
      required: true
      type: string
    scan_interval:
      description: Defines the update interval of the entity in seconds, if scan_interval = 0 polling is stopped. Entities are unavailable until the first response is received, except for entities with scan_interval = 0, these entities are available from startup.
      required: false
      type: integer
      default: 15
    switches:
      description: description: The array contains a list of all your Micropel switches.
      required: false
      type: [map]
      keys:         
        unique_id:
          description: Unique id of the element which is used in Home Assistant to show the history of value and other stuff.
          required: true
          type: string
        name:
          description: Name for the platform entity which must be unique within the platform.
          required: true
          type: string
        hub:
          description: Name of the HUB configuration
          required: true
          type: string
        plc:
          description: Address of the PLC in PESNET network. PLCs can be connected to the local "network" by a serial communication cable. Each PLC has a unique address/number in the network in the range 0-254.
          required: true
          type: integer
        address:
          description: Address of the Register. Please check the section [Calculation of entity addresses and bit masks](#calculation-of-entity-addresses-and-bit-masks) first. 
          required: true
          type: integer
        bit_index:
          description: Each register contains 8 bits it means 8 binary sensors. You have to specify in which position in the register is your binary sensor. Value can be 0, 1, 2, 3, 4, 5, 6, 7. Please check the section [Calculation of entity addresses and bit masks](#calculation-of-entity-addresses-and-bit-masks) first. 
          required: true 
          type: integer
{% endconfiguration %}

## Configuring platform sensor

To use your Micropel sensors in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
- platform: micropel
  scan_interval: 10
  sensors:
    - unique_id: temp_outside
      name: Outside temperature
      hub: ca5
      plc: 0
      address: 0x8559
      register_type: word
      unit_of_measurement: "°C"
      scale: 0.1
      offset: -273.15
      precision: 1
      data_type: float
```

{% configuration %}
sensor:
  description: Definition of sensors section.
  required: false
  type: [map]
  keys:
    platform:
      description: Constant value "micropel" defining of the used platform. 
      required: true
      type: string
    scan_interval:
      description: Defines the update interval of the entity in seconds, if scan_interval = 0 polling is stopped. Entities are unavailable until the first response is received, except for entities with scan_interval = 0, these entities are available from startup.
      required: false
      type: integer
      default: 15
    sensors:
      description: The array contains a list of all your Micropel sensors.
      required: false
      type: [map]
      keys:         
        unique_id:
          description: Unique id of the element which is used in Home Assistant to show the history of value and other stuff.
          required: true
          type: string
        name:
          description: Name for the platform entity which must be unique within the platform.
          required: true
          type: string
        hub:
          description: Name of the HUB configuration
          required: true
          type: string
        plc:
          description: Address of the PLC in PESNET network. PLCs can be connected to the local "network" by a serial communication cable. Each PLC has a unique address/number in the network in the range 0-254.
          required: true
          type: integer
        address:
          description: Address of the Register. Please check the section [Calculation of entity addresses and bit masks](#calculation-of-entity-addresses-and-bit-masks) first. 
          required: true
          type: integer
        register_type:
          description: Micropel register type (word, long), default word.
          required: false
          type: string
        unit_of_measurement:
          description: Unit to attach to value.
          required: false
          type: string
        data_type:
          description: Response representation (int16, int32, int64, uint16, uint32, uint64, float16, float32, float64, string). `int/uint`are silently converted to `int16/uint16`.
          required: false
          type: string
          default: int16
        offset:
          description: Final offset (output = scale * value + offset).
          required: false
          type: float
          default: 0
        precision:
          description: Number of valid decimals.
          required: false
          type: integer
          default: 1
        scale:
          description: Scale factor (output = scale * value + offset).
          required: false
          type: float
          default: 1
{% endconfiguration %}

## Configuring platform climate

The Micropel climate platform allows you to monitor your thermostat as well as set a target temperature.

To use your Micropel thermostat in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
climate:
- platform: micropel
  scan_interval: 10
  climates:
    - unique_id: temp_pool
      name: Temperature of swimming pool
      hub: ca4
      plc: 0
      current_temp_address: 0xD0
      target_temp_address: 0xFE
      register_type: word
      temperature_unit: "°C"
      scale: 0.1
      offset: -273.15
      max_temp: 100
      min_temp: 15
      temp_step: 1
```

{% configuration %}
climate:
  description: Definition of climates section.
  required: false
  type: [map]
  keys:
    platform:
      description: Constant value "micropel" defining of the used platform. 
      required: true
      type: string
    scan_interval:
      description: Defines the update interval of the entity in seconds, if scan_interval = 0 polling is stopped. Entities are unavailable until the first response is received, except for entities with scan_interval = 0, these entities are available from startup.
      required: false
      type: integer
      default: 15
    climates:
      description: A list of all climates available in this Micropel instance.
      required: false
      type: [map]
      keys:         
        unique_id:
          description: Unique id of the element which is used in Home Assistant to show the history of value and other stuff.
          required: true
          type: string
        name:
          description: Name for the platform entity which must be unique within the platform.
          required: true
          type: string
        hub:
          description: Name of the HUB configuration
          required: true
          type: string
        plc:
          description: Address of the PLC in PESNET network. PLCs can be connected to the local "network" by a serial communication cable. Each PLC has a unique address/number in the network in the range 0-254.
          required: true
          type: integer
        current_temp_address:
          description: Address of the Register with current temperature. Please check the section [Calculation of entity addresses and bit masks](#calculation-of-entity-addresses-and-bit-masks) first. 
          required: true
          type: integer
        target_temp_address:
          description: Address of the Register with target temperature (temperature what you want). Please check the section [Calculation of entity addresses and bit masks](#calculation-of-entity-addresses-and-bit-masks) first. 
          required: true
          type: integer
        register_type:
          description: Micropel register type (word, long), default word.
          required: false
          type: string
        temperature_unit:
          description: Temperature unit reported by the current_temp_register. C, F or K
          required: false
          type: string
          default: C
        scale:
          description: Scale factor (output = scale * value + offset).
          required: false
          type: float
          default: 1
        offset:
          description: Final offset (output = scale * value + offset).
          required: false
          type: float
          default: 0
        max_temp:
          description: Maximum setpoint temperature.
          required: false
          type: integer
          default: 35
        min_temp:
          description: Minimum setpoint temperature.
          required: false
          type: integer
          default: 5
        temp_step:
          description: The supported step size a target temperature can be increased/decreased.
          required: false
          type: float
          default: 0.5
{% endconfiguration %}


## Opening an issue

When opening an issue, please add your current configuration (or a scaled down version), with at least:

 - the Micropel configuration lines
 - the entity (sensor, etc.) lines

In order for the developers better to identify the problem, please add the
following lines to configuration.yaml:

```yaml
logger:
  logs:
    homeassistant.components.micropel: debug
    pymicropel.client: debug
```

and restart Home Assistant, reproduce the problem, and include the log in the issue.
