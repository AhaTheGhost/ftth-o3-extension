var url = document.location.href;

var table = document.getElementsByTagName("table")[0];

var nonLockedTicketsOpened = 0;

if(parameter['fType'] === 'top'){

	for (var i = 1; i < table.rows.length - 1; i++) {
		let row = table.rows[i];

		checkButtons(row);

		if(parameter['btn'] === 'openAll'){
			window.open(row.cells[1].getElementsByTagName("a")[0].getAttribute("href"), "_blank");
			if(i == parameter['OTnum'])
				break;
		}

	}

} else {

	for (var i = table.rows.length - 2; i > 0; i--) {
		let row = table.rows[i];

		checkButtons(row);

		if(parameter['btn'] === 'openAll'){
			window.open(row.cells[1].getElementsByTagName("a")[0].getAttribute("href"), "_blank");
			if(((table.rows.length - 2) - (i - 1)) == parameter['OTnum'])
				break;
		}

	}

}

function checkButtons(row){

	if(parameter['btn'] === 'openAllMain' && i != 0 && !(row.cells[3].getElementsByTagName("a")[0].innerText === 'New installation' || row.cells[3].getElementsByTagName("a")[0].innerText === 'Reactivation')){
		window.open(row.cells[1].getElementsByTagName("a")[0].getAttribute("href"), "_blank");
	} else if(parameter['btn'] === 'openAllNew' && i != 0 && (row.cells[3].getElementsByTagName("a")[0].innerText === 'New installation' || row.cells[3].getElementsByTagName("a")[0].innerText === 'Reactivation')){
		window.open(row.cells[1].getElementsByTagName("a")[0].getAttribute("href"), "_blank");
	}

	if(parameter['btn'] === 'openBoldMain' && row.cells[1].classList.contains('new-reply-waiting') && !(row.cells[3].getElementsByTagName("a")[0].innerText === 'New installation' || row.cells[3].getElementsByTagName("a")[0].innerText === 'Reactivation'))
		window.open(row.cells[1].getElementsByTagName("a")[0].getAttribute("href"), "_blank");

	if(parameter['btn'] === 'openBoldNew' && row.cells[1].classList.contains('new-reply-waiting') && (row.cells[3].getElementsByTagName("a")[0].innerText === 'New installation' || row.cells[3].getElementsByTagName("a")[0].innerText === 'Reactivation'))
		window.open(row.cells[1].getElementsByTagName("a")[0].getAttribute("href"), "_blank");

}
