---
title: GStreamer
description: Instructions on how to integrate GStreamer into Home Assistant.
ha_category:
  - Media player
ha_release: 0.39
ha_iot_class: Local Push
ha_domain: gstreamer
ha_platforms:
  - media_player
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The `gstreamer` {% term integration %} allows you to play audio via a [gstreamer](https://gstreamer.freedesktop.org/) pipeline. Practically, this means you can play audio directly on the computer running Home Assistant. It is particularly suited for playing TTS. Advanced users can specify a pipeline to transform the audio stream and/or redirect it elsewhere.

To add a `gstreamer` media player to your installation, add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
media_player:
  - platform: gstreamer
```

{% configuration %}
name:
  description: Name of the media player.
  required: false
  type: string
pipeline:
  description: A `gst` pipeline description.
  required: false
  type: string
{% endconfiguration %}

Only the `music` media type is supported.

## Setup

And then install the following system dependencies:

Debian/Ubuntu/Raspberry Pi OS (formerly Raspbian):

```bash
sudo apt-get install python3-gst-1.0 \
    gir1.2-gstreamer-1.0 gir1.2-gst-plugins-base-1.0 \
    gstreamer1.0-plugins-good gstreamer1.0-plugins-ugly \
    gstreamer1.0-tools
```

Red Hat/CentOS/Fedora:

```bash
sudo yum install -y python-gstreamer1 gstreamer1-plugins-good \
    gstreamer1-plugins-ugly
```

For Fedora replace `yum` with `dnf`.

If you're running Home Assistant in a virtual environment, you'll need to symlink the system Python's `gi` module into your virtual environment:

```bash
ln -s /path/to/your/installation/of/gi /path/to/your/venv/lib/python3.4/site-packages
```

On a Raspberry Pi, you may need to add the Home Assistant user to the `audio` group:

```bash
sudo usermod -a -G audio <ha_user>
```

## Example usage

### Using with TTS

To play TTS on your local computer (for example, if you have speakers attached to your Raspberry Pi:

```yaml
media_player:
  - platform: gstreamer

script:
  tts:
    sequence:
      - action: tts.google_say # or amazon_polly, voicerss, etc
        target:
          entity_id: media_player.gstreamer
        data:
          message: "example text-to-speech message"
```

### Using with Snapcast

To play to a named pipe for consumption by Snapcast:

```yaml
media_player:
  - platform: gstreamer
    pipeline: "audioresample ! audioconvert ! audio/x-raw,rate=48000,channels=2,format=S16LE ! wavenc ! filesink location=/tmp/snapcast_gstreamer"
```
