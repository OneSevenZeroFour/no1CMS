function updates(connection,requestRes,res){
	//更新语句 update tb_student set name='王二' , sex=‘女' where id=1
	connection.query(`UPDATE node SET username="${requestRes.username}",intro="${requestRes.intro}",email="${requestRes.email}" WHERE id="${requestRes.id}"`,function(error,results,fields){
			if(error) throw error;
			res.end("Update success")
	})
}
module.exports = updates;