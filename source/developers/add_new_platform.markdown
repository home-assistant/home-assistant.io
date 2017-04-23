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

Components that interact with devices are called "[Entity Components](https://github.com/home-assistant/home-assistant/blob/dev/homeassistant/helpers/entity_component.py)." They are structured in core and platform logic, which means different brands can use the same logic to handle a light.

For example, the built-in `switch` component consists of various platforms in [`homeassistant/components/switch/`](https://github.com/home-assistant/home-assistant/tree/master/homeassistant/components/switch). The file `__init__.py` contains the core logic of all platforms and the `vendor_name.py` files contain only the relevant platform code.

If you're planning to add support for a new type of device to an existing component, you can get away with only writing platform logic. Have a look at how the component works with other platforms and create a similar file for the platform that you want to add:

 - [Example sensor platform](/developers/platform_example_sensor): hello world of platforms.
 - [Example light platform](/developers/platform_example_light): showing best practices.

### {% linkable_title Interfacing with devices %}

One Home Assistant rule is that platform logic should never interface directly with devices. Instead, use a third-party Python 3 library. This way, Home Assistant can share code with the Python community and keep the project maintainable.

To integrate the third-party library, create an [Entity class](https://github.com/home-assistant/home-assistant/blob/dev/homeassistant/helpers/entity.py) for your device. Entities are Home Assistant's representations of lights, switches, sensors, etc. and are derived from the [Entity Abstract Class](https://github.com/home-assistant/home-assistant/blob/master/homeassistant/helpers/entity.py). This abstract class contains logic for integrating most standard features into your entities, such as visibility, entity IDs, updates, and much more.

### {% linkable_title Requirements and dependencies %}

Platforms can specify dependencies and requirements [the same way as components](/developers/component_deps_and_reqs):

```python
REQUIREMENTS = ['some-package==2.0.0', 'some-other-package==2.5.0']
DEPENDENCIES = ['mqtt']
```

