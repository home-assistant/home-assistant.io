---
layout: page
title: "RESTful Binary Sensor"
description: "Instructions how to integrate REST binary sensors into Home Assistant."
date: 2015-12-17 19:10
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Binary Sensor
---


The `rest` binary sensor platform is consuming a given endpoint which is exposed by a [RESTful API](https://en.wikipedia.org/wiki/Representational_state_transfer) of a device, an application, or a web service. The binary sensor has support for GET and POST requests.

To enable this sensor, add the following lines to your `configuration.yaml` file for a GET request:

```yaml
# Example configuration.yaml entry
binary_sensor:
  platform: rest
  resource: http://IP_ADDRESS/ENDPOINT
  method: GET
  name: REST GET binary sensor
  sensor_class: opening
  value_template: '{% raw %}{{ value_json.state }}{% endraw %}'
```

or for a POST request:

```yaml
# Example configuration.yaml entry
binary_sensor:
  platform: rest
  resource: http://IP_ADDRESS/ENDPOINT
  method: POST
  name: REST POST binary sensor
  sensor_class: opening
  value_template: '{% raw %}{{ value_json.state }}{% endraw %}'
  payload: '{ "device" : "door" }'
```

Configuration variables:

- **resource** (*Required*): The resource or endpoint that contains the value.
- **method** (*Optional*): The method of the request. Default is GET.
- **name** (*Optional*): Name of the REST binary sensor.
- **sensor_class** (*Optional*): The [type/class](/components/binary_sensor/) of the sensor to set the icon in the frontend.
- **value_template** (*Optional*): Defines a [template](/topics/templating/) to extract the value.
- **payload** (*Optional*): The payload to send with a POST request. Usualy formed as a dictionary.

<p class='note warning'>
Make sure that the URL matches exactly your endpoint or resource.
</p>

