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

Components that interact with devices are called Entity Components. They are structured in core- and platform logic. This allows the same logic to handle a light to be used by different brands.

For example, the built-in `switch` component consists of various platform in [`homeassistant/components/switch/`](https://github.com/home-assistant/home-assistant/tree/master/homeassistant/components/switch). The file `__init__.py` contains the core logic of all platform and the `vendor_name.py` files only the relevant platform code.

If you are planning to add support for a new type of device to an existing component, you can get away with only writing platform logic. Have a look at how the component works with other platforms and create a similar file for the platform that you would like to add:

 - [Example sensor platform](/developers/platform_example_sensor): hello world of platforms.
 - [Example light platform](/developers/platform_example_light): showing best practices.

### {% linkable_title Interfacing with devices %}

One of the rules for Home Assistant is that platform logic should never interface directly with devices but use a third-party Python 3 library to do so. This way Home Assistant is able to share code with the Python community and we can keep the project maintainable.

To integrate the third-party library you create an Entity class for your device. Entities are Home Assistant's representation of lights, switches, sensors, etc. and are derived from the [Entity Abstract Class](https://github.com/home-assistant/home-assistant/blob/master/homeassistant/helpers/entity.py). This abstract class contains logic for integrating most standard features into your entities, such as visibility, entity IDs, updates, and much more.

### {% linkable_title Requirements and dependencies %}

Platforms can specify dependencies and requirements the same way as a component does.

```python
REQUIREMENTS = ['some-package==2.0.0', 'some-other-package==2.5.0']
DEPENDENCIES = ['mqtt']
```

