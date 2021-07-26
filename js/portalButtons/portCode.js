var url = document.location.href;

if(url.includes('/show_u2000')){
	// Some Code
}
else if(url.includes('//partner.o3-telecom.com/maintenance/')){
  if(document.getElementsByTagName('input')[2].value.includes('Residential')){

    for(let i = 0; i < document.getElementsByClassName('button').length; i++)
      if(document.getElementsByClassName('button')[i].innerHTML.includes('Read Ethernet Ports'))
        document.getElementsByClassName('button')[i].click();

  }
  else
    chrome.runtime.sendMessage({cancelPort: true}, function(response) {});

}
else if (url.includes('//partner.o3-telecom.com/maintenance')) {
  document.getElementById('search').value = sip;
  if(sip !== undefined)
    document.forms[0].submit();
}
