---
layout: page
title: "Example light platform"
description: "Minimum implementation of a Home Assistant platform."
date: 2016-04-16 14:24 -07:00
sidebar: true
comments: false
sharing: true
footer: true
---

This example is for adding support for the imaginary Awesome Lights. It shows the different best practices for developing a platform.

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
