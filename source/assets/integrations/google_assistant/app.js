"use strict";
/// <reference types="@google/local-home-sdk" />
/*
BASED ON: https://github.com/NabuCasa/home-assistant-google-assistant-local-sdk
Only removed the fart sound at the end.
For license information please check the repository.
*/
var App = smarthome.App;
var Constants = smarthome.Constants;
var DataFlow = smarthome.DataFlow;
var Execute = smarthome.Execute;
var Intents = smarthome.Intents;
var IntentFlow = smarthome.IntentFlow;
const findHassCustomDeviceDataByMdnsData = (requestId, devices, mdnsScanData) => {
    let device;
    device = devices.find((dev) => {
        const customData = dev.customData;
        return (customData &&
            "webhookId" in customData &&
            (!mdnsScanData.uuid || customData.uuid === mdnsScanData.uuid) &&
            (!mdnsScanData.baseUrl || customData.baseUrl === mdnsScanData.baseUrl));
    });
    // backwards compatibility for HA < 0.109
    if (!device) {
        device = devices.find((dev) => dev.customData &&
            "webhookId" in dev.customData);
    }
    if (!device) {
        console.log(requestId, "Unable to find HASS connection info.", devices);
        throw new IntentFlow.HandlerError(requestId, "invalidRequest", "Unable to find HASS connection info.");
    }
    return device.customData;
};
const findHassCustomDeviceDataByDeviceId = (requestId, devices, deviceId) => {
    let device;
    device = devices.find((dev) => {
        const customData = dev.customData;
        return (customData &&
            "webhookId" in customData &&
            customData.proxyDeviceId === deviceId);
    });
    if (!device) {
        console.log(requestId, "Unable to find HASS connection info.", devices);
        throw new IntentFlow.HandlerError(requestId, "invalidRequest", "Unable to find HASS connection info.");
    }
    return device.customData;
};
const createResponse = (request, payload) => ({
    intent: request.inputs[0].intent,
    requestId: request.requestId,
    payload,
});
class UnknownInstance extends Error {
    constructor(requestId) {
        super();
        this.requestId = requestId;
    }
    throwHandlerError() {
        throw new IntentFlow.HandlerError(this.requestId, "invalidRequest", "Unknown Instance");
    }
}
const forwardRequest = async (hassDeviceData, targetDeviceId, request) => {
    const command = new DataFlow.HttpRequestData();
    command.method = Constants.HttpOperation.POST;
    command.requestId = request.requestId;
    command.deviceId = targetDeviceId;
    command.isSecure = hassDeviceData.httpSSL;
    command.port = hassDeviceData.httpPort;
    command.path = `/api/webhook/${hassDeviceData.webhookId}`;
    command.data = JSON.stringify(request);
    command.dataType = "application/json";
    console.log(request.requestId, "Sending", command);
    const deviceManager = await app.getDeviceManager();
    let resp;
    try {
        resp = await new Promise((resolve, reject) => {
            setTimeout(() => reject(-1), 10000);
            deviceManager
                .send(command)
                .then((response) => resolve(response), reject);
        });
        // resp = (await deviceManager.send(command)) as HttpResponseData;
        console.log(request.requestId, "Raw Response", resp);
    }
    catch (err) {
        console.error(request.requestId, "Error making request", err);
        throw new IntentFlow.HandlerError(request.requestId, "invalidRequest", err === -1 ? "Timeout" : err.message);
    }
    // Response if the webhook is not registered.
    if (resp.httpResponse.statusCode === 200 && !resp.httpResponse.body) {
        throw new UnknownInstance(request.requestId);
    }
    try {
        const response = JSON.parse(resp.httpResponse.body);
        // Local SDK wants this.
        response.intent = request.inputs[0].intent;
        console.log(request.requestId, "Response", response);
        return response;
    }
    catch (err) {
        console.error(request.requestId, "Error parsing body", err);
        throw new IntentFlow.HandlerError(request.requestId, "invalidRequest", err.message);
    }
};
const identifyHandler = async (request) => {
    console.log("IDENTIFY intent:", request);
    const deviceToIdentify = request.inputs[0].payload.device;
    if (!deviceToIdentify.mdnsScanData) {
        console.error(request.requestId, "No usable mdns scan data");
        return createResponse(request, {});
    }
    if (!deviceToIdentify.mdnsScanData.serviceName.endsWith("._home-assistant._tcp.local")) {
        console.error(request.requestId, "Not Home Assistant type");
        return createResponse(request, {});
    }
    try {
        const hassCustomData = findHassCustomDeviceDataByMdnsData(request.requestId, request.devices, deviceToIdentify.mdnsScanData.txt);
        return await forwardRequest(hassCustomData, "", request);
    }
    catch (err) {
        if (err instanceof UnknownInstance) {
            return createResponse(request, {});
        }
        throw err;
    }
};
const reachableDevicesHandler = async (request) => {
    console.log("REACHABLE_DEVICES intent:", request);
    const hassCustomData = findHassCustomDeviceDataByDeviceId(request.requestId, request.devices, request.inputs[0].payload.device.id);
    try {
        return forwardRequest(hassCustomData,
        // Old code would sent it to the proxy ID: hassCustomData.proxyDeviceId
        // But tutorial claims otherwise, but maybe it is not for hub devices??
        // https://developers.google.com/assistant/smarthome/develop/local#implement_the_execute_handler
        // Sending it to the device that has to receive the command as per the tutorial
        request.inputs[0].payload.device.id, request);
    }
    catch (err) {
        if (err instanceof UnknownInstance) {
            err.throwHandlerError();
        }
        throw err;
    }
};
const executeHandler = async (request) => {
    console.log("EXECUTE intent:", request);
    const device = request.inputs[0].payload.commands[0].devices[0];
    try {
        return forwardRequest(device.customData, device.id, request);
    }
    catch (err) {
        if (err instanceof UnknownInstance) {
            err.throwHandlerError();
        }
        throw err;
    }
};
const queryHandler = async (request) => {
    console.log("QUERY intent:", request);
    const device = request.inputs[0].payload.devices[0];
    try {
        return await forwardRequest(device.customData, device.id, request);
    } catch (err) {
        if (err instanceof UnknownInstance) {
            err.throwHandlerError();
        }
        throw err;
    }
};

const app = new App("1.1.0");
app
    .onIdentify(identifyHandler)
    .onReachableDevices(reachableDevicesHandler)
    .onExecute(executeHandler)
    .onQuery(queryHandler)
    // @ts-ignore
    .onIndicate((req) => console.log("Indicate", req))
    // @ts-ignore
    .onParseNotification((req) => console.log("ParseNotification", req))
    // @ts-ignore
    .onProvision((req) => console.log("Provision", req))
    // @ts-ignore
    .onRegister((req) => console.log("Register", req))
    // @ts-ignore
    .onUnprovision((req) => console.log("Unprovision", req))
    // @ts-ignore
    .onUpdate((req) => console.log("Update", req))
    .listen()
    .then(() => {
        console.log("Ready!");
    })
    .catch((e) => console.error(e));
