---
layout: page
title: "TensorFlow"
description: "Detect and recognize objects with TensorFlow."
date: 2018-10-24 00:00
sidebar: true
comments: false
sharing: true
footer: true
logo: tensorflow.png
ha_category: Image Processing
featured: false
ha_release: 0.82
---

The `tensorflow` image processing platform allows you to detect and recognize objects in a camera image using [TensorFlow](https://www.tensorflow.org/). The state of the entity is the number of objects detected, and recognized objects are listed in the `matches` attribute. The attribute provides the confidence `score` for recognition and the bounding `box` of the object for each detection category.

## {% linkable_title Setup %}
TensorFlow is pre-configured in the [official home assistant docker image](https://hub.docker.com/r/homeassistant/home-assistant/).  If you are using this image, you can skip this section.

TensorFlow is special in that it can run on the CPU, or an Nvidia GPU using CUDA.  Because of this, tensorflow is not listed in `REQUIREMENTS`.  In your instance, you will need to pre-install either `tensorflow` or `tensorflow-gpu` via pip:

```bash
# CPU
pip3 install tensorflow
# GPU
pip3 install tensorflow-gpu
```

Object detection also requires some dependancies outside of the core tensorflow package.  These live in the [tensorflow/models](https://github.com/tensorflow/models/tree/master/research/object_detection) GitHub repository.  The one we are interested in for this use case lives in `research/object_detection`.  Since the repository is large, we will be cloning in `/tmp` and only moving the files this component needs.  The rest can safely be deleted.  Run the following, making sure to replace `/home/homeassistant/.homeassistant/` with the path to your config directory:

```bash
cd /tmp

# Clone the latest code from GitHub
git clone --depth 1 https://github.com/tensorflow/models.git tensorflow-models

# download protobuf 3.4
curl -OL https://github.com/google/protobuf/releases/download/v3.4.0/protoc-3.4.0-linux-x86_64.zip
unzip -a protoc-3.4.0-linux-x86_64.zip -d protobuf
mv protobuf/bin /tmp/tensorflow-models/research

# Build the protobuf models
cd /tmp/tensorflow-models/research/
./bin/protoc object_detection/protos/*.proto --python_out=.

# Copy only necessary files
mkdir -p /home/homeassistant/.homeassistant/tensorflow/object_detection
touch /home/homeassistant/.homeassistant/tensorflow/object_detection/__init__.py
mv object_detection/data /home/homeassistant/.homeassistant/tensorflow/object_detection
mv object_detection/utils /home/homeassistant/.homeassistant/tensorflow/object_detection
mv object_detection/protos /home/homeassistant/.homeassistant/tensorflow/object_detection

# Cleanup
rm -rf /tmp/*
```

Finally, you are ready to pick a model.  Researchers have already built multiple TensorFlow object detection models using many open data sets like [COCO](http://cocodataset.org), [Kitti](http://www.cvlibs.net/datasets/kitti/), and [Open Images](https://github.com/openimages/dataset).

This component can support all of them, and if you are feeling adventurous, you can even [roll your own](https://github.com/tensorflow/models/blob/master/research/object_detection/g3doc/defining_your_own_model.md).

For now, start with one of the COCO models available in the [Model Detection Zoo](https://github.com/tensorflow/models/blob/master/research/object_detection/g3doc/detection_model_zoo.md).  The trade-off here is accuracy vs speed.  The `mAP` is an indication of the model's accuracy while the `ms` is inference speed (on an Nvidia Titan X).  Most users won't see detection speeds close to what is listed.

It is recommended to start with the `faster_rcnn_inception_v2_coco` model for users with a dedicated server with a decent CPU.  If you are running on an ARM device like a Rasberry Pi, stick with a SSD MobileNet model like the `ssd_mobilenet_v2_coco` which was built for mobile devices.

Whichever model you choose, download it and place the `frozen_inference_graph.pb` file somewhere accessible by Home Assistant like your config directory.

## {% linkable_title Configuration %}

To enable this platform in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
image_processing:
  - platform: tensorflow
    source:
      - entity_id: camera.local_file
    model:
      graph: /home/homeassistant/.homeassistant/frozen_inference_graph.pb
      labels: /home/homeassistant/.homeassistant/tensorflow/object_detection/data/mscoco_label_map.pbtxt
      model_dir: /home/homeassistant/.homeassistant/tensorflow
```

{% configuration %}
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
file_out:
    description: A [template](/docs/configuration/templating/#processing-incoming-data) for the component to save processed images including bounding boxes. `camera_entity` is available as the `entity_id` string of the triggered source camera.
    required: false
    type: list
model:
    description: Information about the TensorFlow model.
    required: true
    type: map
    keys:
        graph:
            description: Full path to `frozen_inference_graph.pb`.
            required: true
            type: file
        labels:
            description: Full path to a `*label_map.pbtext`.
            required: false
            type: file
            default: /usr/src/app/tensorflow/object_detection/data/mscoco_label_map.pbtxt
        model_dir:
            description: Full path to tensorflow models directory.
            required: false
            type: directory
            default: /usr/src/app/tensorflow
        area:
            description: Custom detection area.  Only objects fully in this box will be reported. Top of image is 0, bottom is 1.  Same left to right.
            required: false
            type: map
            keys:
                top:
                    description: Top line defined as % from top of image.
                    required: false
                    type: small_float
                    default: 0
                left:
                    description: Left line defined as % from left of image.
                    required: false
                    type: small_float
                    default: 0
                bottom:
                    description: Bottom line defined as % from top of image.
                    required: false
                    type: small_float
                    default: 1
                right:
                    description: Right line defined as % from left of image.
                    required: false
                    type: small_float
                    default: 1
        categories:
            description: List of categories to include in object detection.  Can be seen in the file provided to `labels`.
            type: list
            required: false
{% endconfiguration %}

`categories` can also be defined as dictionary providing an `area` for each category as seen in the advanced configuration below:

```yaml
# Example advanced configuration.yaml entry
image_processing:
  - platform: tensorflow
    source:
      - entity_id: camera.local_file
    file_out:
      - "/tmp/{{ camera_entity.split('.')[1] }}_latest.jpg"
      - "/tmp/{{ camera_entity.split('.')[1] }}_{{ now().strftime('%Y%m%d_%H%M%S') }}.jpg"
    model:
      graph: /home/homeassistant/.homeassistant/frozen_inference_graph.pb
      labels: /home/homeassistant/.homeassistant/tensorflow/object_detection/data/mscoco_label_map.pbtxt
      model_dir: /home/homeassistant/.homeassistant/tensorflow
      categories:
        - category: person
          area:
            # Exclude top 10% of image
            top: 0.1
            # Exclude right 15% of image
            right: 0.85
        - car
        - truck
```

## {% linkable_title Optimising resources %}

[Image processing components](https://www.home-assistant.io/components/image_processing/) process the image from a camera at a fixed period given by the `scan_interval`. This leads to excessive processing if the image on the camera hasn't changed, as the default `scan_interval` is 10 seconds. You can override this by adding to your config `scan_interval: 10000` (setting the interval to 10,000 seconds), and then call the `image_processing.scan` service when you actually want to perform processing.
