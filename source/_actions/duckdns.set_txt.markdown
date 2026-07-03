---
title: "Set TXT"
action: duckdns.set_txt
domain: duckdns
description: "Sets the TXT record of your Duck DNS subdomain."
---

The **Set TXT** action sets the TXT record of your Duck DNS subdomain.

This is mostly useful for automating an <abbr title="Automatic Certificate Management Environment">ACME</abbr> DNS-01 challenge, where a certificate authority asks you to publish a specific value in your domain's TXT record to prove that you control the domain.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label. Select the Duck DNS integration to update in **Integration ID**. Leaving **Integration ID** empty is deprecated and will be removed in a future release.

{% include actions/ui_header.md %}

To set the TXT record from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Duck DNS: Set TXT**.
6. Choose the **Integration ID**, then enter the **TXT** value.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Integration ID:
  description: The Duck DNS integration to update. Leaving this empty is deprecated and will not be an option in a future release.
  required: false
TXT:
  description: The value for the TXT record. Leave empty to clear the TXT record.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `duckdns.set_txt`. A basic example looks like this:

{% example %}
action: |
  action: duckdns.set_txt
  data:
    config_entry_id: YOUR_CONFIG_ENTRY_ID
    txt: LoqXcYV8...jxAjEuX0.9jg46WB3...fm21mqTI
{% endexample %}

This sets the TXT record of your Duck DNS subdomain to the given value.

### Options in YAML

{% options_yaml %}
config_entry_id:
  description: >
    The ID of the Duck DNS integration to update. Leaving this empty is deprecated and will not be an option in a future release.
  required: false
  type: string
txt:
  description: >
    The value for the TXT record. Omit to clear the TXT record.
  required: false
  type: string
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Script: clear the TXT record after a challenge

Clear the TXT record once an <abbr title="Automatic Certificate Management Environment">ACME</abbr> DNS-01 challenge is complete, so the validation value is no longer published.

- **Action**: Duck DNS: Set TXT
  - **Integration ID**: Your Duck DNS integration
  - **TXT**: Leave empty to clear the record

{% details "Show example YAML" %}

{% example %}
script: |
  clear_duckdns_txt:
    alias: "Clear the Duck DNS TXT record"
    sequence:
      - action: duckdns.set_txt
        data:
          config_entry_id: YOUR_CONFIG_ENTRY_ID
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
