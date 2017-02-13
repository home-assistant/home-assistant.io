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

The updater component will also collect basic information about Home Assistant and its environment. The information includes the current Home Assistant version, the timezone, Python version and operating system information. No identifiable information (i.e. IP address, GPS coordinates, etc.) will ever be collected. If you are concerned about your privacy, you are welcome to scrutinize the Python [source code](https://github.com/home-assistant/home-assistant/blob/dev/homeassistant/components/updater.py#L91).

To integrate this into Home Assistant, add the following section to your `configuration.yaml` file:

```yaml
updater:
```

If you choose not to share any information when checking for updates, you can add `reporting: False`.

### {% linkable_title Notification %}

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

