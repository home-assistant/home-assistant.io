---
title: RSS feed template
description: Use this integration to generate RSS feeds showing your latest data.
ha_category:
  - Front end
ha_iot_class: Local Push
ha_release: 0.44
ha_quality_scale: internal
ha_domain: rss_feed_template
ha_codeowners:
  - '@home-assistant/core'
ha_integration_type: integration
---

The `rss_feed_template` {% term integration %} can export any information from Home Assistant as a static RSS feed. This can be used to display that information on many types of devices using an RSS reader. While native apps for Home Assistant are not widely available, native RSS readers exist for almost any platform.

For example, on Android, the app "Simple RSS Widget" can be used to display temperatures on the home screen.

{% raw %}

```yaml
# Example configuration.yaml entry
rss_feed_template:
  # Accessible on <Home Assistant url>/api/rss_template/garden
  # Example: https://localhost:8123/api/rss_template/garden
  garden:
    requires_api_password: false
    title: "Garden {{ as_timestamp(now())|timestamp_custom('%H:%M', True) }}"
    items:
    - title: "Outside temperature"
      description: "{% if is_state('sensor.temp_outside','unknown') %}---{% else %}{{states('sensor.temp_outside')}} °C{% endif %}"
```

{% endraw %}

{% configuration %}
requires_api_password:
  description: If true and an API password is set, the password must be passed via '?api_password=...' parameter.
  required: false
  default: true
  type: boolean
feed_id:
  description: "The key is used as the ID of the feed. The feed can be accessed at /api/rss_template/feed_id (example: 'garden')."
  required: true
  type: string
title:
  description: The title of the feed, which is parsed as [template](/docs/configuration/templating/).
  required: false
  type: template
items:
  description: A list of feed items.
  required: true
  type: list
  keys:
    title:
      description: The title of the item, which is parsed as [template](/docs/configuration/templating/).
      required: false
      type: template
    description:
      description: The description of the item, which is parsed as [template](/docs/configuration/templating/).
      required: false
      type: template
{% endconfiguration %}
