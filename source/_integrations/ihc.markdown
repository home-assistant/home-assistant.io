---
title: IHC Controller
description: Instructions on how to integrate the IHC integrations with Home Assistant
ha_category:
  - Binary sensor
  - Hub
  - Light
  - Sensor
  - Switch
ha_release: 0.62
ha_iot_class: Local Push
ha_domain: ihc
ha_platforms:
  - binary_sensor
  - light
  - sensor
  - switch
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

IHC Controller {% term integration %} for Home Assistant allows you to connect the LK IHC controller to Home Assistant. The controller is sold under other names in different countries - "ELKO Living system" in Sweden and Norway.

There is currently support for the following device types within Home Assistant:

- [Binary sensor](#binary-sensor)
- [Sensor](#sensor)
- [Light](#light)
- [Switch](#switch)

An `ihc` section must be present in the {% term "`configuration.yaml`" %} file and contain the following options:
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry for two IHC controllers
ihc:
  - url: 'http://192.168.1.3'
    username: YOUR_USERNAME
    password: YOUR_PASSWORD
  - url: 'http://192.168.1.4'
    username: YOUR_USERNAME2
    password: YOUR_PASSWORD2
```

{% configuration %}
url:
  description: The URL of the IHC Controller.
  required: true
  type: string
username:
  description: The username for the IHC Controller.
  required: true
  type: string
password:
  description: The password for the IHC Controller.
  required: true
  type: string
auto_setup:
  description: Automatic setup of IHC products.
  required: false
  type: boolean
  default: true
info:
  description: Shows the IHC "name", "note" and "position" attributes of each integration. This will make it easier to identify the IHC products within Home Assistant.
  required: false
  type: boolean
  default: true
{% endconfiguration %}

## Auto setup of IHC products

If the auto setup is enabled, the `ihc` integration will automatically find IHC products and insert these as devices in Home Assistant. To disable this set auto_setup to false. See the individual device types for a list of IHC products to be recognized automatically.

Components will get a default name that is a combination of the IHC group and IHC resource id. If you want to change the display names use the [Customizing entities](/docs/configuration/customizing-devices/).

## Manual setup

Each device is associated with an IHC resource id. To manually setup integrations you specify resource ids from the IHC project. The IHC project is the file you edit/upload to the IHC Controller using LK IHC Visual - or similar program if your controller is not the LK brand.

The project file is an XML file and you can view it with any text/XML editor. You can rename it to have the XML extension and use a browser like Chrome or Internet Explorer. The resources are the \<airlink_xxx> or \<dataline_xxx> elements. Shown as inputs or outputs of products in the IHC application. You can also use inputs and outputs from function blocks. These are the \<resource_input> and \<resource_output> elements from the project file.

The IHC resource id should be specified as an integer value. In the project file the id will be specified as a hex number.

If you want an easier way to get the IHC resource ids, you can download the [Alternative Service View application](https://www.dingus.dk/updated-ihc-alternative-service-view/). The application will show the product tree. You can expand it, select inputs and outputs and when selected you can see the resource id.

See the manual of each device type for configuration options.

## Binary sensor

Before you can use the IHC Binary Sensor platform, you must setup the IHC integration.

When auto setup is enabled the following products will be found in the IHC project and setup as binary sensors:

- Dataline magnet contacts
- Dataline Pir sensors
- Dataline Pir sensors with twilight detection
- Dataline Pir alarm sensor
- Dataline smoke detector
- Dataline gas detector
- Dataline light sensor

## Manual configuration

To manually configure IHC Binary Sensors insert the "binary_sensor" section in your IHC configuration:

```yaml
# Example configuration.yaml entry
ihc:
  - url: 'http://192.168.1.3'
    username: YOUR_USERNAME
    password: YOUR_PASSWORD
    info: true
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

Before you can use the IHC Sensor platform, you must setup the IHC integration.

When auto setup is enabled the following products will be found in the IHC project and setup as sensors:

- Dataline temperature sensor - Will insert 2 temperature sensors
- Dataline Humidity - Will insert 1 humidity and 2 temperature sensors (calculated dewpoint)
- Dataline Lux - will insert 1 light and 1 temperature sensor

To manually configure IHC sensors insert the "sensor" section in your IHC configuration:

```yaml
ihc:
  - url: 'http://192.168.1.3'
    username: YOUR_USERNAME2
    password: YOUR_PASSWORD2
    info: true
    sensor:
      - id: 12345
        name: Temperatur_living_room
        unit_of_measurement: "°C"
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

Before you can use the IHC Light platform, you must setup the IHC integration.

When auto setup is enabled the following products will be found in the IHC project and setup as light devices:

- Wireless lamp outlet dimmer
- Wireless dimmer
- Wireless combi dimmer 4 buttons
- Wireless combi dimmer 4 buttons touch
- Wireless combi dimmer 2 buttons touch
- Wireless lamp outlet relay
- Wireless combi relay 4 buttons
- Wireless combi relay 2 buttons
- Wireless mobile dimmer
- Dataline lamp outlet

To manually configure IHC lights insert the "light" section in your IHC configuration:

```yaml
ihc:
  - url: 'http://192.168.1.3'
    username: YOUR_USERNAME2
    password: YOUR_PASSWORD2
    info: true
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
      description: The name of the integration
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

Before you can use the IHC Switch platform, you must setup the IHC integration.

When auto setup is enabled the following products will be found in the ihc project and setup as switch devices:

- Wireless plug outlet
- Wireless relay
- Mobile wireless relay
- Dataline plug outlet

To manually configure IHC switches insert the "switch" section in yourIHC configuration:

```yaml
ihc:
  - url: 'http://192.168.1.3'
    username: YOUR_USERNAME
    password: YOUR_PASSWORD
    info: true
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
      description: The name of the integration
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

## Actions

Below are the service functions for the IHC integrations.

### Action `ihc.pulse`

| Data attribute | Optional | Description                                                                                         |
| ---------------------- | -------- | --------------------------------------------------------------------------------------------------- |
| `controller_id`        | yes      | If you have multiple controller, this is the index of you controller starting with 0 (0 is default) |
| `ihc_id`               | no       | The boolean IHC resource ID.                                                                        |

This action will send a pulse to the specified IHC resource.
On and Off with a 400ms delay.

### Action `ihc.set_runtime_value_bool`

| Data attribute | Optional | Description                                                                                         |
| ---------------------- | -------- | --------------------------------------------------------------------------------------------------- |
| `controller_id`        | yes      | If you have multiple controller, this is the index of you controller starting with 0 (0 is default) |
| `ihc_id`               | no       | The boolean IHC resource ID.                                                                        |
| `value`                | no       | The boolean value to set. (true or false)                                                           |

This action will set the specified boolean resource on the IHC controller.

### Action `ihc.set_runtime_value_float`

| Data attribute | Optional | Description                                                                                         |
| ---------------------- | -------- | --------------------------------------------------------------------------------------------------- |
| `controller_id`        | yes      | If you have multiple controller, this is the index of you controller starting with 0 (0 is default) |
| `ihc_id`               | no       | The float IHC resource ID.                                                                          |
| `value`                | no       | The float value to set.                                                                             |

This action will set the specified float resource on the IHC controller.

### Action `ihc.set_runtime_value_int`

| Data attribute | Optional | Description                                                                                         |
| ---------------------- | -------- | --------------------------------------------------------------------------------------------------- |
| `controller_id`        | yes      | If you have multiple controller, this is the index of you controller starting with 0 (0 is default) |
| `ihc_id`               | no       | The integer IHC resource ID.                                                                        |
| `value`                | no       | The integer value to set.                                                                           |

This action will set the specified integer resource on the IHC controller.
