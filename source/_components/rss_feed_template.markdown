---
layout: page
title: "RSS feed template"
description: "Instructions how to setup an RSS feed for sensor information and other."
date: 2017-04-11 20:42
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Front end
ha_release: 0.44
---

The `rss_feed_template` component can export any information from Home Assistant as static RSS feed. This can be used to display those information on several devices using RSS readers. While native apps for Home Assistant are not widely available, native RSS readers exists for almost any platform.

E.g. on android, the app "Simple RSS Widget" can be used to display temperatures on the home screen.


```yaml
# Example configuration.yml entry
rss_feed_template:
  garden:
    requires_api_password: False
    title: "Garden {% raw %}{{ as_timestamp(now())|timestamp_custom('%H:%m', True) }}{% endraw %}"
    items:
    - title: "Outside temperature"
      description: "{% raw %}{% if is_state('sensor.temp_outside','unknown') %}---{% else %}{{states.sensor.temp_outside.state}} °C{% endif %}{% endraw %}"
```

Configuration variables:

- **requires_api_password:** (*Optional*): If true and an api password is set, the password must be passed via '?api_password=...' parameter (Default: True)
- **feed_id** (*Required*): The key is used as id of the feed. The feed can be accessed at /api/rss_template/feed_id (example: 'garden')
- **title** (*Optional*): The title of the feed, which is parsed as [template](/topics/templating/).
- **items** (*Required*): A list of feed items
- **items/title** (*Optional*): The title of the item, which is parsed as [template](/topics/templating/).
- **items/description** (*Optional*): The description of the item, which is parsed as [template](/topics/templating/).
