---
title: Linode
description: Instructions on how to set up Linode within Home Assistant.
ha_category:
  - Binary sensor
  - Switch
  - System monitor
ha_release: 0.57
ha_iot_class: Cloud Polling
ha_domain: linode
ha_platforms:
  - binary_sensor
  - switch
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The `linode` {% term integration %} allows you to access the information about your [Linode](https://linode.com) systems from Home Assistant.

There is currently support for the following device types within Home Assistant:

- [Binary sensor](#binary-sensor)
- [Switch](#switch)

## Setup

Obtain your oAuth2 Access Token from Linode account.

- <https://cloud.linode.com>
- Log in
- Select API Tokens
- Create a Personal Access Token,
- Assigned scope (Please choose the least possible access required.)

## Configuration

To integrate Linode with Home Assistant, add the following section to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
linode:
  access_token: YOUR_ACCESS_TOKEN
```

{% configuration %}
  access_token:
    description: The Linode access token.
    required: true
    type: string
{% endconfiguration %}

## Binary sensor

The `linode` binary sensor platform allows you to monitor your Linode nodes.

Add the following to your {% term "`configuration.yaml`" %} file:

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: linode
    nodes:
      - 'myvpsname'
```

{% configuration %}
nodes:
  description:  List of VPSs you want to control.
  required: true
  type: string
{% endconfiguration %}

## Switch

The `linode` switch platform allows you to turn your Linode nodes on and off.

Add the following to your {% term "`configuration.yaml`" %} file:

```yaml
# Example configuration.yaml entry
switch:
  - platform: linode
    nodes:
      - 'myvpsname'
```

{% configuration linode %}
  nodes:
    description:  List of VPSs you want to control.
    required: true
    type: string
{% endconfiguration %}
