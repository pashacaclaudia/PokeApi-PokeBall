var express = require('express');
var router = express.Router();
const sql = require('mssql');
var createError = require('http-errors');

const config = {
  user: 'pashaca.claudia',  //Vostro user name
  password: 'xxx123#', //Vostra password
  server: "213.140.22.237",  //Stringa di connessione
}

//Function to connect to database and execute query
let executeQuery = function (res, query, next) {
  sql.connect(config, function (err) {
    if (err) { //Display error page
      console.log("Error while connecting database :- " + err);
      res.status(500).json({success: false, message:'Error while connecting database', error:err});
      return;
    }
    var request = new sql.Request(); // create Request object
    request.query(query, function (err, result) { //Display error page
      if (err) {
        console.log("Error while querying database :- " + err);
        res.status(500).json({success: false, message:'Error while querying database', error:err});
        sql.close();
        return;
      }
      res.send(result.recordset); //Il vettore con i dati è nel campo recordset (puoi loggare result per verificare)
      sql.close();
    });

  });
}

router.get('/api/pokemon', function (req, res, next) {
  let sqlQuery = "select * from PokeBall.Pokemon";
  executeQuery(res, sqlQuery, next);
});

router.post('/api/catchpok', function (req, res, next) {
  let pokemon = req.body;
  if (!pokemon) {
    next(createError(400 , "Please provide a correct pokemon"));
  }
  sql.connect(config, err => {
    let sqlInsert = `INSERT INTO PokeBall.Pokemon (Nome, indirizzo) VALUES ('${pokemon.Nome}','${pokemon.Indirizzo}')`;
    executeQuery(res, sqlInsert, next);
    res.send({success:true, message: "pokemon inserito con successo", pokemon: pokemon})
  })
});
module.exports = router;