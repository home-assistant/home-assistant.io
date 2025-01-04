---
title: DVS Portal
description: Instructions on how to integrate DVS Portal with Home Assistant.
ha_category:
  - Sensor
ha_release: 2025.x
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@chessspider'
ha_domain: dvsportal
ha_platforms:
  - sensor
ha_integration_type: service
---

This integration is designed for the parking system used by several Dutch municipalities. It provides sensors and functionalities to interact with the parking system directly from your Home Assistant instance.

If your parking system has "DVSPortal" in the URL, you can use this integration. [Search for examples here](https://www.google.com/search?q=inurl%3Advsportal).

**Example URLs:**

- [https://parkeren.leiden.nl/DVSPortal/](https://parkeren.leiden.nl/DVSPortal/)
- [https://vergunningen.parkerendelft.com/DVSPortal/](https://vergunningen.parkerendelft.com/DVSPortal/)
- [https://parkeren.zaanstad.nl/DVSPortal/](https://parkeren.zaanstad.nl/DVSPortal/)

---

## 🚀 **Features**

- **Balance Sensor**: Shows the remaining balance for guest parking.  
- **Active Reservations Sensor**: Displays the number of active and future reservations.  
- **Car Sensors**: Dynamic sensors for each known license plate, showing its current state.  
- **Service Actions**: Create and end parking reservations via Home Assistant services.  

---

## 🛠️ **Prerequisites**

Before installing the integration, ensure you have the following:

1. Access to the DVSPortal website (e.g., `https://parkeren.gemeente.nl/DVSPortal/`).  
2. Your **username** and **password** for DVSPortal.  
3. Optionally, an **API User Agent string** (if required by your municipality's DVSPortal setup).  

---

## 📥 **Installation**

1. Go to **Settings > Devices & Services > Add Integration**.  
2. Search for **"DVSPortal"**.  
3. Enter your **host URL** (`parkeren.leiden.nl`), **username**, **password**, and optional **User Agent string**.  
4. Complete the setup wizard.

**⚠️ Important:** When entering the **host URL**, do **not** include `https://` or `/DVSPortal/`. Only use the base domain, for example:  

- ✅ `parkeren.leiden.nl`  
- ❌ `https://parkeren.leiden.nl`  
- ❌ `https://parkeren.leiden.nl/DVSPortal`

---

## 📊 **Sensors**

### **Balance Sensor**  

- **State**: Remaining balance in minutes.  
- **Attributes**: Additional information about the balance.  

### **Active Reservations Sensor**  

- **State**: Total number of active and future reservations.  
- **Attributes**:  
  - `current_reservations`: List of active license plates.  
  - `future_reservations`: List of future reservations.  

### **Car Sensors**  

- **State**: Can be one of the following:  
  - `not present`: No active reservation.  
  - `present`: Currently has an active reservation.  
  - `reserved`: Has a future reservation.  
- **Attributes**:  
  - `license_plate`: The license plate number.  
  - `name`: Name associated with the license plate.  
  - `previous_reservation_start`: Start time of the previous reservation.  
  - `previous_reservation_end`: End time of the previous reservation.  

---

## ⚙️ **Service Actions**

The integration provides the following service actions:

### **Action: Create Reservation**

The `dvsportal.create_reservation` service creates a new parking reservation.

| Data Attribute        | Optional | Description                                        |
|------------------------|----------|----------------------------------------------------|
| `entry_id`            | No       | The ID of the config entry to use for this action. |
| `entity_id`           | Yes      | The entity ID of the car sensor.                  |
| `license_plate_value` | Yes      | The license plate value to reserve.               |
| `license_plate_name`  | Yes      | A name for the reservation.                       |
| `date_from`           | Yes      | Start date and time (ISO8601 format).             |
| `date_until`          | Yes      | End date and time (ISO8601 format).               |

**Example:**  

```yaml  
service: dvsportal.create_reservation  
data:  
  entry_id: "12345"  
  license_plate_value: "AB-123-CD"  
  license_plate_name: "Guest Car"  
  date_from: "2024-01-01T10:00:00"  
  date_until: "2024-01-01T12:00:00"  
```

### **Action: End Reservation**

The `dvsportal.end_reservation` service ends an active parking reservation.

| Data Attribute | Optional | Description                                        |
|-----------------|----------|----------------------------------------------------|
| `entry_id`     | No       | The ID of the config entry to use for this action. |
| `entity_id`    | No       | The entity ID of the car sensor.                   |

**Example:**  

```yaml  
service: dvsportal.end_reservation  
data:  
  entry_id: "12345"  
  entity_id: "sensor.dvsportal_car_abc123"  
```

---

## 🗂️ **Dashboard Setup Guide**

This guide will walk you through setting up the DVS Portal Dashboard in Home Assistant. The dashboard provides an overview of your parking reservations, balance, and other related information.

This part is completely optional and relies on unsupported, unofficial plugins. Install on your own risk.

<p class='img'>
<img src='/images/integrations/dvsportal/example-dashboard.png' alt='Example dashboard via custom auto-entities plugin' />
Example dashboard via custom auto-entities plugin.
</p>

### **Prerequisites**

- Ensure the **DVSPortal Integration** is installed and configured.  
- Ensure the **auto-entities** card is installed via **HACS**.  
  You can find more details about **auto-entities** here: [Auto-Entities on GitHub](https://github.com/thomasloven/lovelace-auto-entities).

### **Step 1: Create `input_text` for License Plate**

Navigate to [**Configuration > Helpers**](https://my.home-assistant.io/redirect/helpers/) in your Home Assistant dashboard.

1. Click the **ADD HELPER** button.  
2. Choose **Text**.  
3. Give it a name, for example, **DVS License Plate**, and click Create.  
4. Re-open and configure the newly created entity. Set the Entity ID to `input_text.dvsportal_license_plate`.  

### **Step 2: Add Scripts**

Add the following scripts to your `scripts.yaml` file.

{% raw %}
```yaml  
dvsportal_parkingreservation_endofday:  
  sequence:  
    - service: dvsportal.create_reservation  
      data_template:  
        entity_id: "{{ entity_id }}"  
        license_plate_value: "{{ license_plate_value }}"  
        date_from: "{{ (now() + timedelta(minutes=1)).isoformat() }}"  
        date_until: "{{ now().replace(hour=23, minute=59, second=59).isoformat() }}"  

create_and_clear_reservation:  
  sequence:  
    - service: dvsportal.create_reservation  
      data_template:  
        date_from: "{{ (now() + timedelta(minutes=1)).isoformat() }}"  
        date_until: "{{ now().replace(hour=23, minute=59, second=59).isoformat() }}"  
        license_plate_value: "{{ states('input_text.dvsportal_license_plate') }}"  
    - service: input_text.set_value  
      target:  
        entity_id: input_text.dvsportal_license_plate  
      data:  
        value: ""  
```
{% endraw %}

### **Step 3: Create the Dashboard**

1. Navigate to any dashboard
2. Click on the **+** button to add a new card.  
3. Choose **YAML** code editor mode. 
4. Replace the contents with the following YAML code into the editor.

```yaml  
type: vertical-stack
title: DVS Portal Dashboard
cards:
  - type: entities
    title: General Info
    entities:
      - entity: sensor.guest_parking_balance
      - entity: sensor.reservations
  - type: custom:auto-entities
    card:
      type: glance
      title: Cars without Reservations
    filter:
      include:
        - domain: sensor
          attributes:
            device_class: dvs_car_sensor
          state: not present
          options:
            tap_action:
              action: call-service
              service: script.dvsportal_parkingreservation_endofday
              service_data:
                entity_id: this.entity_id
  - type: custom:auto-entities
    card:
      type: glance
      title: Cars with Reservations
    filter:
      include:
        - domain: sensor
          attributes:
            device_class: dvs_car_sensor
          state: /^(reserved|present)$/
          options:
            tap_action:
              action: call-service
              service: dvsportal.end_reservation
              service_data:
                entity_id: this.entity_id
  - type: entities
    title: New car
    entities:
      - entity: input_text.dvsportal_license_plate
      - entity: script.create_and_clear_reservation 
```

---

## 🗑️ **Remove Integration**

This integration follows standard integration removal, no extra steps are required.

{% include integrations/remove_device_service.md %}

---

## 🐞 **Troubleshooting**

No commonly known issues.

---