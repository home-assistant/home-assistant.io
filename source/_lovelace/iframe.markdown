---
title: "Webpage Card"
sidebar_label: Webpage
description: "The Webpage card allows you to embed your favorite webpage right into Home Assistant."
---

The Webpage card allows you to embed your favorite webpage right into Home Assistant. You can also embed files stored in your `<config-directory>/www` folder and reference them using `/local/<file>`.

<div class='note warning'>
You can't embed sites using HTTP if you are using HTTPS for your Home Assistant.
</div>

<p class='img'>
  <img width="500" src='/images/lovelace/lovelace_iframe.png' alt='Windy weather radar as Webpage'>
  Windy weather radar as Webpage.
</p>

To add the Webpage card to your user interface, click the Lovelace menu (three dots at the top right of the screen) and then **Edit Dashboard**. Click the "Add Card" button in the bottom right corner and select **Webpage** from the card picker. All options for this card can be configured via the user interface.

{% configuration %}
type:
  required: true
  description: "`iframe`"
  type: string
url:
  required: true
  description: Website URL.
  type: string
aspect_ratio:
  required: false
  description: Height to width ratio.
  type: string
  default: "50%"
title:
  required: false
  description: The card title.
  type: string
{% endconfiguration %}

## Examples

The card can also be configured using YAML, some examples below:

```yaml
type: iframe
url: https://grafana.localhost/d/000000027/worldping-endpoint-summary?var-probe=All&panelId=2&fullscreen&orgId=3&theme=light
aspect_ratio: 75%
```
