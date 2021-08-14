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

The `version` integration can display the current Home Assistant versions.

{% include integrations/config_flow.md %}

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
