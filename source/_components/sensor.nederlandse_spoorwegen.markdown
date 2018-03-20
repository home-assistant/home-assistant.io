---
layout: page
title: "Nederlandse Spoorwegen"
description: "Instructions how to integrate timetable data for travelling by train in the Netherlands within Home Assistant."
date: 2017-10-25 13:35
sidebar: true
comments: false
sharing: true
footer: true
logo: nederlandse_spoorwegen.png
ha_category: Transport
ha_iot_class: "Cloud Polling"
ha_release: "0.57"
---


This sensor will provide you with time table information of the [Nederlandse Spoorwegen](https://www.ns.nl/) train service in the Netherlands.

You must create an application [here](https://www.ns.nl/ews-aanvraagformulier/) to obtain a `password`.

Add the data to your `configuration.yaml` file as shown in the example:

```yaml
# Example configuration.yaml entry
sensor:
- platform: nederlandse_spoorwegen
    email: you@example.com
    password: !secret ns_password
    routes:
      - name: Rotterdam-Amsterdam
        from: Rtd
        to: Asd
      - name: Groningen-Zwolle-Maastricht
        from: Gn
        to: Mt
        via: Zl
```

Configuration variables:

- **email** (*Required*): The email address you used to request the API password.
- **password** (*Required*): The API password provided by the Nederlandse Spoorwegen.
- **routes** array (*Required*): List of travelling routes.
  - **name** (*Required*): Name of the route.
  - **from** (*Required*): The start station.
  - **to** (*Required*): Direction of the travelling.
  - **via** (*Optional*): Optional other station you wish to visit in between.

The data are coming from [Nederlandse Spoorwegen](https://www.ns.nl/).

Station codes must be used and can be looked up [here](https://nl.wikipedia.org/wiki/Lijst_van_spoorwegstations_in_Nederland).
