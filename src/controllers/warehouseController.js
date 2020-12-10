var mongoose = require('mongoose');
var Good = mongoose.model('good');
var Staff = mongoose.model('staff');

exports.show_index = function(req, res) {
	res.sendFile(appRoot  + '/www/index.html');
};

exports.login_fingerprint = function(req, res) {
	Staff.findOne({_id: req.body.fingerprint}, function(err, user) {
						if(user === null){
							res.send("Login invalid");
					 }else {
					    res.json(user);
					 }

	});
};
exports.auth = function(req, res) {
	Staff.findOne({username: req.body.usr}, function(err, user) {
						if(user === null){
							res.send("Login invalid");
					 }else if (user.username === req.body.usr){
					  	if(user.password === req.body.pw){
					    	res.json(user);
							} else {
								res.send("Password invalid");
							}
					 } else {
						 console.log("Credentials wrong");
						 res.send("Login invalid");
					 }
	});
};

exports.list_goods = function(req, res) {
	Good.find({type: req.body.type}, function(err, good) {
		if (err){
			res.send(err);
		}
		console.log (good);
		res.json(good);
	});
};

exports.list_supplier = function(req, res) {
	Good.find({}, function(err, good) {
		if (err){
			res.send(err);
		}
		var supplier = new Array();
		for(i = 0; i<good.length; i++){
				if(good[i].stock<good[i].min_stock){
					var low_good = {"name" : good[i].name,
													"quantity" : good[i].min_stock - good[i].stock }
					var insert = false;
					for(j = 0; j<supplier.length && !insert; j++){
						if (supplier[j].supplier_name===good[i].supplier){
							supplier[j].list_of_goods[supplier[j].list_of_goods.length] = JSON.stringify(low_good);
							insert = true;
						}
					}
					if (!insert){
						var sup = {"supplier_name": good[i].supplier,
												"logo": good[i].logo_supplier,
												"list_of_goods": new Array(JSON.stringify(low_good))
											}
						supplier[supplier.length] = sup;
					}
			}
		}
		console.log (supplier);
		res.json(JSON.stringify(supplier));
	});
};

exports.list_staff = function(req, res) {
	Staff.find({}, function(err, staff) {
		if (err){
			res.send(err);
		}
		res.json(staff);
	}).sort({warehouseMovements: -1});
};

exports.insert_stock_good = function(req, res) {
	Good.findOneAndUpdate({name: req.body.name},  {new: true}, function(err, good) {
		if (err)
			res.send(err);
		else{
			if(good==null){
				var new_good = new Good({name: req.body.name, stock: req.body.stock, type: req.body.type});
				new_good.save(function(err, good) {
					if (err)
						res.send(err);
					res.status(201).json(good);
				});
			} else{
				good.stock = parseInt(good.stock) + parseInt(req.body.stock);
				good.save();
				res.json(good);
			}
			Staff.findOneAndUpdate({username: req.body.username},  {new: true}, function(err, user){
					if (err){
						res.send(err);
					}else{
						var m = user.warehouseMovements;
						var data = new Date();
						var isChange = false;
						for (var i=0; i<m.length; i++){
							var d = m[i].date;
							var mov = m[i].movement;
							console.log(user.warehouseMovements[i].movement);
							if (d.getDate() == data.getDate() && d.getMonth() == data.getMonth() && d.getFullYear() == data.getFullYear()){
						
								user.warehouseMovements[i].movement = parseInt(user.warehouseMovements[i].movement) + Math.abs(req.body.stock);
								isChange =true;
							}
						}
						if (!isChange){
							user.warehouseMovements.push({date: new Date(), movement: req.body.stock});
						}
						user.save();
					}
				});
		}
	});
};

exports.remove_stock_good = function(req, res) {
	Good.findOneAndUpdate({name: req.body.name},  {new: true}, function(err, good) {
		console.log(req.body.name);
		if (err)
			res.send(err);
		else{
			if(good==null){
				res.status(404).send({
					description: 'Good not found'
				});
			}
			else{
				if (parseInt(good.stock) >= parseInt(req.body.stock)){
					good.stock = parseInt(good.stock) - parseInt(req.body.stock);
				}else {
					good.stock = 0;
				}
				good.save();
				res.json(good);

				Staff.findOneAndUpdate({username: req.body.username},  {new: true}, function(err, user){
						if (err){
							res.send(err);
						}else{
							var m = user.warehouseMovements;
							var data = new Date();
							var isChange = false;
							for (var i=0; i<m.length; i++){
								var d = m[i].date;
								var mov = m[i].movement;
								console.log(user.warehouseMovements[i].movement);
								if (d.getDate() == data.getDate() && d.getMonth() == data.getMonth() && d.getFullYear() == data.getFullYear()){
									console.log("Data uguale");
									user.warehouseMovements[i].movement = parseInt(user.warehouseMovements[i].movement) + parseInt(req.body.stock);
									isChange =true;
								}
							}
							if (!isChange){
								console.log("Data diversa");
								user.warehouseMovements.push({date: new Date(), movement: req.body.stock});
							}
							user.save();
						}
					});
			}
		}
	});
};

exports.delete_good = function(req, res) {
	Good.deleteOne({_id: req.body.id}, function(err, good) {
		if (err)
			res.send(err);
		else{
			if(result.deletedCount==0){
				res.status(404).send({
					description: 'Good not found'
				});
			}
			else{
				res.json({ message: 'Good successfully deleted' });
			}
		}
  });
};
