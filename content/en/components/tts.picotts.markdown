---
layout: page
title: "Pico Text-to-Speech"
description: "Instructions on how to setup Pico Text-to-Speech with Home Assistant."
date: 2017-01-03 16:00
sidebar: true
comments: false
sharing: true
footer: true
logo: home-assistant.png
ha_category: Text-to-speech
ha_release: 0.36
---

The `picotts` text-to-speech platform uses offline pico Text-to-Speech engine to read a text with natural sounding voices.
This requires to install the pico tts library on the system, typically on debian just do `sudo apt-get install libttspico-utils`
On some raspbian release, this package is missing but you can just copy the arm deb package from debian.

To enable text-to-speech with Pico, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
tts:
  - platform: picotts
```

Configuration variables:

- **language** (*Optional*): The language to use. Defaults to `en-US`. 
Supported languages : 'en-US', 'en-GB', 'de-DE', 'es-ES', 'fr-FR', 'it-IT'

A full configuration sample:

```yaml
# Example configuration.yaml entry
tts:
  - platform: picotts
    language: 'fr-FR'
```
