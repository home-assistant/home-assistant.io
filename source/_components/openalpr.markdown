---
layout: page
title: "OpenALPR"
description: "Instructions how to integrate licences plates with OpenALPR into Home Assistant."
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

[OpenALPR](http://www.openalpr.com/) integration for Home Assistant allows you to process licences plates recorded with a  camera. You can use them to open a garage door or trigger any other [automation](https://home-assistant.io/components/automation/).

<p class='note'>
If you want use a video stream. You need setup the [ffmpeg](/components/ffmpeg) component. See also there for troubleshooting local ffmpeg installation.
</p>

### {% linkable_title Local installation %}

If you want process all data locally, you need version 2.3.1 or higher of the `alpr` commandline tool.

If you don't find binaries for your distribution you can compile from source. Documention of how to build OpenALPR is found [here](https://github.com/openalpr/openalpr/wiki).

On a Debian system you can use this `cmake` command to build only the command line tool:

```bash
$ cmake -DWITH_TEST=FALSE -DWITH_BINDING_JAVA=FALSE --DWITH_BINDING_PYTHON=FALSE --DWITH_BINDING_GO=FALSE -DWITH_DAEMON=FALSE -DCMAKE_INSTALL_PREFIX:PATH=/usr ..
```

Verify your `alpr` installation with:

```
$ wget -O- -q http://plates.openalpr.com/h786poj.jpg | alpr -
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
- **region** (*Required*): Country or region. List of supported [values](https://github.com/openalpr/openalpr/tree/master/runtime_data/config).
- **confidence** (*Optional*): The minimum of confidence in percent to process with Home Assistant. Defaults to 80. 
- **entities** (*Required*): A list of device to add in Home Assistant.
- **name** (*Optional*): This parameter allows you to override the name of your OpenALPR entity.
- **interval** (*Optional*): Time in seconds to poll a picture. If the interval is 0 It don't poll and it only process data with `openalpr.scan` service. Default is 2 seconds.
- **render** (*Optional*): How is Home Assistant to get a picture from. It support `ffmpeg` for video streams and `image` for a still image. Default is with `ffmpeg`.
- **input** (*Required*): The source from getting pictures. With `ffmpeg` it could by all supported input. Image only support an URL.
- **extra_arguments** (*Optional*): Only available with `ffmpeg`.
- **username** (*Optional*): Only available with image for HTTP authentification.
- **password** (*Optional*): Only available with image for HTTP authentification.

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

- **alpr_binary** (*Optional*): Default `alpr`. The command line tool `alpr` from OpenALPR software for local processing.

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

- **api_key** (*Required*): You need an API key from  [OpenALPR Cloud](https://cloud.openalpr.com/).

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

This event is trigger after OpenALPR found a new licence plate.
