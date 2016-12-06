---
layout: page
title: "RESTful Binary Sensor"
description: "Instructions how to integrate REST binary sensors into Home Assistant."
date: 2015-12-17 19:10
sidebar: true
comments: false
sharing: true
footer: true
logo: restful.png
ha_category: Binary Sensor
ha_release: "0.10"
ha_iot_class: "Local Polling"
---


The `rest` binary sensor platform is consuming a given endpoint which is exposed by a [RESTful API](https://en.wikipedia.org/wiki/Representational_state_transfer) of a device, an application, or a web service. The binary sensor has support for GET and POST requests.

The JSON messages can contain different values like `1`, `"1"`, `TRUE`, `true`, `on`, or `open`. If the value is nested then use a [template](/topics/templating/).

```json
{
    "name": "Binary sensor",
    "state": {
        "open": "true",
        "timestamp": "2016-06-20 15:42:52.926733"
    }
}
```

To enable this sensor, add the following lines to your `configuration.yaml` file for a GET request:

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: rest
    resource: http://IP_ADDRESS/ENDPOINT
```

or for a POST request:

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: rest
    resource: http://IP_ADDRESS/ENDPOINT
    method: POST
```

Configuration variables:

- **resource** (*Required*): The resource or endpoint that contains the value.
- **method** (*Optional*): The method of the request. Default is GET.
- **name** (*Optional*): Name of the REST binary sensor.
- **sensor_class** (*Optional*): The [type/class](/components/binary_sensor/) of the sensor to set the icon in the frontend.
- **value_template** (*Optional*): Defines a [template](/topics/templating/) to extract the value.
- **payload** (*Optional*): The payload to send with a POST request. Usually formed as a dictionary.
- **verify_ssl** (*Optional*): Verify the certification of the endpoint. Default to True.
- **authentication** (*Optional*): Type of the HTTP authentication. `basic` or `digest`.
- **username** (*Optional*): The username for accessing the REST endpoint.
- **password** (*Optional*): The password for accessing the REST endpoint.
- **headers** (*Optional*): The headers for the requests.

<p class='note warning'>
Make sure that the URL exactly matches your endpoint or resource.
</p>


## {% linkable_title Examples %}

In this section you find some real life examples of how to use this sensor.

### {% linkable_title aREST sensor %}

Instead of using an [aREST](/components/binary_sensor.arest/) binary sensor, you could retrieve the value of a device supporting aREST directly with a REST binary sensor.

```yaml
binary_sensor:
  - platform: rest
    resource: http://192.168.0.5/digital/9
    method: GET
    name: Light
    sensor_class: light
    value_template: {% raw %}'{{ value_json.return_value }}'{% endraw %}
```

### {% linkable_title Accessing an HTTP authentication protected endpoint %}

The REST sensor supports HTTP authentication and customized headers.

```yaml
binary_sensor:
  - platform: rest
    resource: http://IP_ADDRESS:5000/binary_sensor
    username: ha1
    password: test1
    authentication: basic
    headers:
      User-Agent: Home Assistant
      Content-Type: application/json
```

The headers will contain all relevant details. This will also give you the ability to access endpoints that are protected by tokens. 

```bash
Content-Length: 1024
Host: IP_ADDRESS1:5000
Authorization: Basic aGExOnRlc3Qx
Accept-Encoding: identity
Content-Type: application/json
User-Agent: Home Assistant
