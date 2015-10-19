---
layout: page
title: "MySensors sensors support"
description: "Instructions how to integrate MySensors sensors into Home Assistant."
date: 2015-05-14 21:57
sidebar: false
comments: false
sharing: true
footer: true
---

<img src='/images/supported_brands/mysensors.png' class='brand pull-right' />
The [MySensors](https://www.mysensors.org) project combines Arduino boards with NRF24L01 radio boards to build sensor networks.

Integrate your Serial MYSensors Gateway by adding the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  platform: mysensors
  port: /dev/ttyACM0
```

Configuration variables:

- **port** (*Required*): The port where your board is connected to your Home Assistant host. If you are using an original Arduino the port will be named `ttyACM*`. The exact number can be determined with `ls /dev/ttyACM*`.

```bash
ls /dev/ttyACM*
```
