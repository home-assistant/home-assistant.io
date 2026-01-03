---
title: TensorFlow
description: Detect and recognize objects with TensorFlow.
ha_category:
  - Image processing
ha_iot_class: Local Polling
ha_release: 0.82
ha_domain: tensorflow
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The TensorFlow image processing {% term integration %} allows you to detect and recognize objects in a camera image using [TensorFlow](https://www.tensorflow.org/). The state of the entity is the number of objects detected, and recognized objects are listed in the `summary` attribute along with quantity. The `matches` attribute provides the confidence `score` for recognition and the bounding `box` of the object for each detection category.

{% important %}
This integration is only available on Home Assistant Core installation types. Unfortunately, it cannot be used with Home Assistant OS, Supervised or Container.
{% endimportant %}

## Prerequisites

The following packages must be installed on Debian before following the setup for the integration to work:

`sudo apt-get install libatlas-base-dev libopenjp2-7 libtiff5`

It is possible that Home Assistant is unable to install the Python TensorFlow bindings. If that is the case,
you'll need to install those manually using: `pip install tensorflow==2.2.0`, as the Python wheel is
not available for all platforms.

See [the official install guide](https://www.tensorflow.org/install/) for other options.

Furthermore, the official Python TensorFlow wheels by Google, require your CPU to support the `avx` extension.
If your CPU lacks those capabilities, Home Assistant will crash when using TensorFlow, without any message.

## Preparation

This integration requires files to be downloaded, compiled on your computer, and added to the Home Assistant configuration directory. These steps can be performed by cloning [this repository](https://github.com/hunterjm/hass-tensorflow) into your configuration directory. Alternatively, if you wish to perform the process manually, the process is as follows:

Create the following folder structure in your configuration directory.

```bash
  |- {config_dir}
    |- tensorflow/
      |- models/
```

Follow these steps (Linux) to compile the object detection library.

```bash
# Clone tensorflow/models
git clone https://github.com/tensorflow/models.git
# Compile Protobuf (apt-get install protobuf-compiler)
cd models/research
protoc object_detection/protos/*.proto --python_out=.
# Copy object_detection to {config_dir}
cp -r object_detection {config_dir}/tensorflow
```

Your final folder structure should look as follows

```bash
  |- {config_dir}
    |- tensorflow/
      |- models/
      |- object_detection/
        |- ...
```

## Model Selection

Lastly, it is time to pick a model. It is recommended to start with one of the COCO models available in the [Model Detection Zoo](https://github.com/tensorflow/models/blob/master/research/object_detection/g3doc/tf2_detection_zoo.md).

The trade-off between the different models is accuracy vs speed.  Users with a decent CPU should start with one of the `EfficientDet` models. If you are running on an ARM device like a Raspberry Pi, start with the `SSD MobileNet v2 320x320` model.

Whichever model you choose, download it and extract in to the `tensorflow/models` folder in your configuration directory.

## Configuration

To enable this {% term integration %} in your installation, add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
image_processing:
  - platform: tensorflow
    source:
      - entity_id: camera.local_file
    model:
      graph: /config/tensorflow/models/efficientdet_d0_coco17_tpu-32/
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
    description: A [template](/docs/configuration/templating/#processing-incoming-data) for the integration to save processed images including bounding boxes. `camera_entity` is available as the `entity_id` string of the triggered source camera.
    required: false
    type: list
model:
    description: Information about the TensorFlow model.
    required: true
    type: map
    keys:
      graph:
        description: Full path to the base model directory.
        required: true
        type: string
      labels:
       description: Full path to a `*label_map.pbtext`.
       required: false
       type: string
       default: tensorflow/object_detection/data/mscoco_label_map.pbtxt
      label_offset:
        description: Offset for mapping label ID to a name (only use for custom models)
        required: false
        type: integer
        default: 1
      model_dir:
        description: Full path to TensorFlow models directory.
        required: false
        type: string
        default: "`/tensorflow` inside configuration"
      area:
        description: Custom detection area. Only objects fully in this box will be reported. Top of image is 0, bottom is 1.  Same left to right.
        required: false
        type: map
        keys:
          top:
            description: Top line defined as % from top of image.
            required: false
            type: float
            default: 0
          left:
            description: Left line defined as % from left of image.
            required: false
            type: float
            default: 0
          bottom:
            description: Bottom line defined as % from top of image.
            required: false
            type: float
            default: 1
          right:
            description: Right line defined as % from left of image.
            required: false
            type: float
            default: 1
      categories:
        description: List of categories to include in object detection. Can be seen in the file provided to `labels`.
        type: list
        required: false
{% endconfiguration %}

`categories` can also be defined as dictionary providing an `area` for each category as seen in the advanced configuration below:

{% raw %}

```yaml
# Example advanced configuration.yaml entry
image_processing:
  - platform: tensorflow
    source:
      - entity_id: camera.driveway
      - entity_id: camera.backyard
    file_out:
      - "/tmp/{{ camera_entity.split('.')[1] }}_latest.jpg"
      - "/tmp/{{ camera_entity.split('.')[1] }}_{{ now().strftime('%Y%m%d_%H%M%S') }}.jpg"
    model:
      graph: /config/tensorflow/models/efficientdet_d0_coco17_tpu-32/
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

{% endraw %}

## Optimizing resources

[Image processing components](/integrations/image_processing/) process the image from a camera at a fixed period given by the `scan_interval`. This leads to excessive processing if the image on the camera hasn't changed, as the default `scan_interval` is 10 seconds. You can override this by adding to your configuration `scan_interval: 10000` (setting the interval to 10,000 seconds), and then call the `image_processing.scan` action when you actually want to perform processing.

```yaml
# Example advanced configuration.yaml entry
image_processing:
  - platform: tensorflow
    scan_interval: 10000
    source:
      - entity_id: camera.driveway
      - entity_id: camera.backyard
```

```yaml
# Example advanced automations.yaml entry
- alias: "TensorFlow scanning"
  triggers:
     - trigger: state
       entity_id:
         - binary_sensor.driveway
  actions:
    - action: image_processing.scan
      target:
        entity_id: camera.driveway
```
