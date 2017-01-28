---
layout: page
title: "History Statistics"
description: "Instructions about how to integrate history_stats sensors into Home Assistant."
date: 2017-01-28 22:00
sidebar: true
comments: false
sharing: true
footer: true
logo: home-assistant.png
ha_category: Sensor
ha_iot_class: "Local Polling"
ha_release: "0.37"
---

<style>
    tbody > tr > td{
        /* Make text in tables a little bit smaller */
        font-size: 0.9em
    }
    tbody > tr > td > code {
        /* No line breaks for the code in tables */
        white-space: nowrap;
    }
</style>

The `history_stats` sensor platform provides quick statistics about another component, using data from the history.

It can track how long the component has been in a specific state, in a custom time period.

Examples of what you can track :
- How long you were at home this week
- How long the lights were ON yesterday
- How long you watched TV today

## {% linkable_title Configuration %}

To enable the statistics sensor, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: history_stats
    name: Lamp ON today
    entity_id: light.my_lamp
    state: 'on'
    start: '{% raw %}{{ _TODAY_ }}{% endraw %}'
    end: '{% raw %}{{ _NOW_ }}{% endraw %}'
```

Configuration variables:

 - **entity_id** (*Required*): The entity you want to track
 - **state** (*Required*): The state you want to track
 - **name** (*Optional*): Name displayed on the frontend
 - **start**: When to start the measure (timestamp).
 - **end**: When to stop the measure (timestamp)
 - **duration**: Duration of the measure (seconds)



<p class='note'>
You have to provide **exactly 2** of _start_, _end_ and _duration_. They can be templates, so the timestamps are dynamic.
</p>


## {% linkable_title Time Aliases %}

Because timestamps can be difficult to handle, the `history_stats` component has built-in aliases to help you write your templates, and make them easier to understand.
Note that those aliases will not work with other components of Home Assistant.

Imagine that the current datetime is the following : `Tuesday, 14 Feb 2017 18:42:12`.
Here are the aliases you can use, and what they refer to:

| Alias                   | Datetime equivalent             | Explanation                                 |
| ----------------------- | ------------------------------- | ------------------------------------------- |
| \_NOW_                  | Tuesday, 14 Feb 2017 18:42:12   | The current timestamp                       |
| \_THIS_MINUTE_          | Tuesday, 14 Feb 2017 18:42:00   | The beginning of the current minute         |
| \_THIS_HOUR_            | Tuesday, 14 Feb 2017 18:00:00   | The beginning of the current hour           |
| \_TODAY_ or \_THIS_DAY_ | Tuesday, 14 Feb 2017 00:00:00   | The current day, at midnight                |
| \_THIS_WEEK_            | Monday, 13 Feb 2017 00:00:00    | The last monday, at midnight                |
| \_THIS_MONTH_           | Wednesday, 01 Feb 2017 00:00:00 | First day of the current month, at midnight |
| \_THIS_YEAR_            | Sunday, 01 Jan 2017 00:00:00    | First day of the current year, at midnight  |

| Alias         | Value in seconds |
| ------------- | ---------------- |
| \_ONE_MINUTE_ | 60               |
| \_ONE_HOUR_   | 3600             |
| \_ONE_DAY_    | 86400            |
| \_ONE_WEEK_   | 604800           |

Each one of those aliases will be converted to a real timestamp, which is a number of seconds, so you can use basic operators like `+`, `-` or `*` as well as numbers.

You can also use [template extensions](/topics/templating/#home-assistant-template-extensions) instead of the `history_stats` aliases. For example, `_THIS_HOUR_` is the equivalent of `as_timestamp(now().replace(hour=0).replace(minute=0).replace(second=0))`

### {% linkable_title Examples %}

Here are some examples of periods you could work with, and what to write in your `configuration.yaml`:

    
| Time period               | start                                                 | end                                  | duration                                    |
| ------------------------- | :---------------------------------------------------: | :----------------------------------: | :-----------------------------------------: |
| Today                     | `{% raw %}{{ _TODAY_ }}{% endraw %}`                  | `{% raw %}{{ _NOW_ }}{% endraw %}`   |                                             |
| Yesterday                 |                                                       | `{% raw %}{{ _TODAY_ }}{% endraw %}` | `{% raw %}{{ _ONE_DAY_ }}{% endraw %}`      |
| Yesterday (alternative)   | `{% raw %}{{ _TODAY_ - _ONE_DAY_ }}{% endraw %}`      | `{% raw %}{{ _TODAY_ }}{% endraw %}` |                                             |
| This morning (6AM - 11AM) | `{% raw %}{{ _TODAY_ + 6 * _ONE_HOUR_ }}{% endraw %}` |                                      | `{% raw %}{{ 5 * _ONE_HOUR_ }}{% endraw %}` |
| Current month             | `{% raw %}{{ _THIS_MONTH_ }}{% endraw %}`             | `{% raw %}{{ _NOW_ }}{% endraw %}`   |                                             |
| Last 30 days              |                                                       | `{% raw %}{{ _TODAY_ }}{% endraw %}` | `{% raw %}{{ 30 * _ONE_DAY_ }}{% endraw %}` |
| All your history          | `{% raw %}{{ 0 }}{% endraw %}`                        | `{% raw %}{{ _NOW_ }}{% endraw %}`   |                                             |
