---
layout: page
title: "HDDTemp"
description: "Instructions how to integrate harddrive temperature information into Home Assistant."
date: 2016-10-28 07:00
sidebar: true
comments: false
sharing: true
footer: true
ha_category: System Monitor
ha_release: 0.32
ha_iot_class: "Local Polling"
---

The `hddtemp` sensor platform is using the data provided by [HDDTemp](http://savannah.nongnu.org/projects/hddtemp).

It required that `hddtemp` is started or running in daemon mode on a local or remote system.

```bash
$ hddtemp -dF
```

To setup a HDDTemp to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: hddtemp
```

Configuration variables:

- **name** (*Optional*): Friendly name to use for the frontend. Default to "HD Temperature".
- **host** (*Optional*): Host where `hddtemp` is running. Default to `localhost`.
- **port** (*Optional*): Port that is used by `hddtemp` . Default to `7634`.

