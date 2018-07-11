---
layout: page
title: "iFrame Card"
sidebar_label: iFrame
description: "Iframe cards are useful to embed outside websites in your dashboard with little effort. One such example is a Grafana view."
date: 2018-07-01 10:28 +00:00
sidebar: true
comments: false
sharing: true
footer: true
---

Iframe cards are useful to embed outside websites in your dashboard with little effort. One such example is a Grafana view. You can also embed files stored in your `config/www` folder and reference them using `/local/<file>`.

<p class='img'>
<img width="500" src='/images/lovelace/lovelace_iframe.png' alt='Screenshot of the iframe card'>
Screenshot of the iframe card.
</p>

Make sure the URL you're embedding has the right protocol and allows to be embedded in an iframe on a different domain. For example, if your Home Assistant setup uses HTTPS, you won't be able to embed HTTP URLs.

## {% linkable_title Options %}

Create a new file `<config>/ui-lovelace.yaml` and add the following content. Adjust the entity names to entities that exist in your Home Assistant installation.

{% configuration %}
type:
  required: true
  description: iframe
  type: string
url:
  required: true
  description: The iframe source URL.
  type: string
aspect_ratio:
  required: false
  description: The iframe height-width-ratio.
  type: string
  default: "50%"
title:
  required: false
  description: The card title.
  type: string
  default: none
{% endconfiguration %}

**Reminder**: You can't mix HTTPS and HTTP content. So if your Home Assistant instance is accessed through HTTPS, you won't be able to display HTTP content in the iframe card.

## {% linkable_title Examples %}

```yaml
  - type: iframe
    url: https://worldpingdemo.grafana.net/d/000000027/worldping-endpoint-summary?var-endpoint=www_amazon_com&var-probe=All&panelId=2&fullscreen&orgId=3&theme=light
    aspect_ratio: 100%
```

Local HTML for custom content. Place `example.html` in your `config/www` folder and reference it as below:

```yaml
- type: iframe
  url: /local/example.html
  title: Sample local file
```
