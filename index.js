let myLeads = [];

const inputEl = document.getElementById('input-el');
const inputBtn = document.getElementById('input-btn');
const deleteBtn = document.getElementById('delete-btn');
const tabBtn = document.getElementById('tab-btn');
const ulEL = document.getElementById('ul-el');

const leadsFromLocalStorage = JSON.parse(localStorage.getItem('myLeads'));

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage;
    render(myLeads);
}

inputBtn.addEventListener('click', () => {
    if (inputEl.value !== '') {
        myLeads.push(inputEl.value);
        localStorage.setItem('myLeads', JSON.stringify(myLeads));
        inputEl.value = '';
        render(myLeads);
    }
});

function render(leads) {
    let listItems = '';
    for (let i = 0; i < leads.length; i++) {
        listItems += `
            <li>
                <a href="${leads[i]}" target="_blank">${leads[i]}</a>
            </li>
        `;
    }
    ulEL.innerHTML = listItems;
};

deleteBtn.addEventListener('click', () => {
    localStorage.clear();
    myLeads = [];
    render(myLeads);
});

tabBtn.addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        myLeads.push(tabs[0].url);
        localStorage.setItem('myLeads', JSON.stringify(myLeads));
        render(myLeads);
    });
});