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

See the [developer documentation][devdocs] for a full overview of the documentation. The rest of this page will contain examples on how to use it.

[devdocs]: https://dev-docs.home-assistant.io/en/master/api/homeassistant.html#module-homeassistant.remote

In the package [`homeassistant.remote`](https://github.com/home-assistant/home-assistant/blob/master/homeassistant/remote.py) a Python API on top of the [HTTP API](/developers/api/) can be found.

A simple way to get all current entities is to visit the "Set State" page in the "Developer Tools". For the examples below just choose one from the available entries. Here the sensor `sensor.office_temperature` and the switch `switch.livingroom_pin_2` are used.

First import the module and setup the basics:

```python
import homeassistant.remote as remote

api = remote.API('127.0.0.1', 'password')
print(remote.validate_api(api))
```

### {% linkable_title Get configuration %}

Get the current configuration of a Home Assistant instance:

```python
import homeassistant.remote as remote

api = remote.API('127.0.0.1', 'password')

print(remote.get_config(api))
```

### {% linkable_title Get details about services, events, and entitites %}

The output from this is similar to the output you'd find via the frontend, using the [Developer Tools](/docs/tools/dev-tools/).

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
office_temp = remote.get_state(api, 'sensor.office_temperature')
print('{} is {} {}.'.format(
    office_temp.name, office_temp.state,
    office_temp.attributes['unit_of_measurement'])
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
print('{} is {}.'.format(
    switch_livingroom.name, switch_livingroom.state)
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

## {% linkable_title Examples %}

This section contains a couple of sample scripts.

### {% linkable_title List all sensors and their value %}

If you want to see, export or list all sensor states then an easy way to do it, is to get all entities and filter for the one you are looking for. 

```python
import homeassistant.remote as remote

api = remote.API('127.0.0.1', 'YOUR_PASSWORD')
entities = remote.get_states(api)
for entity in entities:
    if entity.entity_id.startswith('sensor'):
        data = remote.get_state(api, entity.entity_id)
        print('{}: {}'.format(data.attributes['friendly_name'], data.state))
```

### {% linkable_title Show difference between `last_changed` and `last_updated` %}

The documentation about the [State Objects](/docs/configuration/state_object/) describes the 
`last_changed` and `last_updated` fields. This example shows how it works in practice. 

```python
import time

from prettytable import PrettyTable
import homeassistant.remote as remote

api = remote.API('127.0.0.1', 'YOUR_PASSWORD')

ACTIONS = {
    'Create sensor': [21, 'Test'],
    'No new sensor value': [21, 'Test'],
    'New sensor value': [22, 'Test'],
    'Update attribute': [22, 'Test1'],
}

output = PrettyTable(['Action', 'Last changed', 'Last updated'])

for key, value in ACTIONS.items():
    remote.set_state(api, 'sensor.test', new_state=value[0],
                     attributes={'friendly_name': value[1]})
    data = remote.get_state(api, 'sensor.test')
    output.add_row([key, data.last_changed, data.last_updated])
    time.sleep(2)

print(output)
```

