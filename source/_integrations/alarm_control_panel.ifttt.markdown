---
title: "IFTTT Alarm control panel"
description: "Instructions on how to integrate IFTTT-controlled security systems into Home Assistant."
ha_category:
  - Alarm
ha_release: 0.66
ha_domain: ifttt
related:
  - docs: /docs/configuration/
    title: Configuration file
---

The `ifttt` {% term integration %} allows you to integrate security systems that have no open API but can be controlled through [IFTTT](https://ifttt.com/explore).

This {% term integration %} depends on the [IFTTT](/integrations/ifttt/) Home Assistant integration. See the integrations documentation to set it up.

{% note %}
It is important to note that this platform fully relies on IFTTT to receive updates when the security system's state changes. Therefore, this platform shows an assumed state.
{% endnote %}

## Configuration

To enable this, add the following lines to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
ifttt:
  key: YOUR_WEBHOOK_KEY

alarm_control_panel:
  - platform: ifttt
    name: YOUR_ALARM_NAME
    code: YOUR_ALARM_CODE
    event_arm_away: YOUR_ARM_AWAY_EVENT
    event_arm_home: YOUR_ARM_HOME_EVENT
    event_arm_night: YOUR_ARM_NIGHT_EVENT
    event_disarm: YOUR_DISARM_EVENT
```

{% configuration %}
name:
  description: The name of your Home Assistant alarm control panel.
  required: false
  type: string
code:
  description: The code for the alarm control panel.
  required: false
  type: string
code_arm_required:
  description: If true, the code is required to arm the alarm.
  required: false
  type: boolean
  default: true
event_arm_away:
  description: IFTTT webhook event to call when the state is set to armed away.
  required: false
  type: string
  default: alarm_arm_away
event_arm_home:
  description: IFTTT webhook event to call when the state is set to armed home.
  required: false
  type: string
  default: alarm_arm_home
event_arm_night:
  description: IFTTT webhook event to call when the state is set to armed night.
  required: false
  type: string
  default: alarm_arm_night
event_disarm:
  description: IFTTT webhook event to call when the state is set to disarmed.
  required: false
  type: string
  default: alarm_disarm
optimistic:
  description: Specify if the state will be updated by an ifttt.push_alarm_state call (false) or can be set immediately (true).
  required: false
  type: boolean
  default: false
{% endconfiguration %}

{% warning %}

It is strongly discouraged to use this platform when you don't use encryption; otherwise, your API password will be send unprotected through the IFTTT Webhooks. It is advised to [setup encryption using Let's Encrypt](/blog/2017/09/27/effortless-encryption-with-lets-encrypt-and-duckdns/).

{% endwarning %}

### Required IFTTT applets

Next, you will need to set up the required IFTTT applets as listed below.

This platform supports the `alarm_disarm`, `alarm_arm_away`, `alarm_arm_home` and `alarm_arm_night` actions. For each of these actions, an IFTTT webhook will be triggered.

For this system to operate correctly, the following IFTTT applets have to be setup. Obviously, if your alarm device does not support some states, no applets have to be provided for those.

- **IF** Webhook event `YOUR_DISARM_EVENT` is called, **THEN** disarm the alarm system.
- **IF** Webhook event `YOUR_ARM_HOME_EVENT` is called, **THEN** set the alarm system to armed home.
- **IF** Webhook event `YOUR_ARM_NIGHT_EVENT` is called, **THEN** set the alarm system to armed away.
- **IF** Webhook event `YOUR_DISARM_EVENT` is called, **THEN** set the alarm system to armed night.
- **IF** the alarm system was disarmed, **THEN** perform a Webhook `POST` web request to URL `https://HASS_URL/api/services/ifttt/push_alarm_state?api_password=API_PASSWORD` with content type `application/json` and body `{"entity_id": "alarm_control_panel.DEVICE_NAME", "state": "disarmed"}`.
- **IF** the alarm system state changed to armed home, **THEN** perform a Webhook `POST` web request to URL `https://HASS_URL/api/services/ifttt/push_alarm_state?api_password=API_PASSWORD` with content type `application/json` and body `{"entity_id": "alarm_control_panel.DEVICE_NAME", "state": "armed_home"}`.
- **IF** the alarm system state changed to armed away, **THEN** perform a Webhook `POST` web request to URL `https://HASS_URL/api/services/ifttt/push_alarm_state?api_password=API_PASSWORD` with content type `application/json` and body `{"entity_id": "alarm_control_panel.DEVICE_NAME", "state": "armed_away"}`.
- **IF** the alarm system state changed to armed night, **THEN** perform a Webhook `POST` web request to URL `https://HASS_URL/api/services/ifttt/push_alarm_state?api_password=API_PASSWORD` with content type `application/json` and body `{"entity_id": "alarm_control_panel.DEVICE_NAME", "state": "armed_night"}`.
