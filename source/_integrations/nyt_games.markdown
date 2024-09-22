---
title: NYT Games
description: Instructions on how to setup NYT Games in Home Assistant.
ha_category:
  - Sensor
ha_config_flow: true
ha_release: "2024.10"
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@joostlek'
ha_domain: nyt_games
ha_platforms:
  - sensor
---

The [NYT Games](https://www.nytimes.com/crosswords) integration will fetch data about your progress on their daily puzzles.

## Pre-requisites

To setup the integration you need to first fetch the token from the dev tools of your browser.

1. Navigate to [NYT Games](https://www.nytimes.com/crosswords) on your computer.
2. Login with your account.
3. Open the developer tools via right click or by pressing F12.
4. Navigate to the network tab and refresh the page.
5. Click on a request with `.json` in the name and navigate to the cookie tab.
6. The token can be found in the `NYT-S` cookie.

{% include integrations/config_flow.md %}
