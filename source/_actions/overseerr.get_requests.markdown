---
title: "Get requests"
action: overseerr.get_requests
domain: overseerr
description: "Retrieves a list of media requests from Seerr."
---

The **Get requests** action retrieves a list of media requests from Seerr. You can filter the results by status and by the user who made the request, and choose the order in which they are returned.

This action returns its result in a response variable, which you can use in later steps of the same automation or script, for example to notify yourself about pending requests.

{% include actions/ui_header.md %}

To get media requests from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Seerr: Get requests**.
6. Select the **Seerr instance** and, if needed, set the **Request status**, **Sort order**, and **Requested by** filters.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Seerr instance:
  description: The Seerr instance to get requests from.
  required: true
Request status:
  description: "Filter the requests by status. One of approved, pending, available, processing, unavailable, or failed."
Sort order:
  description: "Sort the requests by added or modified date."
Requested by:
  description: Filter the requests by the user ID that requested them.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `overseerr.get_requests`. Store the result in a response variable so you can use it in later steps:

{% example %}
action: |
  action: overseerr.get_requests
  data:
    config_entry_id: 6b4be47a1fa7c3764f14cf756dc9899d
    status: pending
    sort_order: added
  response_variable: requests
{% endexample %}

This fetches the pending media requests, sorted by the date they were added.

### Options in YAML

{% options_yaml %}
config_entry_id:
  description: The Seerr instance to get requests from.
  required: true
  type: string
status:
  description: "Filter the requests by status. One of approved, pending, available, processing, unavailable, or failed."
  required: false
  type: string
sort_order:
  description: "Sort the requests by date. One of added or modified."
  required: false
  type: string
requested_by:
  description: Filter the requests by the user ID that requested them.
  required: false
  type: integer
{% endoptions_yaml %}

## Response data

The response contains a `requests` list. Each item describes a single media request, including its status, the media it refers to, and the users who requested and last modified it.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
