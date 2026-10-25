---
title: "Set camera zone"
action: matter.set_camera_zone
domain: matter
description: "Creates or updates a privacy or focus zone on a Matter camera."
related_actions:
  - matter.get_camera_zones
  - matter.clear_camera_zone
---

Use this action to create or update a zone on a Matter camera. A zone is an area of the camera picture with a use:

- `privacy`: The camera hides this area, for example a neighbor's window.
- `focus`: The camera focuses on this area.

You give the corners of the zone in percent of the full camera sensor, measured from the top left corner. For example, `x: 50` and `y: 50` is the center. Home Assistant converts them to the zone coordinates of the camera, so the same values work on every camera. If the camera crops or zooms its picture, the zone may not line up exactly with what you see.

If you leave the zone ID empty, the camera creates a new zone and the action returns its ID. To change a zone, give its ID. Use the [Get camera zones](/actions/matter.get_camera_zones/) action to look up the IDs.

Your camera must support the Matter Zone Management cluster with user-defined zones for this action to work. Only Home Assistant administrators can run this action.

{% include actions/ui_header.md %}

To set a camera zone from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the camera you want to manage.
6. From the actions shown for that target, under **Matter**, select **Set camera zone**.
7. Fill in the zone details.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Zone ID:
  description: The ID of the zone to update, from 0 to 65534. Leave empty to create a zone.
  required: false
Name:
  description: The name of the zone, up to 32 bytes. Letters like `ä`, letters from other scripts, and emoji take more than 1 byte. The name can't be blank.
  required: true
Use:
  description: What the camera uses the zone for, either privacy or focus.
  required: true
Corners:
  description: The corners of the zone, in percent of the camera sensor from the top left. 3 to 12 corners.
  required: true
Color:
  description: A color for the zone, as `#RRGGBB` or `#RRGGBBAA`. The last two digits set how opaque the inside of the zone is. Without them, the inside is fully transparent. The camera can ignore the color.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `matter.set_camera_zone`. This example creates a privacy zone over the top right quarter of the camera picture:

{% example %}
action: |
  action: matter.set_camera_zone
  target:
    entity_id: camera.front_door
  data:
    name: "Neighbor"
    use: privacy
    vertices:
      - x: 50
        y: 0
      - x: 100
        y: 0
      - x: 100
        y: 50
      - x: 50
        y: 50
  response_variable: zone
{% endexample %}

To change an existing zone, give its ID:

{% example %}
action: |
  action: matter.set_camera_zone
  target:
    entity_id: camera.front_door
  data:
    zone_id: 2
    name: "Street"
    use: privacy
    vertices:
      - x: 0
        y: 40
      - x: 60
        y: 40
      - x: 60
        y: 100
      - x: 0
        y: 100
{% endexample %}

### Options in YAML

{% options_yaml %}
zone_id:
  description: The ID of the zone to update, from 0 to 65534. Omit this field to create a zone.
  required: false
  type: integer
name:
  description: The name of the zone, up to 32 bytes. Letters like `ä`, letters from other scripts, and emoji take more than 1 byte. The name can't be blank.
  required: true
  type: string
use:
  description: "What the camera uses the zone for: `privacy` or `focus`."
  required: true
  type: string
vertices:
  description: A list of 3 to 12 corners, each with `x` and `y` from 0 to 100 in percent of the camera sensor.
  required: true
  type: list
color:
  description: A color for the zone, as `#RRGGBB` or `#RRGGBBAA`. The last two digits set how opaque the inside of the zone is. Without them, the inside is fully transparent. The camera can ignore the color.
  required: false
  type: string
{% endoptions_yaml %}

{% include actions/targets.md domain="camera" %}

## Response data

The action returns the ID of the zone it created or updated, under the entity ID of the camera:

- `zone_id`: The ID of the zone.

With the first example above, the ID is in `zone['camera.front_door'].zone_id`.

## Good to know

- Not every camera supports focus zones. If yours doesn't, the action fails with an error.
- Home Assistant rounds the corners to the zone coordinates of the camera, so [Get camera zones](/actions/matter.get_camera_zones/) can return slightly different values.
- Updating a zone replaces all its settings. Give the name, use, and corners again, and the color if you want to keep it.
- A camera holds a limited number of zones. [Get camera zones](/actions/matter.get_camera_zones/) returns the limit as `max_user_defined_zones`.
- The action fails for zones that came with the camera.
- Motion zones can't be created or changed. Home Assistant doesn't support the triggers they need. [Get camera zones](/actions/matter.get_camera_zones/) still lists existing motion zones, and [Clear camera zone](/actions/matter.clear_camera_zone/) can remove them.

{% include actions/stuck.md %}

{% include actions/related.md %}
