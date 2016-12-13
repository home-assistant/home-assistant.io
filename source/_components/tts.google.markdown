---
layout: page
title: "Google"
description: "Instructions how to setup Google TTS with Home Assistant."
date: 2016-12-13 07:00
sidebar: true
comments: false
sharing: true
footer: true
logo: google.png
ha_category: Text-to-speak
ha_release: 0.35
---

The `google` text-to-speak platform uses [Google](https://www.google.com) Text-to-Speech engine to read a text with natural sounding voices.

To enable text-to-speak with Google, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
tts:
  - platform: google
```

Configuration variables:

- **language** (*Optional*): The language to use. Defaults to `en`.
- **cache** (*Optional*): If you want to use the caching feature. Defaults to `true`.
- **cache_dir** (*Optional*): The port on which the APCUPSd NIS is listening. Defaults to `tts`.
- **time_memory** (*Optional*): The time span for caching in seconds. Defaults to `300`. Minimum is 60 s and the maximum 57600 s (16 hours).


A full configuration sample:

```yaml
# Example configuration.yaml entry
tts:
  - platform: google
    language: de
    cache: true
    cache_dir: /tmp/tts
    time_memory: 600
```
