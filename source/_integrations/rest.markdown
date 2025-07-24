---
title: RESTful
description: Instructions on how to integrate REST sensors and binary sensors into Home Assistant.
ha_category:
  - Binary sensor
  - Sensor
ha_release: 0.7.4
ha_iot_class: Local Polling
ha_domain: rest
ha_platforms:
  - binary_sensor
  - notify
  - sensor
  - switch
ha_integration_type: integration
---

The `rest` sensor platform is consuming a given endpoint which is exposed by a [RESTful API](https://en.wikipedia.org/wiki/Representational_state_transfer) of a device, an application, or a web service. The sensor has support for GET and POST requests.

[RESTful Sensor](/integrations/sensor.rest) and [RESTful Binary Sensor](/integrations/binary_sensor.rest) can also be set up as platforms if there is only a single sensor per endpoint.

```yaml
# Example configuration.yaml entry
rest:
  - authentication: basic
    username: "admin"
    password: "password"
    scan_interval: 60
    resource: http://192.168.1.12/status.xml
    sensor:
      - name: "Adult Pool Data System"
        json_attributes_path: "$.response.system"
        value_template: "OK"
        json_attributes:
          - "runstate"
          - "model"
          - "opmode"
          - "freeze"
          - "time"
          - "sensor1"
          - "sensor2"
          - "sensor3"
          - "sensor4"
          - "sensor5"
          - "version"
      - name: "Adult Pool Data Equipment"
        json_attributes_path: "$.response.equipment"
        value_template: "OK"
        json_attributes:
          - "circuit1"
          - "circuit2"
          - "circuit3"
          - "circuit4"
          - "circuit5"
          - "circuit6"
          - "circuit7"
          - "circuit8"
      - name: "Adult Pool Data Temp"
        json_attributes_path: "$.response.temp"
        value_template: "OK"
        json_attributes:
          - "htstatus"
          - "poolsp"
          - "spasp"
          - "pooltemp"
          - "spatemp"
          - "airtemp"
  - authentication: basic
    username: "admin"
    password: "password"
    scan_interval: 60
    resource: "http://192.168.1.13/status.xml"
    sensor:
      - name: "Kiddie Pool Data System"
        json_attributes_path: "$.response.system"
        value_template: "OK"
        json_attributes:
          - "runstate"
          - "model"
          - "opmode"
          - "freeze"
          - "time"
          - "sensor1"
          - "sensor2"
          - "sensor3"
          - "sensor4"
          - "version"
      - name: "Kiddie Pool Data Equipment"
        json_attributes_path: "$.response.equipment"
        value_template: "OK"
        json_attributes:
          - "circuit1"
          - "circuit2"
          - "circuit3"
          - "circuit4"
          - "circuit5"
          - "circuit6"
          - "circuit7"
          - "circuit8"
      - name: "Kiddie Pool Data Temp"
        json_attributes_path: "$.response.temp"
        value_template: "OK"
        json_attributes:
          - "htstatus"
          - "poolsp"
          - "spasp"
          - "pooltemp"
          - "spatemp"
          - "airtemp"
```

{% configuration %}
resource:
  description: The resource or endpoint that contains the value.
  required: true
  type: string
resource_template:
  description: The resource or endpoint that contains the value with template support.
  required: true
  type: template
method:
  description: The method of the request. Either `POST` or `GET`.
  required: false
  type: string
  default: GET
payload:
  description: The payload to send with a POST request. Depends on the service, but usually formed as JSON.
  required: false
  type: string
payload_template:
  description: The payload to send with a POST request, with template support. Depends on the service, but usually formed as JSON.
  required: false
  type: template
verify_ssl:
  description: Whether to verify the SSL certificate of the endpoint.
  required: false
  type: boolean
  default: True
ssl_cipher_list:
  description: The list of SSL ciphers to be accepted from this endpoint. `python_default` (_default_), `modern` or `intermediate` (_inspired by [Mozilla Security/Server Side TLS](https://wiki.mozilla.org/Security/Server_Side_TLS)_).
  required: false
  type: string
  default: default
timeout:
  description: The maximum time in seconds to wait for data from the endpoint. If the timeout is reached, the sensor will become `unavailable`.
  required: false
  type: integer
  default: 10
authentication:
  description:  Type of the HTTP authentication. `basic` or `digest`.
  required: false
  type: string
username:
  description: The username for accessing the REST endpoint.
  required: false
  type: string
password:
  description: The password for accessing the REST endpoint.
  required: false
  type: string
headers:
  description: The headers for the requests.
  required: false
  type: [list, template]
params:
  description: The query params for the requests.
  required: false
  type: [list, template]
scan_interval:
  description: The frequency in seconds to call the REST endpoint.
  required: false
  type: integer
  default: 30
encoding:
  description: The character encoding to use if none provided in the header of the shared data.
  required: false
  type: string
  default: UTF-8
sensor:
  description: A list of sensors to create from the shared data. All configuration settings that are supported by [RESTful Sensor](/integrations/sensor.rest#configuration-variables) not listed above can be used here.
  required: false
  type: list
binary_sensor:
  description: A list of binary sensors to create from the shared data. All configuration settings that are supported by [RESTful Binary Sensor](/integrations/binary_sensor.rest#configuration-variables) not listed above can be used here.
  required: false
  type: list
{% endconfiguration %}

{% important %}
Use either `resource` or `resource_template`.
{% endimportant %}


{% include integrations/using_templates.md %}
