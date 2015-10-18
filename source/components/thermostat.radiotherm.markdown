---
layout: page
title: "Radiotherm thermostat support"
description: "Instructions how to integrate Radiotherm thermostats within Home Assistant."
date: 2015-10-18 17:15
sidebar: false
comments: false
sharing: true
footer: true
---

<img src='/images/supported_brands/radiotherm.png' class='brand pull-right' />
The nest thermostat platform let you control a thermostat from [Radio Thermostat](http://www.radiothermostat.com/).

The underlaying library supports:
- CT50 V1.09
- CT50 V1.88
- CT50 V1.94 (also known as Filtrete 3M50)
- CT80 Rev B2 V1.03

To set it up, add the following information to your `configuration.yaml` file:

```yaml
thermostat:
  platform: radiotherm
  host: USERNAME
  password: PASSWORD
```

Configuration variables:

- **host** (*Required*): Your Radiotherm thermostat.

