---
layout: page
title: "Rest API"
date: 2014-12-21 13:27
sidebar: false
comments: true
sharing: true
footer: true
---

Home Assistent runs a webserver accessible on port 8123.

  * http://127.0.0.1:8123/ is an interface to control Home Assistant.
  * http://localhost:8123/api/ is a Rest API.

In the package [`homeassistant.remote`](https://github.com/balloob/home-assistant/blob/master/homeassistant/remote.py) a Python API on top of the HTTP API can be found.

The API accepts and returns only JSON encoded objects. All API calls have to be accompanied by the header `X-HA-Access: YOUR_PASSWORD` (as specified in your `home-assistant.conf`).

<div class='note'><p class='title'>Note</p><p class='content'>
You can append <code>?api_password=YOUR_PASSWORD</code> to any url to log in automatically.
</p></div>

Successful calls will return status code 200 or 201. Other status codes that can return are:

 - 400 (Bad Request)
 - 401 (Unauthorized)
 - 404 (Not Found)
 - 405 (Method not allowed)

The api supports the following actions:

**/api - GET**<br>
Returns message if API is up and running.

```json
{
  "message": "API running."
}
```

**/api/events - GET**<br>
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

**/api/services - GET**<br>
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

**/api/states - GET**<br>
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

**/api/states/&lt;entity_id>** - GET<br>
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

**/api/states/&lt;entity_id>** - POST<br>
Updates or creates the current state of an entity.

Return code is 200 if the entity existed, 201 if the state of a new entity was set. A location header will be returned with the url of the new resource. The response body will contain a JSON encoded State object.<br>
<br>
parameter: state - string<br>
optional parameter: attributes - JSON object

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

**/api/events/&lt;event_type>** - POST<br>
Fires an event with event_type<br>
optional body: JSON encoded object that represents event_data

```json
{
    "message": "Event download_file fired."
}
```

**/api/services/&lt;domain>/&lt;service>** - POST<br>
Calls a service within a specific domain. Will return when the service has been executed or 10 seconds has past, whichever comes first.<br>
optional body: JSON encoded object that represents service_data

Returns a list of states that have changed since the start of this service call.

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

**/api/event_forwarding** - POST<br>
Setup event forwarding to another Home Assistant instance.<br>
parameter: host - string<br>
parameter: api_password - string<br>
optional parameter: port - int<br>

```json
{
    "message": "Event forwarding setup."
}
```

**/api/event_forwarding** - DELETE<br>
Cancel event forwarding to another Home Assistant instance.<br>
parameter: host - string<br>
optional parameter: port - int<br>

If your client does not support DELETE HTTP requests you can add an optional attribute _METHOD and set its value to DELETE.

```json
{
    "message": "Event forwarding cancelled."
}
```
