---
title: KNX
description: Instructions on how to integrate KNX components with Home Assistant.
ha_category:
  - Hub
ha_release: 0.24
ha_iot_class: Local Push
ha_codeowners:
  - '@Julius2342'
ha_domain: knx
---

The [KNX](https://www.knx.org) integration for Home Assistant allows you to connect to KNX/IP devices.

The integration requires a local KNX/IP interface or router. Through this, it will establish a connection between Home Assistant and your KNX bus.

<div class='note warning'>
Please note, the `knx` platform does not support KNX Secure.
</div>

There is currently support for the following device types within Home Assistant:

- [Binary Sensor](/integrations/binary_sensor.knx)
- [Cover](/integrations/cover.knx)
- [Sensor](/integrations/sensor.knx)
- [Switch](/integrations/switch.knx)
- [Light](/integrations/light.knx)
- [Thermostat](/integrations/climate.knx)
- [Notify](/integrations/notify.knx)
- [Scene](/integrations/scene.knx)

## Configuration

To use your KNX in your installation, add the following lines to your `configuration.yaml` file:

```yaml
knx:
```

Optional, or if you want to use the XKNX abstraction also for other scripted tools outside of Home Assistant:

```yaml
knx:
  config_file: '/path/to/xknx.yaml'
```

{% configuration %}
config_file:
  description: The path for XKNX configuration file. See [xknx.io](https://xknx.io/configuration) for details
  required: false
  type: string
rate_limit:
  description: Defines the maximum number of telegrams to be sent to the bus per second (range 1-100).
  required: false
  default: 20
  type: integer
{% endconfiguration %}

If the auto detection of the KNX/IP device does not work you can specify ip/port of the tunneling device:

```yaml
knx:
  tunneling:
    host: '192.168.2.23'
    port: 3671
    local_ip: '192.168.2.109'
```

{% configuration %}
host:
  description: Host of the KNX/IP tunneling device.
  type: string
  required: true
port:
  description: Port of the KNX/IP tunneling device.
  type: integer
  required: false
local_ip:
  description: IP of the local interface.
  type: string
  required: false
{% endconfiguration %}

Explicit connection to a KNX/IP routing device:

```yaml
knx:
  routing:
     local_ip: '192.168.2.109'
```

{% configuration %}
local_ip:
  description: The local IP address of interface (which should be used for multicasting).
  type: string
  required: true
{% endconfiguration %}

```yaml
knx:
  fire_event: true
  fire_event_filter: ["1/0/*", "6/2,3,4-6/*"]
```

{% configuration %}
fire_event:
  description: If set to True, platform will write all received KNX messages to event bus
  required: inclusive
  type: boolean
  default: false
fire_event_filter:
  description: If `fire_event` is set `fire_event_filter` has to be specified. `fire_event_filter` defines a list of patterns for filtering KNX addresses. Only telegrams which match this pattern are sent to the Home Assistant event bus.
  required: inclusive
  type: [list, string]
state_updater:
  description: The integration will collect the current state of each configured device from the KNX bus to display it correctly within Home Assistant. Set this option to False to prevent this behavior.
  required: false
  default: true
  type: boolean
{% endconfiguration %}

### Services

In order to directly interact with the KNX bus, you can use the following service:

```txt
Domain: knx
Service: send
Service Data: {"address": "1/0/15", "payload": 0}
```

{% configuration %}
address:
  description: KNX group address
  type: string
payload:
  description: Payload, either an integer or an array of integers
  type: [integer, list]
{% endconfiguration %}

You can also use the `homeassistant.update_entity` service call to issue GroupValueRead requests for all `*state_address` of a device.

### Exposing entity states, entity attributes or time to KNX bus

KNX integration is able to expose entity states or attributes to KNX bus. The integration will broadcast any change of the exposed value to the KNX bus and answer read requests to the specified group address. It is also possible to expose the current time.

```yaml
# Example configuration.yaml entry
knx:
  expose:
    - type: 'temperature'
      entity_id: 'sensor.owm_temperature'
      address: '0/0/2'
    - type: 'string'
      address: '0/6/4'
      entity_id: "sensor.owm_weather"
    - type: 'binary'
      entity_id: 'binary_sensor.kitchen_window'
      address: '0/6/5'
    - type: 'binary'
      entity_id: 'light.office'
      address: '0/3/0'
      default: False
    - type: 'percentU8'
      entity_id: 'light.office'
      attribute: 'brightness'
      default: 0
      address: '0/3/1'
    - type: 'time'
      address: '0/0/1'
    - type: 'datetime'
      address: '0/0/23'
```

{% configuration %}
type:
  description: Type of the exposed value. Either 'binary', 'time', 'date', 'datetime' or any supported type of [KNX Sensor](/integrations/sensor.knx/) (e.g., "temperature" or "humidity").
  type: string
  required: true
entity_id:
  description: Entity id to be exposed. Not needed for types time, date and datetime.
  type: string
  required: false
attribute:
  description: Attribute of the entity that shall be sent to the knx bus. If not set (or `None`) the state will be sent. 
    Eg. for a light the state is eigther "on" or "off" - with attribute you can expose its "brightness".
  type: string
  required: false
default:
  description: Default value to send to the bus if the state or attribute value is `None`. 
    Eg. a light with state "off" has no brightness attribute so a default value of `0` could be used. 
    If not set (or `None`) no value would be sent to the bus and a GroupReadRequest to the address would return the last known value.
  type: [boolean, string, integer, float]
  default: None
  required: false
address:
  description: KNX group address.
  type: string
  required: true
{% endconfiguration %}
