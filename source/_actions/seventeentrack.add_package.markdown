---
title: "Add a package"
action: seventeentrack.add_package
domain: seventeentrack
description: "Adds a package to 17Track by tracking number."
related_actions:
  - seventeentrack.get_packages
  - seventeentrack.archive_package
---

The **Add a package** action adds a package to your 17Track account by its tracking number, so 17Track starts following it for you.

This is handy when you want to start tracking a shipment straight from Home Assistant, for example from an automation that reads tracking numbers out of your order confirmation emails.

{% include actions/ui_header.md %}

To add a package from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **17TRACK: Add a package**.
6. Select the **17Track service**, then enter the **Package tracking number to add** and a **Package friendly name**.
7. Select **Save**.

This action does not support targets. In the UI, you select the 17Track service through the **17Track service** field instead of choosing an area, device, entity, or label.

### Options in the UI

{% options_ui %}
17Track service:
  description: The 17Track service to add the package to.
  required: true
Package tracking number to add:
  description: The tracking number of the package to add.
  required: true
Package friendly name:
  description: The friendly name to give the package.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `seventeentrack.add_package`. A basic example looks like this:

{% example %}
action: |
  action: seventeentrack.add_package
  data:
    config_entry_id: 2b4be47a1fa7c3764f14cf756dc98991
    package_tracking_number: RU0103445624A
    package_friendly_name: "Example package"
{% endexample %}

This adds the package to 17Track under the given friendly name.

### Options in YAML

{% options_yaml %}
config_entry_id:
  description: >
    The ID of the 17Track service config entry to add the package to.
  required: true
  type: string
package_tracking_number:
  description: >
    The tracking number of the package to add.
  required: true
  type: string
package_friendly_name:
  description: >
    The friendly name to give the package.
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: track a package when a tracking number arrives

When a helper that holds a new tracking number changes, add that package to 17Track.

- **Trigger**: A text helper with a tracking number changes
- **Action**: 17TRACK: Add a package

{% details "YAML example for adding a package from a helper" %}

{% example %}
automation: |
  alias: "Track new package"
  triggers:
    - trigger: state
      entity_id: input_text.tracking_number
  actions:
    - action: seventeentrack.add_package
      data:
        config_entry_id: 2b4be47a1fa7c3764f14cf756dc98991
        package_tracking_number: "{{ states('input_text.tracking_number') }}"
        package_friendly_name: "New order"
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
