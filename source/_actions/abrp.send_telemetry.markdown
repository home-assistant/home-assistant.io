---
title: "Send telemetry"
action: abrp.send_telemetry
domain: abrp
description: "Sends a telemetry point for a vehicle to A Better Routeplanner."
---

The **A Better Routeplanner: Send telemetry** action sends one telemetry point for a vehicle to A Better Routeplanner (ABRP), such as its state of charge, location, or battery temperature. ABRP uses the values for route planning and shows them in its app.

Use it to give ABRP data it does not get on its own, for example forwarding the state of charge from your vehicle's own integration every time it changes, so route planning always starts from the right value.

{% include actions/ui_header.md %}

To send telemetry from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **A Better Routeplanner: Send telemetry**.
6. Select the **Vehicle** to send the telemetry for.
7. Set one or more values, for example **State of charge**.
8. _Optional_: set the **Time** the values were measured. It defaults to now.
9. Select **Save**.

### Options in the UI

{% options_ui %}
Vehicle:
  description: The A Better Routeplanner vehicle to send the telemetry for.
Time:
  description: When the values were measured. Defaults to now.
  required: false
Location:
  description: Position of the vehicle.
  required: false
State of charge:
  description: Battery state of charge, in %.
  required: false
Power:
  description: Battery power, in kW. Negative while charging, positive while driving.
  required: false
Odometer:
  description: Odometer reading, in km.
  required: false
Estimated range:
  description: Remaining range estimated by the vehicle, in km.
  required: false
Battery temperature:
  description: Battery temperature, in °C.
  required: false
Charging state:
  description: Whether the vehicle is plugged in or charging.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `abrp.send_telemetry`. A basic example looks like this:

{% example %}
action: |
  action: abrp.send_telemetry
  data:
    vehicle: 0d462c0c4c0b064b1a91cdbd1ffcbd31
    soc: 72
    charging_state: charging_ac
    location:
      latitude: 59.3293
      longitude: 18.0686
{% endexample %}

This tells ABRP the vehicle is at 72%, charging on AC, at the given location.

### Options in YAML

{% options_yaml %}
vehicle:
  description: >
    The device ID of the vehicle to send the telemetry for.
  required: true
  type: string
time:
  description: >
    When the values were measured. Defaults to now.
  required: false
  type: datetime
location:
  description: >
    Position of the vehicle, as a mapping with `latitude` and `longitude` in degrees.
  required: false
  type: map
soc:
  description: >
    Battery state of charge, in %.
  required: false
  type: float
power:
  description: >
    Battery power, in kW. Negative while charging, positive while driving.
  required: false
  type: float
odometer:
  description: >
    Odometer reading, in km.
  required: false
  type: float
estimated_range:
  description: >
    Remaining range estimated by the vehicle, in km.
  required: false
  type: float
battery_temperature:
  description: >
    Battery temperature, in °C.
  required: false
  type: float
charging_state:
  description: >
    Whether the vehicle is plugged in or charging. One of `charging_ac`, `charging_dc`, `charging_unknown`, `not_charging`, or `plugged_in`.
  required: false
  type: string
{% endoptions_yaml %}

This action does not support targets. Select the vehicle through the **Vehicle** field.

## Good to know

- Besides the vehicle, set at least one value or the location. A time on its own is not enough.
- Values use the units listed above, whatever unit system Home Assistant uses. To convert other units, use a template. For example, to send power from a sensor in W, use {% raw %}`{{ states('sensor.my_ev_power') | float / 1000 }}`{% endraw %}.
- Any vehicle in your ABRP garage works, including vehicles shared with you. A vehicle that is no longer in your garage is rejected.
- Only the values you send change. ABRP keeps the others.
- If your vehicle's own integration reports when a value was measured, set **Time** to that time. Otherwise, the values are stamped with the time the action runs, which can be later than the actual measurement.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
