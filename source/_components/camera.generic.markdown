---
layout: page
title: "Generic IP Camera"
description: "Instructions how to integrate IP cameras within Home Assistant."
date: 2015-07-11 0:36
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Camera
logo: camcorder.png
ha_release: pre 0.7
ha_iot_class: "depends"
---


The `generic` camera platform allows you to integrate any IP camera or other url into Home Assistant. Templates can be used to generate the urls on the fly.

Home Assistant will serve the images via its server, making it possible to view your IP camera's while outside of your network. The endpoint is `/api/camera_proxy/camera.[name]`.

To enable this camera in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
camera:
  - platform: generic
    still_image_url: http://194.218.96.92/jpg/image.jpg
```

Configuration variables:

- **still_image_url** (*Required*): The URL your camera serves the image on, eg. http://192.168.1.21:2112/. Can be a [template](/topics/templating/).
- **name** (*Optional*): This parameter allows you to override the name of your camera.
- **username** (*Optional*): The username for accessing your camera.
- **password** (*Optional*): The password for accessing your camera.
- **authentication** (*Optional*): `basic` (default) or `digest` auth for requests.
- **limit_refetch_to_url_change** (*Optional*): true/false value (default: false). Limits refetching of the remote image to when the url changes. Only relevant if using a template to fetch the remote image.

<p class='img'>
  <a href='/cookbook/google_maps_card/'>
    <img src='/images/components/camera/generic-google-maps.png' alt='Screenshot showing Google Maps integration in Home Assistant front end.'>
    Example showing the Generic camera platform pointing at a dynamic Google Map image.
  </a>
</p>

