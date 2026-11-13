---
description: Instructions on how to integrate TRMNL with Home Assistant.
ha_release: 2026.4
ha_domain: trmnl
---

The **TRMNL** {% term integration %} allows you to monitor your [TRMNL](https://usetrmnl.com/) e-paper (e-ink) displays in Home Assistant. TRMNL devices are low-power e-ink displays that show content such as calendars, weather, and custom dashboards at a glance.

With this integration, you can track the battery level of your TRMNL devices and automate your home around them. For example, you could get a notification when the battery is running low, or align the sleep schedule of your display with your own. You can also show the state of your home on your display, and send messages to it from your automations.

## Supported devices

The following TRMNL hardware devices are supported:

- TRMNL (OG)
- TRMNL (X)

## Prerequisites

You need a TRMNL account with at least one device, and a TRMNL developer license.

{% include integrations/config_flow.md %}

When you add the integration, Home Assistant sends you to trmnl.com to sign in. TRMNL then asks what Home Assistant may do with your account:

- **Read your devices** and **Change your device settings** are required. Without them, setup stops and asks you to sign in again.
- **Change your markup, plugin settings, playlists and mashups** is needed to show your home or messages on TRMNL. You can leave it unticked if you only want the device entities.
- **See and change your name** is optional. With it, the integration uses your TRMNL name as the name of the entry.
- **Delete plugin settings** is optional. With it, removing the integration also removes the plugins it created on your TRMNL account.

You can revoke this access at any time under **Connected agents** on [your TRMNL account page](https://trmnl.com/account).

If you set up the integration with an API key in an earlier version of Home Assistant, you don't need to do anything. Home Assistant moves your setup to the trmnl.com sign-in by itself, without asking you to sign in again.

## Reconfiguration

To grant access you left unticked when you signed in, such as **Change your markup, plugin settings, playlists and mashups**, sign in again without removing the integration:

1. Go to {% my integrations title="**Settings** > **Devices & services**" %}.
2. On the **TRMNL** integration, select the three dots {% icon "mdi:dots-vertical" %} menu and select **Reconfigure**.
3. Sign in to the same TRMNL account and tick the access you want to grant.

{% include integrations/option_flow.md %}

{% configuration_basic %}
Entities to show:
    description: "The entities to show on your TRMNL display. Leave it empty to show nothing. For details, see [Show your home on TRMNL](#show-your-home-on-trmnl)."
{% endconfiguration_basic %}

## Supported functionality

The **TRMNL** integration provides the following entities for each TRMNL device on your account.

### Sensors

- **Battery**: The current battery level of the device, in percent.
- **Battery voltage**: The current battery voltage of the device, in volts (V). This entity is [disabled by default](/docs/configuration/customizing-entities/#disabling-or-enabling-an-entity).
- **Signal strength**: The raw Wi-Fi received signal strength indicator (RSSI) of the device, in dBm. This entity is disabled by default.
- **Wi-Fi strength**: The Wi-Fi connection quality of the device, shown as a percentage derived from the RSSI value. This entity is disabled by default.

### Switches

- **Sleep mode**: Enables or disables the sleep schedule on the device. When enabled, the device will sleep between the **Sleep start time** and **Sleep end time**.

### Time

- **Sleep start time**: The time at which the device enters sleep mode.
- **Sleep end time**: The time at which the device wakes up from sleep mode.

### Notify

The integration also provides one notify entity for your TRMNL account.

- **Message**: Shows a message full screen on your TRMNL display. Use it with the **Send a notification message** (`notify.send_message`) action, with a title and a message. The first message creates a private plugin called "Home Assistant messages" on your TRMNL account. Add that plugin to a playlist on trmnl.com once to see your messages. If you delete the plugin on trmnl.com, the next message creates it again.

Sending a message needs **Change your markup, plugin settings, playlists and mashups**. Without it, the action fails and Home Assistant asks you to sign in again.

## Show your home on TRMNL

The integration can show the state of your home on your TRMNL display: your lights, switches, climate, covers, locks, sensors, and more. TRMNL draws it with its Homey plugin, so the Homey recipes on trmnl.com work with it too.

To pick what to show:

1. Go to {% my integrations title="**Settings** > **Devices & services**" %} and select **TRMNL**.
2. Select the cogwheel {% icon "mdi:cog-outline" %}.
3. Under **Entities to show**, pick the entities you want on your display.
4. Select **Submit**.

The first time, Home Assistant creates a plugin on your TRMNL account, named after your home. Add it, or a Homey recipe, to a playlist on trmnl.com.

Picking entities needs **Change your markup, plugin settings, playlists and mashups**. If you did not grant it, Home Assistant asks you to sign in again with it ticked.

To stop, remove all entities from **Entities to show**. Home Assistant then sends an empty home once, so your display no longer shows the old one.

### What is sent to TRMNL

Nothing is sent until you pick at least one entity. After that, only the entities you pick leave Home Assistant, together with the names of their areas. For each one, Home Assistant sends its name or the name of its device, its area, and its current state. Entities on the same device show as one device on TRMNL.

### When it is sent

Home Assistant sends your home when it starts, every 5 minutes, and about a minute after a picked entity changes. It sends at most once a minute, and skips a send when nothing changed.

## TRMNL automation examples

{% include docs/paste_yaml_tip.md %}

### Automation: Send a notification when the battery is low

This automation sends a notification to your phone when the battery level of your TRMNL device drops below 20%.

- **Trigger**: Numeric state
  - **Target**: TRMNL Battery (`sensor.your_trmnl_battery`)
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "Example YAML configuration" %}

```yaml
alias: "Notify when TRMNL battery is low"
description: >
  Send a notification when the TRMNL battery level
  drops below 20%.
triggers:
  - trigger: numeric_state
    entity_id: sensor.your_trmnl_battery
    below: 20
actions:
  - action: notify.send_message
    target:
      entity_id: notify.my_device
    data:
      title: "TRMNL battery low"
      message: "Your TRMNL battery is below 20%. Time to charge it."
```

{% enddetails %}

### Automation: Show a message on TRMNL when the washing machine is done

This automation shows a message on your TRMNL display when your washing machine finishes.

- **Trigger**: State
  - **Target**: Washing machine status (`sensor.washing_machine_status`)
- **Action**: Send a notification message
  - **Target**: TRMNL Message (`notify.trmnl_message`)

{% details "Example YAML configuration" %}

```yaml
alias: "Show washing done on TRMNL"
triggers:
  - trigger: state
    entity_id: sensor.washing_machine_status
    to: "done"
actions:
  - action: notify.send_message
    target:
      entity_id: notify.trmnl_message
    data:
      title: "Washing machine"
      message: "The wash is done. Hang it up before it creases."
```

{% enddetails %}

## Data updates

The integration {% term polling polls %} the TRMNL API every hour to update the device and entity states, including sensor readings and the **Sleep mode** switch.

When you show your home on TRMNL, Home Assistant also sends data to TRMNL. For details, see [When it is sent](#when-it-is-sent).

## Known limitations

- Your home is drawn by TRMNL's Homey plugin, so its title bar says "Homey".
- Entities without an area show as "Unzoned".

## Troubleshooting

### Symptom: "Home Assistant needs to read and change your TRMNL devices"

Setup stops after you sign in on trmnl.com.

#### Description

You unticked **Read your devices** or **Change your device settings** on the TRMNL sign-in page.

#### Resolution

Add the integration again and keep both ticked.

### Symptom: "TRMNL no longer accepts the API key this entry was set up with"

The integration does not load after you update Home Assistant.

#### Description

Home Assistant tried to move your entry from the API key to the trmnl.com sign-in, but TRMNL refused the key. This happens when the key no longer works, for example after you reset it on trmnl.com.

#### Resolution

Remove the TRMNL integration and add it again to sign in.

### Symptom: Home Assistant asks you to sign in to TRMNL again

#### Description

Showing your home or sending a message needs **Change your markup, plugin settings, playlists and mashups**. You did not grant it when you signed in, or you signed in again later without it.

#### Resolution

Finish the sign-in from the TRMNL integration and tick **Change your markup, plugin settings, playlists and mashups**.

## Removing the integration

This integration follows standard integration removal. If you granted **Delete plugin settings** when you signed in, removing the integration also removes the plugins it created on your TRMNL account. If you did not, delete them yourself on trmnl.com.

{% include integrations/remove_device_service.md %}
