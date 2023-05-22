import express from 'express';
import { exec } from 'child_process';
import path from 'path';
import cors from 'cors';

const port = 1234;
const app = express();
app.use(cors());

app.get('/',(req,res)=>{
    console.log("si è connesso il dispositivo "+req.ip);
    res.send("asdrubale");
});

app.post('/files', (req, res)=>{
    res.type('json');

    exec('ls', (error, stdout, stderr)=>{
        if(error){
            res.sendStatus(500);
            return;
        }
        
        let files = stdout.split("\n");
        

       /* let ret: string[] = [];
        for(let i=0; i<files.length; i++){
            if(files[i] != ''){
                ret.push(files[i]);
            }
        }
        console.log(ret); */

        let ret = files.filter((file)=> {
            return file != '';
        });


        if(req.query.absolute == "true"){
            exec("pwd", (error, stdout, stderr)=>{
                if(error){
                    res.sendStatus(500);
                    return;
                }
                stdout = stdout.trim();
                /*for(let i=0; i<ret.length; i++){
                    ret[i] = path.join(stdout, ret[i]);
                }*/

                ret = ret.map((file)=>{
                    return path.join(stdout, file);
                })

                console.log(ret);
                    res.status(200).send({
                files: ret

                });
            });
        }else{
            console.log(ret);

            res.status(200).send({
                files: ret
            });
        }
        
    })
})



app.listen(port, () => {
    console.log("Server partito sulla porta "+port);
})