---
layout: page
title: "Remote Home-Assistant"
description: "Instructions on how to setup Remote Home-Assistant within Home Assistant."
date: 2018-04-14 08:00
sidebar: true
comments: false
sharing: true
footer: true
logo: home-assistant.png
ha_category: Other
ha_release: 0.68
ha_iot_class: depends
---

The master instance connects to the Websocket APIs of the slaves, the connection options are specified via the `host`, `port`, and `secure` configuration parameters. An API password can also be set via `api_password`.

After the connection is completed, the remote states get populated into the master instance.
The entity ids can optionally be prefixed via the `entity_prefix` parameter.

The component keeps track which objects originate from which instance. Whenever a service is called on an object, the call gets forwarded to the particular slave instance.

When the connection to the remote instance is lost, all previously published states are removed again from the local state registry.

A possible use case for this is to be able to use different Z-Wave networks, on different Z-Wave sticks (with the second one possible running on another computer in a different location).

## {% linkable_title Configuration %}

To integrate remote_homeassistant into Home Assistant, add the following section to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
remote_homeassistant:
  slaves:
  - host: localhost
    port: 8124
  - host: localhost
    port: 8125
    secure: true
    api_password: test
    entity_prefix: "slave02_"
    subscribe_events:
    - zwave.network_ready
    - zwave.node_event
```

{% configuration %}
host:
  host: Hostname or IP address of remote instance.
  required: true
  type: string
port:
  description: Port of remote instance.
  required: false
  type: int
secure:
  description: Use TLS (wss://) to connect to the remote instance.
  required: false
  type: bool
api_password:
  description: API password of the remote instance, if set.
  required: false
  type: string
entity_prefix:
  description: Prefix for all entities of the remote instance.
  required: false
  type: string
subscribe_events:
  description: Further list of events, which should be forwarded from the remote instance.
  required: false
  type: list
{% endconfiguration %}
