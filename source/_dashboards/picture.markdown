---
type: card
title: "Picture card"
sidebar_label: Picture
description: "The picture card allows you to set an image to use for navigation to various paths in your interface or to perform an action."
related:
  - docs: /dashboards/actions/
    title: Card actions
  - docs: /integrations/frontend/
    title: Themes
  - docs: /dashboards/cards/
    title: Dashboard cards
---

The picture card allows you to set an image to use for navigation to various paths in your interface or to perform an action.

<p class='img'>
<img src='/images/dashboards/picture.png' alt='Screenshot of the picture card'>
Screenshot of the picture card.
</p>

{% include dashboard/add_picture_to_card.md %}

## YAML configuration

The following YAML options are available when you use YAML mode or just prefer to use YAML in the code editor in the UI.

{% configuration %}
type:
  required: true
  description: "`picture`"
  type: string
image:
  required: true
  description: "The URL of an image. When you want to store images in your Home Assistant installation use the [hosting files documentation](/integrations/http/#hosting-files). After storing your files, use the `/local` path, for example, `/local/filename.jpg`."
  type: string
image_entity:
  required: false
  description: Image or person entity to display.
  type: string
alt_text:
  required: false
  description: Alternative text for the image. This is necessary for users of assistive technology. The [W3C images tutorial](https://www.w3.org/WAI/tutorials/images/) provides simple guidance for writing alternative text.
  type: string
theme:
  required: false
  description: Override the used theme for this card with any loaded theme. For more information about themes, see the [frontend documentation](/integrations/frontend/).
  type: string
tap_action:
  required: false
  description: Action taken on card tap. See [action documentation](/dashboards/actions/#tap-action).
  type: map
hold_action:
  required: false
  description: Action taken on card tap and hold. See [action documentation](/dashboards/actions/#hold-action).
  type: map
double_tap_action:
  required: false
  description: Action taken on card double tap. See [action documentation](/dashboards/actions/#double-tap-action).
  type: map
{% endconfiguration %}

### Examples

Navigate to another view:

```yaml
type: picture
image: /local/home.jpg
tap_action:
  action: navigate
  navigation_path: /lovelace/home
```

Check the [views](/dashboards/views/) setup on how to setup custom IDs.

Toggle entity using an action:

```yaml
type: picture
image: /local/light.png
tap_action:
  action: perform-action
  perform_action: light.toggle
  data:
    entity_id: light.ceiling_lights
```
