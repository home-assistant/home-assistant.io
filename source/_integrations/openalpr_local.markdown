---
title: OpenALPR Local
description: Instructions on how to integrate licences plates with OpenALPR local into Home Assistant.
ha_category:
  - Image Processing
ha_iot_class: Local Push
ha_release: 0.36
ha_domain: openalpr_local
---

The [OpenALPR](https://www.openalpr.com/) integration for Home Assistant allows you
to process vehicle license plates from a camera. You can use this information to 
trigger [automations](/integrations/automation/) like opening a garage door.

For using the result inside an automation rule, take a look at the
[image processing integration](/integrations/image_processing) page.

## Local installation

If you want process all data locally, you will need version 2.3.1 or higher of the
`alpr` command line tool.

If you don't find binaries for your distribution, you can compile the tool from source.
Documentation of how to build OpenALPR is found
[here](https://github.com/openalpr/openalpr/wiki).

On a Debian system you can use the following `cmake` command to build only the command
line tool:

```bash
cmake -DWITH_TEST=FALSE -DWITH_BINDING_JAVA=FALSE --DWITH_BINDING_PYTHON=FALSE \
  --DWITH_BINDING_GO=FALSE -DWITH_DAEMON=FALSE -DCMAKE_INSTALL_PREFIX:PATH=/usr ..
```

For other operating systems, please refer to the
[OpenALPR wiki](https://github.com/openalpr/openalpr/wiki).

Verify your `alpr` installation with a command like the following:

```bash
wget -O- -q http://plates.openalpr.com/h786poj.jpg | alpr -
```

### Configuration

```yaml
# Example configuration.yaml entry
image_processing:
  - platform: openalpr_local
    region: eu
    source:
    - entity_id: camera.garage
```

{% configuration %}
region:
  description: Country or region. List of [supported values](https://github.com/openalpr/openalpr/tree/master/runtime_data/config).
  required: true
  type: string
alpr_bin:
  description: The command line tool alpr from OpenALPR software for local processing.
  required: false
  type: string
  default: alpr
confidence:
  description: The minimum confidence in percent to process with Home Assistant.
  required: false
  type: integer
  default: 80
source:
  description: List of image sources.
  required: true
  type: list
  keys:
    entity_id:
      description: A camera entity id to get the picture from.
      required: true
      type: string
    name:
      description: This parameter allows you to override the name of your OpenALPR entity.
      required: false
      type: string
{% endconfiguration %}
