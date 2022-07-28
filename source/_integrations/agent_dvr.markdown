---
title: Agent DVR
description: Access and control Agent DVR from Home Assistant.
ha_category:
  - Alarm
  - Camera
ha_config_flow: true
ha_release: '0.110'
ha_iot_class: Local Polling
ha_codeowners:
  - '@ispysoftware'
ha_domain: agent_dvr
ha_platforms:
  - alarm_control_panel
  - camera
ha_integration_type: integration
---

[Agent DVR](https://www.ispyconnect.com/download.aspx/) is a free* software DVR solution for windows 10, Mac and Linux. Agent DVR runs as a service or console application and can access and control a huge range of third party cameras with advanced motion detection, including DeepStack integration for object recognition. The iSpyConnect website provides secured (SSL) remote access without port forwarding needed.

You can add Agent DVR via integrations using the IP address and port of the server, e.g.,: `http://192.168.1.3:8090/`.

{% include integrations/config_flow.md %}

<div class='note'>
  Please ensure you are using Agent DVR v2.6.1.0 +
</div>

## Alarm Control Panel

Reports on the current alarm status and can be used to arm and disarm the system.

## Services

Once loaded, the `agent_dvr` integration will expose services that can be called to perform various actions. The `entity_id` service attribute can specify one or more specific cameras.

Available services:
`enable_alerts`, `disable_alerts`,
`start_recording`, `stop_recording`,
`turn_on`, `turn_off`, `toggle`, `enable_motion_detection`,`disable_motion_detection`

### Service `enable_alerts`/`disable_alerts`

These services enable or disable the device's alert events within Agent DVR.

Service data attribute | Optional | Description
-|-|-
`entity_id` | no | Name(s) of entities, e.g., `camera.living_room_camera`.

### Service `start_recording`/`stop_recording`

These services start or stop the device recording.

Service data attribute | Optional | Description
-|-|-
`entity_id` | no | Name(s) of entities, e.g., `camera.living_room_camera`.

### Service `turn_on`/`turn_off`/`toggle`

These services turn on, off or toggle the device enabled state within Agent DVR

Service data attribute | Optional | Description
-|-|-
`entity_id` | no | Name(s) of entities, e.g., `camera.living_room_camera`.

## IFrame

- Using the Webpage Card you can embed the Agent DVR viewer directly in Home Assistant. Just point it to <https://www.ispyconnect.com/app/>

<p class='img'>
<img src='/images/screenshots/agent_dvr.jpg' />
</p>

*Agent offers additional services like secured remote access (without port forwarding) and cloud uploads via a subscription service.
