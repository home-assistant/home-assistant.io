---
title: Matrix
description: Matrix chatbot support
ha_category:
  - Hub
  - Notifications
ha_iot_class: Cloud Push
ha_release: 0.69
ha_domain: matrix
ha_platforms:
  - notify
ha_integration_type: integration
ha_codeowners:
  - '@PaarthShah'
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

This {% term integration %} allows you to send messages to matrix rooms, as well as to react to messages in matrix rooms. Reacting to commands is accomplished by firing an event when one of the configured commands is triggered.

There is currently support for the following device types within Home Assistant:

- [Notifications](#notifications)

## Configuration

To enable the Matrix {% term integration %}, add it to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
matrix:
  homeserver: https://matrix.org
  username: "@my_matrix_user:matrix.org"
  password: supersecurepassword
  rooms:
    - "#hasstest:matrix.org"
  commands:
    - word: my_command
      name: my_command
```

{% configuration %}
username:
  description: "The matrix username that Home Assistant should use to log in. *Note*: You must specify a full matrix ID here, including the homeserver domain, e.g., '@my_matrix_bot:matrix.org'. Please note also that the '@' character has a special meaning in YAML, so this must always be given in quotes."
  required: true
  type: string
password:
  description: "The password for your Matrix account. It is only used when there is no valid access token stored yet. See [Authentication](#authentication)."
  required: true
  type: string
homeserver:
  description: "The full URL for your homeserver. If you use the default matrix.org homeserver, this is 'https://matrix.org'."
  required: true
  type: string
verify_ssl:
  description: Verify the homeservers certificate.
  required: false
  type: string
  default: true
rooms:
  description: "The list of rooms that the bot should join and listen for commands (see below) in. While you can limit the list of rooms that a certain command applies to on a per-command basis (see below), you must still list all rooms here that commands should be received in. Rooms can be given either by their internal ID (e.g., '!cURbafjkfsMDVwdRDQ:matrix.org') or any of their aliases (e.g., '#matrix:matrix.org')."
  required: false
  type: [string]
  default: empty
commands:
  description: "A list of commands that the bot should listen for. If a command is triggered (via its *word* or *expression*, see below), an event is fired that you can handle using automations. Every command consists of these possible configuration options:"
  required: false
  type: map
  default: empty
  keys:
    word:
      description: "Specifies a word that the bot should listen for. If you specify 'my_command' here, the bot will handle any message starting with '!my_command'."
      required: false
      type: string
    expression:
      description: "Specifies a regular expression (in Python regexp syntax) that the bot should listen to. The bot will handle any message that matches the regular expression."
      required: false
      type: string
    reaction:
      description: "Specifies an emoji reaction that the bot should listen to. The bot will handle any message that is reacted to with this emoji."
      required: false
      type: string
    name:
      description: "The name of the command. This will be an attribute of the event that is fired when this command triggers."
      required: true
      type: string
    rooms:
      description: "A list of rooms that the bot should listen for this command in. If this is not given, the *rooms* list from the main configuration is used. Please note that every room in this list must also be in the main *room* configuration."
      required: false
      type: [string]
      default: empty
{% endconfiguration %}

{% warning %}
To prevent infinite loops when reacting to commands, you have to use a separate account for the Matrix integration.
{% endwarning %}

### Authentication

The integration signs in with the username and password from your configuration. After a successful sign-in, it saves the access token that the homeserver returned to a file named `.matrix.conf` in your configuration directory, next to your {% term "`configuration.yaml`" %} file.

On every restart, the integration first tries the saved access token and only signs in with the password if the homeserver rejects that token. The file is only created after the first successful sign-in, so it is normal that it is not there yet on a new installation.

Because `.matrix.conf` starts with a dot, some backup and file copy tools skip it. Include it when you back up, move, or rebuild your installation, so that the integration keeps its session.

#### Homeservers that don't allow password sign-in

Some homeservers don't allow accounts to sign in with a password at all. This is the case, for example, on a homeserver that uses Matrix Authentication Service together with an external single sign-on provider, and has password sign-in turned off.

The integration can't sign in with single sign-on, but it works with an access token that you create yourself:

1. On your homeserver, create an access token for the Matrix account that Home Assistant uses. How you do this depends on your homeserver:

   - On a homeserver that uses [Matrix Authentication Service](https://element-hq.github.io/matrix-authentication-service/), an administrator can create a long-lived compatibility token with the [`mas-cli manage issue-compatibility-token`](https://element-hq.github.io/matrix-authentication-service/reference/cli/manage.html#manage-issue-compatibility-token) command. It takes the local part of the Matrix ID, for example `my_matrix_bot`, and not the full Matrix ID. The token is shown only once, so copy it right away.
   - On a Synapse homeserver without Matrix Authentication Service, an administrator can use the [login as a user](https://element-hq.github.io/synapse/latest/admin_api/user_admin_api.html#login-as-a-user) admin API. By default, the tokens it returns do not expire.

2. Create or edit the file `.matrix.conf` in your configuration directory. It holds one entry per Matrix ID:

   ```json
   {
     "@my_matrix_bot:example.com": "YOUR_ACCESS_TOKEN"
   }
   ```

   If the file already exists, change only the value that belongs to your Matrix ID and leave the rest of the file as it is. Make sure Home Assistant can read the file.

3. Keep the `password` option in your configuration. It is required, but it is not used while the access token works. If the account has no password, you can enter any text as its value.

4. Restart Home Assistant and send a test message. A full restart is needed, because the integration only reads `.matrix.conf` during startup.

{% important %}
An access token gives full access to the Matrix account. Treat it like a password. If it is ever exposed, end that session on your homeserver and create a new token.
{% endimportant %}

### Event data

If a command is triggered, a `matrix_command` event is fired. The event contains the name of the command in the `name` field.

If the command is a word command, the `data` field contains a list of the command's arguments, that is, everything that stood behind the word, split at spaces. If the command is an expression command, the `data` field contains the [group dictionary](https://docs.python.org/3.6/library/re.html?highlight=re#re.match.groupdict) of the regular expression that matched the message.

### Comprehensive Configuration Example

This example also uses the [matrix `notify` platform](#notifications).

```yaml
# The Matrix integration
matrix:
  homeserver: https://matrix.org
  username: "@my_matrix_user:matrix.org"
  password: supersecurepassword
  rooms:
    - "#hasstest:matrix.org"
    - "#someothertest:matrix.org"
  commands:
    - word: testword
      name: testword
      rooms:
        - "#someothertest:matrix.org"
    - expression: "My name is (?P<name>.*)"
      name: introduction
    - reaction: 👍
      name: thumbsup

notify:
  - name: matrix_notify
    platform: matrix
    default_room: "#hasstest:matrix.org"

automation:
  - alias: "Respond to !testword"
    triggers:
      - trigger: event
        event_type: matrix_command
        event_data:
          command: testword
    actions:
      - action: notify.matrix_notify
        data:
          message: "It looks like you wrote !testword"

  - alias: "Respond to an introduction"
    triggers:
      - trigger: event
        event_type: matrix_command
        event_data:
          command: introduction
    actions:
      - action: notify.matrix_notify
        data:
          message: "Hello {{trigger.event.data.args['name']}}"

  - alias: "Respond to a reaction in a thread"
    triggers:
      - trigger: event
        event_type: matrix_command
        event_data:
          command: thumbsup
    actions:
      - action: notify.matrix_notify
        data:
          message: "I saw that {{trigger.event.data.args['reaction']}} -- glad you appreciated this!"
          data:
            thread_id: "{{trigger.event.data.thread_parent}}"

  - alias: "React to a command"
    triggers:
      - trigger: event
        event_type: matrix_command
        event_data:
          command: testword
    actions:
      - action: matrix.react
        data:
          reaction: "✅"
          room: "{{trigger.event.data.room}}"
          message_id: "{{trigger.event.data.event_id}}"
```

This configuration will:

- Listen for "!testword" in the room "#someothertest:matrix.org" (and *only*) there. If such a message is encountered, it will answer with "It looks like you wrote !testword" into the "#hasstest:matrix.org" channel and also place a ✅ reaction on the original message.
- Listen in both rooms for any message matching "My name is <any string>" and answer with "Hello <the string>" into "#hasstest:matrix.org".
- Listen in both rooms for messages reacted to with 👍 and answer in a thread with "I saw that 👍 -- glad you appreciated this!"

## Notifications

The `matrix` platform allows you to deliver notifications from Home Assistant to a [Matrix](https://matrix.org/) room. Rooms can be both direct as well as group chats.

To enable Matrix notifications in your installation, you first need to configure the [Matrix integration](#configuration). Then, add the following to your {% term "`configuration.yaml`" %} file:

```yaml
# Example configuration.yaml entry
notify:
  - name: NOTIFIER_NAME
    platform: matrix
    default_room: ROOM_ID_OR_ALIAS
```

{% configuration %}
name:
  description: Setting the optional parameter `name` allows multiple notifiers to be created. The notifier will bind to the `notify.NOTIFIER_NAME` action.
  required: false
  default: notify
  type: string
default_room:
  description: The room all messages will be sent to, when no other target is given.
  required: true
  type: string
{% endconfiguration %}

The target room has to be precreated, the room id can be obtained from the rooms settings dialog. Rooms by default have a canonical id of the form `"!<randomid>:homeserver.tld"`, but can also be allocated aliases like `"#roomname:homeserver.tld"`. Make sure to use quotes around the room id or alias to escape special characters (`!`, and `#`) in YAML. The notifying account may need to be invited to the room, depending on the individual rooms policies.

To use notifications, please see the [getting started with automation page](/getting-started/automation/).

### Message formats

Matrix supports sending messages using a [limited HTML subset](https://spec.matrix.org/v1.2/client-server-api/#mroommessage-msgtypes). To specify the message format, add it in the notification `data`.

Supported formats are: `text` (default), and `html`.

```yaml
# Example of notification as HTML
actions:
  - action: notify.matrix_notify
    data:
      message: >-
        <h1>Hello, world!</h1>
      data:
        format: "html"
```

### Images in notification

It is possible to send images with notifications. To do so, add a list of paths in the notification `data`.

```yaml
# Example of notification with images
actions:
  - action: notify.matrix_notify
    data:
      message: "Test with images"
      data:
        images:
          - /path/to/picture.jpg
```

{% important %}
If you need to include a file from an external folder in your notifications, you will have to [list the source folder as allowed](/integrations/homeassistant/#allowlist_external_dirs).

```yaml
configuration.yaml
...
homeassistant:
  allowlist_external_dirs:
    - /tmp
```

{% endimportant %}

### Replying in threads

The `matrix_command` event will contain an `event_id` field that represents the message identifier for the received message.
It will also contain a `thread_parent` field that contains the message identifier for the parent message of the thread.
If the message was inside of a thread, `thread_parent` will be the identifier of the root message of the thread. If it
is not inside of a thread, `thread_parent` will be the same as `event_id`.

To reply inside of a thread, pass the correct message identifier of the root message into `data.thread_id` when sending
a reply message. For example:

```yaml
action: notify.matrix_notify
data:
  message: "Reply message goes here"
  data:
    thread_id: "{{ trigger.event.data.thread_parent }}"
```

{% include integrations/actions.md %}

## Troubleshooting

### Home Assistant stopped sending Matrix messages

#### Symptom: "Login failed, both token and username/password are invalid"

Messages are no longer delivered to your Matrix rooms, and {% my logs title="**Settings** > **System** > **Logs**" %} shows the message `Login failed, both token and username/password are invalid`.

#### Description

The homeserver rejected the saved access token, and signing in with the password did not work either. The saved access token stops working when one of the following happens:

- The session or the device of the Matrix account was ended on the homeserver, for example by signing the account out everywhere.
- The file `.matrix.conf` was deleted.
- The homeserver ends sessions that were inactive for a long time.

Normally, the integration then signs in again with the password. On a homeserver that doesn't allow password sign-in, that is not possible, so the integration stays signed out until you provide a new access token.

#### Resolution

- If your homeserver allows password sign-in, check the `username` and `password` options in your {% term "`configuration.yaml`" %} file, then restart Home Assistant.
- If your homeserver doesn't allow password sign-in, create a new access token and save it in `.matrix.conf`, as described in [Homeservers that don't allow password sign-in](#homeservers-that-dont-allow-password-sign-in).
