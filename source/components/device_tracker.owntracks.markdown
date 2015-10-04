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
This platform allows you to detect presence using [Owntracks](http://owntracks.org/). OwnTracks allows
users to track their location on Android and iOS phones and publish it to an MQTT broker. This platform
will connect to the broker and monitor for new locations.

This component requires [the MQTT component](/components/mqtt.html) to be set up and works very well
together with [the zone component](/components/zone.html).

To integrate Owntracks in Home Assistant, add the following section to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
device_tracker:
  platform: owntracks
```
