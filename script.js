let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")


const leadsFromStorage = JSON.parse(localStorage.getItem("myLeads"))
if (leadsFromStorage) {
    myLeads = leadsFromStorage
    renderLeads()
}

function renderLeads() {
    let listItems = ""
    for (let i = 0; i < myLeads.length; i++) {
        listItems += `
            <li>
                <a href="${myLeads[i]}" target="_blank">${myLeads[i]}</a>
            </li>
        `
    }
    ulEl.innerHTML = listItems
}


inputBtn.addEventListener("click", function () {
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    renderLeads()
})


tabBtn.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        renderLeads()
    })
})


deleteBtn.addEventListener("click", function () {
    localStorage.clear()
    myLeads = []
    renderLeads()
})
