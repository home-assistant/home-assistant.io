---
title: "Scan image"
action: image_processing.scan
domain: image_processing
description: "Processes an image from a camera right away."
---

Use this action to make an image processing {% term entity %} process the current image from its camera right away, instead of waiting for its next scheduled run.

This is the usual way to keep image processing efficient. Set a long scan interval so the entity almost never processes on its own, and run this action at the moments that matter, such as when a motion sensor goes off.

{% include actions/ui_header.md %}

To process an image from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the image processing entity you want to run.
6. From the actions shown for that target, select **Scan**.
7. Select **Save**.

### Options in the UI

This action has no additional options beyond the target.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `image_processing.scan`. A basic example looks like this:

{% example %}
action: |
  action: image_processing.scan
  target:
    entity_id: image_processing.door
{% endexample %}

This processes the current image from the camera behind `image_processing.door`.

### Options in YAML

This action has no additional YAML options beyond the target.

{% include actions/targets.md %}

## Good to know

- Processing takes a moment. The result shows up in the state and attributes of the entity once it's done, and any events the platform sends, such as `image_processing.detect_face`, follow afterward.
- Image processing entities process on a schedule set by their `scan_interval`, which is 10 seconds by default. Set a long interval and use this action instead if you only need results at specific moments.
- Only camera entities can be used as the image source. See [Image processing](/integrations/image_processing/) for what these entities report.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: scan for faces when motion is detected

Process the camera image at the door only when the motion sensor picks something up.

- **Trigger**: Motion detected
  - **Target**: Door motion sensor
- **Action**: Scan
  - **Target**: Door

{% details "Show example YAML" %}

{% example %}
automation: |
  - alias: "Scan for faces when motion is detected"
    triggers:
      - trigger: motion.detected
        target:
          entity_id: binary_sensor.door_motion_sensor
    actions:
      - action: image_processing.scan
        target:
          entity_id: image_processing.door
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
