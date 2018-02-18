---
layout: page
title: "OpenALPR Local"
description: "Instructions how to integrate licences plates with OpenALPR local into Home Assistant."
date: 2017-01-09 00:00
sidebar: true
comments: false
sharing: true
footer: true
logo: openalpr.png
ha_category: Image Processing
featured: false
ha_release: 0.36
redirect_from: /components/openalpr/
---

[OpenALPR](http://www.openalpr.com/) integration for Home Assistant allows you to process licences plates from a camera. You can use them to open a garage door or trigger any other [automation](https://home-assistant.io/components/automation/).

For using inside automation look on [component](/components/image_processing) page.

### {% linkable_title Local installation %}

If you want process all data locally, you need version 2.3.1 or higher of the `alpr` commandline tool.

If you don't find binaries for your distribution you can compile from source. Documentation of how to build OpenALPR is found [here](https://github.com/openalpr/openalpr/wiki).

On a Debian system you can use this `cmake` command to build only the command line tool:

```bash
$ cmake -DWITH_TEST=FALSE -DWITH_BINDING_JAVA=FALSE --DWITH_BINDING_PYTHON=FALSE \
  --DWITH_BINDING_GO=FALSE -DWITH_DAEMON=FALSE -DCMAKE_INSTALL_PREFIX:PATH=/usr ..
```

For other operating system please refer to the [OpenALPR wiki](https://github.com/openalpr/openalpr/wiki).

Verify your `alpr` installation with:

```bash
$ wget -O- -q http://plates.openalpr.com/h786poj.jpg | alpr -
```

### {% linkable_title Configuration Home Assistant %}


```yaml
# Example configuration.yaml entry
image_processing:
 - platform: openalpr_local
   region: eu
   source:
    - entity_id: camera.garage
```
Configuration variables:

- **region** (*Required*): Country or region. List of supported [values](https://github.com/openalpr/openalpr/tree/master/runtime_data/config).
- **alpr_bin** (*Optional*): The command line tool alpr from OpenALPR software for local processing. Defaults to `alpr`.
- **confidence** (*Optional*):  The minimum of confidence in percent to process with Home Assistant. Defaults to 80.
- **source** array (*Required*): List of image sources.
  - **entities** (*Required*): A list of devices to add in Home Assistant.
  - **name** (*Optional*): This parameter allows you to override the name of your OpenALPR entity.

