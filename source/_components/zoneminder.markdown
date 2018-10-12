---
layout: page
title: "ZoneMinder"
description: "How to integrate ZoneMinder into Home Assistant."
date: 2016-10-13 22:57
sidebar: true
comments: false
sharing: true
footer: true
logo: zoneminder.png
ha_category: Hub
featured: false
ha_release: 0.31
ha_iot_class: "Local Polling"
---

The ZoneMinder component sets up the integration with your [ZoneMinder](https://www.zoneminder.com) instance so that [cameras](/components/camera.zoneminder/), [sensors](/components/sensor.zoneminder/), and [switches](/components/switch.zoneminder) can use it.

```yaml
# Example configuration.yaml entry
zoneminder:
  host: ZM_HOST
```

{% configuration %}
host:
  description: Your ZoneMinder server's host (and optional port), not including the scheme.
  required: true
  type: string
path:
  description: Path to your ZoneMinder install.
  required: false
  default: "`/zm/`"
  type: string
path_zms:
  description: Path to the CGI script for streaming. This should match `PATH_ZMS` in ZM's "Paths" settings.
  required: false
  default: "`/zm/cgi-bin/nph-zms`"
  type: string
ssl:
  description: Set to `true` if your ZoneMinder installation is using SSL.
  required: false
  default: false
  type: boolean
verify_ssl:
  description: Verify the certification of the endpoint.
  required: false
  default: true
  type: boolean
username:
  description: Your ZoneMinder username.
  required: false
  type: string
password:
  description: Your ZoneMinder password. Required if `OPT_USE_AUTH` is enabled in ZM.
  required: false
  type: string
{% endconfiguration %}

### {% linkable_title Full configuration %}

```yaml
# Example configuration.yaml entry
zoneminder:
  host: ZM_HOST
  path: ZM_PATH
  path_zms: ZM_PATH_ZMS
  ssl: true
  verify_ssl: true
  username: YOUR_USERNAME
  password: YOUR_PASSWORD
```
