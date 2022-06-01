---
type: card
title: "Plant Status Card"
sidebar_label: Plant Status
description: "The Plant Status card is for all the lovely botanists out there."
---

The Plant Status card is for all the lovely botanists out there.

<p class='img'>
<img src='/images/dashboards/lovelace_plant_card.png' alt='Screenshot of the plant status card'>
Screenshot of the plant status card.
</p>

To add the Plant Status card to your user interface, click the menu (three dots at the top right of the screen) and then **Edit Dashboard**. Click the **Add Card** button in the bottom right corner and select from the card picker.

All options for this card can be configured via the user interface.

## YAML Configuration

The following YAML options are available when you use YAML mode or just prefer to use YAML in the Code Editor in the UI.

{% configuration %}
type:
  required: true
  description: "`plant-status`"
  type: string
entity:
  required: true
  description: Entity ID of `plant` domain.
  type: string
name:
  required: false
  description: Overwrites friendly name.
  type: string
  default: Entity name
theme:
  required: false
  description: Override the used theme for this card with any loaded theme. For more information about themes, see the [frontend documentation](/integrations/frontend/).
  type: string
{% endconfiguration %}

### Example

Basic example:

```yaml
type: plant-status
entity: plant.bonsai
```
