# Supabase Security Review

## Current Findings

- Supabase is not currently integrated into the application.
- `@supabase/supabase-js` is not installed.
- No Supabase client exists.
- No Supabase environment variables are referenced.
- No `service_role` key was found in the codebase.
- No Supabase tables or storage buckets are used by the application.
- Current destination data comes from `lib/destinations.js`.
- Current photos are stored in `public/photos/`.
- The existing `supabase/` directory is empty.
- Actual Supabase dashboard security still needs review if a Supabase project exists.

## Future Security and Recovery Checklist

- [ ] Enable Row Level Security on all browser-accessible tables.
- [ ] Allow public read-only access only where the application requires it.
- [ ] Deny anonymous writes unless they are intentionally supported and validated.
- [ ] Keep storage buckets private unless public access is explicitly required.
- [ ] Document database and storage backup procedures.
- [ ] Document and test the restore process.
- [ ] Never expose `service_role` keys to client code or `NEXT_PUBLIC_` variables.
