---
layout: page
title: "Using States"
description: "Introduction to states in Home Assistant."
date: 2017-05-13 05:40:00 +0000
sidebar: true
comments: false
sharing: true
footer: true
---

Home Assistant keeps track of the states of entities in a state machine. The state machine has very few requirements:

 - Each state is related to an entity identified by an entity id. This id is made up of a domain and an object id. For example `light.kitchen_ceiling`. You can make up any combination of domain and object id, even overwriting existing states.
 - Each state has a primary attribute that describes the state of the entity. In the case of a light this could be for example "on" and "off". You can store anything you want in the state, as long as it's a string (will be converted if it's not).
 - You can store more information about an entity by setting attributes. Attributes is a dictionary that can contain any data that you want. The only requirement is that it's JSON serializable, so you're limited to numbers, strings, dictionaries and lists.

[Description of the state object.](/docs/configuration/state_object/)

### {% linkable_title Using states in your component %}

This is a simple tutorial/example on how to create and set states. We will do our work in a component called "hello_state". The purpose of this component is to display a given text in the frontend.

To get started, create the file `<config dir>/custom_components/hello_state.py` and copy the below example code.

```python
"""
Support for showing text in the frontend.

For more details about this component, please refer to the documentation at
https://home-assistant.io/cookbook/python_component_basic_state/
"""
import logging

_LOGGER = logging.getLogger(__name__)

DOMAIN = 'hello_state'
DEPENDENCIES = []

def setup(hass, config):
    """Setup the Hello State component. """
    _LOGGER.info("The 'hello state' component is ready!")

    return True
```

1. In the file header we decided to add some details: A short description and the link to the documentation.
2. We want to do some logging. This means that we import the Python logging module and create an alias.
3. The component name is equal to the domain name.
4. At the moment this component has no dependencies. For detail check [dependencies](/developers/component_deps_and_reqs/#dependencies) section.
5. The `setup` function will take care of the initialization of our component.
   The component will only write a log message. Keep in mind for later that you have several options for the severity:

   - `_LOGGER.info(msg)`
   - `_LOGGER.warning(msg)`
   - `_LOGGER.error(msg)`
   - `_LOGGER.critical(msg)`
   - `_LOGGER.exception(msg)`

7. We return `True` if everything is ok.

Add the component to your `configuration.yaml` file.

```yaml
hello_state:
```

After a start or a restart of Home Assistant the component will create an entry in the log.

```bash
16-03-12 14:16:42 INFO (MainThread) [custom_components.hello_state] The 'hello state' component is ready!
```

The next step is the introduction of configuration options. A user can pass configuration options to our component via `configuration.yaml`. To use them we'll use the passed in `config` variable to our `setup` method.

```python
import logging

_LOGGER = logging.getLogger(__name__)

DOMAIN = 'hello_state'
DEPENDENCIES = []

CONF_TEXT = 'text'
DEFAULT_TEXT = 'No text!'

def setup(hass, config):
    """Set up the Hello State component. """
    # Get the text from the configuration. Use DEFAULT_TEXT if no name is provided.
    text = config[DOMAIN].get(CONF_TEXT, DEFAULT_TEXT)

    # States are in the format DOMAIN.OBJECT_ID
    hass.states.set('hello_state.Hello_State', text)

    return True
```

To use the latest feature of our component, update the entry in your `configuration.yaml` file.

```yaml
hello_state:
  text: 'Hello, World!'
```

Thanks to `DEFAULT_TEXT` variable the component will launch even if no `text:` field is used in the `configuration.yaml` file. Quite often there are variables which are required. It's important to check if all mandatory configuration variables are provided. If not, the setup should fail. We will use `voluptuous` as a helper to achieve this. The next listing shows the essential parts.

```python
import voluptuous as vol

import homeassistant.helpers.config_validation as cv

CONFIG_SCHEMA = vol.Schema({
    DOMAIN: vol.Schema({
      vol.Required(CONF_TEXT): cv.string,
    })
}, extra=vol.ALLOW_EXTRA)
```

Now, when `text:` is missing from the config, Home Assistant will alert the user and not setup your component.

After a start or a restart of Home Assistant the component will be visible in the frontend if the `configuration.yaml` file is up-to-date.

<p class='img'>
<img src='/images/screenshots/create-component01.png' />
</p>

In order to expose attributes for a platform, you will need to define a property called `device_state_attributes` on the entity class, which will return a dictionary of attributes:

```
@property
def device_state_attributes(self):
    """Return device specific state attributes."""
    return self._attributes
```

<p class='note'>
Entities also have a similar property `state_attributes`, which normally doesn't need to be defined by new platforms. This property is used by base components to add standard sets of attributes to a state. Example: The light component uses `state_attributes` to add brightness to the state dictionary. If you are designing a new component, you should define `state_attributes` instead.
</p>

To get your component included in the Home Assistant releases, follow the steps described in the [Submit your work](/developers/development_submitting/) section. Basically you only need to move your component in the `homeassistant/component/` directory of your fork and create a Pull Request.
