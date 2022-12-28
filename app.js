const http=require("http");
//importing functions.js file
const sFunctions=new (require("./functions"))();
//declaring the port number
const PORT =process.env.PORT || 5000;
//initialising the server
const server=http.createServer(async (req, res) => {
    //using regularexpression to match '/api/'and \w (word character) matches any single letter, number or underscore
    if(req.url.match(/\/api\/\w+/g)){
        try{
            const info=req.url.split("/")[2]; // extracting the query
            let picK=await sFunctions.evaluate(info);//calling evalute from functions class
            res.writeHead(200,{"Content-Type":"application/json"});//writing a response header
            console.log(picK);//logging to check the result.
            res.write(picK);// writing the response 
            res.end();//closing the server after writing the response.
        }
        catch(error){
            res.writeHead(404, { "Content-Type": "application/json" });
            res.write("erro"+error);//responding with respective error
            res.end();//closing server
        }
    }
    else{
        res.writeHead(404,{"Content-Type":"application/json"});
        res.end(JSON.stringify({message:"Route not found"}));

    }
});
//starting the server
server.listen(PORT,()=>{
    console.log(`server started on port:${PORT}`);
});
