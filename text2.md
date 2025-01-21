**Summary of Key Points**

- **Project Overview:**
  - The next project is building a **ticket management/customer relationship system** ("Auto CRM") similar to Zendesk, leveraging AI (especially LLMs) to automate repetitive tasks.
  - This project follows the same structure as the previous one: an **MVP** is due early (with a focus on core scaffolding and basic features), and a **full rebuild** with more advanced/production-grade capabilities is due by the end of the week.
  - The MVP deadline is **tomorrow**, with more features required by Friday.

- **Technical Requirements:**
  - **Required tech stack**: 
    1. **React** for the front end.
    2. **Supabase** (for auth, database, storage).
    3. **Cursor** (using its "Cursor Agent" or AI capabilities).
  - **Strongly recommended** but not strictly required:
    - **AWS Amplify** for hosting and CI/CD.
    - **LangChain** for chaining LLM calls (though you can implement your own solutions).
  - Additional possibilities (not mandatory) include:
    - Other frameworks or libraries (e.g., you could use Pinecone for vector storage or different LLM providers), but you must meet the **React + Superbase + Cursor** baseline.

- **LangChain Expression Language (LCEL) Lecture (Aaron's Demo):**
  - **Why use LCEL**:
    - Simplifies chaining multiple steps (prompt creation, LLM invocation, output parsing).
    - Offers built-in features: **streaming**, **batching**, and **async** support.
    - Integrates seamlessly with **LangSmith** for observability and tracing.
  - **Key concepts**:
    1. **Chains**: A "pipeline" of steps (e.g., prompt templates \(\rightarrow\) LLM calls \(\rightarrow\) output parsing).  
    2. **Parallel & pass-through**: Demonstrates how you can run multiple steps at once (if they do not depend on one another).
    3. **Streaming**: Display tokens as they're generated (useful for user-facing chat).
    4. **Batching**: Process multiple prompts in parallel (helpful for large-scale data processing).
    5. **Async**: Non-blocking calls for long-running tasks.
  - **Retrieval-Augmented Generation (RAG)**:
    - Combine a **retriever** (vector DB or other) with an LLM to answer questions based on relevant context.
    - Prompt engineering best practice: "Answer the question **based only** on the retrieved documents."

- **Project Requirements & Guidance:**
  - Focus first on **core CRM/ticketing** features: 
    - E.g., user ticket submission, agent interfaces, admin/supervisor dashboards.
  - In the second phase, layer in **AI features** (e.g., summarizing tickets, auto-responses).
  - The team will update the "tests to pass" (production metrics like concurrency, etc.) soon.

- **Common Q&A Points:**
  - **Spiky POVs**: While many have used Slack, fewer have deep CRM experience—use official docs, tutorials, or free tiers of Zendesk to understand ticket flows and gather ideas for "opinionated" features or improvements.
  - **Multi-Front-End**: You could build a standard web front end first; if you want a mobile app or multi-frontend approach, ensure your logic is abstracted (e.g., shared Supabase backend).  
  - **Firebase vs. Supabase**: The hiring partner specifically wants Supabase for rapid AI prototyping.  
  - **Deployment**: 
    - GitHub + Amplify for CI/CD is recommended (S3, Lambdas, etc. available).  
    - You can use any platform, but Amplify is simple and pre-approved.  
  - **MVP Deadline**:  
    - By the next day's deadline, have at least a **functioning scaffold** that does some subset of ticketing capabilities with a working database/auth.  
    - Full rebuild by the **end of the week** should implement all features plus AI.

**Next Steps**

1. **Set Up Your Tech Stack**  
   - Ensure you have **React**, **Supabase**, and **Cursor** integrated.  
   - Optionally set up **AWS Amplify** for hosting/CI.

2. **Build the Core MVP**  
   - Scaffold a basic ticketing system that can:
     - Let users submit tickets.
     - Show agents a list of incoming tickets.
     - Possibly allow some basic categorization or status updates.
   - Connect to Supabase for auth, roles (user/agent/admin), and ticket data storage.

3. **Incorporate Basic AI / LLM Calls**  
   - If time allows in the MVP stage, demonstrate a simple AI feature (e.g., summarizing ticket content). You can refine or expand AI capabilities later in the week.

4. **Prepare for Production-Grade Enhancements**  
   - Expect added "tests to pass" soon (e.g., concurrency targets).
   - Plan for more advanced features in the second part of the week, such as:
     - Additional RAG workflows (knowledge base retrieval).
     - Auto-tagging or auto-response generation.
     - Observability/tracing with LangSmith or logs.

5. **Review and Iterate**  
   - Keep an eye on the updated project doc for new requirements and metrics.
   - Use tomorrow's MVP submission to get **early feedback** and avoid falling behind.

6. **Attend Upcoming Sessions**  
   - Further classes on **LangChain Graph** (Wednesday).
   - **Austin's and guest speaker sessions** (Tuesday & Wednesday evenings).
   - Additional logistics sessions for QA and clarifications.
    
By following these steps and meeting the MVP milestone tomorrow, you'll be positioned to complete the full production-grade rebuild (including AI automation) by the week's end.