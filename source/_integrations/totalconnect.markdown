---
title: Total Connect
description: Integrate Resideo Total Connect 2.0-enabled alarm systems into Home Assistant.
ha_category:
  - Alarm
  - Binary Sensor
ha_release: 0.42
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@austinmroczek'
ha_domain: totalconnect
ha_platforms:
  - alarm_control_panel
  - binary_sensor
  - diagnostics
ha_integration_type: integration
---

The `totalconnect` integration provides connectivity with Resideo Total Connect 2.0-enabled alarm systems.

## Prerequisites

Log in to the [Total Connect website](https://totalconnect2.com) and create a "standard" Total Connect user account specifically for use with Home Assistant. It should not have full administrative privileges.

Give the user access to your Location, along with a user code, usually a 4 digit number.

{% include integrations/config_flow.md %}

## Configuration Options

**Auto Bypass Low Battery:** if enabled, TotalConnect zones will immediately be bypassed when they report low battery. This option helps because zones tend to report low battery in the middle of the night. The downside of this option is that when the alarm system is armed, the bypassed zone will not be monitored.

## Automation example
```yaml
automation:
  - alias: "Alarm: Disarmed Daytime"
    trigger:
      platform: state
      entity_id: alarm_control_panel.total_connect
      to: "disarmed"
    condition:
      condition: sun
      before: sunset
    action:
      service: scene.turn_on
      target:
        entity_id: scene.OnDisarmedDaytime
  - alias: "Alarm: Armed Away"
    trigger:
      platform: state
      entity_id: alarm_control_panel.total_connect
      to: "armed_away"
    action:
      service: scene.turn_on
      target:
        entity_id: scene.OnArmedAway
  - alias: "Alarm: Arm Home Instant at Sunset"
    trigger:
      platform: sun
      event: sunset
      offset: '0'
    action:
      service: totalconnect.arm_home_instant
      target:
        entity_id: alarm_control_panel.total_connect
```

{% details "Notes for Home Assistant Core Installations" %}

If you have issues running this component, you may require `libxml2-dev` and `libxmlsec1-dev` packages. To install these on Raspbian, run the command:

```bash
sudo apt install libxml2-dev libxmlsec1-dev
```

{% enddetails %}

## Alarm Control Panel

The integration provides an Alarm Control Panel for each Total Connect location. It uses the name of your location from Total Connect.  For example, if your location name in Total Connect is "Home", Home Assistant will use `alarm_control_panel.home`.

The alarm control panel supports the following services: `alarm_arm_away`, `alarm_arm_home`, `alarm_arm_night`, and `alarm_disarm`. The integration also provides unique services for `totalconnect.arm_home_instant` and `totalconnect.arm_away_instant` which arms the system with zero entry delay, triggering the alarm instantly if an entry/exit zone is faulted.

The `triggered` state also provides a state attribute called `triggered_source` giving more detail on what triggered the alarm:

- `Police/Medical` is when sensors detected a burglar and/or the Police or Medical button was pressed
- `Fire/Smoke` is when fire or smoke is detected, and/or the Fire button was pressed
- `Carbon Monoxide` is when carbon monoxide is detected

## Binary Sensor

The integration provides a Binary Sensor for each Total Connect zone. To see faulted zones in Home Assistant, your Total Connect account must have "Sensor Activities" enabled. Your alarm monitoring company may charge an extra fee to enable this. If available, these can be found in the Total Connect 2 web portal at **Notifications** -> **Sensor Activities**. Alternately, they can be found in the Total Connect mobile app at **More** -> **Settings** -> **Notifications** -> **Sensor Activities**. Enable each zone you want to monitor. Unmonitored zones will display as `Closed` in Home Assistant.

The Total Connect API has limited zone type information. Home Assistant device class `door` is assigned to Total Connect entry/exit, perimeter, and motion zones; along with most alarm panel buttons. The sensor will appear as `True` if the zone is opened (either fault or triggered in Total Connect) and `False` if closed. Device class `smoke` is assigned to Total Connect smoke detectors and alarm panel buttons set to a "Fire No Verification" response type. The sensor will appear as `True` if smoke is detected or the respective button is pressed.  Device class `gas` is assigned to Total Connect carbon monoxide detectors. The sensor will appear as `True` if carbon monoxide is detected.
