---
layout: page
title: "Basic State Setting Example"
description: ""
date: 2016-02-07 12:13
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Custom Python Component Examples
---

This is a simple tutorial/example on how to write a component for [Home Assistant](https://home-assistant.io/). We will work on a component called "hello_state" to begin with. The purpose of this component is to display a given text in the frontend. 

The setup of a development environment is described in the [Developers section](/developers/#starting-development) of the documentation.

## {% linkable_title Component %}

To get started, create the file `<config dir>/custom_components/hello_state.py` and copy the below example code.

```python
"""
Support for showing text in the frontend.

For more details about this component, please refer to the documentation at
https://home-assistant.io/components/hello_state/
"""
import logging

_LOGGER = logging.getLogger(__name__)

DOMAIN = 'hello_state'
DEPENDENCIES = []

def setup(hass, config=None):
    """Setup the Hello State component. """
    _LOGGER.info("The 'hello state' component is ready!")

    return True
```

1. In the file header we decided to add some details: A short description and the link to the documentation. 
2. We want to do some logging. This means that we import the Python logging module and create an alias.
3. The component name is equal to the domain name.
4. At the moment this component has no dependencies. For detail check [dependencies](/developers/creating_components/#dependencies) section.
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

The next step is the introduction of configuration options. Most configuration details are coming out of the `configuration.yaml` file. To do that we need to update the `def setup()` method to accept configuration information and access the configuration variable in the `setup` method.

More details about this topic can be found in the [User given configuration](/developers/creating_components/#config-user-given-configuration) section.

```python
import logging

_LOGGER = logging.getLogger(__name__)

DOMAIN = 'hello_state'
DEPENDENCIES = []

CONF_TEXT = 'text'
DEFAULT_TEXT = 'No text!'

def setup(hass, config):
    """Setup the Hello State component. """
    # Get the text from the configuration. Use DEFAULT_TEXT if no name is provided.
    text = config[DOMAIN].get(CONF_TEXT, DEFAULT_TEXT)

    # States are in the format DOMAIN.OBJECT_ID
    hass.states.set('hello_state.Hello_State', text)

    return True
```

To add the latest feature of our component, update the entry in your `configuration.yaml` file.

```yaml
hello_state:
  text: 'Hello, World!'
```

Thanks to `DEFAULT_TEXT` variable the component will launch even if no `text:` field is used in the `configuration.yaml` file. Quite often there are variables which are required. It's important to check if all mandatory configuration variables are provided. If not, the setup should fail. We will use `voluptuous` as a helper to achive this. The next listing shows the essential parts.

```python
import voluptuous as vol

import homeassistant.helpers.config_validation as cv
[...]
PLATFORM_SCHEMA = PLATFORM_SCHEMA.extend({
    vol.Required(CONF_TEXT): cv.string,
})
```

If `text:` is missing, there will be a warning in the log file.

After a start or a restart of Home Assistant the component will be visible in the frontend if the `configuration.yaml` file is up-to-date.

<p class='img'>
<img src='/images/screenshots/create-component01.png' />
</p>

To get your component included in the Home Assistant releases, follow the steps described in the [Submitting improvements](https://home-assistant.io/developers/#submitting-improvements) section. Basically you only need to move your component in the `homeassistant/component/` directory of your fork and create a Pull Request.

