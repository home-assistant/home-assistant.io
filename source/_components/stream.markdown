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
ha_category: 
  - Other
ha_release: "0.90"
ha_iot_class: Local Push
ha_qa_scale: internal
---

The `stream` component provides a way to proxy live streams through Home Assistant. The component currently only supports the HLS format.

## {% linkable_title Configuration %}

To enable the random binary sensor, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
stream:
```
