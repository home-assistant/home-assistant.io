---
title: progettihwsw
description: Instructions on how to integrate the ProgettiHWSW remote relay boards into Home Assistant.
ha_category:
  - DIY
  - Binary Sensor
  - Switch
ha_release: 0.114
ha_iot_class: Local Polling
ha_domain: progettihwsw
---

The `progettihwsw` integration brings the automation experience with ProgettiHWSW boards to Home Assistant.

## Binary Sensor

The `progettihwsw` binary sensor platform allows you to read input values of of a [ProgettiHWSW Board](http://www.progetti-hw-sw.it/).

The input numbers for sensors are shown on the board's enclosure and PCB.

## Switch

The `progettihwsw` switch platform allows you to control relays of a [ProgettiHWSW Board](http://www.progetti-hw-sw.it/).

For more information about the boards, visit [our website](http://www.progetti-hw-sw.it/).

## Configuration

The configuration for this integration can be done from Home Assistant interface by entering the host and port number of board in Integration config wizard.

The wizard can be accessed from Configuration --> Integrations --> (Plus sign at the bottom left).

### Troubleshooting

There are no known errors with this integration yet. Feel free to submit them to us.
