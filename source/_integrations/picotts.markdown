---
title: Pico TTS
description: Instructions on how to setup Pico Text-to-Speech with Home Assistant.
ha_category:
  - Text-to-speech
ha_iot_class: Local Push
ha_release: 0.36
ha_domain: picotts
ha_platforms:
  - tts
---

The `picotts` text-to-speech platform uses offline pico Text-to-Speech engine to read a text with natural sounding voices.
This requires to install the pico TTS library on the system, typically on Debian just do `sudo apt-get install libttspico-utils`
On some Raspbian release, this package is missing but you can just copy the arm deb package from Debian.

On Debian Buster, the package is missing, use the following commands to install it:

```bash
wget http://ftp.us.debian.org/debian/pool/non-free/s/svox/libttspico0_1.0+git20130326-9_armhf.deb
wget http://ftp.us.debian.org/debian/pool/non-free/s/svox/libttspico-utils_1.0+git20130326-9_armhf.deb
sudo apt-get install -f ./libttspico0_1.0+git20130326-9_armhf.deb ./libttspico-utils_1.0+git20130326-9_armhf.deb
```

## Configuration

To enable text-to-speech with Pico, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
tts:
  - platform: picotts
```

{% configuration %}
language:
  description: "The language to use. Supported languages are `en-US`, `en-GB`, `de-DE`, `es-ES`, `fr-FR` and `it-IT`."
  required: false
  type: string
  default: "`en-US`"
{% endconfiguration %}

## Full configuration example

The configuration sample below shows how an entry can look like:

```yaml
# Example configuration.yaml entry
tts:
  - platform: picotts
    language: "fr-FR"
```
