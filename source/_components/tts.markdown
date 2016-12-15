---
layout: page
title: "Text-to-Speech (TTS)"
description: "Instructions how to setup Text-to-Speech (TTS) with Home Assistant."
date: 2016-12-13 07:00
sidebar: true
comments: false
sharing: true
footer: true
ha_release: 0.35
---

Text-to-speech (TTS) enables Home Assistant to speak to you.

# {% linkable_title Cache %}

The component have 2 cache. A long time cache on file system, they can controll with `cache` option on platform config or service call `say`. And a in memory cache for fast response to media player, they will be auto cleanup after several time.

# {% linkable_title Configuring a `tts` platform %}

To get started add the following lines to your `configuration.yaml` (example for google):

```yaml
# Example configuration.yaml entry for google tts service
tts:
  - platform: google
```

The following optional parameters can be used with any platform. However tts component will only look for global settings under the configuration of the first configured platform:

| Parameter           | Default | Description                                                                                                                                                                                                                                                                                                                                                                               |
|---------------------|---------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `cache` | True    | Allow TTS to cache voice file to local storage. |
| `cache_dir`  | tts      | Foldername or path to folder for caching files. |
| `time_memory`     | 300     | Time to hold the voice data inside memory for fast play on media player. Minimum is 60 s and the maximum 57600 s (16 hours). |

The extended example from above would look like the following sample:

```yaml
# Example configuration.yaml entry for google tts service
tts:
  - platform: google
    cache: true
    cache_dir: /tmp/tts
    time_memory: 300
```

# {% linkable_title Service say %}

Say to all `media_player` device entities:

```yaml
service: tts.platform_say
data:
  message: 'May the Force be with you.'
```

```yaml
service: tts.platform_say
entity_id: media_player.floor
data:
  message: 'May the Force be with you.'
```

With a template:

```yaml
service: tts.platform_say
data_template:
  message: 'Temperature is {% raw %}{{ sensor.temperature }}{% endraw %}.'
  cache: false
```

