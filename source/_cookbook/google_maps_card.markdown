---
layout: page
title: "Show Google Maps as a card"
description: "Example how to show a Google Map as a Google card."
date: 2016-08-20 19:05
sidebar: true
comments: false
sharing: true
footer: true
ha_category: User Interface
---

Using the [generic camera platform] you can present any image on the internet as a camera. Starting release 0.27 these urls can also be based on a template. This example uses this functionality to point a generic camera at the Google Maps static image API and pass in the location of a device.

It also leverages the `limit_refetch_to_url_change` option to ensure that we do not make a lot of requests to the Google Maps API.

```yaml
# Example configuration.yaml entry.
# Shows device_tracker.demo_paulus on a map.
camera:
  name: Paulus
  platform: generic
  still_image_url: {% raw %}https://maps.googleapis.com/maps/api/staticmap?center={{ states.device_tracker.demo_paulus.attributes.latitude }},{{ states.device_tracker.demo_paulus.attributes.longitude }}&zoom=13&size=500x500&maptype=roadmap&markers=color:blue%7Clabel:P%7C{{ states.device_tracker.demo_paulus.attributes.latitude }},{{ states.device_tracker.demo_paulus.attributes.longitude }}{% endraw %}
  limit_refetch_to_url_change: true
```

<p class='img'>
  <img src='/images/components/camera/generic-google-maps.png' alt='Screenshot showing Google Maps integration in Home Assistant front end.'>
</p>

[generic camera platform]: /components/camera.generic/
