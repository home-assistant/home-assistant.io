---
title: "Get camera zones"
action: matter.get_camera_zones
domain: matter
description: "Returns the motion, privacy, and focus zones of a Matter camera."
related_actions:
  - matter.set_camera_zone
  - matter.clear_camera_zone
---

Use this action to list the zones of a Matter camera. A zone is an area of the image that the camera uses for motion detection, hides as a privacy area, or focuses on.

The corners of each zone are given in percent of the image, measured from the top left corner. Your camera must support the Matter Zone Management cluster for this action to work.

{% include actions/ui_header.md %}

To get the camera zones from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the camera.
6. From the actions shown for that target, under **Matter**, select **Get camera zones**.
7. Select **Save**.

### Options in the UI

This action has no options.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `matter.get_camera_zones`. Store the result in a response variable so you can use it in later steps:

{% example %}
action: |
  action: matter.get_camera_zones
  target:
    entity_id: camera.front_door
  response_variable: camera_zones
{% endexample %}

### Options in YAML

This action has no options.

{% include actions/targets.md %}

## Response data

The action returns the zones of the camera and how many zones it supports. The response includes the following fields:

- `max_zones`: The maximum number of zones the camera can hold.
- `max_user_defined_zones`: The maximum number of zones you can create yourself.
- `zones`: A list of the zones. Each zone includes the following:
  - `zone_id`: The ID of the zone. Use it to update or remove the zone.
  - `name`: The name of the zone.
  - `use`: What the camera uses the zone for: `motion`, `privacy`, or `focus`.
  - `source`: Who created the zone: `manufacturer` or `user`.
  - `vertices`: The corners of the zone, each with `x` and `y` in percent of the image.
  - `color`: The color the zone is shown in, if one is set.

## Good to know

- Zones with the source `manufacturer` come with the camera. You can't change or remove them.

{% include actions/stuck.md %}

{% include actions/related.md %}
