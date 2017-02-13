---
layout: page
title: Feedreader
description: "Instructions how to integrate RSS feeds into Home Assistant."
date: 2016-04-18 22:00
sidebar: true
comments: false
sharing: true
footer: true
logo: rss.gif
ha_category: Other
ha_release: 0.18
---

Add an RSS/Atom feed reader that polls feeds every hour and sends new entries into the event bus.

To use RSS feeds in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
feedreader:
  urls:
    - https://home-assistant.io/atom.xml
    - https://github.com/blog.atom
```

Configuration variables:

- **urls** (*Required*): List of URLS for your feeds.

Feedreader events can be used out of the box to trigger automation actions, e.g.:

```yaml
automation:
  - alias: Trigger action when new element(s) in RSS feed
    trigger:
      platform: event
      event_type: feedreader
    action:
      service: script.turn_on
      entity_id: script.my_action
```

```yaml
automation:
  - alias: Send notification of RSS feed title when updated
    trigger:
      platform: event
      event_type: feedreader
    action:
      service: notify.notify
      data_template: "{{ trigger.event.data.title }}"
```

*Any field under the `<entry>` tag in the feed can be used for example `tigger.event.data.content` will get the body of the feed entry.

For more advanced use cases, a custom component registering to the `feedreader` event type could be used instead:

```python
EVENT_FEEDREADER = "feedreader"
hass.bus.listen(EVENT_FEEDREADER, event_listener)
```

To get started developing custom components, please refer to the [developers](/developers) documentation
