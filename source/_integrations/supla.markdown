---
title: SUPLA
description: Instructions for integration with SUPLA-CLOUD's Web API
ha_release: 0.92
ha_category:
  - Cover
  - Hub
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@mwegrzynek'
ha_domain: supla
ha_platforms:
  - cover
  - switch
ha_integration_type: integration
ha_quality_scale: legacy
---

The SUPLA integration allows you to use [SUPLA](https://supla.org/) devices in Home Assistant.

SUPLA-DEV is an open source home automation system for Raspberry Pi, Arduino or ESP8266-based devices. It has its own protocols, firmware and commercially available devices, such as those produced by [Zamel](https://supla.zamel.com/en/).

Currently, only covers (shutters in SUPLA's terminology), gates, garage doors, and switches are supported, but thanks to comprehensive and universal REST API, it's pretty easy to add more.

Right now, it's impossible to add a device -- all of them are discovered from SUPLA-CLOUD's servers or yours.

For more complete Home Assistant support based on MQTT autodiscovery, consider switching your Supla devices to MQTT (through the setup interface). Or use the MQTT broker provided by [Supla Cloud](https://cloud.supla.org/integrations/mqtt-broker).

{% important %}

The Supla Cloud MQTT broker requires [changing the default MQTT protocol setting](https://www.home-assistant.io/integrations/mqtt/#broker-configuration) at version 3.1.

{% endimportant %}

## Configuration

To use SUPLA devices in your installation, add the following to your {% term "`configuration.yaml`" %}:

```yaml
supla:
  servers:
    - server: "svr1.supla.org"
      access_token: "YOUR_ACCESS_TOKEN"
```

{% configuration %}
servers:
  description: List of server configurations.
  requires: true
  type: list
  keys:
    server:
      description: Address of the SUPLA-CLOUD server (either IP address or DNS name); can either be the [cloud hosted](https://cloud.supla.org) instance, or a [self hosted](https://github.com/SUPLA/supla-cloud) instance.
      required: true
      type: string
    access_token:
      description: An access token for REST API configuration. Under **Scopes** > **Channels**, at least the **Read** and **Action execution** permissions are required to be enabled. A token can be obtained from the Security section of SUPLA-CLOUD for [Personal Access Token](https://cloud.supla.org/security/personal-access-tokens) page, or from your own self hosted instance.
      required: true
      type: string
{% endconfiguration %}
