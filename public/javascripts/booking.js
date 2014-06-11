$(function(){
	$('#datepicker').datepicker()
});

$('#checkInDates').click(function() {
	var date = $("#datepicker").val();
	var addDates = $('#dates');

	if(!date == ""){
		var currentVal = addDates.val();

		if(currentVal == ""){
			addDates.val(date);
		}
		else if(currentVal.indexOf(date) >= 0){
			alert('Date already added');
		}
		else
			addDates.val(currentVal + ' ' + date);
	}
	else
		return false;
});

var reset = '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>'

$('#submit').click(function(e) {
	e.preventDefault();

	var $this = $(this);

	$('.form-group .alert')
		.remove();

	var isValid = true,
		forename = $('#forename').val(),
		surname = $('#surname').val(),
		email = $('#email').val(),
		guest = $('#guests').val(),
		number = $('#telephoneNumber').val(),
		dates = $('#dates').val(),
		requests = $('#requests').val();

	if(forename == ''){
		isValid = false;
		$('#forename').parent().append('<div style="margin-top:4px" class="alert alert-danger">Please enter a valid Forname');
	}
	if(surname == ''){
		isValid = false;
		$('#surname').parent().append('<div style="margin-top:4px" class="alert alert-danger">Please enter a valid Surname');
	}
	if(!isValidEmailAddress(email)){
		isValid = false;
		$('#email').parent().append('<div style="margin-top:4px" class="alert alert-danger">Please enter a valid Email Address');
	}
	if(isNaN(number) || number == ''){
		isValid = false;
		$('#telephoneNumber').parent().append('<div style="margin-top:4px" class="alert alert-danger">Please enter a valid Contact Number');
	}
	if(dates == ''){
		isValid = false;
		$('#dates').parent().append('<div style="margin-top:4px" class="alert alert-danger">Please enter your prefered dates');
	}
	if(isValid){
		var data = {};
		data.forename = forename,
		data.surname = surname,
		data.email = email,
		data.guest = guest,
		data.number = number,
		data.dates = dates,
		data.requests = requests;
		
		$this.attr('disabled','disabled');

		$.ajax({
			type: 'POST',
			data: JSON.stringify(data),
			contentType: 'application/json',
			url: '/booking',
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

$('#booking').addClass('active');
