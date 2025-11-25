---
title: Genius Hub
description: Instructions on how to integrate a Genius Hub with Home Assistant.
ha_category:
  - Binary sensor
  - Climate
  - Sensor
  - Switch
  - Water heater
ha_release: 0.92
ha_iot_class: Local Polling
ha_codeowners:
  - '@manzanotti'
ha_domain: geniushub
ha_platforms:
  - binary_sensor
  - climate
  - sensor
  - switch
  - water_heater
ha_integration_type: integration
ha_config_flow: true
---

The `geniushub` integration links Home Assistant with your Genius Hub CH/DHW system, including its zones, devices, and issues.

It uses the [geniushub](https://pypi.org/project/geniushub-client/) client library, which provides data compatible with the v1 API that _may not_ exactly match that of the official Web App.

## Prerequisites

You can configure the integration either via the cloud API or the local API.

- **Cloud API**: requires a **hub token** obtained from [my.geniushub.co.uk](https://my.geniushub.co.uk/).
- **Local API**: requires your **username** and **password** as used with [geniushub.co.uk/app](https://www.geniushub.co.uk/).

The local API is unofficial, but is faster and has more features, while the cloud API is slower.

{% include integrations/config_flow.md %}

### Zones

Each zone controlled by your Genius Hub will be exposed as either a:

- `Climate` entity, for **Radiator** and **Wet Underfloor** zones, and
- `Water heater` entity, for **Hot Water Temperature** zones and
- `Switch` entity, for **On/Off** zones

**Group** zones are not supported.

Currently, there is no support for altering zone schedules, although entities can be switched to/from geniushub modes that utilize schedules.

There are limitations due to the differences between the Genius Hub and Home Assistant schemas (for example, Home Assistant has no **Footprint** mode) - use the actions below, for this functionality.

### Action handlers

Home Assistant is obligated to place restrictions upon integrations such as **geniushub** to maintain compatibility with other ecosystems (e.g.,  Google Home) and so not all of the **geniushub** functionality is available via the web UI. Some of this missing functionality is exposed via integration-specific actions:

- `set_switch_override`: change the switches on time _for a specified duration_ (up to 24h),
- `set_zone_override`: change the zone's setpoint _for a specified duration_ (up to 24h), and
- `set_zone_mode`: change the zone's mode to one of `off`, `timer` or (if supported by the zone) `footprint`

### Climate and water heater entities

Climate and water heater entities will report their current temperature, setpoint and mode; other properties (e.g.,  occupied state) are available via their state attributes (see examples below). The Genius Hub mode will be reported as/set to:

|    GH mode    | HA Operation | HA Preset |
| :-----------: | :----------: | :-------: |
|    **Off**    |     Off      |    N/A    |
|   **Timer**   |     Heat     |   None    |
| **Override**  |     Heat     |   Boost   |
| **Footprint** |     Heat     | Activity  |

**Footprint** mode is only available to **Radiator** zones that have room sensors.

### Switch entities

Switch entities will report back their state; other properties are available via their state attributes. Currently, HA switches do not have modes/presets, so the Home Assistant `state` will be *reported* as:

- `On` for **Override** \ **On**, and
- `Off` otherwise (NB: the zone could still be 'on', e.g.,  with **Timer** mode)

Note: if you turn a Switch entity `Off` via Home Assistant's web UI, it will revert to **Timer** mode - this may not be the behavior you are expecting.

Individual smart plugs are not yet exposed as switches - you can create one zone per smart plug as a work-around.

### Devices

Each device controlled by your Genius Hub will be exposed as either a:

- `Sensor` entity with a % battery, for any Device with a battery (e.g., a Genius Valve), or
- `Binary sensor` entity with on/off state for any Device that is a switch (e.g., Smart Plugs, DCRs)

Such entities will report back their primary state and `assigned_zone`. If the Hub is directly polled using Option 1 (see below), then some additional state attributes such as `last_comms` (last communications time) are also available.

### Issues

There are three `Sensor` entities that will indicate the number of **Errors**, **Warnings** and **Information** issues.

Each such entity has a state attribute that will contain a list of any such issues which can be used in automations, etc. For example:

{% raw %}

```yaml
- alias: "GeniusHub Error Alerts"
  triggers:
    - trigger: numeric_state
      entity_id: sensor.geniushub_errors
      above: 0
  actions:
    - action: notify.pushbullet_notifier
      data:
        title: "Genius Hub has errors"
        message: >-
          Genius Hub has the following {{ states('sensor.geniushub_errors') }} errors:
          {{ state_attr('sensor.geniushub_errors', 'error_list') }}
```

{% endraw %}

This alert may be useful to see if the CH is being turned on whilst you're on a holiday!

{% raw %}

```yaml
- alias: "GeniusHub CH State Change Alert"
  triggers:
    - trigger: state
      entity_id: binary_sensor.dual_channel_receiver_2_1
  actions:
    - action: notify.pushbullet_notifier
      data:
        title: "Warning: CH State Change!"
        message: >-
          {{ trigger.to_state.attributes.friendly_name }} has changed
          from {{ trigger.from_state.state }} to {{ trigger.to_state.state }}.
```

{% endraw %}

## State attributes

Many zone/device properties are available via the corresponding entity's state attributes. For example, in the case of **Radiator**-derived `Climate` entities (note 'status'):

```json
{
  "status": {
    "type": "radiator",
    "mode": "off",
    "temperature": 19,
    "occupied": False,
    "override": {
      "duration": 0,
      "setpoint": 16
    }
  }
}
```

... and for **Genius Valve**-derived `Sensor` entities (note 'state'):

```json
{
  "state": {
    "set_temperature": 4.0,
    "measured_temperature": 20.030000686645508,
    "setback": 3.5,
    "wakeup_interval": 450
  }
}
```

This data can be accessed in automations, etc. via a value template. For example:

{% raw %}

```yaml
value_template: "{{ state_attr('water_heater.genius_zone_2', 'status').override.setpoint }}"
```

{% endraw %}

In the specific case of **Radiator** zones with room sensors:

{% raw %}

```yaml
value_template: "{{ state_attr('climate.genius_zone_12', 'status').occupied }}"
```

{% endraw %}
