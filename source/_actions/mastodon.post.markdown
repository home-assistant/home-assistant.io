---
title: "Post"
action: mastodon.post
domain: mastodon
description: "Posts a status on your Mastodon account."
related_actions:
  - mastodon.get_account
  - mastodon.update_profile
  - mastodon.mute_account
  - mastodon.unmute_account
---

The **Post** action publishes a status to your Mastodon account.

This is handy when you want Home Assistant to share something automatically, for example posting your local weather station readings each morning or announcing when your solar panels hit a production milestone. You can attach media, add a content warning, and control who sees the post.

{% include actions/ui_header.md %}

To post a status from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Mastodon: Post**.
6. Select the **Mastodon account** to post to and enter the **Status**. Set any optional fields you need.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Mastodon account:
  description: The Mastodon account to post to.
  required: true
Status:
  description: The status text to post.
  required: true
Visibility:
  description: "The visibility of the post: public, unlisted, private, or direct. If omitted, your account's default visibility is used."
  required: false
Who can quote:
  description: "Who can quote this post: public, followers, or nobody. Ignored if the visibility is private or direct."
  required: false
Idempotency key:
  description: A unique key for this post. Subsequent posts with the same key are ignored by your Mastodon instance for up to one hour, which prevents duplicates.
  required: false
Content warning:
  description: Text shown as a warning before the status text. If omitted, no warning is displayed.
  required: false
Language:
  description: The language of the post. If omitted, your Mastodon account preference is used.
  required: false
Media:
  description: An image or video to attach to the post.
  required: false
Media description:
  description: A description of the attached media for people with visual impairments.
  required: false
Media warning:
  description: Mark the attached media as sensitive.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `mastodon.post`. A basic example looks like this:

{% example %}
action: |
  action: mastodon.post
  data:
    config_entry_id: 6b4be47a1fa7c3764f14cf756dc9899d
    status: "A toot from Home Assistant"
{% endexample %}

To find the `config_entry_id`, go to **Developer tools** > **Actions**, select this action, choose your Mastodon account, and switch to YAML mode.

### Options in YAML

{% options_yaml %}
config_entry_id:
  description: >
    The ID of the Mastodon config entry to use.
  required: true
  type: string
status:
  description: >
    The status text to post.
  required: true
  type: string
visibility:
  description: >
    The visibility of the post: public, unlisted, private, or direct. If
    omitted, your account's default visibility is used.
  required: false
  type: string
quote_approval_policy:
  description: >
    Who can quote this post: public, followers, or nobody. Ignored if the
    visibility is private or direct.
  required: false
  type: string
idempotency_key:
  description: >
    A unique key for this post. Subsequent posts with the same key are ignored
    by your Mastodon instance for up to one hour, which prevents duplicates.
  required: false
  type: string
content_warning:
  description: >
    Text shown as a warning before the status text. If omitted, no warning is
    displayed.
  required: false
  type: string
language:
  description: >
    The language of the post. If omitted, your Mastodon account preference is
    used.
  required: false
  type: string
media:
  description: >
    An image or video to attach to the post.
  required: false
  type: string
media_description:
  description: >
    A description of the attached media for people with visual impairments.
  required: false
  type: string
media_warning:
  description: >
    Mark the attached media as sensitive.
  required: false
  type: boolean
  default: false
{% endoptions_yaml %}

{% note %}
Mastodon holds idempotency keys for up to one hour. The exact timeframe is controlled by your Mastodon instance, not Home Assistant. If you do not set an idempotency key, the post is published without any duplicate check.
{% endnote %}

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Post a private status

This posts a status that only your followers can see, because the visibility is set to `private`.

{% details "YAML example for a private post" %}

{% example %}
action: |
  action: mastodon.post
  data:
    config_entry_id: 6b4be47a1fa7c3764f14cf756dc9899d
    status: "A private toot from Home Assistant"
    visibility: private
{% endexample %}

{% enddetails %}

### Post with media, a description, and a content warning

This posts a status with an attached image, a media description, a content warning, and an `unlisted` visibility so it does not appear in the public timeline.

{% details "YAML example for a media post with a content warning" %}

{% example %}
action: |
  action: mastodon.post
  data:
    config_entry_id: 6b4be47a1fa7c3764f14cf756dc9899d
    status: "A media toot from Home Assistant"
    visibility: unlisted
    media: /config/www/funny_meme.png
    media_description: "A funny meme"
    content_warning: "This might not be funny enough"
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
