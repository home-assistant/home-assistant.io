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
ha_category: Text-to-speech
ha_release: 0.35
---

The `google` text-to-speech platform uses [Google](https://www.google.com) Text-to-Speech engine to read a text with natural sounding voices.

To enable text-to-speech with Google, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
tts:
  - platform: google
```

Configuration variables:

- **language** (*Optional*): The language to use. Defaults to `en`. 

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
