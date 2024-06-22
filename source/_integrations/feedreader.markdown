---
title: Feedreader
description: Instructions on how to integrate RSS feeds into Home Assistant.
ha_category:
  - Other
ha_release: 0.18
ha_iot_class: Cloud Polling
ha_domain: feedreader
ha_config_flow: true
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
---

Add an RSS/Atom feed reader that polls feeds every hour and sends new entries into the event bus.

{% include integrations/config_flow.md %}

## Usage

Feedreader events can be used out of the box to trigger automation actions, e.g.:

```yaml
automation:
  - alias: "Trigger action when new element(s) in RSS feed"
    trigger:
      platform: event
      event_type: feedreader
    action:
      service: script.turn_on
      target:
        entity_id: script.my_action
```

{% raw %}

```yaml
automation:
  - alias: "Send notification of RSS feed title when updated"
    trigger:
      platform: event
      event_type: feedreader
      event_data:
        feed_url: "https://hasspodcast.io/feed/podcast"
    action:
      service: persistent_notification.create
      data:
        title: "New HA Podcast available"
        message: "New Podcast available - {{ as_timestamp(now()) | timestamp_custom('%I:%M:%S %p %d%b%Y', true) }}"
        notification_id: "{{ trigger.event.data.title }}"
```

{% endraw %}

Any field under the `<entry>` tag in the feed can be used for example `trigger.event.data.content` will get the body of the feed entry.

### Video tutorial
This video tutorial explains how to set up the feedreader and show the latest news feed item on your dashboard in Home Assistant.

<lite-youtube videoid="Va4JOKbesi0" videotitle="How to view RSS feeds on your Dashboard in Home Assistant" posterquality="maxresdefault"></lite-youtube>

For more advanced use cases, a custom integration registering to the `feedreader` event type could be used instead:

```python
EVENT_FEEDREADER = "feedreader"
hass.bus.listen(EVENT_FEEDREADER, event_listener)
```

To get started developing custom integrations, please refer to the [developers](/developers) documentation

For a drop in packaged complete example of Feedreader, you can use the [PodCast notifier](https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/config/packages/hasspodcast.yaml).
