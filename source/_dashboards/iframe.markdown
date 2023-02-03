---
type: card
title: "Webpage Card"
sidebar_label: Webpage
description: "The Webpage card allows you to embed your favorite webpage right into Home Assistant."
---

The Webpage card allows you to embed your favorite webpage right into Home Assistant. You can also embed files stored in your `<config-directory>/www` folder and reference them using `/local/<file>`.

<p class='img'>
  <img width="500" src='/images/dashboards/iframe.png' alt='Windy weather radar as Webpage'>
  Windy weather radar as Webpage.
</p>

To add the Webpage card to your user interface, click the menu (three dots at the top right of the screen) and then **Edit Dashboard**. Click the **Add Card** button in the bottom right corner and select from the card picker.

All options for this card can be configured via the user interface.

<div class='note warning'>
You can't embed sites using HTTP if you are using HTTPS for your Home Assistant.
</div>

## YAML Configuration

The following YAML options are available when you use YAML mode or just prefer to use YAML in the Code Editor in the UI.

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
  description: 'Forces the height of the image to be a ratio of the width. Valid formats: Height percentage value (`23%`) or ratio expressed with colon or "x" separator (`16:9` or `16x9`). For a ratio, the second element can be omitted and will default to "1" (`1.78` equals `1.78:1`).'
  type: string
  default: "50%"
allow_open_top_navigation:
  required: false
  description: 'Allow the user to open iframe content links by opening the default browser in the Home Assistant mobile app. It is false by default because it adds allow-top-navigation-by-user-activation on the iframe sandbox attribute which is less secure. So set it to true if you need it and are confident with the iframe content.'
  type: boolean
  default: false
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
