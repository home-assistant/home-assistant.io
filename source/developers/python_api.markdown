---
layout: page
title: "Python API"
description: "Home Assistant Python API documentation"
date: 2015-05-11 12:00
sidebar: false
comments: false
sharing: true
footer: true
---

In the package [`homeassistant.remote`](https://github.com/balloob/home-assistant/blob/master/homeassistant/remote.py) a Python API on top of the [HTTP API](/developers/api/) can be found.

This page is not a full documentation it's more a collection of some example. A simple way to get all current entities is to visit the "Set State" page in the "Developer Tools". For the examples below just choose one from the available entries. Here the sensor `sensor.office_temperature` and the switch `switch.livingroom_pin_2` are used. 

First import the module and setup the basics.

```python
import homeassistant.remote as remote

api = remote.API('host', 'password')
print(remote.validate_api(api))
```

This snippets shows how to use the `homeassistant.remote` package in another way.

```python
import homeassistant.remote as remote

api = remote.API('host', 'password')
hass = remote.HomeAssistant(api)
hass.start()
living_room = hass.states.get('group.living_room')
```

### {% linkable_title Get details about servies and events %}

Similar to the output in the "Developer Tools" of the frontend.

```python
import homeassistant.remote as remote

api = remote.API('host', 'password')

print('-- Available services:')
services = remote.get_services(api)
for service in services:
    print(service['services'])

print('\n-- Available event')
events = remote.get_event_listeners(api)
for event in events:
    print(event)
```

### {% linkable_title Get the state of an entity %}

To get the details of a single entity the `get_state` method is used. 

```python
import homeassistant.remote as remote

api = remote.API('host', 'password')
office_temperature = remote.get_state(api, 'sensor.office_temperature')
print('{} is {} {}.'.format(office_temperature.attributes['friendly_name'],
                            office_temperature.state,
                            office_temperature.attributes['unit_of_measurement']
                            )
      )
```

The output is composed out of the details which are stored for this entity.

```bash
Office Temperature is 19 °C.
```

The exact same thing is working for a switch. The difference is that both entities have different attributes.

```python
import homeassistant.remote as remote

api = remote.API('host', 'password')
switch_livingroom = remote.get_state(api, 'switch.livingroom_pin_2')
print('{} is {}.'.format(switch_livingroom.attributes['friendly_name'],
                         switch_livingroom.state
                         )
      )
```

### {% linkable_title Set the state of an entity %}

Of course, it's possible to set the state.

```python
import homeassistant.remote as remote
from homeassistant.const import STATE_ON

api = remote.API('host', 'password')
remote.set_state(api, 'sensor.office_temperature', new_state=123)
remote.set_state(api, 'switch.livingroom_pin_2', new_state=STATE_ON)
```

The state will be set to those value until the next update occurs.

### {% linkable_title Blinking all entites of a domain %}

If you want to turn on all entities of a domain, just a service which was retrieved by `get_services`.


```python
import time
import homeassistant.remote as remote

api = remote.API('host', 'password')
domain = 'switch'

remote.call_service(api, domain, 'turn_on')
time.sleep(10)
remote.call_service(api, domain, 'turn_off')
```

### {% linkable_title Control a single entity %}

To turn on or off a single switch. The ID of the entity is needed as attribute.

```python
import time
import homeassistant.remote as remote

api = remote.API('host', 'password')
domain = 'switch'
switch_name = 'switch.livingroom_pin_2'

remote.call_service(api, domain, 'turn_on', {'entity_id': '{}'.format(switch_name)})
time.sleep(5)
remote.call_service(api, domain, 'turn_off', {'entity_id': '{}'.format(switch_name)})
```

### {% linkable_title Send a notification %}

The example uses the jabber notification platform to send a single message to the given recipient in the `configuration.yaml` file. 

```python
import homeassistant.remote as remote

api = remote.API('host', 'password')
domain = 'notify'
data = {"title":"Test", "message":"A simple test message from HA."}

remote.call_service(api, domain, 'jabber', data)
```

For more details please check the source of [homeassistant.remote](https://github.com/balloob/home-assistant/blob/master/homeassistant/remote.py).
