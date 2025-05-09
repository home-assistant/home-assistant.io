---
title: NYT Games
description: Instructions on how to setup NYT Games in Home Assistant.
ha_category:
  - Sensor
ha_config_flow: true
ha_release: '2024.10'
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@joostlek'
ha_domain: nyt_games
ha_platforms:
  - sensor
ha_integration_type: service
---

The [NYT Games](https://www.nytimes.com/crosswords) integration fetches data about your progress on their daily puzzles.

## Prerequisites

Before setting up the integration, you need to fetch the token from the dev tools of your browser.

1. On your computer, go to [NYT Games](https://www.nytimes.com/crosswords).
2. Login with your account.
3. Open the developer tools via right-click or by pressing F12.
4. Open the network tab and refresh the page.
5. Select a request with `.json` in the name and go to the cookie tab.
6. The token can be found in the `NYT-S` cookie.

{% include integrations/config_flow.md %}
