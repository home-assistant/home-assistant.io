---
layout: page
title: "Markdown Card"
sidebar_label: Markdown
description: "Markdown card is used to render markdown"
date: 2018-07-01 10:28 +00:00
sidebar: true
comments: false
sharing: true
footer: true
---

### Markdown
Markdown card is used to render [markdown](http://commonmark.org/help/)

<p class='img'>
<img src='/images/lovelace/lovelace_markdown.png' alt='Screenshot of the markdown card'>
Screenshot of the markdown card.
</p>

**Options**

| Name | Type | Default | Description
| ---- | ---- | ------- | -----------
| type | string | **Required** | `markdown`
| content | string | **Required** | Content to render as [markdown](http://commonmark.org/help/).
| title | string | Optional | Card title

**Example**

```yaml
- type: markdown
  content: >
    ## Lovelace

    Starting with Home Assistant 0.72, we're experimenting with a new way of defining your interface. We're calling it the **Lovelace UI**.
``
