---
title: "Clear camera zone"
action: matter.clear_camera_zone
domain: matter
description: "Removes a zone from a Matter camera."
related_actions:
  - matter.get_camera_zones
  - matter.set_camera_zone
---

Use this action to remove a motion, privacy, or focus zone from a Matter camera. Use the [Get camera zones](/actions/matter.get_camera_zones/) action to look up the ID of the zone.

Only Home Assistant administrators can run this action.

{% include actions/ui_header.md %}

To clear a camera zone from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the camera.
6. From the actions shown for that target, under **Matter**, select **Clear camera zone**.
7. Enter the **Zone ID** to remove.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Zone ID:
  description: The ID of the zone to remove.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `matter.clear_camera_zone`. A basic example looks like this:

{% example %}
action: |
  action: matter.clear_camera_zone
  target:
    entity_id: camera.front_door
  data:
    zone_id: 2
{% endexample %}

### Options in YAML

{% options_yaml %}
zone_id:
  description: The ID of the zone to remove.
  required: true
  type: integer
{% endoptions_yaml %}

{% include actions/targets.md %}

## Good to know

- Zones that came with the camera can't be removed.
- Removing a privacy zone shows that area of the image again.

{% include actions/stuck.md %}

{% include actions/related.md %}
