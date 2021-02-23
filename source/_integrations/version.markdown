---
title: Version
description: Instructions on how to integrate a version sensor into Home Assistant.
ha_category:
  - Utility
  - Sensor
ha_iot_class: Local Push
ha_release: 0.52
ha_quality_scale: internal
ha_codeowners:
  - '@fabaff'
  - '@ludeeus'
ha_domain: version
ha_platforms:
  - sensor
---

The `version` sensor platform that can display the current Home Assistant versions.

## Configuration

To enable this sensor, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: version
```

{% configuration %}
name:
  description: Name to use in the frontend.
  required: false
  type: string
  default: "`Current Version` in case of `source: local`, `Latest Version` otherwise."
beta:
  description: Flag to indicate that it will check for beta versions, only supported for the sources `pypi`, `hassio` and `docker`.
  required: false
  type: boolean
  default: false
image:
  description: The image you want to check against, this is only supported for `hassio` and `docker`, see full list under.
  required: false
  type: string
  default: default
source:
  description: The source you want to check against, possible values are `local`, `pypi`, `hassio`, `haio` and `docker`.
  required: false
  type: string
  default: local
{% endconfiguration %}

### Supported images for Home Assistant

`default`, `qemux86`, `qemux86-64`, `qemuarm`, `qemuarm-64`, `intel-nuc`, `raspberrypi`, `raspberrypi2`, `raspberrypi3`, `raspberrypi3-64`, `raspberrypi4`, `raspberrypi4-64`, `tinker`, `odroid-c2`, `odroid-n2`, `odroid-xu`

## Alternatives for showing local version

This sensor is an alternative to the existing solutions to achieve the same
result through various platforms.
Remember that you can easily get the installed version on the command line.

```bash
hass --version
```

Or go to the <img src='/images/screenshots/developer-tool-about-icon.png' alt='service developer tool icon' class="no-shadow" height="38" /> **Info** section of the **Developer Tools**.

A [`command_line`](/integrations/sensor.command_line/) with
[`hass`](/docs/tools/hass/) to display your current version.

```yaml
sensor:
  - platform: command_line
    name: Version
    command: "/home/homeassistant/bin/hass --version"
```

It's also possible to read a file called `.HA_VERSION` which is located in your
Home Assistant [configuration](/docs/configuration/) folder.

```yaml
sensor:
  - platform: command_line
    name: Version
    command: "cat /home/homeassistant/.homeassistant/.HA_VERSION"
```

You might think that a [`rest` sensor](/integrations/rest) could work,
too,
but it will not as Home Assistant is not ready when the sensor gets initialized.

{% raw %}

```yaml
sensor:
  - platform: rest
    resource: http://IP_ADDRESS:8123/api/config
    name: Current Version
    value_template: "{{ value_json.version }}"
```

{% endraw %}
