---
title: "Pause protection"
action: adguard.pause_protection
domain: adguard
description: "Pauses protection in AdGuard Home for a duration, after which AdGuard Home enables it again."
related_actions:
  - adguard.refresh
  - adguard.add_url
  - adguard.remove_url
  - adguard.enable_url
  - adguard.disable_url
---

The **AdGuard Home: Pause protection** action turns off AdGuard Home protection for a set amount of time. When that time is up, AdGuard Home turns protection back on by itself.

This is useful when a website or app doesn't work correctly because AdGuard Home blocks something it needs. For example, a checkout page, a sign-in link in an email, or a streaming app might need a few minutes without blocking. Pausing protection means you don't have to remember to turn it back on afterward. To turn protection off or on without a time limit, use the **Protection** switch instead.

{% include actions/ui_header.md %}

To pause protection from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **AdGuard Home: Pause protection**.
6. Enter the **Duration** for how long protection should stay paused.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label. Only users with administrator rights can run this action.

### Options in the UI

{% options_ui %}
Duration:
  description: How long to pause protection for. The duration must be at least 1 second.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `adguard.pause_protection`. A basic example looks like this:

{% example %}
action: |
  action: adguard.pause_protection
  data:
    duration: "00:30:00"
{% endexample %}

This pauses AdGuard Home protection for 30 minutes.

### Options in YAML

{% options_yaml %}
duration:
  description: >
    How long to pause protection for. The duration must be at least 1 second.
    For a list of all accepted formats, refer to
    [Durations in automations and scripts](/docs/automation/durations/).
  required: true
  type: [string, integer, map]
{% endoptions_yaml %}

## Good to know

- If you have more than one AdGuard Home instance set up in Home Assistant, this action pauses protection on all of them.
- While protection is paused, the **Protection** switch shows as off. It turns back on when AdGuard Home resumes protection.
- To resume protection before the duration ends, turn on the **Protection** switch.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: pause protection from a dashboard button

Give everyone in your home a quick way to pause blocking for 10 minutes when a website doesn't load correctly. This example uses a button {% term helper %}, which you need to create separately and can add to your dashboard.

- **Trigger**: State changed
  - **Entity**: Pause ad blocking button
- **Action**: AdGuard Home: Pause protection
  - **Duration**: 00:10:00

{% details "YAML example for pausing protection from a button" %}

{% example %}
automation: |
  alias: "Pause AdGuard Home protection from a button"
  triggers:
    - trigger: state
      entity_id: input_button.pause_ad_blocking
  actions:
    - action: adguard.pause_protection
      data:
        duration:
          minutes: 10
{% endexample %}

{% enddetails %}

### Automation: pause protection and send a notification

When protection is paused, send a notification to your phone so you know blocking is off and when it comes back on. This example uses the same user-created button helper.

- **Trigger**: State changed
  - **Entity**: Pause ad blocking button
- **Action**: AdGuard Home: Pause protection
  - **Duration**: 00:15:00
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for pausing protection with a notification" %}

{% example %}
automation: |
  alias: "Pause AdGuard Home protection and notify"
  triggers:
    - trigger: state
      entity_id: input_button.pause_ad_blocking
  actions:
    - action: adguard.pause_protection
      data:
        duration:
          minutes: 15
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: >
          AdGuard Home protection is paused for 15 minutes.
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
