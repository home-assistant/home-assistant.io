---
title: "Home Assistant OS Common Tasks"
description: "Guides for common tasks when using Home Assistant OS"
---

This section will provide guides to some common tasks and information which you will need in order to run, maintain, and edit your Home Assistant OS system. For further details on any particular subject, make sure to refer to the documentation for specific add-ons or topics listed here.

## Configuring access to files

Your Home Assistant Operating server includes two repositories by default: The official core add-on repository, and the community add-on repository. All of the add-ons mentioned here can be installed by navigating to the add-on store using Supervisor > Add-on Store in the UI.

One of the first things to take care of after installing Home Assistant OS is to provide yourself access to files. There are several add-ons commonly used for this, and most users employ a mix of various add-ons. Default directories on the host are mapped to the add-ons so that they can be accessed by the services any particular add-on might provide. On the host system these directories exist on the `/data` partition at `/mnt/data/supervisor/`. 

Using any of the add-ons listed below,the following directories are made available for access:

- `addons`
- `backup`
- `config`
- `media`
- `share`
- `ssl`



---

### Installing and using the Samba add-on

The Samba add-on creates smb shares which can be accessed from another computer. You can also edit files using the editor of your preference from your client computer. This add-on can be installed from the add-on store's official repository.

To configure the Samba add-on, you only need to set a user and password of your choice on the configuration page, save, and then start the add-on. The add-on will not start without setting a password!

To connect to the Samba server from another device, you will use the IP address or hostname of your server. Either of these can be found on the Supervisor > System > page of your UI within the Host card.

For connecting from Windows 10, you can enter the IP address or hostname in File Explorer's address bar with two backslashes, as shown in the example screenshot.

<img src='/images/hassio/screenshots/file_explorer.png' />

You should then be prompted for the credentials you entered in the Samba add-on configuration. You also have the option of having the credentials stored so that you do not need to enter them again. After that, you'll have access to the directories which you can then mount as a drive or pin to Quick Access.


For OS X, connecting to the shares is a matter of using the Finder menu > Go > Connect to Server...
You would then enter the IP address or hostname of your Home Assistant OS instance as `smb://your.ha.ip.address` or `smb://homeassistant` and enter your credentials when prompted.

---

### Installing and using the SSH add-on (requires enabling advanced mode for the HA user)

The Terminal & SSH add-on provides access over an SSH connection, and also inludes nano and vi editors. It can be installed from the add-on store's Official add-on repository after enabling advanced mode for your Home Assistant user's profile. Addtionally, this add-on provides access to the Home Assistant Command Line Interface (CLI) which provides custom commands for checking logs, stopping and starting Home Assistant and add-ons, creating/restoring snapshots, and more. (See [Home Assistant via Command Line](https://www.home-assistant.io/hassio/commandline/) for further info). The Terminal & SSH add-on does *not* provide access to the underlying host file system. 

To use the add-on, enter a password or public key on its configuration page, then save and start the add-on. 

The Terminal & SSH add-on also provides a web terminal which allows you to access a terminal via the Home Assistant user interface. In order to access from an ssh client, a port needs to be entered in the network section of the add-on's configuration page.

---

### Installing and using the Visual Studio Code (VSC) add-on

The Visual Studio Code add-on provides access through a feature packed web-based version of the Visual Studio Code editor and currently only supports AMD64 and aarch64/ARM64 machines. This add-on can be installed in the add-on store from the Community add-on repository. The add-on also provides access to the Home Assistant Command Line Interface (CLI) using VSC's built in terminal, which allows for checking logs, stopping and starting Home Assistant and add-ons, creating/restoring snapshots, and more. (See [Home Assistant via Command Line](https://www.home-assistant.io/hassio/commandline/) for further info).

There is no configuration required for editing files within your `/config` directory. In order to enable access to other directories, it is necessary to edit the add-on's configuration from its configuration tab. See the add-on documentation for details. 

---

### Installing and using the File Editor add-on

A more basic and light weight alternative to Visual Studio Code, the File Editor add-on provides access through Hass-Configurator, which is a web-based filesystem-browser and text-editor. YAML files are automatically checked for syntax errors while editing. This add-on can be installed via the add-on store from the official add-on repository.

There is no configuration required for editing files within your `/config` directory. In order to enable access to further directories, editing the add-on configuration is required. See the add-on documentation for details. 

---

## Home Assistant OS Snapshots

Snapshots are a backup of your Home Assistant and add-on data and configuration. They are stored in a compressed archive file (.tar). Snapshots are made from the Supervisor Snapshot panel. There is also a service available which allows you to trigger the creation of a snapshot from an automation. Backups are stored in the /backup directory.

A full snapshot includes the following directories:

* `config`
* `share`
* `addons` (only manually installed or created add-ons, not those installed from the store)
* `ssl`
* `media`

A partial snapshot consists of any number of the above default directories and installed add-ons.

### Making a Snapshot from the UI

1. Go to Supervisor > Snapshots in the UI
2. Provide a name for the snapshot.
3. Choose full or partial.
4. Choose to password protect or not. Password protected snapshots cannot easily be browsed outside of Home Assistant OS
5. Click "Create" to begin the snapshot.

### Restoring a Snapshot on a new install

You can make use of snapshots which you have copied off of a previous install to restore to a new installation during the onboarding process. Follow the link at the bottom of the account creation page to upload your snapshot from the previous installation.

For restoring a snapshot at any other time, vist the Supervisor Snapshot panel in your UI and use the following steps:

1. Select "Upload Snapshot" from the icon in the upper right of the page.
2. Click on the folder icon to navigate to your snapshot .tar file and select it.

When the upload is completed, you will be presented with the snapshot restore dialog for restoring it, and can then choose to restore in full or in part by manually selecting individual items.

If the snapshot you are uploading is more than 1GB in size, it can be faster and more efficient to make use of the Samba add-on in order to transfer files to the `/backup` directory.

The length of time it takes to create or restore snapshots will depend on how much you have to compress or decompress. 

If you're looking to slim down your snapshots, check if your configuration directory contains a large database file (`home-assistant_v2.db`). See the [`recorder`](https://www.home-assistant.io/components/recorder/) integration page for options to keep your database data down to a size that won't cause issues. Note the keep days, purge interval, and include/exclude options.

When the restore is complete, Home Assistant will restart to apply the new settings. You will lose the connection to the UI and it will return once the restart is completed.

### Creating snapshots using the Home Assistant Command Line Interface

1. `ha sn list` - lists snapshots and their slugnames
2. `ha sn restore slugname` - restores a specific snapshot
3. `ha sn new --name nameofsnapshot` - create a snapshot

Use `ha help` to see more info.


### Copying your snapshots to another location

You often need a snapshot in case your system has crashed. If you only store them on the crashed device, you won't be able to access it easily. We recommend that you manually copy them from `/backup` to another machine on occasion. Or even better, create an automation to handle that, or make use of one of the following add-ons:

 - [Google Drive Backup](https://github.com/sabeechen/hassio-google-drive-backup)

 - [Dropbox Sync](https://github.com/danielwelch/hassio-dropbox-sync)

 - [Samba backup](https://github.com/thomasmauerer/hassio-addons/tree/master/samba-backup)

 - [Remote Backup (uses scp)](https://github.com/overkill32/hassio-remote-backup)
 

### Lost Password and password reset

Please refer to the [I'm locked out!](https://www.home-assistant.io/docs/locked_out/#home-assistant-including-supervised) documentation page.
