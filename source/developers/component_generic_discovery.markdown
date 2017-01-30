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
This can be achieved using the `homeassistant.components.discovery.load_platform` method:

```python
def load_platform(hass, component, platform, info=None, hass_config=None)
```

From more info on how this works, refer to the [load_platform](https://github.com/home-assistant/home-assistant/blob/dev/homeassistant/components/discovery.py#L78) method.

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
from homeassistant.components.discovery import load_platform
DOMAIN = 'myflashyhub'

MFH_GLOBAL = None

def setup(hass, config):
    """Your controller/hub specific code."""
    
    global MFH_GLOBAL
    if MFH_GLOBAL is None:
        MFH_GLOBAL = SomeObjectToInitialiseGlobal
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
    # You can now use myflashyhub.MFH_GLOBAL
```


The `load_platform` method allows the platforms to be loaded with the need for any additional platform entries in your `configuration.yaml` file, which normally would have been:

```yaml
#light:
#  platform: myflashyhub
#switch:
#  platform: myflashyhub
```

<p class='note '>
In the past, this was achieved by adding your component to the `DISCOVERY_PLATFORMS` in the target sub-component. Generic discovery through  `load_platform()` allows you to load any sub-component, including custom components, without changing the sub-component.
</p>
