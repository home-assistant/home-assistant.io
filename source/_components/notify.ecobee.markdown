---
layout: page
title: "Ecobee Notify"
description: "Instructions how to setup the Ecobee notify component within Home Assistant."
date: 2016-05-12 09:00
sidebar: true
comments: false
sharing: true
footer: true
logo: ecobee.png
ha_category: Notify
ha_release: 0.20
---

To get your Ecobee sensors working with Home Assistant, you must first have the main [Ecobee component](/components/ecobee/) loaded and running.  Once you have that configured, you can setup this component to send messages to your thermostat.

Add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
notify:
  name: NOTIFIER_NAME
  platform: ecobee
```

Configuration variables:

- **name** (*Optional*): Setting the optional parameter `name` allows multiple notifiers to be created. The default value is `notify`. The notifier will bind to the service `notify.NOTIFIER_NAME`.
- **index** (*Optional*): If you have more than one thermostat, you can create a notifier for each one by providing the zero based index for each thermostat. (Default: 0)

To use notifications, please see the [getting started with automation page](/getting-started/automation/).

