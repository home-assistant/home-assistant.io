---
title: Agent DVR
description: Access and control Agent DVR from Home Assistant.
ha_category:
  - Camera
  - Binary Sensor
  - Alarm Control Panel
ha_config_flow: true
ha_release: 0.107
ha_iot_class: Local Pull
ha_codeowners:
  - '@ispysoftware'
ha_domain: agent_dvr
---

[Agent DVR](https://www.ispyconnect.com/download.aspx/) is a free* DVR software solution for windows 10. Agent DVR runs as a service and can access and control a huge range of third party cameras.

Home Assistant will automatically discover Agent DVR on your network or you can add it manually via integrations using the IP address and port of the server e.g.,: `http://192.168.1.3:8090/`.


## Configuration

For configuration, go to the `Integrations panel` on your Home Assistant instance.

<div class='note'>
  Please ensure you are using Agent DVR v2.6.1.0 +
</div>

## Binary Sensor

The following sensor types are supported:

- Motion detection (Agent Alerts)
- Camera Online/ Offline state

## Alarm Control Panel

The alarm control panel can enable or disable the master Alert functions in Agent and set the profile to Home, Away or Night. You can configure the profile (which cameras are enabled/ recording) within Agent from the server menu.

## Services

Once loaded, the `agent_dvr` integration will expose services that can be called to perform various actions. The `entity_id` service attribute can specify one or more specific cameras, or `all` can be used to specify all configured Agent DVR cameras.

Available services:
`enable_alerts`, `disable_alerts`,
`start_recording`, `stop_recording`,
`turn_on`, `turn_off`, 'toggle'

#### Service `enable_alerts`/`disable_alerts`

These services enable or disable the device's alert events within Agent DVR.

Service data attribute | Optional | Description
-|-|-
`entity_id` | no | Name(s) of entities, e.g., `camera.living_room_camera`.

#### Service `start_recording`/`stop_recording`

These services start or stop the device recording.

Service data attribute | Optional | Description
-|-|-
`entity_id` | no | Name(s) of entities, e.g., `camera.living_room_camera`.

#### Service `turn_on`/`turn_off`/`toggle`

These services turn on, off or toggle the device enabled state within Agent DVR

Service data attribute | Optional | Description
-|-|-
`entity_id` | no | Name(s) of entities, e.g., `camera.living_room_camera`.



## IFrame
 - Using the Webpage Card you can embed the Agent DVR viewer directly in Home Assistant. Just point it to https://www.ispyconnect.com/app/

<p class='img'>
<img src='/images/screenshots/agent_dvr.jpg' />
</p>

*Agent offers additional services like secured remote access (without port forwarding) and cloud uploads via a subscription service.
