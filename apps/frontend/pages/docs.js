import Section from "components/Section";
import PublicHeader from "components/PublicHeader";
import PublicFooter from "components/PublicFooter";
import React from 'react';

  
const { Client } = require('@notionhq/client');
const notion = new Client({ auth:  process.env.NOTION_SECRET_KEY });


export async function getStaticProps() {
      try {
        // Default options are marked with *
        const response = await notion.databases.query({ database_id: process.env.NOTION_API_KEY });
        const res= JSON.stringify(response, null, 2);
        return { props: {res,}, };
        
      } catch (err) {
        if (err instanceof Error) {
          throw new Error(err.message);
        }
        throw err;
      }
}

export default function Docs(res) {
  console.log(res);
  
  return ( <>
    <PublicHeader />
    <div className="max-w-4xl mx-auto min-h-screen md:mx-auto">
      <Section>
        <h1 className="text-5xl text-center mb-10">Documents</h1>
        { <div><pre>{JSON.stringify(res)}</pre></div> }
    </Section>
    </div>
  <PublicFooter/> </>
  );
}





















  


  
  
  
  
  
  


