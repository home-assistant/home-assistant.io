---
title: "Iframe Card"
sidebar_label: Iframe
description: "Embed data from other webservices in your dashboard."
---

Embed data from other webservices in your dashboard. You can also embed files stored in your `<config-directory>/www` folder and reference them using `/local/<file>`.

<div class='note warning'>
You can't embed sites using HTTP if you are using HTTPS for your Home Assistant.
</div>

<p class='img'>
  <img width="500" src='/images/lovelace/lovelace_iframe.png' alt='Windy weather radar as iframe'>
  Windy weather radar as iframe.
</p>

{% configuration %}
type:
  required: true
  description: iframe
  type: string
url:
  required: true
  description: Website URL.
  type: string
aspect_ratio:
  required: false
  description: Height-width-ratio.
  type: string
  default: "50%"
title:
  required: false
  description: The card title.
  type: string
{% endconfiguration %}

### Examples

```yaml
type: iframe
url: https://grafana.localhost/d/000000027/worldping-endpoint-summary?var-probe=All&panelId=2&fullscreen&orgId=3&theme=light
aspect_ratio: 75%
```
