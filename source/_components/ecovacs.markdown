---
layout: page
title: "Ecovacs"
description: "Instructions on how to integrate Ecovacs vacuums within Home Assistant."
date: 2018-07-29 09:00
sidebar: true
comments: false
sharing: true
footer: true
logo: ecovacs.png
ha_category: Hub
ha_iot_class: "Cloud Push"
ha_release: 0.77
---

The `ecovacs` component is the main component to integrate all [Ecovacs](https://www.ecovacs.com) (Deebot) vacuums. You will need your Ecovacs account information (username, password) to discover and control vacuums in your account.

Please see the [Ecovacs Vacuum](/components/vacuum.ecovacs/) documentation for more information about using the vacuum entity.

## {% linkable_title Configuration %}

To add your Ecovacs devices into your Home Assistant installation, add the following to your `configuration.yaml` file:

```yaml
ecovacs:
  username: YOUR_ECOVACS_USERNAME
  password: YOUR_ECOVACS_PASSWORD
  country: YOUR_TWO_LETTER_COUNTRY_CODE
  continent: YOUR_TWO_LETTER_CONTINENT_CODE
```

{% configuration %}
username:
  description: Your username to login to your Ecovacs account.
  required: true
  type: string
password:
  description: Your password to login to your Ecovacs account.
  required: true
  type: string
country:
  description: Your two-letter country code (us, uk, etc).
  required: true
  type: string
continent:
  description: Your two-letter continent code (na, eu, etc).
  required: true
  type: string
{% endconfiguration %}

Note: For some countries, you will need to set `continent` to `ww` (meaning worldwide.) There is unfortunately no way to know the correct settings other than guessing and checking. See the [sucks library protocol documentation](https://github.com/wpietri/sucks/blob/master/protocol.md) for more information about what has been figured out about the Ecovacs servers.

### {% linkable_title Stability and Reporting Bugs %}

The library that talks to the Ecovacs servers is in a very early state and still under development. As such, it is likely that not all regions and devices will work at the current time.

Please see the [sucks library documentation](https://github.com/wpietri/sucks) for some more information about what has been tested, and check out the GitHub issues to see if the issue you're having is known or being worked on.

If you have an issue with the Ecovacs component, please file a [GitHub Issue](https://github.com/home-assistant/home-assistant/issues) and include your Home Assistant logs in the report. To get full debug output from both the Ecovacs component and the underlying `sucks` library, place this in your `configuration.yaml` file:

```yaml
logger:
  logs:
    homeassistant.components.ecovacs: debug
    homeassistant.components.vacuum.ecovacs: debug
    sucks: debug
```

Warning: doing this will cause your authentication token to visible in your log files. Be sure to remove any tokens and other authentication details from your log before posting them in an issue.
