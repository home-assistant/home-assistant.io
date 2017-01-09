---
layout: page
title: "OpenAlpr Local"
description: "Instructions how to integrate licences plates with OpenAlpr local into Home Assistant."
date: 2017-01-09 00:00
sidebar: true
comments: false
sharing: true
footer: true
logo: openalpr.png
ha_category: Image_Processing
featured: false
ha_release: 0.36
---

[OpenAlpr](http://www.openalpr.com/) integration for Home Assistant allows you to process licences plates from a camera. You can use them to open a garage door or trigger any other [automation](https://home-assistant.io/components/automation/).

### {% linkable_title Local installation %}

If you want process all data local you need the command line tool `alpr` in version > 2.3.1

If you don't find binaries for your distribution you can compile from source. Documention of how to build openalpr is found [here](https://github.com/openalpr/openalpr/wiki).

On a debian system you can use this cmake command to build only the command line tool (which second part on linux build instruction - ubuntu 14.04+):
```bash
cmake -DWITH_TEST=FALSE -DWITH_BINDING_JAVA=FALSE --DWITH_BINDING_PYTHON=FALSE --DWITH_BINDING_GO=FALSE -DWITH_DAEMON=FALSE -DCMAKE_INSTALL_PREFIX:PATH=/usr ..
```

Verify your alpr installation with:
```
wget -O- -q http://plates.openalpr.com/h786poj.jpg | alpr -
```

### {% linkable_title Configuration Home Assistant %}

```yaml
# Example configuration.yaml entry
image_processing:
 - platform: openalpr_cloud
   api_key: 'sk_abcxyz123456'
   region: eu
   source:
    - entity_id: camera.garage
```
Configuration variables:

- **region** (*Required*): Country or region. List of Supported [value](https://github.com/openalpr/openalpr/tree/master/runtime_data/config).
- **api_key** (*Required*): You need a api key from  [OpenAlpr Cloud](https://cloud.openalpr.com/).
- **confidence** (*Optional*): Default 80. The minimum of confidence in percent to process with Home-Assistant.
- **source** (*Required*):
  - **entities** (*Required*): A list of device to add in Home-Assistant.
  - **name** (*Optional*): This parameter allows you to override the name of your openalpr entity.
