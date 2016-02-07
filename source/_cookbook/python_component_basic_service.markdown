---
layout: page
title: "Basic Service Example"
description: ""
date: 2016-02-07 12:13
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Custom Python Component Examples
---

This is a simple hello world example to show the basics of registering a service. To use this example, create the file `<config dir>/custom_components/hello_service.py` and copy the below example code.

Services can be called from automation and from the service developer tools in the frontend.

```python
# The domain of your component. Should be equal to the name of your component
DOMAIN = "hello_service"

ATTR_NAME = 'name'
DEFAULT_NAME = 'World'


def setup(hass, config):
    """ Setup is called when Home Assistant is loading our component. """

    def handle_hello(call):
        name = call.data.get(ATTR_NAME, DEFAULT_NAME)

        hass.states.set('hello.service.hello', name)

    hass.services.register(DOMAIN, 'hello', handle_hello)

    # return boolean to indicate that initialization was successful
    return True
```

Load the component by adding the following to your `configuration.yaml`. When your component is loaded, a new service should be available to call.

```yaml
# configuration.yaml entry
hello_service:
```

Open the frontend and in the sidebar, click the first icon in the developer tool section. This will open the Call Service developer tool. On the right, find your service and click on it. This will automatically fill in the correct values.

Pressing "Call Service" will now call your service without any parameters. This will cause your service to create a state with the default name 'World'. If you want to specify the name, you have to specify parameters. Add the following JSON as Service Data and press "Call Service again".

```json
{
  "name": "Planet"
}
```

The service will now overwrite the previous state with "Planet".
