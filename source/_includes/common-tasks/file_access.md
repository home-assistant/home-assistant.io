## Configuring access to files

Your Home Assistant Operating server includes two repositories by default: The official core add-on repository, and the community add-on repository. All of the add-ons mentioned here can be installed by navigating to the add-on store using {% my supervisor_store title="Settings > Add-ons > Add-on Store" %} in the UI.

One of the first things to take care of after installing Home Assistant OS is to provide yourself access to files. There are several add-ons commonly used for this, and most users employ a mix of various add-ons. Default directories on the host are mapped to the add-ons so that they can be accessed by the services any particular add-on might provide. On the host system these directories exist on the `/data` partition at `/mnt/data/supervisor/`.

Using any of the add-ons listed below, the following directories are made available for access:

- `addons`
- `backup`
- `config`
- `media`
- `share`
- `ssl`

---

### Installing and using the Samba add-on

The **Samba** add-on allows you to share the directories on Home Assistant with other systems on your network. After installing the add-on, you can then also edit files using the editor of your preference from your client computer. This add-on can be installed from the add-on store's official repository.

To install the add-on, follow these steps:

1. Go to {% my supervisor_addon title="**Settings** > **Add-ons** > **Samba share**" addon="core_samba" %} and select **Install**.
2. On the **Configuration** tab, define **Username** and **Password**, store them in a safe place, and save your changes.
   - You can specify any username and password.
   - They are not related to the login credentials you use to log in to Home Assistant or to log in to the computer from which you are accessing the files.
   - The add-on won't start if username and password are not defined.
3. For further configuration information, refer to the **Documentation** tab.
4. To start the add-on, on the **Information** tab, select **Start**.

To access the Home Assistant directories from the other device, follow these steps:

1. Go to {% my network title="**Settings** > **System** > **Network**" %} and take note of the **Host name**.
   - Alternatively, you can look up the host name or IP address of your Home Assistant on your router.
2. How you connect from another device to Home Assistant depends on your system. Use one of the following options:
   - **On Windows**: Open **File Explorer** and in the address bar, enter the IP address or hostname with two backslashes as `\\your.ha.ip.address` or `\\hostname`.

     <p class='img'>
         <img src='/images/hassio/screenshots/file_explorer.png' alt='Screenshot of File Explorer displaying the navigation to a file share using an IP address'>
         Screenshot of File Explorer displaying the navigation to a file share using an IP address
     </p>

   - **On OS X**: Open **Finder** and select **Go** > **Connect to Server...** and enter the IP address or hostname as `smb://your.ha.ip.address` or `smb://hostname`.
   - **On Ubuntu**: Open **Files** and in the address bar, enter the IP address or hostname as `smb://your.ha.ip.address` or `smb://hostname`.

3. Enter the credentials you entered in the **Samba** add-on configuration.
   - You also have the option of having the credentials stored so that you do not need to enter them again.
4. Done! You now have access to the directories which you can then mount as a drive or pin to Quick Access.

---

### Installing and using the Visual Studio Code (VSC) add-on

The **Studio Code Server** add-on provides access through a feature-packed web-based version of the Visual Studio Code editor. It currently only supports AMD64 and aarch64/ARM64 machines. The add-on also provides access to the Home Assistant Command Line Interface (CLI) using VSC's built-in terminal, which allows for checking logs, stopping, and starting Home Assistant and add-ons, creating/restoring backups, and more. (See [Home Assistant via Command Line](/hassio/commandline/) for further info).

<p class='img'>
<img src='/images/docs/configuration/config-yaml_via-vscode.png' alt='Screenshot of an example of a configuration.yaml file, accessed using the File editor add-on on a Home Assistant Operating System installation.'>
Example of a configuration.yaml file, accessed using the Studio Code Server add-on on a Home Assistant Operating System installation.
</p>

To install and use the  **Studio Code Server** in Home Assistant, follow these steps:

1. To install the add-on, go to {% my supervisor_addon title="**Settings** > **Add-ons** > **Studio Code Server**" addon="a0d7b954_vscode" %} and install the add-on.
2. Once you have the add-on installed, if you want, select the **Show in sidebar** option. Then, select **Start**.
3. For information on configuration settings, open the **Documentation** tab.
4. To start browsing, on the **Info** tab, select **Open Web UI**.

---

### Installing and using the File Editor add-on

The **File Editor** add-on is a web-based file system browser and text editor. It is a more basic and light weight alternative to Visual Studio Code. YAML files are automatically checked for syntax errors while editing.

<p class='img'>
<img src='/images/docs/configuration/config-yaml_via-file-editor.png' alt='Screenshot of an example of a configuration.yaml file, accessed using the File editor add-on on a Home Assistant Operating System installation.'>
Example of a configuration.yaml file, accessed using the File editor add-on on a Home Assistant Operating System installation.
</p>

To install and use the File Editor in Home Assistant, follow these steps:

1. To install the add-on, go to {% my supervisor_addon title="**Settings** > **Add-ons** > **File editor**" addon="core_configurator" %}.
   - Once you have the add-on installed, you can edit files within your `/config` directory.
2. If you want to be able to access directories outside the `/config` directory, in the add-on, open the **Configuration** tab and disable the **Enforce basepath** option.
   - Note: The **Enforce basepath** option is intended to protect you from inadvertently making changes to settings files.
3. For information on other configuration settings, open the **Documentation** tab.
4. To confirm your changes, select **Save**.
5. To start browsing, on the **Info** tab, select **Open Web UI**.

---

### Installing and using the SSH add-on

If you want to use the Home Assistant command line or an SSH client, you can do this through the **Terminal & SSH** add-on.

The **Terminal & SSH** add-on provides the following functionalities:

- It provides a web terminal that you can access from the Home Assistant user interface.
- It allows you to use the Home Assistant Command Line Interface (CLI) which provides custom commands for checking logs, stopping and starting Home Assistant and add-ons, creating/restoring backups, and more.
  - For a list of command line commands, refer to [Home Assistant via Command Line](/common-tasks/os#home-assistant-via-the-command-line).
- It allows connecting to your system using an SSH client.
- It also includes common tools like nano and vi editors.
- The Terminal & SSH add-on does **not provide** access to the underlying host file system.

To get started with the **Terminal & SSH** add-on, follow these steps:

1. In the bottom left, select your user to open the {% my profile title="**Profile**" %} page. Make sure **Advanced Mode** is enabled.
2. To install the add-on, go to the add-on store under [**Settings** > **Add-ons**](https://my.home-assistant.io/redirect/supervisor_addon/?addon=core_ssh) and install the **Terminal & SSH** add-on.
3. To use the web terminal, **start** the add-on, then select **Open Web UI**.
   - You can now start typing your [commands](/common-tasks/os#home-assistant-via-the-command-line).
4. If you want to access from an ssh client, you need to enter credentials:
   - Open the **Configuration** page.
   - Enter a password or authorized Keys.
   - Then save and start the add-on.
