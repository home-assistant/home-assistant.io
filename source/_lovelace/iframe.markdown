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

| Name         | Required | Description        | Type   | Default |
| ------------ | -------- | ------------------ | ------ | ------- |
| type         | true     | `iframe`           | string | none    |
| url          | true     | Website URL        | string | none    |
| aspect_ratio | false    | Height-width-ratio | string | "50%"   |
| title        | false    | The card title     | string | none    |

### Examples

```yaml
type: iframe
url: https://grafana.localhost/d/000000027/worldping-endpoint-summary?var-probe=All&panelId=2&fullscreen&orgId=3&theme=light
aspect_ratio: 75%
```
