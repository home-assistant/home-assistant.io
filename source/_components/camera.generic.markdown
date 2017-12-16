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


The `generic` camera platform allows you to integrate any IP camera or other URL into Home Assistant. Templates can be used to generate the URLs on the fly.

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
- **authentication** (*Optional*): Type for authenticating the requests `basic` (default) or `digest`.
- **limit_refetch_to_url_change** (*Optional*): True/false value (default: false). Limits re-fetching of the remote image to when the URL changes. Only relevant if using a template to fetch the remote image.
- **content_type** (*Optional*): Set the content type for the IP camera if it is not a jpg file (default: `image/jpeg`). Use `image/svg+xml` to add a dynamic svg file.
- **headers** (*Optional*): Set request headers. Unset by default.

<p class='img'>
  <a href='/cookbook/google_maps_card/'>
    <img src='/images/components/camera/generic-google-maps.png' alt='Screenshot showing Google Maps integration in Home Assistant front end.'>
    Example showing the Generic camera platform pointing at a dynamic Google Map image.
  </a>
</p>

## {% linkable_title Examples %}

In this section you find some real life examples of how to use this camera platform.

### {% linkable_title Weather graph from yr.no %}

```yaml
camera:
  - platform: generic
    name: Weather
    still_image_url: https://www.yr.no/place/Norway/Oslo/Oslo/Oslo/meteogram.svg
    content_type: 'image/svg+xml'
```

### {% linkable_title Public webcam requiring headers %}

```yaml
camera:
  - platform: generic
    name: centre_pompidou_metz
    still_image_url: "http://metz.fr/pages/webcams/images/amphitheatre.jpg?{{ as_timestamp(now()) * 1000 }}"
    headers:
      referer: "http://metz.fr/pages/webcams/quartier_amphitheatre.php"
```
