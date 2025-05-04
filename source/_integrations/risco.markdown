---
title: Risco
description: Instructions on how to integrate Risco alarms into HA using Risco Cloud.
ha_category:
  - Alarm
  - Binary sensor
  - Switch
ha_release: '0.115'
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@OnFreund'
ha_domain: risco
ha_platforms:
  - alarm_control_panel
  - binary_sensor
  - sensor
  - switch
ha_integration_type: integration
---

This integration connects with Risco Alarms, in one of two ways:

## Risco cloud (recommended)

The integration will connect with your alarm over [Risco Cloud](https://riscocloud.com/).
This is easiest to configure, and is widely supported, but is cloud based, and requires polling. 

{% important %}
As of January 2021, Risco have implemented charges for use of their Cloud Features.
{% endimportant %}

{% tip %}
It is recommended to use a regular (non-owner) account with the Risco app/website, and use a different regular account with the integration. Risco has restrictions on concurrent uses by different users, especially if they have different permission levels.
{% endtip %}

4 sensors will be created to store events, depending on the category (Status, Alarm, Trouble and Other). Each sensor
has the event timestamp as the state, and other event information in attributes.

If you have multiple sites, only the first site will be used.

## Local (advanced)

The integration will connect locally to your system.
No dependency on the cloud, and instantaneous updates, but is harder to set up.
You will need the panel access code (default 5678) to your system, this access code is NOT the same as the installer/subinstaller code, and with older models,
you might need to either disconnect your system from the cloud, or set up a proxy that will allow you to connect both locally and via the cloud.

The local version of the integration does not support events, and the `arming` state, but provides an additional binary sensor per zone (with the `_alarmed` suffix) that signals whether this zone is currently triggering an alarm.

{% include integrations/config_flow.md %}

## Options

You can configure additional behavior by clicking on **Options** in the relevant box in the Integration panel:

{% configuration_basic %}
Require pin code to arm:
  description: When checked, you'll need to enter your pin code when arming through Home Assistant.
Require pin code to disarm:
  description: When checked, you'll need to enter your pin code when disarming through Home Assistant.
How often to poll Risco Cloud (in seconds):
  description: "The lower this is, the faster your entities will reflect changes, but the more resource-intensive it'll be. Only available when using Cloud and only shown in advanced mode."
Maximum concurrent requests in Risco local:
  description: "Lower values cause the integration to load slower. Higher values could lead to errors. Only available when using Local and only shown in advanced mode."
{% endconfiguration_basic %}

Apart from these options, you can also define a custom mapping between your Home Assistant Alarm states and the Risco arming modes.
This is an advanced configuration, and unless you're using group arming, the default mapping should probably be best.
This is a two-way mapping, meaning you can map:

- What Home Assistant state your partition entity will report when Risco is armed in a specific mode.
- Which arming mode to use when arming from Home Assistant using one of its modes. Note that in this step, you can only choose combinations that map to each other in the previous step.

The default mapping:

|Risco Arming Mode | Home Assistant State |
|---|---|
| Arm (AWAY) | Armed Away |
| Partial Arm (STAY) | Armed Home |
| Group A | Armed Home |
| Group B | Armed Home |
| Group C | Armed Home |
| Group D | Armed Home |

And in the reverse direction:

| Home Assistant Mode | Risco Arming Mode |
|---|---|
| Arm Away | Arm |
| Arm Home | Partial Arm |

## Supported platforms:

- [Alarm control panel](/integrations/alarm_control_panel/)
- [Binary sensor](/integrations/binary_sensor/)
- [Sensor](/integrations/sensor/)
- [Switch](/integrations/switch/)
