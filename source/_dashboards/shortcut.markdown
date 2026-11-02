---
type: card
title: "Shortcut card"
sidebar_label: Shortcut
description: "The shortcut card gives you a quick way to trigger an action from your dashboard, such as navigating to a page, opening a URL, launching the voice assistant, or performing an action."
related:
  - docs: /dashboards/actions/
    title: Card actions
  - docs: /dashboards/tile/
    title: Tile card
  - docs: /dashboards/cards/
    title: Dashboard cards
---

The shortcut card gives you a quick way to trigger an action from your dashboard. You can use it to navigate to another page, open a URL, launch the voice assistant, or perform an action. It renders as a tile, so it fits nicely alongside other tile cards on your dashboard.

The label, icon, and color are automatically resolved from the action you configure. For example, if you navigate to a dashboard view, the shortcut picks up the view's title and icon. You can override any of these values if you want something different.

{% include dashboard/edit_dashboard.md %}

## Card settings

Most options can be configured in the UI.

{% configuration_basic %}
Label:
  description: The text displayed on the card. If left empty, the label is resolved automatically from the action. For example, the view title for a navigation action, or **Assist** for an assist action.
Description:
  description: An optional secondary line displayed under the label.
Icon:
  description: The icon displayed on the card. If left empty, the icon is resolved automatically from the action.
Color:
  description: The color of the icon and background accent. Accepts a [color token](#available-colors) or a hex color code. Defaults to the primary color of your theme.
Vertical:
  description: Displays the icon above the label instead of next to it.
Tap action:
  description: The action taken when the card is tapped. For more information, see the [action documentation](/dashboards/actions/#tap-action).
Hold action:
  description: The action taken when the card is tapped and held. For more information, see the [action documentation](/dashboards/actions/#hold-action).
Double tap action:
  description: The action taken when the card is double-tapped. For more information, see the [action documentation](/dashboards/actions/#double-tap-action).
{% endconfiguration_basic %}

## YAML configuration

The following YAML options are available when you use YAML mode or prefer to use YAML in the code editor in the UI.

{% configuration %}
type:
  required: true
  description: "`shortcut`"
  type: string
label:
  required: false
  description: The text displayed on the card. If not set, the label is resolved automatically from the configured `tap_action`.
  type: string
description:
  required: false
  description: An optional secondary line displayed under the label.
  type: string
icon:
  required: false
  description: The icon displayed on the card. If not set, the icon is resolved automatically from the configured `tap_action`.
  type: string
color:
  required: false
  description: The color of the icon and background accent. Accepts a [color token](#available-colors) or hex color code.
  type: string
  default: primary
vertical:
  required: false
  description: Displays the icon above the label instead of next to it.
  type: boolean
  default: false
tap_action:
  required: true
  description: The action taken on card tap. For more information, see the [action documentation](/dashboards/actions/#tap-action).
  type: map
hold_action:
  required: false
  description: The action taken on card tap and hold. For more information, see the [action documentation](/dashboards/actions/#hold-action).
  type: map
double_tap_action:
  required: false
  description: The action taken on card double tap. For more information, see the [action documentation](/dashboards/actions/#double-tap-action).
  type: map
{% endconfiguration %}

## Examples

Navigate to a dashboard view. The label and icon are taken from the view:

```yaml
type: shortcut
tap_action:
  action: navigate
  navigation_path: /lovelace/kitchen
```

Open an external URL with a custom label and icon:

```yaml
type: shortcut
label: "Home Assistant docs"
icon: mdi:book-open-variant
tap_action:
  action: url
  url_path: https://www.home-assistant.io
```

Launch the voice assistant:

```yaml
type: shortcut
tap_action:
  action: assist
```

Perform an action, with a custom color and a description:

```yaml
type: shortcut
label: "Good night"
description: "Turn off all lights"
color: indigo
tap_action:
  action: perform-action
  perform_action: script.good_night
```

Vertical layout:

```yaml
type: shortcut
label: "Kitchen"
vertical: true
tap_action:
  action: navigate
  navigation_path: /lovelace/kitchen
```

## Available colors

The following colors are available to colorize the shortcut card: `primary`, `accent`, `disabled`, `red`, `pink`, `purple`, `deep-purple`, `indigo`, `blue`, `light-blue`, `cyan`, `teal`, `green`, `light-green`, `lime`, `yellow`, `amber`, `orange`, `deep-orange`, `brown`, `grey`, `blue-grey`, `black`, `white`, or any hex color code (for example, `#93c47d`).
