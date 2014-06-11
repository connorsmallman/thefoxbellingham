var reset = '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>'

$('#submit').click(function(e) {
	e.preventDefault();

	$('.form-group .alert')
		.remove();

	var $this = $(this);

	var isValid = true,
		forename = $('#forename').val(),
		surname = $('#surname').val(),
		email = $('#emailAddress').val(),
		message = $('#message').val();

	if(forename == ''){
		isValid = false;
		$('#forename').parent().append('<div style="margin-top:4px" class="alert alert-danger">Please enter a valid Forname');
	}
	if(forename == ''){
		isValid = false;
		$('#surname').parent().append('<div style="margin-top:4px" class="alert alert-danger">Please enter a valid Surname');
	}
	if(!isValidEmailAddress(email)){
		isValid = false;
		$('#emailAddress').parent().append('<div style="margin-top:4px" class="alert alert-danger">Please enter a valid Email Address');
	}
	if(isValid){
		var data = {};
		data.forename = forename,
		data.surname = surname,
		data.email = email,
		data.message = message;
		
		$this.attr('disabled', 'disabled');

		$.ajax({
			type: 'POST',
			data: JSON.stringify(data),
			contentType: 'application/json',
			url: '/contact',	
			success: function(responseData) {
				if(responseData.Error){
					var x = responseData.Error

					$('.form-horizontal')
						.prepend('<div class="form-group"><div class="alert alert-danger alert-dismissable">' + x + reset + '</div></div>')
						.find('input, textarea')
						.val('');

					$this.removeAttr('disabled');
				}
				else{
					var x = responseData.Success

					$('.form-horizontal')
						.prepend('<div class="form-group"><div class="alert alert-success alert-dismissable">' + x + reset + '</div></div>')
						.find('input, textarea')
						.val('');

					$this.removeAttr('disabled');
				}
			}
		});
	}

});

$('#contact').addClass('active')