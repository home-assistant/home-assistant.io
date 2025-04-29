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

[Agent DVR](https://www.ispyconnect.com/download.aspx/) is a free* software DVR solution for Windows 10, Mac and Linux. Agent DVR runs as a service or console application and can access and control a huge range of third party cameras with advanced motion detection, including DeepStack integration for object recognition. The iSpyConnect website provides secured (SSL) remote access without port forwarding needed.

You can add Agent DVR via integrations using the IP address and port of the server, like: `http://192.168.1.3:8090/`. If you have "Protect API" turned on in your Agent DVR server configuration, you can supply the username and password as part of the URL, for example, `http://username:password@192.168.1.3:8090`.

{% include integrations/config_flow.md %}

{% important %}
Please ensure you are using Agent DVR v2.6.1.0 +
{% endimportant %}

## Alarm control panel

Reports on the current alarm status and can be used to arm and disarm the system.

## Actions

Once loaded, the `agent_dvr` integration will expose actions that can be used. The `entity_id` action attribute can specify one or more specific cameras.

Available actions:
`enable_alerts`, `disable_alerts`,
`start_recording`, `stop_recording`,
`turn_on`, `turn_off`, `toggle`, `enable_motion_detection`,`disable_motion_detection`

### Action `enable_alerts`/`disable_alerts`

These actions enable or disable the device's alert events within Agent DVR.

Data attribute | Optional | Description
-|-|-
`entity_id` | no | Name(s) of entities, e.g., `camera.living_room_camera`.

### Action `start_recording`/`stop_recording`

These actions start or stop the device recording.

Data attribute | Optional | Description
-|-|-
`entity_id` | no | Name(s) of entities, e.g., `camera.living_room_camera`.

### Action `turn_on`/`turn_off`/`toggle`

These actions turn on, off or toggle the device enabled state within Agent DVR

Data attribute | Optional | Description
-|-|-
`entity_id` | no | Name(s) of entities, e.g., `camera.living_room_camera`.

## Iframe

- Using the Webpage Card you can embed the Agent DVR viewer directly in Home Assistant. Just point it to <https://www.ispyconnect.com/app/>

<p class='img'>
<img src='/images/screenshots/agent_dvr.jpg' />
</p>

*Agent offers additional services like secured remote access (without port forwarding) and cloud uploads via a subscription service.
