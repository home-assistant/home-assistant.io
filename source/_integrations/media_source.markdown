---
title: Media Source
description: Instructions on how to access your media with Home Assistant.
ha_category:
  - Media Source
ha_release: 0.115
ha_quality_scale: internal
ha_domain: media_source
---

The Media Source integration platform allows integrations to expose media for use inside Home Assistant through the Media Browser panel or through supported media players like Google Cast. This integration is configured automatically through `default_config` or if another integration implements a media source. If your configuration does not contain any of the above, you can add the below to your configuration file.

```yaml
# Example configuration.yaml entry
media_source:
```

## Local Media

By default, a local media source is configured which looks for media in a directory called `media` under the configuration path (`/config`). Files served from `media` are protected by the Home Assistant authentication unlike those served from `www`.
