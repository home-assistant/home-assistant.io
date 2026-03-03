---
title: Geofency
description: Instructions for how to use Geofency to track devices in Home Assistant.
ha_category:
  - Presence detection
ha_release: 0.53
ha_iot_class: Cloud Push
ha_config_flow: true
ha_domain: geofency
ha_platforms:
  - device_tracker
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
---

This {% term integration %} sets up integration with [Geofency](https://www.geofency.com/). Geofency is a paid app for iOS that lets users to configure a request that will be sent when a geofence or iBeacon region is entered or exited. This can be configured with Home Assistant to update your location.

## Configuration

To configure Geofency, you must set it up via the integrations panel in the configuration screen. You must then configure the iOS app (via the Webhook feature) to send a POST request to your Home Assistant instance at the webhook URL provided by the integration during setup. Use the default POST format. Make sure to enable the 'Update Geo-Position' functionality for mobile beacons.

Geofency will automatically generate the device tracker name used for geofences, and you will find it in the integrations section after the first request. For beacons, the device name will be `beacon_<name from Geofency>`, e.g., `device_tracker.beacon_car`.

When using mobile beacons (optional) an entry in {% term "`configuration.yaml`" %} file is still needed as this can't be added via the integrations panel.
{% include integrations/restart_ha_after_config_inclusion.md %}

{% configuration %}
mobile_beacons:
  description: List of beacon names that are to be treated as *mobile*. The name must match the name you configure in Geofency. By default, beacons will be treated as *stationary*.
  required: false
  type: list
{% endconfiguration %}

A sample configuration for the `geofency` integration when using mobile beacons is shown below:

```yaml
# Example configuration.yaml entry
geofency:
  mobile_beacons:
    - car
    - keys
```

### Zones

When you enter a geofence or stationary beacon, your location name in Home Assistant will be set to the name of the geofence or beacon location in Geofency. When you exit a geofence or stationary beacon, your location name in Home Assistant will be set to `not home`. For mobile beacons, the location name will be `not_home` whenever the beacon is entered or exited outside of a [zone](/integrations/zone/), otherwise, it will be set to the name of the zone.

To make Geofency work better with the [proximity](/integrations/proximity/) integration, you should enable the 'Send Current Location' feature in the Webhook configuration screen. This ensures that the _current_ GPS coordinates are included in exit events instead of the coordinates of the (center of) the zone that was exited.
