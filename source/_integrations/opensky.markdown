---
title: OpenSky Network
description: Instructions on how to integrate OpenSky Network into Home Assistant.
ha_category:
  - Transport
ha_release: 0.43
ha_iot_class: Cloud Polling
ha_domain: opensky
ha_platforms:
  - sensor
ha_integration_type: integration
ha_codeowners:
  - '@joostlek'
---

The OpenSky integration allows one to track overhead flights in a given region. It uses crowd-sourced data from the [OpenSky Network](https://opensky-network.org/) public API. It will also fire Home Assistant events when flights enter and exit the defined region.

{% include integrations/config_flow.md %}

## Events

- **opensky_entry**: Fired when a flight enters the region.
- **opensky_exit**: Fired when a flight exits the region.

Both events have four attributes:

- **sensor**: Name of `opensky` sensor that fired the event.
- **callsign**: Callsign of the flight.
- **altitude**: Altitude of the flight in meters.
- **icao24**: The ICAO 24-bit address of the aircraft's transponder.

To receive notifications of the entering flights using the [Home Assistant Companion App](https://companion.home-assistant.io/), add the following lines to your `configuration.yaml` file:

{% raw %}

```yaml
automation:
  - alias: "Flight entry notification"
    trigger:
      platform: event
      event_type: opensky_entry
    action:
      service: notify.mobile_app_<device_name>
      data:
        message: "Flight entry of {{ trigger.event.data.callsign }}"
```
{% endraw %}

One can also get a direct link to the OpenSky website to see the flight using the icao24 identification:

{% raw %}

```yaml
automation:
  - alias: "Flight entry notification"
    trigger:
      platform: event
      event_type: opensky_entry
    action:
      service: notify.mobile_app_<device_name>
      data:
        message: "Flight entry of {{ trigger.event.data.callsign }}"
        data:
          actions:
            - action: URI
              title: Track the flight
              uri: >-
                https://opensky-network.org/aircraft-profile?icao24={{
                trigger.event.data.icao24 }}
```
{% endraw %}
