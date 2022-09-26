---
title: Feedreader
description: Instructions on how to integrate RSS feeds into Home Assistant.
ha_category:
  - Other
ha_release: 0.18
ha_iot_class: Cloud Polling
ha_domain: feedreader
ha_integration_type: integration
---

Add an RSS/Atom feed reader that polls feeds every hour and sends new entries into the event bus.

To use RSS feeds in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
feedreader:
  urls:
    - https://www.home-assistant.io/atom.xml
    - https://github.com/blog.atom
    - https://hasspodcast.io/feed/podcast
```

{% configuration %}
  urls:
    description: List of URLs for your feeds.
    required: true
    type: list
  scan_interval:
    description: Defines the update interval of the feeds.
    required: false
    default: 1 hour
    type: time
  max_entries:
    description: The maximum number of entries to extract from each feed.
    required: false
    default: 20
    type: integer
{% endconfiguration %}

The following configuration example shows how to configure update interval and maximum number of entries:

```yaml
# Example configuration.yaml entry with optional parameters
feedreader:
  urls:
    - https://www.home-assistant.io/atom.xml
    - https://github.com/blog.atom
    - https://hasspodcast.io/feed/podcast
  scan_interval:
    minutes: 30
  max_entries: 5
```

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

For more advanced use cases, a custom integration registering to the `feedreader` event type could be used instead:

```python
EVENT_FEEDREADER = "feedreader"
hass.bus.listen(EVENT_FEEDREADER, event_listener)
```

To get started developing custom components, please refer to the [developers](/developers) documentation

For a drop in packaged complete example of Feedreader, you can use the [PodCast notifier](https://github.com/CCOSTAN/Home-AssistantConfig/blob/master/config/packages/hasspodcast.yaml).
