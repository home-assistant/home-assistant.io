---
layout: page
title: "Adding support for a new platform"
description: "Hints and tips for when you're adding a new platform to Home Assistant."
date: 2014-12-21 13:27
sidebar: false
comments: false
sharing: true
footer: true
---

Components that interact with devices are structured in core- and platform logic. This allows the same logic to be used for different platforms.

For example, the built-in `switch` component consists of the following files in [`homeassistant/components/switch/`](https://github.com/balloob/home-assistant/tree/master/homeassistant/components/switch):

| File | Description |
| ---- | ----------- |
| \_\_init\_\_.py | Contains the Switch core logic.|
| wemo.py | WeMo platform logic. Included if in config `platform=wemo`. |
| tellstick.py | Tellstick platform logic. Included if in config `platform=tellstick`. |

If you are planning to add support for a new type of device to an existing component, you can get away with only writing platform logic. Have a look at how the component works with other platforms and create a similar file for the platform that you would like to add.

### {% linkable_title Interfacing with devices %}

One of the rules for Home Assistant is that platform logic should never interface directly with
devices but use a third-party Python 3 library to do so. This way Home Assistant is able to share
code with the Python community and we can keep the project maintainable.

Platforms can specify dependencies and requirements the same way as a component does. Please see
[the component page](/developers/creating_components.html#dependencies) for more information.

### {% linkable_title Creating Entities %}

Home Assistant will call a function with the following signature to initialize
your new platform. This function must exist in the platform module you create.

```python
def setup_platform(hass, config, add_devices, discovery_info=None)
```

In this function, your platform should create the appropriate entities and
register them with the Home Assistant core. Entities are Home Assistant's
representation of lights, switches, sensors, etc. and are derived from the
[Entity Abstract Class](https://github.com/balloob/home-assistant/blob/master/homeassistant/helpers/entity.py).
This abstract class contains logic for integrating most standard features into
your entities, such as visibility, entity IDs, updates, and many more.

A list of entities can be registered with Home Assistant using the *add_devices*
function that is provided as an input to *setup_platform*. Once entities are
registered with with Home Assistant their updates will be provided to the core
and the core will have control over them. For more information on how Entities
can be customized, take a look at the [Entity Abstract
Class](https://github.com/balloob/home-assistant/blob/master/homeassistant/helpers/entity.py#L18).

## {% linkable_title Allowing your platform to be discovered %}

Home Assistant has a discovery service running in the background to discover new devices. Whenever a new device is discovered, an `SERVICE_DISCOVERED` event will be fired with the found service and the information. The `discovery` component has some knowledge about which components handle which type of services and will ensure those are loaded and listening before firing the `SERVICE_DISCOVERED` event.

### {% linkable_title Add discovery instructions %}

Device discovery  for Home Assistant has been extracted into an external library called [NetDisco](https://github.com/balloob/netdisco). This library is integrated using [the `discovery` component](https://github.com/balloob/home-assistant/blob/dev/homeassistant/components/discovery.py) and scans the network in intervals for uPnP and zeroconf/mDNS services.

To have your device be discovered, you will have to extend the NetDisco library to be able to find your device. This is done by adding a new discoverable. [See the repository for examples of existing discoverables.](https://github.com/balloob/netdisco/tree/master/netdisco/discoverables)

### {% linkable_title Listening to `SERVICE_DISCOVERED` events %}

From your component, you will have to set up the listening for specific services. Below an example how one would listen for discovered Chromecasts:

```python
from homeassistant.loader import get_component

def setup(hass, config):
    discovery = get_component('discovery')

    def chromecast_discovered(service, info):
        """ Called when a Chromecast has been discovered. """
        print("Discovered a new Chromecast: {}".format(info))

    discovery.listen(
        hass, discovery.services.GOOGLE_CAST, chromecast_discovered)
```

### {% linkable_title Auto-loading your component upon discovery %}

The Discovery component is capable of setting up your components before firing the `SERVICE_DISCOVERD` event. To do this you will have to update the [`SERVICE_HANDLERS`](https://github.com/balloob/home-assistant/blob/dev/homeassistant/components/discovery.py#L29) constant in [the `discovery` component](https://github.com/balloob/home-assistant/blob/dev/homeassistant/components/discovery.py).

<p class='note warning'>
This option is currently limited to built-in components.
</p>
