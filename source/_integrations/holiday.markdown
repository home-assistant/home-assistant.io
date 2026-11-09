---
description: Instructions on how to use holiday calendars in Home Assistant.
ha_release: 2024.1
ha_domain: holiday
related:
  - docs: /integrations/calendar/
    title: Calendar integration
  - docs: /integrations/workday/
    title: Workday integration
---

The **Holiday** {% term integration %} adds a {% term calendar %} with the public holidays for a country, and optionally a region within that country, to Home Assistant. You can use it to view upcoming holidays on your calendar dashboard and to power automations, for example, to keep the blinds closed on public holidays or turn on festive lights on a specific holiday.

The holiday data comes from the [holidays](https://pypi.org/project/holidays/) library, which covers a large number of countries and their regions. No account or internet connection is needed.

## Supported countries

The integration supports all countries and regions that the [holidays](https://pypi.org/project/holidays/) library supports. When you add the integration, the **Country** list only shows supported countries. For the full list of countries, regions, and holiday categories, refer to the [supported entities list of the holidays library](https://holidays.readthedocs.io/en/latest/#available-countries).

{% include integrations/config_flow.md %}

{% configuration_basic %}
Country:
  description: "The country to show holidays for. Defaults to the country set in your Home Assistant [general settings](/docs/configuration/basic/)."
Province:
  description: "The province, state, or other region of the country. Some regions have extra or different holidays. Only shown if the selected country has regions."
Categories:
  description: "Additional holiday categories to include, such as bank or school holidays. Public holidays are always included. Only shown if the selected country has additional categories. For the categories each country supports, refer to the [holidays](https://pypi.org/project/holidays/) library."
{% endconfiguration_basic %}

You can add the integration more than once, for example, to show holidays for several countries or regions. Each combination of country, region, and categories can only be added once.

{% include integrations/option_flow.md %}

{% configuration_basic %}
Categories:
  description: "Additional holiday categories to include. Public holidays are always included. If the country has no additional categories, the options are not available."
{% endconfiguration_basic %}

To change the province or region, or the categories, of an existing entry, use **Reconfigure** from the three dots {% icon "mdi:dots-vertical" %} menu on the entry.

## Supported functionality

Each entry of the **Holiday** integration creates a service {% term device %} with one {% term entity %}.

### Calendar

- **Holiday calendar**
  - **Description**: A read-only calendar with one all-day event for each holiday. The calendar is named after the country, and the region if you selected one, for example, `calendar.germany`. The event title is the name of the holiday, and the event location is the name of the calendar. If several holidays fall on the same date, they share one event, and the title lists all holiday names in alphabetical order, separated by a semicolon. For example, `Christmas Day; Some other holiday`.
  - **State**: **On** during a holiday, and **Off** on all other days.
  - **Attributes**: The attributes show the next upcoming holiday, such as its name (`message`), start and end time, and location.

A {% term calendar %} entity has a state and attributes that represent the next upcoming event (only). A calendar trigger is a much more flexible way to power automations with fewer limitations than using the entity state.

## Holiday automation examples

Each holiday date is a calendar event, so you can use a calendar trigger to start an automation when a holiday begins or ends. Holidays on the same date share one event with a combined title, so check whether the title contains the holiday name instead of matching the full title. You can also use the calendar state in a condition to check whether today is a holiday. For an overview, refer to [calendar automations](/integrations/calendar#automation). You can use [calendar trigger variables](/docs/automation/trigger-data/#calendar-triggers), such as the event `summary` and `location`, in conditions and actions.

{% include docs/paste_yaml_tip.md %}

### Automation: Turn on the Christmas lights on Christmas Day

Turn on your festive lights when Christmas Day starts. The condition checks the name of the holiday, so the automation only runs on Christmas Day and not on other holidays. It also works when another holiday falls on the same date. The holiday name must match the name shown on your calendar, which depends on your language.

- **Trigger**: Calendar event starts
  - **Target**: Germany (`calendar.germany`)
- **Condition**: The event title includes `Christmas Day`
- **Action**: Turn on light
  - **Target**: Christmas lights (`light.christmas_lights`)

{% details "YAML example for turning on the Christmas lights" %}

{% example %}
automation: |
  alias: "Turn on the Christmas lights on Christmas Day"
  triggers:
    - trigger: calendar
      event: start
      entity_id: calendar.germany
  conditions:
    - "{{ 'Christmas Day' in trigger.calendar_event.summary.split('; ') }}"
  actions:
    - action: light.turn_on
      target:
        entity_id: light.christmas_lights
{% endexample %}

{% enddetails %}

### Automation: Keep the covers closed on public holidays

Open your covers in the morning on regular days, but let you sleep in on public holidays. The condition checks that the holiday calendar is **Off**, which means today is not a holiday.

- **Trigger**: Time is 07:00
- **Condition**: Germany (`calendar.germany`) is **Off**
- **Action**: Open cover
  - **Target**: Bedroom blinds (`cover.bedroom_blinds`)

{% details "YAML example for keeping the covers closed on public holidays" %}

{% example %}
automation: |
  alias: "Open the bedroom blinds on non-holidays"
  triggers:
    - trigger: time
      at: "07:00:00"
  conditions:
    - condition: state
      entity_id: calendar.germany
      state: "off"
  actions:
    - action: cover.open_cover
      target:
        entity_id: cover.bedroom_blinds
{% endexample %}

{% enddetails %}

## Data updates

The holiday data is included in the integration, so no data is fetched from the internet. The calendar updates its state at the start of each day. New holidays and corrections come from updates of the holidays library, which are included in Home Assistant updates.

## Known limitations

- The calendar is read-only. You cannot add, change, or remove holidays.
- All holidays are all-day events. Holidays from the **Half day** category also show as all-day events.
- Holidays on the same date share one event. The event title combines the holiday names, separated by a semicolon.
- The country of an existing entry cannot be changed. To show holidays for another country, add the integration again.
- Holiday names use the system language of Home Assistant, set under **Settings** > **System** > **General**, if the country supports it. Otherwise, they use the main language of the country. The language you select in your user profile is not used. The language is set when the integration starts, so after you change the system language, reload the integration.
- The name of the calendar is set in the system language when you add the integration. It does not change when you change the language later.
- The calendar only shows holidays, not regular workdays or weekends. To check whether a day is a workday, use the [Workday](/integrations/workday/) integration.

## Troubleshooting

{% details "My country is not in the list" %}

### Symptom: The country is not available when adding the integration

When you add the integration, your country does not show up in the **Country** list.

#### Description

The **Country** list only shows countries supported by the [holidays](https://pypi.org/project/holidays/) library.

#### Resolution

Check the [list of supported countries](https://holidays.readthedocs.io/en/latest/#available-countries). If your country is not supported, you can request it in the [holidays library repository](https://github.com/vacanza/holidays/issues). Once support is added, it becomes available in a later Home Assistant release.

{% enddetails %}

{% details "\"Already configured\" when adding the integration" %}

### Symptom: "Already configured"

When you add the integration or change its settings, the form shows the message "Already configured. Only a single configuration for country/province/categories combination is possible."

#### Description

An entry with the same country, region, and categories already exists.

#### Resolution

Use the existing entry, or select a different region or different categories.

{% enddetails %}

{% details "\"The country has no additional categories to configure\"" %}

### Symptom: The options cannot be opened

When you select **Configure** on the entry, the message "The country has no additional categories to configure" is shown.

#### Description

The selected country only has public holidays, so there are no extra categories to choose from.

#### Resolution

No action is needed. Public holidays are always included.

{% enddetails %}

{% details "Holiday names are in the wrong language" %}

### Symptom: Holiday names are shown in another language

The names of the holidays on the calendar are not in the language you use in Home Assistant.

#### Description

The integration uses the system language of Home Assistant, not the language you select in your user profile. The holidays library also does not have translations for every country. If your language is not available for the country, the names use the main language of that country. The language is only set when the integration starts.

#### Resolution

1. Go to {% my general title="**Settings** > **System** > **General**" %} and check that **Language** is set to the language you want.
2. If you changed the language, go to {% my integrations title="**Settings** > **Devices & services**" %}, select **Holiday**, and reload the entry.
3. If the names are still in another language, your language is not available for this country in the holidays library.

{% enddetails %}

{% details "A holiday is missing or on the wrong date" %}

### Symptom: A holiday is missing or has the wrong date

A holiday you expect is not on the calendar, or it shows on the wrong day.

#### Description

Some holidays only apply to a region or to an additional category, such as bank or school holidays. The holiday data itself comes from the holidays library.

#### Resolution

1. Check that you selected the correct region. To change it, use **Reconfigure** from the three dots {% icon "mdi:dots-vertical" %} menu on the entry.
2. Check whether the holiday belongs to an additional category. To add categories, select **Configure** on the entry.
3. If the holiday is still missing or wrong, report it in the [holidays library repository](https://github.com/vacanza/holidays/issues).

{% enddetails %}

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
