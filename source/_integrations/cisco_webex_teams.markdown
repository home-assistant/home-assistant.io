---
title: Cisco Webex Teams
description: Instructions on how to add Cisco Webex notifications to Home Assistant.
ha_category:
  - Notifications
ha_iot_class: Cloud Push
ha_release: '0.40'
ha_codeowners:
  - '@fbradyirl'
ha_domain: cisco_webex_teams
ha_platforms:
  - notify
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The `cisco_webex_teams` notification platform allows you to deliver rich notifications from Home Assistant to [Cisco Webex](https://www.webex.com/suite/messaging.html) (formerly known as Cisco Spark or Cisco Webex Teams).

To use this notification platform you will need an app (bot) token. To obtain a token visit [Cisco Webex for Developers](https://developer.webex.com/).

- Detailed instructions can be found in the section titled **Creating a Webex Bot** on the [Webex Teams bot documentation](https://developer.webex.com/docs/bots).

You also need to specify the `room_id` that you wish to post messages into. The `room_id` can be found in one of three ways:

1. Logging in at [Cisco Webex for Developers](https://developer.webex.com/) and navigate to `Documentation`>`API Reference`>`Messages` and select List Messages, or
2. Log into the web client at [web.webex.com](https://web.webex.com/),
    - select the room (or create a new room),
    - then copying the room ID from the URL.
3. Within the Webex Client, press Control+Shift+K (Windows) or Command+Shift+K (macOS), which will automatically copy the space information to your clipboard, which you
   can paste to a notepad, and will contain your space ID.

{% important %}
You must add the bot email (in the format `mybot@webex.bot`) as a participant to the room specified above.
{% endimportant %}

To enable this platform in your installation, add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
notify:
  - name: NOTIFIER_NAME
    platform: cisco_webex_teams
    token: YOUR_BOT_TOKEN
    room_id: CISCO_WEBEX_TEAMS_ROOMID
```

## Rich Text Formatting

Webex clients can render rich text via a whitelisted set of html tags.

For example, you could configure automations to display details in an easy to read fashion like so:

<p class='img'>
<img src='/images/integrations/cisco_webex_teams/rich_formatting.png' />
Rich text as displayed in the macOS client.
</p>

Here are the automations for the above screenshot:

```yaml

# Rich Text Example 1.
# Show a one line message with a red banner
- alias: "Notify On Build Failing"
  triggers:
    - trigger: webhook
      webhook_id: build_failed
  actions:
    - action: notify.cisco_webex_teams_notify
      data:
        message: "<blockquote class=danger>Build 0.89.5 compile failed."


# Rich Text Example 2.
# Show a title and multi-line message with a yellow banner, 
# with lists, a person mention and a link
- alias: "Notify On Build Unstable"
  triggers:
    - trigger: webhook
      webhook_id: build_unstable
  actions:
    - action: notify.cisco_webex_teams_notify
      data:
        title: "<strong>Build 0.89.6 is unstable.</strong>"
        message: "<blockquote class=warning>Version 0.89.6 failed verifications.
        
        <ul>
          <li> test_osx
          <li> test_win_lint

          <li>... and 4 more.
        </ul>
        <p><@personEmail:sparkbotjeeves@sparkbot.io></p>
        <p><small><i>View <a href='https://demo/testReport/'>Test Report</a></i></small><br></p>
        "

# Rich Text Example 3.
# Show a title and multi-line message with a blue banner, 
# with lists, a person mention and a link
- alias: "Notify On Build Passing"
  triggers:
    - trigger: webhook
      webhook_id: build_passed
  actions:
    - action: notify.cisco_webex_teams_notify
      data:
        title: "<strong>✅ Version 0.89.7 passed all tests and deployed to production!</strong>"
        message: "<blockquote class=info>Version 0.89.7 passed all verifications.
        
        <ul>
          <li> test_cov
          <li> test_osx
          <li> test_win
          <li> test_linux
          <li>... and 45 more.
        </ul>
        "
```

The following is a list of the allowed html tags and attributes:

| Tag                                       | More Info                                                                                                                                               |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `<@personEmail:email@examplecompany.com>` | Used to tag another Webex Team user by email address.                                                                                                   |
| `<a>`                                     | Defines a hyperlink. Allows attribute `href`.                                                                                                           |
| `<blockquote>`                            | Defines a section that is quoted from another source. Allows attribute `class` with allowed values `danger`, `warning`, `info`, `primary`, `secondary`. |
| `<b>`                                     | Defines bold text.                                                                                                                                      |
| `<strong>`                                | Defines important text.                                                                                                                                 |
| `<i>`                                     | Defines italic text.                                                                                                                                    |
| `<em>`                                    | Defines emphasized text.                                                                                                                                |
| `<pre>`                                   | Defines preformatted text.                                                                                                                              |
| `<code>`                                  | Defines a piece of computer code.                                                                                                                       |
| `<br>`                                    | Defines a single line break.                                                                                                                            |
| `<p>`                                     | Defines a paragraph.                                                                                                                                    |
| `<ul>`                                    | Defines an unordered list.                                                                                                                              |
| `<ol>`                                    | Defines an ordered list.                                                                                                                                |
| `<li>`                                    | Defines a list item.                                                                                                                                    |
| `<h1>` to `<h3>`                          | Defines HTML headings.                                                                                                                                  |

{% configuration %}
name:
  description: Setting the optional parameter `name` allows multiple notifiers to be created. The notifier will bind to the `notify.NOTIFIER_NAME` action.
  required: false
  default: notify
  type: string
token:
  description: Your app (bot) token.
  required: true
  type: string
room_id:
  description: The Room ID.
  required: true
  type: string
{% endconfiguration %}

To use notifications, please see the [getting started with automation page](/getting-started/automation/).
