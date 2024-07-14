"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const fs = require("fs");
async function rawSql() {
    try {
        const rawSql = fs.readFileSync("/dev-arthur/Projects/Padel/server/prisma/test.sql", "utf8");
        const sqlReducedToStatements = rawSql
            .split("\n")
            .filter((line) => !line.startsWith("--"))
            .join("\n")
            .replace(/\r\n|\n|\r/g, " ")
            .replace(/\s+/g, " ");
        const sqlStatements = splitStringByNotQuotedSemicolon(sqlReducedToStatements);
        for (const sql of sqlStatements) {
            console.log(sql);
            await prisma.$executeRawUnsafe(sql);
        }
    }
    catch (e) {
        console.error(e);
        process.exit(1);
    }
    finally {
        await prisma.$disconnect();
    }
}
function splitStringByNotQuotedSemicolon(input) {
    const result = [];
    let currentSplitIndex = 0;
    let isInString = false;
    for (let i = 0; i < input.length; i++) {
        if (input[i] === "'") {
            isInString = !isInString;
        }
        if (input[i] === ";" && !isInString) {
            result.push(input.substring(currentSplitIndex, i + 1));
            currentSplitIndex = i + 2;
        }
    }
    return result;
}
rawSql()
    .then(async () => {
    await prisma.$disconnect();
})
    .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
});
//# sourceMappingURL=seed_sql.js.map