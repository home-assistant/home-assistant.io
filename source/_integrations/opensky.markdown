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

Both events have five attributes:

- **icao24**: Unique ICAO 24-bit address of the transponder in hex string representation (e.g. *484b91*).
- **callsign**: Callsign of the flight (e.g. *KLM11B*).
- **flight**: Flight code (e.g. *KL1127*).
- **altitude**: Altitude of the flight in meters (e.g. *10363.2*).
- **sensor**: Name of `opensky` sensor that fired the event (default *opensky*).

Additionally attributes are provided as available from the OpenSky Network. Currently these are:

- **route**: Departure and Destination airport, e.g. *['EHAM','EKCH']*
- **updateTime**: e.g. *1601193499000*
- **operatorIata**: e.g. *KL*
- **flightNumber**: e.g. *1127*
- **registration**: e.g. *PH-BGK*
- **manufacturerName**: e.g. *Boeing*
- **manufacturerIcao**: e.g. *BOEING*
- **model**: e.g. *737NG 7K2/W*
- **typecode**: e.g. *B737*
- **serialNumber**: e.g. *38054*
- **lineNumber**: e.g. *0*
- **icaoAircraftClass**: e.g. *L2J*
- **selCal**:
- **operator**: e.g. *Wizz Air*
- **operatorCallsign**: e.g. *WIZZ AIR*
- **operatorIcao**: e.g. *WZZ*
- **owner**: e.g. *Klm Royal Dutch Airlines*
- **categoryDescription**: e.g. *No ADS-B Emitter Category Information*
- **registered**:
- **regUntil**:
- **status**:
- **built**:
- **firstFlightDate**:
- **engines**:
- **modes**:
- **adsb**:
- **acars**:
- **vdl**:
- **notes**:
- **country**: e.g. *Kingdom of the Netherlands*
- **lastSeen**:
- **firstSeen**:
- **timestamp**: *1527559200000*

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
      data:
        message: 'Flight entry of {{ trigger.event.data.callsign }}'
```

{% endraw %}
