---
title: Seven Segments OCR
description: Instructions on how to use OCR for seven segments displays into Home Assistant.
ha_category:
  - Image processing
ha_release: 0.45
og_image: /images/screenshots/ssocr.png
ha_iot_class: Local Polling
ha_domain: seven_segments
ha_codeowners:
  - '@fabaff'
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The `seven_segments` image processing {% term integration %} allows you to read physical seven segments displays through Home Assistant. [`ssocr`](https://www.unix-ag.uni-kl.de/~auerswal/ssocr/) is used to extract the value shown on the display which is observed by a [camera](/integrations/camera/).

{% details "Notes for Home Assistant Core Installations" %}

`ssocr` needs to be available on your system. Check the installation instruction below:

```bash
sudo dnf -y install imlib2-devel # Fedora
sudo apt install libimlib2-dev # Ubuntu
brew install imlib2 # macOS
git clone https://github.com/auerswal/ssocr.git
cd ssocr
make
sudo make PREFIX=/usr install # On most systems
make deb # (Optional) This allows you to make a deb so that you apt is aware of ssocr
```

{% enddetails %}

## Configuration

To enable the OCR of a seven segment display in your installation, add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
image_processing:
  - platform: seven_segments
    source:
      - entity_id: camera.seven_segments
```

{% configuration %}
ssocr_bin:
  description: The command line tool `ssocr`. Set it if you use a different name for the executable.
  required: false
  default: ssocr
  type: string
x_position:
  description: X coordinate of the upper left corner of the area to crop.
  required: false
  default: 0
  type: integer
y_position:
  description: Y coordinate of the upper left corner of the area to crop.
  required: false
  default: 0
  type: integer
height:
  description: Height of the area to crop.
  required: false
  default: 0
  type: integer
width:
  description: Width of the area to crop.
  required: false
  default: 0
  type: integer
rotate:
  description: Rotation of the image.
  required: false
  default: 0
  type: integer
threshold:
  description: Threshold for the difference between the digits and the background.
  required: false
  default: 0
  type: integer
digits:
  description: Number of digits in the display.
  required: false
  default: -1
  type: integer
extra_arguments:
  description: Other arguments to use. Like `-D`, `dilation`, `erosion`, `greyscale`, `make_mono`, etc.
  required: false
  type: string
source:
  description: List of image sources.
  required: true
  type: list
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

### Setup process

It's suggested that the first attempt to determine the needed parameters is using `ssocr` directly. This may require a couple of iterations to get the result

```bash
ssocr -D erosion crop 390 250 490 280 -t 20 -d 4 seven-seg.png
```

This would lead to the following entry for the {% term "`configuration.yaml`" %} file:

```yaml
camera:
  - platform: local_file
    file_path: /home/homeassistant/.homeassistant/seven-seg.png
    name: seven_segments
image_processing:
  - platform: seven_segments
    x_position: 390
    y_position: 250
    height: 280
    width: 490
    threshold: 20
    digits: 4
    source:
      - entity_id: camera.seven_segments
```

<p class='img'>
  <img src='/images/screenshots/ssocr.png' />
</p>

With the help of a [template sensor](/integrations/template), the value can be shown as badge.

{% raw %}

```yaml
sensor:
  - platform: template
    sensors:
      power_meter:
        value_template: "{{ states('image_processing.sevensegment_ocr_seven_segments') }}"
        friendly_name: "Ampere"
        unit_of_measurement: "A"
```

{% endraw %}
