---
title: Verisure
description: Instructions on how to set up Verisure devices within Home Assistant.
ha_category:
  - Alarm
  - Binary sensor
  - Camera
  - Hub
  - Lock
  - Sensor
  - Switch
ha_release: pre 0.7
ha_iot_class: Cloud Polling
ha_domain: verisure
ha_platforms:
  - alarm_control_panel
  - binary_sensor
  - camera
  - diagnostics
  - lock
  - sensor
  - switch
ha_config_flow: true
ha_dhcp: true
ha_integration_type: hub
---

Home Assistant has support to integrate your [Verisure](https://www.verisure.com/) devices.

There is currently support for the following device types within Home Assistant:

- Alarm
- Camera
- Switch (Smartplug)
- Sensor (Thermometers and Hygrometers)
- Lock
- Binary sensor (Door & Window)

{% include integrations/config_flow.md %}

{% include integrations/option_flow.md %}

## Alarm control panel

The Verisure alarm control panel platform allows you to control your [Verisure](https://www.verisure.com/) Alarms.

The requirement is that you have set up your Verisure hub first, with the instruction above.

The `changed_by` attribute enables one to be able to take different actions depending on who armed/disarmed the alarm in [automation](/getting-started/automation/).

```yaml
automation:
  - alias: "Alarm status changed"
    triggers:
      - trigger: state
        entity_id: alarm_control_panel.alarm_1
    actions:
      - action: notify.notify
        data:
          message: >
            Alarm changed from {{ trigger.from_state.state }}
            to {{ trigger.to_state.state }}
            by {{ trigger.to_state.attributes.changed_by }}
```

{% include integrations/actions.md %}

### Force arm

By default, Home Assistant cannot arm the alarm while a device reports a problem, such as an open door or window, or an offline sensor. The arm request stays pending and the panel does not arm. Verisure's own apps handle this with an **Arm anyway** confirmation.

To allow arming in that situation, enable **Force arm** in the integration options. Go to {% my integrations title="**Settings** > **Devices & services**" %}, select the **Verisure** integration, then select **Configure**. When enabled, arming proceeds even if a device is out of place.

{% warning %}
Force arm bypasses the check for devices that report a problem. An affected zone might not be monitored while the system is armed.
{% endwarning %}

## Binary sensor

- Ethernet status

## Lock

| method state attribute | Description |
| ------- | ----------- |
| thumb | Lock was locked/unlocked by interior thumb switch |
| star | Lock was locked by exterior star button |
| code | Lock was unlocked by exterior code |
| auto | Lock was locked/unlocked automatically by Verisure rule |
| remote | Lock was locked/unlocked automatically by Verisure App |

## Limitations and known issues

Some users have reported that this integration currently doesn't work in the following countries:

- France
- Ireland
- Italy
- Spain

## Troubleshooting

If you get an error message stating something like *"The code for lock.XXX doesn't match pattern `^\d{0}$`."*, make sure the number of digits for your code matches the number defined in the [configuration options](#options).
