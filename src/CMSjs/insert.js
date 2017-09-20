function insert(connection,requestRes,res){
	//插入数据库语句
	connection.query(`insert into node (username,intro,email) values ("${requestRes.username}","${requestRes.intro}","${requestRes.email}")`,
		function(error,results,fields){
			if(error) throw error;

			console.log("This 'insert'",results);
			res.end(JSON.stringify({
				status:"Write Ok",
				results
			}));
	})
}
module.exports = insert;