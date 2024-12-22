---
title: deCONZ
description: Instructions on how to setup ConBee/RaspBee devices with deCONZ from dresden elektronik within Home Assistant.
ha_category:
  - Alarm
  - Binary sensor
  - Cover
  - Fan
  - Hub
  - Light
  - Lock
  - Scene
  - Sensor
  - Siren
  - Switch
ha_release: 0.61
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@Kane610'
ha_domain: deconz
ha_ssdp: true
ha_platforms:
  - alarm_control_panel
  - binary_sensor
  - button
  - climate
  - cover
  - diagnostics
  - fan
  - light
  - lock
  - number
  - scene
  - select
  - sensor
  - siren
  - switch
ha_integration_type: hub
---

[deCONZ](https://www.dresden-elektronik.de/funk/software/deconz.html) by [dresden elektronik](https://www.dresden-elektronik.de) is a software that communicates with ConBee/RaspBee Zigbee gateways and exposes Zigbee devices that are connected to the gateway.


There is currently support for the following device types within Home Assistant:

- [Alarm control panel](#alarm-control-panel)
- [Binary sensor](#binary-sensor)
- [Climate](#climate)
- [Cover](#cover)
- [Light](#light)
- [Lock](#lock)
- [Scene](#scene)
- [Sensor](#sensor)
- [Siren](#siren)
- [Switch](#switch)

## Recommended way of running deCONZ

An official add-on for deCONZ is available in the Home Assistant add-on store.
Otherwise, use [community container](https://github.com/deconz-community/deconz-docker) for your deCONZ needs.

### Supported devices

See [deCONZ wiki](https://github.com/dresden-elektronik/deconz-rest-plugin/wiki/Supported-Devices) for a list of supported devices.

{% include integrations/config_flow.md %}

Running a stand-alone instance of deCONZ (non add-on installation) requires a pairing between the deCONZ gateway and Home Assistant. To allow Home Assistant to connect with deCONZ go to the Phoscon UI select **Settings** > **Gateway** > **Advanced** and select the **Authenticate app** button. This same information is also shown during the config flow of the deCONZ integration.

## Debugging integration

If you have problems with deCONZ or the integration you can add debug prints to the log.

```yaml
logger:
  default: info
  logs:
    pydeconz: debug
    homeassistant.components.deconz: debug
```

## Troubleshooting

If you are having issues and want to report a problem, always start with making sure that you're on the latest [deCONZ software version](https://github.com/dresden-elektronik/deconz-rest-plugin/releases) and [latest firmware for hardware](http://deconz.dresden-elektronik.de/deconz-firmware/?C=M;O=D).

### No state updates

If the state of {% term entities %} are only reflected in Home Assistant when the {% term integration %} is loaded (during restart, reload, setup) you probably have an issue with the WebSocket configuration where your deCONZ instance is running. The deCONZ integration uses the WebSocket port provided by the deCONZ REST API. If you're running the deCONZ Docker container make sure that it properly configures the WebSocket port so deCONZ can report what port is exposed outside of the containerized environment. Also, make sure to review firewall rules that might block communication over certain ports.

## Device actions

Available actions: `configure`, `deconz.device_refresh` and `deconz.remove_orphaned_entries`.

### Action `deconz.configure`

Set the attribute of device in deCONZ using [REST-API](https://dresden-elektronik.github.io/deconz-rest-doc/about_rest/).

| Data attribute | Optional | Description                                                                 |
| ---------------------- | -------- | --------------------------------------------------------------------------- |
| `field`                | No       | String representing a specific device in deCONZ.                            |
| `entity`               | No       | String representing a specific Home Assistant entity of a device in deCONZ. |
| `data`                 | No       | Data is a JSON object with what data you want to alter.                     |

Either `entity` or `field` must be provided. If both are present, `field` will be interpreted as a subpath under the device path corresponding to the specified `entity`:

```json
{ "field": "/lights/1", "data": {"name": "light2"} }
```

```json
{ "entity": "light.light1", "data": {"name": "light2"} }
```

```json
{ "entity": "light.light1", "field: "/state", "data": {"on": true} }
```

```json
{ "field": "/config", "data": {"permitjoin": 60} }
```

### Action `deconz.device_refresh`

Refresh with devices added to deCONZ after Home Assistants latest restart.

{% note %}
deCONZ automatically signals Home Assistant when new {% term sensors %} are added, but other devices must at this point in time (deCONZ v2.05.35) be added manually using this action or a restart of Home Assistant.
{% endnote %}

### Action `deconz.remove_orphaned_entries`

Remove entries from {% term entity %} and device registry which are no longer provided by deCONZ.

{% note %}
It is recommended to use this {% term action %} after a restart of Home Assistant Core in order to have deCONZ integration properly mirrored to deCONZ.
{% endnote %}

## Remote control devices

Remote controls (ZHASwitch category) will not be exposed as regular entities, but as events named `deconz_event` with a payload of `id` and `event`. Id will be the device name from deCONZ and Event will be the momentary state of the switch.

Depending on the device some device-specific attributes may also be included in the payload. In case of the Aqara Magic Cube, an additional `gesture` attribute will be exposed. For the tint remote, the `angle` and `xy` attributes will be included in the payload. Gesture is used for some Aqara Magic Cube specific events like: flip 90 degrees, flip 180 degrees, clockwise and counterclockwise rotation. However, a sensor entity will be created that shows the battery level of the switch, as reported by deCONZ, named sensor.device_name_battery_level.

Typical values for switches, the event codes are 4 numbers where the first and last number are of interest here.

| Switch code | Description          |
| ----------- | -------------------- |
| 1XXX        | Button #1 up to #8   |
| XXX1        | Button hold          |
| XXX2        | Button short release |
| XXX3        | Button long release  |

Where for example on a Philips Hue Dimmer, 2001 would be holding the dim up button.

For the IKEA Tradfri remote the first digit equals, 1 for the middle button, 2 for up, 3 for down, 4 for left, and 5 for right (e.g., "event: 1002" for middle button short release).

Specific gestures for the Aqara Magic Cube are:

| Gesture | Description            |
| ------- | ---------------------- |
| 0       | Awake                  |
| 1       | Shake                  |
| 2       | Free fall              |
| 3       | Flip 90                |
| 4       | Flip 180               |
| 5       | Move on any side       |
| 6       | Double tap on any side |
| 7       | Turn clockwise         |
| 8       | Turn counter clockwise |

### Finding your events

Navigate to **Developer tools->Events**. In the section **Listen to events** add `deconz_event` and press **START LISTENING**. All events from deCONZ will now be shown and by pushing your remote button while monitoring the log it should be fairly easy to find the events you are looking for.

### Device triggers

To simplify using remote control devices in automations deCONZ integration exposes them as device triggers. This will expose all possible variations of button presses and rotations. Most popular brands of Zigbee remotes are supported.

#### Requesting support for new device trigger

If you have a Zigbee remote that is not yet supported you can request support for it by creating an issue on Home Assistant Core GitHub repository. This requires the device model (can be acquired from debug logs) together with a mapping of action and button event, e.g., Hue dimmer remote model "RWL021", Short press turn on 1000.

## Examples

### YAML

#### Step up and step down input number with wireless dimmer

{% raw %}

```yaml
automation:
  - alias: "'Toggle lamp from dimmer'"
    initial_state: "on"
    triggers:
      - trigger: event
        event_type: deconz_event
        event_data:
          id: remote_control_1
          event: 1002
    actions:
      - action: light.toggle
        target:
          entity_id: light.lamp

  - alias: "Increase brightness of lamp from dimmer"
    initial_state: "on"
    triggers:
      - trigger: event
        event_type: deconz_event
        event_data:
          id: remote_control_1
          event: 2002
    actions:
      - action: light.turn_on
        target:
          entity_id: light.lamp
        data:
          brightness: >
            {% set bri = state_attr('light.lamp', 'brightness') | int %}
            {{ [bri+30, 249] | min }}

  - alias: "Decrease brightness of lamp from dimmer"
    initial_state: "on"
    triggers:
      - trigger: event
        event_type: deconz_event
        event_data:
          id: remote_control_1
          event: 3002
    actions:
      - action: light.turn_on
        target:
          entity_id: light.lamp
        data:
          brightness: >
            {% set bri = state_attr('light.lamp', 'brightness') | int %}
            {{ [bri-30, 0] | max }}

  - alias: 'Turn lamp on when turning cube clockwise'
    initial_state: "on"
    triggers:
      - trigger: event
        event_type: deconz_event
        event_data:
          id: remote_control_1
          gesture: 7
    actions:
      - action: light.turn_on
        target:
          entity_id: light.lamp
```

{% endraw %}

#### Changing color through the Müller Licht tint remote control

{% raw %}

```yaml
automation:
  - alias: "React to color wheel changes"
    triggers:
      - trigger: event
        event_type: deconz_event
        event_data:
          id: tint_remote_1
          event: 6002
    actions:
      - action: light.turn_on
        data:
          xy_color:
            - '{{ trigger.event.data.xy.0 }}'
            - '{{ trigger.event.data.xy.1 }}'
          entity_id: light.example_color_light_1
    mode: restart
```

{% endraw %}

#### Colored Flashing - RGB Philips Hue bulb using deconz.configure

Note: Requires `on: true` to change color while the Philips Hue bulb is off. If `on: true` is specified, the bulb remains on after flashing is complete. The previous color is not saved or restored. To color flash light groups, replace `/state` with `/action` and specify the light group as the entity.

```yaml
automation:
  - alias: "Flash Hue Bulb with Doorbell Motion"
    triggers:
      - trigger: state
        entity_id: binary_sensor.doorbell_motion
        to: "on"
    actions:
      - action: deconz.configure
        data:
          entity: light.hue_lamp
          field: /state
          data:
            'on': true
            hue: 65535
            sat: 255
            bri: 255
            alert: "breathe"
      - delay: 00:00:15
      - action: deconz.configure
        data:
          entity: light.hue_lamp
          field: "/state"
          data:
            'on': false
```

## Platforms

The `entity_id` name will be `platform.device_name`, where `device_name` is defined in deCONZ.

### Alarm control panel

The entity of a physical keypad. Can be in 4 different modes (`arm_away`, `arm_home`, `arm_night` or `disarmed`). Changing the state will do an audible notification from the keypad.

The Device also exposes a new event type `deconz_alarm_event` which reflects signals not supported within the alarm control panel platform.
The Payload consists of an event (`emergency`, `fire`, `invalid_code` or `panic`).

### Binary sensor

The following sensor types are supported:

- Alarm signalling
- Fire/Smoke detection
- Open/Close detection
- Presence detection
- Vibration detection
- Water leakage detection

### Climate

See the [deCONZ main integration](/integrations/deconz/) for configuration instructions.

Climate currently represent thermostats.

Note that devices in the climate platform identify as sensors, so there is a manually curated list that defines which "sensors" are climate devices.

### Cover

Covers are devices like ventilation dampers or smart window covers.

### Fan

Fans from deCONZ are currently a combination of a light and fan fixture.

### Light

The Light platform keeps light devices and deCONZ light groups. Light groups created in deCONZ will be created in Home Assistant as lights named `light.group_name_in_deconz`, allowing the user to control groups of lights with only a single API call to deCONZ.

### Lock

Locks are devices such as the Danalock Zigbee lock.

### Scene

The `entity_id` name will be `scene.group_scene_name`, where `group` is which group the scene belongs to and the name of the scene, both group and name are defined in deCONZ.

### Sensor

The following sensor types are supported:

- Air quality sensor
- Battery sensor
- Consumption sensor
- Daylight
- Humidity sensor
- Moisture sensor
- Light level sensor
- Power sensor
- Pressure sensor
- Switches
- Temperature sensor

Switches aren't exposed as ordinary entities, see the [deCONZ main integration](/integrations/deconz/) for more details.

#### deCONZ Daylight Sensor

The deCONZ Daylight sensor is a special sensor built into the deCONZ software since version 2.05.12. It is represented in Home Assistant as a sensor called sensor.daylight. The sensor's state value is a string corresponding to the phase of daylight (descriptions below taken from <https://github.com/mourner/suncalc>, on which the deCONZ implementation is based):

| Sensor State  | Description                                                              |
| ------------- | ------------------------------------------------------------------------ |
| sunrise_start | sunrise (top edge of the sun appears on the horizon)                     |
| sunrise_end   | sunrise ends (bottom edge of the sun touches the horizon)                |
| golden_hour_1 | morning golden hour (soft light, the best time for photography)          |
| solar_noon    | solar noon (sun is in the highest position)                              |
| golden_hour_2 | evening golden hour                                                      |
| sunset_start  | sunset starts (bottom edge of the sun touches the horizon)               |
| sunset_end    | sunset (sun disappears below the horizon, evening civil twilight starts) |
| dusk          | dusk (evening nautical twilight starts)                                  |
| nautical_dusk | nautical dusk (evening astronomical twilight starts)                     |
| night_start   | night starts (dark enough for astronomical observations)                 |
| nadir         | nadir (darkest moment of the night, the sun is in the lowest position)   |
| night_end     | night ends (morning astronomical twilight starts)                        |
| nautical_dawn | nautical dawn (morning nautical twilight starts)                         |
| dawn          | dawn (morning nautical twilight ends, morning civil twilight starts)     |

The sensor also has an attribute called "daylight" that has the value `true` when the sensor's state is `golden_hour_1`, `solar_noon`, or `golden_hour_2`, and `false` otherwise.

These states can be used in automations as a trigger (e.g., trigger when a certain phase of daylight starts or ends) or condition (e.g., trigger only if in a certain phase of daylight).

Please note that the deCONZ daylight sensor is disabled by default in Home Assistant. It can be enabled manually by going to your deCONZ controller device in the Home Assistant UI.

### Siren

Control audible devices with a limit on how long the signal should sound.

### Switch

Switches are devices such as power plugs.

The `entity_id` name will be `switch.device_name`, where `device_name` is defined in deCONZ.
