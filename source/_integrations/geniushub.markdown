---
title: "Genius Hub"
description: "Instructions on how to integrate Genius Hub with Home Assistant."
logo: geniushub.png
ha_category:
  - Climate
  - Water Heater
  - Sensor
  - Binary Sensor
ha_release: 0.92
ha_iot_class: Local Polling
---

The `geniushub` integration links Home Assistant with your Genius Hub CH/DHW system, including its Zones, Devices, and Issues.

It uses the [geniushub](https://pypi.org/project/geniushub-client/) client library.

### Zones

Each Zone controlled by your Genius Hub will be exposed as either a:

- `Climate` entity, for **Radiator** and **Wet Underfloor** Zones, and
- `Water Heater` entity, for **Hot Water Temperature** Zones

Other Zone types, such as **On / Off** Zones, are not currently supported (although see `Binary Sensor`s, below).

Each entity derived from a GH Zone will report back its mode, state, setpoint and current temperature; other properties are available via its attributes (see below). The Zone's mode can changed as below.

GH mode | HA Operation | HA Preset
:---: | :---: | :---:
**Off** | Off | N/A
**Timer** | Heat | None
**Override** | Heat | Boost
**Footprint** | Heat | Activity

Note that **Footprint** mode is only available to **Radiator** Zones that have room sensors.

Currently, there is no support for reading/altering Zone schedules, although a Zone can be switched to/from modes that utilize schedules.

### Devices

Each Device controlled by your Genius hub will be exposed as either a:

- `Sensor` entity with a % battery, for any Device with a battery (e.g. a Genius Valve), or
- `Binary Sensor` entity with on/off state for any Device that is a switch (e.g. Smart Plugs, DCRs)

Each such entity will report back its primary state and `assigned_zone`. If the Hub is directly polled using the v3 API (see below) then some additional attributes such as `last_comms` (last communications time) are also available.

### Issues

There are three `Sensor` entities that will indicate the number of **Errors**, **Warnings** and **Information** issues.

Each such entity has a state attribute that will contain a list of any such issues which can be used in automations, etc. For example:

{% raw %}
```yaml
- alias: GeniusHub Error Alerts
  trigger:
    platform: numeric_state
    entity_id: sensor.geniushub_errors
    above: 0
  action:
  - service: notify.pushbullet_notifier
    data_template:
      title: "Genius Hub has errors"
      message: >-
        Genius Hub has the following {{ states('sensor.geniushub_errors') }} errors:
        {{ state_attr('sensor.geniushub_errors', 'error_list') }}
```
{% endraw %}

This alert may be useful to see if the CH is being turned on whilst you're on holidays!

{% raw %}
```yaml
- alias: GeniusHub CH State Change Alert
  trigger:
    platform: state
    entity_id: binary_sensor.dual_channel_receiver_2_1
  action:
  - service: notify.pushbullet_notifier
    data_template:
      title: "Warning: CH State Change!"
      message: >-
        {{ trigger.to_state.attributes.friendly_name }} has changed
        from {{ trigger.from_state.state }} to {{ trigger.to_state.state }}.
```
{% endraw %}

### State Attributes

Other properties are available via each entity's state attributes. For example, in the case of **Radiator**-derived `Climate` entities (note 'status'):

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

## Configuration

To set up this integration, add one of the following to your **configuration.yaml** file.

If required, you can switch between one option and the other and, as the `entity_id` remain consistent, state history will be preserved.

Note that only the v3 API will expose Genius Devices in addition to Zones and Issues.

### Option 1: hub token only

- requires a **hub token** obtained from [my.geniushub.co.uk/tokens](https://my.geniushub.co.uk/tokens)
- uses the v1 API - which is well-documented
- polls Heat Genius' own servers (so is slower, say ~5-10s response time)

```yaml
# Example configuration.yaml entry, using a Hub Token
geniushub:
  token: GENIUS_HUB_TOKEN
```

### Option 2: hub hostname/address with user credentials

- requires your **username** & **password**, as used with [geniushub.co.uk/app](https://www.geniushub.co.uk/app)
- uses the v3 API - unofficial, but there are additional features (e.g., battery levels)
- polls the hub directly (so is faster, say ~1s response time)

The hub does not have to be in the same network as HA.

```yaml
# Example configuration.yaml entry, directly polling the Hub
geniushub:
  host: IP_ADDRESS
  username: GENIUS_HUB_USERNAME
  password: GENIUS_HUB_PASSWORD
```

{% configuration %}
token:
  description: The Hub Token of the Genius Hub.
  required: true
  type: string
host:
  description: The hostname/IP address of the Genius Hub.
  required: true
  type: string
username:
  description: Your Genius Hub username.
  required: false
  type: string
password:
  description: Your Genius Hub password.
  required: false
  type: string
{% endconfiguration %}

Note that if a `host` is used instead of `token`, then the `username` and `password` are also required.
