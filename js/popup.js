OTnumInput = document.getElementById('OTnum');

OTnumInput.addEventListener("change", function(){
    chrome.storage.sync.set({OTnum: this.value}, function() { });
});

chrome.storage.sync.get('OTnum', function(savedValues){
    if(savedValues.OTnum != undefined)
        OTnumInput.value = parseInt(savedValues.OTnum);
});

var canTicketInput = document.getElementById('canTicket');

canTicketInput.addEventListener("change", function(){
    chrome.storage.sync.set({canTicket: this.value}, function() { });
});

chrome.storage.sync.get('canTicket', function(savedValues){
    if(savedValues.canTicket != undefined)
      canTicketInput.value = savedValues.canTicket;
});

if (document.getElementById('top').checked)
  filterType = 'top';

if (document.getElementById('bottom').checked)
  filterType = 'bottom';

if (document.querySelector('input[name="filterType"]')) {
  document.querySelectorAll('input[name="filterType"]').forEach((elem) => {
    elem.addEventListener("change", function(event) {
      filterType = event.target.value;
    });
  });
}

// Multi-ticket opener
//let openAllNonLocked = document.getElementById('openAllNonLocked');
let openAll = document.getElementById('openAll');
//let openBO = document.getElementById('openBO');
let openAllNew = document.getElementById('openAllNew');
let openBoldNew = document.getElementById('openBoldNew');
let openAllMain = document.getElementById('openAllMain');
let openBoldMain = document.getElementById('openBoldMain');


//openAllNonLocked.onclick = () => { executeSriptWithParameters('openAllNonLocked', OTnumInput.value, filterType); };

openAll.onclick = () => { executeSriptWithParameters('openAll', OTnumInput.value, filterType); };

//openBO.onclick = () => { executeSriptWithParameters('openBO', 'null', filterType); };

openAllNew.onclick = () => { executeSriptWithParameters('openAllNew', 'null', filterType); };

openBoldNew.onclick = () => { executeSriptWithParameters('openBoldNew', 'null', filterType); };

openAllMain.onclick = () => { executeSriptWithParameters('openAllMain', 'null', filterType); };

openBoldMain.onclick = () => { executeSriptWithParameters('openBoldMain', 'null', filterType); };

function executeSriptWithParameters(btn, otNum, filterType){
    chrome.tabs.executeScript({ code: "var parameter = {btn: '" + btn + "', OTnum: '" + otNum + "', fType: '" + filterType + "'};"}, function(){
        chrome.tabs.executeScript({ file: "js/popup_buttons.js"}, function(){});
    });
}
// Multi-ticket opener

// Package upgrade converter
let pkgFrom = document.getElementById('pkgFrom');
let pkgTo = document.getElementById('pkgTo');
let remDays = document.getElementById('remDays');
let label = document.getElementById('remDaysLabel');

remDays.onchange = function() { calculate_package_upgrade(); }
pkgFrom.onchange = function() { calculate_package_upgrade(); }
pkgTo.onchange = function() { calculate_package_upgrade(); }

function calculate_package_upgrade(){

  let op = pkgTo.getElementsByTagName("option");

  for (let i = 0; i < op.length; i++) {

    if(parseInt(pkgFrom.value) >= parseInt(op[i].value)){ // only enable upgradabale packgaes
      op[i].disabled = true;

      if(pkgTo.value === op[i].value)
        op[i + 1].selected = 'selected';

    }
    else
      op[i].disabled = false;

  }

  let sum = Math.round((parseInt(pkgFrom.value) / parseInt(pkgTo.value)) * remDays.value);

  if(parseInt(pkgTo.value) <= 59)
    sum += 30;

  label.innerHTML = 'Upgrades to: ' + sum + ' day' + ( sum < 2 ? '' : 's' );

}
// Package upgrade converter

// SIP cancellation

var canSIP;

document.getElementById('canSIP').addEventListener("change", function(){
  canSIP = document.getElementById('canSIP').value;
});

let cancelBtn = document.getElementById('cancel');

cancelBtn.onclick = () => { chrome.runtime.sendMessage({canSip: canSIP, canTicket: canTicketInput.value}, function(response) {}); };

// SIP cancellation
