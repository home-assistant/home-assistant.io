---
layout: page
title: "Facebox Face Detect"
description: "Count the number of faces in an image with Facebox."
date: 2018-05-03 00:00
sidebar: true
comments: false
sharing: true
footer: true
logo: home-assistant.png
ha_category: Image Processing
featured: false
ha_release: 0.69
---

The `facebox_face_detect` image processing component allows you to detect (i.e. count the number of) faces in a camera image using [Facebox](https://machinebox.io/docs/facebox). The state of the entity is the number of faces detected. Facebox runs in a Docker container, and it is recommended that you run this container on a machine with a minimum of 2 GB RAM. To minimise the time for Facebox to detect faces in an image using this component, on your machine with Docker run Facebox with:
```
MB_KEY="INSERT-YOUR-KEY-HERE"

docker run -p 8080:8080 -e "MB_KEY=$MB_KEY" -e "MB_FACEBOX_DISABLE_RECOGNITION=true" machinebox/facebox
```

To enable this component in your installation, add the following to your `configuration.yaml` file:

{% raw %}
```yaml
# Example configuration.yaml entry
image_processing:
  - platform: facebox_face_detect
    ip_address: 192.168.0.1
    port: 8080
    source:
      - entity_id: camera.local_file
        name: my_custom_name
```
{% endraw %}

{% configuration %}
ip_address:
  description: The IP address of your machine hosting Facebox.
  required: true
  type: string
port:
  description: The port which Facebox is exposed on.
  required: true
  type: string
source:
  description: The list of image sources.
  required: true
  type: array
entity_id:
  description: A camera entity id to get picture from.
  required: true
  type: string
name:
  description: This parameter allows you to override the name of your `image_processing` entity.
  required: false
  type: string
{% endconfiguration %}
