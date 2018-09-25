---
layout: page
title: "deCONZ"
description: "Instructions on how to setup Conbee/Raspbee devices with deCONZ from Dresden Elektronik within Home Assistant."
date: 2017-11-12 16:30
sidebar: true
comments: false
sharing: true
footer: true
logo: deconz.jpeg
ha_category: Hub
ha_release: "0.61"
ha_iot_class: "Local Push"
---

[deCONZ](https://www.dresden-elektronik.de/funktechnik/products/software/pc/deconz/) by [Dresden Elektronik](https://www.dresden-elektronik.de) is a software that communicates with Conbee/Raspbee Zigbee gateways and exposes Zigbee devices that are connected to the gateway.

[deCONZ REST API](http://dresden-elektronik.github.io/deconz-rest-doc/).

### {% linkable_title Recommended way of running deCONZ %}

Use [community container](https://hub.docker.com/r/marthoc/deconz/) by Marthoc for your deCONZ needs. It works both as a standalone container as well as with HASS.io.

### {% linkable_title Supported devices %}

See [deCONZ wiki](https://github.com/dresden-elektronik/deconz-rest-plugin/wiki/Supported-Devices) for a list of supported devices.

## {% linkable_title Configuration %}

Home Assistant will automatically discover deCONZ presence on your network, if `discovery:` is present in your `configuration.yaml` file.

If you don't have the API key, you can generate an API key for deCONZ by using the one-click functionality similar to Philips Hue. Go to **Settings** -> **Gateway** -> **Advanced** -> **Authenticate app** in deCONZ and then use the deCONZ configurator in Home Assistant frontend to create an API key. When you're done setting up deCONZ it will be stored as a config entry.

You can add the following to your `configuration.yaml` file if you are not using the `discovery:` component:

```yaml
# Example configuration.yaml entry
deconz:
  host: IP_ADDRESS
```

{% configuration %}
host:
  description: The IP address of your deCONZ web server.
  required: false
  type: string
api_key:
  description: The API key to access your deCONZ web server.
  required: false
  type: string
port:
  description: Configure port deCONZ web server is accessible from.
  required: false
  default: 80
  type: int
{% endconfiguration %}

A full configuration could look like this:

```yaml
# Example configuration.yaml entry
deconz:
  host: 127.0.0.1
  api_key: 0123456789
  port: 80
```

## {% linkable_title Debugging component %}

If you have problems with deCONZ or the component you can add debug prints to the log.

```yaml
logger:
  default: info
  logs:
    pydeconz: debug
    homeassistant.components.deconz: debug
```

## {% linkable_title Device services %}

Available services: `configure` and `deconz.refresh_devices`.

#### {% linkable_title Service `deconz.configure` %}

Set attribute of device in deCONZ using [Rest API](http://dresden-elektronik.github.io/deconz-rest-doc/rest/).

| Service data attribute | Optional | Description |
|-----------|----------|-------------|
| `field` | No | String representing a specific device in deCONZ. |
| `entity` | No | String representing a specific Home Assistant entity of a device in deCONZ. |
| `data` | No | Data is a JSON object with what data you want to alter. |

Field and entity are exclusive, i.e you can only use one in a request.

{ "field": "/lights/1", "data": {"name": "light2"} }

{ "entity": "light.light1", "data": {"name": "light2"} }

{ "field": "/config", "data": {"permitjoin": 60} }

#### {% linkable_title Service `deconz.refresh_devices` %}

Refresh with devices added to deCONZ after Home Assistants latest restart.

Note: deCONZ automatically signals Home Assistant when new sensors are added, but other devices must at this point in time (deCONZ v2.05.35) be added manually using this service or a restart of Home Assistant.

## {% linkable_title Remote control devices %}

Remote controls (ZHASwitch category) will be not be exposed as regular entities, but as events named `deconz_event` with a payload of `id` and `event`. Id will be the device name from deCONZ and Event will be the momentary state of the switch. However, a sensor entity will be created that shows the battery level of the switch as reported by deCONZ, named sensor.device_name_battery_level.

Typical values for switches, the event codes are 4 numbers where the first and last number are of interest here.

| Switch code | Description |
|-------------|-------------|
| 1XXX | Button #1 up to #8 |
| XXX1 | Button hold |
| XXX2 | Button short release |
| XXX3 | Button long release |

Where for example on a Philips Hue Dimmer, 2001 would be holding the dim up button.

For the IKEA Tradfri remote, 1 is the middle button, 2 is up, 3 is down, 4 is left, and 5 is right.

## {% linkable_title Examples %}

### {% linkable_title YAML %}

####  {% linkable_title Step up and step down input number with wireless dimmer %}

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
            {% set bri = states.light.lamp.attributes.brightness | int %}
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
            {% set bri = states.light.lamp.attributes.brightness | int %}
            {{ [bri-30, 0] | max }}
```
{% endraw %}

### {% linkable_title Appdaemon %}

#### {% linkable_title Appdaemon event helper %}
Helper app that creates a sensor `sensor.deconz_event` with a state that represents the id from the last event and an attribute to show the event data.

{% raw %}
```yaml
deconz_helper:
  module: deconz_helper
  class: DeconzHelper
```

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

        self.log("Deconz event received from {}. Event was: {}".format(event_id, event_data))
        self.set_state("sensor.deconz_event", state = event_id, attributes = {"event_data": event_data, "event_received": str(event_received)})
```
{% endraw %}


#### {% linkable_title Appdaemon remote template %}

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
        if 'event' in self.args:
            self.listen_event(self.handle_event, self.args['event'])

    def handle_event(self, event_name, data, kwargs):
        if data['id'] == self.args['id']:
            self.log(data['event'])
            if data['event'] == 1002:
                self.log('Button on')
            elif data['event'] == 2002:
                self.log('Button dim up')
            elif data['event'] == 3002:
                self.log('Button dim down')
            elif data['event'] == 4002:
                self.log('Button off')
```
{% endraw %}

#### {% linkable_title Appdaemon remote template %}

Community app from [Teachingbirds](https://community.home-assistant.io/u/teachingbirds/summary). This app uses an Ikea Tradfri remote to control Sonos speakers with play/pause, volume up and down, next and previous track.

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
        self.sonos = self.args['sonos']
        if 'event' in self.args:
            self.listen_event(self.handle_event, self.args['event'])

    def handle_event(self, event_name, data, kwargs):
        if data['id'] == self.args['id']:
            if data['event'] == 1002:
                self.log('Button toggle')
                self.call_service("media_player/media_play_pause", entity_id = self.sonos)

            elif data['event'] == 2002:
                self.log('Button volume up')
                self.call_service("media_player/volume_up", entity_id = self.sonos)

            elif data['event'] == 3002:
                self.log('Button volume down')
                self.call_service("media_player/volume_down", entity_id = self.sonos)

            elif data['event'] == 4002:
                self.log('Button previous')
                self.call_service("media_player/media_previous_track", entity_id = self.sonos)                    

            elif data['event'] == 5002:
                self.log('Button next')
                self.call_service("media_player/media_next_track", entity_id = self.sonos)
```
{% endraw %}
