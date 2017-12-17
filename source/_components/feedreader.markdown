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
    - https://hasspodcast.io/feed/podcast
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
      service: persistent_notification.create
      data_template:
        title: "New HA Podcast available"
        message: {% raw %}"New Podcast available - {{ as_timestamp(now()) | timestamp_custom('%I:%M:%S %p %d%b%Y', true) }}"{% endraw %}
        notification_id: {% raw %}"{{ trigger.event.data.title }}"{% endraw %}
```

Any field under the `<entry>` tag in the feed can be used for example `trigger.event.data.content` will get the body of the feed entry.

For more advanced use cases, a custom component registering to the `feedreader` event type could be used instead:

```python
EVENT_FEEDREADER = "feedreader"
hass.bus.listen(EVENT_FEEDREADER, event_listener)
```

To get started developing custom components, please refer to the [developers](/developers) documentation

For a drop in packaged complete example of Feedreader, you can use the [PodCast notifier](https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/packages/hasspodcast.yaml).
