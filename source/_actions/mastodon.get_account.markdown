---
title: "Get account"
action: mastodon.get_account
domain: mastodon
description: "Gets information about a Mastodon account."
related_actions:
  - mastodon.post
  - mastodon.mute_account
  - mastodon.unmute_account
  - mastodon.update_profile
---

The **Get account** action looks up a Mastodon account and returns its details, such as the display name, follower count, and number of posts.

This is handy when you want to react to changes on an account you follow, for example showing a follower count on your dashboard or triggering an automation when an account publishes a new post. It only returns accounts that are federated with your instance.

This action returns its result in a response variable, which you can use in later steps of the same automation or script.

{% include actions/ui_header.md %}

To get account information from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Mastodon: Get account**.
6. Select the **Mastodon instance** to use and enter the **Account name** to look up.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Mastodon instance:
  description: The Mastodon instance to use to look up the account.
  required: true
Account name:
  description: The Mastodon account username, in the format `@user@instance`.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `mastodon.get_account`. Store the result in a response variable so you can use it in later steps:

{% example %}
action: |
  action: mastodon.get_account
  data:
    config_entry_id: 6b4be47a1fa7c3764f14cf756dc9899d
    account_name: "@account@instance.online"
  response_variable: account_details
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
    The Mastodon account username, in the format `@user@instance`.
  required: true
  type: string
{% endoptions_yaml %}

## Response data

The response contains an `account` mapping with the account details. Useful fields include:

- `display_name`: The display name shown on the profile.
- `username`: The account username.
- `followers_count`: The number of accounts that follow this account.
- `following_count`: The number of accounts this account follows.
- `statuses_count`: The total number of posts published by the account.
- `last_status_at`: The date the last post was published.
- `note`: The account bio.
- `url`: The public URL of the account profile.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
