---
title: "Templates, dates and times"
description: "Using templates for seconds and years in Home Assistant."
date: 2017-10-15 08:00:00 +0200
date_formatted: "October 15, 2017"
author: Fabian Affolter
categories: Community
og_image: /images/blog/2017-10-template/social.png
---

This [Pull Request](https://github.com/home-assistant/home-assistant/pull/9868) shows in a clear way what happens if the documentation is not as good as it should be. In short, it's about [Templating](/docs/configuration/templating/) and how people start to think about creative ways to solve it if it's not documented. Let's assume that we want the current year. There are a couple of options available to do that:

- Query [JSON Test](http://date.jsontest.com/) with a [`rest` sensor](/integrations/rest) and a `value_template:`.
- Use a [`time_date` sensor ](/integrations/time_date) and a template {% raw %}`{{ strptime(states('sensor.date'), '%Y-%m-%d').year }}`{% endraw %}.
- Write a script in language X and use it with the [`command` sensor](/integrations/sensor.command_line/) or use `date +"%Y"` as a `command:`.

<!--more-->

We want it simpler, right? [Templating](/docs/configuration/templating/) offers `now()` and `utcnow()`. We will stick with `now()` in this blog post but it applies to `utcnow()` as well. Our documentation said:

<blockquote>
  `now()` will be rendered as current time in your time zone.
</blockquote>

Hmmm, ...OK, that's a start. How to get the year? {% raw %}`{{ now() }}`{% endraw %} gives you `2017-10-14 20:27:23.700401+02:00` which is far more than we are looking for. As an user you don't want to dive into the code but there would you find the solution. You will get a [Python `datetime` object](https://docs.python.org/3.6/library/datetime.html#datetime.datetime) from {% raw %}`{{ now() }}`{% endraw %}. This means that you can access more than you think in a template: 

- For the time: `now().microsecond`, `now().second`, `now().minute` and `now().hour`
- For the date: `now().day`, `now().month` and `now().year`
- Misc: `now().weekday()` and `now().isoweekday()`

For the year it would be: {% raw %}`{{ now().year }}`{% endraw %}. I guess that there are rare use cases for `now().resolution`, `now().min` and `now().max` too.

[Hacktoberfest](/blog/2017/09/29/hacktoberfest/) is still running. Working on the documentation is pretty easy. If you know a nice [trick](/examples/), want to help improving the page of a platform or just fix typo then please do. Our [Website/Documentation section](/developers/documentation/) contains some requirements which are defined in the [Documentation Standards](/developers/documentation/standards/) and the "[Create a page](/developers/documentation/create_page/)" documentation for other useful details.

Thanks to [Egor Tsinko](https://github.com/etsinko) for bringing this issue to our attention.

