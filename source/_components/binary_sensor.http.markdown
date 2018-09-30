---
layout: page
title: "HTTP Binary Sensor"
description: "Instructions on how to integrate HTTP binary sensors within Home Assistant."
date: 2016-02-05 12:15
sidebar: true
comments: false
sharing: true
footer: true
logo: http.png
ha_category: Binary Sensor
ha_release: pre 0.7
---

The HTTP binary sensor is dynamically created with the first request that is made to its URL. You don't have to define it in the configuration first.

The sensor will then exist as long as Home Assistant is running. After a restart of Home Assistant the sensor will be gone until it is triggered again.

The URL for a binary sensor looks like the example below:

```bash
http://IP_ADDRESS:8123/api/states/binary_sensor.DEVICE_NAME
```

<p class='note'>
You should choose a unique device name (DEVICE_NAME) to avoid clashes with other devices.
</p>

The JSON payload must contain the new state and can have a friendly name. The friendly name is used in the frontend to name the sensor.

```json
{"state": "on", "attributes": {"friendly_name": "Radio"}}
```

For a quick test `curl` can be useful to "simulate" a device.

```bash
$ curl -X POST -H "x-ha-access: YOUR_PASSWORD" \
    -H "Content-Type: application/json" \
    -d '{"state": "off", "attributes": {"friendly_name": "Radio"}}' \
    http://localhost:8123/api/states/binary_sensor.radio
```

To check if the sensor is working, use again `curl` to retrieve the [current state](/developers/rest_api/#get-apistatesltentity_id).

```bash
$ curl -X GET -H "x-ha-access: YOUR_PASSWORD" \
       -H "Content-Type: application/json" \
       http://localhost:8123/api/states/binary_sensor.radio
{
    "attributes": {
        "friendly_name": "Radio"
    },
    "entity_id": "binary_sensor.radio",
    "last_changed": "16:45:51 05-02-2016",
    "last_updated": "16:45:51 05-02-2016",
    "state": "off"
}
```

## {% linkable_title Examples %}

In this section you find some real life examples of how to use this sensor. Beside `curl`.

### {% linkable_title Using Python request module %}

As already shown on the [API](/developers/rest_api/) page, it's very simple to use Python and the [Requests](http://docs.python-requests.org/en/latest/) module for the interaction with Home Assistant.

```python
response = requests.post(
        'http://localhost:8123/api/states/binary_sensor.radio',
        headers={'x-ha-access': 'YOUR_PASSWORD', 'content-type': 'application/json'},
        data=json.dumps({'state': 'on', 'attributes': {'friendly_name': 'Radio'}}))
print(response.text)
```

### {% linkable_title Using `httpie` %}

[`httpie`](https://github.com/jkbrzt/httpie) is a user-friendly CLI HTTP client.

```bash
$ http -v POST http://localhost:8123/api/states/binary_sensor.radio \
      x-ha-access:YOUR_PASSWORD content-type:application/json state=off \
      attributes:='{"friendly_name": "Radio"}'
```
