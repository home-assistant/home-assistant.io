---
title: Feedreader
description: Instructions on how to integrate RSS feeds into Home Assistant.
ha_category:
  - Event
  - Other
ha_release: 0.18
ha_iot_class: Cloud Polling
ha_domain: feedreader
ha_config_flow: true
ha_platforms:
  - event
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_codeowners:
  - '@mib1185'
---

Add an RSS/Atom feed reader that polls feeds every hour and sends new entries into the event bus.

{% include integrations/config_flow.md %}

## Usage

Feedreader events can be used out of the box to trigger automation actions, e.g.:

```yaml
automation:
  - alias: "Trigger action when new element(s) in RSS feed"
    triggers:
      - trigger: event
        event_type: feedreader
    actions:
      - action: script.turn_on
        target:
          entity_id: script.my_action
```

{% raw %}

```yaml
automation:
  - alias: "Send notification of RSS feed title when updated"
    triggers:
      - trigger: event
        event_type: feedreader
        event_data:
          feed_url: "https://hasspodcast.io/feed/podcast"
    actions:
      - action: persistent_notification.create
        data:
          title: "New HA Podcast available"
          message: "New Podcast available - {{ as_timestamp(now()) | timestamp_custom('%I:%M:%S %p %d%b%Y', true) }}"
          notification_id: "{{ trigger.event.data.title }}"
```

{% endraw %}

Any field under the `<entry>` tag in the feed can be used for example `trigger.event.data.content` will get the body of the feed entry.

### Event

An event entity will be created for each configured feed which always represents the latest entry of the feed.

### Video tutorial
This video tutorial explains how to set up the feedreader and show the latest news feed item on your dashboard in Home Assistant.

<lite-youtube videoid="Va4JOKbesi0" videotitle="How to view RSS feeds on your Dashboard in Home Assistant" posterquality="maxresdefault"></lite-youtube>

For more advanced use cases, a custom integration registering to the `feedreader` event type could be used instead:

```python
EVENT_FEEDREADER = "feedreader"
hass.bus.listen(EVENT_FEEDREADER, event_listener)
```

To get started developing custom integrations, please refer to the [developers](/developers) documentation

For a drop in packaged complete example of Feedreader, you can use the [PodCast notifier](https://github.com/CCOSTAN/Home-AssistantConfig/blob/22c19375ac5dcb49e0648aa16c431537407aa5e4/config/packages/hasspodcast.yaml).
