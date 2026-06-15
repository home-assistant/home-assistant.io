---
title: "Unmute account"
action: mastodon.unmute_account
domain: mastodon
description: "Unmutes a Mastodon account."
related_actions:
  - mastodon.mute_account
  - mastodon.get_account
  - mastodon.post
  - mastodon.update_profile
---

The **Unmute account** action unmutes an account you previously muted, so their posts appear in your timeline again.

This is handy at the end of an automation that muted an account temporarily, for example unmuting a news account when you return from holiday.

{% include actions/ui_header.md %}

To unmute an account from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Mastodon: Unmute account**.
6. Select the **Mastodon instance** to use and enter the **Account name** to unmute.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Mastodon instance:
  description: The Mastodon instance to unmute this account on.
  required: true
Account name:
  description: The Mastodon account username to unmute, in the format `@user@instance`.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `mastodon.unmute_account`. A basic example looks like this:

{% example %}
action: |
  action: mastodon.unmute_account
  data:
    config_entry_id: 6b4be47a1fa7c3764f14cf756dc9899d
    account_name: "@account@instance.online"
{% endexample %}

To find the `config_entry_id`, go to **Developer tools** > **Actions**, select this action, choose your Mastodon instance, and switch to YAML mode.

### Options in YAML

{% options_yaml %}
config_entry_id:
  description: >
    The ID of the Mastodon config entry to use.
  required: true
  type: string
account_name:
  description: >
    The Mastodon account username to unmute, in the format `@user@instance`.
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
