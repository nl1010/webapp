$('input#name-submit').on('click', function () {
	
	var name_fromhttp = $('input#name').val();
		$.post('name.php',{name: name_fromhttp} , function(data){
			$('div#name-data').text(data);
		});
});