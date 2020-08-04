---
title: OpenSky Network
description: Instructions on how to integrate OpenSky Network into Home Assistant.
ha_category:
  - Transport
ha_release: 0.43
ha_iot_class: Cloud Polling
ha_domain: opensky
---

The `opensky` sensor allows one to track overhead flights in a given region. It uses crowd-sourced data from the [OpenSky Network](https://opensky-network.org/) public API. It will also fire Home Assistant events when flights enter and exit the defined region.

## Configuration

To enable this sensor, add the following lines to your `configuration.yaml` file:

```yaml
sensor:
  - platform: opensky
    radius: 10
```

Configuration options for the OpenSky Network sensor:

- **radius** (*Required*): Radius of region to monitor, in kilometers.
- **latitude** (*Optional*): Region latitude. Defaults to home zone latitude.
- **longitude** (*Optional*): Region longitude. Defaults to home zone longitude.
- **altitude** (*Optional*): The maximum altitude (in meters) for planes to be detected in, 0 sets it to unlimited. Defaults to 0).
- **name** (*Optional*): Sensor name. Defaults to opensky.

## Events

- **opensky_entry**: Fired when a flight enters the region.
- **opensky_exit**: Fired when a flight exits the region.

Events include attributes forwarded from the [OpenSky Network API](https://opensky-network.org/apidoc/rest.html#response):

- **icao24**: Unique ICAO 24-bit address of the transponder in hex string representation.
- **callsign**: Callsign of the vehicle (8 chars). Can be null if no callsign has been received.
- **origin_country**: Country name inferred from the ICAO 24-bit address.
- **time_position**: Unix timestamp (seconds) for the last position update. Can be null if no position report was received by OpenSky within the past 15s.
- **last_contact**: Unix timestamp (seconds) for the last update in general. This field is updated for any new, valid message received from the transponder.
- **longitude**: WGS-84 longitude in decimal degrees. Can be null.
- **latitude**: WGS-84 latitude in decimal degrees. Can be null.
- **altitude**: Barometric altitude in meters. Can be null.
- **on_ground**: Boolean value which indicates if the position was retrieved from a surface position report.
- **velocity**: Velocity over ground in m/s. Can be null.
- **true_track**: True track in decimal degrees clockwise from north (north=0°). Can be null.
- **vertical_rate**: Vertical rate in m/s. A positive value indicates that the airplane is climbing, a negative value indicates that it descends. Can be null.
- **sensors**: IDs of the receivers which contributed to this state vector. Is null if no filtering for sensor was used in the request.
- **geo_altitude**: Geometric altitude in meters. Can be null.
- **squawk**: The transponder code aka Squawk. Can be null.
- **spi**: Whether flight status indicates special purpose indicator.
- **position_source**: Origin of this state’s position: 0 = ADS-B, 1 = ASTERIX, 2 = MLAT

Additionally, the following attribute is available:

- **sensor**: Name of `opensky` sensor that fired the event.

To receive notifications of the entering flights using the [Home Assistant Companion App](https://companion.home-assistant.io/), add the following lines to your `configuration.yaml` file:

{% raw %}
```yaml
automation:
  - alias: 'Flight entry notification'
    trigger:
      platform: event
      event_type: opensky_entry
    action:
      service: notify.mobile_app_<device_name>
      data_template:
        message : 'Flight entry of {{ trigger.event.data.callsign }} '
```
{% endraw %}
