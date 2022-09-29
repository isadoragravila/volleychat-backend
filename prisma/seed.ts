import { prisma } from "../src/databases/database";

async function main() {
    await prisma.categories.createMany({
        data: [
            { name: "women's volleyball" },
            { name: "men's volleyball" },
            { name: "women's beach volleyball" },
            { name: "men's beach volleyball" }
        ],
        skipDuplicates: true
    });
}

main().catch(e => {
    console.log(e);
    process.exit(1);
}). finally(() => {
    prisma.$disconnect();
});