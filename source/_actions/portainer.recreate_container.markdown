---
title: Recreate container
action: portainer.recreate_container
domain: portainer
description: "Recreates a container on a Portainer endpoint."
related_actions:
  - portainer.prune_images
---

The **Recreate container** action recreates a container on a Portainer endpoint. This is more disruptive than a restart, because the container is stopped, removed, and then created again with the same configuration. You can optionally pull the image first to update the container to the latest version.

{% caution %}
Recreating a container stops it, removes it, and creates it again. Any data that is not stored in a volume or bind mount is lost. Use this action with care.
{% endcaution %}

{% include actions/ui_header.md %}

To recreate a container from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create** to start a new one.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Portainer: Recreate container**.
6. Select the **Container** to recreate.
7. Optionally, set a timeout and whether to pull the image first.
8. Select **Save**.

This action does not support targets. In the UI, you select the container through the **Container** field instead of choosing an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Container:
  description: The container to recreate.
  required: true
Timeout:
  description: The time to wait for the container to stop before killing it. If not provided, a default of 5 minutes is used.
  required: false
Pull image:
  description: Pull the image before recreating the container. This can be used to update the container to the latest version of the image.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `portainer.recreate_container`:

{% example %}
action: |
  action: portainer.recreate_container
  data:
    device_id: a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4
    pull_image: true
{% endexample %}

### Options in YAML

{% options_yaml %}
device_id:
  description: The ID of the container device to recreate.
  required: true
  type: string
timeout:
  description: "The time to wait for the container to stop before killing it, such as `minutes: 5`. If not provided, a default of 5 minutes is used."
  required: false
  type: map
pull_image:
  description: Whether to pull the image before recreating the container. This can be used to update the container to the latest version of the image.
  required: false
  default: false
  type: boolean
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: update a container to the latest image

This automation recreates a container and pulls the latest image first, so the running container picks up a new release.

- **Trigger**: A scheduled time
- **Action**: Portainer: Recreate container

{% details "YAML example for updating a container to the latest image" %}

{% example %}
automation: |
  alias: "Update Portainer container to latest image"
  triggers:
    - trigger: time
      at: "04:30:00"
  actions:
    - action: portainer.recreate_container
      data:
        device_id: a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4
        pull_image: true
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
