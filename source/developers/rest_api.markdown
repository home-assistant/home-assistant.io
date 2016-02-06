---
layout: page
title: "RESTful API"
description: "Home Assistant RESTful API documentation"
date: 2014-12-21 13:27
sidebar: false
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
You can append <code>?api_password=YOUR_PASSWORD</code> to any url to log in automatically.
</p>

Successful calls will return status code 200 or 201. Other status codes that can return are:

 - 400 (Bad Request)
 - 401 (Unauthorized)
 - 404 (Not Found)
 - 405 (Method not allowed)

### {% linkable_title Actions %}

The API supports the following actions:

#### {% linkable_title GET /api/ %}
Returns message if API is up and running.

```json
{
  "message": "API running."
}
```

Sample `curl` command:

```bash
$ curl -X GET -H "x-ha-access: YOUR_PASSWORD" http://localhost:8123/api/
```

#### {% linkable_title GET /api/config %}
Returns the current configuration as JSON.

```json
{
    "components": [
        "recorder",
        "http",
        "sensor.time_date",
        "api",
        "frontend",
        "sun",
        "logbook",
        "history",
        "group",
        "automation"
    ],
    "latitude": 44.1234,
    "location_name": "Home",
    "longitude": 5.5678,
    "temperature_unit": "\u00b0C",
    "time_zone": "Europe/Zurich",
    "version": "0.8.0.dev0"
}
```

Sample `curl` command:

```bash
$ curl -X GET -H "x-ha-access: YOUR_PASSWORD" http://localhost:8123/api/config
```

#### {% linkable_title GET /api/bootstrap %}
Returns all data needed to bootstrap Home Assistant.

```json
{
    "config": {...},
    "events": [...],
    "services": [...],
    "states": [...]
}
```

Sample `curl` command:

```bash
$ curl -X GET -H "x-ha-access: YOUR_PASSWORD" http://localhost:8123/api/bootstrap
```

#### {% linkable_title GET /api/events %}
Returns an array of event objects. Each event object contain event name and listener count.

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
$ curl -X GET -H "x-ha-access: YOUR_PASSWORD" http://localhost:8123/api/events
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
$ curl -X GET -H "x-ha-access: YOUR_PASSWORD" http://localhost:8123/api/services
```

#### {% linkable_title GET /api/states %}
Returns an array of state objects. Each state has the following attributes: entity_id, state, last_changed and attributes.

```json
[
    {
        "attributes": {
            "next_rising": "07:04:15 29-10-2013",
            "next_setting": "18:00:31 29-10-2013"
        },
        "entity_id": "sun.sun",
        "last_changed": "23:24:33 28-10-2013",
        "state": "below_horizon"
    },
    {
        "attributes": {},
        "entity_id": "process.Dropbox",
        "last_changed": "23:24:33 28-10-2013",
        "state": "on"
    }
]
```

Sample `curl` command:

```bash
$ curl -X GET -H "x-ha-access: YOUR_PASSWORD" http://localhost:8123/api/states
```

#### {% linkable_title GET /api/states/&lt;entity_id> %}
Returns a state object for specified entity_id. Returns 404 if not found.

```json
{
    "attributes": {
        "next_rising": "07:04:15 29-10-2013",
        "next_setting": "18:00:31 29-10-2013"
    },
    "entity_id": "sun.sun",
    "last_changed": "23:24:33 28-10-2013",
    "state": "below_horizon"
}
```

Sample `curl` command:

```bash
$ curl -X GET -H "x-ha-access: YOUR_PASSWORD" \
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
       http://localhost:8123/api/error_log
```

#### {% linkable_title POST /api/states/&lt;entity_id> %}
Updates or creates the current state of an entity.

Expects a JSON object that has at least a state attribute:

```json
{
    "state": "below_horizon",
    "attributes": {
        "next_rising": "07:04:15 29-10-2013",
        "next_setting": "18:00:31 29-10-2013"
    }
}
```

Return code is 200 if the entity existed, 201 if the state of a new entity was set. A location header will be returned with the url of the new resource. The response body will contain a JSON encoded State object.

```json
{
    "attributes": {
        "next_rising": "07:04:15 29-10-2013",
        "next_setting": "18:00:31 29-10-2013"
    },
    "entity_id": "weather.sun",
    "last_changed": "23:24:33 28-10-2013",
    "state": "below_horizon"
}
```

Sample `curl` command:

```bash
$ curl -X POST -H "x-ha-access: YOUR_PASSWORD" \
       -d '{"state": "25", "attributes": {"unit_of_measurement": "°C"}}' \
       http://localhost:8123/api/states/sensor.kitchen_temperature
```

#### {% linkable_title POST /api/events/&lt;event_type> %}
Fires an event with event_type

You can pass an optional JSON object to be used as `event_data`.

```json
{
    "next_rising": "18:00:31 29-10-2013"
}
```

Returns a message if successful.

```json
{
    "message": "Event download_file fired."
}
```

#### {% linkable_title POST /api/services/&lt;domain>/&lt;service> %}
Calls a service within a specific domain. Will return when the service has been executed or 10 seconds has past, whichever comes first.

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
        "attributes": {
            "next_rising": "07:04:15 29-10-2013",
            "next_setting": "18:00:31 29-10-2013"
        },
        "entity_id": "sun.sun",
        "last_changed": "23:24:33 28-10-2013",
        "state": "below_horizon"
    },
    {
        "attributes": {},
        "entity_id": "process.Dropbox",
        "last_changed": "23:24:33 28-10-2013",
        "state": "on"
    }
]
```

Sample `curl` command:

```bash
$ curl -X POST -H "x-ha-access: YOUR_PASSWORD" \
       -d '{"entity_id": "switch.christmas_lights", "state": "on"}' \
       http://localhost:8123/api/services/switch/turn_on
```

<p class='note'>
The result will include any changed states that changed while the service was being executed, even if their change was the result of something else happening in the system.
</p>

#### {% linkable_title POST /api/template %}
Render a Home Assistant template. [See template docs for more information.](/getting-started/templating/)

```json
{
    "template": "Paulus is at {% raw %}{{ states('device_tracker.paulus') }}{% endraw %}!"
}
```

Returns the rendered template in plain text.

```text
Paulus is at work!
```

#### {% linkable_title POST /api/event_forwarding %}
Setup event forwarding to another Home Assistant instance.

Requires a JSON object that represents the API to forward to.

```json
{
    "host": "machine",
    "api_password": "my_super_secret_password",
    "port": 8880 // optional
}
```

It will return a message if event forwarding was setup successful.

```json
{
    "message": "Event forwarding setup."
}
```

#### {% linkable_title DELETE /api/event_forwarding %}
Cancel event forwarding to another Home Assistant instance.<br>

Requires a JSON object that represents the API to cancel forwarding to.

```json
{
    "host": "machine",
    "api_password": "my_super_secret_password",
    "port": 8880 // optional
}
```

It will return a message if event forwarding was cancelled successful.

```json
{
    "message": "Event forwarding cancelled."
}
```

<p class='note'>
If your client does not support <code>DELETE</code> HTTP requests you can add an optional attribute <code>_METHOD</code> and set its value to <code>DELETE</code>.
</p>

