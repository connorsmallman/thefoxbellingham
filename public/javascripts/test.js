$('#submit').click(function(e) {
	e.preventDefault();

	var data = {};
		data.name = $('#name').val(),
		data.surname = $('#surname').val();
		
		$.ajax({
			type: 'POST',
			data: JSON.stringify(data),
			contentType: 'application/json',
			url: 'http://localhost:3000/test',	
			success: function(data) {
				alert(data);
			}
		});
});