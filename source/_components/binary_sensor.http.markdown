---
layout: component
title: "HTTP Binary Sensor"
description: "Instructions how to integrate HTTP binary sensors within Home Assistant."
date: 2016-02-05 12:15
sidebar: true
comments: false
sharing: true
footer: true
logo: http.png
ha_category: Binary Sensor
---


The `http` binary sensor platform is not a real platform within the meaning of the terminology used around Home Assistant. Home Assistant's [REST API](/developers/rest_api/) is consuming and proceeding messages recieved over HTTP. 

To use those kind of sensors in your installation no configuration in Home Assistant is needed. All configuration is done on the devices themself. This means that you must be able to edit the target URL or endpoint and the payload. The entity will be created after the first message has arrived.

All [requests](/developers/rest_api/#post-apistatesltentity_id) needs to be sent to the endpoint of the device and must be **POST**. The URL looks like the example below:

```bash
http://IP_ADDRESS:8123/api/states/binary_sensor.DEVICE_NAME
```

It's suggested that you choose an unique device name to avoid clashes with other devices. The JSON payload must contain the new state and can have a friendly name. The friendly name is used in the frontend to name the sensor.

```json
{"state": "on", "attributes": {"friendly_name": "Radio"}}
```

For a quick test `curl` can be useful to "simulate" a device.

```bash
$ curl -X POST -H "x-ha-access: YOUR_PASSWORD" \
    -d '{"state": "off", "attributes": {"friendly_name": "Radio"}}' \
    http://localhost:8123/api/states/binary_sensor.radio
```

To check if the sensor is working, use again `curl` to retrieve the [current state](/developers/rest_api/#get-apistatesltentity_id).

```bash
$ curl -X GET -H "x-ha-access: YOUR_PASSWORD" \
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
      x-ha-access:YOUR_PASSWORD state=off \
      attributes:='{"friendly_name": "Radio"}'
```
