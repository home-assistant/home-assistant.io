---
title: "Apprise"
description: "Instructions on how to add Apprise notifications to Home Assistant."
logo: apprise.png
ha_category:
  - Notifications
ha_release: 0.101
---

The [Apprise service](https://github.com/caronc/apprise/) is an all-in-one solution to open up Home Assistant to _just about_ every Notification platform (such as Amazon SNS, Discord, Telegram, Slack, MSTeams, Twilio, etc.)

To use Apprise supported notifications, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry using URLs
notify:
  - platform: apprise
    url: YOUR_APPRISE_URLS
```

{% configuration %}
name:
  description: The notifier will bind to the service `notify.NAME`.
  required: false
  type: string
  default: notify
url:
  description: One or more Apprise URLs
  required: false
  type: string
config:
  description: One or more Apprise Configuration URLs
  required: false
  type: string
{% endconfiguration %}

Apprise URLs may seem strange at first, but they aren't complicated to create at all. They provide all of the information needed to activate a notification service in one single web-like URL. You specify more than one (causing them all to be notified) by just separating each URL with a comma and/or space. To see how you can construct your own URL(s) [click here](https://github.com/caronc/apprise/wiki). For example, an [Apprise E-mail URL](https://github.com/caronc/apprise/wiki/Notify_email) configuration entry might look like this:

```yaml
# An Apprise E-Mail Example (using Google Mail)
notify:
  - platform: apprise
    url: mailto://chuck:pass123@gmail.com
```

You can also pre-define your own isolated (Apprise) configuration files and just reference them through Home Assistance. The advantage of this is you can keep all of your Apprise URLs in one secure location (even on another server if you want). It makes it easier to read the entries, in addition, you can leverage the power of tagging. Tagging is explained a bit later. To specify an isolated Apprise configuration entry, simply use the `config` option.

```yaml
# Example configuration.yaml entry using externally located Apprise
# Configuration Files/Sites:
notify:
  - platform: apprise
    config: YOUR_APPRISE_CONFIG_URLS
```

Here is what a `config` entry might look like:

```yaml
# Apprise Configuration stored on the same server as our Home Assistant
notify:
  - platform: apprise
    config: /etc/apprise/apprise.conf
```

The [Apprise Configuration URLs](https://github.com/caronc/apprise/wiki/config) you identify must either be a file path to a configuration file on the same server as the one hosting Home Assistant or a web URL pointing to a self-hosted configuration you set up. Here is another way you can leverage remote configurations:

```yaml
# Apprise Configuration stored remotely
notify:
  - platform: apprise
    config: http://myserver/apprise.conf
```

#### Extended Functionality

The following attributes can be placed inside `data` for extended functionality.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `attachments`          |      yes | Array of file attachments. These can be absolute paths to a file on the same server as your Home Assistant, or they can be web-based queries (http:// and https://). By specifying attachments, each notification sent will include them as part of it's payload.

#### Service Call Examples

Here is the most basic of service calls. The following just sends a notification to any URLs you've defined:

```yaml
- service: notify.apprise
  data:
    message: "A message from Home Assistant"
```

##### Tagging

If you're using Apprise configuration files to store your Apprise URLs in, then you now have the added bonus of associating tags with them. Read more about tagging [here](https://github.com/caronc/apprise/wiki/CLI_Usage#label-leverage-tagging).

But in summary, it's a way of mapping your Apprise URLs to one or more easy to read names. Then you just need to reference the names of the URLs you wish to notify. The advantage of this, is you can effectively group all of your notifications and only trigger one specific ones (not all of them).

There is, however, a special tag called `all`, which will notify everything you've identified regardless of what tag you've assigned it.

Assuming you have an Apprise configuration file that looks like this:

```text
# Tags in a Text configuration sit in front of the URL
#  - They are comma and/or space separated (if more than one
#  - To mark that you are no longer specifying tags and want to identify
#    the URL, you just place an equal (=) sign and write the URL:
#
# Syntax: <tags>=<url>

# Here we set up a mailto:// URL and assign it the tags: me, and family
# maybe we are doing this to just identify our personal email and
# additionally tag ourselves with the family (which we will tag elsewhere
# too)
me,family=mailto://user:password@yahoo.com

# Here we set up a mailto:// URL and assign it the tag: family
# In this example, we would email 2 people if triggered
family=mailto://user:password@yahoo.com/myspouse@example.com/mychild@example.com
```

You can define one of your actions to look like so:

```yaml
- service: notify.apprise
  data:
    message: "A message from Home Assistant"
    target: [
      "me",
    ]
```

In the above example, we defined a few configuration entries. We assigned `me` to only one of them and `family` to all of them. When the above action fires, only `me` would get notified.

##### File Attachments

Some notification services support file attachments (such as E-Mail, Slack, Discord, Telegram, etc). Attachments work great especially when you want to use Home Assistant to pass along an image from your security cameras (as an example).

Here are how they work (this example shows how you can identify more than one attachment to pass along if you wish):

```yaml
- service: notify.apprise
  data:
    message: "A message from Home Assistant"
    data:
      attachments: [
        "/tmp/my_data.dump",
        "/var/data/capture.jpeg"
      ]
```

Attachments can even be polled from a web location! The below example shows how tagging can work together with it as well:

```yaml
- service: notify.apprise
  data:
    message: "A security capture:"
    target: [
      "family",
    ]
    data:
      attachments: [
        http://security.camera/live/image.jpeg
      ]
```

In the above example, we defined a few configuration entries. We assigned `me` to only one of them and `family` to all of them. When the above action fires, only `me` would get notified.

<div class='note'>

There are over 50+ supported Notification services supported by Apprise. Each has their own tweaks and customizations you can leverage.

- For instructions on how to construct the URLs, visit [here](https://github.com/caronc/apprise/wiki#notification-services).
- For instructions on how you can customize your own Apprise configuration files (referenced through the `config` directive), check out the following:
   - [Text Formatted URLs](https://github.com/caronc/apprise/wiki/config_text)
   - [YAML Formatted URLs](https://github.com/caronc/apprise/wiki/config_yaml)

</div>

To use notifications, please see the [getting started with automation page](/getting-started/automation/).
