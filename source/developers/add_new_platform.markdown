---
layout: page
title: "Adding support for a new platform"
description: "Hints and tips for when you're adding a new platform to Home Assistant."
date: 2014-12-21 13:27
sidebar: true
comments: false
sharing: true
footer: true
---

Components that interact with devices are structured in core- and platform logic. This allows the same logic to be used for different platforms.

For example, the built-in `switch` component consists of various platform in [`homeassistant/components/switch/`](https://github.com/home-assistant/home-assistant/tree/master/homeassistant/components/switch). The file `__init__.py` contains the core logic of all platform and the `vendor_name.py` files only the relevant platform code.

If you are planning to add support for a new type of device to an existing component, you can get away with only writing platform logic. Have a look at how the component works with other platforms and create a similar file for the platform that you would like to add.

### {% linkable_title Interfacing with devices %}

One of the rules for Home Assistant is that platform logic should never interface directly with devices but use a third-party Python 3 library to do so. This way Home Assistant is able to share code with the Python community and we can keep the project maintainable.

Platforms can specify dependencies and requirements the same way as a component does.

```python
REQUIREMENTS = ['some-package==2.0.0', 'some-other-package==2.5.0']
DEPENDENCIES = ['mqtt']
```

### {% linkable_title Platform example %}



Entities are Home Assistant's representation of lights, switches, sensors, etc. and are derived from the [Entity Abstract Class](https://github.com/home-assistant/home-assistant/blob/master/homeassistant/helpers/entity.py). This abstract class contains logic for integrating most standard features into your entities, such as visibility, entity IDs, updates, and many more.

This example is for adding support for the imaginary Awesome Lights.

```python
import logging

# Import the device class from the component that you want to support
from homeassistant.components.light import Light
from homeassistant.const import CONF_HOST, CONF_USERNAME, CONF_PASSWORD

# Home Assistant depends on 3rd party packages for API specific code.
REQUIREMENTS = ['awesome_lights==1.2.3']

_LOGGER = logging.getLogger(__name__)


setup_platform(hass, config, add_devices, discovery_info=None):
    """Initialize Awesome Light platform."""
    import awesomelights

    # Validate passed in config
    host = config.get(CONF_HOST)
    username = config.get(CONF_USERNAME)
    password = config.get(CONF_PASSWORD)

    if host is None or username is None or password is None:
        _LOGGER.error('Invalid config. Expected %s, %s and %s',
                      CONF_HOST, CONF_USERNAME, CONF_PASSWORD)
        return False

    # Setup connection with devices/cloud
    hub = awesomelights.Hub(host, username, password)

    # Verify that passed in config works
    if not hub.is_valid_login():
        _LOGGER.error('Could not connect to AwesomeLight hub')
        return False

    # Add devices
    add_devices(AwesomeLight(light) for light in hub.lights())

class AwesomeLight(Light):
    """Represents an AwesomeLight in Home Assistant."""

    def __init__(self, light):
        """Initialize an AwesomeLight."""
        self._light = light

    def update(self):
        """Fetch new state data for this light.

        This is the only method that should fetch new data for Home Assitant.
        """
        self._light.update()

    def brightness(self):
        """Brightness of the light.

        This method is optional. Removing it indicates to Home Assistant
        that brightness is not supported for this light.
        """
        return self._light.brightness

    def is_on(self):
        """If light is on."""
        return self._light.is_on()
```
