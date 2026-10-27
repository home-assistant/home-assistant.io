---
description: Instructions on how to integrate REST sensors and binary sensors into Home Assistant.
ha_release: 0.7.4
ha_domain: rest
ha_categories:
  - diy_makers.web_data_connectors
ha_platforms:
  - binary_sensor
  - sensor
ha_integration_type: service
ha_config_flow: true
---

The **RESTful** {% term integration %} is consuming a given endpoint which is exposed by a [RESTful API](https://en.wikipedia.org/wiki/Representational_state_transfer) of a device, an application, or a web service. The sensor has support for GET and POST requests.

Both UI and [YAML setup](#yaml-configuration) are supported.

[RESTful Sensor](/integrations/sensor.rest) and [RESTful Binary Sensor](/integrations/binary_sensor.rest) can also be set up as platforms in the [YAML Configuration](#yaml-configuration) if there will be only a single sensor configured per endpoint.

{% include integrations/config_flow.md %}

{% note %}

RESTful uses configuration subentries for configuring the sensors.

1. Set up the resource configuration once per resource or endpoint.
2. Create a subentry for each sensor you want to derive from the endpoint.

{% endnote %}

### RESTful Resource Configuration

{% configuration_basic %}
Resource:
  description: "The resource or endpoint URL, supports templates. Example: `https://{{ \"example.com\" }}/resource`."
Method:
  description: "The HTTP method of the request. Only `GET` or `POST` supported."
HTTP authentication:
  description: "Type of the HTTP authentication."
Username:
  description: "Endpoint username."
Password:
  description: "Endpoint password, required if username specified."
HTTP Headers:
  description: "HTTP headers as key/value pairs, values support templates. Can support header authorization `Authorization: Bearer **auth_code**`."
Query Parameters:
  description: "Key/value pairs, values support templates."
JSON payload:
  description: "Body of `POST` requests, supports templates."
SSL cipher list:
  description: "The list of SSL ciphers to be accepted from this endpoint. `Python Default` (default), `Modern` or `Intermediate` (_see [Mozilla Security/Server Side TLS](https://docs.tlsref.org/server-side-tls.html)_)."
Verify SSL:
  description: "Verify the SSL certificates of the connection."
Timeout:
  description: "Timeout in seconds for endpoint response."
Encoding:
  description: "Encoding of the endpoint response, defaults to `UTF-8`."
{% endconfiguration_basic %}

### RESTful Subentry Configuration

[RESTful Binary Sensors](#restful-binary-sensor-configuration) and [RESTful Sensors](#restful-sensor-configuration) share these common attributes:

{% configuration_basic %}
Name:
  description: "Entity name, supports templates, default:  `RESTful Binary Sensor` or `RESTful Sensor`."
Icon:
  description:  "Entity icon, supports templates."
Picture:
  description:  "Entity picture, supports templates."
Value template:
  description: "Defines a [template](#templates) to extract the value."
Force update:
  description: "Sends update events even if the value hasn’t changed. Useful if you want to have meaningful value graphs in history. _See [Data Updates](../sensor.rest#force-update) for more information_."
Availability:
  description: "Defines a template to get the available state of the entity. If the template either fails to render or returns `True`, `1`, `true`, `yes`, `on`, `enable`, or a non-zero number, the entity is available. If the template returns any other value, the entity is unavailable. If not configured, the entity is always available. Note that the string comparison is not case sensitive; `TrUe` and `yEs` are allowed."
{% endconfiguration_basic %}

#### RESTful Binary Sensor Configuration

Attributes specific to binary sensor:

{% configuration_basic %}
Device class:
  description: "The [device class](../binary_sensor/#device-class) used to pick the sensor’s on/off wording and icon."
{% endconfiguration_basic %}

#### RESTful Sensor Configuration

Attributes specific to sensor:

{% configuration_basic %}
Device class:
  description: "The [device class](../sensor/#device-class) used to pick the sensor’s on/off wording and icon."
State class:
  description: "The [state class](https://contributors.home-assistant.io/core/entities/sensor/#state-classes) of the sensor."
Unit of measurement:
  description: "The unit of measurement for the class. Will filter based on `device class` and `state class` selections."
JSON attributes:
  description: "A list of keys to extract values from a JSON dictionary result and then set as sensor attributes. If the endpoint returns XML with the `text/xml`, `application/xml` or `application/xhtml+xml` content type, it will automatically be converted to JSON according to this [specification](https://www.xml.com/pub/a/2006/05/31/converting-between-xml-and-json.html)"
JSON attributes path:
  description: "A [JSONPath](https://goessner.net/articles/JsonPath/) that references the location of the `JSON attributes` in the JSON content."
{% endconfiguration_basic %}

## YAML Configuration

To enable this {% term integration %} using YAML, add the following lines to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

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
  default: true
ssl_cipher_list:
  description: The list of SSL ciphers to be accepted from this endpoint. `python_default` (_default_), `modern` or `intermediate` (_inspired by [Mozilla Security/Server Side TLS](https://docs.tlsref.org/server-side-tls.html)_).
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
Use either `resource` or `resource_template` in YAML configurations.
{% endimportant %}

## Templates

{% include integrations/using_templates.md %}

{% include integrations/actions.md %}
