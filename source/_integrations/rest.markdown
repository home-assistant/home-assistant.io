---
title: RESTful
description: Instructions on how to set up rest sensors within Home Assistant.
ha_category:
  - Sensor
  - Binary Sensor
ha_release: 0.7.4
ha_iot_class: Local Polling
ha_domain: rest
ha_platforms:
  - binary_sensor
  - notify
  - sensor
  - switch
---

The `rest` sensor platform is consuming a given endpoint which is exposed by a [RESTful API](https://en.wikipedia.org/wiki/Representational_state_transfer) of a device, an application, or a web service. The sensor has support for GET and POST requests.

[RESTful Sensor](/integrations/sensor.rest) and [RESTful Binary_sensor](/integrations/binary_sensor.rest) can also be set up as platforms if there is only a single sensor per endpoint.

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
verify_ssl:
  description: Verify the SSL certificate of the endpoint.
  required: false
  type: boolean
  default: True
timeout:
  description: Defines max time to wait data from the endpoint.
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
  type: [string, list]
params:
  description: The query params for the requests.
  required: false
  type: [string, list]
sensor:
  description: A list of [RESTful Sensor](/integrations/sensor.rest) to create from the shared data. All configuration settings that the supported by [RESTful Sensor](/integrations/sensor.rest#configuration-variables) not listed above can be used here.
  required: false
  type: list
binary_sensor:
  description: A list of [RESTful Binary_sensor](/integrations/binary_sensor.rest) to create from the shared data All configuration settings that the supported by [RESTful Binary_sensor](/integrations/binary_sensor.rest#configuration-variables) not listed above can be used here.
  required: false
  type: list
{% endconfiguration %}
