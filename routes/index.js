
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'The Fox B&B Bellingham' });
};

exports.about = function(req, res){
  res.render('about', { title: 'The Fox | About' });
};

exports.booking = function(req, res){
  res.render('booking', { title: 'The Fox | Booking' });
};

exports.findus = function(req, res){
  res.render('findus', { title: 'The Fox | Find Us' });
};

exports.bellingham = function(req, res){
  res.render('bellingham', { title: 'The Fox | Bellingham' });
};

exports.contact = function(req, res){
  res.render('contact', { title: 'The Fox | Contact' });
};