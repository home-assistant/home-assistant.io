---
layout: page
title: "IFTTT Alarm Control Panel"
description: "Instructions how to integrate IFTTT-controlled security systems into Home Assistant."
date: 2018-03-10 21:00
sidebar: true
comments: false
sharing: true
footer: true
logo: ifttt.png
ha_category: Alarm
ha_release: ?
---

The `ifttt` platform allows you to integrate security systems that have no open API, but can be controlled through [IFTTT](https://ifttt.com/discover).

This platform depends on the [IFTTT](https://home-assistant.io/components/ifttt/) Home Assistant component. See the component's documentation to set it up.

<p class='note'>
It is important to note that this platform fully relies on IFTTT to receive updates when the security system's state changes. Therefore, this platform shows an assumed state.
</p>

To enable this, setup the required IFTTT applets as listed below and add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
ifttt:
  key: YOUR_WEBHOOK_KEY
  
alarm_control_panel:
  - platform: ifttt
    name: YOUR_ALARM_NAME
    code: YOUR_ALARM_CODE
```

<p class='note warning'>
It is strongly discouraged to use this platform when you don't use encryption, otherwise your API password will be send unprotected through the IFTTT Webhooks. It is adviced to [setup encryption using Let's Encrypt](https://home-assistant.io/blog/2017/09/27/effortless-encryption-with-lets-encrypt-and-duckdns/).
</p>

{% linkable_title Required IFTTT applets %}

This platform supports the services `alarm_disarm`, `alarm_arm_away`, `alarm_arm_home` and `alarm_arm_night`. For each of these services, an IFTTT webhook will be triggered. 

For this system to operate correctly, the following IFTTT applets have to be setup. Obviously, if your alarm device does not support some states, no applets have to be provided for those.
* **IF** Webhook event `alarm_disarm` is called, **THEN** disarm the alarm system.
* **IF** Webhook event `alarm_arm_home` is called, **THEN** set the alarm system to armed home.
* **IF** Webhook event `alarm_arm_away` is called, **THEN** set the alarm system to armed away.
* **IF** Webhook event `alarm_arm_night` is called, **THEN** set the alarm system to armed night.
* **IF** the alarm system was disarmed, **THEN** perform a Webhook `POST` web request to url `https://HAS_URL/api/services/alarm_control_panel/push_alarm_state?api_password=API_PASSWORD` with content type `application/json` and body `{"entity_id": "alarm_control_panel.DEVICE_NAME", "state": "disarmed"}`.
* **IF** the alarm system state changed to armed home, **THEN** perform a Webhook `POST` web request to url `https://HAS_URL/api/services/alarm_control_panel/push_alarm_state?api_password=API_PASSWORD` with content type `application/json` and body `{"entity_id": "alarm_control_panel.DEVICE_NAME", "state": "armed_home"}`.
* **IF** the alarm system state changed to armed away, **THEN** perform a Webhook `POST` web request to url `https://HAS_URL/api/services/alarm_control_panel/push_alarm_state?api_password=API_PASSWORD` with content type `application/json` and body `{"entity_id": "alarm_control_panel.DEVICE_NAME", "state": "armed_away"}`.
* **IF** the alarm system state changed to armed night, **THEN** perform a Webhook `POST` web request to url `https://HAS_URL/api/services/alarm_control_panel/push_alarm_state?api_password=API_PASSWORD` with content type `application/json` and body `{"entity_id": "alarm_control_panel.DEVICE_NAME", "state": "armed_night"}`.


{% configuration %}
  name:
    description: The name of your Home Assistant alarm control panel.
    required: false
    type: string
  code:
    description: The code for the alarm control panel.
    required: false
    type: string
{% endconfiguration %}
