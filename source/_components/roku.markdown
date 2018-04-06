---
layout: page
title: "Roku"
description: "Instructions how to integrate Roku devices into Home Assistant."
date: 2017-02-19 20:47
sidebar: true
comments: false
sharing: true
footer: true
logo: roku.png
ha_category: Hub
ha_iot_class: "Local Push"
ha_release: 0.68
---

The [Roku](http://www.roku.com/) platform allows integration of Roku [media players](/components/media_player.roku) and [remotes](/components/remote.roku/) which will be automatically discovered if you enable the [discovery component](/components/discovery/).

<p class='note'>
Due to changes in the autodiscovery mechanism, Roku media player entity names will not match prior releases before 0.64. 
</p>

The `roku` platform can also be forced to load by adding the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
roku:
  host: 192.168.1.100
  name: Roku
```

{% configuration %}
host:
  description: Set the IP address of the Roku device.  Use only if you don't want to autodiscover devices.
  required: false
  type: string
name:
  description: Name of Roku device. 
  required: false
  type: string
{% endconfiguration %} 

## {% linkable_title Services %}

### {% linkable_title Service `roku_scan` %}

Scans the local network for Rokus. All found devices are presented as a persistent notification.
