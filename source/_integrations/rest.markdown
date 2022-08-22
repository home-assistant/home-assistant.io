---
title: RESTful
description: Instructions on how to integrate REST sensors and binary sensors into Home Assistant.
ha_category:
  - Binary Sensor
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

The `rest` integration is consuming a given endpoint which is exposed by a [RESTful API](https://en.wikipedia.org/wiki/Representational_state_transfer) of a device, an application, or a web service. The integration has support for GET and POST requests.

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
authentication:
  description:  Type of the HTTP authentication. `basic` or `digest`.
  required: false
  type: string
binary_sensor:
  description: List of binary sensor mappings.
  required: false
  type: list
headers:
  description: The headers for the requests.
  required: false
  type: [list, template]
method:
  description: The method of the request. Either `POST` or `GET`.
  required: false
  type: string
  default: GET
params:
  description: The query params for the requests.
  required: false
  type: [list, template]
password:
  description: The password for accessing the REST endpoint.
  required: false
  type: string
payload:
  description: The payload to send with a POST request. Depends on the service, but usually formed as JSON.
  required: false
  type: string
resource:
  description: The resource or endpoint that contains the value.
  required: true
  type: string
resource_template:
  description: The resource or endpoint that contains the value with template support.
  required: true
  type: template
scan_interval:
  description: Define the frequency to call the REST endpoint in seconds.
  required: false
  type: integer
  default: 30
sensor:
  description: List of sensor mappings.
  required: false
  type: list
  keys:
    json_attributes:
      description: "A list of keys to extract values from a JSON dictionary result and then set as sensor attributes. If the endpoint returns XML with the `text/xml`, `application/xml` or `application/xhtml+xml` content type, it will automatically be converted to JSON according to this [specification](https://www.xml.com/pub/a/2006/05/31/converting-between-xml-and-json.html)"
      required: false
      type: [string, list]
    json_attributes_path:
      description: A [JSONPath](https://goessner.net/articles/JsonPath/) that references the location of the `json_attributes` in the JSON content.
      required: false
      type: string
    unit_of_measurement:
      description: Defines the units of measurement of the sensor, if any.
      required: false
      type: string
timeout:
  description: Defines max time to wait data from the endpoint.
  required: false
  type: integer
  default: 10
username:
  description: The username for accessing the REST endpoint.
  required: false
  type: string
verify_ssl:
  description: Verify the SSL certificate of the endpoint.
  required: false
  type: boolean
  default: True
"[both sensor and binary_sensor entities]":
  description: Fields that can be used above for both sensors and binary sensors.
  required: false
  type: list
  keys:
    device_class:
      description: Sets the [class of the device](/integrations/sensor#device-class), changing the device state and icon that is displayed on the frontend.
      required: false
      type: string
    force_update:
      description: Sends update events even if the value hasn't changed. Useful if you want to have meaningful value graphs in history.
      required: false
      type: boolean
      default: false
    icon:
      description: Defines a template for the icon of the REST sensor.
      required: false
      type: template
    name:
      description: Defines a template for the name of the REST sensor.
      required: false
      type: template
      default: REST Sensor
    picture:
      description: Defines a template for the entity picture of the REST sensor.
      required: false
      type: template
    state_class:
      description: The [state_class](https://developers.home-assistant.io/docs/core/entity/sensor#available-state-classes) of the sensor.
      required: false
      type: string
    unique_id:
      description: An ID that uniquely identifies this entity. This allows changing the `name`, `icon` and `entity_id` from the web interface.
      required: false
      type: string
    value_template:
      description: "Defines a [template](/docs/configuration/templating/#processing-incoming-data) to extract the value."
      required: false
      type: template
{% endconfiguration %}
