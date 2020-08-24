var myVar = setInterval(myTimer, 600000);

function myTimer() {
	//Conexao com BD MySQL
	const mysql = require('mysql');

	const connection = mysql.createConnection({
	    host: 'localhost',
	    user: 'root',
	    password: '',
	    database: 'internet'
	});

	const speedTest = require('speedtest-net');
	const test = speedTest({ maxTime: 5000 })

	const FB = require('fb');
	FB.setAccessToken('');

	test.on('testserver', (server) => {
	    pingTime = server.bestPing;
	})

	test.on('data', (data) => {
	    if (parseFloat(data.speeds.download) < 100) {

			connection.connect(function(err){
			    if (err) console.error('Erro ao realizar a conexão com BD: ' + err.stack); return;
			});

			connection.query("INSERT INTO `data` (`id`, `date`, `up`, `down`, `server`) VALUES (NULL, current_timestamp(), '"+data.speeds.download+"', '"+data.speeds.download+"', '"+data.client.isp+"')",function(err, result){
			    if(!err){
			    	var hoje = new Date();
			        console.log(hoje+' - Cadastrado com sucesso!');
			    }else{
			        console.log(hoje+' - Erro ao cadastrar');
			    }
			});
	    }
	})

	test.on('error', (data) => console.log(data))
}

function myStopFunction() {
  clearInterval(myVar);
}