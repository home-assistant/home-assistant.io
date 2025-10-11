---
title: aREST
description: Instructions on how to integrate aREST within Home Assistant.
ha_category:
  - Binary sensor
  - DIY
  - Sensor
  - Switch
ha_iot_class: Local Polling
ha_release: 0.9
ha_domain: arest
ha_platforms:
  - binary_sensor
  - sensor
  - switch
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

There is currently support for the following device types within Home Assistant:

- [Binary sensor](#binary-sensor)
- [Sensor](#sensor)
- [Switch](#switch)

## Binary sensor

The `arest` binary sensor platform allows you to get all data from your devices (like Arduinos with an ethernet/Wi-Fi connection, the ESP8266, and the Raspberry Pi) running the [aREST](https://arest.io/) RESTful framework.

To use your aREST binary sensor in your installation, add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: arest
    resource: http://IP_ADDRESS
    pin: 8
```

{% configuration %}
resource:
  description: IP address and schema of the device that is exposing an aREST API, e.g., `http://192.168.1.10`.
  required: true
  type: string
pin:
  description: Number of the pin to monitor.
  required: true
  type: integer
name:
  description: Let you overwrite the name of the device. By default *name* from the device is used.
  required: false
  type: string
{% endconfiguration %}

Accessing the URL `http://IP_ADDRESS/digital/PIN_NUMBER` should give you the state of the pin inside a JSON response as `return_value`.

```bash
$ curl -X GET http://192.168.0.5/digital/9
{"return_value": 0, "id": "office1", "name": "Office", "connected": true}
```

An example for Pin 9 inspired by the command above could look like this:

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: arest
    resource: http://192.168.0.5/digital/9
    pin: 9
    name: Office
```

{% note %}
This sensor is not suitable for fast state changes because there is a high possibility that the change took place between two update cycle.
{% endnote %}

## Sensor

The `arest` sensor platform allows you to get all data from your devices (like Arduinos with a Ethernet/Wi-Fi connection, the ESP8266, and the Raspberry Pi) running the [aREST](https://arest.io/) RESTful framework.

To use your aREST enabled device in your installation, add the following to your {% term "`configuration.yaml`" %} file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: arest
    resource: https://IP_ADDRESS
    monitored_variables:
      temperature:
        name: temperature
    pins:
      A0:
        name: Pin 0 analog
```

{% configuration %}
resource:
  description: "IP address and schema of the device that is exposing an aREST API, e.g., `https://192.168.1.10`."
  required: true
  type: string
name:
  description: Let you overwrite the name of the device.
  required: false
  default: aREST sensor
  type: string
pins:
  description: List of pins to monitor. Analog pins need a leading **A** for the pin number.
  required: false
  type: list
  keys:
    pin:
      description: Pin number to use.
      required: true
      type: list
      keys:
        name:
          description: The name of the variable you wish to monitor.
          required: true
          type: string
        unit_of_measurement:
          description: Defines the unit of measurement of the sensor, if any.
          required: false
          type: string
        value_template:
          description: Defines a [template](/docs/configuration/templating/#processing-incoming-data) to extract a value from the payload.
          required: false
          type: template
monitored_variables:
  description: List of exposed variables.
  required: false
  type: list
  keys:
    variable:
      description: Name of the variable to monitor.
      required: true
      type: list
      keys:
        name:
          description: The name to use for the frontend.
          required: false
          type: string
        unit_of_measurement:
          description: Defines the units of measurement of the sensor, if any.
          required: false
          type: string
        value_template:
          description: Defines a [template](/docs/configuration/templating/#processing-incoming-data) to extract a value from the payload.
          required: false
          type: template
{% endconfiguration %}

The variables in the `monitored_variables` array must be available in the response of the device. As a starting point you could use the one of the example sketches (eg.  [Ethernet](https://raw.githubusercontent.com/marcoschwartz/aREST/master/examples/Ethernet/Ethernet.ino) for an Arduino with Ethernet shield). In those sketches are two variables (`temperature` and `humidity`) available which will act as endpoints.

Accessing one of the endpoints (eg. `http://192.168.1.10/temperature`) will give you the value inside a JSON response.

```json
{"temperature": 23, "id": "sensor01", "name": "livingroom", "connected": true}
```

The root will give you a JSON response that contains all variables and their current values along with some device details.

```json
{
   "variables" : {
      "temperature" : 23,
      "humidity" : 82
   },
   "id" : "sensor01",
   "name" : "livingroom",
   "connected" : true
}
```

`return_value` contains the sensor's data in a JSON response for a given pin (eg. `http://192.168.1.10/analog/2/` or  `http://192.168.1.10/digital/7/`).

```json
{"return_value": 34, "id": "sensor02", "name": "livingroom", "connected": true}
```

## Switch

The `arest` switch platform allows you to toggle pins of your devices (like Arduino boards with an Ethernet/Wi-Fi connection, ESP8266 based devices, and the Raspberry Pi) running the [aREST](https://arest.io/) RESTful framework.

To use your aREST enabled device with pins in your installation, add the following to your {% term "`configuration.yaml`" %} file:

```yaml
# Example configuration.yaml entry
switch:
  - platform: arest
    resource: http://IP_ADDRESS
    pins:
      11:
        name: Fan
      13:
        name: Switch
        invert: true
```

If you want to use custom functions, then add the following to your {% term "`configuration.yaml`" %} file:

```yaml
# Example configuration.yaml entry
switch:
  - platform: arest
    resource: http://IP_ADDRESS
    name: Office
    functions:
      function1:
        name: Light Desk
```

{% configuration %}
resource:
  description: IP address and schema of the device that is exposing an aREST API, e.g., `http://192.168.1.10` (no-trailing slash)
  required: true
  type: string
name:
  description: Let you overwrite the name of the device. By default *name* from the device is used.
  required: false
  type: string
pins:
  description: An array with all used pins.
  required: false
  type: map
  keys:
    name:
      description: The name of the pin to use in the frontend.
      required: true
      type: string
    invert:
      description: If the logic for on/off should be inverted.
      required: false
      type: boolean
      default: false
functions:
  description: An array with all used functions.
  required: false
  type: map
  keys:
    name:
      description: The name to use in the frontend.
      required: true
      type: string
{% endconfiguration %}

You can still switch your pins with a web browser or a command line tool. Use the URL `http://192.168.1.10/digital/8/1` to set pin 8 to high/on, the JSON response will give you the feedback.

```json
{"message": "Pin D8 set to 1", "id": "sensor02", "name": "livingroom", "connected": true}
```
