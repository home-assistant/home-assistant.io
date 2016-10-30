---
layout: page
title: "OhmConnect"
description: "Documentation about the OhmConnect sensor."
date: 2016-08-08 17:05
sidebar: true
comments: false
sharing: true
footer: true
logo: "ohmconnect.png"
ha_category: Energy
ha_iot_class: "Cloud Polling"
ha_release: 0.26
---


The `ohmconnect` sensor will show you the current [OhmConnect](https://www.ohmconnect.com/) status for the given OhmConnect ID.

> OhmConnect monitors real-time conditions on the electricity grid. When dirty and unsustainable power plants turn on, our users receive a notification to save energy. By saving energy at that time, California does not have to turn on additional power plants and California's energy authorities pay you for that.


You can find your OhmConnect ID under "Open Source Projects" on the [settings page](https://login.ohmconnect.com/settings). It's the string after the last `/` in the URL, i.e. for the URL `https://login.ohmconnect.com/verify-ohm-hour/AbCd1e` your ID is `AbCd1e`.

```yaml
# Example configuration.yaml entry
sensor:
  - platform: ohmconnect
    id: AbCd1e
```

Configuration variables:

- **id** (*Required*): Your OhmConnect ID which can be found on the settings page.
- **name** (*Optional*): A name to display on the sensor. The default is "OhmConnect Status".
