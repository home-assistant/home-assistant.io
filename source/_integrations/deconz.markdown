---
title: deCONZ
description: Instructions on how to setup ConBee/RaspBee devices with deCONZ from dresden elektronik within Home Assistant.
ha_category:
  - Hub
  - Binary Sensor
  - Cover
  - Light
  - Scene
  - Sensor
  - Switch
ha_release: 0.61
ha_iot_class: Local Push
ha_config_flow: true
ha_quality_scale: platinum
ha_codeowners:
  - '@kane610'
ha_domain: deconz
---

[deCONZ](https://www.dresden-elektronik.de/funk/software/deconz.html) by [dresden elektronik](https://www.dresden-elektronik.de) is a software that communicates with ConBee/RaspBee Zigbee gateways and exposes Zigbee devices that are connected to the gateway.

[deCONZ REST API](https://dresden-elektronik.github.io/deconz-rest-doc/).

There is currently support for the following device types within Home Assistant:

- [Binary Sensor](#binary-sensor)
- [Climate](#climate)
- [Cover](#cover)
- [Light](#light)
- [Scene](#scene)
- [Sensor](#sensor)
- [Switch](#switch)

## Recommended way of running deCONZ

An official add-on for deCONZ is available in the Home Assistant add-on store.
Otherwise, use [community container](https://hub.docker.com/r/marthoc/deconz/) by Marthoc for your deCONZ needs.

### Supported devices

See [deCONZ wiki](https://github.com/dresden-elektronik/deconz-rest-plugin/wiki/Supported-Devices) for a list of supported devices.

## Configuration

Home Assistant will automatically discover deCONZ presence on your network, if `discovery:` is present in your `configuration.yaml` file.

If you don't have the API key, you can generate an API key for deCONZ by using the one-click functionality similar to Philips Hue. Go to **Settings** → **Gateway** → **Advanced** → **Authenticate app** in the Phoscon App and then use the deCONZ configurator in Home Assistant frontend to create an API key. When you're done setting up deCONZ it will be stored as a configuration entry.

You can manually add deCONZ by going to the integrations page.

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

Available services: `configure` and `deconz.device_refresh`.

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

## Remote control devices

Remote controls (ZHASwitch category) will not be exposed as regular entities, but as events named `deconz_event` with a payload of `id` and `event` and in case of the Aqara Magic Cube also `gesture`. Id will be the device name from deCONZ and Event will be the momentary state of the switch. Gesture is used for some Aqara Magic Cube specific events like: flip 90 degrees, flip 180 degrees, clockwise and counter clockwise rotation. However, a sensor entity will be created that shows the battery level of the switch as reported by deCONZ, named sensor.device_name_battery_level.

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

- Hue Dimmer Remote
- Hue Tap
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

#### Requesting support for new device trigger

Requesting support for additional devices requires the device model (can be acquired from debug logs) together with a mapping of action and button event, e.g., Hue dimmer remote model "RWL021", Short press turn on 1000.

## Examples

### YAML

#### Step up and step down input number with wireless dimmer

{% raw %}

```yaml
automation:
  - alias: 'Toggle lamp from dimmer'
    initial_state: 'on'
    trigger:
      platform: event
      event_type: deconz_event
      event_data:
        id: remote_control_1
        event: 1002
    action:
      service: light.toggle
      entity_id: light.lamp

  - alias: 'Increase brightness of lamp from dimmer'
    initial_state: 'on'
    trigger:
      platform: event
      event_type: deconz_event
      event_data:
        id: remote_control_1
        event: 2002
    action:
      - service: light.turn_on
        data_template:
          entity_id: light.lamp
          brightness: >
            {% set bri = state_attr('light.lamp', 'brightness') | int %}
            {{ [bri+30, 249] | min }}

  - alias: 'Decrease brightness of lamp from dimmer'
    initial_state: 'on'
    trigger:
      platform: event
      event_type: deconz_event
      event_data:
        id: remote_control_1
        event: 3002
    action:
      - service: light.turn_on
        data_template:
          entity_id: light.lamp
          brightness: >
            {% set bri = state_attr('light.lamp', 'brightness') | int %}
            {{ [bri-30, 0] | max }}

  - alias: 'Turn lamp on when turning cube clockwise'
    initial_state: 'on'
    trigger:
      platform: event
      event_type: deconz_event
      event_data:
        id: remote_control_1
        gesture: 7
    action:
      service: light.turn_on
      entity_id: light.lamp
```

{% endraw %}

### AppDaemon

#### AppDaemon event helper

Helper app that creates a sensor `sensor.deconz_event` with a state that represents the id from the last event and an attribute to show the event data.

Put this in `apps.yaml`:
{% raw %}

```yaml
deconz_helper:
  module: deconz_helper
  class: DeconzHelper
```

Put this in `deconz_helper.py`:

```python
import appdaemon.plugins.hass.hassapi as hass
import datetime
from datetime import datetime


class DeconzHelper(hass.Hass):
    def initialize(self) -> None:
        self.listen_event(self.event_received, "deconz_event")

    def event_received(self, event_name, data, kwargs):
        event_data = data["event"]
        event_id = data["id"]
        event_received = datetime.now()

        self.log(f"Deconz event received from {event_id}. Event was: {event_data}")
        self.set_state(
            "sensor.deconz_event",
            state=event_id,
            attributes={
                "event_data": event_data,
                "event_received": str(event_received),
            },
        )
```

{% endraw %}

Note: the event will not be visible before one event gets sent.

#### AppDaemon remote template

{% raw %}

```yaml
remote_control:
  module: remote_control
  class: RemoteControl
  event: deconz_event
  id: dimmer_switch_1
```

```python
import appdaemon.plugins.hass.hassapi as hass


class RemoteControl(hass.Hass):
    def initialize(self):
        if "event" in self.args:
            self.listen_event(self.handle_event, self.args["event"])

    def handle_event(self, event_name, data, kwargs):
        if data["id"] == self.args["id"]:
            self.log(data["event"])
            if data["event"] == 1002:
                self.log("Button on")
            elif data["event"] == 2002:
                self.log("Button dim up")
            elif data["event"] == 3002:
                self.log("Button dim down")
            elif data["event"] == 4002:
                self.log("Button off")
```

{% endraw %}

#### AppDaemon IKEA Tradfri remote template

Community app from [Teachingbirds](https://community.home-assistant.io/u/teachingbirds/summary). This app uses an IKEA Tradfri remote to control Sonos speakers with play/pause, volume up and down, next and previous track.

{% raw %}

```yaml
sonos_remote_control:
  module: sonos_remote
  class: SonosRemote
  event: deconz_event
  id: sonos_remote
  sonos: media_player.sonos
```

{% endraw %}

{% raw %}

```python
import appdaemon.plugins.hass.hassapi as hass


class SonosRemote(hass.Hass):
    def initialize(self):
        self.sonos = self.args["sonos"]
        if "event" in self.args:
            self.listen_event(self.handle_event, self.args["event"])

    def handle_event(self, event_name, data, kwargs):
        if data["id"] == self.args["id"]:
            if data["event"] == 1002:
                self.log("Button toggle")
                self.call_service("media_player/media_play_pause", entity_id=self.sonos)

            elif data["event"] == 2002:
                self.log("Button volume up")
                self.call_service("media_player/volume_up", entity_id=self.sonos)

            elif data["event"] == 3002:
                self.log("Button volume down")
                self.call_service("media_player/volume_down", entity_id=self.sonos)

            elif data["event"] == 4002:
                self.log("Button previous")
                self.call_service(
                    "media_player/media_previous_track", entity_id=self.sonos
                )

            elif data["event"] == 5002:
                self.log("Button next")
                self.call_service("media_player/media_next_track", entity_id=self.sonos)
```

{% endraw %}

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
- Innr BY-265, BY-245
- OSRAM Classic A60 W clear - LIGHTIFY
- OSRAM Flex RGBW
- OSRAM Gardenpole RGBW
- Philips Hue White A19
- Philips Hue White Ambiance A19
- Philips Hue Hue White ambiance Milliskin (recessed spotlight) LTW013
- Philips Hue LightStrip Plus
- Busch Jaeger Zigbee Light Link univ. relai (6711 U) with Zigbee Light Link control element 6735-84
- Xiaomi Aqara Smart LED Bulb (white) E27 ZNLDP12LM

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
