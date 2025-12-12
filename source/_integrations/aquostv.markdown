---
title: Sharp Aquos TV
description: Instructions on how to integrate a Sharp Aquos TV into Home Assistant.
ha_category:
  - Media player
ha_release: 0.35
ha_iot_class: Local Polling
ha_domain: aquostv
ha_platforms:
  - media_player
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The `aquostv` platform allows you to control a [Sharp Aquos TV](https://global.sharp/aquos/index.html).

When the TV is first connected, you will need to accept Home Assistant on the TV to allow communication.

## Configuration

To add a TV to your installation, add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
media_player:
  - platform: aquostv
    host: 192.168.0.10
```

{% configuration %}
host:
  description: The IP/Hostname of the Sharp Aquos TV, e.g., `192.168.0.10`.
  required: true
  type: string
port:
  description: The port of the Sharp Aquos TV.
  required: false
  default: 10002
  type: integer
username:
  description: The username of the Sharp Aquos TV.
  required: false
  default: admin
  type: string
password:
  description: The password of the Sharp Aquos TV.
  required: false
  default: password
  type: string
name:
  description: The name you would like to give to the Sharp Aquos TV.
  required: false
  type: string
power_on_enabled:
  description: If you want to be able to turn on your TV.
  required: false
  default: false
  type: boolean
{% endconfiguration %}

{% important %}
When you set **power_on_enabled** as True, you have to turn on your TV on the first time with the remote.
Then you will be able to turn on with Home Assistant.
Also, with **power_on_enabled** as True, the Aquos logo on your TV will stay on when you turn off the TV and your TV could consume more power.
{% endimportant %}

## Currently known supported models

- LC-40LE830U
- LC-40CFE6242E (no volume control, not fully tested but able to poll state)
- LC-46LE830U
- LC-52LE830U
- LC-60LE830U
- LC-60LE635 (no volume control)
- LC-52LE925UN
- LC-60LE925UN
- LC-60LE857U
- LC-60EQ10U
- LC-60SQ15U
- LC-50US40 (no volume control, not fully tested)
- LC-70LE650U
- LC-70LE747E (no volume control)
- LC-60LE650U
- LC-80LE632U

If your model is not on the list, give it a test. If everything works correctly, then add it to the list on [GitHub](https://github.com/home-assistant/home-assistant.io/blob/current/source/_integrations/aquostv.markdown).
