import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";
const prisma = new PrismaClient();

async function deleteAllData() {
  // the exact names of your Prisma models
  const deleteOrder = [
    "ExpenseByCategory",
    "ExpenseSummary",
    "Expenses",
    "PurchaseSummary",
    "Purchases",
    "SalesSummary",
    "Sales",
    "Products",
    "Users",
  ];

  for (const modelName of deleteOrder) {
    const model: any = (prisma as any)[modelName];
    if (model && typeof model.deleteMany === "function") {
      await model.deleteMany({});
      console.log(`Cleared data from ${modelName}`);
    } else {
      console.warn(`No model or deleteMany on ${modelName}`);
    }
  }
}
async function main() {
  const dataDirectory = path.join(__dirname, "seedData");

  const orderedFileNames = [
    "users.json",           // if Sales or Purchases reference a user
    "products.json",        // Sales reference products
    "expenses.json",        // ExpenseSummary & ByCategory reference these
    // CHILDREN next:
    "expenseSummary.json",
    "expenseByCategory.json",
    "sales.json",
    "salesSummary.json",
    "purchases.json",
    "purchaseSummary.json",
  ];

  await deleteAllData();

  for (const fileName of orderedFileNames) {
    const filePath = path.join(dataDirectory, fileName);
    const jsonData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    const modelName = path.basename(fileName, path.extname(fileName));
    const model: any = prisma[modelName as keyof typeof prisma];

    if (!model) {
      console.error(`No Prisma model matches the file name: ${fileName}`);
      continue;
    }

    for (const data of jsonData) {
      await model.create({
        data,
      });
    }

    console.log(`Seeded ${modelName} with data from ${fileName}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });