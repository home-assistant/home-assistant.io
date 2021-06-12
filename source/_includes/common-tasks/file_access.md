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

The Terminal & SSH add-on provides access over an SSH connection, and also includes nano and vi editors. It can be installed from the add-on store's Official add-on repository after enabling advanced mode for your Home Assistant user's profile. Addtionally, this add-on provides access to the Home Assistant Command Line Interface (CLI) which provides custom commands for checking logs, stopping and starting Home Assistant and add-ons, creating/restoring snapshots, and more. (See [Home Assistant via Command Line](https://www.home-assistant.io/hassio/commandline/) for further info). The Terminal & SSH add-on does *not* provide access to the underlying host file system. 

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
