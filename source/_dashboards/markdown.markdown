---
type: card
title: "Markdown Card"
sidebar_label: Markdown
description: "The Markdown card is used to render Markdown"
---

The Markdown card is used to render [Markdown](https://commonmark.org/help/).

The renderer uses [Marked.js](https://marked.js.org), which supports [several specifications of Markdown](https://marked.js.org/#specifications), including CommonMark, GitHub Flavored Markdown (GFM) and `markdown.pl`.

<p class='img'>
<img src='/images/dashboards/markdown.png' alt='Screenshot of the markdown card'>
Screenshot of the Markdown card.
</p>

To add the Markdown card to your user interface, click the menu (three dots at the top right of the screen) and then **Edit Dashboard**. Click the "Add Card" button in the bottom right corner and select **Markdown** from the card picker.

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
{% endconfiguration %}

## Example

The card can also be configured using YAML, some examples below:

```yaml
type: markdown
content: >
  ## Dashboards

  Starting with Home Assistant 0.72, we're experimenting with a new way of defining your interface.
```

## Template variables

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

## Icons

You can use [materialdesignicons.com](https://materialdesignicons.com/) icons in the `content` of the card.

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
