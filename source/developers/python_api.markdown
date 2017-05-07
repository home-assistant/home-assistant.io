---
layout: page
title: "Python Remote API"
description: "Home Assistant Python Remote API documentation"
date: 2015-05-11 12:00
sidebar: true
comments: false
sharing: true
footer: true
---

In the package [`homeassistant.remote`](https://github.com/home-assistant/home-assistant/blob/master/homeassistant/remote.py) a Python API on top of the [HTTP API](/developers/api/) can be found.

Note: This page is not full documentation for this API, but a collection of examples showing its use.

A simple way to get all current entities is to visit the "Set State" page in the "Developer Tools". For the examples below just choose one from the available entries. Here the sensor `sensor.office_temperature` and the switch `switch.livingroom_pin_2` are used.

First import the module and setup the basics:

```python
import homeassistant.remote as remote

api = remote.API('127.0.0.1', 'password')
print(remote.validate_api(api))
```

Here's another way to use the `homeassistant.remote` package:

```python
import homeassistant.remote as remote

api = remote.API('127.0.0.1', 'password')
hass = remote.HomeAssistant(api)
hass.start()
living_room = hass.states.get('group.living_room')
```

### {% linkable_title Get configuration %}

Get the current configuration of a Home Assistant instance:

```python
import homeassistant.remote as remote

api = remote.API('127.0.0.1', 'password')

print(remote.get_config(api))
```

### {% linkable_title Get details about services, events, and entitites %}

The output from this is similar to the output you'd find via the frontend, using the DevTools console.

```python
import homeassistant.remote as remote

api = remote.API('127.0.0.1', 'YOUR_PASSWORD')

print('-- Available services:')
services = remote.get_services(api)
for service in services:
    print(service['services'])

print('\n-- Available events:')
events = remote.get_event_listeners(api)
for event in events:
    print(event)

print('\n-- Available entities:')
entities = remote.get_states(api)
for entity in entities:
    print(entity)
```

### {% linkable_title Get the state of an entity %}

To get the details of a single entity, use `get_state`: 

```python
import homeassistant.remote as remote

api = remote.API('127.0.0.1', 'YOUR_PASSWORD')
office_temperature = remote.get_state(api, 'sensor.office_temperature')
print('{} is {} {}.'.format(office_temperature.attributes['friendly_name'],
                            office_temperature.state,
                            office_temperature.attributes['unit_of_measurement']
                            )
      )
```

This outputs the details which are stored for this entity, ie:

```bash
Office Temperature is 19 °C.
```

Switches work the same way. The only difference is that both entities have different attributes.

```python
import homeassistant.remote as remote

api = remote.API('127.0.0.1', 'YOUR_PASSWORD')
switch_livingroom = remote.get_state(api, 'switch.livingroom_pin_2')
print('{} is {}.'.format(switch_livingroom.attributes['friendly_name'],
                         switch_livingroom.state
                         )
      )
```

### {% linkable_title Set the state of an entity %}

Of course, it's possible to set the state as well:

```python
import homeassistant.remote as remote
from homeassistant.const import STATE_ON

api = remote.API('127.0.0.1', 'YOUR_PASSWORD')
remote.set_state(api, 'sensor.office_temperature', new_state=123)
remote.set_state(api, 'switch.livingroom_pin_2', new_state=STATE_ON)
```

The state will be set to the new values until the next update occurs.

### {% linkable_title Blinking all entities of a domain %}

If you want to turn on all entities of a domain, retrieve the service via `get_services` and act on that:


```python
import time
import homeassistant.remote as remote

api = remote.API('127.0.0.1', 'YOUR_PASSWORD')
domain = 'switch'

remote.call_service(api, domain, 'turn_on')
time.sleep(10)
remote.call_service(api, domain, 'turn_off')
```

### {% linkable_title Control a single entity %}

To turn on or off a single switch, pass the ID of the entity:

```python
import time
import homeassistant.remote as remote

api = remote.API('127.0.0.1', 'YOUR_PASSWORD')
domain = 'switch'
switch_name = 'switch.livingroom_pin_2'

remote.call_service(api, domain, 'turn_on', {'entity_id': '{}'.format(switch_name)})
time.sleep(5)
remote.call_service(api, domain, 'turn_off', {'entity_id': '{}'.format(switch_name)})
```

### {% linkable_title Specify a timeout %}

The default timeout for an API call with `call_service` is 5 seconds. Services
taking longer than this to return will raise
`homeassistant.exceptions.HomeAssistantError: Timeout`, unless provided with a
longer timeout.

```python
import homeassistant.remote as remote

api = remote.API('host', 'password')
domain = 'switch'

# Assuming switch.timeout_switch takes 10 seconds to return
switch_name = 'switch.timeout_switch'

# Raises homeassistant.exceptions.HomeAssistantError: Timeout when talking to
remote.call_service(api, domain, 'turn_on', {'entity_id': switch_name})

# Runs withous exception
remote.call_service(api, domain, 'turn_on', {'entity_id': switch_name},
                    timeout=11)
```

### {% linkable_title Send a notification %}

The example uses the Jabber notification platform to send a single message to the given recipient in the `configuration.yaml` file: 

```python
import homeassistant.remote as remote

api = remote.API('127.0.0.1', 'YOUR_PASSWORD')
domain = 'notify'
data = {"title":"Test", "message":"A simple test message from HA."}

remote.call_service(api, domain, 'jabber', data)
```

For more details, please check the source of [homeassistant.remote](https://github.com/home-assistant/home-assistant/blob/master/homeassistant/remote.py).
