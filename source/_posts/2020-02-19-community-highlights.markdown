---
title: "Community Highlights: 3rd edition"
description: "VS Code add-on, beta, traffic indicator"
date: 2020-02-19 00:00:00
date_formatted: "February 19, 2020"
author: Paulus Schoutsen
author_twitter: balloob
categories: Community
og_image: /images/blog/2020-02-19-community-highlights/social.png
---

It's time for the third installment of our revamped community highlights. We got some really great stuff again.

This time I (Paulus) am in charge of writing the community highlights. The reason for this is that the main item involves Frenck's own work, and he felt weird promoting his own awesome, great, wonderful, enlighting and fabulous work on the revamped Visual Studio Code add-on.

## Visual Studio Code add-on updated

Visual Studio Code is a free text editor by Microsoft that works inside your browser. It makes it very easy to manage your configuration.

The add-on used to be only available for x64 devices like intel NUC. With this update, it is now also available for ARM64 devices, including the Raspberry Pi 3 and 4 (the 64-bit version).

It comes installed with all the extensions necessary for editing Home Assistant related files:

- [Home Assistant Config Helper](https://marketplace.visualstudio.com/items?itemName=keesschollaart.vscode-home-assistant)
- [ESPHome VSCode](https://marketplace.visualstudio.com/items?itemName=ESPHome.esphome-vscode)
- YAML checker
- Material Design Icons support

If this is the first time you hear about the Home Assistant Config Helper, it is genius. It will set-up a realtime connection from VS Code directly to your Home Assistant installation so it can offer auto-complete suggestions when editing your configuration. This is pre-configured and works out of the box with the VS Code add-on.

To install the add-on, search for Visual Studio Code in the add-on store.

<img src='/images/blog/2020-02-19-community-highlights/vscode.png' alt='Screenshot of Visual Studio Code.' style='border: 0;box-shadow: none;'>

## VS Code add-on part 2

But there is more in the add-on! Home Assistant contains an add-on service registry where add-ons can make their services available for other add-ons without requiring any configuration. The VS Code add-on uses this feature to offer a built-in terminal that has pre-configured tools to connect to the MariaDB add-on and the MQTT add-on.

To try it out, open VS Code, click on the menu button top left -> view -> terminal.

### MQTT command-line

_This requires the Mosquitto add-on to be installed and an MQTT sensor ([instructions](https://www.home-assistant.io/integrations/sensor.mqtt))._

To publish a message to an MQTT topic:

```bash
mosquitto_pub -t home/bedroom/temperature -m 23
```

Or watch all messages that go through your MQTT broker:

```bash
mosquitto_sub -t \#
```

### SQL command-line

_This requires the MariaDB add-on to be installed and the recorder configured to use it ([instructions](https://github.com/home-assistant/hassio-addons/tree/master/mariadb))._

To query the available tables:

```bash
mysql -D homeassistant -e "SELECT entity_id, state, last_updated FROM states LIMIT 0, 10"
```

## Beta time!

Today we are releasing the first beta of Home Assistant Core 0.106. It is packed with awesome features. For a sneak peek of what is coming, check the [beta release notes](/blog/2020/02/26/release-106/).

I'm personally most excited about the extended safe mode. It will guarantee that the frontend will always load, no matter how broken your configuration is.

## Navigation Arrow

On Reddit user /u/Jenova70 showed a super slick navigation arrow that indicates the traffic on his daily commute. Very slick! Instructions can be found in the comments.

<blockquote class="reddit-card" data-card-created="1582092743"><a href="https://www.reddit.com/r/homeassistant/comments/f27dtk/i_built_a_physical_navigation_arrow_that_is/">I built a physical "navigation arrow" that is changing color based on the estimated time of arrival at work (Waze commute data :) )</a> from <a href="http://www.reddit.com/r/homeassistant">r/homeassistant</a></blockquote>

<script async src="//embed.redditmedia.com/widgets/platform.js" charset="UTF-8"></script>

_Thanks, Jean-Loïc Pouffier & cogneato for sending in this item! 👍_

## Got a tip for the next edition?

Have you seen (or made) something awesome, interesting, unique, amazing, inspirational, unusual or funny, using Home Assistant?

[Click here to send us your Community Highlight suggestion](/suggest-community-highlight).

Also, don't forget to share your creations with us via Social Media:

- Twitter it! Be sure to mention [@home_assistant][twitter]
- Share it on our [Facebook group][facebook-group]
- Post it to our [subreddit][reddit]
- Tag [@homeassistant][instagram] on Instagram
- Or via chat, drop us a line in the [#lounge at Discord][chat]

See you next edition!

[chat]: https://www.home-assistant.io/join-chat
[facebook-group]: https://www.facebook.com/groups/HomeAssistant/
[instagram]: https://www.instagram.com/homeassistant/
[reddit]: https://www.reddit.com/r/homeassistant
[twitter]: https://www.twitter.com/home_assistant
