---
title: "Navigate to URL"
action: kiosker.navigate_url
domain: kiosker
description: "Navigate your Kiosker device to a specific URL."
since: "2026.5"
related_actions:
  - kiosker.blackout_set
---

The **Navigate to URL** action opens a specific web page on your Kiosker device. Use it in automations to display a page based on time, presence, sensor readings, or any other trigger.

{% include actions/ui_header.md %}

To navigate a Kiosker device to a URL from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Kiosker: Navigate to URL**.
6. Under **Device**, select your Kiosker device.
7. Enter the URL to navigate to.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Device:
  description: The Kiosker device to navigate.
  required: true
URL:
  description: The web address to open on the device.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `kiosker.navigate_url`. A basic example looks like this:

{% example %}
action: |
  action: kiosker.navigate_url
  data:
    device_id: YOUR_DEVICE_ID
    url: "https://www.home-assistant.io"
{% endexample %}

### Options in YAML

{% options_yaml %}
device_id:
  description: >
    The ID of the Kiosker device to navigate.
  required: true
  type: string
url:
  description: >
    The web address to navigate to.
  required: true
  type: string
{% endoptions_yaml %}

## Good to know

- If the screensaver is active when this action fires, navigating to a URL does not dismiss it automatically.
- You can navigate to any valid URL, including local pages on your Home Assistant instance.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: show a welcome screen when someone arrives home

When a household member arrives, navigate the hallway display to a personalized welcome page.

- **Trigger**: Person: Arrives home
- **Action**: Kiosker: Navigate to URL
- **Device**: Hallway display
- **URL**: `https://homeassistant.local/lovelace/welcome`

{% details "YAML example for showing a welcome screen on arrival" %}

{% example %}
automation: |
  alias: "Show welcome screen on arrival"
  triggers:
    - trigger: state
      entity_id: person.jane
      to: "home"
  actions:
    - action: kiosker.navigate_url
      data:
        device_id: YOUR_DEVICE_ID
        url: "https://homeassistant.local/lovelace/welcome"
{% endexample %}

{% enddetails %}

### Automation: return to home dashboard at night

After 10 PM, navigate your kiosk back to the home dashboard so it always shows the right page in the morning.

- **Trigger**: Time: 22:00
- **Action**: Kiosker: Navigate to URL
- **Device**: Living room kiosk
- **URL**: `https://homeassistant.local/lovelace/home`

{% details "YAML example for returning to the home dashboard at night" %}

{% example %}
automation: |
  alias: "Return kiosk to home dashboard at night"
  triggers:
    - trigger: time
      at: "22:00:00"
  actions:
    - action: kiosker.navigate_url
      data:
        device_id: YOUR_DEVICE_ID
        url: "https://homeassistant.local/lovelace/home"
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
