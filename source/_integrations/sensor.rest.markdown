---
title: "RESTful Sensor"
description: Instructions on how to integrate REST sensors into Home Assistant.
ha_category:
  - Sensor
ha_release: 0.7.4
ha_iot_class: Local Polling
ha_domain: rest
---

The `rest` sensor platform is consuming a given endpoint which is exposed by a [RESTful API](https://en.wikipedia.org/wiki/Representational_state_transfer) of a device, an application, or a web service. The sensor has support for GET and POST requests.

_Tip:_ If you want to create multiple `sensors` using the same endpoint, use the [RESTful](/integrations/rest) configuration instructions.

To enable this sensor, add the following lines to your {% term "`configuration.yaml`" %} file for a GET request:

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

or a template based request:

{% raw %}

```yaml
# Example configuration.yaml entry
sensor:
  - platform: rest
    resource_template: http://IP_ADDRESS/{{ now().strftime('%Y-%m-%d') }}
    headers:
      Authorization: >
        Bearer {{ states("input_text.my_access_token") }}
    params:
      start_date: >
        {{ (now() - timedelta(days = 1)).strftime('%Y-%m-%d') }}
```

{% endraw %}

{% configuration %}
authentication:
  description:  Type of the HTTP authentication. `basic` or `digest`.
  required: false
  type: string
availability:
  description: Defines a template if the entity state is available or not.
  required: false
  type: template
device_class:
  description: Sets the [class of the device](/integrations/sensor#device-class), changing the device state and icon that is displayed on the frontend.
  required: false
  type: string
force_update:
  description: Sends update events even if the value hasn't changed. Useful if you want to have meaningful value graphs in history.
  required: false
  type: boolean
  default: false
headers:
  description: The headers for the requests.
  required: false
  type: [template, list]
icon:
  description: Defines a template for the icon of the REST sensor.
  required: false
  type: template
json_attributes:
  description: "A list of keys to extract values from a JSON dictionary result and then set as sensor attributes. If the endpoint returns XML with the `text/xml`, `application/xml` or `application/xhtml+xml` content type, it will automatically be converted to JSON according to this [specification](https://www.xml.com/pub/a/2006/05/31/converting-between-xml-and-json.html)"
  required: false
  type: [string, list]
json_attributes_path:
  description: A [JSONPath](https://goessner.net/articles/JsonPath/) that references the location of the `json_attributes` in the JSON content.
  required: false
  type: string
method:
  description: The method of the request. Either `POST` or `GET`.
  required: false
  type: string
  default: GET
name:
  description: Defines a template for the name of the REST sensor.
  required: false
  type: template
  default: REST Sensor
params:
  description: The query params for the requests.
  required: false
  type: [template, list]  
password:
  description: The password for accessing the REST endpoint.
  required: false
  type: string
payload:
  description: The payload to send with a POST request. Depends on the service, but usually formed as JSON.
  required: false
  type: string
picture:
  description: Defines a template for the entity picture of the REST sensor.
  required: false
  type: template
resource:
  description: The resource or endpoint that contains the value.
  required: true
  type: string
resource_template:
  description: The resource or endpoint that contains the value with template support.
  required: true
  type: template
state_class:
  description: The [state_class](https://developers.home-assistant.io/docs/core/entity/sensor#available-state-classes) of the sensor.
  required: false
  type: string
timeout:
  description: Defines max time to wait data from the endpoint.
  required: false
  type: integer
  default: 10
unique_id:
  description: An ID that uniquely identifies this entity. This allows changing the `name`, `icon` and `entity_id` from the web interface.
  required: false
  type: string
unit_of_measurement:
  description: Defines the units of measurement of the sensor, if any.
  required: false
  type: string
username:
  description: The username for accessing the REST endpoint.
  required: false
  type: string
value_template:
  description: "Defines a [template](/docs/configuration/templating/#processing-incoming-data) to extract the value."
  required: false
  type: template
verify_ssl:
  description: Verify the SSL certificate of the endpoint.
  required: false
  type: boolean
  default: True
{% endconfiguration %}

{% important %}
Use either `resource` or `resource_template`.
{% endimportant %}

`curl` can help you identify the variable you want to display in your Home Assistant frontend. The example below shows the JSON response of a device that is running with [aREST](https://arest.io/).

```bash
$ curl -X GET http://192.168.1.31/temperature/
{"temperature": 77, "id": "sensor02", "name": "livingroom", "connected": true}
```

The response is expected to be a dictionary or a list with a dictionary as its 0th element.

{% include integrations/using_templates.md %}

## Examples

In this section you find some real-life examples of how to use this sensor.

### External IP address

You can find your external IP address using the [ipify](https://www.ipify.org) service for both IPv4 and IPv6.

{% raw %}

```yaml
sensor:
  - platform: rest
    name: "External IP"
    resource: "https://api.ipify.org/?format=json"
    value_template: "{{ value_json.ip }}"

  - platform: rest
    name: "External IPv6"
    resource: "https://api6.ipify.org/?format=json"
    value_template: "{{ value_json.ip }}"
```

{% endraw %}

### Single value from a local Glances instance

The [glances](/integrations/glances) sensor is doing the exact same thing for all exposed values.

{% raw %}

```yaml
sensor:
  - platform: rest
    resource: http://IP_ADRRESS:61208/api/2/mem/used
    name: Used mem
    value_template: "{{ value_json.used| multiply(0.000000954) | round(0) }}"
    unit_of_measurement: MB
```

{% endraw %}

### Value from another Home Assistant instance

The Home Assistant [API](/developers/rest_api/) exposes the data from your attached sensors. If you are running multiple Home Assistant instances which are not connected you can still get information from them.

If the Home Assistant instance in the resource variable is protected by an API password, you can append `?api_password=YOUR_PASSWORD` to the resource URL to authenticate or use `headers:`.

{% raw %}

```yaml
sensor:
  - platform: rest
    resource: http://IP_ADDRESS:8123/api/states/sensor.weather_temperature
    name: Temperature
    value_template: "{{ value_json.state }}"
    unit_of_measurement: "°C"
```

{% endraw %}

### Accessing an HTTP authentication protected endpoint

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

If you are accessing a resource protected by a `Bearer` token in an `Authorization` header, you can either put the token in the header field of the sensor configuration (not recommended) or store the token in your [`secrets.yaml`](/docs/configuration/secrets/) file. In that case, be sure to include the word `Bearer` in the `secrets` file.

```yaml
sensor:
  - platform: rest
    resource: http://IP_ADDRESS:5000/sensor
    headers:
      Authorization: !secret my_sensor_secret_token
```

Example entry for the `secrets.yaml` file:

```yaml
my_sensor_secret_token: Bearer gh_DHQIXKVf6Pr4H8Yqz8uhApk_mnV6Zje6Pr4H8Yqz8A8nCxz6SBghQdS51
```

### Use GitHub to get the latest release of Home Assistant

This sample is very similar to the [`updater`](/integrations/updater/) integration but the information is received from GitHub.

{% raw %}

```yaml
sensor:
  - platform: rest
    resource: https://api.github.com/repos/home-assistant/home-assistant/releases/latest
    username: YOUR_GITHUB_USERNAME
    password: YOUR_GITHUB_ACCESS_TOKEN
    authentication: basic
    value_template: "{{ value_json.tag_name }}"
    headers:
      Accept: application/vnd.github.v3+json
      Content-Type: application/json
      User-Agent: Home Assistant REST sensor
```

{% endraw %}

### Fetch multiple JSON attributes and present them as values

[JSON Test](https://www.jsontest.com/) returns the current time, date and milliseconds since epoch from [http://date.jsontest.com/](http://date.jsontest.com/).

{% raw %}

```yaml
rest:
  - resource: "http://date.jsontest.com/"
    sensor:
      - name: "Time"
        value_template: "{{ value_json.time }}"

      - name: "Date"
        value_template: "{{ value_json.date }}"

      - name: "Milliseconds"
        value_template: "{{ value_json.milliseconds_since_epoch }}"
```

{% endraw %}

[JSONPlaceholder](https://jsonplaceholder.typicode.com/) provides sample JSON data for testing. In the below example, JSONPath locates the attributes in the JSON document. [JSONPath Online Evaluator](https://jsonpath.com/) provides a tool to test your JSONPath. If the endpoint returns XML, it will be converted to JSON using `xmltodict` before searching for attributes. You may find the [XMLtoDict debug tool](https://xmltodict-debugger.glitch.me/) helpful for testing how your XML converts to JSON.

{% raw %}

```yaml
sensor:
  - platform: rest
    name: JSON users
    json_attributes_path: "$.[0].address"
    json_attributes:
      - street
      - suite
      - city
      - zipcode
    resource: https://jsonplaceholder.typicode.com/users
    value_template: "{{ value_json[0].name }}"
```

{% endraw %}

This sample fetches a weather report from [OpenWeatherMap](https://openweathermap.org/), maps the resulting data into attributes of the RESTful sensor and then creates a set of [template](/integrations/template) sensors that monitor the attributes and present the values in a usable form.

{% raw %}

```yaml
rest:
  - resource: "https://api.openweathermap.org/data/2.5/weather?zip=80302,us&APPID=VERYSECRETAPIKEY"
    sensor:
      - name: "Report"
        value_template: "{{ value_json['weather'][0]['description'].title() }}"
        picture: "{{ 'https://openweathermap.org/img/w/' + value_json['weather'][0]['icon'].lower() + '.png' }}"

      - name: "Outside temp"
        value_template: "{{ value_json['main']['temp'] - 273.15 }}"
        unit_of_measurement: "°C"

      - name: "Outside pressure"
        value_template: "{{ value_json['main']['pressure'] }}"
        unit_of_measurement: "hP"

      - name: "Outside humidity"
        value_template: "{{ value_json['main']['humidity'] }}"
        unit_of_measurement: "%"
```

{% endraw %}

This configuration shows how to extract multiple values from a dictionary. This method avoids flooding the REST service because the result is only requested once. From that single request, multiple sensors can be created by using template sensors.

{% raw %}

```json
{
    "bedroom1": {
        "temperature": 15.79,
        "humidity": 55.78,
        "battery": 5.26,
        "timestamp": "2019-02-27T22:21:37Z"
    },
    "bedroom2": {
        "temperature": 18.99,
        "humidity": 49.81,
        "battery": 5.08,
        "timestamp": "2019-02-27T22:23:44Z"
    },
    "bedroom3": {
        "temperature": 18.58,
        "humidity": 47.95,
        "battery": 5.15,
        "timestamp": "2019-02-27T22:21:22Z"
    }
}
```

{% endraw %}

{% raw %}

```yaml
rest:
    resource: "http://<address_to_rest_service>"
    sensor:
      - name: "Bedroom1 Temperature"
        value_template: "{{ value_json['bedroom1']['temperature'] }}"
        device_class: temperature
        unit_of_measurement: "°C"
      - name: "Bedroom1 Humidity"
        value_template: "{{ value_json['bedroom1']['humidity'] }}"
        device_class: humidity
        unit_of_measurement: "%"
      - name: "Bedroom1 Battery"
        value_template: "{{ value_json['bedroom1']['battery'] }}"
        device_class: battery
        unit_of_measurement: "V"
      - name: "Bedroom2 Temperature"
        value_template: "{{ value_json['bedroom2']['temperature'] }}"
        device_class: temperature
        unit_of_measurement: "°C"
```

{% endraw %}

The example below shows how to extract multiple values from a dictionary from the XML file of a Steamist Steambath Wi-Fi interface. The values are used to create multiple sensors without having to poll the endpoint numerous times.

{% raw %}

```yaml
rest:
  # Steam Controller
  - resource: "http://192.168.1.105/status.xml"
    scan_interval: 15
  
    sensor:
      - name: "Steam Temp"
        value_template: "{{ value_json['response']['temp0'] | regex_findall_index('([0-9]+)XF') }}"
        unit_of_measurement: "°F"

       steam_time_remaining:
      - name: "Steam Time Remaining"
        value_template: "{{ value_json['response']['time0'] }}"
        unit_of_measurement: "minutes"

rest_command:  
  set_steam_led:
    url: http://192.168.1.105/leds.cgi?led={{ led }}
```

{% endraw %}

For reference, the XML content of endpoint shown above example is below:

```xml
<?xml version="1.0" encoding="utf-8"?>

 <response>
 	<scan>0</scan>
	<ver>12556</ver>
	<count>48</count>
	<ssid>alexander</ssid>
	<bss>
		<valid>0</valid>
		<name>0</name>
		<privacy>0</privacy>
		<wlan>0</wlan>
		<strength>0</strength>
	</bss>
	<led0>0</led0>
	<led1>0</led1>
	<led2>0</led2>
	<led3>0</led3>
	<led4>0</led4>
	<led5>0</led5>
	<led6>0</led6>
	<led7>0</led7>
	<btn0>up</btn0>
	<btn1>up</btn1>
	<btn2>up</btn2>
	<btn3>up</btn3>
	<pot0>0</pot0>
	<usr0>0</usr0>
	<temp0>0x73XF0x73XF</temp0>
	<time0> 0</time0>
 </response>
```
