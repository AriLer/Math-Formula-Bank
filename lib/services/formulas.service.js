import clientPromise from "../mongodb";

export async function getAllFormulas() {
  const client = await clientPromise;

  return client
    .db()
    .collection("formulas")
    .find({})
    .toArray();
}

export async function getFormulaById(id) {
  const client = await clientPromise;

  return client
    .db()
    .collection("formulas")
    .findOne({ _id: id });
}

export async function createFormula(data) {
  const client = await clientPromise;

  return client
    .db()
    .collection("formulas")
    .insertOne(data);
}