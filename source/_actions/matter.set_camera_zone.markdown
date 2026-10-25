---
title: "Set camera zone"
action: matter.set_camera_zone
domain: matter
description: "Creates or updates a motion, privacy, or focus zone on a Matter camera."
related_actions:
  - matter.get_camera_zones
  - matter.clear_camera_zone
---

Use this action to create or update a zone on a Matter camera. A zone is an area of the image with a use:

- `motion`: The camera detects motion in this area.
- `privacy`: The camera hides this area, for example a neighbor's window.
- `focus`: The camera focuses on this area.

You give the corners of the zone in percent of the image, measured from the top left corner. For example, `x: 50` and `y: 50` is the center of the image. The camera converts them to its own resolution, so the same values work on every camera.

If you leave the zone ID empty, the camera creates a new zone and the action returns its ID. To change a zone, give its ID. Use the [Get camera zones](/actions/matter.get_camera_zones/) action to look up the IDs.

Your camera must support the Matter Zone Management cluster with user-defined zones for this action to work. Only Home Assistant administrators can run this action.

{% include actions/ui_header.md %}

To set a camera zone from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the camera.
6. From the actions shown for that target, under **Matter**, select **Set camera zone**.
7. Fill in the zone details.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Zone ID:
  description: The ID of the zone to update. Leave empty to create a zone.
  required: false
Name:
  description: The name of the zone, up to 16 characters.
  required: true
Use:
  description: What the camera uses the zone for, either motion, privacy, or focus.
  required: true
Corners:
  description: The corners of the zone, in percent of the image from the top left. 3 to 12 corners.
  required: true
Color:
  description: The color to show the zone in, like `#FF0000`, or `#FF000080` with transparency.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `matter.set_camera_zone`. This example creates a privacy zone over the top right quarter of the image:

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

To change the corners of an existing zone, give its ID:

{% example %}
action: |
  action: matter.set_camera_zone
  target:
    entity_id: camera.front_door
  data:
    zone_id: 2
    name: "Driveway"
    use: motion
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
  description: The ID of the zone to update. Omit this field to create a zone.
  required: false
  type: integer
name:
  description: The name of the zone, up to 16 characters.
  required: true
  type: string
use:
  description: "What the camera uses the zone for: `motion`, `privacy`, or `focus`."
  required: true
  type: string
vertices:
  description: A list of 3 to 12 corners, each with `x` and `y` from 0 to 100 in percent of the image.
  required: true
  type: list
color:
  description: The color to show the zone in, like `#FF0000`, or `#FF000080` with transparency.
  required: false
  type: string
{% endoptions_yaml %}

{% include actions/targets.md %}

## Response data

The action returns the ID of the zone it created or updated:

- `zone_id`: The ID of the zone.

## Good to know

- Not every camera supports focus zones. If yours doesn't, the action fails with an error.
- The camera rounds the corners to its own pixel grid, so [Get camera zones](/actions/matter.get_camera_zones/) can return slightly different values.
- Zones that came with the camera can't be changed.
- Home Assistant doesn't show when motion is detected in a zone yet.

{% include actions/stuck.md %}

{% include actions/related.md %}
