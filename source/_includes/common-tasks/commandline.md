## Home Assistant via the command line

<p class='img'>
<img src='/images/hassio/screenshots/ssh-upgrade.png'>
Home Assistant upgrade process from the SSH command line
</p>

On the SSH command line, you can use the `ha` command to retrieve logs, check the details of connected hardware, and more.

### Home Assistant

```bash
ha core check
ha core info
ha core logs
ha core options
ha core rebuild
ha core restart
ha core start
ha core stats
ha core stop
ha core update
```

### Supervisor

```bash
ha supervisor info
ha supervisor logs
ha supervisor reload
ha supervisor update
```

### Host

```bash
ha host reboot
ha host shutdown
ha host update
```

### Hardware

```bash
ha hardware info
ha hardware audio
```

### Usage examples

To update Home Assistant to a specific version, use the command:

```bash
ha core update --version x.y.z
```

Replace x.y.z with the desired version like `--version {{current_version}}`

You can get a better description of the CLI capabilities by typing `ha help`:

```bash
The Home Assistant CLI is a small and simple command line utility that allows
you to control and configure different aspects of Home Assistant

Usage:
  ha [command]

Available Commands:
  addons         Install, update, remove and configure Home Assistant add-ons
  audio          Audio device handling.
  authentication Authentication for Home Assistant users.
  banner         Prints the CLI Home Assistant banner along with some useful information
  cli            Get information, update or configure the Home Assistant cli backend
  core           Provides control of the Home Assistant Core
  dns            Get information, update or configure the Home Assistant DNS server
  docker         Docker backend specific for info and OCI configuration
  hardware       Provides hardware information about your system
  help           Help about any command
  host           Control the host/system that Home Assistant is running on
  info           Provides a general Home Assistant information overview
  jobs           Get information and manage running jobs
  multicast      Get information, update or configure the Home Assistant Multicast
  network        Network specific for updating, info and configuration imports
  observer       Get information, update or configure the Home Assistant observer
  os             Operating System specific for updating, info and configuration imports
  resolution     Resolution center of Supervisor, show issues and suggest solutions
  snapshots      Create, restore and remove snapshot backups
  supervisor     Monitor, control and configure the Home Assistant Supervisor

Flags:
      --api-token string   Home Assistant Supervisor API token
      --config string      Optional config file (default is $HOME/.homeassistant.yaml)
      --endpoint string    Endpoint for Home Assistant Supervisor (default is 'supervisor')
  -h, --help               help for ha
      --log-level string   Log level (defaults to Warn)
      --no-progress        Disable the progress spinner
      --raw-json           Output raw JSON from the API

Use "ha [command] --help" for more information about a command.
```

{% if page.installation == "os" %}
### Console access

You can also access the Home Assistant Operating System via a directly connected keyboard and monitor, the console. To log in to the physical console the username is `root`, with no password.

{% endif %}
