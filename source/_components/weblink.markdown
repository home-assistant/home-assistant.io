---
layout: page
title: "Weblink"
description: "Instructions how to setup Links within Home Assistant."
date: 2016-02-02 20:00
sidebar: true
comments: false
sharing: true
footer: true
logo: 
ha_category: Other
---

The `weblinks` component allows you to display links in the Home Assistant frontend.

To use this component in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
weblink:
  entities:
    - name: Router
      url: http://192.168.1.1/
      icon: mdi:router-wireless
    - name: Home Assistant
      url: https://home-assistant.io
```
Configuration variables:

- **name** (*Required*): Text for the link.
- **url** (*Required*): The URL for the link.
- **icon** (*Optional*): Icon for entry.

Pick an icon that you can find on [materialdesignicons.com](https://materialdesignicons.com/) to use for your input and prefix the name with `mdi:`. For example `mdi:car`, `mdi:ambulance`, or  `mdi:motorbike`.
