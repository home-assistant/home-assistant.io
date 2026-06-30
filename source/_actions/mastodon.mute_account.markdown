---
title: "Mute account"
action: mastodon.mute_account
domain: mastodon
description: "Mutes a Mastodon account."
related_actions:
  - mastodon.unmute_account
  - mastodon.get_account
  - mastodon.post
  - mastodon.update_profile
---

The **Mute account** action mutes an account you follow, so their posts no longer appear in your timeline.

This is handy when you want to quiet down your timeline temporarily, for example muting a busy news account while you are on vacation and unmuting it again when you return. You can mute indefinitely or for a set duration.

{% include actions/ui_header.md %}

To mute an account from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Mastodon: Mute account**.
6. Select the **Mastodon instance** to use and enter the **Account name** to mute. Optionally set a **Duration** and whether to **Hide notifications**.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Mastodon instance:
  description: The Mastodon instance to mute this account on.
  required: true
Account name:
  description: The Mastodon account username to mute, in the format `@user@instance`.
  required: true
Duration:
  description: The duration to mute the account for. If omitted, the account is muted indefinitely.
  required: false
Hide notifications:
  description: Hide notifications from this account while it is muted.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `mastodon.mute_account`. A basic example looks like this:

{% example %}
action: |
  action: mastodon.mute_account
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
    The Mastodon account username to mute, in the format `@user@instance`.
  required: true
  type: string
duration:
  description: >
    The duration to mute the account for. If omitted, the account is muted
    indefinitely.
  required: false
  type: time
hide_notifications:
  description: >
    Hide notifications from this account while it is muted.
  required: false
  type: boolean
  default: true
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: mute an account while you are away

This automation looks for an event in your calendar and mutes the specified account while the event is active, then unmutes it when the event ends.

- **Trigger**: A calendar event starts or ends
- **Action**: Mastodon: Mute account, or Mastodon: Unmute account

{% details "YAML example for muting an account during a calendar event" %}

{% example %}
automation: |
  alias: "Mute a Mastodon account during an event"
  triggers:
    - trigger: calendar.event_started
      target:
        entity_id: calendar.holiday
      id: "start"
    - trigger: calendar.event_ended
      target:
        entity_id: calendar.holiday
      id: "end"
  actions:
    - choose:
        - conditions:
            - condition: trigger
              id: "start"
          sequence:
            - action: mastodon.mute_account
              data:
                config_entry_id: 6b4be47a1fa7c3764f14cf756dc9899d
                account_name: "@commute-news@mytown.online"
        - conditions:
            - condition: trigger
              id: "end"
          sequence:
            - action: mastodon.unmute_account
              data:
                config_entry_id: 6b4be47a1fa7c3764f14cf756dc9899d
                account_name: "@commute-news@mytown.online"
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
