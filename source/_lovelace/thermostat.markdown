---
layout: page
title: "Thermostat Card"
sidebar_label: Thermostat
description: "The thermostat card allows you to control a climate entity."
date: 2018-10-25 10:28 +00:00
sidebar: true
comments: false
sharing: true
footer: true
---

The thermostat card gives control of your climate entity.

<p class='img'>
  <img src='/images/lovelace/lovelace_thermostat_card.gif' alt='Screenshot of the thermostat card'>
  Screenshot of the thermostat card.
</p>

{% configuration %}
type:
  required: true
  description: thermostat
  type: string
entity:
  required: true
  description: Entity id of `climate` domain
  type: string
title:
  required: false
  description: Title of Card
  type: string
{% endconfiguration %}

## {% linkable_title Example %}

```yaml
- type: sensor
  entity: climate.nest
```
