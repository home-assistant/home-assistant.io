---
title: "Markdown Card"
sidebar_label: Markdown
description: "Markdown card is used to render markdown"
---

Markdown card is used to render [markdown](http://commonmark.org/help/).

<p class='img'>
<img src='/images/lovelace/lovelace_markdown.png' alt='Screenshot of the markdown card'>
Screenshot of the markdown card.
</p>

{% configuration %}
type:
  required: true
  description: markdown
  type: string
content:
  required: true
  description: "Content to render as [markdown](http://commonmark.org/help/). May contain [templates](/configuration/templating/)."
  type: string
title:
  required: false
  description: The card title.
  type: string
  default: none
card_size:
  required: false
  type: integer
  default: none
  description: The algorithm for placing cards aesthetically in lovelace may have problems with the markdown card if it contains templates. You can use this value to help it estimate the height of the card in units of 50 pixels (approximately 3 lines of text in default size).
{% endconfiguration %}

## Example

```yaml
type: markdown
content: >
  ## Lovelace

  Starting with Home Assistant 0.72, we're experimenting with a new way of defining your interface. We're calling it the **Lovelace UI**.
```
