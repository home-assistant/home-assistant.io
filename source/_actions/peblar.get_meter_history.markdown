---
title: "Get meter history"
action: peblar.get_meter_history
domain: peblar
description: "Returns the charging sessions recorded by the Peblar charger's certified meter, including the token each session was authorized with."
related:
  - docs: /integrations/peblar/
    title: Peblar
  - action: peblar.list_rfid_tokens
  - action: peblar.authorize_charge_session
---

The **Get meter history** action reads the session log the Peblar charger's certified meter keeps for itself. Every record holds the meter reading at both ends of a session and the token the session was authorized with, so you can tell whose session it was.

The energy sensors cannot tell you that. Use this action to settle up with a neighbor who charges on their own key fob, or to hand your employer a record per session of a lease car.

{% note %}
The meter records a session whether or not a token was presented. A session without one comes back with `uid: null`.
{% endnote %}

{% include actions/try_it.md %}

{% include actions/ui_header.md %}

To read the meter history from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create** to start a new one.
3. In the **Then do** section, select **Add action**.
4. From the search box, search for and select **Peblar: Get meter history**.
5. Under **Peblar EV charger**, select the Peblar charger to read from.
6. Optionally set **After** and **Before** to narrow the period.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Peblar EV charger:
  description: The Peblar EV charger to read the meter history from.
  required: true
After:
  description: Only return sessions that started at or after this moment.
  required: false
Before:
  description: Only return sessions that started at or before this moment.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `peblar.get_meter_history`. A basic example looks like this:

{% example %}
action: |
  action: peblar.get_meter_history
  data:
    config_entry_id: "01234567890abcdef01234567890abcd"
    after: "2026-01-01 00:00:00"
    before: "2026-02-01 00:00:00"
{% endexample %}

### Options in YAML

{% options_yaml %}
config_entry_id:
  description: >
    The ID of the Peblar charger config entry to read the meter history from.
  required: true
  type: string
after:
  description: >
    Only return sessions that started at or after this moment. A moment written without a timezone is read in the timezone Home Assistant runs in.
  required: false
  type: datetime
before:
  description: >
    Only return sessions that started at or before this moment. A moment written without a timezone is read in the timezone Home Assistant runs in.
  required: false
  type: datetime
{% endoptions_yaml %}

### Response data

The action returns the charger's own verdict on the log as `corrupted`, and the
sessions themselves under `sessions`:

```yaml
corrupted: false
sessions:
  - session_number: 41
    uid: "04A1B2C3D4E5F6"
    start_time: "2026-01-22T12:00:00+00:00"
    end_time: "2026-01-22T19:00:00+00:00"
    start_energy_kwh: 1401.0
    end_energy_kwh: 1408.5
    energy_kwh: 7.5
    checksum: 3613161996
    corrupted: false
  - session_number: 42
    uid: null
    start_time: "2026-01-23T12:00:00+00:00"
    end_time: null
    start_energy_kwh: 1408.5
    end_energy_kwh: null
    energy_kwh: null
    checksum: 992513408
    corrupted: false
```

The session that is still running has no end yet, so its end time, closing meter
reading, and energy are all empty.

## Good to know

- Only administrators can run this action.
- The charger keeps this log itself, so it reaches back further than Home Assistant does, and a database purge leaves it alone.
- A record that no longer matches its own checksum is marked `corrupted`. Do not bill on one.
- Times come back in UTC. Use the [`as_local`](/docs/configuration/templating/#time) filter to show them in your own timezone.

{% include actions/more_examples.md %}

### Automation: send a daily total for one token

Add up the energy of every finished session that used your neighbor's key fob,
so you know what to invoice them for.

{% details "YAML example for totalling one token" %}

{% example %}
automation: |
  triggers:
    - trigger: time
      at: "09:00:00"
  actions:
    - action: peblar.get_meter_history
      data:
        config_entry_id: "01234567890abcdef01234567890abcd"
      response_variable: meter
    - action: notify.mobile_app_your_phone
      data:
        title: "Peblar charging by the neighbor"
        message: >
          {{ meter.sessions | selectattr('uid', 'eq', '04F6E5D4C3B2A1')
             | selectattr('energy_kwh', 'is_number')
             | map(attribute='energy_kwh') | sum | round(2) }} kWh so far.
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
