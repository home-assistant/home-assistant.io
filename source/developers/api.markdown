---
layout: page
title: "Rest API"
description: "Home Assistant Rest API documentation"
date: 2014-12-21 13:27
sidebar: false
comments: false
sharing: true
footer: true
---

Home Assistant runs a web server accessible on port 8123.

  * http://127.0.0.1:8123/ is an interface to control Home Assistant.
  * http://localhost:8123/api/ is a Rest API.

In the package [`homeassistant.remote`](https://github.com/balloob/home-assistant/blob/master/homeassistant/remote.py) a Python API on top of the HTTP API can be found.

The API accepts and returns only JSON encoded objects. All API calls have to be accompanied by the header `X-HA-Access: YOUR_PASSWORD` (YOUR_PASSWORD as specified in your `configuration.yaml`).

<p class='note'>
You can append <code>?api_password=YOUR_PASSWORD</code> to any url to log in automatically.
</p>

Successful calls will return status code 200 or 201. Other status codes that can return are:

 - 400 (Bad Request)
 - 401 (Unauthorized)
 - 404 (Not Found)
 - 405 (Method not allowed)

The api supports the following actions:

#### {% linkable_title GET /api %}
Returns message if API is up and running.

```json
{
  "message": "API running."
}
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

#### {% linkable_title POST /api/states/&lt;entity_id> %}
Updates or creates the current state of an entity.

Expects a JSON object that has atleast a state attribute:

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

<p class='note'>
The result will include any changed states that changed while the service was being executed, even if their change was the result of something else happening in the system. 
</p>

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
