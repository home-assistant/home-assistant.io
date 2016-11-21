---
layout: page
title: "OpenAlpr"
description: "Instructions how to integrate licences plates with OpenAlpr into Home Assistant."
date: 2016-09-22 00:00
sidebar: true
comments: false
sharing: true
footer: true
logo: openalpr.png
ha_category: Automation
featured: false
ha_release: 0.29
ha_iot_class: "Local Push"
---

[OpenAlpr](http://www.openalpr.com/) integration for Home Assistant allows you to process licences plates from a camera. You can use them to open a garage door or trigger any other [automation](https://home-assistant.io/components/automation/).

<p class='note'>
If you want use a video stream. You need setup the [ffmpeg](/components/ffmpeg) component. See also there for troubleshooting local ffmpeg installation.
</p>

### {% linkable_title Local installation %}

If you want process all data local you need the command line tool `alpr` in version > 2.3.1

If you don't found binarys for you distribution you can compile from source. A documention how to build a openalpr is found [here](https://github.com/openalpr/openalpr/wiki).

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
openalpr:
  engine: local
  region: eu
  confidence: 80.0
  entities:
   - name: Camera garage 1
     interval: 5
     render: ffmpeg
     input: INPUT_STREAM
     extra_arguments: SOME OTHER FFMPEG STUFF
   - name: Camera garage 2
     interval: 5
     render: image
     input: https://camera_ip/still_image.jpg
     username: admin
     password: bla
```
Configuration variables:

- **engine** (*Required*): `local` or `cloud` for processing
- **region** (*Required*): Country or region. List of Supported [value](https://github.com/openalpr/openalpr/tree/master/runtime_data/config).
- **confidence** (*Optional*): Default 80. The minimum of confidence in percent to process with Home-Assistant.
- **entities** (*Required*): A list of device to add in Home-Assistant.
- **name** (*Optional*): This parameter allows you to override the name of your openalpr entitie.
- **interval** (*Optional*): Default 2. Time in seconds to poll a picture. If the interval is 0 It don't poll and it only process data with `openalpr.scan` service.
- **render** (*Optional*): default is with ffmpeg. How is Home-Assistant to get a picture from. It support `ffmpeg` for video streams and `image` for a still image.
- **input** (*Required*): The source from getting pictures. With ffmpeg it could by all supported input. Image only support a url.
- **extra_arguments** (*Optional*): Only available with ffmpeg.
- **username** (*Optional*): Only available with image for http authentification.
- **password** (*Optional*): Only available with image for http authentification.

### {% linkable_title Configuration Home Assistant local processing %}

```yaml
# Example configuration.yaml entry
openalpr:
  engine: local
  region: eu
  alpr_binary: /usr/bin/alpr
  entities:
...
```
Configuration variables:

- **alpr_binary** (*Optional*): Default `alpr`. The command line tool alpr from OpenAlpr software for local processing.

### {% linkable_title Configuration Home Assistant cloud processing %}

```yaml
# Example configuration.yaml entry
openalpr:
  engine: cloud
  region: eu
  api_key: SK_AAABBBBCCCEEEE
  entities:
...
```
Configuration variables:

- **api_key** (*Required*): You need a api key from  [OpenAlpr Cloud](https://cloud.openalpr.com/).

#### {% linkable_title Service %}

- `openalpr.scan`: Scan immediately a picture from input.
- `openalpr.restart`: Restart a ffmpeg process

#### {% linkable_title Events %}

```yaml
# Example configuration.yaml automation entry
automation:
- alias: Open garage door
  trigger:
    platform: event
    Event_type: openalpr.found
    Event_data:
      entity_id: openalpr.camera_garage_1
      plate: BE2183423
...
```

This event is trigger after openalpr found a new licence plate.
