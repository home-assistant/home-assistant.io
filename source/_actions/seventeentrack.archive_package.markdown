---
title: "Archive package"
action: seventeentrack.archive_package
domain: seventeentrack
description: "Archives a package in 17Track by tracking number."
related_actions:
  - seventeentrack.get_packages
  - seventeentrack.add_package
---

The **Archive package** action archives a package in your 17Track account by its tracking number, so 17Track stops actively following it.

This is handy when you want to tidy up after a delivery, for example by automatically archiving a package once it has been marked as delivered.

{% include actions/ui_header.md %}

To archive a package from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **17TRACK: Archive package**.
6. Select the **17Track service**, then enter the **Package tracking number** to archive.
7. Select **Save**.

This action does not support targets. In the UI, you select the 17Track service through the **17Track service** field instead of choosing an area, device, entity, or label.

### Options in the UI

{% options_ui %}
17Track service:
  description: The 17Track service the package belongs to.
  required: true
Package tracking number:
  description: The tracking number of the package to archive.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `seventeentrack.archive_package`. A basic example looks like this:

{% example %}
action: |
  action: seventeentrack.archive_package
  data:
    config_entry_id: 2b4be47a1fa7c3764f14cf756dc98991
    package_tracking_number: RU0103445624A
{% endexample %}

This archives the package in 17Track.

### Options in YAML

{% options_yaml %}
config_entry_id:
  description: >
    The ID of the 17Track service config entry the package belongs to.
  required: true
  type: string
package_tracking_number:
  description: >
    The tracking number of the package to archive.
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: archive a package when a delivered tracking number is set

When a helper that holds a delivered tracking number changes, archive that package in 17Track.

- **Trigger**: A text helper with a delivered tracking number changes
- **Action**: 17TRACK: Archive package

{% details "YAML example for archiving a delivered package" %}

{% example %}
automation: |
  alias: "Archive delivered package"
  triggers:
    - trigger: state
      entity_id: input_text.delivered_tracking_number
  actions:
    - action: seventeentrack.archive_package
      data:
        config_entry_id: 2b4be47a1fa7c3764f14cf756dc98991
        package_tracking_number: "{{ states('input_text.delivered_tracking_number') }}"
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
