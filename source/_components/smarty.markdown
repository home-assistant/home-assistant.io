---
layout: page
title: "Salda Smarty 2X/3X/4X P/V Ventilation"
description: "Instructions on how to integrate Salda Smarty 2X/3X/4X P/V ventilation systems into Home Assistant."
date: 2018-08-26 20:00
sidebar: true
comments: false
sharing: true
footer: true
logo: salda.png
ha_category: Hub
ha_release: "0.77"
---

The `smarty` component lets you control Salda [Smarty](http://www.salda.lt/en/products/category/compact-counter-flow-units) ventilation units from Home Assistant. You need a [MB-GATEWAY](http://www.salda.lt/en/products/item/5637227077) or something similar to connect to your local network.

The component has a fan platform to view and control the ventilation speed, and a sensors platform to read:
- Outdoor air temperature
- Extract air temperature
- Supply air temperature
- Extract fan speed rpm
- Supply fan speed rpm

<p class='note'>
You must have [Modbus component](/components/modbus/) configured to use this component.
</p>

## {% linkable_title Configuration %}

To set it up, add the following information to your `configuration.yaml` file:

```yaml
smarty:
  name: Smarty 3X
  slave: 1
```

Configuration variables:

- **name** (*Optional*): The name of this device as you want to see it in Home Assistant.
- **slave** (*Required*): The modbus slave id.
