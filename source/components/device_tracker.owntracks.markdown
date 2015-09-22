---
layout: page
title: "Owntracks device tracker"
description: "Instructions how to use Owntracks to track devices in Home Assistant."
date: 2015-09-22 07:00
sidebar: false
comments: false
sharing: true
footer: true
---

<img src='/images/supported_brands/owntracks.png' class='brand pull-right' />
This platform allows you to detect presence by monitoring MQTT topics uses by [Owntracks](http://owntracks.org/) for new locations. 

To integrate Owntracks in Home Assistant, add the following section to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
device_tracker:
  platform: owntracks
```
