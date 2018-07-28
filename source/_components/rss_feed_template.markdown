---
layout: page
title: "RSS feed template"
description: "Use this component to generate RSS feeds showing your latest data."
date: 2017-04-11 20:42
sidebar: true
comments: false
sharing: true
footer: true
logo: home-assistant.png
ha_category: Front end
ha_release: 0.44
---

The `rss_feed_template` component can export any information from Home Assistant
as a static RSS feed. This can be used to display that information on many types
of devices using an RSS reader. While native apps for Home Assistant are not
widely available, native RSS readers exist for almost any platform.

For example, on Android, the app "Simple RSS Widget" can be used to display
temperatures on the home screen.

```yaml
# Example configuration.yaml entry
rss_feed_template:
  # Accessible on <home assistant url>/api/rss_template/garden
  # Example: https://localhost:8123/api/rss_template/garden
  garden:
    requires_api_password: false
    title: "Garden {% raw %}{{ as_timestamp(now())|timestamp_custom('%H:%M', True) }}{% endraw %}"
    items:
    - title: "Outside temperature"
      description: "{% raw %}{% if is_state('sensor.temp_outside','unknown') %}---{% else %}{{states.sensor.temp_outside.state}} °C{% endif %}{% endraw %}"
```

Configuration variables:

- **requires_api_password:** (*Optional*): If true and an API password is set, the password must be passed via '?api_password=...' parameter (Default: `true`)
- **feed_id** (*Required*): The key is used as the ID of the feed. The feed can be accessed at /api/rss_template/feed_id (example: 'garden')
- **title** (*Optional*): The title of the feed, which is parsed as [template](/topics/templating/).
- **items** (*Required*): A list of feed items.
- **items/title** (*Optional*): The title of the item, which is parsed as [template](/topics/templating/).
- **items/description** (*Optional*): The description of the item, which is parsed as [template](/topics/templating/).
