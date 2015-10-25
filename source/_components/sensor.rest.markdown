---
layout: component
title: "RESTful sensor"
description: "Instructions how to integrate REST sensors into Home Assistant."
date: 2015-09-14 19:10
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Sensor
---


The rest sensor platform is consuming a given endpoint which is exposed by a [RESTful API](https://en.wikipedia.org/wiki/Representational_state_transfer) of a device, an application, or a web service. The sensor has support for GET and POST requests.

To enable this sensor, add the following lines to your `configuration.yaml` file for a GET request:

```yaml
# Example configuration.yaml entry
sensor:
  platform: rest
  resource: http://IP_ADDRESS/ENDPOINT
  method: GET
  name: REST GET sensor
  variable: 'return_value'
  unit_of_measurement: "°C"
  correction_factor: 0.01
  decimal_places: 0
```

or for a POST request:

```yaml
# Example configuration.yaml entry
sensor:
  platform: rest
  resource: http://IP_ADDRESS/ENDPOINT
  method: POST
  variable: 'temperature' or ['Temperatures', 0, 'CurrentReading']
  payload: '{ "device" : "heater" }'
  name: REST POST sensor
  unit_of_measurement: "°C"
  correction_factor: 0.0001
  decimal_places: 0
```

Configuration variables:

- **resource** (*Required*): The resource or endpoint that contains the value.
- **method** (*Optional*): The method of the request. Default is GET.
- **variable** (*Optional*): Defines the variable or a list of element for complex responses to extract, if any.
- **payload** (*Optional*): The payload to send with a POST request. Usualy formed as a dictionary-
- **name** (*Optional*): Name of the REST sensor.
- **unit_of_measurement** (*Optional*): Defines the unit of measurement of the sensor, if any.
- **correction_factor** (*Optional*): A float value to do some basic calculations.
- **decimal_places** (*Optional*): Number of decimal places of the value. Default is 0.

<p class='note warning'>
Make sure that the URL matches exactly your endpoint or resource.
</p>

`curl` could help you with the identification of the variable you want to display in your Home Assistant frontend. The example below show the JSON response of a device that is running with [aREST](http://arest.io/).

```bash
$ curl -X GET http://192.168.1.31/temperature/
{"temperature": 77, "id": "sensor02", "name": "livingroom", "connected": true}
```

## {% linkable_title Examples %}

In this section you find some real life examples of how to use this sensor.

### {% linkable_title External IP address %}

Always want to know your external IP address. [JSON Test](http://www.jsontest.com) will provide you this information at their http://ip.jsontest.com/ endpoint.

To display the IP address, the entry for a sensor in the `configuration.yaml` file will look like this.

```yaml
# Example configuration.yaml entry
  - platform: rest
    resource: http://ip.jsontest.com
    name: External IP
    variable: 'ip'
```

### {% linkable_title Single value from a local Glances instance %}

The [glances](/components/sensor.glances.html) sensor is doing a similar thing

Add something similar to the entry below to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
  - platform: rest
    resource: http://IP_ADRRESS:61208/api/2/mem/used
    name: Used mem
    variable: 'used'
    unit_of_measurement: MB
    correction_factor: 0.000000954
    decimal_places: 0
```

