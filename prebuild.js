const { writeFileSync } = require("fs");

let content = "";
for(let key in process.env){
    content += `${key}=${process.env[key]}\n`
}
if(!process.env.DATABASE_URL && !process.env?.NODE_ENV?.startsWith("production")) {
    content += `DATABASE_URL=postgresql://abhay:abhay123@localhost:5432/apps\n`
}
writeFileSync(".env", content)