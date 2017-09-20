function select(connection,res){
	//执行查询MySQL语句
	connection.query("SELECT * FROM node",function(error,results,fields){
		if(error){
			throw error;
		}
		console.log("The solution is",results);
		res.end(JSON.stringify({
			status:"Reader",
			results
		}));
	})
}
module.exports = select;