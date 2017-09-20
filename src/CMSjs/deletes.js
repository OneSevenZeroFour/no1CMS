function deletes(connection,requestRes,res){
	//插入删除语句
	connection.query(`delete from node where id="${requestRes.userid}"`,function(error,results,fields){
		if(error) throw error;
		console.log("Delete seccess");
		res.end("Delete seccess");
	})	
}
module.exports = deletes;