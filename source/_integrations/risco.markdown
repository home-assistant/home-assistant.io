---
title: Risco Alarm
description: Instructions on how to integrate Risco alarms into HA using Risco Cloud.
ha_category:
  - Alarm
  - Binary Sensor
ha_release: "0.115"
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - "@OnFreund"
ha_domain: risco
---

This integration connects with Risco Alarms over [Risco Cloud](https://riscocloud.com/).

## Configuration

This integration can be configured using the integrations panel in the
Home Assistant frontend.

Menu: **Configuration** -> **Integrations**.

Click on the `+` sign to add an integration and click on **Risco**.
You will be prompted for your username, password, and pin code (you can create a specific user for this purpose).
An Alarm Control Panel entity will be created for each partition in your site, and binary sensors for each of your zones.

If you have multiple sites, only the first site will be used.

### Extra configuration of the integration

You can configure additional options through the integration options flow:

{% configuration_basic %}
How often to poll Risco (in seconds):
  description: "The lower this is, the faster your entities will reflect changes, but the more resource intensive it'll be."
Require pin code to arm:
  description: When checked, you'll need to enter your pin code when arming through Home Assistant.
Require pin code to disarm:
  description: When checked, you'll need to enter your pin code when disarming through Home Assistant.
{% endconfiguration_basic %}

Currently supported plaforms:
- [Alarm Control Panel](/integrations/alarm_control_panel/)
- [Binary Sensor](/integrations/binary_sensor/)
