"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const child_process_1 = require("child_process");
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const port = 1234;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.get('/', (req, res) => {
    console.log("si è connesso il dispositivo " + req.ip);
    res.send("asdrubale");
});
app.post('/files', (req, res) => {
    res.type('json');
    (0, child_process_1.exec)('ls', (error, stdout, stderr) => {
        if (error) {
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
        let ret = files.filter((file) => {
            return file != '';
        });
        if (req.query.absolute == "true") {
            (0, child_process_1.exec)("pwd", (error, stdout, stderr) => {
                if (error) {
                    res.sendStatus(500);
                    return;
                }
                stdout = stdout.trim();
                /*for(let i=0; i<ret.length; i++){
                    ret[i] = path.join(stdout, ret[i]);
                }*/
                ret = ret.map((file) => {
                    return path_1.default.join(stdout, file);
                });
                console.log(ret);
                res.status(200).send({
                    files: ret
                });
            });
        }
        else {
            console.log(ret);
            res.status(200).send({
                files: ret
            });
        }
    });
});
app.listen(port, () => {
    console.log("Server partito sulla porta " + port);
});
