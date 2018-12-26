---
layout: page
title: "Custom deps deployment"
description: "Manage custom python modules in Home Assistant deps."
date: 2018-12-26 10:00
sidebar: true
comments: false
sharing: true
footer: true
---

This add-on allows you to run custom python modules in Home Assistant deps. "Start on boot" can be left disabled. Modify the config as desired, save and start the add-on. You should now see the modules inside config/deps which can be modified. A restart of Home Assistant is required for any changes to the custom modules to take effect.

Configuration Example:

```
{
  "pypi": [
    "hap_python==2.4.1"
  ],
  "apk": []
}
```

{% configuration %}

pypi:
  Set the name(s) and version(s) of a python module.

apk
  Specify a custom apk build.
{% endconfiguration %}
