# HiveNet site — remaining build tasks

All public pages, auth and dashboard are built. Build passes.

- [x] All public pages (home, solutions, industries, how-it-works, about, plans, faq, contact, privacy, terms)
- [x] Staff sign-in (`/auth`) + managed `_authenticated` gate
- [x] Enquiry dashboard (`/admin`) — list, filters, stats, detail, notes, status
- [x] Routing tests
- [x] Verified: build clean, public enquiry flow e2e (reference HN-… saved in DB), admin gate redirects to /auth signed out
- [ ] Invite ceo@terraseptsolutions.com and grant the admin role (email supplied; blocked while Lovable Cloud is starting)
- [ ] Verify dashboard signed-in end-to-end (blocked on the invitation and password setup)
- [ ] Confirm GitHub delivery (changes can be committed here; GitHub sync status is only visible in Project settings → Git)
