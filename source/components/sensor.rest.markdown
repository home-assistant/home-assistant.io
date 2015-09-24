---
layout: page
title: "RESTful sensor support"
description: "Instructions how to integrate REST sensors into Home Assistant."
date: 2015-09-14 19:10
sidebar: false
comments: false
sharing: true
footer: true
---

<img src='/images/supported_brands/rest.png' class='brand pull-right' />
The rest sensor platform is consuming a give endpoint which is exposed by a [RESTful API](https://en.wikipedia.org/wiki/Representational_state_transfer) of a device, an application, or a web service. The sensor has support for GET and POST requests.

To enable this sensor, add the following lines to your `configuration.yaml` for a GET request:

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
  variable: 'temperature'
  payload: '{ "device" : "heater" }'
  name: REST POST sensor
  unit_of_measurement: "°C"
  correction_factor: 0.0001
  decimal_places: 0
```

Configuration variables:

- **resource** (*Required*): The resource or endpoint that contains the value.
- **method** (*Optional*): The method of the request. Default is GET.
- **variable** (*Optional*): Defines the unit of measurement of the sensor, if any.
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


