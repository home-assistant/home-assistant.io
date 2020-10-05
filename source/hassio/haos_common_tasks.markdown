---
title: "Home Assistant OS Common Tasks"
description: "Guides for common tasks when using Home Assistant OS"
---

This section will provide guides to some common tasks and information which you will need in order to run, maintain, and edit your Home Assistant OS system. For further details on any particular subject, make sure to refer to the documentation for specific add-ons or topics listed here.

## Configuring access to files

One of the first things to take care of after installing Home Assistant OS is to provide yourself access to files. There are several add-ons commonly used for this, and most users employ a mix of various add-ons. Default directories on the host are mapped to the add-ons so that they can be accessed by the services any particular add-on might provide. On the host system these directories exist on the `/data` partition at `/mnt/data/supervisor/`. 

Using any of the add-ons listed below,the following directories are made available for access:

- addons
- backup
- config
- media
- share
- ssl

---

### Installing and using the Samba add-on

The Samba add-on creates smb shares which can be accessed from another computer. You can also edit files using the editor of your preference from your client computer.

Configuring the add-on is straight-forward. You only need to set a user and password of your choice on the configuration page, save, and then start the add-on. The add-on will not start without setting a password!

For connecting from Windows 10, you can enter the ip address or hostname of your Home Assistant instance in File Explorer's address bar with two backslashes, as shown in the example screenshot.

![explorer address bar](TBD image of file explorer address bar.jpg)

You should then be prompted for the credentials you entered in the Samba add-on configuration. You also have the option of having the credentials stored so that you do not need to enter them again. After that, you'll have access to the directories which you can then mount as a drive or pin to Quick Access.

![directories](TBD image of directories.jpg)

For OS X, connecting to the shares is a matter of using the Finder menu > Go > Connect to Server...
You would then enter the ip address of your Home Assistant OS instance as `smb://your.ha.ip.address` and enter your credentials when prompted.

---

### Installing and using the SSH add-on (requires enabling advanced mode for the HA user)

The Terminal & SSH add-on provides access over an ssh connection, and also inludes nano and vi editors.  In addition, it provides access to the Home Assistant Command Line Interface (CLI) which provides custom commands for checking logs, stopping and starting Home Assistant and add-ons, creating/restoring snapshots, and more. (See [Home Assistant via Command Line](https://www.home-assistant.io/hassio/commandline/) for further info). The Terminal & SSH add-on does *not* provide access to the underlying host file system.

To use the add-on, enter a password or public key on the configuration page, then save and start the add-on. In order to access from an ssh client, a port needs to be entered in the network section of the add-on's configuration page.

By default the Terminal & SSH addon provides a web terminal which can be added as an item to your side-panel. 

---

### Installing and using the Visual Studio Code (VSC) add-on

The Visual Studio Code add-on provides access through a feature packed web-based version of the VSC editor and currently only supports AMD64 and aarch64/ARM64 machines. The add-on also provides access to the Home Assistant Command Line Interface (CLI) using VSC's built in terminal, which allows for checking logs, stopping and starting Home Assistant and add-ons, creating/restoring snapshots, and more. (See [Home Assistant via Command Line](https://www.home-assistant.io/hassio/commandline/) for further info).

There is no configuration required for editing files within your /config directory. In order to enable access to further directories, editing the add-on configuration is required. See the add-on documentation for details. 

---

### Installing and using the File Editor add-on

A more basic and light weight alternative to Visual Studio Code, the File Editor add-on provides access through Hass-Configurator, which is a web-based filesystem-browser and text-editor. YAML files are automatically checked for syntax errors while editing.

There is no configuration required for editing files within your /config directory. In order to enable access to further directories, editing the add-on configuration is required. See the add-on documentation for details. 

---

## Home Assistant OS Snapshots

Snapshots are a compressed archive file (.tar) of your Home Assistant configuration, in addition to any add-on data and configuration. These are easily made in Home Assistant OS from the Supervisor Snapshot panel and are also available as services which can be used in automations. They can be created from the UI or the CLI (see below) and are stored in the /backup directory.

A full snapshot includes the following directories:

* config
* share
* add-ons (these are manually installed or created add-ons, and not those installed from the store)
* ssl
* media

A partial snapshot consists of any number of the above default directories and installed add-ons.

### Making a Snapshot from the UI

1. Go to Supervisor > Snapshots in the UI
2. Provide a name for the snapshot.
3. Choose full or partial.
4. Choose to password protect or not. Password protected snapshots cannot easily be browsed outside of Home Assistant OS
5. Click "Create" to begin the snapshot.

### Restoring a Snapshot on a new install

Restoring a snapshot on a fresh install of Home Assistant OS requires that you first upload the snapshot to the backup directory on the new instance. From the Supervisor Snapshot panel, these can be uploaded using the following steps:

1. Go to Supervisor > Snapshots in the UI 
2. Select "Upload Snapshot" from the icon in the upper right of the page.
3. Click on the folder icon to navigate to your snapshot .tar file

When the upload is completed, the snapshot panel should display your newly uploaded file. If not, use the "Reload" option from the icon in the upper right of the page. From there you can select it and then choose to restore it in full or in part, by manually selecting individual folders or add-ons.

If a snapshot is significantly large, it can be faster and more efficient to make use of the Samba add-on in order to transfer files to the `/backup` directory. 


### How long do snapshots take?

The length of time it takes to create or restore snapshots will depend on how much you have to compress or decompress. 

A large database file or a collection of camera media captured by MotionEye will take longer to decompress (the default database is the sqllite home-assistant_v2.db in the config directory). See the [`recorder`](https://www.home-assistant.io/components/recorder/) integration page for options to keep your database data down to a size that won't cause issues. Note the keep days, purge interval, and include/exclude options.

When the restore is complete, you will lose connection to the UI and it will return just as though you had restarted Home Assistant.

### Creating snapshots using the custom cli

1. `ha sn list` - lists snapshots and their slugnames
2. `ha sn restore slugname` - restores a specific snapshot
3. `ha sn new --name nameofsnapshot` - create a snapshot

Use `ha help` to see more info.


### Copying your snapshots to another location

The snapshots won't be very convenient if they are on the device which you cannot access. Copy them off in batches manually from /backup on occasion. Or even better, create an automation to handle that, or make use of an add-on like Google Drive backup or Dropbox Sync.

 - [Hass.io Google Drive Backup](https://github.com/sabeechen/hassio-google-drive-backup)

 - [Dropbox Sync](https://github.com/danielwelch/hassio-dropbox-sync)

 - [Samba backup](https://github.com/thomasmauerer/hassio-addons/tree/master/samba-backup)

 - [Remote Backup (uses scp)](https://github.com/overkill32/hassio-remote-backup)


