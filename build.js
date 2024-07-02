const { writeFileSync } = require("fs");

writeFileSync(".env", `DATABASE_URL="${process.env.DATABASE_URL || "postgresql://abhay:abhay123@localhost:5432/apps"}"`)