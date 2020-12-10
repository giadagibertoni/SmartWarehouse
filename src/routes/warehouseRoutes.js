module.exports = function(app) {
	var warehouseController = require('../controllers/warehouseController');
	app.route('/').get(warehouseController.show_index);
	app.route('/api/loginSubmit').post(warehouseController.auth);
	app.route('/api/login_fingerprint').post(warehouseController.login_fingerprint);
	app.route('/api/list_goods').post(warehouseController.list_goods);
	app.route('/api/list_staff').get(warehouseController.list_staff);
	app.route('/api/insert_stock_good').post(warehouseController.insert_stock_good);
	app.route('/api/remove_stock_good').post(warehouseController.remove_stock_good);
	app.route('/api/delete_good').post(warehouseController.delete_good);
	app.route('/api/list_supplier').get(warehouseController.list_supplier);
/*
	app.route('/api/movies')
		.get(moviesController.list_movies)
		.post(moviesController.create_movie);


	app.route('/api/movies/:id')
		.get(moviesController.read_movie)
		.put(moviesController.update_movie)
		.delete(moviesController.delete_movie);
*/

};
