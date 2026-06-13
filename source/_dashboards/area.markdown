---
type: card
title: "Area card"
sidebar_label: Area
description: "The area card gives control of your entities in a specified area."
related:
  - docs: /dashboards/actions/
    title: Card actions
  - docs: /dashboards/cards/
    title: Dashboard cards
  - docs: /dashboards/dashboards/#home-dashboard
    title: Home dashboard
  - docs: /docs/organizing/areas/
    title: About areas
---

The area card lets you control and monitor an individual {% term area %}.

<p class='img'>
  <img src='/images/dashboards/area-cards.png' alt='Screenshot of the area cards'>
  Screenshot of the area cards.
</p>

All options for this card can be configured via the user interface.

As shown in the screenshot of the area cards, they can display values and buttons of entities and devices that you have assigned the area to, such as:

- Buttons for {% term entities %} such as fan, light, and switch that are in the area of the card.
- The measured value of a sensor, if the sensor is in the area of the card or if the sensor is assigned to the area in {% my areas title="**Settings** > **Areas, labels & zones**" %}.
- The median of the values measured by temperature sensors, if more than one temperature sensor is in the area of the card.
- The median of the values measured by humidity sensors, if more than one humidity sensor is in the area of the card.
- A motion sensor in the top left of the card, if a motion sensor is in the area of the card.
- The camera feed instead of the area picture, if a camera is added to the {% term area %} of the card.

{% note %}
The device is in an area if you have previously [assigned the area to the device](/voice_control/assign_areas_floors/#to-assign-an-area-to-a-device).
{% endnote %}

{% include dashboard/edit_dashboard.md %}

## Adding buttons to the area card for controlling devices

You can add buttons to the area card that will allow you to control different devices in that area.

1. Depending on your goal, do one of the following:
   - Assign the area of the card to the device by following the steps in [Assigning an area to a device](/voice_control/assign_areas_floors/#to-assign-an-area-to-a-device).
   - Assign the area of the card to a group of devices by following the steps in [Assigning an area to multiple items](/docs/organizing/areas/#assigning-an-area-to-multiple-items).
2. Go to your dashboard and, in the top-right corner, select the {% icon "mdi:pencil" %} button.
3. In the area card that you have previously created, select **Edit**.
4. Expand the **Features** section and select **Add feature** > **Area controls**.
5. You can also:
   - Define the **Features position** by selecting **Bottom** or **Inline**.
   - Customize controls to add a button for each device or entity, for example.
     1. Select the {% icon "mdi:pencil" %} button next to **Area controls**.
     2. Turn on **Customize controls**.
     3. Select **Controls** and then select the entity from the list.
     4. Select **Save**.

If you want to control only certain devices that are assigned to an area altogether, you can still use an area card. [Create a new area](/docs/organizing/areas/#creating-an-area) and then follow the previous steps using the new area.

## YAML configuration

The following YAML options are available when you use YAML mode or just prefer to use YAML in the code editor in the UI.

{% configuration %}
type:
  required: true
  description: "`area`"
  type: string
area:
  required: true
  description: ID of the `area`.
  type: string
color:
  required: false
  description: Set the color for the icon and the hover/focus state. It accepts [color token](/dashboards/area/#available-colors) or hex color code.
  type: string
display_type:
  required: false
  description: Defines the card's display style. Options include `compact` (a minimal layout), `icon` (shows an area icon), `picture` (displays an image of the area), or `camera` (shows the live camera feed).
  type: string
  default: "picture"
camera_view:
  required: false
  description: 'If showing a camera, `live` will show the live view if `stream` is enabled.'
  default: auto
  type: string
aspect_ratio:
  required: false
  description: 'Forces the height of the image to be a ratio of the width. Valid formats: Height percentage value (`23%`) or ratio expressed with colon or "x" separator (`16:9` or `16x9`). For a ratio, the second element can be omitted and will default to "1" (`1.78` equals `1.78:1`).'
  default: "16:9"
  type: string
tap_action:
  required: false
  description: Action taken on card tap. See [action documentation](/dashboards/actions/#tap-action).
  type: map
  default: none
image_tap_action:
  required: false
  description: Action taken on image tap (only available when `display_type` is `icon`, `picture` or `camera`). When not configured, image taps use the card's `tap_action`. See [action documentation](/dashboards/actions/#tap-action).
  type: map
  default: "`more-info` for camera display type, `none` otherwise"
alert_classes:
  required: false
  type: list
  default: "moisture, motion"
  description: A list of binary sensor device classes which will populate alert icons in the card when the state is on. If the display type is set to `compact`, only the first alert icon will be displayed.
sensor_classes:
  required: false
  type: list
  default: "temperature, humidity"
  description: A list of sensor device classes to display for the area. Most classes (such as temperature, humidity, or pressure) show the median value when multiple sensors are present. Sensors representing cumulative measurements (such as power, energy, gas, or water) show the sum instead.
features:
  required: false
  description: Additional widgets to control entities in the area. See [available features](/dashboards/features).
  type: list
features_position:
  required: false
  description: Position of the features on the area card. Can be `bottom` or `inline`. Only the first feature will be displayed when the option is set to `inline`.
  type: string
  default: bottom
exclude_entities:
  required: false
  description: A list of entities that will be excluded from the card. It will affect sensor_classes, alert_classes, and features.
  type: list
{% endconfiguration %}

### Example

Basic example:

```yaml
type: area
area: bedroom
```

Complex example

```yaml
type: area
area: bedroom
display_type: picture
tap_action:
  action: navigate
  navigation_path: /lovelace/my_bedroom
sensor_classes:
  - temperature
  - humidity
alert_classes:
  - moisture
  - motion
features:
  - type: area-controls
```

## Available colors

The following colors are available to colorize the area card: `primary`, `accent`, `disabled`, `red`, `pink`, `purple`, `deep-purple`, `indigo`, `blue`, `light-blue`, `cyan`, `teal`, `green`, `light-green`, `lime`, `yellow`, `amber`, `orange`, `deep-orange`, `brown`, `grey`, `blue-grey`, `black`, `white`, or any hex color code (for example, `#93c47d`).
