---
title: "Trigger camera"
action: blink.trigger_camera
domain: blink
description: "Requests a Blink camera to take a new image."
related_actions:
  - blink.record
  - blink.save_video
  - blink.save_recent_clips
---

The **Trigger camera** action asks a Blink camera to take a new still image.

This is handy when you want an up-to-date snapshot from an automation or a script, for example before saving the image somewhere with the [camera](/integrations/camera/) actions.

{% include actions/ui_header.md %}

To trigger a camera from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the Blink camera you want to trigger.
6. From the actions shown for that target, select **Blink: Trigger camera**.
7. Select **Save**.

This action has no additional options in the UI.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `blink.trigger_camera`. A basic example looks like this:

{% example %}
action: |
  action: blink.trigger_camera
  target:
    entity_id: camera.blink_front_door
{% endexample %}

This action has no additional options in YAML.

{% include actions/targets.md domain="camera" %}

## Good to know

- The camera sensors, such as temperature and Wi-Fi strength, only update when a new image is requested. Triggering the camera is one way to refresh them.
- Keep a minimum of 5 seconds between sequential Blink actions. Calls made too quickly after each other can be throttled and ignored.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: snap a picture and save it locally

Take a new image with a Blink camera and then save it to a local file using the [camera snapshot](/integrations/camera/#action-snapshot) action.

- **Trigger**: whatever should start the snapshot, such as a motion sensor
- **Action 1**: Blink: Trigger camera
  - **Target**: Front door camera
- **Action 2**: Camera: Take snapshot
  - **Target**: Front door camera
  - **Filename**: the path where the image is saved

{% details "Show example YAML" %}

{% example %}
script: |
  alias: "Blink snap picture"
  sequence:
    - action: blink.trigger_camera
      target:
        entity_id: camera.blink_front_door
    - action: camera.snapshot
      target:
        entity_id: camera.blink_front_door
      data:
        filename: "/config/www/my_image.jpg"
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
