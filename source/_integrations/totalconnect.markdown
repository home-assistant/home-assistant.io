---
title: Honeywell Total Connect Alarm
description: Instructions on how to integrate TotalConnect alarms into Home Assistant.
ha_category:
  - Alarm
  - Binary Sensor
ha_release: 0.42
ha_config_flow: true
ha_codeowners:
  - '@austinmroczek'
ha_domain: totalconnect
---

The `totalconnect` integration provides connectivity with the Honeywell TotalConnect alarm systems used by many alarm companies.  

## Configuration

To enable TotalConnect via the user interface, go to **Configuration** > **Integrations** > the "plus" button > Total Connect.

To enable TotalConnect via `configuration.yaml` add the following lines:

```yaml
totalconnect:
    username: YOUR_USERNAME
    password: YOUR_PASSWORD
```

{% configuration %}
username:
  description: Username used to sign into the TotalConnect app/web client.
  required: true
  type: string
password:
  description: Password used to sign into the TotalConnect app/web client.
  required: true
  type: string
{% endconfiguration %}

You are highly encouraged to create a Total Connect user account specifically for Home Assistant. It should not have full administrative privileges.

## Automation example
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

If you have issues running this component, you may require `libxml2-dev` and `libxmlsec1-dev` packages. To install these on Raspbian, run the command `apt install libxml2-dev libxmlsec1-dev` with sudo.

## Alarm Control Panel

The integration provides an Alarm Control Panel for each TotalConnect location. It uses the name of your location from TotalConnect.  For example, if your location name in TotalConnect is "Home", then you will get `alarm_control_panel.home` in Home Assistant.

The alarm control panel supports the following services: `alarm_arm_away`, `alarm_arm_home`, `alarm_arm_night` and `alarm_disarm`.

The `triggered` state also provides a state attribute called `triggered_source` giving more detail on what triggered the alarm:

- `Police/Medical` is when sensors detected a burglar and/or a person pushed the Police or Medical button
- `Fire/Smoke` is when fire or smoke is detected, or a person pushed the Fire button
- `Carbon Monoxide` is when carbon monoxide is detected

## Binary Sensor

The integration provides a Binary Sensor for each TotalConnect zone. To see zones in TotalConnect "fault" status, your TotalConnect account must have "Sensor Events" enabled. Your alarm monitoring company may charge an extra fee to enable this.

The TotalConnect API has limited zone type information. Home Assistant device class `door` is assigned to TotalConnect door, window, perimeter, motion sensor, and most alarm panel buttons. The sensor will appear as `True` if the door is open (either fault or triggered in TotalConnect) and `False` otherwise. Device class `smoke` is assigned to TotalConnect smoke detectors and buttons with physical alarm panel "Response Type" setting of "Fire No Verification". The sensor will appear as `True` if smoke is detected.  Device class `gas` is assigned to TotalConnect carbon monoxide detectors. The sensor will appear as `True` if gas is detected.
