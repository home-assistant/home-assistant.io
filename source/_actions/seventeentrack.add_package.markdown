---
title: "Add package"
action: seventeentrack.add_package
domain: seventeentrack
description: "Adds a package using the 17Track API."
related_actions:
  - seventeentrack.get_packages
  - seventeentrack.archive_package
---

The **Add package** action adds a package to track using the 17Track API. You provide the tracking number and a friendly name so you can recognize the package later.

{% include actions/ui_header.md %}

To add a package from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **17Track: Add package**.
6. Select the **17Track service**, then enter the **Package tracking number to add** and a **Package friendly name**.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
17Track service:
  description: The 17Track service to add the package to.
  required: true
Package tracking number to add:
  description: The tracking number of the package to add.
  required: true
Package friendly name:
  description: A friendly name for the package.
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

This adds a package with the given tracking number and friendly name.

### Options in YAML

{% options_yaml %}
config_entry_id:
  description: The 17Track service to add the package to.
  required: true
  type: string
package_tracking_number:
  description: The tracking number of the package to add.
  required: true
  type: string
package_friendly_name:
  description: A friendly name for the package.
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
