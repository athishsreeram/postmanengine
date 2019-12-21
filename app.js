const express = require('express')
const spawnSync = require('child_process').spawnSync;
const bodyParser = require('body-parser');




const app = express()
const port = 3000

app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Hello World!'))

app.post('/run', function (req, res) {
    
    console.log('Got body:', req.body);

    var reqVal = req.body;

    if (reqVal.env === undefined) {
       child = lsWithGrep(reqVal.file,"");
    }else{
        child = lsWithGrep(reqVal.file,reqVal.env);
    }
   
    var output =  '{ "Code":"'+child.status+'" , "result":"'+child.stdout+'" }';

    res.send(output);
  

})

function lsWithGrep(file,env) {
 
    child = spawnSync('newman', ['run', file,'-e',env])

    console.log(child.stdout.toString())
    
    return child;
 
};


app.listen(port, () => console.log(`Example app listening on port ${port}!`))