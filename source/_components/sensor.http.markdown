---
layout: page
title: "HTTP Sensor"
description: "Instructions on how to integrate HTTP sensors within Home Assistant."
date: 2016-02-05 12:15
sidebar: true
comments: false
sharing: true
footer: true
logo: http.png
ha_category: Sensor
ha_release: pre 0.7
ha_iot_class: "Local Push"
---


The HTTP sensor is dynamically created with the first request that is made to its URL. You don't have to define it in the configuration first.
 
The sensor will then exist as long as Home Assistant is running. After a restart of Home Assistant the sensor will be gone until it is triggered again.

The URL for a sensor looks like the example below:

```bash
http://IP_ADDRESS:8123/api/states/sensor.DEVICE_NAME
```

<p class='note'>
You should choose a unique device name (DEVICE_NAME) to avoid clashes with other devices.
</p>

 The JSON payload must contain the new state and should include the unit of measurement and a friendly name. The friendly name is used in the frontend to name the sensor.

```json
{"state": "20", "attributes": {"unit_of_measurement": "°C", "friendly_name": "Bathroom Temperature"}}
```

For a quick test, `curl` can be useful to "simulate" a device.

```bash
$ curl -X POST -H "x-ha-access: YOUR_PASSWORD" \
       -H "Content-Type: application/json" \
       -d '{"state": "20", "attributes": {"unit_of_measurement": "°C", "friendly_name": "Bathroom Temp"}}' \
       http://localhost:8123/api/states/sensor.bathroom_temperature
```

You can then use `curl` again to retrieve the [current sensor state](/developers/rest_api/#get-apistatesltentity_id) and verify the sensor is working.

```bash
$ curl -X GET -H "x-ha-access: YOUR_PASSWORD" \
       -H "Content-Type: application/json" \
       http://localhost:8123/api/states/sensor.bathroom_temperature
{
    "attributes": {
        "friendly_name": "Bathroom Temp",
        "unit_of_measurement": "\u00b0C"
    },
    "entity_id": "sensor.bathroom_temperature",
    "last_changed": "09:46:17 06-02-2016",
    "last_updated": "09:48:46 06-02-2016",
    "state": "20"
}
```

For more examples please visit the [HTTP Binary Sensor](/components/binary_sensor.http/#examples) page.
