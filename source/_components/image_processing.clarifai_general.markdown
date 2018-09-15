---
layout: page
title: "Clarifai general"
description: "Classify the content of images with Clarifai."
date: 2018-09-15 00:00
sidebar: true
comments: false
sharing: true
footer: true
logo: clarifai.png
ha_category: Image Processing
featured: false
ha_release: 0.79
---

The `Clarifai general` image processing platform allows you to identify the contents of images using the [Clarifai](https://www.clarifai.com/) [general image recognition model](https://www.clarifai.com/models/general-image-recognition-model-aaa03c23b3724a16a56b629203edc62c). For each configured image source, a sensor is added where the state of the sensor is the most likely concept (objects or ideas) within the camera image. A sensor attribute lists all of the identified concepts in the image and their probability in percent (%). Optionally you can configure a list of special `concepts` for which an  `image_processing.model_prediction` event is fired when the concept is detected.


This platform requires you to create an account with [Clarifai documentation](https://www.clarifai.com/pricing) and configure an `api_key`. The Community developer account (no charge) allows 5000 classifications per month.


## {% linkable_title Configuration %}

To enable this platform in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
image_processing:
  - platform: clarifai_general
    api_key: YOUR_KEY
    source:
      - entity_id: camera.demo_camera
        name: my_custom_name
    concepts:
      - people
      - vehicle
```

{% configuration %}
name:
  description: The name of the added sensor.
  required: false
  type: string
api_key:
  description: Your Clarifai developer API key.
  required: true
  type: string
source:
  description: The list of image sources.
  required: true
  type: map
  keys:
    entity_id:
      description: A camera entity id to get picture from.
      required: true
      type: string
    name:
      description: This parameter allows you to override the name of your `image_processing` entity.
      required: false
      type: string
concepts:
  description: A list of special concepts which fire events.
  required: false
  type: string
{% endconfiguration %}


## {% linkable_title Optimising resources %}

[Image processing components](https://www.home-assistant.io/components/image_processing/) process the image from a camera at a fixed period given by the `scan_interval`. This leads to excessive processing if the image on the camera hasn't changed, as the default `scan_interval` is 10 seconds. You can override this by adding to your config `scan_interval: 10000` (setting the interval to 10,000 seconds), and then call the `image_processing.scan` service when you actually want to perform processing.
