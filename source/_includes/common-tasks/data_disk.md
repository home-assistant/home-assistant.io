## Using external data disk

{% term "Home Assistant Operating System" %} supports storing data on a secondary storage medium. For example, this can be a second internal SSD or HDD or a USB attached SSD or HDD. This data disk contains not only user data but also most of the Home Assistant software as well (Core, Supervisor, etc.). This means a fast data disk will make the system overall much faster.

![Graphics showing the architecture of the data disk feature](/images/haos/usb-data-disk.png)

The data disk feature can be used on an existing installation without losing data: The system will move existing data to the external data disk automatically. However, it is recommended to create and download a full <a href="#backups">Backup</a> before proceeding!

{% caution %}
All data on the target disk will be overwritten!
{% endcaution %}

{% important %}
The storage capacity of the external data disk must be larger than the storage capacity of the existing (boot) disk.
{% endimportant %}

{% important %}
If you have been using a data disk previously with {% term "Home Assistant Operating System" %}, you need to use your host computer to delete all partitions *before* using it as a data disk again.
{% endimportant %}

### Using UI to move the data partition

1. Connect the data disk to your system.
2. Go to **{% my storage title="Settings > System > Storage" %}** in the UI.
3. Select **Move data disk**.
4. Select the data disk from the list of available devices.
5. Select **Move**.
   - Depending on the amount of data, this may take a while.

### Using CLI to move the data partition

To see the current data disk use:

```sh
$ ha os info
...
data_disk: /dev/mmcblk1p4
...
```

To get a list of potential targets which can be used by `datadisk`:

```sh
ha os datadisk list
```

To initiate the move to the new data disk use the `move` command:

```sh
ha os datadisk move /dev/sdx
```

The system will prepare the data disk and immediately reboot. The reboot will take 10 minutes or more depending on the speed of the new data disk; please be patient!

{% warning %}
Using an USB attached SSD can draw quite some power. For instance on Raspberry Pi 3 the official Raspberry Pi power supply (PSU) only provides 2.5A which can be too tight. Use a more powerful power supply if you experience issues. Alternatively use a powered USB hub. Connect the Hub to one of the USB slots of your Raspberry Pi, and connect the SSD to the Hub. In this setup the power supply of the Hub will power the attached device(s).
{% endwarning %}

### Migrating an external data disk to another system

This section shows how to move an external data disk from one system to another.
This can be an option if the following elements apply to your use case:

- You already have a functioning Home Assistant instance (system 1) that is using an external data disk.
- You have another, new, Home Assistant instance (system 2).
- You now want to use the data disk of system 1 on system 2 instead.

The aim is to migrate the data from system 1 to system 2. One way to do this is by [restoring a backup](/common-tasks/general/#restoring-a-backup). The other way is to move the data disk. This can be an interesting option if you have a large amount of data on your external disk or if your external disk has more storage capacity than your new system.

#### Prerequisites

- A Home Assistant instance using an external data disk (system 1)
- A Home Assistant instance to which you want to move the external data disk (system 2)

#### To migrate an external data disk to another system

To migrate an external data disk from one system to another, follow these steps:

1. [Create a backup](/common-tasks/general/#backups) of both systems and store these backups on another system (not strictly necessary, but recommended just in case, at least for the important data).
2. Shut down system 1 and remove the data disk.
3. Make sure system 2 has Home Assistant OS installed, and Home Assistant is up and running. Home Assistant is using the data disk (partition) on the boot drive (e.g. SD card) at this point.
4. Make sure system 2 has completed the basic [onboarding](/getting-started/onboarding/) steps, including the last steps where devices are discovered automatically.
5. Plug the external disk into system 2 and go to the **Settings** > **System**. Select the three dots {% icon "mdi:dots-vertical" %} menu, and **Restart Home Assistant** > **Reboot system**.
   **Result**: A repair issue is displayed **Multiple data disks detected**.
   - The repair issue comes up because system 2 now sees two file systems with an identical name. During a reboot, there is a name conflict with the existing data disk as it is undefined which file system should be used. This can lead to a random selection of the system you end up with. Hence you must make a decision.
6. Open the repair issue and choose one of the options:
   - Select **Use the detected data disk instead of the current system**.
     - This will override the current file system of system 2 and use your external data disk instead.
     - You won't have access anymore to the current Home Assistant data. It will be marked as inactive data disk.
   - If you changed your mind about using the external data disk:
     - Unplug the external data disk.
     - If you cannot unplug the external data disk for some reason, select **Mark as inactive data disk (rename file system)**.
       - This makes sure that there is no name conflict after rebooting.
       - It also means you cannot use the file system that is stored on your external disk.
       - You keep using the current file system of system 1.
