---
title: Supla
description: Instructions for integration with Supla Cloud's Web API
ha_release: 0.92
ha_category:
  - Hub
  - Cover
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@mwegrzynek'
ha_domain: supla
ha_platforms:
  - cover
  - switch
---

The [Supla](https://supla.org/) is an Open Source home automation system for ESP8266 based devices. It has its own set of protocols, its own firmware and commercially available devices (produced for example by [Zamel](https://zamel.pl/pl-PL/produkty/supla-sterowanie-wi-fi))

Currently only covers (shutters in Supla's lingo), gates and switches are supported, but, thanks to comprehensive and universal REST API, it's pretty easy to add more.

Right now it's impossible to add a device -- all of them are discovered from Supla Cloud's servers or yours.
Devices disabled on Supla Cloud will not be loaded into Home Assistant.

## Configuration

To use Supla devices in your installation, add the following to your `configuration.yaml`:

```yaml
supla:
  servers:
    - server: svr1.supla.org
      access_token: YOUR_ACCESS_TOKEN
```

{% configuration %}
servers:
  description: List of server configurations.
  requires: true
  type: list
  keys:
    server:
      description: Address of your Supla Cloud server (either IP or DNS name)
      required: true
      type: string
    access_token:
      description: An access token for REST API configuration. Can be acquired from `http[s]://your.server.org/integrations/tokens` (please add at least Channel's Read and Action Execution permissions).
      required: true
      type: string
{% endconfiguration %}
