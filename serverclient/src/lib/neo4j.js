import neo4j from "neo4j-driver";
const { NEO4J_URI, NEO4J_USERNAME, NEO4J_PASSWORD } = process.env;

const driver = neo4j.driver(
  process.env.NEO4J_URI,
  neo4j.auth.basic(process.env.NEO4J_USERNAME, process.env.NEO4J_PASSWORD)
);

export async function read(cypher, params = {}) {
  // 1. Open a session
  const session = driver.session();

  try {
    // 2. Execute a Cypher Statement
    const result = await session.run(cypher, params);

    // 3. Process the Results
    const records = result.records.map((record) => record.toObject());

    return records;
  } finally {
    // 4. Close the session
    await session.close();
  }
}
