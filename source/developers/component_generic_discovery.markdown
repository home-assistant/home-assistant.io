---
layout: page
title: "Generic Platform Discovery"
description: "Using generic platform discovery."
date: 2016-05-12 22:00 -02:00
sidebar: true
comments: false
sharing: true
footer: true
---

New controller or hub components often need to add platforms in sub-components (i.e. Lights & Switches) without additional configuration.
This can be achieved using the `load_platform` or `async_load_platform` methods from `homeassistant.helpers.discovery`:

```python
def load_platform(hass, component, platform, discovered=None, hass_config=None)
```

From more info on how this works, refer to the [load_platform](https://github.com/home-assistant/home-assistant/blob/dev/homeassistant/helpers/discovery.py#L136) method.

### {% linkable_title Example %}

Say you need to implement your new MyFlashyHub that controls both Switches & Lights, you can follow these steps:

Configuration required for your new hub component:

```yaml
myflashyhub:
   example: setting
```

The source for your component can be located in your configuration directory for now:

```bash
~/.homeassistant/custom_components/myflashyhub.py
~/.homeassistant/custom_components/light/myflashyhub.py
~/.homeassistant/custom_components/switch/myflashyhub.py
```

In the hub component `myflashyhub.py` you can call your light and switch components. To pass any non-serializable information to the platforms in the sub-component, you can use a global variable.

```python
from homeassistant.helpers.discovery import load_platform
DOMAIN = 'myflashyhub'

DATA_MFH = 'MFH'

def setup(hass, config):
    """Your controller/hub specific code."""
    hass.data[DATA_MFH] = SomeObjectToInitialiseGlobal()

    #--- snip ---
    load_platform(hass, 'light', DOMAIN)
    load_platform(hass, 'switch', DOMAIN, {'optional': 'arguments'})
```

Add your custom device specific code to the `setup_platform` method in `light/myflashyhub.py` and `switch/myflashyhub`.

```python
import custom_components.myflashyhub as myflashyhub

# 'switch' will receive discovery_info={'optional': 'arguments'} 
# as passed in above. 'light' will receive discovery_info=None
def setup_platform(hass, config, add_devices, discovery_info=None):
    """Your switch/light specific code."""
    # You can now use hass.data[myflashyhub.DATA_MFH]
```


The `load_platform` method allows the platforms to be loaded without the need for any additional platform entries in your `configuration.yaml` file, which normally would have been:

```yaml
#light:
#  platform: myflashyhub
#switch:
#  platform: myflashyhub
```
