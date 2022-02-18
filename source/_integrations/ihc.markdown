---
title: IHC Controller
description: Instructions on how to integrate the IHC integrations with Home Assistant
ha_category:
  - Hub
  - Binary Sensor
  - Sensor
  - Light
  - Switch
ha_release: 0.62
ha_iot_class: Local Push
ha_domain: ihc
---

IHC Controller integration for Home Assistant allows you to connect the LK IHC controller to Home Assistant. The controller is sold under other names in different countries - "ELKO Living system" in Sweden and Norway.

## Setup using configuration.yaml

Setup using the `configuration.yaml` file is no longer supported.
If you have existing manual configuration in the `configuration.yaml` file,
see below how to [Migrate manual setup](#migrating-manual-setup).

## Setup using the Home Assistant UI

Setup the IHC integration for your installation via Configuration >> Integrations in the UI,
 click the button with + sign and from the list of integrations select IHC.
You must enter the URL for your IHC Controller, the username and password.
Auto setup is enabled by default (see auto setup below).
You can uncheck it if you want to manually add all your IHC products.

## Auto setup of IHC products

If the auto setup is enabled, the `ihc` integration will automatically find IHC products and insert these as devices in Home Assistant.
See the individual device types for a list of IHC products to be recognized automatically.

Entities will get a default name that is a combination of the IHC group and IHC resource id.

## Manual setup

Each entity is associated with an IHC resource id. To manually setup entities you specify resource ids from the IHC project.
The IHC project is the file you edit/upload to the IHC Controller using LK IHC Visual - or similar program if your controller is not the LK brand.

The project file is an XML file (.vis extension) and you can view it with any text/XML editor.
You can rename it to have the XML extension and use a browser like Chrome or Internet Explorer.
The resources are the \<airlink_xxx> or \<dataline_xxx> elements.
Shown as inputs or outputs of products in the IHC application.
You can also use inputs and outputs from function blocks.
These are the \<resource_input> and \<resource_output> elements from the project file.

The IHC resource id should be specified as an integer value. In the project file the id will be specified as a hex number.

In the newer versions of the IHC Visual application, you can see the resource id by holding down Ctrl+Shift while you hover the resource.
If you want an easier way to get the IHC resource ids, you can download the [Alternative Service View application](https://www.dingus.dk/updated-ihc-alternative-service-view/). The application will show the product tree. You can expand it, select inputs and outputs and when selected you can see the resource id.

The manual configuration must be placed in a `ihc_manual_setup.yaml` file located in the Home Assistant configuration folder.

```yaml
# Example ihc_manual_setup.yaml entry
ihc:
  - controller: xx1
    binary_sensor:
      - id: 12345
        name: switch_front_door
      ...
    light:
      - id: 12345
        name: tablelight
  - controller: xx2
      ...
```

xx1 and xx2 is the controller id.
The controller id is the serial number of your IHC controller.
The IHC controller device in Home Assistant will have a default name set to the controller id.
(If you have changed the name, you can also find the controller serial number in the IHC administrator application.)

See the manual setup of each device type for configuration options.

## Binary Sensor

When auto setup is enabled the following products will be found in the IHC project and setup as binary sensors:

- Dataline magnet contacts
- Dataline Pir sensors
- Dataline Pir sensors with twilight detection
- Dataline Pir alarm sensor
- Dataline smoke detector
- Dataline gas detector
- Dataline light sensor

### Manual configuration of binary sensors

To manually configure IHC Binary Sensors insert the "binary_sensor" section in your `ihc_manual_setup.yaml` configuration:

```yaml
# Example ihc_manual_setup.yaml entry
ihc:
  - controller: xx1
    binary_sensor:
      - id: 12345
        name: switch_front_door
        inverting: false
        note: Magnet contact
        position: Switch in door
        type: door
```

{% configuration %}
binary_sensor:
  description: List of binary sensors to setup manually.
  required: false
  type: map
  keys:
    id:
      description: The IHC resource id.
      required: true
      type: integer
    inverting:
      description: If True the sensor will be inverted.
      required: false
      type: boolean
      default: false
    name:
      description: The name of the sensor.
      required: false
      type: string
    type:
      description: The binary sensor type. See [Home Assistant binary sensor](/integrations/binary_sensor/) for available types.
      required: false
      type: string
    note:
      description: Descriptive note
      required: false
      type: string
    position:
      description: Where is it placed
      required: false
      type: string
{% endconfiguration %}

The resource id should be an id of a boolean IHC resource. For more information about IHC resource ids see [Manual Setup](#manual-setup).

## Sensor

When auto setup is enabled the following products will be found in the IHC project and setup as sensors:

- Dataline temperature sensor - Will insert 2 temperature sensors
- Dataline Humidity - Will insert 1 humidity and 2 temperature sensors (calculated dewpoint)
- Dataline Lux - will insert 1 light and 1 temperature sensor

### Manual configuration of sensors

To manually configure IHC sensors insert the "sensor" section in your `ihc_manual_setup.yaml` file:

```yaml
ihc:
  - controller: xx1
    sensor:
      - id: 12345
        name: Temperatur_living_room
        unit_of_measurement: '°C'
        note: Floor and wall temp.
        position: On wall between windows
      - id: 23456
        ...
```

{% configuration %}
sensor:
  description: List of sensors to setup manually.
  required: false
  type: map
  keys:
    id:
      description: The IHC resource id.
      required: true
      type: integer
    name:
      description: The name of the sensor.
      required: false
      type: string
    unit_of_measurement:
      description: Defines the unit of measurement of the sensor, if any.
      required: false
      type: string
    note:
      description: Descriptive note.
      required: false
      type: string
    position:
      description: Where it is placed.
      required: false
      type: string
{% endconfiguration %}

The resource id should be a IHC float resource. For more information about IHC resource ids see [Manual Setup](#manual-setup).

## Light

When auto setup is enabled the following products will be found in the IHC project and setup as light devices:

- Wireless lamp outlet dimmer
- Wireless dimmer
- Wireless combi dimmer 4 buttons
- Wireless lamp outlet relay
- Wireless combi relay 4 buttons
- Wireless mobile dimmer
- Dataline lamp outlet
- RS485 dual channel LED dimmer

### Manual configuration of lights

To manually configure IHC lights insert the "light" section in your `ihc_manual_setup.yaml` file:

```yaml
ihc:
  - controller: xx1
    light:
      - id: 12345
        name: tablelight
      - id: 23432
```

{% configuration %}
light:
  description: List of lights to setup manually
  required: false
  type: map
  keys:
    dimmable:
      description: Set to True if the IHC resource is a light level.
      required: false
      type: boolean
      default: false
    id:
      description: The IHC resource id.
      required: true
      type: integer
    on_id:
      description: Optional IHC resource id that will be pulsed to turn ON this light.
      required: false
      type: integer
    off_id:
      description: Optional IHC resource id that will be pulsed to turn OFF this light.
      required: false
      type: integer
    name:
      description: The name of the component
      required: false
      type: string
    note:
      description: Descriptive note.
      required: false
      type: string
    position:
      description: Where it is placed.
      required: false
      type: string
{% endconfiguration %}

In the example above 12345 is ihc resource id and "tablelight" is the name. The IHC resource id can be a light level for dimmers or a boolean output of a relay. For more information about IHC resource ids see [Manual Setup](#manual-setup).

## Switch

When auto setup is enabled the following products will be found in the ihc project and setup as switch devices:

- Wireless plug outlet
- Wireless relay
- Mobile wireless relay
- Dataline plug outlet

### Manual configuration of switches

To manually configure IHC switches insert the "switch" section in your `ihc_manual_setup.yaml` file:

```yaml
ihc:
  - controller: xx1
    switch:
      - id: 12345
      - id: 12346
```

{% configuration %}
switch:
  description: List of switches to setup manually
  required: false
  type: map
  keys:
    id:
      description: The IHC resource id.
      required: true
      type: integer
    on_id:
      description: Optional IHC resource id that will be pulsed to turn ON this switch.
      required: false
      type: integer
    off_id:
      description: Optional IHC resource id that will be pulsed to turn OFF this switch.
      required: false
      type: integer
    name:
      description: The name of the component
      required: false
      type: string
    note:
      description: Descriptive note.
      required: false
      type: string
    position:
      description: Where it is placed.
      required: false
      type: string
{% endconfiguration %}

The resource id should be a boolean resource (On/Off). For more information about IHC resource ids see [Manual Setup](#manual-setup).

## Services

Below are the service functions for the IHC integrations.

### Service `ihc.pulse`

| Service data attribute | Optional | Description                                                                                                               |
| ---------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------- |
| `controller_id`        | yes      | The controller ID is the serial number of the IHC controller. If you have only one controller you can skip this parameter |
| `ihc_id`               | no       | The boolean IHC resource ID.                                                                                              |

This service will send a pulse to the specified IHC resource.
On and Off with a 400ms delay.

### Service `ihc.set_runtime_value_bool`

| Service data attribute | Optional | Description                                                                                                               |
| ---------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------- |
| `controller_id`        | yes      | The controller ID is the serial number of the IHC controller. If you have only one controller you can skip this parameter |
| `ihc_id`               | no       | The boolean IHC resource ID.                                                                                              |
| `value`                | no       | The boolean value to set. (true or false)                                                                                 |

This service will set the specified boolean resource on the IHC controller.

### Service `ihc.set_runtime_value_float`

| Service data attribute | Optional | Description                                                                                                               |
| ---------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------- |
| `controller_id`        | yes      | The controller ID is the serial number of the IHC controller. If you have only one controller you can skip this parameter |
| `ihc_id`               | no       | The float IHC resource ID.                                                                                                |
| `value`                | no       | The float value to set.                                                                                                   |

This service will set the specified float resource on the IHC controller.

### Service `ihc.set_runtime_value_int`

| Service data attribute | Optional | Description                                                                                                               |
| ---------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------- |
| `controller_id`        | yes      | The controller ID is the serial number of the IHC controller. If you have only one controller you can skip this parameter |
| `ihc_id`               | no       | The integer IHC resource ID.                                                                                              |
| `value`                | no       | The integer value to set.                                                                                                 |

This service will set the specified integer resource on the IHC controller.

## Migrating manual setup

If an old IHC configuration is present in the `configuration.yaml` file,
and it contains manual setup, the content will automatically be copied and converted to the
`ihc_manual_setup.yaml` file located in the Home Assistant configuration folder.
If the `ihc_manual_setup.yaml` already exists the migration is skipped.
The new `ihc_manual_setup.yaml` will automatically be setup with the IHC controller id.
The controller id is the IHC controller serial number.
To get the serial number, your existing setup must be able to connect to the IHC controller.

When the setup has been migrated you can check the `ihc_manual_setup.yaml` file.
If it looks ok, then delete your current ihc section in the `configuration.yaml` file,
restart Home Assistant, and add the IHC controller through the UI.