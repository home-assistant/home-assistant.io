---
title: "Archive package"
action: seventeentrack.archive_package
domain: seventeentrack
description: "Archives a package using the 17track API."
related_actions:
  - seventeentrack.get_packages
  - seventeentrack.add_package
---

The **Archive package** action archives a package using the 17track API. Archiving stops the package from showing up in the list of tracked packages.

{% include actions/ui_header.md %}

To archive a package from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **17Track: Archive package**.
6. Select the **17Track service** and enter the **Package tracking number**.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

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

This archives the package with the given tracking number.

### Options in YAML

{% options_yaml %}
config_entry_id:
  description: The 17Track service the package belongs to.
  required: true
  type: string
package_tracking_number:
  description: The tracking number of the package to archive.
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
