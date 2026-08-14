Andrej Karpathy coined the term "vibe coding" in February 2025 and buried it twelve months later. That's a remarkably short lifespan for a word that reshaped how an entire industry talks about building software — and the funeral is the most useful signal we've had about where this is actually going. Vibe coding, as most people practiced it, was "type a prompt, paste the output, pray." Agentic engineering, the thing that replaced it, is closer to what a senior designer does every day: orchestrate the work, review the output, and only sign off when it meets a standard you can defend.

If that sounds like a threat to your credibility as a non-traditional engineer, it isn't. It's the first time in the history of software that the job description has moved *toward* the skills designers already have.

## Why the term died

Let me be precise about the timeline, because the arc matters. Karpathy introduced "vibe coding" on February 5, 2025, describing it as fully giving in to the vibes, embracing exponentials, and forgetting that the code even exists. It was an observation, not an endorsement — but the industry ran with the laziest possible reading: *I don't need to understand this, the machine handles it.*

By February 2026, Karpathy publicly retired the term and reframed the work as agentic engineering: developers no longer type prompts and hope; they orchestrate and review agents that plan, execute, test, and iterate across entire codebases. The Next Web covered the shift alongside Cursor's reported $2 billion raise at a $50 billion valuation — roughly $0 to $2 billion in ARR in three years, a scaling curve faster than Slack, Zoom, or Snowflake ever managed.

The market caught up to the semantics, and the semantics were a correction. Prompting was never the bottleneck. *Review* was. The people who ship are not the ones who generate the most code — they're the ones who can tell good output from bad output, fast, and make the agent close the gap.

## What actually changed in the last year

It's worth being concrete about the state of the tooling, because the workflow you should adopt in 2026 is built on it:

- **Agents replaced autocomplete.** Copilot-style line completion is table stakes. The interesting tools — Claude Code, Cursor in agent mode, Codex, Windsurf — operate on whole repositories: plan a change, edit multiple files, run the tests, iterate on failures.
- **Agents are already contributors.** GitHub's Octoverse 2025 reported over a million agent-authored pull requests in five months, and roughly 80% of new developers use Copilot within their first week. TypeScript overtook JavaScript and Python as the most popular language, largely because strongly typed code gives AI agents a much harder contract to reason against.
- **The money followed the shift.** AI coding tools went from a roughly $5 billion market in 2024 to an estimated $12.8 billion in 2026. Ninety percent of developers now report using AI tools at work.
- **The failure modes moved too.** Veracode tested 100+ models and found 45% of AI-generated code samples failed security tests. Not edge cases — XSS failed in 86% of relevant samples. And in the highest-profile cautionary tale of 2026, Lovable shipped a backend regression that re-exposed chat history and source code of public projects for over two months before it was caught and fixed.

The lesson isn't "AI code is bad." The lesson is that *unreviewed* AI code is bad, and review is a discipline, not a vibe.

## Two modes, one workflow

The single biggest upgrade you can make to your workflow is separating the work into two explicit modes, and being deliberate about which one you're in.

**Planning mode.** This is where you write the spec: the problem, the constraints, the data model, the edge cases, what "done" looks like. You do this in a chat context or a spec document before any code is written. Claude Code in plan mode, a well-structured markdown brief, or even a thread in your editor's agent panel all work. The point is that the agent gets a contract, not a suggestion.

**Execution mode.** This is where the agent does multi-file work: scaffolding, implementing, running tests, fixing what it broke. Cursor Composer, Claude Code's execution loops, Codex in agent mode — the mechanics matter less than the separation. Every time you catch yourself mid-execution thinking "wait, what am I actually trying to build?" you've already lost the discipline.

Designers should recognize this shape instantly. It's the double diamond. Divergent exploration, then convergent definition, then execution, then validation. The people who adopted this framing early are the ones who describe AI-assisted development as a productivity superpower rather than a lottery ticket.

## The review gate is the product

DORA's 2025 State of AI-assisted Software Development report landed on a finding that should be taped to every monitor: AI improves throughput, but often at the expense of stability when the foundations aren't solid. AI is an *amplifier* — it makes good teams faster and bad teams faster-at-breaking-things. The variable that decides which team you are isn't the model. It's the review gate.

Here's the pre-merge checklist I run on every agent-authored change, and I steal unapologetically from engineering practices I don't personally write by hand:

- **Types and contracts.** Does the change respect the existing type system? TypeScript is your cheapest safety net — make the agent prove the build is green.
- **Auth on every data path.** Is there a route, query, or webhook that reads or writes data without authentication and authorization? This is the #1 class of failure in agent-generated code, and it's invisible in the happy-path demo.
- **Row-level security.** If you're on Supabase or Postgres, every table needs policies. Default-off. The Lovable incident and the RLS audit reports that followed made this the single most important line item on the checklist.
- **Error and empty states.** What does the screen look like when the API fails, the list is empty, or the user has no permission? Agents ship happy paths; your review gate ships the other 90%.
- **Behavior tests, not snapshots.** Ask the agent for tests that assert behavior — "an unauthenticated request returns 401" — not snapshots that lock in whatever it generated.
- **Accessibility.** Alt text, focus states, keyboard paths. This is a designer's native territory and it's where most generated UIs fall apart.

Every item on that list is a question you ask the agent to *prove*. "Show me the RLS policies." "Show me the middleware that guards this route." "Run the tests and paste the output." The review gate is the product because the review gate is where production quality is actually decided.

## Why designers are built for this

Here's the part that makes me quietly bullish on designers who ship. Everything I just described — edge cases, empty states, error paths, accessibility, making the artifact defendable against a standard — is design critique. It's the same muscle you use in a design review when you ask "what happens at 320px wide?" or "what does this look like when the data is bad?"

The 2026 difference is that you're applying that muscle to code instead of frames, and the medium doesn't change the craft. The Veracode stat — 45% of generated code failing security checks — isn't a reason for designers to stay out of the deep end. It's the market proving that *nobody* is shipping unreviewed output, and that the bottleneck is judgment, which is the one thing you've been training your whole career.

## The agent should prove four things before you merge

If you take nothing else from this, take this: before any agent-authored change ships, demand proof on four things.

1. **The build and the tests pass.** Not "probably pass" — a run you can see.
2. **Authorization is enforced on every path.** Show me the middleware, the policies, the checks.
3. **The failure states exist.** Show me what happens when it breaks, when it's empty, when it's unauthorized.
4. **The change is reviewable.** Reasonable diff size, no dead code, no committed secrets, no drift from the spec.

Vibe coding died because "it works on my machine" — or in a demo, or in a screenshot — stopped being a standard the day agents could generate a thousand lines an hour. What's left is the discipline of review, and that discipline has always been the designer's home turf. The designers who win the next five years aren't the ones with the best prompts. They're the ones who treat the agent like a brilliant, fast, occasionally reckless junior — and review accordingly.
