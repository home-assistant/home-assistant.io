---
title: "Take image snapshot"
action: image.snapshot
domain: image
description: "Saves the current image from an image entity to a file."
---

Use this action to save the current picture from an image entity to a file, for example to keep a copy of an image whenever it changes.

{% include actions/ui_header.md %}

To take an image snapshot from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the image entity you want to capture.
6. From the actions shown for that target, select **Image: Take image snapshot**.
7. Set the **Filename** where the snapshot is saved.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Filename:
  description: The full path to the file where the snapshot is saved.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `image.snapshot`. A basic example looks like this:

{% example %}
action: |
  action: image.snapshot
  target:
    entity_id: image.front_door
  data:
    filename: "/config/www/snapshot.jpg"
{% endexample %}

This saves the current image from `image.front_door` to `/config/www/snapshot.jpg`.

### Options in YAML

{% options_yaml %}
filename:
  description: The full path to the file where the snapshot is saved.
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/targets.md domain="image" %}

## Good to know

- This action only works with image entities.
- The path in `filename` must be inside a directory that Home Assistant is allowed to write to. By default, the `www` folder in your configuration directory and each configured [media directory](/integrations/homeassistant/#media_dirs) are allowed, so a path like `/config/www/snapshot.jpg` or `/media/snapshot.jpg` works without extra setup. To save somewhere else, such as `/tmp`, add that directory to [`allowlist_external_dirs`](/integrations/homeassistant/#allowlist_external_dirs) in the [`homeassistant:`](/integrations/homeassistant/) section of your {% term "`configuration.yaml`" %} file.

{% include actions/try_it.md %}

### Automation: save an image snapshot with a timestamped filename

Save a snapshot whenever the image changes and keep the date and time in the filename, so each capture is stored as a separate file.

- **Trigger**: The image entity changes
- **Action**: Image: Take image snapshot
  - **Target**: Front door image
  - **Filename**: a path that includes the current date and time

{% details "Show example YAML" %}

{% example %}
automation: |
  - alias: "Save an image snapshot when it changes"
    triggers:
      - trigger: state
        entity_id: image.front_door
    actions:
      - action: image.snapshot
        target:
          entity_id: image.front_door
        data:
          filename: "/config/www/front_door_{{ now().strftime('%Y%m%d-%H%M%S') }}.jpg"
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}
