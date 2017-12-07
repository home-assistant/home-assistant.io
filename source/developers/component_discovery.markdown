---
layout: page
title: "Component Discovery"
description: "How to make component discovery work."
date: 2017-11-23 07:27 +02:00
sidebar: true
comments: false
sharing: true
footer: true
---

<p class='note warning'>
This option is only available for built-in components.
</p>

Home Assistant has a discovery service running in the background to discover new devices. Whenever a new device is discovered, a `SERVICE_DISCOVERED` event will be fired with the found service and the information. The `discovery` component has some knowledge about which components handle which type of services and will ensure those are loaded and listening before firing the `SERVICE_DISCOVERED` event.

### {% linkable_title Add discovery instructions %}

Device discovery  for Home Assistant has been extracted into an external library called [NetDisco](https://github.com/home-assistant/netdisco). This library is integrated using [the `discovery` component](https://github.com/home-assistant/home-assistant/blob/dev/homeassistant/components/discovery.py) and scans the network in intervals for uPnP and zeroconf/mDNS services.

To have your device be discovered, you will have to extend the NetDisco library to be able to find your device. This is done by adding a new discoverable. [See the repository for examples of existing discoverable.](https://github.com/home-assistant/netdisco/tree/master/netdisco/discoverables)

### {% linkable_title Listening to `SERVICE_DISCOVERED` events %}

From your component, you will have to set up the listening for specific services. Given below is an example how one would listen for a discovered AwesomeDevice:

```python
from homeassistant.components.discovery import SERVICE_AWESOMEDEVICE
from homeassistant.helpers import discovery

DOMAIN = 'awesomedevice'

DEPENDENCIES = ['http']

def setup(hass, config):
    cfg = config.get(DOMAIN)

    def device_discovered(service, info):
        """ Called when a Awesome device has been discovered. """
        print("Discovered a new Awesome device: {}".format(info))

    discovery.listen(
        hass, SERVICE_AWESOMEDEVICE, device_discovered)

    return True
```

### {% linkable_title Auto-loading your component upon discovery %}

The `discovery` component is capable of setting up your components before firing the `EVENT_PLATFORM_DISCOVERED` event. To do this you will have to update the [`SERVICE_HANDLERS`](https://github.com/home-assistant/home-assistant/blob/dev/homeassistant/components/discovery.py#L40) constant in [the `discovery` component](https://github.com/home-assistant/home-assistant/blob/dev/homeassistant/components/discovery.py):

```python
SERVICE_AWESOMEDEVICE = 'awesomedevice'

SERVICE_HANDLERS = {
    ...
    SERVICE_AWESOMEDEVICE: ('awesomedevice', None),
}
```
