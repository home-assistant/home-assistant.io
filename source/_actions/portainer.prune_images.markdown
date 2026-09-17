---
title: Prune unused images
action: portainer.prune_images
domain: portainer
description: "Removes unused images from a Portainer endpoint."
related_actions:
  - portainer.recreate_container
---

The **Prune unused images** action removes unused images from a Portainer endpoint to free up disk space. You can limit the cleanup to images that have been unused for at least a certain time, or to dangling images only.

{% include actions/ui_header.md %}

To prune images from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create** to start a new one.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Portainer: Prune unused images**.
6. Select the **Endpoint** to prune images on.
7. Optionally, set how far back to keep images and whether to limit the cleanup to dangling images.
8. Select **Save**.

This action does not support targets. In the UI, you select the endpoint through the **Endpoint** field instead of choosing an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Endpoint:
  description: The endpoint to prune images on.
  required: true
Until:
  description: Only prune images that have been unused for at least this time duration in the past. If not provided, all unused images are pruned.
  required: false
Dangling:
  description: Only prune dangling images. When not set, all unused images are pruned.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `portainer.prune_images`:

{% example %}
action: |
  action: portainer.prune_images
  data:
    device_id: a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4
    until:
      hours: 24
    dangling: true
{% endexample %}

### Options in YAML

{% options_yaml %}
device_id:
  description: The ID of the endpoint device to prune images on.
  required: true
  type: string
until:
  description: "Only prune images that have been unused for at least this time duration in the past, such as `hours: 24`. If not provided, all unused images are pruned."
  required: false
  type: map
dangling:
  description: If true, only prune dangling images. When not set, all unused images are pruned.
  required: false
  default: false
  type: boolean
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: clean up images every week

This automation prunes images that have been unused for more than a week, keeping the Docker host tidy without removing images you still rely on.

- **Trigger**: A scheduled time
- **Action**: Portainer: Prune unused images

{% details "YAML example for weekly image cleanup" %}

{% example %}
automation: |
  alias: "Weekly Portainer image cleanup"
  triggers:
    - trigger: time
      at: "03:00:00"
  conditions:
    - condition: time
      weekday:
        - sun
  actions:
    - action: portainer.prune_images
      data:
        device_id: a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4
        until:
          hours: 168
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
