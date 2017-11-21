---
layout: page
title: "Baidu Text-to-Speech"
description: "Instructions how to setup Baidu TTS with Home Assistant."
date: 2017-11-21 09:00
sidebar: true
comments: false
sharing: true
footer: true
logo: baiducloud.png
ha_category: Text-to-speech
ha_release: 0.59
---

The `baidu` text-to-speech platform uses [Baidu TTS engine](https://cloud.baidu.com/product/speech/tts) to read a text with natural sounding voices.

To get started, add the following lines to your `configuration.yaml`:

```yaml
#Example configuration.yaml entry
tts:
  - platform: baidu
    app_id: YOUR_APPID
    api_key: YOUR_APIKEY
    secret_key: YOUR_SECRETKEY
    person: 4
```

Configuration variables:

- **app_id** (*Required*): AppID for use this service, registered on Baidu.
- **api_key** (*Required*): Apikey from Baidu.
- **secret_key** (*Required*): Secretkey from Baidu.
- **speed** (*Optional*): Audio speed, from 0 to 9, default is 5.
- **pitch** (*Optional*): Audio pitch, from 0 to 9, default is 5.
- **volume** (*Optional*): Audio volume, from 0 to 15, default is 5.
- **person** (*Optional*): You can choose 0, 1, 3, 4, default is 0(a female voice).

