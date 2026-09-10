---
title: Noonlight
description: Instructions on setting up the Noonlight emergency-dispatch integration.
ha_category:
  - Alarm
ha_release: "2026.7"
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@brentb2529'
ha_domain: noonlight
ha_integration_type: service
ha_platforms:
  - binary_sensor
  - sensor
---

The **Noonlight** {% term integration %} connects Home Assistant to [Noonlight](https://www.noonlight.com)'s emergency-services dispatch API, so your automations can request a real **police**, **fire**, or **medical** response. It pairs naturally with any `alarm_control_panel` entity but is not tied to a specific alarm integration.

{% important %}
This integration can summon **real emergency responders** to your address. A dispatch sent to the production environment can result in police, fire, or medical personnel being sent to your home, and false dispatches may incur fines from your local authorities.

Always test your automations against the **sandbox** environment first — it never alerts real responders. Selecting the production environment requires that you explicitly acknowledge a safety disclosure during setup.
{% endimportant %}

## Prerequisites

- A [Noonlight](https://www.noonlight.com) account.
- An API token from your Noonlight account portal. Use a long-lived token; it is stored by Home Assistant and used for every dispatch.
- A decision about which **environment** to target:
  - **Sandbox** — Noonlight's testing instance. Safe to experiment with; it never alerts real responders. Recommended while you build and test automations.
  - **Production** — reaches real responders. Requires the safety acknowledgment during setup.
  - **Custom** — point at your own base URL (advanced).

{% include integrations/config_flow.md %}

The setup flow collects the credentials and the caller details that are sent to Noonlight on every dispatch:

{% configuration_basic %}
API token:
    description: "Your Noonlight API token from your Noonlight account portal. It is stored by Home Assistant and used for every dispatch, so use a long-lived token."
Environment:
    description: "Which Noonlight environment to target: **Sandbox** (testing; never alerts real responders), **Production** (reaches real responders), or **Custom** (a base URL you provide). Your credentials are validated against the chosen environment before you continue."
Base URL:
    description: "Only for the *custom* environment: the base URL of the Noonlight API to use."
Name:
    description: "The caller name sent to responders."
Phone:
    description: "The caller phone number. It is validated and normalized to E.164 during setup (for example, `(202) 555-0142` becomes `+12025550142`) so a malformed value is caught now instead of during an emergency."
Address, city, state, and ZIP:
    description: "The dispatch location sent to responders. The state and ZIP are validated during setup (for example, `va` becomes `VA`)."
Site / location label:
    description: "Optional label for this property, used when you protect more than one site (see [Multiple properties](#multiple-properties))."
Default entry delay:
    description: "Grace window (0–120 seconds, default 30) before a dispatch fires, during which it can be canceled."
De-dup window:
    description: "Window (default 300 seconds) during which repeat dispatches for the same service are suppressed."
Granted services:
    description: "Which dispatch services (police, fire, or medical) this site is allowed to request."
{% endconfiguration_basic %}

When you select the production environment, a final **safety acknowledgment** step requires you to confirm that you understand the integration can summon real responders — and that false dispatches may incur fines — before the entry is created.

## Entities

Each configured site (config entry) exposes the following entities. Entity IDs include the site's slug, shown below as `<site>`.

| Entity | Type | Description |
| ------ | ---- | ----------- |
| `binary_sensor.noonlight_<site>_dispatch_pending` | Binary sensor | `on` during the cancelable entry-delay grace window. Use it to drive a CANCEL button in your dashboard. |
| `binary_sensor.noonlight_<site>_dispatch_active` | Binary sensor (safety) | `on` while a dispatch is live with Noonlight (responders requested). |
| `binary_sensor.noonlight_<site>_api_reachable` | Binary sensor (connectivity, diagnostic) | `on` while the [heartbeat](#heartbeat) confirms Noonlight is reachable and your token is valid. |
| `sensor.noonlight_<site>_dispatch_state` | Sensor (enum) | The single source of truth for dispatch state: `idle`, `pending`, `dispatched`, `canceled`, or `error`. |
| `sensor.noonlight_<site>_last_event` | Sensor (timestamp) | When the most recent state transition occurred; the event type is exposed as an attribute. |
| `sensor.noonlight_<site>_last_health_check` | Sensor (timestamp, diagnostic) | When the last successful heartbeat probe ran. |

## Actions

The integration registers the following {% term actions %}. The dispatch actions begin the [dispatch lifecycle](#dispatch-lifecycle): after the entry delay elapses, the alarm is sent to Noonlight using the caller and location you configured.

When more than one site is configured, set the optional `account` field on any action to the config entry's title or ID to target a specific site. With a single site configured, you can omit it.

### Action `noonlight.dispatch_police`

Request a police dispatch through Noonlight.

| Data attribute | Optional | Description |
| -------------- | -------- | ----------- |
| `entry_delay_seconds` | yes | Grace window (0–120 seconds) before the dispatch actually fires, during which it can be canceled. Set `0` to skip. Defaults to the site's configured entry delay. |
| `instructions` | yes | Free-text context sent to responders, for example which sensor triggered the alarm. Supports templates, such as {% raw %}`Triggered by {{ trigger.to_state.name }}`{% endraw %}. |
| `account` | yes | Config entry ID or title. Optional when only one site is configured. |

### Action `noonlight.dispatch_fire`

Request a fire dispatch through Noonlight. Accepts the same `entry_delay_seconds`, `instructions`, and `account` data attributes as the `noonlight.dispatch_police` action.

### Action `noonlight.dispatch_medical`

Request a medical dispatch through Noonlight. Accepts the same `entry_delay_seconds`, `instructions`, and `account` data attributes as the `noonlight.dispatch_police` action.

### Action `noonlight.dispatch_all`

Request police, fire, and medical in a single alarm. Accepts the same `entry_delay_seconds`, `instructions`, and `account` data attributes as the `noonlight.dispatch_police` action.

### Action `noonlight.cancel`

Abort a pending dispatch, or signal Noonlight that an active dispatch is a false alarm. If canceled **before** the entry-delay timer fires, no network call is made to Noonlight. If canceled **after** the dispatch has fired, a cancel is posted to Noonlight, which decides whether responders are recalled.

| Data attribute | Optional | Description |
| -------------- | -------- | ----------- |
| `reason` | yes | Free-text reason recorded in the audit log. |
| `account` | yes | Config entry ID or title. Optional when only one site is configured. |

### Action `noonlight.test_dispatch`

Fire a no-op round-trip against Noonlight's **sandbox**. This confirms your credentials and connectivity without alerting real responders, even when the site runs in production.

| Data attribute | Optional | Description |
| -------------- | -------- | ----------- |
| `account` | yes | Config entry ID or title. Optional when only one site is configured. |

## Dispatch lifecycle

```text
idle ──dispatch_*──> pending ──(entry-delay timer)──> dispatched ──(cleared)──> idle
                       │
                       └──cancel──> canceled ──> idle
```

- A `cancel` during the **pending** window stops the timer and never contacts Noonlight.
- A `cancel` after the dispatch has fired posts a cancel to Noonlight.
- While a dispatch is `dispatched`, Home Assistant polls Noonlight for the alarm's status and returns to `idle` once Noonlight reports it is resolved, canceled, or completed.

## Options

{% include integrations/option_flow.md %}

| Option | Description |
| ------ | ----------- |
| Default entry delay | Grace window (in seconds) before a dispatch fires when an action does not specify one. Cancelable during this time. Default 30. |
| De-dup window | After a dispatch fires, repeat dispatches for the same service within this window (in seconds) are ignored, so an oscillating alarm cannot fire repeatedly. Default 300. |
| Granted services | Which dispatch services (police, fire, medical) are available for this site. |
| Heartbeat interval | How often to silently verify Noonlight is reachable and your token is valid (0–1440 minutes; **0 disables it**). Default 60. |

{% note %}
Caller, address, and site-label changes are **not** made in the options — they change what is sent to responders, so they are handled by the [Reconfigure](#reconfigure) action instead.
{% endnote %}

## Reconfigure

To edit the caller details, address, or [site label](#multiple-properties) sent to Noonlight, use the **Reconfigure** action on the integration entry (**Settings** > **Devices & services** > **Noonlight** > the entry's menu > **Reconfigure**). The phone number, state, and ZIP are re-validated, and you do not need to delete and re-add the entry.

## Heartbeat

While idle, the integration periodically runs a side-effect-free probe against Noonlight to confirm the API is reachable and your token is still valid — so a broken token or connectivity problem is caught **before** an emergency rather than during one.

The result drives the `api_reachable` binary sensor and the `last_health_check` sensor. After repeated consecutive failures the integration raises a [Repair issue](#troubleshooting): an authentication failure also starts reauthentication, prompting you to paste a fresh token without re-entering your address. Once the probe succeeds again, the Repair issue clears automatically.

{% note %}
Noonlight's Dispatch API has no dedicated health endpoint, so the probe is a harmless read of a non-existent alarm and returns a `404`. That `404` is the **healthy** signal — it means the request reached Noonlight, the endpoint exists, and your token was accepted (a revoked token returns `401`; an outage returns a connection error or `5xx`). It is expected and is not an error against your account. Raise the interval to reduce how often it runs, or set it to `0` to disable the heartbeat entirely.
{% endnote %}

## Multiple properties

To protect more than one property, add **one config entry per site**. Set the optional **site / location label** during setup (or later via [Reconfigure](#reconfigure)) to a name like `Site A` or `Lake House`. The label is sent to Noonlight as the alarm's `owner_id` and is prepended to the responder instructions, so you can tell which property raised an alarm. Leave it blank if you only have a single site.

## Examples

### Dispatch police when an alarm trips

```yaml
automation:
  - alias: "Intrusion - Noonlight police"
    triggers:
      - trigger: state
        entity_id: binary_sensor.front_door_glass_break
        to: "on"
    actions:
      - action: noonlight.dispatch_police
        data:
          entry_delay_seconds: 30
          instructions: "Triggered by {{ trigger.to_state.name }}"
```

### Cancel a pending dispatch when the panel is disarmed

```yaml
automation:
  - alias: "Disarm during entry delay - cancel Noonlight"
    triggers:
      - trigger: state
        entity_id: alarm_control_panel.home
        to: "disarmed"
    conditions:
      - condition: state
        entity_id: binary_sensor.noonlight_jane_doe_dispatch_pending
        state: "on"
    actions:
      - action: noonlight.cancel
        data:
          reason: "Panel disarmed during entry delay"
```

## Troubleshooting

The integration surfaces failures as Home Assistant [Repair issues](/integrations/repairs/):

- **Authentication failed** — Noonlight rejected the API token. Use the reauthentication prompt to paste a new token; your address and other details are kept.
- **Cannot reach Noonlight** — Home Assistant could not reach the API. Check your network and (for the custom environment) your base URL.
- **Unexpected Noonlight response** — Noonlight returned a response Home Assistant did not understand. Check the logs and the Noonlight status page.
- **A dispatch seems ignored** — Repeat dispatches for the same service inside the [de-dup window](#options) are intentionally suppressed; look for a warning in the logs.

Running the [`noonlight.test_dispatch`](#action-noonlighttest_dispatch) action is a safe way to confirm a credential or connectivity problem without alerting responders.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
