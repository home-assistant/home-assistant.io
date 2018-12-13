---
layout: page
title: "Light Card"
sidebar_label: Light
description: "The Light card allows you to change the brightness of the light."
date: 2018-10-29 10:28 +00:00
sidebar: true
comments: false
sharing: true
footer: true
---

The Light card allows you to change the brightness of the light.
Note: Long-press on the bulb to bring up the `more-info` dialog.

<p class='img'>
<img src='/images/lovelace/lovelace_light_card.png' alt='Screenshot of the Light card'>
Screenshot of the Light card.
</p>

```yaml
- type: light
  entity: light.bedroom
- type: light
  entity: light.office
```

{% configuration %}
type:
  required: true
  description: light
  type: string
entity:
  required: true
  description: Home Assistant Light Domain entity ID.
  type: string
name:
  required: false
  description: Overwrites friendly name.
  type: string
  default: Name of Entity
{% endconfiguration %}

## {% linkable_title Examples %}

Overwriting names example:

```yaml
- type: light
  entity: light.bedroom
  name: Kids Bedroom
- type: light
  entity: light.office
  name: My Office
```

<p class='img'>
<img src='/images/lovelace/lovelace_light_complex_card.png' alt='Screenshot of the Light card'>
Screenshot of the Light card names.
</p>
