---
layout: page
title: "RESTful API"
description: "Home Assistant RESTful API documentation"
date: 2014-12-21 13:27
sidebar: true
comments: false
sharing: true
footer: true
---

Home Assistant runs a web server accessible on port 8123.

  * http://IP_ADDRESS:8123/ is an interface to control Home Assistant.
  * http://IP_ADDRESS:8123/api/ is a Rest API.

The API accepts and returns only JSON encoded objects. All API calls have to be accompanied by the header `X-HA-Access: YOUR_PASSWORD` (YOUR_PASSWORD as specified in your `configuration.yaml` file in the [`http:` section](/components/http/)).

There are multiple ways to consume the Home Assistant Rest API. One is with `curl`:

```bash
curl -X GET \
    -H "x-ha-access: YOUR_PASSWORD" \
    -H "Content-Type: application/json" \
    http://IP_ADDRESS:8123/ENDPOINT
```

Another option is to use Python and the [Requests](http://docs.python-requests.org/en/latest/) module. 

```python
from requests import get

url = 'http://localhost:8123/ENDPOINT'
headers = {'x-ha-access': 'YOUR_PASSWORD',
           'content-type': 'application/json'}

response = get(url, headers=headers)
print(response.text)
```

<p class='note'>
You can append `?api_password=YOUR_PASSWORD` to any URL to log in automatically.
</p>

Successful calls will return status code 200 or 201. Other status codes that can return are:

 - 400 (Bad Request)
 - 401 (Unauthorized)
 - 404 (Not Found)
 - 405 (Method not allowed)

### {% linkable_title Actions %}

The API supports the following actions:

#### {% linkable_title GET /api/ %}
Returns a message if the API is up and running.

```json
{
  "message": "API running."
}
```

Sample `curl` command:

```bash
$ curl -X GET -H "x-ha-access: YOUR_PASSWORD" \
       -H "Content-Type: application/json" http://localhost:8123/api/
```

#### {% linkable_title GET /api/config %}
Returns the current configuration as JSON.

```json
{  
   "components":[  
      "sensor.cpuspeed",
      "frontend",
      "config.core",
      "http",
      "map",
      "api",
      "sun",
      "config",
      "discovery",
      "conversation",
      "recorder",
      "group",
      "sensor",
      "websocket_api",
      "automation",
      "config.automation",
      "config.customize"
   ],
   "config_dir":"/home/ha/.homeassistant",
   "elevation":510,
   "latitude":45.8781529,
   "location_name":"Home",
   "longitude":8.458853651,
   "time_zone":"Europe/Zurich",
   "unit_system":{  
      "length":"km",
      "mass":"g",
      "temperature":"\u00b0C",
      "volume":"L"
   },
   "version":"0.56.2",
   "whitelist_external_dirs":[  
      "/home/ha/.homeassistant/www",
      "/home/ha/.homeassistant/"
   ]
}
```

Sample `curl` command:

```bash
$ curl -X GET -H "x-ha-access: YOUR_PASSWORD" \
       -H "Content-Type: application/json" http://localhost:8123/api/config
```

#### {% linkable_title GET /api/discovery_info %}
Returns basic information about the Home Assistant instance as JSON.

```json
{
    "base_url": "http://192.168.0.2:8123",
    "location_name": "Home",
    "requires_api_password": true,
    "version": "0.56.2"
}
```

Sample `curl` command:

```bash
$ curl -X GET -H "x-ha-access: YOUR_PASSWORD" \
       -H "Content-Type: application/json" http://localhost:8123/api/discovery_info
```

#### {% linkable_title GET /api/events %}
Returns an array of event objects. Each event object contains event name and listener count.

```json
[
    {
      "event": "state_changed",
      "listener_count": 5
    },
    {
      "event": "time_changed",
      "listener_count": 2
    }
]
```

Sample `curl` command:

```bash
$ curl -X GET -H "x-ha-access: YOUR_PASSWORD" \
       -H "Content-Type: application/json" http://localhost:8123/api/events
```

#### {% linkable_title GET /api/services %}
Returns an array of service objects. Each object contains the domain and which services it contains.

```json
[
    {
      "domain": "browser",
      "services": [
        "browse_url"
      ]
    },
    {
      "domain": "keyboard",
      "services": [
        "volume_up",
        "volume_down"
      ]
    }
]
```

Sample `curl` command:

```bash
$ curl -X GET -H "x-ha-access: YOUR_PASSWORD" \
       -H "Content-Type: application/json" http://localhost:8123/api/services
```

#### {% linkable_title GET /api/history/period/&lt;timestamp> %}
Returns an array of state changes in the past. Each object contains further details for the entities.

The `<timestamp>` (`YYYY-MM-DDThh:mm:ssTZD`) is optional and defaults to 1 day before the time of the request. It determines the beginning of the period.

You can pass the following optional GET parameters:
  - `filter_entity_id=<entity_id>` to filter on a single entity
  - `end_time=<timestamp>` to choose the end of the period in URL encoded format (defaults to 1 day).

```json
[
    [
        {
            "attributes": {
                "friendly_name": "Weather Temperature",
                "unit_of_measurement": "\u00b0C"
            },
            "entity_id": "sensor.weather_temperature",
            "last_changed": "2016-02-06T22:15:00+00:00",
            "last_updated": "2016-02-06T22:15:00+00:00",
            "state": "-3.9"
        },
        {
            "attributes": {
                "friendly_name": "Weather Temperature",
                "unit_of_measurement": "\u00b0C"
            },
            "entity_id": "sensor.weather_temperature",
            "last_changed": "2016-02-06T22:15:00+00:00",
            "last_updated": "2016-02-06T22:15:00+00:00",
            "state": "-1.9"
        },
    ]
]
```

Sample `curl` commands:

```bash
$ curl -X GET -H "x-ha-access: YOUR_PASSWORD" \
       -H "Content-Type: application/json" \
       http://localhost:8123/api/history/period/2016-12-29T00:00:00+02:00
```

```bash
$ curl -X GET -H "x-ha-access: YOUR_PASSWORD" \
       -H "Content-Type: application/json" \
       http://localhost:8123/api/history/period/2016-12-29T00:00:00+02:00?filter_entity_id=sensor.temperature
```

```bash
$ curl -X GET -H "x-ha-access: YOUR_PASSWORD" \
       -H "Content-Type: application/json" \
       http://localhost:8123/api/history/period/2016-12-29T00:00:00+02:00?end_time=2016-12-31T00%3A00%3A00%2B02%3A00
```

#### {% linkable_title GET /api/states %}
Returns an array of state objects. Each state has the following attributes: entity_id, state, last_changed and attributes.

```json
[
    {
        "attributes": {},
        "entity_id": "sun.sun",
        "last_changed": "2016-05-30T21:43:32.418320+00:00",
        "state": "below_horizon"
    },
    {
        "attributes": {},
        "entity_id": "process.Dropbox",
        "last_changed": "22016-05-30T21:43:32.418320+00:00",
        "state": "on"
    }
]
```

Sample `curl` command:

```bash
$ curl -X GET -H "x-ha-access: YOUR_PASSWORD" \
       -H "Content-Type: application/json" http://localhost:8123/api/states
```

#### {% linkable_title GET /api/states/&lt;entity_id> %}
Returns a state object for specified entity_id. Returns 404 if not found.

```json
{
   "attributes":{
      "azimuth":336.34,
      "elevation":-17.67,
      "friendly_name":"Sun",
      "next_rising":"2016-05-31T03:39:14+00:00",
      "next_setting":"2016-05-31T19:16:42+00:00"
   },
   "entity_id":"sun.sun",
   "last_changed":"2016-05-30T21:43:29.204838+00:00",
   "last_updated":"2016-05-30T21:50:30.529465+00:00",
   "state":"below_horizon"
}
```

Sample `curl` command:

```bash
$ curl -X GET -H "x-ha-access: YOUR_PASSWORD" \
       -H "Content-Type: application/json" \
       http://localhost:8123/api/states/sensor.kitchen_temperature
```

#### {% linkable_title GET /api/error_log %}
Retrieve all errors logged during the current session of Home Assistant as a plaintext response.

```text
15-12-20 11:02:50 homeassistant.components.recorder: Found unfinished sessions
15-12-20 11:03:03 netdisco.ssdp: Error fetching description at http://192.168.1.1:8200/rootDesc.xml
15-12-20 11:04:36 homeassistant.components.alexa: Received unknown intent HelpIntent
```

Sample `curl` command:

```bash
$ curl -X GET -H "x-ha-access: YOUR_PASSWORD" \
       -H "Content-Type: application/json" \
       http://localhost:8123/api/error_log
```

#### {% linkable_title GET /api/camera_proxy/camera.&lt;entity_id> %}
Returns the data (image) from the specified camera entity_id.

Sample `curl` command:

```bash
$ curl -X GET -H "x-ha-access: YOUR_PASSWORD" \
       -H "Content-Type: application/json" \
       http://localhost:8123/api/camera_proxy/camera.my_sample_camera?time=1462653861261 -o image.jpg
```

#### {% linkable_title POST /api/states/&lt;entity_id> %}
Updates or creates the current state of an entity.

Expects a JSON object that has at least a state attribute:

```json
{
    "state": "below_horizon",
    "attributes": {
        "next_rising":"2016-05-31T03:39:14+00:00",
        "next_setting":"2016-05-31T19:16:42+00:00"
    }
}
```

The return code is 200 if the entity existed, 201 if the state of a new entity was set. A location header will be returned with the URL of the new resource. The response body will contain a JSON encoded State object.

```json
{
    "attributes": {
        "next_rising":"2016-05-31T03:39:14+00:00",
        "next_setting":"2016-05-31T19:16:42+00:00"
    },
    "entity_id": "sun.sun",
    "last_changed": "2016-05-30T21:43:29.204838+00:00",
    "last_updated": "2016-05-30T21:47:30.533530+00:00",
    "state": "below_horizon"
}
```

Sample `curl` command:

```bash
$ curl -X POST -H "x-ha-access: YOUR_PASSWORD" \
       -H "Content-Type: application/json" \
       -d '{"state": "25", "attributes": {"unit_of_measurement": "°C"}}' \
       http://localhost:8123/api/states/sensor.kitchen_temperature
```

#### {% linkable_title POST /api/events/&lt;event_type> %}
Fires an event with event_type

You can pass an optional JSON object to be used as `event_data`.

```json
{
    "next_rising":"2016-05-31T03:39:14+00:00",
}
```

Returns a message if successful.

```json
{
    "message": "Event download_file fired."
}
```

#### {% linkable_title POST /api/services/&lt;domain>/&lt;service> %}
Calls a service within a specific domain. Will return when the service has been executed or after 10 seconds, whichever comes first.

You can pass an optional JSON object to be used as `service_data`.

```json
{
    "entity_id": "light.Ceiling"
}
```

Returns a list of states that have changed while the service was being executed.

```json
[
    {
        "attributes": {},
        "entity_id": "sun.sun",
        "last_changed": "2016-05-30T21:43:32.418320+00:00",
        "state": "below_horizon"
    },
    {
        "attributes": {},
        "entity_id": "process.Dropbox",
        "last_changed": "22016-05-30T21:43:32.418320+00:00",
        "state": "on"
    }
]
```

Sample `curl` commands:

Turn the light on:

```bash
$ curl -X POST -H "x-ha-access: YOUR_PASSWORD" \
       -H "Content-Type: application/json" \
       -d '{"entity_id": "switch.christmas_lights"}' \
       http://localhost:8123/api/services/switch/turn_on
```

Send a MQTT message:

```bash
$ curl -X POST \
     -H "Content-Type: application/json" \
     -H "x-ha-access:YOUR_PASSWORD" \
     -d '{"payload": "OFF", "topic": "home/fridge", "retain": "True"}' \
     http://localhost:8123/api/services/mqtt/publish
```

<p class='note'>
The result will include any states that changed while the service was being executed, even if their change was the result of something else happening in the system.
</p>

#### {% linkable_title POST /api/template %}
Render a Home Assistant template. [See template docs for more information.](/topics/templating/)

```json
{
    "template": "Paulus is at {% raw %}{{ states('device_tracker.paulus') }}{% endraw %}!"
}
```

Returns the rendered template in plain text.

```text
Paulus is at work!
```

Sample `curl` command:

```bash
$ curl -X POST -H "x-ha-access: YOUR_PASSWORD" \
       -H "Content-Type: application/json" \
       -d '{"template": "It is {{ now }}!"}' http://localhost:8123/api/template
```

#### {% linkable_title POST /api/event_forwarding %}
Set up event forwarding to another Home Assistant instance.

Requires a JSON object that represents the API to forward to.

```javascript
{
    "host": "machine",
    "api_password": "my_super_secret_password",
    "port": 8880 // optional
}
```

It will return a message if event forwarding was set up successfully.

```json
{
    "message": "Event forwarding setup."
}
```

#### {% linkable_title DELETE /api/event_forwarding %}
Cancel event forwarding to another Home Assistant instance.<br>

Requires a JSON object that represents the API to cancel forwarding to.

```javascript
{
    "host": "machine",
    "api_password": "my_super_secret_password",
    "port": 8880 // optional
}
```

It will return a message if event forwarding was cancelled successfully.

```json
{
    "message": "Event forwarding cancelled."
}
```

<p class='note'>
If your client does not support <code>DELETE</code> HTTP requests you can add an optional attribute <code>_METHOD</code> and set its value to <code>DELETE</code>.
</p>

