---
title: deCONZ
description: Instructions on how to setup ConBee/RaspBee devices with deCONZ from dresden elektronik within Home Assistant.
ha_category:
  - Hub
  - Alarm
  - Binary Sensor
  - Cover
  - Fan
  - Light
  - Lock
  - Scene
  - Sensor
  - Switch
ha_release: 0.61
ha_iot_class: Local Push
ha_config_flow: true
ha_quality_scale: platinum
ha_codeowners:
  - '@Kane610'
ha_domain: deconz
ha_ssdp: true
ha_platforms:
  - alarm_control_panel
  - binary_sensor
  - climate
  - cover
  - fan
  - light
  - lock
  - sensor
  - switch
---

[deCONZ](https://www.dresden-elektronik.de/funk/software/deconz.html) by [dresden elektronik](https://www.dresden-elektronik.de) is a software that communicates with ConBee/RaspBee Zigbee gateways and exposes Zigbee devices that are connected to the gateway.

[deCONZ REST API](https://dresden-elektronik.github.io/deconz-rest-doc/).

There is currently support for the following device types within Home Assistant:

- [Alarm Control Panel](#alarm-control-panel)
- [Binary Sensor](#binary-sensor)
- [Climate](#climate)
- [Cover](#cover)
- [Light](#light)
- [Lock](#lock)
- [Scene](#scene)
- [Sensor](#sensor)
- [Switch](#switch)

## Recommended way of running deCONZ

An official add-on for deCONZ is available in the Home Assistant add-on store.
Otherwise, use [community container](https://hub.docker.com/r/marthoc/deconz/) by Marthoc for your deCONZ needs.

### Supported devices

See [deCONZ wiki](https://github.com/dresden-elektronik/deconz-rest-plugin/wiki/Supported-Devices) for a list of supported devices.

{% include integrations/config_flow.md %}

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

## Device services

Available services: `configure`, `deconz.device_refresh` and `deconz.remove_orphaned_entries`.

### Service `deconz.configure`

Set attribute of device in deCONZ using [REST-API](https://dresden-elektronik.github.io/deconz-rest-doc/rest/).

| Service data attribute | Optional | Description                                                                 |
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

#### Service `deconz.device_refresh`

Refresh with devices added to deCONZ after Home Assistants latest restart.

Note: deCONZ automatically signals Home Assistant when new sensors are added, but other devices must at this point in time (deCONZ v2.05.35) be added manually using this service or a restart of Home Assistant.

#### Service `deconz.remove_orphaned_entries`

Remove entries from entity and device registry which are no longer provided by deCONZ.

Note: it is recommended to use this service after a restart of Home Assistant Core in order to have deCONZ integration properly mirrored to deCONZ.

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

To simplify using remote control devices in automations deCONZ integration exposes them as device triggers. This will expose all possible variations of button presses and rotations. Note that this is a manually curated list and will not initially be as complete as what deCONZ supports.

Currently supported devices as device triggers:

- Hue Dimmer Switch
- Hue Smart Button
- Hue Tap Switch
- Friends of Hue Switch
- Symfonisk Sound Controller
- Trådfri On/Off Switch
- Trådfri Open/Close Remote
- Trådfri Remote Control
- Trådfri Wireless Dimmer
- Aqara Double Wall Switch
- Aqara Mini Switch
- Aqara Round Switch
- Aqara Square Switch
- Aqara Magic Cube
- Aqara Opple 2/4/6 button Switches

#### Requesting support for new device trigger

Requesting support for additional devices requires the device model (can be acquired from debug logs) together with a mapping of action and button event, e.g., Hue dimmer remote model "RWL021", Short press turn on 1000.

## Examples

### YAML

#### Step up and step down input number with wireless dimmer

{% raw %}

```yaml
automation:
  - alias: "'Toggle lamp from dimmer'"
    initial_state: "on"
    trigger:
      - platform: event
        event_type: deconz_event
        event_data:
          id: remote_control_1
          event: 1002
    action:
      - service: light.toggle
        target:
          entity_id: light.lamp

  - alias: "Increase brightness of lamp from dimmer"
    initial_state: "on"
    trigger:
      - platform: event
        event_type: deconz_event
        event_data:
          id: remote_control_1
          event: 2002
    action:
      - service: light.turn_on
        target:
          entity_id: light.lamp
        data:
          brightness: >
            {% set bri = state_attr('light.lamp', 'brightness') | int %}
            {{ [bri+30, 249] | min }}

  - alias: "Decrease brightness of lamp from dimmer"
    initial_state: "on"
    trigger:
      - platform: event
        event_type: deconz_event
        event_data:
          id: remote_control_1
          event: 3002
    action:
      - service: light.turn_on
        target:
          entity_id: light.lamp
        data:
          brightness: >
            {% set bri = state_attr('light.lamp', 'brightness') | int %}
            {{ [bri-30, 0] | max }}

  - alias: 'Turn lamp on when turning cube clockwise'
    initial_state: "on"
    trigger:
      - platform: event
        event_type: deconz_event
        event_data:
          id: remote_control_1
          gesture: 7
    action:
      - service: light.turn_on
        target:
          entity_id: light.lamp
```

{% endraw %}

#### Changing color through the Müller Licht tint remote control

{% raw %}

```yaml
automation:
  - alias: "React to color wheel changes"
    trigger:
      - platform: event
        event_type: deconz_event
        event_data:
          id: tint_remote_1
          event: 6002
    action:
      - service: light.turn_on
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
    mode: single
    trigger:
      - platform: state
        entity_id: binary_sensor.doorbell_motion
        to: "on"
    action:
      - service: deconz.configure
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
      - service: deconz.configure
        data:
          entity: light.hue_lamp
          field: "/state"
          data:
            'on': false
```

## Alarm Control Panel

The entity of a physical keypad. Can be in 4 different modes (`arm_away`, `arm_home`, `arm_night` or `disarmed`). Changing the state will do an audible notification from the keypad.

The Device also exposes a new event type `deconz_alarm_event` which signals a user action with the keypad.
The Payload consists of an event (`arm_away`, `arm_home`, `arm_night` or `disarmed`) and a four-digit code.

## Binary Sensor

The following sensor types are supported:

- Fire/Smoke detection
- Open/Close detection
- Presence detection
- Water leakage detection

The `entity_id` name will be `binary_sensor.device_name`, where `device_name` is defined in deCONZ.

### Verified supported binary sensors

- Open/Close Detection
  - Xiaomi Smart Home Security Door & Window Contact Sensor
- Presence Detection
  - IKEA Trådfri Motion Sensor
  - Philips Hue Motion Sensor
  - Xiaomi Motion Sensor
  - Xiaomi Smart Home Aqara Human Body Sensor
- Water leakage detection
  - Xiaomi Aqara water leak Sensor

## Climate

See the [deCONZ main integration](/integrations/deconz/) for configuration instructions.

Climate currently represent thermostats.

Note that devices in the climate platform identify as sensors, so there is a manually curated list that defines which "sensors" are climate devices.

The `entity_id` name will be `climate.device_name`, where `device_name` is defined in deCONZ.

### Verified supported climate devices

- Bitron Thermostat 902010/32
- Eurotronic SPZB0001

## Cover

Covers are devices like ventilation dampers or smart window covers.

Note that devices in the cover platform identify as lights, so there is a manually curated list that defines which "lights" are covers. You therefore add a cover device as a light device in deCONZ (Phoscon App).

The `entity_id` name will be `cover.device_name`, where `device_name` is defined in deCONZ.

### Verified supported covers

- IKEA Fyrtur
- IKEA Kadrilj
- Keen vents
- Xiaomi Aqara Curtain controller

## Fan

Fans from deCONZ are currently a combination of a light and fan fixture.

Note that devices in the fan platform identify as lights, so there is a manually curated list that defines which "lights" are fans. You, therefore, add a fan device as a light device in deCONZ (Phoscon App).

## Light

The `entity_id` names will be `light.device_name`, where `device_name` is defined in deCONZ. Light groups created in deCONZ will be created in Home Assistant as lights named `light.group_name_in_deconz`, allowing the user to control groups of lights with only a single API call to deCONZ.

### Verified supported lights

- IKEA Trådfri bulb E14 WS Opal 400lm
- IKEA Trådfri bulb E14 WS Opal 600lm
- IKEA Trådfri bulb E27 WS clear 806lm
- IKEA Trådfri bulb E27 WS clear 950lm
- IKEA Trådfri bulb E27 WS Opal 980lm
- IKEA Trådfri bulb E27 WS Opal 1000lm
- IKEA Trådfri bulb E27 WS & RGB Opal 600lm
- IKEA Trådfri bulb GU10 W 400lm
- IKEA Trådfri FLOALT LED light panel
- Innr BY-265, BY-245, RB-265
- OSRAM Classic A60 W clear - LIGHTIFY
- OSRAM Flex RGBW
- OSRAM Gardenpole RGBW
- Philips Hue White A19
- Philips Hue White Ambiance A19
- Philips Hue Hue White ambiance Milliskin (recessed spotlight) LTW013
- Philips Hue LightStrip Plus
- Busch Jaeger Zigbee Light Link univ. relai (6711 U) with Zigbee Light Link control element 6735-84
- Xiaomi Aqara Smart LED Bulb (white) E27 ZNLDP12LM

## Lock

Locks are devices such as the Danalock Zigbee lock.

Note that devices in the `lock` platform identify as lights, so there is a manually curated list that defines which "lights" are locks. You therefore add a lock device as a light device in deCONZ (Phoscon App).

The `entity_id` name will be `lock.device_name`, where `device_name` is defined in deCONZ.

## Scene

The `entity_id` name will be `scene.group_scene_name`, where `group` is which group the scene belongs to and the name of the scene, both group and name are defined in deCONZ.

## Sensor

The following sensor types are supported:

- Humidity sensor
- Light level sensor
- Pressure sensor
- Switches
- Temperature sensor

The `entity_id` name will be `sensor.device_name`, where `device_name` is defined in deCONZ. Switches aren't exposed as ordinary entities, see the [deCONZ main integration](/integrations/deconz/) for more details.

### Verified to be supported sensors

- Humidity Sensor
  - Xiaomi Aqara Humidity/Temperature Sensor
  - Xiaomi MiJia Smart Temperature & Humidity Sensor
- Light Level Sensor
- Pressure Sensor
- Switches
  - IKEA Trådfri Wireless Dimmer
  - Philips Hue Motion Sensor
  - IKEA Trådfri Remote
  - Philips Hue Dimmer Switch
  - Xiaomi Aqara Smart Light Switch
  - Xiaomi Aqara Smart Wireless Switch
  - Xiaomi Smart Home Wireless Switch
- Temperature Sensor
  - Xiaomi Temperature/Humidity Sensor
- OpenClose Sensor
  - Xiaomi Window / Door Sensor with Temperature

### deCONZ Daylight Sensor

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

## Switch

Switches are devices like power plugs and sirens.

Note that devices in the switch platform identify as lights, so there is a manually curated list that defines which "lights" are switches.

The `entity_id` name will be `switch.device_name`, where `device_name` is defined in deCONZ.

### Verified supported switches

- Innr SP120
- Innr ZB-ONOFFPlug-D0005/SmartThings Smart Plug (2019) (without power measurements)
- Osram Lightify plug
- Osram Outdoor plug
- Heiman siren
