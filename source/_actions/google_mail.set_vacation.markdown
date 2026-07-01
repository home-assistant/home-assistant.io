---
title: "Set vacation"
action: google_mail.set_vacation
domain: google_mail
description: "Sets the vacation auto-responder for a Google Mail account."
---

Use this action to set the vacation auto-responder for your Google Mail account. You can set the subject and message of the automatic reply, choose when it starts and ends, and limit who receives it.

This is handy in automations, for example to turn on your out-of-office reply when a vacation calendar event starts and turn it off again when you return.

{% include actions/ui_header.md %}

To set the vacation responder from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select your Google Mail account.
6. From the actions shown for that target, select **Set vacation**.
7. Turn **Enabled** on and enter a **Message**. Optionally, set a **Title**, a **Start** and **End** date, and the other options.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Enabled:
  description: Turn this on to start vacation responses, or off to end them.
  required: true
Message:
  description: The body of the automatic reply email.
  required: true
Title:
  description: The subject for the automatic reply email.
  required: false
Plain text:
  description: Choose whether to send the message as plain text or HTML.
  required: false
Restrict to contacts:
  description: Restrict the automatic reply to your contacts only.
  required: false
Restrict to domain:
  description: Restrict the automatic reply to your domain only. This only affects Google Workspace accounts.
  required: false
Start:
  description: The first day of the vacation.
  required: false
End:
  description: The last day of the vacation.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `google_mail.set_vacation`. A basic example looks like this:

{% example %}
action: |
  action: google_mail.set_vacation
  target:
    entity_id: sensor.example_gmail_com_vacation_end_date
  data:
    enabled: true
    title: "On vacation"
    message: "I am on vacation and will reply when I am back."
{% endexample %}

This turns on the vacation responder with the given subject and message.

### Options in YAML

{% options_yaml %}
enabled:
  description: >
    Turn this on to start vacation responses, or off to end them.
  required: true
  type: boolean
  default: true
message:
  description: >
    The body of the automatic reply email.
  required: true
  type: string
title:
  description: >
    The subject for the automatic reply email.
  required: false
  type: string
plain_text:
  description: >
    Choose whether to send the message as plain text or HTML.
  required: false
  type: boolean
  default: true
restrict_contacts:
  description: >
    Restrict the automatic reply to your contacts only.
  required: false
  type: boolean
  default: false
restrict_domain:
  description: >
    Restrict the automatic reply to your domain only. This only affects
    Google Workspace accounts.
  required: false
  type: boolean
  default: false
start:
  description: >
    The first day of the vacation.
  required: false
  type: string
end:
  description: >
    The last day of the vacation.
  required: false
  type: string
{% endoptions_yaml %}

{% include actions/targets.md %}

## Good to know

- To end the vacation responses, call this action again with **Enabled** turned off.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
