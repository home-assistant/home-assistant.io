---
layout: page
title: "Updater"
description: "Detecting when Home Assistant updates are available."
date: 2015-11-15 20:40
sidebar: true
comments: false
sharing: true
footer: true
logo: home-assistant.png
ha_category: Other
---

The `updater` component will check daily for new releases. It will show a badge in the frontend if a new version was found.

To integrate this into Home Assistant, add the following section to your `configuration.yaml` file:

```yaml
updater:
```

For an added bonus, an automation component can be created to send a message with a notifier when that state of this component's entity changes.

```yaml
# Example configuration.yaml entry
automation:
  alias: 'Update Available Notifications'
  trigger:
    platform: state
    entity_id: updater.updater
  action:
    service: notify.notify
    data:
      message: 'Update for Home Assistant is available.'
```

The updater component will collect basic information about Home Assistant and it's environment. The information includes the current Home Assistant version, the timezone, Python version and operating system infomation. No identifiable information (i.e. IP, GPS coordinates) will ever be collected. If you are concerned about your privacy, you are welcome to scrutinize the Python [source code](https://github.com/home-assistant/home-assistant/blob/dev/homeassistant/components/updater.py#L91).

If you choose not to share any information when checking for updates, you can add `reporting: False` to the updater section of your configuration.
