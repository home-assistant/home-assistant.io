---
title: "MQTT Cover"
description: "Instructions on how to integrate MQTT covers into Home Assistant."
ha_category:
  - Cover
ha_iot_class: Configurable
ha_release: 0.18
ha_domain: mqtt
---

The `mqtt` cover platform allows you to control an MQTT cover (such as blinds, a roller shutter or a garage door).

## Configuration

A cover entity can be in states (`open`, `opening`, `closed` or `closing`).

If a `state_topic` is configured, the entity's state will be updated only after an MQTT message is received on `state_topic` matching `state_open`, `state_opening`, `state_closed` or `state_closing`. For covers that only report 3 states (`opening`, `closing`, `stopped`), a `state_stopped` state can be configured to indicate that the device is not moving. When this payload is received on the `state_topic`, and a `position_topic` is not configured, the cover will be set to state `closed` if its state was `closing` and to state `open` otherwise. If a `position_topic` is set, the cover's position will be used to set the state to either `open` or `closed` state.

If the cover reports its position, a `position_topic` can be configured for receiving the position. If no `state_topic` is configured, the cover's state will be set to either `open` or `closed` when a position is received.

If the cover reports its tilt position, a `tilt_status_topic` can be configured for receiving the tilt position.
If position topic and state topic are both defined, the device state (`open`, `opening`, `closed` or `closing`) will be set by the state topic and the cover position will be set by the position topic.

If neither a state topic nor a position topic are defined, the cover will work in optimistic mode. In this mode, the cover will immediately change state (`open` or `closed`) after every command sent by Home Assistant. If a state topic/position topic is defined, the cover will wait for a message on `state_topic` or `position_topic`.

Optimistic mode can be forced, even if a `state_topic` / `position_topic` is defined. Try to enable it if experiencing incorrect cover operation (Google Assistant gauge may need optimistic mode as it often send request to your Home Assistant immediately after send set_cover_position in which case MQTT could be too slow).

The `mqtt` cover platform optionally supports a list of `availability` topics to receive online and offline messages (birth and LWT messages) from the MQTT cover device. During normal operation, if the MQTT cover device goes offline (i.e., publishes a matching `payload_not_available` to any `availability` topic), Home Assistant will display the cover as "unavailable". If these messages are published with the `retain` flag set, the cover will receive an instant update after subscription and Home Assistant will display correct availability state of the cover when Home Assistant starts up. If the `retain` flag is not set, Home Assistant will display the cover as "unavailable" when Home Assistant starts up.

To use your MQTT cover in your installation, add the following to your {% term "`configuration.yaml`" %} file:

```yaml
# Example configuration.yaml entry
mqtt:
  - cover:
      command_topic: "home-assistant/cover/set"
```

{% configuration %}
availability:
  description: "A list of MQTT topics subscribed to receive availability (online/offline) updates. Must not be used together with `availability_topic`."
  required: false
  type: list
  keys:
    payload_available:
      description: The payload that represents the available state.
      required: false
      type: string
      default: online
    payload_not_available:
      description: The payload that represents the unavailable state.
      required: false
      type: string
      default: offline
    topic:
      description: An MQTT topic subscribed to receive availability (online/offline) updates.
      required: true
      type: string
    value_template:
      description: "Defines a [template](/docs/configuration/templating/#using-templates-with-the-mqtt-integration) to extract device's availability from the `topic`. To determine the devices's availability result of this template will be compared to `payload_available` and `payload_not_available`."
      required: false
      type: template
availability_mode:
  description: When `availability` is configured, this controls the conditions needed to set the entity to `available`. Valid entries are `all`, `any`, and `latest`. If set to `all`, `payload_available` must be received on all configured availability topics before the entity is marked as online. If set to `any`, `payload_available` must be received on at least one configured availability topic before the entity is marked as online. If set to `latest`, the last `payload_available` or `payload_not_available` received on any configured availability topic controls the availability.
  required: false
  type: string
  default: latest
availability_template:
  description: "Defines a [template](/docs/configuration/templating/#using-templates-with-the-mqtt-integration) to extract device's availability from the `availability_topic`. To determine the devices's availability result of this template will be compared to `payload_available` and `payload_not_available`."
  required: false
  type: template
availability_topic:
  description: "The subscribed-to MQTT topic to receive birth and LWT messages from the MQTT cover device. If an `availability` topic is not defined, the cover availability state will always be `available`. If an `availability` topic is defined, the cover availability state will be `unavailable` by default. Must not be used together with `availability`."
  required: false
  type: string
command_topic:
  description: The MQTT topic to publish commands to control the cover.
  required: false
  type: string
device:
  description: "Information about the device this cover is a part of to tie it into the [device registry](https://developers.home-assistant.io/docs/en/device_registry_index.html). Only works when [`unique_id`](#unique_id) is set. At least one of identifiers or connections must be present to identify the device."
  required: false
  type: map
  keys:
    configuration_url:
      description: 'A link to the webpage that can manage the configuration of this device. Can be either an `http://`, `https://` or an internal `homeassistant://` URL.'
      required: false
      type: string
    connections:
      description: 'A list of connections of the device to the outside world as a list of tuples `[connection_type, connection_identifier]`. For example the MAC address of a network interface: `"connections": [["mac", "02:5b:26:a8:dc:12"]]`.'
      required: false
      type: list
    hw_version:
      description: "The hardware version of the device."
      required: false
      type: string
    identifiers:
      description: 'A list of IDs that uniquely identify the device. For example a serial number.'
      required: false
      type: [list, string]
    manufacturer:
      description: The manufacturer of the device.
      required: false
      type: string
    model:
      description: The model of the device.
      required: false
      type: string
    model_id:
      description: The model identifier of the device.
      required: false
      type: string
    name:
      description: The name of the device.
      required: false
      type: string
    serial_number:
      description: "The serial number of the device."
      required: false
      type: string
    suggested_area:
      description: 'Suggest an area if the device isn’t in one yet.'
      required: false
      type: string
    sw_version:
      description: The firmware version of the device.
      required: false
      type: string
    via_device:
      description: 'Identifier of a device that routes messages between this device and Home Assistant. Examples of such devices are hubs, or parent devices of a sub-device. This is used to show device topology in Home Assistant.'
      required: false
      type: string
device_class:
  description: Sets the [class of the device](/integrations/cover/#device_class), changing the device state and icon that is displayed on the frontend. The `device_class` can be `null`.
  required: false
  type: string
enabled_by_default:
  description: Flag which defines if the entity should be enabled when first added.
  required: false
  type: boolean
  default: true
encoding:
  description: The encoding of the payloads received and published messages. Set to `""` to disable decoding of incoming payload.
  required: false
  type: string
  default: "utf-8"
entity_category:
  description: The [category](https://developers.home-assistant.io/docs/core/entity#generic-properties) of the entity.
  required: false
  type: string
entity_picture:
  description: "Picture URL for the entity."
  required: false
  type: string
icon:
  description: "[Icon](/docs/configuration/customizing-devices/#icon) for the entity."
  required: false
  type: icon
json_attributes_template:
  description: "Defines a [template](/docs/configuration/templating/#using-templates-with-the-mqtt-integration) to extract the JSON dictionary from messages received on the `json_attributes_topic`. Usage example can be found in [MQTT sensor](/integrations/sensor.mqtt/#json-attributes-template-configuration) documentation."
  required: false
  type: template
json_attributes_topic:
  description: The MQTT topic subscribed to receive a JSON dictionary payload and then set as sensor attributes. Usage example can be found in [MQTT sensor](/integrations/sensor.mqtt/#json-attributes-topic-configuration) documentation.
  required: false
  type: string
name:
  description: The name of the cover. Can be set to `null` if only the device name is relevant.
  required: false
  type: string
  default: MQTT Cover
object_id:
  description: Used instead of `name` for automatic generation of `entity_id`
  required: false
  type: string
optimistic:
  description: Flag that defines if switch works in optimistic mode.
  required: false
  type: boolean
  default: "`false` if state or position topic defined, else `true`."
payload_available:
  description: The payload that represents the online state.
  required: false
  type: string
  default: online
payload_close:
  description: The command payload that closes the cover.
  required: false
  type: string
  default: CLOSE
payload_not_available:
  description: The payload that represents the offline state.
  required: false
  type: string
  default: offline
payload_open:
  description: The command payload that opens the cover.
  required: false
  type: string
  default: OPEN
payload_stop:
  description: The command payload that stops the cover.
  required: false
  type: string
  default: STOP
platform:
  description: Must be `cover`. Only allowed and required in [MQTT auto discovery device messages](/integrations/mqtt/#device-discovery-payload).
  required: true
  type: string
position_closed:
  description: Number which represents closed position.
  required: false
  type: integer
  default: 0
position_open:
  description: Number which represents open position.
  required: false
  type: integer
  default: 100
position_template:
  description: "Defines a [template](/docs/configuration/templating/#using-templates-with-the-mqtt-integration) that can be used to extract the payload for the `position_topic` topic. Within the template the following variables are available: `entity_id`, `position_open`; `position_closed`; `tilt_min`; `tilt_max`. The `entity_id` can be used to reference the entity's attributes with help of the [states](/docs/configuration/templating/#states) template function;"
  required: false
  type: template
position_topic:
  description: The MQTT topic subscribed to receive cover position messages.
  required: false
  type: string
qos:
  description: The maximum QoS level to be used when receiving and publishing messages.
  required: false
  type: integer
  default: 0
retain:
  description: Defines if published messages should have the retain flag set.
  required: false
  type: boolean
  default: false
set_position_template:
  description: "Defines a [template](/docs/configuration/templating/#using-templates-with-the-mqtt-integration) to define the position to be sent to the `set_position_topic` topic. Incoming position value is available for use in the template `{% raw %}{{ position }}{% endraw %}`. Within the template the following variables are available: `entity_id`, `position`, the target position in percent; `position_open`; `position_closed`; `tilt_min`; `tilt_max`. The `entity_id` can be used to reference the entity's attributes with help of the [states](/docs/configuration/templating/#states) template function;"
  required: false
  type: template
set_position_topic:
  description: "The MQTT topic to publish position commands to. You need to set position_topic as well if you want to use position topic. Use template if position topic wants different values than within range `position_closed` - `position_open`. If template is not defined and `position_closed != 100` and `position_open != 0` then proper position value is calculated from percentage position."
  required: false
  type: string
state_closed:
  description: The payload that represents the closed state.
  required: false
  type: string
  default: closed
state_closing:
  description: The payload that represents the closing state.
  required: false
  type: string
  default: closing
state_open:
  description: The payload that represents the open state.
  required: false
  type: string
  default: open
state_opening:
  description: The payload that represents the opening state.
  required: false
  type: string
  default: opening
state_stopped:
  description: The payload that represents the stopped state (for covers that do not report `open`/`closed` state).
  required: false
  type: string
  default: stopped
state_topic:
  description: The MQTT topic subscribed to receive cover state messages. State topic can only read a (`open`, `opening`, `closed`, `closing` or `stopped`) state.  A "None" payload resets to an `unknown` state. An empty payload is ignored.
  required: false
  type: string
tilt_closed_value:
  description: The value that will be sent on a `close_cover_tilt` command.
  required: false
  type: integer
  default: 0
tilt_command_template:
  description: "Defines a [template](/docs/configuration/templating/#using-templates-with-the-mqtt-integration) that can be used to extract the payload for the `tilt_command_topic` topic. Within the template the following variables are available: `entity_id`, `tilt_position`, the target tilt position in percent; `position_open`; `position_closed`; `tilt_min`; `tilt_max`. The `entity_id` can be used to reference the entity's attributes with help of the [states](/docs/configuration/templating/#states) template function;"
  required: false
  type: template
tilt_command_topic:
  description: The MQTT topic to publish commands to control the cover tilt.
  required: false
  type: string
tilt_max:
  description: The maximum tilt value.
  required: false
  type: integer
  default: 100
tilt_min:
  description: The minimum tilt value.
  required: false
  type: integer
  default: 0
tilt_opened_value:
  description: The value that will be sent on an `open_cover_tilt` command.
  required: false
  type: integer
  default: 100
tilt_optimistic:
  description: Flag that determines if tilt works in optimistic mode.
  required: false
  type: boolean
  default: "`true` if `tilt_status_topic` is not defined, else `false`"
tilt_status_template:
  description: "Defines a [template](/docs/configuration/templating/#using-templates-with-the-mqtt-integration) that can be used to extract the payload for the `tilt_status_topic` topic. Within the template the following variables are available: `entity_id`, `position_open`; `position_closed`; `tilt_min`; `tilt_max`. The `entity_id` can be used to reference the entity's attributes with help of the [states](/docs/configuration/templating/#states) template function;"
  required: false
  type: template
tilt_status_topic:
  description: The MQTT topic subscribed to receive tilt status update values.
  required: false
  type: string
unique_id:
  description: An ID that uniquely identifies this cover. If two covers have the same unique ID, Home Assistant will raise an exception. Required when used with device-based discovery.
  required: false
  type: string
value_template:
  description: "Defines a [template](/docs/configuration/templating/#using-templates-with-the-mqtt-integration) that can be used to extract the payload for the `state_topic` topic."
  required: false
  type: template
{% endconfiguration %}


{% note %}
MQTT cover expects position and tilt values to be in range of 0 to 100, where 0 indicates closed position and 100 indicates fully open position.
If position `min` or `max` are set to a different range (e.g. 40 to 140), when sending command to the device the range will be adjusted to the device range (position 0 will send a value of 40 to device) and when position payload is received from the device it will be adjusted back to the 0 to 100 range (device value of 40 will report cover position 0).
`min` and `max` can also be used to reverse the direction of the device, if `min` is set to 100 and `max` is set to `0` device operation will be inverted (e.g. when setting position to 40, a value of 60 will be sent to device).
{% endnote %}

## Examples

In this section you will find some real-life examples of how to use this platform.

### Full configuration state topic without tilt

The example below shows a full configuration for a cover without tilt with state topic only.

{% raw %}

```yaml
# Example configuration.yaml entry
mqtt:
  - cover:
      name: "MQTT Cover"
      command_topic: "home-assistant/cover/set"
      state_topic: "home-assistant/cover/state"
      availability:
        - topic: "home-assistant/cover/availability"
      qos: 0
      retain: true
      payload_open: "OPEN"
      payload_close: "CLOSE"
      payload_stop: "STOP"
      state_open: "open"
      state_opening: "opening"
      state_closed: "closed"
      state_closing: "closing"
      payload_available: "online"
      payload_not_available: "offline"
      optimistic: false
      value_template: "{{ value.x }}"
```

{% endraw %}

### Full configuration position topic without tilt

The example below shows a full configuration for a cover without tilt with position topic.

{% raw %}

```yaml
# Example configuration.yaml entry
mqtt:
  - cover:
      name: "MQTT Cover"
      command_topic: "home-assistant/cover/set"
      position_topic: "home-assistant/cover/position"
      availability:
        - topic: "home-assistant/cover/availability"
      set_position_topic: "home-assistant/cover/set_position"
      qos: 0
      retain: true
      payload_open: "OPEN"
      payload_close: "CLOSE"
      payload_stop: "STOP"
      position_open: 100
      position_closed: 0
      payload_available: "online"
      payload_not_available: "offline"
      optimistic: false
      value_template: "{{ value.x }}"
```

{% endraw %}

### Full configuration for position, state and tilt

The example below shows a full configuration for a cover with position, state & tilt.

{% raw %}

```yaml
# Example configuration.yaml entry
mqtt:
  - cover:
      name: "MQTT Cover"
      command_topic: "home-assistant/cover/set"
      state_topic: "home-assistant/cover/state"
      position_topic: "home-assistant/cover/position"
      availability:
        - topic: "home-assistant/cover/availability"
      qos: 0
      retain: true
      payload_open: "OPEN"
      payload_close: "CLOSE"
      payload_stop: "STOP"
      state_open: "open"
      state_opening: "opening"
      state_closed: "closed"
      state_closing: "closing"
      payload_available: "online"
      payload_not_available: "offline"
      optimistic: false
      value_template: "{{ value.x }}"
      position_template: "{{ value.y }}"
      tilt_command_topic: "home-assistant/cover/tilt"
      tilt_status_topic: "home-assistant/cover/tilt-state"
      tilt_status_template: "{{ value_json["PWM"]["PWM1"] }}"
      tilt_min: 0
      tilt_max: 180
      tilt_closed_value: 70
      tilt_opened_value: 180
```

{% endraw %}

### Full configuration using stopped state

The example below shows a full configuration for a cover using stopped state.

{% raw %}

```yaml
# Example configuration.yaml entry
mqtt:
  - cover:
      name: "MQTT Cover"
      command_topic: "home-assistant/cover/set"
      state_topic: "home-assistant/cover/state"
      position_topic: "home-assistant/cover/position"
      availability:
        - topic: "home-assistant/cover/availability"
      qos: 0
      retain: true
      payload_open: "OPEN"
      payload_close: "CLOSE"
      payload_stop: "STOP"
      state_opening: "opening"
      state_closed: "closed"
      state_stopped: "stopped"
      payload_available: "online"
      payload_not_available: "offline"
      optimistic: false
      value_template: "{{ value.x }}"
      position_template: "{{ value.y }}"
```

{% endraw %}

### Configuration for disabling cover commands

The example below shows a configuration for a cover that does not have a close command.
Setting `payload_close` empty or to `null` disables the close command and will not show the close button.

{% raw %}

```yaml
# Example configuration.yaml entry
mqtt:
  - cover:
      payload_open: "on"
      payload_close: 
      payload_stop: "on"
```

{% endraw %}
The following commands can be disabled: `open`, `close`, `stop` by overriding their payloads: `payload_open`, `payload_close`, `payload_stop`

For auto discovery message the payload needs to be set to `null`, example for cover without close command:
{% raw %}

```json
{
  "cover": [
    {
      "payload_open": "on",
      "payload_close": null,
      "payload_stop": "on"
    }
  ]
}
```

{% endraw %}

### Full configuration using `entity_id`- variable in the template

The example below shows an example of how to correct the state of the blind depending if it moved up, or down.

{% raw %}

```yaml
# Example configuration.yaml entry
mqtt:
  - cover:
      name: "MQTT Cover"
      command_topic: "home-assistant/cover/set"
      state_topic: "home-assistant/cover/state"
      position_topic: "home-assistant/cover/position"
      set_position_topic: "home-assistant/cover/position/set"
      payload_open:  "open"
      payload_close: "close"
      payload_stop:  "stop"
      state_opening: "open"
      state_closing: "close"
      state_stopped: "stop"
      optimistic: false
      position_template: |-
        {% if not state_attr(entity_id, "current_position") %}
          {{ value }}
        {% elif state_attr(entity_id, "current_position") < (value | int) %}
          {{ (value | int + 1) }}
        {% elif state_attr(entity_id, "current_position") > (value | int) %}
          {{ (value | int - 1) }}
        {% else %}
          {{ value }}
        {% endif %}
```

{% endraw %}

### Full configuration using advanced templating

The `position_template` can accept JSON, where `position` and `tilt_position` is provided at the same time.

The example below shows a full example of how to set up a venetian blind which has a combined position and tilt topic. The blind in the example has moveable slats which tilt with a position change. In the example, it takes the blind 6% of the movement for a full rotation of the slats.

Following variable might be used in `position_template`, `set_position_template`, `tilt_command_template` and `tilt_status_template`, `json_attributes_template` (only `entity_id`).

- `entity_id` - The ID of the entity itself. It can be used to reference its attributes with the help of the [states](/docs/configuration/templating/#states) template function.
- `position_open`
- `position_closed`
- `tilt_min`
- `tilt_max`

{% raw %}

```yaml
# Example configuration.yaml entry
mqtt:
  - cover:
      name: "MQTT Cover"
      command_topic: "home-assistant/cover/set"
      state_topic: "home-assistant/cover/state"
      position_topic: "home-assistant/cover/position"
      set_position_topic: "home-assistant/cover/position/set"
      tilt_command_topic: "home-assistant/cover/position/set" # same as `set_position_topic`
      qos: 1
      retain: false
      payload_open:  "open"
      payload_close: "close"
      payload_stop:  "stop"
      state_opening: "open"
      state_closing: "close"
      state_stopped: "stop"
      position_open: 100
      position_closed: 0
      tilt_min: 0
      tilt_max: 6
      tilt_opened_value: 3
      tilt_closed_value: 0
      optimistic: false
      position_template: |-
        {% if not state_attr(entity_id, "current_position") %}
          {
            "position" : {{ value }},
            "tilt_position" : 0
          }
        {% else %}
          {% set old_position = state_attr(entity_id, "current_position") %}
          {% set old_tilt_percent = (state_attr(entity_id, "current_tilt_position")) %}

          {% set movement = value | int - old_position %}
          {% set old_tilt_position = (old_tilt_percent / 100 * (tilt_max - tilt_min)) %}
          {% set new_tilt_position = min(max((old_tilt_position + movement), tilt_min), tilt_max) %}
  
          {
            "position": {{ value }},
            "tilt_position": {{ new_tilt_position }}
          }
        {% endif %}
    tilt_command_template: >-
        {% set position = state_attr(entity_id, "current_position") %}
        {% set tilt = state_attr(entity_id, "current_tilt_position") %}
        {% set movement = (tilt_position - tilt) / 100 * tilt_max %}
        {{ position + movement }}
      payload_open: "on"
      payload_close: 
      payload_stop: "on"
```

{% endraw %}

### Testing your configuration

To test, you can use the command line tool `mosquitto_pub` shipped with `mosquitto` or the `mosquitto-clients` package to send MQTT messages. This allows you to operate your cover manually:

```bash
mosquitto_pub -h 127.0.0.1 -t home-assistant/cover/set -m "CLOSE"
```
