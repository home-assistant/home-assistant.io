---
title: "Set blackout"
action: kiosker.blackout_set
domain: kiosker
description: "Show or hide a blackout overlay on the Kiosker device, optionally with a message, icon, and dismiss button."
since: "2026.5"
related_actions:
  - kiosker.navigate_url
---

The **Set blackout** action displays a full-screen overlay on your Kiosker device. Use it to show a status message, hide the screen during a meeting, or block the display until a condition clears. You can customize the overlay with a message, icon, colors, and a dismiss button.

To hide the overlay again, call this action with **Visible** turned off, or use the **Clear blackout** button entity in the UI.

{% include actions/ui_header.md %}

To display a blackout overlay from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Kiosker: Set blackout**.
6. Under **Device**, select your Kiosker device.
7. Toggle **Visible** on to show the overlay, or off to hide it.
8. _Optional_: add a message, custom colors, an icon, or a dismiss button.
9. Select **Save**.

### Options in the UI

{% options_ui %}
Device:
  description: The Kiosker device to apply the blackout overlay to.
  required: true
Visible:
  description: Whether to show or hide the blackout overlay. Defaults to on.
  required: false
Text:
  description: A message to display on the overlay.
  required: false
Background:
  description: Background color of the overlay in RGB format, for example `[10, 10, 60]`. Defaults to black.
  required: false
Foreground:
  description: Text color of the overlay in RGB format. Defaults to white.
  required: false
Icon:
  description: An icon to show on the overlay. Enter the SF Symbols name of the icon, for example `person.2.fill`.
  required: false
Expire:
  description: How long, in seconds, the overlay stays visible before disappearing automatically. Set to `0` to keep it visible until cleared manually. Defaults to 60 seconds.
  required: false
Dismissible:
  description: When enabled, a button appears on the overlay so the user can dismiss it by tapping. Defaults to off.
  required: false
Button background:
  description: Background color of the dismiss button in RGB format. Defaults to white.
  required: false
Button foreground:
  description: Text color of the dismiss button in RGB format. Defaults to black.
  required: false
Button text:
  description: Label of the dismiss button.
  required: false
Sound:
  description: A sound to play when the overlay appears. Enter the SystemSoundID number, for example `1007`.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `kiosker.blackout_set`. A basic example looks like this:

{% example %}
action: |
  action: kiosker.blackout_set
  data:
    device_id: YOUR_DEVICE_ID
    visible: true
    text: "Be right back"
    expire: 300
{% endexample %}

### Options in YAML

{% options_yaml %}
device_id:
  description: >
    The ID of the Kiosker device to apply the blackout overlay to.
  required: true
  type: string
visible:
  description: >
    Whether to show or hide the blackout overlay.
  required: false
  type: boolean
  default: true
text:
  description: >
    A message to display on the blackout overlay.
  required: false
  type: string
background:
  description: >
    Background color of the overlay in RGB format. A list of three integers between 0 and 255 representing red, green, and blue. Defaults to black (`[0, 0, 0]`).
  required: false
  type: list
foreground:
  description: >
    Text color of the overlay in RGB format. A list of three integers between 0 and 255 representing red, green, and blue. Defaults to white (`[255, 255, 255]`).
  required: false
  type: list
icon:
  description: >
    An icon to display on the overlay. Enter the SF Symbols name, for example `person.2.fill`.
  required: false
  type: string
expire:
  description: >
    How long, in seconds, the overlay stays visible before disappearing automatically. Use `0` to keep it visible until cleared manually. Maximum is 3600 seconds.
  required: false
  type: integer
  default: 60
dismissible:
  description: >
    Whether the user can dismiss the overlay by tapping a button.
  required: false
  type: boolean
  default: false
button_background:
  description: >
    Background color of the dismiss button in RGB format. A list of three integers between 0 and 255 representing red, green, and blue. Defaults to white (`[255, 255, 255]`).
  required: false
  type: list
button_foreground:
  description: >
    Text color of the dismiss button in RGB format. A list of three integers between 0 and 255 representing red, green, and blue. Defaults to black (`[0, 0, 0]`).
  required: false
  type: list
button_text:
  description: >
    Label of the dismiss button.
  required: false
  type: string
sound:
  description: >
    A sound to play when the overlay appears, identified by its SystemSoundID number, for example `"1007"`.
  required: false
  type: string
{% endoptions_yaml %}

## Good to know

- The overlay covers everything on the screen, including the browser and any content underneath.
- If `expire` is set, the overlay disappears automatically after the specified number of seconds. Showing a new overlay always resets this timer.
- To clear an active blackout, call this action again with `visible: false`. You can also use the **Clear blackout** button entity from the Kiosker device page in Home Assistant.
- SF Symbols is an icon library for Apple devices. You can browse available icons at the [Apple SF Symbols page](https://developer.apple.com/sf-symbols/).
- SystemSoundID is a number that identifies a system sound in iOS. You can browse available IDs in the [iOS system sounds library](https://github.com/TUNER88/iOSSystemSoundsLibrary).

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Action: show a dismissible overlay with custom colors

Show a styled overlay the user can tap away when ready.

- **Action**: Kiosker: Set blackout
- **Device**: Meeting room display
- **Visible**: on
- **Text**: Meeting in progress
- **Background**: [10, 10, 60]
- **Icon**: person.2.fill
- **Expire**: 3600
- **Dismissible**: on
- **Button text**: Dismiss

{% details "YAML example for a dismissible overlay with custom colors" %}

{% example %}
action: |
  action: kiosker.blackout_set
  data:
    device_id: YOUR_DEVICE_ID
    visible: true
    text: "Meeting in progress"
    background:
      - 10
      - 10
      - 60
    foreground:
      - 255
      - 255
      - 255
    icon: "person.2.fill"
    expire: 3600
    dismissible: true
    button_background:
      - 255
      - 255
      - 255
    button_foreground:
      - 10
      - 10
      - 60
    button_text: "Dismiss"
    sound: "1007"
{% endexample %}

{% enddetails %}

### Automation: black out the display when no one is home

When everyone leaves, cover the screen so the display is not showing anything while the house is empty.

- **Trigger**: All people: Away
- **Action**: Kiosker: Set blackout
- **Device**: Living room kiosk
- **Visible**: on
- **Expire**: 0

{% details "YAML example for blacking out when no one is home" %}

{% example %}
automation: |
  alias: "Black out display when no one is home"
  triggers:
    - trigger: state
      entity_id: group.all_persons
      to: "not_home"
  actions:
    - action: kiosker.blackout_set
      data:
        device_id: YOUR_DEVICE_ID
        visible: true
        expire: 0
{% endexample %}

{% enddetails %}

### Automation: clear the blackout when someone arrives home

When the first person gets home, remove the overlay and restore the normal display.

- **Trigger**: Person: Arrives home
- **Action**: Kiosker: Set blackout
- **Device**: Living room kiosk
- **Visible**: off

{% details "YAML example for clearing the blackout on arrival" %}

{% example %}
automation: |
  alias: "Clear kiosk blackout on arrival"
  triggers:
    - trigger: state
      entity_id: group.all_persons
      to: "home"
  actions:
    - action: kiosker.blackout_set
      data:
        device_id: YOUR_DEVICE_ID
        visible: false
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
