---
title: "Set profile"
action: vallox.set_profile
domain: vallox
description: "Activates a ventilation profile on a Vallox unit, optionally for a set duration."
related_actions:
  - vallox.set_profile_fan_speed_home
  - vallox.set_profile_fan_speed_away
  - vallox.set_profile_fan_speed_boost
---

Use this action to activate a ventilation profile on your Vallox unit, and optionally set how long it stays active.

{% include actions/ui_header.md %}

To set the profile from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Search for and select **Vallox: Set profile**.
6. Set the **Profile**, and optionally a **Duration**.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Profile:
  description: "The profile to activate: `home`, `away`, `boost`, `fireplace`, or `extra`."
  required: true
Duration:
  description: "How long to keep the profile active, in minutes, between 1 and 65535. Only applies to the `boost`, `fireplace`, and `extra` profiles. A value of 65535 activates the profile without a timeout."
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `vallox.set_profile`. A basic example looks like this:

{% example %}
action: |
  action: vallox.set_profile
  data:
    profile: boost
    duration: 30
{% endexample %}

This activates the Boost profile for 30 minutes.

### Options in YAML

{% options_yaml %}
profile:
  description: "The profile to activate: `home`, `away`, `boost`, `fireplace`, or `extra`."
  required: true
  type: string
duration:
  description: "How long to keep the profile active, in minutes, between 1 and 65535. Only applies to the `boost`, `fireplace`, and `extra` profiles. A value of 65535 activates the profile without a timeout."
  required: false
  type: integer
{% endoptions_yaml %}

This action does not support targets.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
