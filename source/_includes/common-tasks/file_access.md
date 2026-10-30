## Configuring access to files

{% term "Home Assistant Operating System" %} includes five app repositories by default: **Official apps**, **Home Assistant Community Apps**, **ESPHome**, **Music Assistant**, and **Local apps**. You can install all the apps mentioned here from the app store. To open the app store, go to {% my supervisor_store title="**Settings** > **Apps** > **Install app**" %}.

One of the first things to take care of after installing Home Assistant OS is to provide yourself access to files. There are several apps commonly used for this, and most users employ a mix of various apps. Default directories on the host are mapped to the apps so that they can be accessed by the services any particular app might provide. On the host system these directories exist on the `/data` partition at `/mnt/data/supervisor/`.

Depending on the app, you can access some or all of the following folders:

- `app_configs`
- `backup`
- `config`
- `local_apps`
- `media`
- `share`
- `ssl`

Some apps use the earlier names `addons` and `addon_configs` for `local_apps` and `app_configs`. The **Samba share** app shares these folders under both names.

---

### Installing and using the Samba share app

The **Samba share** app allows you to share the directories on Home Assistant with other systems on your network. After installing the app, you can then also edit files using the editor of your preference from your client computer. You can install it from the **Official apps** repository.

To install the app, follow these steps:

1. Go to {% my supervisor_addon title="**Settings** > **Apps** > **Samba share**" addon="core_samba" %} and select **Install**.
2. On the **Configuration** tab, define **Username** and **Password**, store them in a safe place, and save your changes.
   - You can specify any username and password.
   - They are not related to the login credentials you use to log in to Home Assistant or to log in to the computer from which you are accessing the files.
   - The app won't start if username and password are not defined.
3. For further configuration information, refer to the **Documentation** tab.
4. To start the app, on the **Info** tab, select **Start**.

To access the Home Assistant directories from the other device, follow these steps:

1. Go to {% my network title="**Settings** > **System** > **Network**" %} and take note of the **Hostname**.
   - Alternatively, you can look up the hostname or IP address of your Home Assistant on your router.
2. How you connect from another device to Home Assistant depends on your system. Use one of the following options:
   - **On Windows**: Open **File Explorer** and in the address bar, enter the IP address or hostname with two backslashes as `\\your.ha.ip.address` or `\\hostname`.

     <p class='img'>
         <img src='/images/hassio/screenshots/file_explorer.png' alt='Screenshot of File Explorer displaying the navigation to a file share using an IP address'>
         Screenshot of File Explorer displaying the navigation to a file share using an IP address
     </p>

   - **On macOS**: Open **Finder** and select **Go** > **Connect to Server...** and enter the IP address or hostname as `smb://your.ha.ip.address` or `smb://hostname`.
   - **On Ubuntu**: Open **Files** and in the address bar, enter the IP address or hostname as `smb://your.ha.ip.address` or `smb://hostname`.

3. Enter the credentials you entered in the **Samba share** app configuration.
   - You also have the option of having the credentials stored so that you do not need to enter them again.
4. Done! You now have access to the directories which you can then mount as a drive or pin to Quick Access.

---

### Installing and using the Studio Code Server app

The **Studio Code Server** app provides access through a feature-packed web-based version of the Visual Studio Code editor. It currently only supports AMD64 and aarch64/ARM64 machines. The app also provides access to the Home Assistant Command Line Interface (CLI) using its built-in terminal, which allows for checking logs, stopping, and starting Home Assistant and apps, creating/restoring backups, and more. (See [Home Assistant via Command Line](/common-tasks/os/#home-assistant-via-the-command-line) for further info).

<p class='img'>
<img src='/images/docs/configuration/config-yaml_via-vscode.png' alt='Screenshot of an example of a configuration.yaml file, accessed using the Studio Code Server app on a Home Assistant Operating System installation.'>
Example of a configuration.yaml file, accessed using the Studio Code Server app on a Home Assistant Operating System installation.
</p>

To install and use the **Studio Code Server** app, follow these steps:

1. Go to {% my supervisor_addon title="**Settings** > **Apps** > **Studio Code Server**" addon="a0d7b954_vscode" %} and select **Install**.
2. Optional: On the **Info** tab, turn on **Show in sidebar**.
   - For what this option does, refer to [App options](/common-tasks/os/apps/#app-options).
3. On the **Info** tab, select **Start**.
4. For information on configuration settings, open the **Documentation** tab.
5. To start browsing, on the **Info** tab, select **Open Web UI**.

---

### Installing and using the File editor app

The **File editor** app is a web-based file system browser and text editor. It is a more basic and lightweight alternative to the **Studio Code Server** app. YAML files are automatically checked for syntax errors while editing.

<p class='img'>
<img src='/images/docs/configuration/config-yaml_via-file-editor.png' alt='Screenshot of an example of a configuration.yaml file, accessed using the File editor app on a Home Assistant Operating System installation.'>
Example of a configuration.yaml file, accessed using the File editor app on a Home Assistant Operating System installation.
</p>

To install and use the **File editor** app, follow these steps:

1. Go to {% my supervisor_addon title="**Settings** > **Apps** > **File editor**" addon="core_configurator" %} and select **Install**.
   - By default, the app gives you access to the files in your `/config` directory.
2. If you want to access directories outside the `/config` directory, turn off the **Enforce Basepath** option:
   - Open the **Configuration** tab.
   - Turn off **Enforce Basepath**, and then select **Save**.
   - The **Enforce Basepath** option protects you from accidentally changing files outside the `/config` directory.
3. For information on other configuration settings, open the **Documentation** tab.
4. To start the app, on the **Info** tab, select **Start**.
5. To start browsing, on the **Info** tab, select **Open Web UI**.

---

### Installing and using the SSH app

If you want to use the Home Assistant command line or an SSH client, you can do this through the **Terminal & SSH** app.

The **Terminal & SSH** app provides the following functionalities:

- It provides a web terminal that you can access from the Home Assistant user interface.
- It allows you to use the Home Assistant Command Line Interface (CLI) which provides custom commands for checking logs, stopping and starting Home Assistant and apps, creating/restoring backups, and more.
  - For a list of command line commands, refer to [Home Assistant via Command Line](/common-tasks/os/#home-assistant-via-the-command-line).
- It allows connecting to your system using an SSH client.
- It also includes common tools like nano and vi editors.
- The Terminal & SSH app does **not provide** access to the underlying host file system.

To get started with the **Terminal & SSH** app, follow these steps:

1. Go to {% my supervisor_addon title="**Settings** > **Apps** > **Terminal & SSH**" addon="core_ssh" %} and select **Install**.
2. To use the web terminal, on the **Info** tab, select **Start**, and then select **Open Web UI**.
   - You can now start typing your [commands](/common-tasks/os/#home-assistant-via-the-command-line).
3. If you want to connect with an SSH client, you need to enter credentials and a port:
   1. Open the **Configuration** tab.
   2. Under **Authorized Keys**, add your public key, or enter a **Password**. Then, select **Save**.
   3. Under **Network**, select **Show disabled ports**. For **SSH Port**, enter a port, for example `22`. Then, select **Save**.
   4. On the **Info** tab, select **Restart**.
