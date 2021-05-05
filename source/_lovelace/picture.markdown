---
title: "Picture Card"
sidebar_label: Picture
description: "The Picture card allows you to set an image to use for navigation to various paths in your interface or to call a service."
---

The Picture card allows you to set an image to use for navigation to various paths in your interface or to call a service.

<p class='img'>
<img src='/images/lovelace/lovelace_picture.png' alt='Screenshot of the picture card'>
Screenshot of the picture card.
</p>

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
  description: Action taken on card tap. See [action documentation](/lovelace/actions/#tap-action).
  type: map
hold_action:
  required: false
  description: Action taken on card tap and hold. See [action documentation](/lovelace/actions/#hold-action).
  type: map
double_tap_action:
  required: false
  description: Action taken on card double tap. See [action documentation](/lovelace/actions/#double-tap-action).
  type: map
{% endconfiguration %}

## Options For Exemptions

{% configuration badges %}
user:
  required: true
  description: User ID that can see the view tab.
  type: string
{% endconfiguration %}

## Examples

Navigate to another view:

```yaml
type: picture
image: /local/home.jpg
tap_action:
  action: navigate
  navigation_path: /lovelace/home
```

Check the [views](/lovelace/views/) setup on how to setup custom IDs.

Toggle entity using a service:

```yaml
type: picture
image: /local/light.png
tap_action:
  action: call-service
  service: light.toggle
  service_data:
    entity_id: light.ceiling_lights
```
