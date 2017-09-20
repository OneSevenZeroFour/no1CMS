function edit(connection,requestRes,res){
	connection.query(`SELECT * FROM node where id='${requestRes.id}'`,function(error,results,fields){
		if(error){
			throw error;
		}
		res.end(JSON.stringify({
			status:"Reader ok",
			results
		}))
	})		
}
module.exports = edit;