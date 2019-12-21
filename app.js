const express = require('express')
const { spawn } = require('child_process')
const bodyParser = require('body-parser');




const app = express()
const port = 3000
var result = '';
var code = '';

app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Hello World!'))

app.post('/run', function (req, res) {
    
    console.log('Got body:', req.body);

    var obj = req.body;

    if (obj.env === undefined) {
        lsWithGrep(obj.file,"");
    }else{
     lsWithGrep(obj.file,obj.env);
    }
    
    var output =  '{ "Code":"'+code+'" , "result":"'+result+'" }';

    res.send(output);
  
    result = '';
    code = '';

})

function lsWithGrep(file,env) {
  try {

    ls = spawn('newman', ['run', file,'-e',env])
    
    var finished = false;

    ls.stdout.on('data', function (data) {
        //console.log('stdeout: ' + data);
        result += data.toString();
    });

    ls.stderr.on('data', function (data) {
        //console.log('stderr: ' + data);
        result += data.toString();
    });

    ls.on('close', function (code1) {
        code = code1;
        console.log("Code "+code1)
    });

   
    
  }catch (err)  {
     console.error(err);
  };
};


app.listen(port, () => console.log(`Example app listening on port ${port}!`))