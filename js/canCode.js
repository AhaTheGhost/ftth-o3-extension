var url = document.location.href;

if(url.includes('/cancel_contract')){

  if(document.querySelectorAll('input[type=submit]')[0].value == 'Cancel Contract'){

    document.querySelectorAll('input[type=submit]')[0].click();

  } else if (document.querySelectorAll('input[type=submit]')[0].value == 'Prepare Cancellation') {

    document.getElementsByName('contract_number')[1].value = document.getElementsByName('contract_number')[0].value;

    document.getElementById('ticket_number').value = parameter['canTicket'];

    document.querySelectorAll('input[type=submit]')[0].click();

  }

}
else if(url.includes('//partner.o3-telecom.com/maintenance/')){

  if(document.getElementById('remaining_days').value < 0){

    for(let i = 0; i < document.getElementsByTagName('a').length; i++)
      if(document.getElementsByTagName('a')[i].innerHTML.includes('Cancel Contract'))
        document.getElementsByTagName('a')[i].click();

  } else{

    document.getElementById('remaining_days').style.backgroundColor = "rgb(255, 252, 187)";

    chrome.runtime.sendMessage({cancelCan: true}, function(response) {});

  }


}
else if (url.includes('//partner.o3-telecom.com/maintenance')) {

  if(document.getElementsByTagName('table')[0] === undefined){

    document.getElementById('search').value = parameter['sip'];
    if(parameter['sip'] !== undefined)
      document.forms[0].submit();

  } else
    chrome.runtime.sendMessage({cancelCan: true}, function(response) {});

}
