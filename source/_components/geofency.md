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
ha_release: 0.83
ha_iot_class: "Cloud Push"
---

This component sets up integration with [Geofency](http://www.geofency.com/). Geofency is a [paid app](https://itunes.apple.com/app/id615538630) for iOS that lets users to configure a request that will be sent when a geofence or iBeacon region is entered or exited. This can be configured with Home Assistant to update your location.

Enabling this component will automatically enable the [Geofency Device Tracker](/components/device_tracker.geofency/).

To integrate Geofency in Home Assistant, add the following section to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
geofency:
```

{% configuration %}
mobile_beacons:
  description: List of beacon names that are to be treated as *mobile*. The name must match the name you configure in Geofency. By default, beacons will be treated as *stationary*.
  required: false
  type: list
{% endconfiguration %}

A full sample configuration for the `geofency` component is shown below:

```yaml
# Example configuration.yaml entry
geofency:
  mobile_beacons:
    - car
    - keys
```

To configure Geofency, you must set it up via the integrations panel in the configuration screen. You must then configure the iOS app (via the Webhook feature) to send a POST request to your Home Assistant server at the webhook URL provided by the integration during setup. Use the default POST format. Make sure to enable the 'Update Geo-Position' functionality for mobile beacons.
