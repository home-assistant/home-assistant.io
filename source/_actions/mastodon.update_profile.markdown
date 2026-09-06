---
title: "Update profile"
action: mastodon.update_profile
domain: mastodon
description: "Updates your Mastodon profile information and pictures."
related_actions:
  - mastodon.post
  - mastodon.get_account
  - mastodon.mute_account
  - mastodon.unmute_account
---

The **Update profile** action changes the information and pictures on your Mastodon profile.

This is handy when you want your profile to reflect what is happening at home, for example updating your bio with the current indoor temperature or swapping your header image with the season. You can update your display name, bio, pictures, and several profile settings.

{% include actions/ui_header.md %}

To update your profile from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Mastodon: Update profile**.
6. Select the **Mastodon account** to update and set the fields you want to change.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Mastodon account:
  description: The Mastodon account to update the profile of.
  required: true
Display name:
  description: The display name to set on your profile.
  required: false
Bio:
  description: The bio to set on your profile. You can mention other people or use hashtags.
  required: false
Profile picture:
  description: An image to set as your profile picture. WEBP, PNG, or JPG. At most 8 MB. Downscaled to 400x400px. Cannot be combined with deleting the profile picture.
  required: false
Delete profile picture:
  description: Permanently remove your current profile picture. Cannot be combined with setting a profile picture.
  required: false
Header picture:
  description: An image to set as your profile header. WEBP, PNG, or JPG. At most 8 MB. Downscaled to 1500x500px. Cannot be combined with deleting the header picture.
  required: false
Delete header picture:
  description: Permanently remove your current header picture. Cannot be combined with setting a header picture.
  required: false
Lock profile:
  description: Lock your profile. A locked profile requires you to approve followers and hides your posts from non-followers.
  required: false
Automated account:
  description: Signal to others that the account mainly performs automated actions.
  required: false
Discoverable:
  description: Whether your profile should be discoverable. Public posts and the profile may be featured or recommended across Mastodon.
  required: false
Extra fields:
  description: Up to four additional profile fields as name and value pairs, such as your homepage or pronouns. This replaces all existing fields, not just the ones you set here.
  required: false
Attribution domains:
  description: Websites allowed to credit you, which protects against false attributions. This replaces all existing attribution domains, not just the ones you set here.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `mastodon.update_profile`. A basic example looks like this:

{% example %}
action: |
  action: mastodon.update_profile
  data:
    config_entry_id: 6b4be47a1fa7c3764f14cf756dc9899d
    display_name: "Home Assistant"
    note: "Automated updates from my smart home."
{% endexample %}

To find the `config_entry_id`, go to {% my developer_services title="**Settings** > **Tools** > **Actions**" %}, select this action, choose your Mastodon account, and switch to YAML mode.

### Options in YAML

{% options_yaml %}
config_entry_id:
  description: >
    The ID of the Mastodon config entry to use.
  required: true
  type: string
display_name:
  description: >
    The display name to set on your profile.
  required: false
  type: string
note:
  description: >
    The bio to set on your profile. You can mention other people or use hashtags.
  required: false
  type: string
avatar:
  description: >
    An image to set as your profile picture. WEBP, PNG, or JPG. At most 8 MB.
    Downscaled to 400x400px. Cannot be combined with delete_avatar.
  required: false
  type: map
delete_avatar:
  description: >
    Permanently remove your current profile picture. Cannot be combined with
    avatar.
  required: false
  type: boolean
  default: false
header:
  description: >
    An image to set as your profile header. WEBP, PNG, or JPG. At most 8 MB.
    Downscaled to 1500x500px. Cannot be combined with delete_header.
  required: false
  type: map
delete_header:
  description: >
    Permanently remove your current header picture. Cannot be combined with
    header.
  required: false
  type: boolean
  default: false
locked:
  description: >
    Lock your profile. A locked profile requires you to approve followers and
    hides your posts from non-followers.
  required: false
  type: boolean
  default: false
bot:
  description: >
    Signal to others that the account mainly performs automated actions.
  required: false
  type: boolean
  default: false
discoverable:
  description: >
    Whether your profile should be discoverable. Public posts and the profile
    may be featured or recommended across Mastodon.
  required: false
  type: boolean
  default: false
fields:
  description: >
    Up to four additional profile fields as name and value pairs. This replaces
    all existing fields, not just the ones you set here.
  required: false
  type: list
attribution_domains:
  description: >
    Websites allowed to credit you, which protects against false attributions.
    This replaces all existing attribution domains, not just the ones you set
    here.
  required: false
  type: list
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
