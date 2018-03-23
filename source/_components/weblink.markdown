---
layout: page
title: "Weblink"
description: "Instructions how to setup Links within Home Assistant."
date: 2016-02-02 20:00
sidebar: true
comments: false
sharing: true
footer: true
logo: home-assistant.png
ha_category: Front end
ha_release: 0.13
---

The `weblink` component allows you to display links in the Home Assistant frontend.

To use this component in your installation, add something like the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
weblink:
  entities:
    - name: Router
      url: http://192.168.1.1/
      icon: mdi:router-wireless
    - name: Home Assistant
      url: https://home-assistant.io
    - name: Grafana
      url: /grafana
```

{% configuration %}
name:
  description: Text for the link.
  required: true
  type: string
url:
  description: The URL (absolute URL or absolute path) for the link.
  required: true
  type: string
icon:
  description: Icon for entry.
  required: false
  type: string
{% endconfiguration %}

Pick an icon that you can find on [materialdesignicons.com](https://materialdesignicons.com/) to use for your input and prefix the name with `mdi:`. For example `mdi:car`, `mdi:ambulance`, or  `mdi:motorbike`.
