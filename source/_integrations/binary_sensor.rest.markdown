---
title: "RESTful binary sensor"
description: "Instructions on how to integrate REST binary sensors into Home Assistant."
ha_category:
  - Binary sensor
ha_release: "0.10"
ha_iot_class: Local Polling
ha_domain: rest
---

The `rest` binary sensor platform is consuming a given endpoint which is exposed
by a
[RESTful API](https://en.wikipedia.org/wiki/Representational_state_transfer)
of a device, an application, or a web service.
The binary sensor has support for GET and POST requests.

_Tip:_ If you want to create multiple `sensors` using the same endpoint, use the [RESTful](/integrations/rest) configuration instructions.

If the endpoint returns one of the values of these pairs: `0`/`1`,
`"0"`/`"1"`, `FALSE`/`TRUE`, `false`/`true`, `off`/`on` or `closed`/`open`
it can be used as-is. If the return value differs, use a
[template](/docs/configuration/templating/#processing-incoming-data).
If the endpoint returns XML with the `text/xml`, `application/xml`, or 
`application/xhtml+xml` content type, it will automatically be converted 
to JSON according to this [specification](https://www.xml.com/pub/a/2006/05/31/converting-between-xml-and-json.html).

```json
{
    "name": "Binary sensor",
    "state": {
        "open": "true",
        "timestamp": "2016-06-20 15:42:52.926733"
    }
}
```

## Configuration

To enable this sensor,
add the following lines to your {% term "`configuration.yaml`" %} file for a GET request:

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

or a template based request:

{% raw %}

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: rest
    resource_template: "http://IP_ADDRESS/{{ now().strftime('%Y-%m-%d') }}"
```

{% endraw %}

{% configuration %}
resource:
  description: The resource or endpoint that contains the value.
  required: true
  type: string
  default: string
resource_template:
  description: The resource or endpoint that contains the value with template support.
  required: false
  type: template
method:
  description: The method of the request.
  required: false
  type: string
  default: GET
name:
  description: Name of the REST binary sensor.
  required: false
  type: template
  default: REST Binary Sensor
icon:
  description: Defines a template for the icon of the entity.
  required: false
  type: template
picture:
  description: Defines a template for the entity picture of the entity.
  required: false
  type: template
availability:
  description: Defines a template if the entity state is available or not.
  required: false
  type: template
device_class:
  description: Sets the [class of the device](/integrations/binary_sensor/#device-class), changing the device state and icon that is displayed on the frontend.
  required: false
  type: string
value_template:
  description: >
    Defines a [template](/docs/configuration/templating/#processing-incoming-data)
    to extract the value.
  required: false
  type: template
payload:
  description: The payload to send with a POST request. Usually formed as a dictionary.
  required: false
  type: string
unique_id:
  description: An ID that uniquely identifies this entity. This allows changing the `name`, `icon` and `entity_id` from the web interface.
  required: false
  type: string
verify_ssl:
  description: Verify the certification of the endpoint.
  required: false
  type: boolean
  default: true
timeout:
  description: Defines max time to wait data from the endpoint.
  required: false
  type: integer
  default: 10
authentication:
  description: "Type of the HTTP authentication. `basic` or `digest`."
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
{% endconfiguration %}

{% include integrations/using_templates.md %}

## Examples

In this section you find some real-life examples of how to use this sensor.

### aREST sensor

Instead of using an [aREST](/integrations/arest#binary-sensor) binary sensor,
you could retrieve the value of a device supporting
aREST directly with a REST binary sensor.

{% raw %}

```yaml
binary_sensor:
  - platform: rest
    resource: http://192.168.0.5/digital/9
    method: GET
    name: Light
    device_class: light
    value_template: '{{ value_json.return_value }}'
```

{% endraw %}

### Accessing an HTTP authentication protected endpoint

The REST sensor supports HTTP authentication and template-enabled customized headers.

{% raw %}

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
      X-Custom-Header: '{{ states("input_text.the_custom_header") }}'
```

{% endraw %}


The headers will contain all relevant details. This will also give
you the ability to access endpoints that are protected by tokens.

```bash
Content-Length: 1024
Host: IP_ADDRESS1:5000
Authorization: Basic aGExOnRlc3Qx
Accept-Encoding: identity
Content-Type: application/json
User-Agent: Home Assistant
```
