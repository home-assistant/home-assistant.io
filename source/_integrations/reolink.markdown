---
title: Reolink IP NVR/camera
description: Instructions on how to integrate Reolink devices (NVR/cameras) into Home Assistant.
ha_category:
  - Camera
  - Update
ha_iot_class: Local Push
ha_release: 2023.1
ha_domain: reolink
ha_codeowners:
  - '@starkillerOG'
ha_config_flow: true
ha_platforms:
  - binary_sensor
  - button
  - camera
  - light
  - number
  - select
  - siren
  - switch
  - update
ha_integration_type: integration
ha_dhcp: true
---

The integration allows you to control [Reolink](https://reolink.com/) NVRs or cameras.

{% include integrations/config_flow.md %}

A Reolink user account with admin privileges is needed for the proper operation of this integration.

{% include integrations/option_flow.md %}
{% configuration_basic %}
Protocol:
  description: Switch between RTSP, RTMP or FLV streaming protocol.
{% endconfiguration_basic %}

## Camera streams

This integration creates a few camera entities, one for each stream type with different resolutions: Main, Sub, Ext, and Snapshots.
The Sub stream camera entity is enabled by default; the other streams are disabled by default.
The Images stream provides a sequence of image snapshots giving very low latency at the cost of a very low frame rate; this can be used when the RTMP/RTSP/FLV video stream has too much lag.

## Binary sensors

Depending on the supported features of the camera, binary sensors are added for:

- Motion detection
- Doorbell presses
- AI person detection
- AI vehicle detection
- AI pet detection
- AI face detection

These sensors are polled every 60 seconds and receive ONVIF push events for immediate updates.
Not all camera models generate ONVIF push events for all event types, some binary sensors might, therefore, only be polled.
For list of Reolink products that support ONVIF see the [Reolink Support Site](https://support.reolink.com/hc/en-us/articles/900000617826).

## Number entities

Depending on the supported features of the camera, number entities are added for:

- Optical zoom control
- Focus control
- Floodlight turn on brightness
- Volume
- Guard return time
- Motion sensitivity
- AI face sensitivity
- AI people sensitivity
- AI vehicle sensitivity
- AI pet sensitivity
- Auto quick reply time
- Auto track limit left
- Auto track limit right
- Auto track disappear time
- Auto track stop time

"Floodlight turn on brightness" controls the brightness of the floodlight when it is turned on internally by the camera (see "Floodlight mode" select entity) or when using the "Floodlight" light entity.

When the camera is not moved and no person/pet/vehicle is detected for the "Guard return time" in seconds, and the "Guard return" switch is ON, the camera will move back to the guard position.

When a Reolink doorbell is pressed the quick reply message from the "Auto quick reply message" select entity will be played after "Auto quick reply time" seconds, unless the "Auto quick reply message" is set to off.

If the "Auto tracking" switch entity is enabled, and a object disappears from view OR stops moving for the "Auto track disappear time"/"Auto track stop time", the camera goes back to its original position.

## Button entities

Depending on the supported features of the camera, button entities are added for:

- PTZ stop
- PTZ left
- PTZ right
- PTZ up
- PTZ down
- PTZ calibrate
- Guard go to
- Guard set current position

PTZ left, right, up and down will continually move the camera in the respective position until the PTZ stop is called or the hardware limit is reached.

"Guard set current position" will set the current position as the new guard position.

## Select entities

Depending on the supported features of the camera, select entities are added for:

- Floodlight mode (Off, Auto, Schedule)
- Day night mode (Auto, Color, Black&White)
- PTZ preset
- Auto quick reply message
- Auto track method (Digital, Digital first, Pan/Tilt first)
- Status LED (Doorbell only: Stay off, Auto, Auto & always on at night)

PTZ preset positions can be set in the Reolink app/windows/web client, the names of the presets will be loaded into Home Assistant at the start of the integration. When adding new preset positions, please restart the Reolink integration.

Auto quick reply messages can be recorded in the Reolink app where a name is also supplied. New or updated quick reply messages will be loaded into Home Assistant at the start of the integration. When adding new quick reply messages, please restart the Reolink integration.

## Siren entities

If the camera supports a siren, a siren entity will be created.
When using the siren turn-on service, the siren will continue to sound until the siren turn-off service is called.

In some camera models, there is a delay of up to 5 seconds between the turn-off command and the sound stopping. The siren turn-on service supports setting a volume and a duration (no turn-off service call is needed in that case).

## Switch entities

Depending on the supported features of the camera, switch entities are added for:

- Record audio
- Siren on event
- Auto tracking
- Auto focus
- Guard return
- Doorbell button sound

Depending on the supported features of the NVR/host, global switch entities are added for:

- Record
- Push notifications
- Buzzer on event
- Email on event
- FTP upload

## Light entities

Depending on the supported features of the camera, light entities are added for:

- Floodlight
- Infra red lights in night mode
- Status LED

When the floodlight entity is ON always ON, when OFF controlled based on the internal camera floodlight mode (Off, Auto, Schedule), see the "Floodlight mode" select entity.

When IR light entity is OFF always OFF, when ON IR LEDs will be on when the camera is in night vision mode, see the "Day night mode" select entity.

## Update entity

An update entity is available that checks for firmware updates every 12 hours.
This does the same as pressing the "Check for latest version" in the Reolink applications.
Unfortunately this does not always shows the latest available firmware (also not in the Reolink applications).
The latest firmware can be downloaded from the [Reolink download center](https://reolink.com/download-center/) and uploaded to the camera/NVR manually.

## Tested models

The following models have been tested and confirmed to work:

- C1 Pro
- C2 Pro
- E1 Zoom
- E1 Outdoor
- RLC-410
- RLC-410W
- RLC-411
- RLC-420
- RLC-510A
- RLC-511
- RLC-511W
- RLC-520
- RLC-520A
- RLC-522
- RLC-810A
- RLC-811A
- RLC-820A
- RLC-822A
- RLC-823A
- RLC-833A
- RLC-1224A
- RLN8-410 NVR
- RLN16-410 NVR
- RLN36 NVR
- Reolink Duo Floodlight PoE
- Reolink TrackMix PoE
- Reolink Video Doorbell (PoE and Wi-Fi)

Battery-powered cameras are not yet supported.

The following models are lacking the HTTP web server API and can, therefore, not work directly with this integration.
However, these cameras can work with this integration through an NVR in which the NVR is connected to Home Assistant.

- E1 Pro
- E1

## Troubleshooting

- Older firmware versions do not expose the necessary information the integration needs to function. Ensure the camera is updated to the [latest firmware](https://reolink.com/download-center/) prior to setting up the integration. Note that Reolink auto update and check for update functions in the app/windows/web client often do not show the latest available firmware version. Therefore check the version in the [Reolink download center](https://reolink.com/download-center/) online.
- Ensure at least one of the HTTP/HTTPS ports is enabled in the [windows](https://reolink.com/software-and-manual/)/web client under `Settings`->`Network`->`Advanced`->`Port Settings`, see [additional instructions](https://support.reolink.com/hc/en-us/articles/900004435763-How-to-Set-up-Reolink-Ports-Settings-via-Reolink-Client-New-Client-) on the Reolink site.
- On some camera models, the RTMP port needs to be enabled in order for the HTTP(S) port to function properly. Make sure this port is also enabled if you get a `Cannot connect to host` error while one of the HTTP/HTTPS ports is already enabled.
- Setting a static IP address for Reolink cameras/NVRs in your router is advisable to prevent (temporal) connectivity issues when the IP address changes.
