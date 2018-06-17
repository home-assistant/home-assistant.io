---
layout: page
title: "Facebox"
description: "Detect and recognize faces with Facebox."
date: 2018-05-03 00:00
sidebar: true
comments: false
sharing: true
footer: true
logo: machine-box.png
ha_category: Image Processing
featured: false
ha_release: 0.70
---

The `facebox` image processing platform allows you to detect and recognize faces in a camera image using [Facebox](https://machinebox.io/docs/facebox). The state of the entity is the number of faces detected, and recognized faces are listed in the `matched_faces` attribute. An `image_processing.detect_face` event is fired for each recognized face, and the event `data` provides the `confidence` of recognition, the `name` of the person, the `image_id` of the image associated with the match, the `bounding_box` that contains the face in the image, and the `entity_id` that processing was performed on.

## {% linkable_title Setup %}

Facebox runs in a Docker container and it is recommended that you run this container on a machine with a minimum of 2 GB RAM. On your machine with Docker, run the Facebox container with:

```bash
MB_KEY="INSERT-YOUR-KEY-HERE"

sudo docker run --name=facebox --restart=always -p 8080:8080 -e "MB_KEY=$MB_KEY"  machinebox/facebox
```

If you only require face detection (number of faces) you can disable face recognition by adding `-e "MB_FACEBOX_DISABLE_RECOGNITION=true"` to the `docker run` command.

## {% linkable_title Configuration %}

To enable this platform in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
image_processing:
  - platform: facebox
    ip_address: 192.168.0.1
    port: 8080
    source:
      - entity_id: camera.local_file
        name: my_custom_name
```

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
{% endconfiguration %}

## {% linkable_title Automations %}

Use the `image_processing.detect_face` events to trigger automations, and breakout the `trigger.event.data` using a [data_template](https://www.home-assistant.io/docs/automation/templating/). The following example automation sends a notification when Ringo Star is recognized:

{% raw %}
```yaml
- id: '12345'
  alias: Ringo Starr recognised
  trigger:
    platform: event
    event_type: image_processing.detect_face
    event_data:
      name: 'Ringo_Starr'
  action:
    service: notify.platform
    data_template:
      message: Ringo_Starr recognised with probability {{ trigger.event.data.confidence }}
      title: Door-cam notification
```
{% endraw %}

## {% linkable_title Service `facebox_teach_face` %}

The service `facebox_teach_face` can be used to teach Facebox faces.  

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | no | Entity ID of facebox entity.
| `name` | no | The name to associate with a face.
| `file_path` | no | The path to the image file.

Example valid service data is:

{% raw %}
```yaml
{
  "entity_id": "image_processing.facebox_local_file",
  "name": "superman",
  "file_path": "/images/superman_1.jpeg"
}
```
{% endraw %}

An `image_processing.teach_classifier` event is fired for each service call, providing feedback on whether teaching has been successful or unsuccessful. In the unsuccessful case, the `message` field of the `event_data` will contain information on the cause of failure, and a warning is also published in the logs. An automation can be used to receive alerts on teaching, for example the following automation will send a notification with the teaching image and a message describing the status of the teaching:

```yaml
- id: '11200961111'
  alias: Send facebox teaching result
  trigger:
    platform: event
    event_type: image_processing.teach_classifier
    event_data:
      classifier: facebox
  action:
    service: notify.platform
    data_template:
      title: Facebox teaching
      message: Name {{ trigger.event.data.name }} teaching was successful? {{ trigger.event.data.success }}
      data:
        file: ' {{trigger.event.data.file_path}} '
```

## {% linkable_title Optimising resources %}

[Image processing components](https://www.home-assistant.io/components/image_processing/) process the image from a camera at a fixed period given by the `scan_interval`. This leads to excessive processing if the image on the camera hasn't changed, as the default `scan_interval` is 10 seconds. You can override this by adding to your config `scan_interval: 10000` (setting the interval to 10,000 seconds), and then call the `image_processing.scan` service when you actually want to perform processing.
