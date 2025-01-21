**Meeting Summary (Key Points)**

- **Supabase Invitation & Permissions Issues**  
  - Several participants reported challenges with implementing an organization-invite flow and assigning roles/permissions in Supabase.  
  - Row-Level Security (RLS) recursion errors were a common theme. Some recommended:  
    - Dropping or restructuring problematic tables/foreign keys.  
    - Using a function-based approach to avoid recursion.  
    - Checking out official Supabase documentation carefully.

- **AI Tools (Lovable vs. Cursor) for Supabase**  
  - Some have found Lovable's agent to be more effective with Supabase schema changes (except around RLS).  
  - Cursor was less reliable for certain advanced database configurations.

- **Amplify Deployment Limit & Workarounds**  
  - Amplify has a 25-deployment limit (shared org-wide), causing issues especially with repeated failed builds.  
  - **Recommendation**: Use Vercel or Netlify (both have free tiers) for Next.js apps if blocked by Amplify.

- **MVP Requirements & Deadlines**  
  - **MVP Focus**: A workable end-to-end user journey (e.g., create, edit, manage tickets in a CRM-type app).  
  - **Emphasis**: Get basic functionality first—production polish can come after core features are in place.  
  - **Submission Deadlines**:  
    - MVP "checkpoint" due the same day (6 PM window).  
    - A Friday "final push" deadline, with Sunday re-submit if needed.  
    - Always submit _something_ to avoid falling behind.

- **Austin On-Site Logistics Q&A**  
  - Move-in day: Monday, February 3 (details may vary if traveling far).  
  - Apartments and an office space will be provided; a shuttle will likely run between them.  
  - Flights, lodging, and most logistics are covered; final details will come in a dedicated meeting soon.  
  - No strict dress code, but be mindful of professional events and guest speakers.

- **Future Project Launches & Ownership**  
  - Encouragement to "launch" MVPs publicly (e.g., Product Hunt, social media).  
  - You retain ownership of what you build in Gauntlet, though specifics could vary if you end up at a partner company—official clarification to follow.  
  - Final "Demo Day" will include group or solo projects; you can choose your own focus and potentially pitch it to Trilogy or outside investors.