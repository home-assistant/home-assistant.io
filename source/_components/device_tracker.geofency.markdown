---
layout: page
title: "Geofency"
description: "Instructions for how to use Geofency to track devices in Home Assistant."
date: 2017-08-22 19:00
sidebar: true
comments: false
sharing: true
footer: true
logo: geofency.png
ha_category: Presence Detection
ha_release: 0.53
---

This platform allows you to detect presence using [Geofency](http://www.geofency.com/). Geofency is a [paid app](https://itunes.apple.com/app/id615538630) for iOS that lets users to configure a request that will be sent when a geofence or iBeacon region is entered or exited. This can be configured with Home Assistant to update your location.

To integrate Geofency in Home Assistant, add the following section to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
device_tracker:
  - platform: geofency
```

Configuration variables:

- **mobile_beacons** (*Optional*): List of beacon names that are to be treated as *mobile*. The name must match the name you configure in Geofency. By default, beacons will be treated as *stationary*.

A full sample configuration for the `geofency` platform is shown below:

```yaml
# Example configuration.yaml entry
device_tracker:
  - platform: geofency
    mobile_beacons:
      - car
      - keys
```

To configure Geofency, you must configure (via the Webhook feature) to send a POST request to your Home Assistant server at `http://<ha_server>/api/geofency`. Use the default POST format, and make sure to include the API password if you have configured a password in Home Assistant (add `?api_password=<password>` to the end of the URL). Make sure to enable the 'Update Geo-Position' functionality for mobile beacons.

Geofency will automatically generate the device tracker name used for geofences, and you will find it in `known_devices.yaml` after the first request. For beacons, the device name will be `beacon_<name from Geofency>`, e.g., `device_tracker.beacon_car`. 

When you enter a geofence or stationary beacon, your location name in Home Assistant will be set to the name of the geofence or beacon location in Geofency. When you exit a geofence or stationary beacon, your location name in Home Assistant will be set to 'not home'. For mobile beacons, the location name will be 'not_home' whenever the beacon is entered or exited outside of a [zone](https://home-assistant.io/components/zone/), otherwise, it will be set to the name of the zone.

To make Geofency work better with the [proximity](https://home-assistant.io/components/proximity/) component, you should enable the 'Send Current Location' feature in the Webhook configuration screen. This ensures that the _current_ GPS coordinates are included in exit events instead of the coordinates of the (center of) the zone that was exited.