---
title: "Installation on FreeNAS 11.2"
description: "Installation of Home Assistant on your FreeNAS."
---

[FreeNAS](https://www.freenas.org) is a free and open-source network-attached storage (NAS) software based on FreeBSD and the OpenZFS file system. It is licensed under the terms of the BSD License and runs on commodity x86-64 hardware.

This has been tested on FreeNAS 11.3 and should also work on FreeBSD 11.x as well. These instructions assume you already have a running and accessible jail. For more information on creating a jail read the official FreeNAS User Guide regarding [Jails](https://www.ixsystems.com/documentation/freenas/11.3-RELEASE/jails.html). Once you have the jail available, follow the steps below. Directories used follow standard BSD conventions but can be adjusted as you wish.

Enter the Home Assistant jail. If you don't know which name you have given the jail, you can use the `iocage list` command to check.

```bash
# If the jail is called 'HomeAssistant'
iocage exec HomeAssistant
```

Install the suggested packages:

```bash
pkg update
pkg upgrade
pkg install -y autoconf bash ca_root_nss gmake pkgconf python37 py37-sqlite3
```

Create the user and group that Home Assistant will run as. The user/group ID of `8123` can be replaced if this is already in use in your environment.

```bash
pw groupadd -n homeassistant -g 8123
echo 'homeassistant:8123:8123::::::/usr/local/bin/bash:' | adduser -f -
```

Create the installation directory:

```bash
mkdir -p /usr/local/share/homeassistant
chown -R homeassistant:homeassistant /usr/local/share/homeassistant
```

Create the virtualenv and install Home Assistant itself:

```bash
su homeassistant
cd /usr/local/share/homeassistant
python3.7 -m venv .
source ./bin/activate
pip3 install --upgrade pip
pip3 install homeassistant
```

While still in the `venv`, start Home Assistant to populate the configuration directory.

```bash
hass --open-ui
```

Wait until you see:

```bash
(MainThread) [homeassistant.core] Starting Home Assistant
```

Then escape and exit the `venv`.

```bash
deactivate
exit
```

Create the directory and the `rc.d` script for the system-level service that enables Home Assistant to start when the jail starts.

```bash
mkdir /usr/local/etc/rc.d/
```

Then create a file at `/usr/local/etc/rc.d/homeassistant` and insert the content below:

```bash
vi /usr/local/etc/rc.d/homeassistant
```

```bash
#!/bin/sh
#
# Based upon work by tprelog at https://github.com/tprelog/iocage-homeassistant/blob/11.3-RELEASE/overlay/usr/local/etc/rc.d/homeassistant
#
# PROVIDE: homeassistant
# REQUIRE: LOGIN
# KEYWORD: shutdown
#
# homeassistant_user: The user account used to run the homeassistant daemon.
#   This is optional, however do not specifically set this to an
#   empty string as this will cause the daemon to run as root.
#   Default: homeassistant
# homeassistant_group: The group account used to run the homeassistant daemon.
#   This is optional, however do not specifically set this to an
#   empty string as this will cause the daemon to run with group wheel.
#   Default: homeassistant
#
# homeassistant_venv: Directory where homeassistant virtualenv is installed.
#       Default:  "/usr/local/share/homeassistant"
#       Change:   `sysrc homeassistant_venv="/srv/homeassistant"`
#       UnChange: `sysrc -x homeassistant_venv`
#
# homeassistant_config_dir: Directory where homeassistant config is located.
#       Default:  "/home/homeassistant/.homeassistant"
#       Change:   `sysrc homeassistant_config_dir="/home/hass/homeassistant"`
#       UnChange: `sysrc -x homeassistant_config_dir`

# -------------------------------------------------------
# Copy this file to '/usr/local/etc/rc.d/homeassistant'
# `chmod +x /usr/local/etc/rc.d/homeassistant`
# `sysrc homeassistant_enable=yes`
# `service homeassistant start`
# -------------------------------------------------------

. /etc/rc.subr
name=homeassistant
rcvar=${name}_enable

pidfile_child="/var/run/${name}.pid"
pidfile="/var/run/${name}_daemon.pid"
logfile="/var/log/${name}.log"

load_rc_config ${name}
: ${homeassistant_enable:="NO"}
: ${homeassistant_user:="homeassistant"}
: ${homeassistant_group:="homeassistant"}
: ${homeassistant_config_dir:="/home/homeassistant/.homeassistant"}
: ${homeassistant_venv:="/usr/local/share/homeassistant"}

command="/usr/sbin/daemon"
extra_commands="check_config restart test upgrade"

start_precmd=${name}_precmd
homeassistant_precmd() {
    rc_flags="-f -o ${logfile} -P ${pidfile} -p ${pidfile_child} ${homeassistant_venv}/bin/hass --config ${homeassistant_config_dir} ${rc_flags}"
    [ ! -e "${pidfile_child}" ] && install -g ${homeassistant_group} -o ${homeassistant_user} -- /dev/null "${pidfile_child}"
    [ ! -e "${pidfile}" ] && install -g ${homeassistant_group} -o ${homeassistant_user} -- /dev/null "${pidfile}"
    [ -e "${logfile}" ] && rm -f -- "${logfile}"
    install -g ${homeassistant_group} -o ${homeassistant_user} -- /dev/null "${logfile}"
    if [ ! -d "${homeassistant_config_dir}" ]; then
      install -d -g ${homeassistant_group} -o ${homeassistant_user} -m 775 -- "${homeassistant_config_dir}"
    fi
}

stop_postcmd=${name}_postcmd
homeassistant_postcmd() {
    rm -f -- "${pidfile}"
    rm -f -- "${pidfile_child}"
}

upgrade_cmd="${name}_upgrade"
homeassistant_upgrade() {
    service ${name} stop
    su ${homeassistant_user} -c '
      source ${@}/bin/activate || exit 1
      pip3 install --upgrade homeassistant
      deactivate
    ' _ ${homeassistant_venv} || exit 1
    [ $? == 0 ] && homeassistant_check_config && service ${name} start
}

check_config_cmd="${name}_check_config"
homeassistant_check_config() {
    [ ! -e "${homeassistant_config_dir}/configuration.yaml" ] && return 0
    echo "Performing check on Home Assistant configuration:"
    #eval "${homeassistant_venv}/bin/hass --config ${homeassistant_config_dir} --script check_config"
    su ${homeassistant_user} -c '
      source ${1}/bin/activate || exit 2
      hass --config ${2} --script check_config || exit 3
      deactivate
    ' _ ${homeassistant_venv} ${homeassistant_config_dir}
}

restart_cmd="${name}_restart"
homeassistant_restart() {
    homeassistant_check_config || exit 1
    echo "Restarting Home Assistant"
    service ${name} stop
    service ${name} start
}

test_cmd="${name}_test"
homeassistant_test() {
    echo -e "\nTesting virtualenv...\n"
    [ ! -d "${homeassistant_venv}" ] && echo -e " NO DIRECTORY: ${homeassistant_venv}\n" && exit
    [ ! -f "${homeassistant_venv}/bin/activate" ] && echo -e " NO FILE: ${homeassistant_venv}/bin/activate\n" && exit

    ## switch users / activate virtualenv / get version
    su "${homeassistant_user}" -c '
      source ${1}/bin/activate || exit 2
      echo " $(python --version)" || exit 3
      echo " Home Assistant $(pip3 show homeassistant | grep Version | cut -d" " -f2)" || exit 4
      deactivate
    ' _ ${homeassistant_venv}

    [ $? != 0 ] && echo "exit $?"
}

load_rc_config ${name}
run_rc_command "$1"
```

Make the `rc.d` script executable:

```bash
chmod +x /usr/local/etc/rc.d/homeassistant
```

Configure the service to start on boot and start the Home Assistant service:

```bash
sysrc homeassistant_enable="YES"
service homeassistant start
```

You can also restart the jail to ensure that Home Assistant starts on boot.

<div class='note'>

USB Z-Wave sticks may give `dmesg` warnings similar to "data interface 1, has no CM over data, has no break". This doesn't impact the function of the Z-Wave stick in Home Assistant. Just make sure the proper `/dev/cu*` is used in the Home Assistant `configuration.yaml` file.

</div>

## Adding support for Z-Wave stick

The following two packages need to be installed in the jail

```bash
pkg install gmake
pkg install libudev-devd
```

Then you can install the Z-Wave package

```bash
su homeassistant
cd /usr/local/share/homeassistant
source ./bin/activate.csh
pip3 install homeassistant-pyozw==0.1.7
deactivate
exit
```

Stop the Home Assistant Jail

```bash
sudo iocage stop HomeAssistant
```

Edit the devfs rules on the FreenNAS Host

```bash
vi /etc/devfs.rules
```

Add the following lines

```bash
[devfsrules_jail_allow_usb=7]
add path 'cu\*' mode 0660 group 8123 unhide
```

Reload devfs

```bash
sudo service devfs restart
```

Edit the ruleset used by the jail in the FreeNAS GUI by going to Jails -> `hass` -> Edit ->  Jail Properties ->  devfs_ruleset
Set it to 7

Start the Home Assistant jail

```bash
sudo iocage start HomeAssistant
```

Connect to the Home Assistant jail and verify that you see the modem devices

```bash
sudo iocage console HomeAssistant
```

```bash
ls /dev/cu*
```

This should output the following

```bash
/dev/cuau0      /dev/cuaU0
```

Add the Z-Wave configuration to your `configuration.yaml` and restart Home Assistant

```bash
vi /home/homeassistant/.homeassistant/configuration.yaml
```

```yaml
zwave:
  usb_path: /dev/cuaU0
  polling_interval: 10000
```

```bash
service homeassistant restart
```

## Updating

Before updating, read the changelog to see what has changed and how it affects your Home Assistant instance. Enter the jail using `iocage exec <jailname>`.

Let the built-in update script do all required steps for you:

```bash
service homeassistant update
```

You can also update by following these steps manually.
First, stop the Home Assistant service:

```bash
service homeassistant stop
```

Then, enter the `venv`:

```bash
su homeassistant
cd /usr/local/share/homeassistant
source ./bin/activate
```

Upgrade Home Assistant:

```bash
pip3 install homeassistant --upgrade
```

Log out of the `homeassistant` user and start Home Assistant:

```bash
exit
service homeassistant start
```
