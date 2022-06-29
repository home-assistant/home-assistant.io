## Using external Data Disk

Home Assistant Operating System supports storing most data on an external storage medium (e.g. USB attached SSD or HDD). This data disk contains not only user data but also most of the Home Assistant software as well (Core, Supervisor etc.). This means a fast data disk will make the system overall much faster.

![Graphics showing the architecture of the data disk feature](/images/haos/usb-data-disk.png)

The data disk feature can be used on an existing installation without losing data: The system will move existing data to the external data disk automatically. However, it is recommended to create and download a full <a href="#backups">Backup</a> before proceeding!

<div class='note warning'>

  All data on the target disk will be overwritten!

</div>

<div class='note'>

  The storage capacity of the external data disk must be larger than the storage capacity of the existing (boot) disk.

</div>

<div class='note'>

  If you have been using a data disk previously with Home Assistant Operating System, you need to use your host computer to delete all partitions *before* using it as a data disk again.

</div>

### Using UI to move the data partition

1. Connect the data disk to your system.
2. Go to **{% my storage title="Settings > System > Storage" %}** in the UI.
3. Press the three dots on the top right and choose "Move datadisk"
4. Select the data disk from the list of available devices.
5. Press "Move".

![Screenshot of the "Move datadisk" feature](/images/screenshots/move-datadisk.png)

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

<div class='note'>

Using an USB attached SSD can draw quite some power. For instance on Raspberry Pi 3 the official Raspberry Pi power supply (PSU) only provides 2.5A which can be too tight. Use a more powerful power supply if you experience issues. Alternatively use a powered USB hub. Connect the Hub to one of the USB slots of your Raspberry Pi, and connect the SSD to the Hub. In this setup the power supply of the Hub will power the attached device(s).

</div>
