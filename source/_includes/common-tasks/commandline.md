## Home Assistant via the command line

On the [SSH command line](/common-tasks/os/#installing-and-using-the-ssh-add-on), you can use the `ha` command to retrieve logs, check the details of connected hardware, and more.

### Home Assistant

```bash
ha core check
ha core info
ha core logs
ha core options
ha core rebuild
ha core restart
ha core restart --safe-mode
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

```txt
The Home Assistant CLI is a small and simple command line utility that allows
you to control and configure different aspects of Home Assistant

Usage:
  ha [command]

Available Commands:
  addons         Install, update, remove and configure Home Assistant add-ons
  audio          Audio device handling.
  authentication Authentication for Home Assistant users.
  backups        Create, restore and remove backups
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

You can also access the {% term "Home Assistant Operating System" %} via a directly connected keyboard and monitor, the console.

#### Wiping the data disk from the command line

In {% term "Home Assistant Operating System" %}, the `ha os datadisk wipe` command wipes the data disk. The command deletes all user data as well as Home Assistant Core, Supervisor, and any installed add-ons.

The command `ha os datadisk wipe` marks the data partition (either internal on the eMMC or the SD card, or on an external attached data disk) as to be cleared on the next reboot. The command automatically reboots the system. Upon reboot, the data is cleared. Then the system continues to boot and reinstalls the latest version of all Home Assistant components.

The `ha os datadisk wipe` command can only be run from the local terminal. Connect a display and keyboard and use the terminal.

Note, some systems have a reset button you can use to clear the data disk, instead of using the command line:

- If you have a Home Assistant Yellow with a Raspberry Pi Compute Module 5, use the command line steps described above.

- If you have a Home Assistant Yellow with a Raspberry Pi Compute Module 4, there is a red hardware button to wipe the data disk. Follow the procedure on [resetting the Home Assistant Yellow](https://yellow.home-assistant.io/guides/factory-reset/).
- If you have a Home Assistant Green, there is a black hardware button to wipe the data disk. Follow the procedure on [resetting the Home Assistant Green](https://green.home-assistant.io/guides/reset/).

#### Listing all users from the command line

In {% term "Home Assistant Operating System" %}, the `ha auth list` command lists all users that are registered on your Home Assistant.

The `ha auth list` command can only be run from the local terminal. Connect a display and keyboard and use the terminal.

{% endif %}
