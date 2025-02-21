---
type: card
title: "Markdown card"
sidebar_label: Markdown
description: "The Markdown card is used to render Markdown"
related:
  - docs: /integrations/frontend/
    title: Themes
  - docs: /dashboards/cards/
    title: Dashboard cards
---

The Markdown card is used to render [Markdown](https://commonmark.org/help/).

<p class='img'>
<img src='/images/dashboards/markdown.png' alt='Screenshot of the markdown card'>
Screenshot of the Markdown card.
</p>

The renderer uses [Marked.js](https://marked.js.org), which supports [several specifications of Markdown](https://marked.js.org/#specifications), including CommonMark, GitHub Flavored Markdown (GFM) and `markdown.pl`.

{% include dashboard/edit_dashboard.md %}

## YAML configuration

The following YAML options are available when you use YAML mode or just prefer to use YAML in the code editor in the UI.

{% configuration %}
type:
  required: true
  description: "`markdown`"
  type: string
content:
  required: true
  description: "Content to render as [Markdown](https://commonmark.org/help/). May contain [templates](/docs/configuration/templating/)."
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
  description: The algorithm for placing cards aesthetically may have problems with the Markdown card if it contains templates. You can use this value to help it estimate the height of the card in units of 50 pixels (approximately 3 lines of text in default size). (e.g., `4`)
entity_id:
  required: false
  type: [string, list]
  default: none
  description: "A list of entity IDs so a template in `content:` only reacts to the state changes of these entities. This can be used if the automatic analysis fails to find all relevant entities."
theme:
  required: false
  description: Override the used theme for this card with any loaded theme. For more information about themes, see the [frontend documentation](/integrations/frontend/).
  type: string
show_empty:
  required: false
  description: By default, an empty card will still be shown (resulting in a small empty box). Setting this to `false` hides that empty card instead.
  default: true
  type: boolean
text_only:
  required: false
  description: Display the card without border, background, padding and title. 
  default: false
  type: boolean
{% endconfiguration %}

### Example

```yaml
type: markdown
content: >
  ## Dashboards

  Starting with Home Assistant 0.72, we're experimenting with a new way of defining your interface.
```

### Template variables

A special template variable - `config` is set up for the `content` of the card. It contains the configuration of the card.

For example:

{% raw %}

```yaml
type: entity-filter
entities:
  - light.bed_light
  - light.ceiling_lights
  - light.kitchen_lights
state_filter:
  - 'on'
card:
  type: markdown
  content: |
    The lights that are on are:
    {% for l in config.entities %}
      - {{ l.entity }}
    {%- endfor %}

    And the door is {% if is_state('binary_sensor.door', 'on') %} open {% else %} closed {% endif %}.
```

{% endraw %}

A special template variable - `user` is set up for the `content` of the card. It contains the currently logged in user.

For example:

{% raw %}

```yaml
type: markdown
content: |
  Hello, {{user}}
```

{% endraw %}

### Icons

You can use [Material Design Icons](https://pictogrammers.com/library/mdi/) icons in the `content` of the card.

For example:

{% raw %}

```yaml
type: markdown
content: |
  <ha-icon icon="mdi:home-assistant"></ha-icon>
```

{% endraw %}

## ha-alert

You can also use our [\`ha-alert\`](https://design.home-assistant.io/#components/ha-alert) component in the Markdown card.

Example:

<p class='img'>
<img src='/images/dashboards/markdown_ha-alert.png' alt='Screenshot of the ha-alert elements in a markdown card'>
Screenshot of the ha-alert elements in a markdown card.
</p>

```yaml
type: markdown
content: |
  <ha-alert alert-type="error">This is an error alert — check it out!</ha-alert>
  <ha-alert alert-type="warning">This is a warning alert — check it out!</ha-alert>
  <ha-alert alert-type="info">This is an info alert — check it out!</ha-alert>
  <ha-alert alert-type="success">This is a success alert — check it out!</ha-alert>
  <ha-alert title="Test alert">This is an alert with a title</ha-alert>
```

## ha-qr-code

You can also create QR-Codes in the Markdown card.

<p class='img'>
<img src='/images/dashboards/markdown_card_qr_code.png' alt='Screenshot of the markdown card with QR codes'>
Screenshot of the Markdown card with QR codes.
</p>

Available parameters:

- data: The actual data to encode in the QR-Code
- scale: A scale factor for the QR code, default is 4
- width: Width of the QR code in pixels
- margin: A margin around the QR code
- error-correction-level: low; medium; quartile; high
- center-image: An image to place on top of the qr code (might need a higher error-correction-level)

```yaml
type: markdown
content: >-
  <ha-qr-code data='hallo' width="180"></ha-qr-code>

  <ha-qr-code data='hallo' scale="6" margin="0"
  center-image="/static/icons/favicon-192x192.png"></ha-qr-code>

  <ha-qr-code data='hallo' error-correction-level="quartile" scale="6"
  center-image="https://brands.home-assistant.io/_/tuya/icon@2x.png"></ha-qr-code>
```
