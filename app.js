const express = require('express')
const spawnSync = require('child_process').spawnSync;
const bodyParser = require('body-parser');




const app = express()
const port = 3001

app.use(bodyParser.json());

app.get('/health', (req, res) => res.send('Postman Engine Running!'))

app.post('/collection/run', function (req, res) {
    
    console.log('Got body:', req.body);

    var reqVal = req.body;

    if (reqVal.env === undefined) {
       child = newmanRun(reqVal.collection,"");
    }else{
        child = newmanRun(reqVal.collection,reqVal.env);
    }

    var output =  '{ "Code":"'+child.status+'" , "result":"'+child.stdout+'" ,"err":"'+child.stderr+'" }';

    res.send(output);
  

})

function newmanRun(file,env) {
 
    try {

        child = spawnSync('newman', ['run', file,'-e',env])

        return child;
    }catch (err)  {
        console.error("Error:: "+err);
    }
 
}


app.listen(port, () => console.log(`Example app listening on port ${port}!`))