---
layout: page
title: "Viaggiatreno"
description: "Check Italian public train delays from Viaggiatreno"
date: 2016-10-25 16:40
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Transport
logo: db.png
ha_iot_class: "Cloud Polling"
ha_release: 0.31
---

The `viaggiatreno` sensor can be used to check specific train delay at certain stop. It needs the
train number as well as the station name (as displayed in http://viaggiatreno.it)

To enable this sensor, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: viaggiatreno
    station_name: ROMA TERMINI
    train_no: 34028
```

Configuration variables:

- **station_name** (*Required*): The name of the station where delay is calculated.
- **train_no** (*Required*): Train number as displayed in http://viaggiatreno.it
- **origin_station** (*Optional*): Departure station ID (if not provided can be calculated)

The sensor provides (at the moment) just the delay expressed in minutes. If the specified train
has already passed the station it returns None

The data is coming from the [Viaggiatreno.it](http://viaggiatreno.it) website.
