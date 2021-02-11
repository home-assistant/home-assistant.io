---
title: "Show Google Maps as a card"
description: "Example how to show a Google Map as a Google card."
ha_category: User Interface
---

Using the [generic camera platform] you can present any image on the internet as a camera. Starting release 0.27 these URLs can also be based on a template. This example uses this functionality to point a generic camera at the Google Maps static image API and pass in the location of a device.

As of June 2018, Google has changed the API limits for static maps. You now need to have a Google Maps API key. Instructions for registering a key can be found  [here](https://github.com/googlemaps/google-maps-services-python#api-keys). Replace `YOUR_API_KEY` with the key you registered.

It also leverages the `limit_refetch_to_url_change` option to ensure that we do not make a lot of requests to the Google Maps API.

{% raw %}

```yaml
# Example configuration.yaml entry.
# Shows device_tracker.demo_paulus on a map.
camera:
  name: Paulus
  platform: generic
  still_image_url: https://maps.googleapis.com/maps/api/staticmap?center={{ state_attr('device_tracker.demo_paulus', 'latitude') }},{{ state_attr('device_tracker.demo_paulus', 'longitude') }}&zoom=13&size=500x500&maptype=roadmap&markers=color:blue%7Clabel:P%7C{{ state_attr('device_tracker.demo_paulus', 'latitude') }},{{ state_attr('device_tracker.demo_paulus', 'longitude') }}&key=YOUR_API_KEY
  limit_refetch_to_url_change: true
```

{% endraw %}

<p class='img'>
  <img src='/images/integrations/camera/generic-google-maps.png' alt='Screenshot showing Google Maps integration in Home Assistant front end.'>
</p>

[generic camera platform]: /integrations/generic_ip_camera
