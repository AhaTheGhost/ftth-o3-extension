var url = document.location.href;

if(url.includes('//partner.o3-telecom.com/action_logs/')){
	// Some Code
}
else if (url.includes('//partner.o3-telecom.com/action_logs')) {
  document.getElementById('search').value = sip;
  document.getElementById('ont_status').value = 'all';
  if(sip !== undefined)
    document.forms[0].submit();
}
