---
layout: page
title: "Text-to-Speak (TTS)"
description: "Instructions how to setup Text-to-Speak (TTS) with Home Assistant."
date: 2016-12-13 07:00
sidebar: true
comments: false
sharing: true
footer: true
ha_release: 0.35
---

Text-to-speak (TTS) enables Home Assistant to speak to you. 

Say to all `media_player` device entities:

```yaml
service: tts.google_say
data:
  message: 'May the Force be with you.'
```

```yaml
service: tts.google_say
entity_id: media_player.floor
data:
  message: 'May the Force be with you.'
```

With a template:

```yaml
service: tts.google_say
data_template:
  message: 'Temperature is {% raw %}{{ sensor.temperature }}{% endraw %}.'
  cache: false
```

