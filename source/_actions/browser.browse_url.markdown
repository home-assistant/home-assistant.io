---
title: "Browse URL"
action: browser.browse_url
domain: browser
description: "Opens a URL in the default browser on the machine running Home Assistant."
---

Use this action to open a web page in the default browser on the machine that runs Home Assistant. This is useful for setups where Home Assistant runs on a computer connected to a screen, for example a wall-mounted dashboard or a kiosk, and you want an automation to bring up a specific page.

The URL opens on the host machine, not on the device you are using to view Home Assistant.

{% include actions/ui_header.md %}

To open a URL from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Browser: Browse URL**.
6. In the **URL** field, enter the web address you want to open.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
URL:
  description: The web address to open in the default browser on the machine running Home Assistant.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `browser.browse_url`. A basic example looks like this:

{% example %}
action: |
  action: browser.browse_url
  data:
    url: "https://www.home-assistant.io"
{% endexample %}

This opens the Home Assistant website in the default browser on the host machine.

### Options in YAML

{% options_yaml %}
url:
  description: The web address to open in the default browser on the machine running Home Assistant.
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}
