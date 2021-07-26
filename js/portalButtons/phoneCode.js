var url = document.location.href;

if(url.includes('//partner.o3-telecom.com/maintenance/')){
    // Some Code
}
else if (url.includes('//partner.o3-telecom.com/maintenance')) {
  document.getElementById('search').value = phoneNum;
  if(phoneNum !== undefined)
    document.forms[0].submit();
}
