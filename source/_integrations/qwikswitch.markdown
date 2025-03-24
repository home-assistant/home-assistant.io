---
title: QwikSwitch QSUSB
description: Instructions on how to integrate the QwikSwitch QSUSB Hub into Home Assistant.
ha_category:
  - Binary sensor
  - Hub
  - Light
  - Sensor
  - Switch
ha_iot_class: Local Push
ha_release: '0.20'
ha_codeowners:
  - '@kellerza'
ha_domain: qwikswitch
ha_platforms:
  - binary_sensor
  - light
  - sensor
  - switch
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The `qwikswitch` integration is the main integration to integrate various [QwikSwitch](https://www.qwikswitch.co.za/) devices with Home Assistant. The integration requires the QSUSB Modem device and connects to the QS Mobile application.

There is currently support for the following device types within Home Assistant:

- Binary sensor
- Light
- [Sensor](#qwikswitch-sensors)
- [Switch](#switch)

The `qwikswitch` integration discovers all devices from QS Mobile. Currently, Relays and LED dimmers are discovered in Home Assistant. Relay devices are lights by default, and can be configured as [switches](#switch).

## Configuration

To use the QwickSwitch integration in your installation, add it to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
qwikswitch:
   url: http://127.0.0.1:2020
```

{% configuration %}
url:
  description: The URL including the port of your QwikSwitch hub.
  required: true
  type: string
dimmer_adjust:
  description: A decimal value to adjust the brightness of the dimmer exponentially. Increasing this value allows dimmers that reach full brightness with low values in QS Mobile to appear more linear in Home Assistant. Recommended values between 1 and 2 and the default is 1.
  required: false
  type: float
  default: 1
button_events:
  description: A comma-separated list of button types that will generate events. See [QwikSwitch Events] for detail.
  required: false
  default: TOGGLE,SCENE EXE,LEVEL
  type: string
switches:
  description: A list of device QS_id's that should be switches, and not lights (i.e., `['@0dev01', '@0dev02']`)
  required: false
  type: list
sensors:
  description: A dictionary of sensors.
  required: false
  type: list
  keys:
    name:
      description: The sensor name from which the entity_id will be derived.
      required: true
    id:
      description: A QS_Id
      required: true
      type: string
    type:
      description: |
        The Qwikswitch sensor type. These could include:
        - imod (binary_sensor, up to 6 channels)
        - door (binary_sensor, single channel)
        - qwikcord (Channel 1 = CTavg, Channel 2 = CTsum)
      required: true
      type: string
    channel:
      description: The channel of interest. Refer to type above.
      required: false
      default: 1
      type: integer
    invert:
      description: Invert the open/close state. Only applicable to binary_sensors
      required: false
      default: false
      type: string
    class:
      description: The [class](/integrations/binary_sensor/#device-class) or binary_sensor. Only applicable to binary_sensors.
      required: false
      default: door
      type: string
{% endconfiguration %}

### QwikSwitch Events

QwikSwitch devices (i.e., transmitter buttons) will fire events on the Home Assistant bus. These events can then be used as triggers for any `automation` action, as follows:

```yaml
automation:
  - alias: "Action - Respond to A button press"
    triggers:
      - trigger: event
        event_type: qwikswitch.button.@12df34
```

`event_type` names should be in the format **qwikswitch.button.@_QS_id_**. where **@_QS_id_** will be captured in the Home Assistant log when pressing the button. Alternatively, you can also get the device ID from the QS Mobile application or by using the listen API call by browsing to `http://127.0.0.1:2020/&listen` and then pressing the button.

The full packet from the QSUSB API will be passed as `data`

By default events will be fired if the value in the command (cmd) field of the listen packet equals:

- `TOGGLE` - Normal QwikSwitch Transmitter button
- `SCENE EXE` - QwikSwitch Scene Transmitter buttons
- `LEVEL` - QwikSwitch OFF Transmitter buttons

The list of recognized commands can be extended for Keyfobs, door sensors, and PIR transmitters with the **button_events** configuration option. **button_events** can be a list or comma separated list of additional commands that will fire Home Assistant events. By default, it is: TOGGLE,SCENE EXE,LEVEL.

On some QS Mobile servers button events are only generated for switches added to the QS Mobile application, so it might be best to test button presses through the `/&listen` API

### Qwikswitch sensors

The sensor configuration is a list of sensors. Depending on the type of sensor, it will be a sensor or binary_sensor.

Example sensor configuration:

```yaml
qwikswitch:
  ...
  sensors:
    - name: door sensor
      id: "@id03"
      type: door
    - name: Imod 1 sensor
      id: "@id02"
      channel: 1
      type: imod
    - name: Imod 2 sensor
      id: "@id02"
      channel: 2
      type: imod
```

### Switch

The `qwikswitch` platform allows you to control your [QwikSwitch](https://www.qwikswitch.co.za/) relays as switches from within Home Assistant.

If the device name in the QS Mobile application ends with `Switch` it will be created as a switch, otherwise as a light.
