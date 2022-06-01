---
type: card
title: "Picture Card"
sidebar_label: Picture
description: "The Picture card allows you to set an image to use for navigation to various paths in your interface or to call a service."
---

The Picture card allows you to set an image to use for navigation to various paths in your interface or to call a service.

<p class='img'>
<img src='/images/dashboards/lovelace_picture.png' alt='Screenshot of the picture card'>
Screenshot of the picture card.
</p>

To add the Picture card to your user interface, click the menu (three dots at the top right of the screen) and then **Edit Dashboard**. Click the **Add Card** button in the bottom right corner and select from the card picker.

## YAML Configuration

The following YAML options are available when you use YAML mode or just prefer to use YAML in the Code Editor in the UI.

{% configuration %}
type:
  required: true
  description: "`picture`"
  type: string
image:
  required: true
  description: "The URL of an image. When you want to store images in your Home Assistant installation use the [hosting files documentation](/integrations/http/#hosting-files). After storing your files, use the `/local` path, for example, `/local/filename.jpg`."
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

Toggle entity using a service:

```yaml
type: picture
image: /local/light.png
tap_action:
  action: call-service
  service: light.toggle
  data:
    entity_id: light.ceiling_lights
```
