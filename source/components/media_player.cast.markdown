---
layout: page
title: "Google Cast support"
description: "Instructions how to integrate Google Cast into Home Assistant."
date: 2015-03-23 19:59
sidebar: false
comments: false
sharing: true
footer: true
---

<img src='/images/supported_brands/google_cast.png' class='brand pull-right' />
Google Cast devices will be automatically discovered if you enable [the discovery component]({{site_root}}/components/discovery.html).

Can also be forced to load by adding the following lines to your `configuration.yaml`:

```
media_player:
  platform: chromecast
```

<p class='note warning'>
Chromecasts have recently received a new API which is not yet supported by Home Assistant. Therefore we currently can only detect them and do not know what they are up to.
</p> 
