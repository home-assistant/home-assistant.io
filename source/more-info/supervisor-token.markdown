---
title: "Supervisor API token deprecation"
description: "How to find and replace calls to the Supervisor API that use the SUPERVISOR_TOKEN or HASSIO_TOKEN environment variables."
related:
  - docs: /integrations/hassio/
    title: Home Assistant Supervisor integration
  - docs: /integrations/command_line/
    title: Command line integration
  - docs: /integrations/shell_command/
    title: Shell command integration
---

Home Assistant no longer uses the `SUPERVISOR_TOKEN` (or the older `HASSIO_TOKEN`) environment variable to call the Supervisor API. Support for calling the Supervisor API over the network with this token ends in Home Assistant 2027.6.0. After that, anything that still does will stop working.

If you see the **Deprecated use of the Supervisor API token** repair, something in your Home Assistant is still making these calls. This page helps you find it and replace it.

## Finding the source

The repair shows one example of a path that was called. To see every path, check the Supervisor logs:

1. Go to {% my logs title="**Settings** > **System** > **Logs**" %}.
2. In the top right, select **Supervisor**.
3. Look for warnings like this one. One is logged for each distinct path:

   ```text
   Request to /supervisor/info used Home Assistant's Supervisor token over TCP.
   ```

Then search your configuration for `SUPERVISOR_TOKEN` and `HASSIO_TOKEN`. These calls are usually in a [command line](/integrations/command_line/) sensor or a [shell command](/integrations/shell_command/), often together with `curl` and `http://supervisor/`. Also check any scripts these commands run.

If you can't find it in your configuration, it is probably coming from a custom integration. Report it to the integration's developer and refer them to this page.

## Replacing the calls

Use the first option that works for you.

### Use an entity

The [Home Assistant Supervisor integration](/integrations/hassio/) provides entities for much of what people used to read from the Supervisor API. For example:

- [Update entities](/integrations/update/) for Home Assistant Core, Supervisor, Operating System, and each installed app, with the installed and latest versions.
- Sensors for each app's version, CPU, and memory use, and for disk usage. Some of these are disabled by default, so you may need to [enable them](/docs/configuration/customizing-entities/#disabling-or-enabling-an-entity) first.

A common example is a command line sensor that tracks available updates:

{% raw %}

```yaml
# Replace this
command_line:
  - sensor:
      name: Supervisor updates
      command: 'curl http://supervisor/supervisor/info -H "Authorization: Bearer $(printenv SUPERVISOR_TOKEN)" | jq ''{"newest_version":.data.version_latest,"current_version":.data.version,"update_available":.data.update_available,"addons":[.data.addons[] | select(.update_available)]}'''
      value_template: "{{ value_json.addons | length }}"
      json_attributes:
        - newest_version
        - current_version
        - update_available
        - addons
```

{% endraw %}

Remove this sensor and use the update entities instead. An update entity is `on` when an update is available, and its `installed_version` and `latest_version` attributes hold the versions. To count apps with an update available, use a template:

{% raw %}

```yaml
template:
  - sensor:
      - name: Apps with updates
        state: >
          {{ states.update
             | selectattr('state', 'eq', 'on')
             | map(attribute='entity_id')
             | select('is_device_attr', 'model', 'Home Assistant App')
             | list | count }}
```

{% endraw %}

### Use an action

Actions exist for the most common changes. Use them in an automation or script instead of a shell command:

- [Supervisor actions](/integrations/hassio/), such as `hassio.app_start`, `hassio.app_stop`, `hassio.app_restart`, and `hassio.host_reboot`.
- [Backup actions](/integrations/backup/), such as `backup.create_automatic`.
- `update.install` to install an update for an app, Home Assistant Core, Supervisor, or Operating System.

For example, a shell command that restarts an app:

```yaml
# Replace this
shell_command:
  restart_mosquitto: 'curl -X POST http://supervisor/addons/core_mosquitto/restart -H "Authorization: Bearer $(printenv SUPERVISOR_TOKEN)"'
```

Can be replaced with this action:

```yaml
action: hassio.app_restart
data:
  app: core_mosquitto
```

### Call the Supervisor socket

If no entity or action does what you need, you can still call the Supervisor API directly over its Unix socket. The path to the socket is in the `SUPERVISOR_SOCKET` environment variable. Calls over the socket don't need a token, so remove the `Authorization` header and replace `http://supervisor` with `http://localhost`:

```yaml
# Replace this
shell_command:
  supervisor_reload: 'curl -X POST http://supervisor/supervisor/reload -H "Authorization: Bearer $(printenv SUPERVISOR_TOKEN)"'
```

```yaml
# With this
shell_command:
  supervisor_reload: 'curl -X POST --unix-socket "$SUPERVISOR_SOCKET" http://localhost/supervisor/reload'
```

The socket is only available to commands that run inside the Home Assistant container, such as command line sensors and shell commands. It isn't available to apps or anything outside Home Assistant.

## Custom integrations

Custom integrations should use the Supervisor client Home Assistant provides (`homeassistant.components.hassio.get_supervisor_client`) instead of calling the Supervisor API themselves. It already uses the socket. The client comes from the [aiohasupervisor](https://github.com/home-assistant-libs/python-supervisor-client) library.
