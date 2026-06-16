---
title: "Get packages"
action: seventeentrack.get_packages
domain: seventeentrack
description: "Queries the 17track API for the latest package data."
related_actions:
  - seventeentrack.add_package
  - seventeentrack.archive_package
---

The **Get packages** action queries the 17track API for the latest package data. You can optionally filter the result to only the package states you are interested in.

This action returns its result in a response variable, which you can use in later steps of the same automation or script.

{% include actions/ui_header.md %}

To get packages from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **17Track: Get packages**.
6. Select the **17Track service** and, if needed, the **Package states** to filter on.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
17Track service:
  description: The 17Track service to retrieve packages for.
  required: true
Package states:
  description: "Only return packages with the specified states. One or more of not_found, in_transit, expired, ready_to_be_picked_up, undelivered, delivered, or alert. Returns all packages if not specified."
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `seventeentrack.get_packages`. Store the result in a response variable so you can use it in later steps:

{% example %}
action: |
  action: seventeentrack.get_packages
  data:
    config_entry_id: 2b4be47a1fa7c3764f14cf756dc98991
    package_state:
      - in_transit
      - delivered
  response_variable: packages
{% endexample %}

This fetches the packages that are in transit or delivered.

### Options in YAML

{% options_yaml %}
config_entry_id:
  description: The 17Track service to retrieve packages for.
  required: true
  type: string
package_state:
  description: "Only return packages with the specified states. One or more of not_found, in_transit, expired, ready_to_be_picked_up, undelivered, delivered, or alert. Returns all packages if not specified."
  required: false
  type: list
{% endoptions_yaml %}

## Response data

The response contains the latest package data for the selected service.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
