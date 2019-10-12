---
title: "Nederlandse Spoorwegen"
description: "Instructions on how to integrate timetable data for traveling by train in the Netherlands within Home Assistant."
logo: nederlandse_spoorwegen.png
ha_category:
  - Transport
ha_iot_class: Cloud Polling
ha_release: 0.57
---

<div class='note warning'>

  Since October 1, 2019, this integration no longer works due to changes in the NS API. [Work is being done](https://github.com/aquatix/ns-api/pull/17) on a solution, but this can still take several releases before it works again.

</div>

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

{% configuration %}
email:
  description: The email address you used to request the API password.
  required: true
  type: string
password:
  description: The API password provided by the Nederlandse Spoorwegen.
  required: true
  type: string
routes:
  description: List of traveling routes.
  required: false
  type: list
  keys:
    name:
      description: Name of the route.
      required: true
      type: string
    from:
      description: The start station.
      required: true
      type: string
    to:
      description: Direction of the traveling.
      required: true
      type: string
    via:
      description: Optional other station you wish to visit in between.
      required: false
      type: string
{% endconfiguration %}

The data are coming from [Nederlandse Spoorwegen](https://www.ns.nl/).

Station codes must be used and can be looked up [here](https://nl.wikipedia.org/wiki/Lijst_van_spoorwegstations_in_Nederland).
