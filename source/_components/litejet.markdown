---
layout: page
title: "LiteJet"
description: "Instructions how to setup the LiteJet hub within Home Assistant."
date: 2015-10-26 09:37
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Hub
ha_iot_class: "Local Polling"
ha_release: 0.32
---

LiteJet is a centralized lighting system that predates most home automation technology. All lights and wall switches are wired to a central panel. This central panel has a serial port interface that allows a computer to control the system via LiteJet's third party protocol.

Home Assistant integrates the LiteJet 3rd party protocol and allows you to get the status and control the connected lights.

After connecting the LiteJet's RS232-2 port to your computer, add the following to your `configuration.yaml`:

```yaml
litejet:
  port: /dev/serial/by-id/THE-PATH-OF-YOUR-SERIAL-PORT
```

Your LiteJet MCP should be configured for 19.2 K baud, 8 data bits, 1 stop bit, no parity, and to transmit a 'CR' after each response. These settings can be configured using the [LiteJet programming software](https://www.centralite.com/helpdesk/knowledgebase.php?article=735).

You can also configure the Home Assistant to ignore lights, scenes, and switches via their name. This is highly recommended since LiteJet has a fixed number of each of these and with most systems many will be unused.

```yaml
litejet:
```

Configuration variables:

- **port** (*Required*): The path to the serial port connected to the LiteJet.
- **exclude_names** (*Optional*): A list of light or switch names that should be ignored.
- **include_switches** (*Optional*): Cause entities to be created for all the LiteJet switches. Default is `false`. This can be useful when debugging your lighting as you can press/release switches remotely.



```yaml
litejet:
  exclude_names:
  - 'Button #'
  - 'Scene #'
  - 'Timed Scene #'
  - 'Timed Scene#'
  - 'LV Rel #'
  - 'Fan #'
```
