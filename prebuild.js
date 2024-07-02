const { writeFileSync } = require("fs");

const url = process.env.NODE_ENV === 'production' ? process.env.DATABASE_URL : "postgresql://abhay:abhay123@localhost:5432/apps"

let content = `DATABASE_URL="${url}"\n`
writeFileSync(".env", content)

console.log(content)