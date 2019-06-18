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
ha_category:
  - Presence Detection
ha_release: 0.53
ha_iot_class: Cloud Push
redirect_from:
  - /components/device_tracker.geofency/
---

This component sets up integration with [Geofency](http://www.geofency.com/). Geofency is a [paid app](https://itunes.apple.com/app/id615538630) for iOS that lets users to configure a request that will be sent when a geofence or iBeacon region is entered or exited. This can be configured with Home Assistant to update your location.

Enabling this component will automatically enable the Geofency Device Tracker.

## {% linkable_title Configuration %}

To configure Geofency, you must set it up via the integrations panel in the configuration screen. You must then configure the iOS app (via the Webhook feature) to send a POST request to your Home Assistant server at the webhook URL provided by the integration during setup. Use the default POST format. Make sure to enable the 'Update Geo-Position' functionality for mobile beacons.

Geofency will automatically generate the device tracker name used for geofences, and you will find it in `known_devices.yaml` after the first request. For beacons, the device name will be `beacon_<name from Geofency>`, e.g., `device_tracker.beacon_car`.

When using mobile beacons (optional) an entry in `configuration.yaml` is still needed as this can't be added via the integrations panel.

{% configuration %}
mobile_beacons:
  description: List of beacon names that are to be treated as *mobile*. The name must match the name you configure in Geofency. By default, beacons will be treated as *stationary*.
  required: false
  type: list
{% endconfiguration %}

A sample configuration for the `geofency` component when using mobile beacons is shown below:

```yaml
# Example configuration.yaml entry
geofency:
  mobile_beacons:
    - car
    - keys
```

### {% linkable_title Zones %}

When you enter a geofence or stationary beacon, your location name in Home Assistant will be set to the name of the geofence or beacon location in Geofency. When you exit a geofence or stationary beacon, your location name in Home Assistant will be set to `not home`. For mobile beacons, the location name will be `not_home` whenever the beacon is entered or exited outside of a [zone](/components/zone/), otherwise, it will be set to the name of the zone.

To make Geofency work better with the [proximity](/components/proximity/) component, you should enable the 'Send Current Location' feature in the Webhook configuration screen. This ensures that the _current_ GPS coordinates are included in exit events instead of the coordinates of the (center of) the zone that was exited.