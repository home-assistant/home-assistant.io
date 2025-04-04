---
title: Bosch Alarm
description: Integrate Bosch Alarms.
ha_category:
  - Alarm
ha_release: 2025.4
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@mag1024'
  - '@sanjay900'
ha_domain: bosch_alarm
ha_platforms:
  - alarm_control_panel
ha_integration_type: integration
---

The **Bosch Alarm Panel** {% term integration %} allows you to connect your [Bosch Alarm Panel](https://www.boschsecurity.com) to Home Assistant to control and monitor your Bosch Alarm Panel.

{% include integrations/config_flow.md %}

## Supported devices

- _Solution 2000/3000/4000_
- B Series: _B3512/B4512/B5512/B6512_
- G Series: _B8512G/B9512G_
- _AMAX 2100/3000/4000_
- _D7412GV4/D9412GV4_ [^1]

[^1]: Firmware 2.0+

## Provided entities

The following {% term entities %} are provided:

- [Alarm Control Panel](#alarm-control-panel)

### Alarm Control Panel

This integration adds an Alarm Control Panel device for each configured area, with the ability to issue arm/disarm commands.
This entity reports state (_disarmed_, _armed_away_, etc.).

## Authentication

The primary means of authentication for the _Mode 2_ API is the _Automation_ passcode. It needs to be at least 10 characters long, and it is different from the _User_ code -- a shorter numeric pin used to arm/disarm the panel.
The integration will prompt for the required passcodes, which depend on the panel type.

| Panel | Code |
| --- | --- |
| Solution | User [^2] |
| B Series | Automation |
| G Series | Automation |
| AMAX | Both |

[^2]: The user needs to have the "master code functions" authority if you wish to interact with history events.

{% important %}
Since the _Mode 2_ automation user has "superuser" privileges, it bypasses the regularly configured alarm pin: you will _not_ be prompted for a _User_ code when arming/disarming through the integration.
{% endimportant %}

## Troubleshooting

### Diagnostics information

Consider uploading [the diagnostics file](/docs/configuration/troubleshooting/#debug-logs-and-diagnostics) along with your issue report to allow faster triaging and pinpointing the issue.
The information contained in the generated diagnostics file is redacted to avoid any sensitive information while still remaining useful for developers to fix the issue.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
