---
layout: page
title: "Honeywell TotalConnect Alarm Control Panel"
description: "Instructions on how to integrate TotalConnect alarms into Home Assistant."
date: 2017-04-02 22:00
sidebar: true
comments: false
sharing: true
footer: true
logo: honeywell-tc.png
ha_category: Alarm
ha_release: 0.42
---

The `totalconnect` platform provides connectivity with the Honeywell TotalConnect alarm systems used by many alarm companies.

This platform supports the following services: `alarm_arm_away`, `alarm_arm_home`, `alarm_arm_night` and `alarm_disarm`.

If you have issues running this component, you may require `libxml2-dev` and `libxmlsec1-dev` packages. To install these on Hassbian, run the command `apt install libxml2-dev libxmlsec1-dev` with sudo.

## {% linkable_title Configuration %}

To enable this, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
alarm_control_panel:
  - platform: totalconnect
    username: YOUR_USERNAME
    password: YOUR_PASSWORD
```

{% configuration %}
name:
  description: Name of device in Home Assistant.
  required: false
  type: string
username:
  description: Username used to sign into the TotalConnect app/web client.
  required: true
  type: string
password:
  description: Password used to sign into the TotalConnect app/web client.
  required: true
  type: string
{% endconfiguration %}

## {% linkable_title Automation example %}

```yaml
automation:
  - alias: "Alarm: Disarmed Daytime"
    trigger:
      platform: state
      entity_id: alarm_control_panel.total_connect
      to: 'disarmed'
    condition:
      condition: sun
      before: sunset
    action:
      service: scene.turn_on
      entity_id: scene.OnDisarmedDaytime
  - alias: "Alarm: Armed Away"
    trigger:
      platform: state
      entity_id: alarm_control_panel.total_connect
      to: 'armed_away'
    action:
      service: scene.turn_on
      entity_id: scene.OnArmedAway
```
