---
title: Total Connect
description: Integrate Resideo Total Connect 2.0-enabled alarm systems into Home Assistant.
ha_category:
  - Alarm
  - Binary sensor
  - Button
ha_release: 0.42
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@austinmroczek'
ha_domain: totalconnect
ha_platforms:
  - alarm_control_panel
  - binary_sensor
  - button
  - diagnostics
ha_integration_type: integration
---

The `totalconnect` integration provides connectivity with Resideo Total Connect 2.0-enabled alarm systems.

The integration allows automations based on the state of the alarm system. For example: when the alarm is armed, turn on the outside light.

The integration can also arm or disarm the alarm panel.  For example: when I arrive home, disarm the alarm panel

## Supported devices

This integration supports alarm panels with "communicator modules" that are compatible with the Total Connect 2.0 service.  An active account is required via a third party alarm monitoring company. Panels may be branded as Resideo, Honeywell, Ademco or other third party alarm companies.

Device models known to work include:

- ProSeries (ProA7, ProA7Plus)
- Lyric (AIO, Gateway)
- Lynx Touch (L5100, L5200, L5210, L7000)
- Lynx Plus (L3000)
- VISTA (15P, 20P, 21iP)

## Unsupported devices

The following devices are not supported:

- Older Lynx models (not Touch or Plus)
- Other panels without a Total Connect compatible communicator module

## Prerequisites

Log in to the [Total Connect website](https://totalconnect2.com) and create a "standard" Total Connect user account specifically for use with Home Assistant. It should not have full administrative privileges.

Give the user access to your Location, along with a user code, usually a 4 digit number.

{% details "Notes for Home Assistant Core Installations" %}

If you have issues running this integration, you may require `libxml2-dev` and `libxmlsec1-dev` packages. To install these on Raspbian, run the command:

```bash
sudo apt install libxml2-dev libxmlsec1-dev
```

{% enddetails %}

{% include integrations/config_flow.md %}

## Configuration Options

**Auto Bypass Low Battery:** if enabled, TotalConnect zones will immediately be bypassed when they report low battery. This option helps because zones tend to report low battery in the middle of the night. The downside of this option is that when the alarm system is armed, the bypassed zone will not be monitored.

**Require Code:** if enabled, you must enter the user code to arm or disarm the alarm.

## Alarm control panel

The integration provides an alarm control panel for each Total Connect location. It uses the name of your location from Total Connect.  For example, if your location name in Total Connect is "Home", Home Assistant will use `alarm_control_panel.home`.

The `triggered` state also provides a state attribute called `triggered_source` giving more detail on what triggered the alarm:

- `Police/Medical` is when sensors detected a burglar and/or the Police or Medical button was pressed
- `Fire/Smoke` is when fire or smoke is detected, and/or the Fire button was pressed
- `Carbon Monoxide` is when carbon monoxide is detected

## Binary sensor

The integration provides a binary sensor for each Total Connect zone. To see faulted zones in Home Assistant, your Total Connect account must have "Sensor Activities" enabled. Your alarm monitoring company may charge an extra fee to enable this. If available, these can be found in the Total Connect 2 web portal at **Notifications** -> **Sensor Activities**. Alternately, they can be found in the Total Connect mobile app at **More** -> **Settings** -> **Notifications** -> **Sensor Activities**. Enable each zone you want to monitor. Unmonitored zones will display as `Closed` in Home Assistant.

Home Assistant device class `door` is assigned to Total Connect entry/exit, perimeter, and motion zones; along with most alarm panel buttons. The sensor will appear as `True` if the zone is opened (either fault or triggered in Total Connect) and `False` if closed. Device class `smoke` is assigned to Total Connect smoke detectors and alarm panel buttons set to a "Fire No Verification" response type. The sensor will appear as `True` if smoke is detected or the respective button is pressed.  Device class `gas` is assigned to Total Connect carbon monoxide detectors. The sensor will appear as `True` if carbon monoxide is detected.

## Buttons

The integration provides a bypass button for each zone that can be bypassed. The **Bypass All** button for the alarm panel will bypass all faulted or troubled zones. The **Clear Bypass** button for the alarm panel will clear all bypassed zones.

## Actions

The alarm control panel supports the following basic actions: `alarm_arm_away`, `alarm_arm_home`, `alarm_arm_night`, and `alarm_disarm`.

### Action: Arm home instant

The `totalconnect.arm_home_instant` action puts the alarm panel in "arm home" with zero entry delay, triggering the alarm instantly if an entry/exit zone is faulted. This is equivalent to "arm stay instant" in most alarm panels.

| Data attribute         | Optional | Description                                          |
|------------------------|----------|------------------------------------------------------|
| `entity_id`            | No       | The ID of the alarm panel to arm.                    |

### Action: Arm away instant

The `totalconnect.arm_away_instant` action puts the alarm panel in "arm away" with zero entry delay, triggering the alarm instantly if an entry/exit zone is faulted. This is equivalent to "arm away instant" in most alarm panels.

| Data attribute         | Optional | Description                                          |
|------------------------|----------|------------------------------------------------------|
| `entity_id`            | No       | The ID of the alarm panel to arm.                    |

## Diagnostic Sensors

The following diagnostic sensors are available:

- Low Battery for Zones and Alarm Panels will be `On` if the battery is low.
- Tamper for Zones and Alarm Panels will be `On` if in a tampered state.
- Power for Alarm Panels will be `On` if main power is connected or `Off` if running on the backup battery.

## Automation example

```yaml
automation:
  - alias: "Alarm: Disarmed Daytime"
    triggers:
      - trigger: state
        entity_id: alarm_control_panel.home
        to: "disarmed"
    conditions:
      - condition: sun
        before: sunset
    actions:
      - action: scene.turn_on
        target:
          entity_id: scene.on_disarmed_day_time

  - alias: "Alarm: Armed Away"
    triggers:
      - trigger: state
        entity_id: alarm_control_panel.home
        to: "armed_away"
    actions:
      - action: scene.turn_on
        target:
          entity_id: scene.on_armed_away

  - alias: "Alarm: Arm Home Instant at Sunset"
    triggers:
      - trigger: sun
        event: sunset
        offset: 0
    actions:
      - action: totalconnect.arm_home_instant
        target:
          entity_id: alarm_control_panel.home
```

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}

After deleting the integration, go to Total Connect and remove the user account you created for Home Assistant.

## Data Updates

Your alarm panel contacts the Total Connect 2.0 server to provide status updates. This is a "polling integration" that contacts the Total Connect 2.0 server every 30 seconds to retrieve the status of your alarm panel and sensors. Home Assistant cannot communicate locally with the alarm panel.

## Limitations

The polling window is 30 seconds.  If your door opens and then closes again within 30 seconds, it may not be visible in Home Assistant. Automations based on the short term status of doors and windows are not recommended.

The Total Connect API has limited zone type information. Many zones are simply described as "perimeter" and thus appear as a `door` in Home Assistant.  You may have to manually adjust some entities.

Some alarm panels integrate Z-Wave, cameras, smart locks or garage door openers, and those add-on devices can be controlled by the Total Connect app. This integration does not yet support awareness of or control of these add-on devices.

This integration cannot "trigger" the alarm panel or cause the alarm to sound.

## Troubleshooting

### Error Connecting or Service Unavailable

The integration depends on the Total Connect 2.0 servers and your internet connection. Verify your internet is working and check https://status.resideo.com/ for server outages.

### Unknown ResultCode, ArmingState, ZoneType or ZoneStatus

The Total Connect API does not fully document all modes of every alarm panel so the integration was developed based on testing with the developers' own hardware. New or different hardware may result in unknown ResultCode, ArmingState, ZoneType, ZoneStatus or similar messages in the Home Assistant logs. If encountered, please [submit an issue](https://github.com/craigjmidwinter/total-connect-client/issues) for `total-connect-client` which enables this integration.
