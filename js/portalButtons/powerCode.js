var url = document.location.href;

if(url.includes('/show_u2000')){
	// Some Code
}
else if(url.includes('//partner.o3-telecom.com/maintenance/')){

  for(let i = 0; i < document.forms.length; i++)
    if(document.forms[i].action.includes('/show_u2000'))
      document.forms[i].submit();

}
else if (url.includes('//partner.o3-telecom.com/maintenance')) {
  document.getElementById('search').value = sip;
  if(sip !== undefined)
    document.forms[0].submit();
}
