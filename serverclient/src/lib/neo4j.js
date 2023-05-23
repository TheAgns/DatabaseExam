import neo4j from "neo4j-driver";
const { NEO4J_URI, NEO4J_USERNAME, NEO4J_PASSWORD } = process.env;

const driver = neo4j.driver(
  NEO4J_URI,
  neo4j.auth.basic(NEO4J_USERNAME, NEO4J_PASSWORD)
);

export async function read(cypher, params = {}) {
  const session = driver.session();

  try {
    const result = await session.run(cypher, params);

    const records = result.records.map((record) => record.toObject());

    return records;
  } finally {
    await session.close();
  }
}
