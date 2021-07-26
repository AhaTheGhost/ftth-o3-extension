// if not '//10.10.111.40/' or '//ticket.o3-telecom/', then thow inactive icons
var url = document.location.href;
var arr = ['//ticket.o3-telecom.com/', '//10.10.28.20/', '//partner.o3-telecom.com/'];

if (!contains(url, arr)){
    chrome.runtime.sendMessage({
        "iconPath20": "images/inactive20.png",
        "iconPath40": "images/inactive40.png"
    });
}

function contains(target, pattern){
    var value = 0;
    pattern.forEach(function(word){
      value = value + target.includes(word);
    });
    return (value === 1);
}


//********* On page(ticket) load, run script *********//

if(url.includes('/tickets.php?id=')){

  let sip;
  let phoneNum;
  let searchParent;
  let othersParent;

  if(url.includes('//10.10.28.20/') || url.includes('//ticket.o3-telecom.com/')){

    searchParent = document.getElementById("inline-answer-47").parentElement;
    othersParent = document.getElementById("inline-answer-45").parentElement;
    sip = document.getElementById("inline-answer-45").innerText;
    phoneNum = document.getElementById("inline-answer-47").innerText;

    addTicketButtons(searchParent, othersParent, sip, phoneNum);

    clearSIPandPhone(); // Ali's code

  }

}

function addTicketButtons(searchTdEelement, othersTdEelement, sip, phoneNum){

  var phone = 'phone';
  var power = 'power';
  var port = 'port';
  var log = 'log';

  // Search phone number
  var btnSearch = document.createElement("BUTTON"); // Create power button on ticket
  btnSearch.innerHTML = "Search";
  btnSearch.classList.add("action-button");
  btnSearch.onclick = function() { chrome.runtime.sendMessage({phoneNum: phoneNum, type: phone}, function(response) {}); }
  searchTdEelement.appendChild(btnSearch);
  // Search phone number

  // Get SIP power, port and action log
  if(sip !== undefined && sip.substring(0, 3).includes('66') || sip.substring(0, 3).includes('62')){
    var btnPower = document.createElement("BUTTON"); // Create power button on ticket
    btnPower.innerHTML = "Power";
    btnPower.classList.add("action-button");
    btnPower.onclick = function() { chrome.runtime.sendMessage({sip: sip, type: power}, function(response) {}); }
    othersTdEelement.appendChild(btnPower);

    var btnPort = document.createElement("BUTTON"); // Create port button on ticket
    btnPort.innerHTML = "Port";
    btnPort.classList.add("action-button");
    btnPort.onclick = function() { chrome.runtime.sendMessage({sip: sip, type: port}, function(response) {}); }
    othersTdEelement.appendChild(btnPort);

    var btnActionLog = document.createElement("BUTTON"); // Create action log button on ticket
    btnActionLog.innerHTML = "Action log";
    btnActionLog.classList.add("action-button");
    btnActionLog.onclick = function() { chrome.runtime.sendMessage({sip: sip, type: log}, function(response) {}); }
    othersTdEelement.appendChild(btnActionLog);
  }
  // Get SIP power, port and action log

}

// Ali's code: Change subject to ticket number, and put subject above first reply

function clearSIPandPhone(){

  document.getElementById("inline-answer-45").innerHTML = document.getElementById("field_45").innerHTML;

  document.getElementById("inline-answer-47").innerHTML = document.getElementById("field_47").innerHTML;

  var ancher = document.getElementsByTagName("A");

  for(var i = 0; i < ancher.length; i++){

    if(ancher[i].getAttribute("title") == "Reload"){

      var ticketclass = document.getElementsByClassName("clear tixTitle has_bottom_border")[0];

      var subject = ticketclass.cloneNode(true);

      ticketclass.getElementsByTagName("H3")[0].innerHTML = ancher[i].innerHTML.substring(8, 14);

      document.getElementById("content").insertBefore(subject, document.getElementsByClassName("tabs clean threads")[0]);

    }

  }

}

// Ali's code: Change subject to ticket number, and put subject above first reply
