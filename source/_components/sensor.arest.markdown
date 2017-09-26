---
layout: page
title: "aREST Sensor"
description: "Instructions how to integrate aREST sensors within Home Assistant."
date: 2015-09-07 18:15
sidebar: true
comments: false
sharing: true
footer: true
logo: arest.png
ha_category: Sensor
ha_iot_class: "Local Polling"
ha_release: pre 0.7
---


The `arest` sensor platform allows you to get all data from your devices (like Arduinos with a Ethernet/Wifi connection, the ESP8266, and the Raspberry Pi) running the [aREST](http://arest.io/) RESTful framework.

To use your aREST enabled device in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: arest
    resource: http://IP_ADDRESS
    monitored_variables:
      temperature:
        name: temperature
    pins:
      A0:
        name: Pin 0 analog
```

Configuration variables:

- **resource** (*Required*): IP address and schema of the device that is exposing an aREST API, e.g. http://192.168.1.10.
- **name** (*Optional*): Let you overwrite the name of the device. By default *name* from the device is used.
- **monitored_variables** array (*Optional*): List of exposed variables.
  - **[variable]** (*Required*): Name of the variable to monitor.
    - **name** (*Optional*): The name to use for the frontend.
    - **unit_of_measurement** (*Optional*): Defines the units of measurement of the sensor, if any.
    - **value_template** (*Optional*): Defines a [template](/docs/configuration/templating/#processing-incoming-data) to extract a value from the payload.
- **pins** array (*Optional*): List of pins to monitor. Analog pins need a leading **A** for the pin number.
  - **[pin]** (*Required*): Pin number to use.
    - **name** (*Required*): The name of the variable you wish to monitor.
    - **unit_of_measurement** (*Optional*): Defines the unit of measurement of the sensor, if any.
    - **value_template** (*Optional*): Defines a [template](/docs/configuration/templating/#processing-incoming-data) to extract a value from the payload.

The variables in the `monitored_variables` array must be available in the response of the device. As a starting point you could use the one of the example sketches (eg.  [Ethernet](https://raw.githubusercontent.com/marcoschwartz/aREST/master/examples/Ethernet/Ethernet.ino) for an Arduino with Ethernet shield). In those sketches are two variables (`temperature` and `humidity`) available which will act as endpoints. 

Accessing one of the endpoints (eg. http://192.168.1.10/temperature) will give you the value inside a JSON response.

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

`return_value` contains the sensor's data in a JSON response for a given pin (eg. http://192.168.1.10/analog/2/ or  http://192.168.1.10/digital/7/). 

```json
{"return_value": 34, "id": "sensor02", "name": "livingroom", "connected": true}
```

