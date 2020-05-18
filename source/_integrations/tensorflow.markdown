---
title: TensorFlow
description: Detect and recognize objects with TensorFlow.
ha_category:
  - Image Processing
ha_iot_class: Local Polling
ha_release: 0.82
ha_domain: tensorflow
---

The `tensorflow` image processing platform allows you to detect and recognize objects in a camera image using [TensorFlow](https://www.tensorflow.org/). The state of the entity is the number of objects detected, and recognized objects are listed in the `summary` attribute along with quantity. The `matches` attribute provides the confidence `score` for recognition and the bounding `box` of the object for each detection category.

<div class='note warning'>

  The following packages must be installed on Raspbian before following the setup for the integration to work:
  `sudo apt-get install libatlas-base-dev libopenjp2-7 libtiff5`

</div>

## Setup

You need to install the `tensorflow` Python packages with: `$ pip3 install tensorflow==1.13.2`. The wheel is not available for all platforms. See [the official install guide](https://www.tensorflow.org/install/) for other options. The required packages are included in Home Assistant Supervised installations but only supported on amd64 architecture.

This integration requires files to be downloaded, compiled on your computer, and added to the Home Assistant configuration directory. These steps can be performed using the sample script at [this gist](https://gist.github.com/hunterjm/6f9332f92b60c3d5e448ad936d7353c3). Alternatively, if you wish to perform the process manually, the process is as follows:

- Clone [tensorflow/models](https://github.com/tensorflow/models/tree/master/research/object_detection)
- Compile protobuf models located in `research/object_detection/protos` with `protoc`
- Create the following directory structure inside your configuration directory:

```bash
  |- {config_dir}
    | - tensorflow/
      |- object_detection/
        |- __init__.py
```

- Copy required object_detection dependencies to the `object_detection` folder inside of the `tensorflow` folder:

  - `research/object_detection/data`
  - `research/object_detection/utils`
  - `research/object_detection/protos`

## Model Selection

Lastly, it is time to pick a model. It is recommended to start with one of the COCO models available in the [Model Detection Zoo](https://github.com/tensorflow/models/blob/master/research/object_detection/g3doc/detection_model_zoo.md).

The trade-off between the different models is accuracy vs speed.  Users with a decent CPU should start with the `faster_rcnn_inception_v2_coco` model. If you are running on an ARM device like a Raspberry Pi, start with the `ssd_mobilenet_v2_coco` model.

Whichever model you choose, download it and place the `frozen_inference_graph.pb` file in the `tensorflow` folder in your configuration directory.

## Configuration

To enable this platform in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
image_processing:
  - platform: tensorflow
    source:
      - entity_id: camera.local_file
    model:
      graph: /home/homeassistant/.homeassistant/tensorflow/frozen_inference_graph.pb
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
        description: Full path to `frozen_inference_graph.pb`.
        required: true
        type: string
      labels:
       description: Full path to a `*label_map.pbtext`.
       required: false
       type: string
       default: tensorflow/object_detection/data/mscoco_label_map.pbtxt
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

```yaml
# Example advanced configuration.yaml entry
image_processing:
  - platform: tensorflow
    source:
      - entity_id: camera.driveway
      - entity_id: camera.backyard
    file_out:
      - "/tmp/{% raw %}{{ camera_entity.split('.')[1] }}{% endraw %}_latest.jpg"
      - "/tmp/{% raw %}{{ camera_entity.split('.')[1] }}_{{ now().strftime('%Y%m%d_%H%M%S') }}{% endraw %}.jpg"
    model:
      graph: /home/homeassistant/.homeassistant/tensorflow/frozen_inference_graph.pb
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

## Optimizing resources

[Image processing components](/integrations/image_processing/) process the image from a camera at a fixed period given by the `scan_interval`. This leads to excessive processing if the image on the camera hasn't changed, as the default `scan_interval` is 10 seconds. You can override this by adding to your configuration `scan_interval: 10000` (setting the interval to 10,000 seconds), and then call the `image_processing.scan` service when you actually want to perform processing.

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
- alias: TensorFlow scanning
  trigger:
     - platform: state
       entity_id:
         - binary_sensor.driveway
  action:
    - service: image_processing.scan
      entity_id: camera.driveway
```
