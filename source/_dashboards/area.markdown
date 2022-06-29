---
type: card
title: "Area Card"
sidebar_label: Area
description: "The Area card gives control of your entities in a specified area."
---

The Area card lets you control and monitor an individual area.

<p class='img'>
  <img src='/images/dashboards/area-card.png' alt='Screenshot of the Area card'>
  Screenshot of the Area card.
</p>


To add the Area card to your user interface, click the menu (three dots at the top right of the screen) and then **Edit Dashboard**. Click the "Add Card" button in the bottom right corner and select **Area** from the card picker. All options for this card can be configured via the user interface.

Buttons will appear on the card for the entities in the area including fan, light and switch. A motion sensor icon will appear in the top left if a motion sensor is in the area and motion is detected by the motion sensor.

If a camera is added to the area you can show the camera feed instead of the area picture.

{% configuration %}
type:
  required: true
  description: "`area`"
  type: string
area:
  required: true
  description: ID of the `area`.
  type: string
show_camera: 
  required: false
  description: Changes the area picture to a live feed of the camera set for the area.
  type: boolean
  default: false
navigation_path:
  required: false
  description: link to view. For more information about views, see the [view documentation](/dashboards/views/)
  type: string
theme:
  required: false
  description: Override the used theme for this card with any loaded theme. For more information about themes, see the [frontend documentation](/integrations/frontend/).
  type: string
{% endconfiguration %}

## Example

Alternatively, the card can be configured using YAML:

Basic example:

```yaml
- type: area
  area: bedroom
```

Complex example

```yaml
- type: area
  area: bedroom
  navigation_path: my_bedroom
  show_camera: true
  theme: green
```
