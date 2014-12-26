---
layout: page
title: "Adding support for a new platform"
date: 2014-12-21 13:27
sidebar: false
comments: false
sharing: true
footer: true
---

Components that interact with devices are structured in core- and platform logic. This allows the same logic to be used for different platforms.

For example, the built-in `switch` component consists of the following files in [`homeassistant/components/switch/`](https://github.com/balloob/home-assistant/tree/master/homeassistant/components/switch):

| File | Description |
| ---- | ----------- |
| \_\_init\_\_.py | Contains the Switch core logic.|
| wemo.py | WeMo platform logic. Included if in config `platform=wemo`. |
| tellstick.py | Tellstick platform logic. Included if in config `platform=tellstick`. |

If you are planning to add support for a new type of device to an existing component, you can get away with only writing platform logic. Have a look at how the component works with other platforms and create a similar file for the platform that you would like to add.

<p class='note'>
Platform logic should not interface directly with the devices but use a third-party Python 3 library that speaks the actual API.
</p>
