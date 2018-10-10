---
layout: page
title: "Mochad"
description: "Instructions on how to integrate Mochad into Home Assistant."
date: 2016-10-20 17:09
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Hub
ha_release: 0.32
---

The `mochad` component is the main component to integrate all X10 platforms being controlled by [mochad](https://sourceforge.net/projects/mochad/). Besides this component you will have to setup your X10 devices separately.

## {% linkable_title Configuration %}

To integrate your Mochad units with Home Assistant, add the following section to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
mochad:
```

{% configuration %}
host:
  description: The host that mochad is running on.
  required: false
  type: string
  default: localhost
port:
  description: The port that mochad is running on.
  required: false
  type: integer
  default: 1099
{% endconfiguration %}

## {% linkable_title Example %}

A full configuration sample could look like the one below:

```yaml
# Example configuration.yaml entry
mochad:
  host: localhost
  port: 1099
```
