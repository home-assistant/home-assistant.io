---
layout: page
title: "Awair Air Quality Monitor"
description: "Instructions on how to setup Awair devices in Home Assistant."
date: 2018-11-18 20:41
sidebar: true
comments: false
sharing: true
footer: true
logo: awair.jpg
ha_category: Health
ha_release: 0.83
ha_iot_class: "Cloud Polling"
---

The `awair` sensor platform will fetch data from your [Awair device(s)](https://getawair.com).

You will need to request access to the Awair API and obtain an access token from the Awair [Developer Console](https://developer.getawair.com/).

## {% linkable_title Configuring the Platform %}

To enable these sensors, add the following lines to your `configuration.yaml` file:

```yaml
sensor:
  - platform: awair
    access_token: ACCESS_TOKEN
```

The Awair API has stringent usage quotas. The API method to discover devices in your account is
limited to only 6 calls per 24 hours. If you find that you've exceeded this quota, you may optionally
append device information to your configuration to bypass this call:

```yaml
sensor:
  - platform: awair
    access_token: ACCESS_TOKEN
    devices:
      - uuid: UUID
        device_type: DEVICE_TYPE
        device_id: DEVICE_ID
        preference: PREFERENCE
        mac_address: MAC_ADDRESS
        room:
          id: ROOM_ID
          name: ROOM_NAME
          kind: ROOM_KIND
          Space:
            id: SPACE_ID
            kind: SPACE_KIND
            location:
              name: LOCATION_NAME
              lat: LOCATION_LATITUDE
              lon: LOCATION_LONGITUDE
```

Note that when specifying devices manually, only the `uuid`is required. The configuration will allow you to specify
other attributes returned by the API, but they are not strictly necessary.

{% configuration %}
access_token:
  description: The access token for the Awair API.
  required: true
  type: string
devices:
  description: An optional list of devices to manually configure rather than relying upon API discovery.
  required: false
  type: list
  keys:
    uuid:
      description: UUID of the Awair sensor to monitor.
      required: true
      type: string
    device_type:
      description: The API device type of the Awair sensor.
      required: false
      type: string
    device_id:
      description: The ID of the Awair sensor.
      required: false
      type: integer
    preference:
      description: The measurement preference, as returned by the API.
      required: false
      type: string
    mac_address:
      description: The MAC address of the Awair sensor. The format is lowercase, no octet separators.
      required: false
      type: string
    room:
      description: The room configured for the sensor.
      type: map
      required: false
      keys:
        id:
          description: The ID of the room, as returned by the API.
          required: false
          type: string
        name:
          description: The name of the room.
          required: false
          type: string
        kind:
          description: The room kind, as returned by the API.
          required: false
          type: string
        Space:
          description: The space configured for the sensor. The capitalization is required.
          required: false
          type: map
          keys:
            id:
              description: The ID of the space, as returned by the API.
              required: false
              type: string
            kind:
              description: The kind of space, as returned by the API.
              required: false
              type: string
            location:
              description: The location of this space.
              required: false
              type: map
              keys:
                name:
                  description: The name of the space location.
                  required: false
                  type: string
                lat:
                  description: The latitude of the space location.
                  required: false
                  type: float
                lon:
                  description: The longitude of the space location.
                  required: false
                  type: float
{% endconfiguration %}

## {% linkable_title Available Sensors %}

The platform will fetch all available sensors from each Awair device linked to your account. Supported sensors:

  * Temperature
  * Humidity
  * CO2
  * VOC
  * Dust, PM2.5, PM10: varies according to Awair model

This platform refreshes at an interval based on a 300 API call per-day quota, and the number of devices you have configured.
