---
title: Prune build cache
action: portainer.prune_build_cache
domain: portainer
description: "Removes the Docker build cache from a Portainer endpoint."
related_actions:
  - portainer.prune_images
---

The **Prune build cache** action removes the Docker build cache from a Portainer endpoint to free up disk space. By default, all unused build cache is removed. You can limit the cleanup to dangling build cache, or to build cache that has not been used for a certain time.

Only administrators can use this action.

{% include actions/ui_header.md %}

To prune the build cache from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create** to start a new one.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Portainer: Prune build cache**.
6. Select the **Endpoint** to prune the build cache on.
7. Optionally, turn off **All** to only prune dangling build cache, and set how long the build cache must have been unused.
8. Select **Save**.

This action does not support targets. In the UI, you select the endpoint through the **Endpoint** field instead of choosing an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Endpoint:
  description: The endpoint to prune the build cache on.
  required: true
All:
  description: Prune all unused build cache. Turn this off to only prune dangling build cache. Turned on by default.
  required: false
Until:
  description: Only prune build cache that has not been used for at least this time duration. Build cache that was never used is always pruned. If not provided, build cache of any age is pruned.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `portainer.prune_build_cache`:

{% example %}
action: |
  action: portainer.prune_build_cache
  data:
    device_id: a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4
    all: false
    until:
      hours: 24
{% endexample %}

### Options in YAML

{% options_yaml %}
device_id:
  description: The ID of the endpoint device to prune the build cache on.
  required: true
  type: string
all:
  description: If true (default), prune all unused build cache. If false, only prune dangling build cache.
  required: false
  default: true
  type: boolean
until:
  description: "Only prune build cache that has not been used for at least this time duration, such as `hours: 24`. Build cache that was never used is always pruned. If not provided, build cache of any age is pruned."
  required: false
  type: map
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: clean up the build cache every week

This automation prunes build cache that has not been used for a week, so images you build regularly still build quickly.

- **Trigger**: A scheduled time
- **Action**: Portainer: Prune build cache

{% details "YAML example for weekly build cache cleanup" %}

{% example %}
automation: |
  alias: "Weekly Portainer build cache cleanup"
  triggers:
    - trigger: time
      at: "03:00:00"
  conditions:
    - condition: time
      weekday:
        - sun
  actions:
    - action: portainer.prune_build_cache
      data:
        device_id: a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4
        until:
          hours: 168
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
