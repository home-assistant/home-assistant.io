---
layout: page
title: "RESTful Sensor"
description: "Instructions how to integrate REST sensors into Home Assistant."
date: 2015-09-14 19:10
sidebar: true
comments: false
sharing: true
footer: true
logo: restful.png
ha_category: Sensor
ha_release: 0.7.4
---


The `rest` sensor platform is consuming a given endpoint which is exposed by a [RESTful API](https://en.wikipedia.org/wiki/Representational_state_transfer) of a device, an application, or a web service. The sensor has support for GET and POST requests.

To enable this sensor, add the following lines to your `configuration.yaml` file for a GET request:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: rest
    resource: http://IP_ADDRESS/ENDPOINT
```

or for a POST request:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: rest
    resource: http://IP_ADDRESS/ENDPOINT
    method: POST
    payload: '{ "device" : "heater" }'
```

Configuration variables:

- **resource** (*Required*): The resource or endpoint that contains the value.
- **method** (*Optional*): The method of the request. Default is `GET`.
- **value_template** (*Optional*): Defines a [template](/topics/templating/) to extract the value.
- **payload** (*Optional*): The payload to send with a POST request. Depends on the service, but usually formed as JSON.
- **name** (*Optional*): Name of the REST sensor.
- **unit_of_measurement** (*Optional*): Defines the unit of measurement of the sensor, if any.
- **verify_ssl** (*Optional*): Verify the certification of the endpoint. Default to `True`.
- **authentication** (*Optional*): Type of the HTTP authentication. `basic` or `digest`.
- **username** (*Optional*): The username for accessing the REST endpoint.
- **password** (*Optional*): The password for accessing the REST endpoint.
- **headers** (*Optional*): The headers for the requests.

<p class='note warning'>
Make sure that the URL exactly matches your endpoint or resource.
</p>

`curl` can help you identify the variable you want to display in your Home Assistant frontend. The example below shows the JSON response of a device that is running with [aREST](http://arest.io/).

```bash
$ curl -X GET http://192.168.1.31/temperature/
{"temperature": 77, "id": "sensor02", "name": "livingroom", "connected": true}
```

## {% linkable_title Examples %}

In this section you find some real life examples of how to use this sensor.

### {% linkable_title External IP address %}

You can find your external IP address using the service [JSON Test](http://www.jsontest.com) at their http://ip.jsontest.com/ endpoint.

To display the IP address, the entry for a sensor in the `configuration.yaml` file will look like this.

```yaml
sensor:
  - platform: rest
    resource: http://ip.jsontest.com
    name: External IP
    value_template: '{% raw %}{{ value_json.ip }}{% endraw %}'
```

### {% linkable_title Single value from a local Glances instance %}

The [glances](/components/sensor.glances/) sensor is doing the exact same thing for all exposed values.

Add something similar to the entry below to your `configuration.yaml` file:

```yaml
sensor:
  - platform: rest
    resource: http://IP_ADRRESS:61208/api/2/mem/used
    name: Used mem
    value_template: '{% raw %}{{ value_json.used| multiply(0.000000954) | round(0) }}{% endraw %}'
    unit_of_measurement: MB
```

### {% linkable_title Value for other Home Assistant instance %}

The Home Assistant [API](/developers/rest_api/) exposes the data from your attached sensors. If you are running multiple Home Assistant instances which are not [connected](/developers/architecture/#multiple-connected-instances) you can still get information from them.

If the Home Assistant instance in the resource variable is protected by an API password, you can append `?api_password=YOUR_PASSWORD` to the resource URL to authenticate or use `headers:`.

```yaml
sensor:
  - platform: rest
    resource: http://IP_ADDRESS:8123/api/states/sensor.weather_temperature
    name: Temperature
    value_template: {% raw %}'{{ value_json.state }}'{% endraw %}
    unit_of_measurement: "°C"
```

### {% linkable_title Accessing a HTTP authentication protected endpoint %}

The REST sensor supports HTTP authentication and customized headers.

```yaml
sensor:
  - platform: rest
    resource: http://IP_ADDRESS:5000/sensor
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
```

### {% linkable_title Use GitHub to get the latest release of Home Assistant %}

This sample is very similar to the [`updater`](/components/updater/) component but the information is received from GitHub.

```yaml
sensor:
  - platform: rest
    resource: https://api.github.com/repos/home-assistant/home-assistant/releases/latest
    username: YOUR_GITHUB_USERNAME
    password: YOUR_GITHUB_ACCESS_TOKEN
    authentication: basic
    value_template: '{% raw %}{{ value_json.tag_name }}{% endraw %}'
    headers:
      Accept: application/vnd.github.v3+json
      Content-Type: application/json
      User-Agent: Home Assistant REST sensor
```

