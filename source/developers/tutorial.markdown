---
layout: page
title: "Development tutorial"
description: "Tutorial about the first steps on Home Assistant development"
date: 2016-02-20 07:00
sidebar: false
comments: false
sharing: true
footer: true
---

This is a simple tutorial on how to write a component for [Home Assistant](https://home-assistant.io/). We will work on a component called "information". The purpose of this component is to display a given text in the frontend. 

The setup of a development environment is described in the [Developers section](/developers/#starting-development) of the documentation.

## {% linkable_title Component %}


As a start, create a file `information.py` in your Git checkout of Home Assistant in the folder `homeassistant/component/`.

```python
"""
homeassistant.components.information
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
The information component allows to show text in the frontend.

For more details about this component, please refer to the documentation at
https://home-assistant.io/components/information/
"""
import logging

_LOGGER = logging.getLogger(__name__)

DOMAIN = 'information'
DEPENDENCIES = []

def setup(hass, config=None):
    """ Setup the Information component. """

    _LOGGER.info("The 'information' component is ready!")

    return True
```

1. In the file header we decided to add some details. Like the path, a short description, and the link to the documentation. 
2. We want to do some logging. This means that we import the Python logging module and create an alias.
3. The component name is equal to the domain name.
4. At the moment this component has no dependencies. For detail check [dependencies](/developers/creating_components/#dependencies) section.
5. The `setup` function will take care of the initialization of our component.
   The component will only write a log message. Keep in mind for later that you have several options for the severity:

   - _LOGGER.info(msg)
   - _LOGGER.warning(msg)
   - _LOGGER.error(msg)
   - _LOGGER.critical(msg)
   - _LOGGER.exception(msg)

7. We return `True` if everything is ok.

Add the component to your `configuration.yaml` file.

```yaml
information:
```

If you replace `_LOGGER.info("The 'information' component is ready!")` with or add

```python
hass.states.set('information.Text', 'Info component')
```

then the component will not be different to the sample included in the `config/custom_components` folder or shown as an [example](/cookbook/python_component_basic_state/). After a start or a restart of Home Assistant the component will be visible in the frontend.

<p class='img'>
<img src='/images/screenshots/create-component01.png' />
</p>

The next step is the introduction of configuration options. Most configuration details are coming out of the `configuration.yaml` file. To do that we need to update the  `def setup()` method to accept configuration information and access the configuration variable in the `setup` method.

More details about this topic can be found in the [User given configuration](/developers/creating_components/#config-user-given-configuration) section.

```python
import logging

_LOGGER = logging.getLogger(__name__)

DOMAIN = 'information'
DEPENDENCIES = []
CONF_NAME = 'text'

def setup(hass, config):
    """ Setup the Information component. """

    test = config[DOMAIN].get(CONF_NAME, DEFAULT_NAME)
    hass.states.set('information.Text', test)

    return True
```

To add the latest feature of our component, update the entry in your `configuration.yaml` file.

```yaml
information:
  text: 'Sample text'
```

It's important to check if all mandatory configuration variables are provided. If not, the setup should fail. We will use the `validate_config` as a helper to archive this. The next listing shows the essential parts.

```python
from homeassistant.helpers import validate_config
[...]
    if not validate_config(config, {DOMAIN: ['text']}, _LOGGER):
        return False
```

## {% linkable_title Frontend %}

So far our new component is rendered as a default compoment in the frontend. But we want our own view of the component in the frontend. We assume that you have setup the (frontend development)[/developers/frontend/] already.

We need two new files in the folder `src/cards/`:

- ha-information-card.html
- ha-information-card.js


TBD

Rebuild the frontend.

```bash
$ script/build_frontend
```

Change the [http](/components/http/) component to load the `development` version of the frontend as also mentioned in the [ Setting up the environment](/developers/frontend/#setting-up-the-environment) section of the (frontend development)[/developers/frontend/] page.

```yaml
http:
  development: 1
```

