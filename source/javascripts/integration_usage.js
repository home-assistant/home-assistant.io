

async function setUsage() {
    const domain = document.querySelector("#integration_usage_script").getAttribute("domain")
    const target_element = document.querySelector("#integration_usage")

    const res = await fetch("https://analytics.home-assistant.io/data.json")
    const data = await res.json()

    const dataKeys = Object.keys(data);
    const lastDataEntry = data[dataKeys[dataKeys.length - 1]];

    target_element.innerHTML = `
    Active in ${Math.round((100 * lastDataEntry?.integrations?.[domain] || 0) / lastDataEntry.reports_integrations)}% Home Assistant installations<i style="font-size: small;color: darkgray;vertical-align: top;">*</i><br />
    <i style="font-size: small;color: darkgray">*Calculated by the <a style="text-decoration: none;" href="/integrations/analytics">Analytics integration</a></i>
    `
}

window.addEventListener('DOMContentLoaded', (event) => {
    setUsage()
});