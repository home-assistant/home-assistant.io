---
layout: page
title: "Google Text-to-Speech"
description: "Instructions on how to setup Google Text-to-Speech with Home Assistant."
date: 2016-12-13 07:00
sidebar: true
comments: false
sharing: true
footer: true
logo: google.png
ha_category: Text-to-speech
ha_release: 0.35
---

The `google` text-to-speech platform uses [Google Text-to-Speech engine](https://console.developers.google.com/apis/api/speech.googleapis.com/overview) Text-to-Speech engine to read a text with natural sounding voices.

To enable text-to-speech with Google, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
tts:
  - platform: google
```

Configuration variables:

- **language** (*Optional*): The language to use. Defaults to `en`.
  - [Complete list of supported languages (Languages where "Talk" feature is enabled in Google Translate)](https://translate.google.com/intl/en_ALL/about/languages/), use 2 digit language code which you can find at the end of url when you click on Language name.

A full configuration sample:

```yaml
# Example configuration.yaml entry
tts:
  - platform: google
    language: 'de'
```

If you are using SSL certificate or Docker, you may need to add the `base_url` configuration variable to your `http` component as follows:

```yaml
#Example configuration.yaml entry
http:
  base_url: example.duckdns.org
```

The `base_url` configuration variable was added in 0.35.1, so make sure your Home Assistant version is **0.35.1 or above.**
