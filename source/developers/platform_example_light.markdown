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
from homeassistant.components.light import ATTR_BRIGHTNESS, Light
from homeassistant.const import CONF_HOST, CONF_USERNAME, CONF_PASSWORD

# Home Assistant depends on 3rd party packages for API specific code.
REQUIREMENTS = ['awesome_lights==1.2.3']

_LOGGER = logging.getLogger(__name__)


def setup_platform(hass, config, add_devices, discovery_info=None):
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

    @property
    def name(self):
        """Return the display name of this light"""
        return self._light.name

    @property
    def brightness(self):
        """Brightness of the light (an integer in the range 1-255).

        This method is optional. Removing it indicates to Home Assistant
        that brightness is not supported for this light.
        """
        return self._light.brightness

    @property
    def is_on(self):
        """If light is on."""
        return self._light.is_on()

    def turn_on(self, **kwargs):
        """Instruct the light to turn on.

        You can skip the brightness part if your light does not support
        brightness control.
        """
        self._light.brightness = kwargs.get(ATTR_BRIGHTNESS, 255)
        self._light.turn_on()

    def turn_off(self, **kwargs):
        """Instruct the light to turn off."""
        self._light.turn_off()

    def update(self):
        """Fetch new state data for this light.

        This is the only method that should fetch new data for Home Assitant.
        """
        self._light.update()
```
