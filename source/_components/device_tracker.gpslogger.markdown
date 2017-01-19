---
layout: page
title: "GPSLogger"
description: "Instructions how to use GPSLogger to track devices in Home Assistant."
date: 2016-11-25 15:00
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Presence Detection
ha_release: 0.34
---

This platform allows you to detect presence using [GPSLogger](http://code.mendhak.com/gpslogger/). GPSLogger is an open source app for [Android](https://play.google.com/store/apps/details?id=com.mendhak.gpslogger) that allows users to set up a `GET` request to update GPS coordinates. This can be configured with Home Assistant to update your location.

To integrate GPSLogger in Home Assistant, add the following section to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
device_tracker:
  - platform: gpslogger
```

## {% linkable_title Setup on your smartphone %}

- [GPSLogger for Android](https://play.google.com/store/apps/details?id=com.mendhak.gpslogger)

To configure GPSLogger, you must set up the app to send a `GET` request to your Home Assistant server at 
```yaml
`http://<ha_server>/api/gpslogger?latitude=%LAT&longitude=%LON&device=%SER&accuracy=%ACC&battery=%BATT&speed=%SPD&direction=%DIR&altitude=%ALT&provider=%PROV&activity=%ACT`
```
. Make sure to include the API password if you have configured a password in Home Assistant (add `&api_password=<password>` to the end of the URL). Configure that options under "General Options":

- Start on boot: yes
- Start on app launch: yes

Set the URL under "General Options -> Logging details":

- Log to GPX: no
- Log to KML: no
- Log to custom URL: yes and set 
```yaml
`http://<ha_server>/api/gpslogger?latitude=%LAT&longitude=%LON&device=%SER&accuracy=%ACC&battery=%BATT&speed=%SPD&direction=%DIR&altitude=%ALT&provider=%PROV&activity=%ACT` (be sure you include API password (`&api_password=<password>`) if needed, or you can also use HTTP Basic authentication `http://<username>:<password>@<ha_server>/api/gpslogger...`)
```
- Log to OpenGTS Server: no
- Log to Plain Text: no
- Log to NMEA: no

You should also tune GPSLogger performance to save your battery under "General Options -> Logging details -> Performance -> Location providers":

- GPS: no
- Network: no
- Passive: yes

A request can be forced from the app to test if everything is working fine. A succesfull request will update `known_devices.yaml` with device serial number.
