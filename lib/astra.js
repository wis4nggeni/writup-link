const { createClient } = require("@astrajs/rest");

let astraClient = null;
const getAstraClient = async () => {
  if (astraClient === null) {
    astraClient = await createClient(
      {
        astraDatabaseId: process.env.ASTRA_DB_ID,
        astraDatabaseRegion: process.env.ASTRA_DB_REGION,
        applicationToken: process.env.ASTRA_DB_APPLICATION_TOKEN,
      },
      30000
    );
  }
  return astraClient;
};

export const getWriteups = async () => {
  const client = await getAstraClient();
  const { status, data } = await client.post(
    `/api/graphql/${process.env.ASTRA_DB_KEYSPACE}`,
    {
      query: `query getWriteups {
        nextjs_writeups {
          values {
            writeup_id
            company_id
            title
            author
            date
            link
            short_link
            archive_link
          }
        }
      }`,
    }
  );
  if (status === 404) {
    throw new Error("Astra GraphQL endpoint is invalid");
  }
  return data && data.nextjs_writeups && data.nextjs_writeups.values;
};
