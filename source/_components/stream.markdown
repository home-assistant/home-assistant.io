---
layout: page
title: "Stream"
description: "Instructions on how to integrate live streams within Home Assistant."
date: 2019-02-06 13:40
sidebar: true
comments: false
sharing: true
footer: true
logo: home-assistant.png
ha_category: "Other"
ha_release: 0.90
---

The Stream component provides a way to proxy live streams through Home Assistant.  The component currently only supports the HLS format.

Add the following to your configuration.yaml file.
```yaml
stream:
```

{% configuration %}
keepalive:
  description: >
    Do not close the worker thread when stoping the stream.  This option will keep the stream alive, using additional resources, but will enable a faster load upon subsequent requests.
  required: false
  type: boolean
  default: false
{% endconfiguration %}