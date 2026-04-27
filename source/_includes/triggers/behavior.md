### Behavior with multiple targets

When you target more than one entity (or select an area, floor, or label that contains several), the **Trigger when** option controls how the trigger responds:

- **Any** (default): the trigger fires every time any one of the targeted entities transitions. For example, if you monitor three motion sensors in the living room and someone walks past sensor 1, the automation fires. When they walk past sensor 2 a moment later, it fires again. Every individual event counts.
- **First**: the trigger fires only on the first transition in the targeted group, then waits until all targeted entities have reset before it fires again. For example, if you monitor the same three motion sensors, the automation fires when the first one picks up movement (someone entered the room). The other two firing afterward are ignored, so you get one notification per "someone walked in" event instead of three.
- **Last**: the trigger fires only after the last targeted entity in the group has fired, meaning all of them are now in the expected state. For example, if you monitor the lights in the living room, bedroom, and hallway, the automation fires only once all three have turned off. This is useful for scenarios like "start the robot vacuum only after every light on the floor is off," so you know the room is truly empty.
