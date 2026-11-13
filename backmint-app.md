# Backmint — Web Application Functional Specification

**Document:** `backmint-app.md`  
**Version:** 1.0 · 2026-11-13  
**Status:** Proposed product specification; requires product-owner approval prior to production deployment  
**Primary implementation:** Next.js + TypeScript, responsive web application  
**Companion specifications:** `backmint-server.md`, `backmint-contracts.md`

> **Terminology rule:** Domain objects, identifiers, events, statuses, roles and module names are always defined in **English**. UI copy may be localized into Spanish, English and other languages. Web3 is invisible where possible; sensitive fund movements require explicit user authorization.

## 0. Product contract: canonical definitions

Backmint enables an `Organization` or eligible `Individual` to publish a `Project` or a `Call`, either to **offer funding/support** (`FundingOffered`) or to **request funding/support** (`FundingRequested`). A `Project` is a specific initiative; a `Call` is an open invitation/program to submit candidate proposals. Neither depends on the other. Both may accept interactions and result in `Award` and `Agreement` records where relevant. A `Project` may also be referenced in applications to independent Calls.

**Important domain distinctions:**

- `Project`: a specific initiative, which may have objectives, deliverables, team, budget, funding target and impact claims.
- `Call`: an invitation/program with eligibility, review policy, budget/support and selection capacity. It may finance one or multiple independent applicants' proposals.
- `Opportunity`: UI/read-model umbrella for a published Project or Call. **Do not create a third canonical funding entity** just because both appear in one feed. Each opportunity has `sourceType: Project | Call`, `sourceId`, `direction: FundingOffered | FundingRequested`.
- `Application`: a request to participate/execute under a `FundingOffered` Project/Call. It may reference a previously created Project or include a proposed plan. An Application is not an Agreement.
- `FundingOffer`: a funder's proposed support for a `FundingRequested` Project/Call; it may be invited or unsolicited depending on publisher settings. It is **not** an Application from an executor.
- `Evaluation`: the organization owner's review of an Application or FundingOffer. AI is advisory only. No AI-generated decision transfers funds.
- `Award`: a selection/acceptance decision designating recipient, support scope and proposed amount. For FundingOffered it follows selected Application; for FundingRequested it follows accepted FundingOffer. It does not indicate funds deposited.
- `Agreement`: signed/accepted financial or in-kind obligations derived from an Award (or direct mutually agreed terms, if later supported). One Award can be linked to one Agreement in v1; each Agreement has its own milestones and escrow.
- `FundingCommitment`: promised amount; `FundingDeposit`: confirmed on-chain receipt; `Disbursement`: actual final transfer to beneficiary. These are never conflated.
- `Milestone`: deliverable with acceptance criteria, amount and reviewer authority. `Evidence`: uploaded proof; `MilestoneReview`: authorized human decision.
- `Dispute`: contest to be handled under pre-accepted rules. `Arbitrator` may resolve only the scope authorized in the Agreement.

**Three independent UI controls (never merge):** `visibility` (`Private | Unlisted | Public`), `intakeStatus` (`Open | Paused | Closed`), and `lifecycleStatus` (`Draft | Published | Active | Completed | Cancelled | Archived`, subject to source type). A funding target does **not** imply a hard cap. `acceptFunding` and `acceptApplications` are distinct controls as applicable.

**Product exclusions:** no arbitrary execution-completion percentages. Show approved milestones as `3 of 5`, funded/settled amounts, and explicit evidence status. On-chain payouts are not equivalent to a confirmed real-world outcome. Testnet values are not real-dollar funds.

---

## 1. User categories and permissions

### 1.1 Identity and organization model

- A `User` is a natural person with one account; may be member of multiple Organizations and switch active workspace.
- `Organization.type`: `Company | Community | EducationalInstitution | Foundation | NGO | PublicInstitution | Collective | Other` (configurable taxonomy; PublicInstitution is restricted until compliance readiness).
- `Individual` applicants can participate only when explicitly enabled by opportunity owner, and where jurisdiction rules allow.
- An Organization may publish and fund initiatives, submit Applications, accept FundingOffers and execute projects. It is **not** permanently classified as only sponsor or applicant.
- A user acts **as an Organization** only with its active membership and authorized role; switching workspace must not retain permissions from a prior Organization.

### 1.2 Role matrix (baseline)

| Role | Read | Publish | Evaluate | Bind organization to Agreement | Authorize disbursement | Manage membership |
|---|---|---|---|---|---|---|
| `Owner` | Workspace | Yes | If assigned | If legal authority verified | If designated | Yes |
| `Admin` | Workspace | Yes | If assigned | Only with explicit delegation | If designated | Yes |
| `ProjectManager` | Assigned projects | Yes | If assigned | No by default | No by default | No |
| `Reviewer` | Assigned submissions | No | Yes | No | Only if an explicitly authorized milestone reviewer | No |
| `FinanceManager` | Finance | No | Optional | Only if authorized representative | Only per escrow rules | No |
| `AuthorizedRepresentative` | Relevant Agreement | Optional | Optional | Yes if valid authorization | Only if designated | No |
| `Member` | Assigned records | Optional drafts | No | No | No | No |
| `Auditor` | Read-only assigned | No | No | No | No | No |
| `PlatformAdmin` | Moderation only | No acting for a customer | No customer evaluation | Never by default | Never by default | Platform policies |

**Security acceptance:** only wallet/account identities designated in the on-chain Agreement can sign on-chain approvals. A backend role assignment alone cannot grant an unbacked blockchain authorization.

---

## 2. Page map and navigation

### 2.1 Public web

- Landing: what Backmint offers; Fund / Apply / Explore paths.
- `Explore`: searchable `Projects` and `Calls`, badges for direction, intake status, eligibility, organization verification and funding availability; avoid misleading verified badges.
- `Opportunity Detail`: overview, publisher, eligibility, timeline, selection slots, funding/support conditions, milestones template, FAQ, required documents, official legal terms and action `Apply` **or** `Offer Funding`, depending on direction.
- Public `Organization Profile`: validated name, verification status with scope, published opportunities, completed agreements, aggregate *confirmed* financial metrics, proven claims with methodology; private records excluded.
- `Project Detail`: independent project profile with owner, goals, evidence-based outcomes, funding target (optional, not hard cap), accepted offers and public agreements if opted in.
- Public `Backmint Embed` widget preview / standalone application link.

### 2.2 Authenticated individual area

- Account profile, preferences, locale, MFA, login identities, wallet connections, invitations.
- Organization picker and membership list; clear active Organization indicator at all times.
- `My Applications` and `My Funding Offers` kept separate; draft/submitted/withdrawn/accepted/rejected views.
- `My Reviews` for assigned evaluations and milestone reviews.
- `My Agreements`, evidence requests, payout statuses and user-specific notifications.

### 2.3 Organization workspace

- Overview: active and past Projects/Calls; incoming Applications/FundingOffers; selected Awards; Agreement states; deposited vs committed vs disbursed; outstanding Milestones, Disputes.
- `Projects`: create, list, edit according to state, version, publish/unpublish if permitted, close/reopen applicable intake independently of visibility.
- `Calls`: create program and conditions, manage applications/evaluations, selection rules, budgets and awards.
- `Applications Inbox`: eligibility filters, full one-by-one review, side-by-side comparison, comments, decision history, configurable evaluation rubric, AI summaries.
- `Funding Offers Inbox`: proposed amount, terms, offering Organization, counterproposals, accept/decline.
- `Awards`: selected candidates, capacity and budget controls, agreements pending acceptance.
- `Agreements`: signed terms, wallet authority, funding lifecycle, ledger, payout history.
- `Milestones`: assigned reviewers, submitted Evidence, approve/reject/request-changes/dispute; explicit reason and audit.
- `Finance`: real funds, pledged funds, available locked funds, pending transfers, confirmed disbursements; token/network units and USD **reference only** when quote available.
- `Organization Settings`: membership, permission scopes, verification, trusted payout addresses, security, disclosure preferences, embed settings.
- `Reports`: milestone counts, project outcomes and fact provenance, downloads.

### 2.4 Platform administration

- Organization verification queue, account abuse, sanctions/KYB escalation, moderation of content and unauthorized impersonation.
- Incident center (technical/security/financial), evidence of operational disputes, no arbitrary escrow controls.
- Payments reconciliation exception list, chain service health, audit trail, configurable country/currency policy.
- AI provider status, data-retention workflows, consent/complaint intake.
- Segregated support roles with narrowly scoped access; all privileged actions audited.

---

## 3. Main user journeys (precise happy paths)

### WEB-F01 — Create an Organization

1. User registers/authenticates; completes email verification and required security checks.
2. Selects `Create Organization`, type, jurisdiction, legal/display names and description; agrees to terms.
3. A draft organization is created; user becomes `Owner` in the service, not automatically a verified legal representative.
4. User invites members (optional), supplies legal documents and payout credentials (if seeking real-world financing).
5. Verification UI distinguishes `NotStarted`, `Pending`, `Verified`, `Rejected`, `Expired` and required follow-ups.
6. Only jurisdiction-eligible Organizations proceed to real-money Agreement activation; testnet sandbox may use synthetic verification but is explicitly labeled.

**Exceptions:** duplicate legal entity; stolen invite; organization changed country; revoked representative; failed verification; user belongs to multiple Organizations.

### WEB-F02 — Publish FundingOffered Call

1. Acting as a publishing Organization, create `Call` with `FundingOffered`.
2. Set title, purpose, topics, geography, start/end dates, application intake window, visibility, organization types eligible (`multiple`), allowed Individuals, required profile evidence and proposal questions.
3. Choose selection configuration: `Single`, `MultipleUnlimited` subject to budgets, or `MultipleLimited(maxAwards)`; award amounts `FixedPerAward`, `NegotiatedPerAward`, or `SharedBudget`.
4. Configure total announced budget and funding commitment policy; **never** portray un-deposited money as guaranteed funding.
5. Choose support mode `Monetary`, `InKind`, `Mixed`; for Monetary choose `SingleMilestone`, `MultipleMilestones`, `AdvancePlusMilestones`; template may be renegotiated per Award before acceptance.
6. Set evaluator assignment and criteria rubric; define non-discriminatory qualification rules, expiry, dispute/arbitration default and legal agreements.
7. Preview detail, embed card and application form; `Publish` locks material eligibility/rubric fields while applications are open (changes require versioning and notifications).
8. Open intake; after period, close or pause; closing intake never hides existing published opportunity.

**Acceptance:** changing `maxAwards`, budget, deadline or questions after applications requires explicit amendment policy; submissions retain applied version; an archived Call can still be publicly visible if policy allows.

### WEB-F03 — Publish FundingOffered Project

Same process as WEB-F02, except the issuer describes a **specific initiative to be executed** rather than an open program. Applicants propose execution plan, team and deliverables for that specific Project. Capacity and amounts configurable identically. A funding-offered Project **does not have to be linked to any Call**.

### WEB-F04 — Publish FundingRequested Project or Call

1. Organization creates its own `Project` (specific initiative) or `Call` (request for sponsors, partners or supporters for a program).
2. Sets direction `FundingRequested`, goals, target amount (optional), funding asset preference, geography, requested support type, publicity and accepted offer types.
3. Sets whether funding offers are `Open | Paused | Closed` independently of public visibility; chooses manual close, optional hard cap, or target-triggered close. Target is **informational** unless separately configured as hard cap.
4. Defines donor/funder eligibility and disclosure policies; eligibility for financial agreements may be stricter than ability to view.
5. Publishes; prospective funders send structured `FundingOffer` (not executor Application); publisher can accept/decline/negotiate, leading to an Award/Agreement.
6. If a Project is also used as an executor's submission to an unrelated Call, that Application and the project's own funding intake remain distinct.

**Acceptance:** reaching target does not automatically close unless the explicit optional policy says so; permitted administrator can reopen intake; visibility unchanged; double-financing declarations and ring-fenced spending obligations are enforced by agreement rules.

### WEB-F05 — Apply to a FundingOffered Project/Call

1. User selects acting applicant Organization (or Individual if enabled).
2. Server pre-checks required Organization type, location, verified status, prohibited conflicts, deadline, capacity intake state.
3. User creates a proposal inline or references a Project they own/are authorized to submit; attaches answers, budget, schedule and documents.
4. User previews the full proposal, validation warnings, terms and exact Call/Project version.
5. `Submit` freezes a submission snapshot; receives receipt and accessible status.
6. Owner may issue `RequestChanges`; only allowed fields/versions can be updated, with history retained.
7. Applicant can `Withdraw` until policy deadline; withdrawal after selection requires agreement rules.

**Acceptance:** one Application per applicant per opportunity by default, configurable multiple proposals with anti-spam and uniqueness policy; drafts cannot be evaluated; expired intake blocks new submissions; application content stays confidential to authorized reviewers.

### WEB-F06 — Evaluate individual Applications

1. Organization's `Reviewer` opens queue; filters by status, type, eligibility, risk, deadlines, tags and AI-suggested requirement match.
2. Reviewer opens one Application, views exact submitted version, attached docs, requirement-by-requirement checklist and source-linked AI summary.
3. AI produces `Met | NotMet | Unclear | NotEvaluated` **per condition** with rationale and citations to available application material; never automatic award or release.
4. Human reviewer records rubric ratings, comments, requests changes, shortlists/rejects/recommends.
5. Authorized decision maker selects winner(s), checks remaining award slots and program budget, records decision/reasons, notifies applicants.
6. Accepted applicant proceeds to terms negotiation; unsuccessful applicants receive permitted status/message without exposing competing confidential proposals.

**Exceptions:** reviewer recusal/conflict of interest; insufficient evidence; model hallucination; changed rubric after submission; conflicting evaluator reviews; applicant unverified; available slot exhausted.

### WEB-F07 — FundingOffer on FundingRequested opportunity

1. Funder identifies Organization/Individual eligible to offer funding; sees project goals, optional target and current *confirmed* funding totals.
2. Enters proposed amount, token/currency, supported purpose, requested milestones, approval authority, offer expiration and privacy preference.
3. Publisher reviews one offer at a time and may negotiate; a new revision must be explicitly accepted by both sides.
4. On acceptance, record Award and present Agreement to authorized representatives; offer is not a transfer of assets.
5. Funder finances escrow only after Agreement is final; show funded/deposited and paid figures distinctly.

### WEB-F08 — Award to Agreement

1. `Award` created only after valid selection or accepted FundingOffer; links to source Project/Call and Application/FundingOffer.
2. Parties negotiate beneficiary wallet, token, exact amounts and Milestone acceptance criteria and schedule; an in-kind Award may have an Agreement but no escrow.
3. Show complete canonical text/version/hash, reviewer(s), arbitrator, cancellation/dispute rules, storage/refund responsibility and network.
4. Authorized representatives consent/sign, with explicit wallet authorizations where needed; no auto signature by Backmint.
5. Status: `PendingAcceptance → Accepted → AwaitingFunding → Funded/Active` as applicable. An Award alone must never show `Funded`.
6. On confirmation of on-chain escrow deposits, Agreement moves to `Active` (or `PartiallyFunded` if partial deposits are explicitly allowed); UI displays explorer receipts.

### WEB-F09 — Submit/approve Milestone; disburse

1. Beneficiary accesses an Active Agreement, opens a Milestone eligible for submission and uploads versioned Evidence; server records content hashes and permissions.
2. Designated reviewer sees specific acceptance criteria, original agreement, submitted Evidence, AI *advisory* summary and previous revisions.
3. Reviewer selects `Approve`, `Reject` or `RequestChanges`; recorded reason, signature/authorization and identity required.
4. If approved, display `Approved` but **not** `Paid`; authorized wallet transaction is signed; the escrow enforces its own conditions.
5. Show `ReleasePending` while chain transfer is in flight; on success show `Released` and tx hash; on failure show retry/reconciliation state without duplicating payment.
6. Other Milestones remain independent unless sequence rules specify otherwise; denied/revised Milestone cannot be paid.

**Negative demonstration:** attempt to release an unapproved Milestone must fail on chain even if the API is called directly.

### WEB-F10 — Dispute/cancellation/refund

1. Eligible actor opens incident with dispute reason, related Agreement/Milestone and evidence; UI explains how funds will be affected.
2. A dispute **must** be accepted by contract conditions and authorized actor; flag in UI alone never guarantees freeze.
3. Notify parties and assigned arbitrator; allow statements and negotiated settlement.
4. Arbitrator selects only an allowed outcome: release to beneficiary, refund source funder, authorized split (if supported), or request revisions.
5. Authorized on-chain execution; pending and confirmed status distinct; record appeals only if agreement supports them.
6. For MVP: minimal predesignated arbitrator / scope-limited pause; otherwise only demo escrow with clear statement that production mediation is unsupported.

### WEB-F11 — Close/reopen intake, visibility changes

- `Close Intake`: disallows **new** Applications or FundingOffers; existing decisions and Agreements proceed.
- `Pause Intake`: blocks submission temporarily and preserves application drafts.
- `Reopen Intake`: permitted only by publisher, while lifecycle/legal rules permit; new deadlines/terms visible and versioned.
- `Make Private/Unlisted/Public`: changes discovery only; it does not cancel Applications, FundingOffers, deposits or Agreements.
- `Complete/Archive`: read-only financial history continues to exist; cannot delete funded obligations.

### WEB-F12 — Embed a public opportunity

- Provide script/iframe/embed card for public opportunity, list of organization's Calls/Projects, configuration of theme, language, domain allowlist, privacy and link behavior.
- Widget is read-only in MVP with `Apply`/`Offer Funding` deep-link to Backmint-hosted authenticated flow.
- No private application documents, financial keys or privileged authorization in embeds. Use frame sandboxing, CSP and safe origin communication.
- Preview, publish, rotate embed identifiers, revoke host and inspect basic attribution stats.
- Test unauthorized origin, nonexistent/archived source, closed intake, mobile responsiveness and screen-reader accessibility.

---

## 4. Detailed screens and forms

### Create Project / Call wizard

1. `Basic Information`: type, direction, Organization, title, description, topics, geography, language, banner, visibility.
2. `Funding & Support`: requested target, optional hard cap, offered budget, token/currency and amount per Award policy; for unfunded support, value description.
3. `Eligibility`: allowed Organization types multi-select, Individual eligibility, legal jurisdictions, identity/KYB, applicant project documentation.
4. `Intake & Selection`: dates, open/close/reopen, `maxAwards`, selection criteria, rubric (optional), evaluation committee, deadlines.
5. `Milestones & Agreements`: default structure, criteria, reviewers, dispute strategy, refund policy, negotiation permission.
6. `Review & Publish`: preview public data, redaction, versions, required legal acknowledgment, publish or save draft.

### Application detail

- Applicant Organization verified identity with scope, application submission version and timestamp.
- Project information and requested funding/support; responses side by side with explicit criteria.
- Files with secure short-lived access, audit on downloads where appropriate.
- Eligibility statuses and source evidence, AI summary labels clearly separated from human decision.
- Notes (private reviewer-only), questions to applicant, internal action history and final decision reason.
- Compare tool only across applicants who submitted to same Project/Call, respecting visibility rules.

### Funding/Agreement view

- Separate metrics `Announced Budget`, `Awarded`, `Committed`, `Deposited`, `Locked`, `Pending Release`, `Released`, `Refunded`.
- Show `assetSymbol`, `network`, `contractAccount`, `tokenContract` and token integer base-unit handling, with reference fiat rate timestamp if displayed.
- Per-Agreement timeline, Milestone status chips, evidence details, signer prompts, transactions and external explorer deep links.
- Visible warnings for unverified asset, incompatible wallet, wrong network, insufficient gas/storage, testnet and uncertain transaction state.

### Dashboards and impact

- **No overall execution %**; display milestone counts by state and delivery/approval times.
- Funding data is separately tagged as `OnChainConfirmed`, `OffChainVerified`, `SelfReported` or `Estimate`.
- Project outcomes (people trained, event attendees, trees planted) may be shown only with definition/source/evidence status and appropriate uncertainty.
- Sponsor workspace: open opportunities, total submissions, awards, agreements, locked/released/refunded amounts, missed deadlines, conflicts, outcome claims.
- Applicant workspace: submitted Applications, outcomes, FundingOffers, Milestones due, evidence revisions, confirmed funds received.
- Public profile: only expressly published and substantiated information; privacy overrides public aggregate detail.

---

## 5. Canonical UI status matrix

| Object | States | Operator actions | Display restrictions |
|---|---|---|---|
| `Project/Call.lifecycleStatus` | Draft, Published, Active, Completed, Cancelled, Archived | Publish, activate, complete, archive | Independent of intake and visibility |
| `Project/Call.intakeStatus` | Open, Paused, Closed | Pause, close, reopen | Closed ≠ hidden; can remain Active |
| `Project/Call.visibility` | Private, Unlisted, Public | Change access | No withdrawal of funds |
| `Application` | Draft, Submitted, UnderReview, ChangesRequested, Shortlisted, Selected, Rejected, Withdrawn | Submit/review/select/withdraw | Selected ≠ Award funded |
| `FundingOffer` | Draft, Submitted, InNegotiation, Accepted, Declined, Expired, Withdrawn | Send/revise/accept | Accepted ≠ money deposited |
| `Award` | Proposed, Accepted, Superseded, Cancelled | Negotiate/confirm | Award ≠ Agreement on-chain |
| `Agreement` | Draft, PendingAcceptance, AwaitingFunding, PartiallyFunded, Active, Suspended, Completed, Cancelled, Terminated | Sign/fund/close | State backed by confirmations |
| `Milestone` | Pending, Ready, Submitted, UnderReview, ChangesRequested, Rejected, Approved, ReleasePending, Released, Disputed | Evidence/review/release | Approved ≠ Released |
| `Disbursement` | Requested, Broadcast, PendingConfirmation, Confirmed, Failed, NeedsReconciliation | Track/retry safely | Only Confirmed counts as paid |
| `Dispute` | Open, EvidenceCollection, UnderArbitration, Resolved, Dismissed | Escalate/resolve | Contract freeze separately verifiable |

Source-specific invalid transitions MUST be rejected by server and, for financial state, by contracts.

---

## 6. Edge cases and negative scenarios

1. Applicant changes Organization type after submitting: original snapshot retained, recheck eligibility before Award.
2. Publisher changes criteria mid-call: preserve prior version; notify affected applicants; optionally reopen window fairly.
3. Max award capacity reached while two reviewers select: server must serialize decision and reject exceeding cap.
4. Announced budget exceeds deposited amount: show `Unfunded/PartiallyFunded`, never say secured.
5. Funder seeks to fund same expense twice: collect declarations and alert; cannot prove external use solely via chain.
6. Funding target exceeded: may accept when no hard cap; stop when explicit hard cap exists.
7. Intake closed while Agreement active: existing milestones/releases continue.
8. User removes wallet or rotates keys: prior signatures remain auditable; new authorization requires verified replacement and on-chain update.
9. Evidence deleted or replaced: immutable history/hash of each referenced revision, subject to privacy retention policy; no silent replacement.
10. AI unavailable or wrong: reviewers can continue manually; AI cannot block an otherwise authorized decision.
11. Reviewer related to applicant: conflict disclosure and recusal.
12. Blockchain tx broadcast but response times out: show unknown/pending, reconcile by tx hash, no blind retry.
13. Transfer callback fails: not shown as paid; supports controlled retry after reconciled state.
14. Dispute occurs during release: contract atomic/reservation policy decides outcome; UI may not assume cancellation.
15. Unlisted embed is embedded on unauthorized domain: domain allowlist and access policy enforced; unlisted URL is not secret.
16. Beneficiary declines Award: release award slot and commitment; do not automatically refund on-chain funds without Agreement logic.
17. Organization loses verified status mid-Agreement: block new actions per policy while preserving lawful settlement obligations; escalate to compliance.
18. Person participates in several organizations: every operation displays acting identity and verifies tenant scope server side.
19. Non-monetary Agreement: no escrow balance or on-chain release; delivered in-kind support acknowledged by designated roles.
20. User creates `FundingRequested Call` and receives multiple funders: each FundingOffer/Agreement independent until shared-pool contracts are explicitly supported.

---

## 7. Accessibility, UX and internationalization

- Fully responsive (mobile, desktop); WCAG 2.2 AA as target; semantic landmarks, keyboard-only flows, focus management and screen-reader status changes.
- Localize UI text, date/time zones, monetary labels, errors and legal copy; **never translate canonical enum IDs**.
- Display reference fiat conversions with rate date/time/provider; do not imply 1 token = 1 USD unless verified.
- Avoid mandatory wallet connection when browsing, drafting or evaluating off-chain data; require wallet signature for on-chain commitment/funding/release actions as relevant.
- Consent screen explains what will be public, irreversible, and financially binding.
- Transaction screen must show contract, network, asset, base and human-readable amount, receiver, gas estimate and consequences.
- Financial actions require double-confirmation UX and guard against accidental repeat submission; no generic success toast before network confirmation.
- Error recovery and save-as-draft across lengthy forms; upload progress, anti-virus/scan status, file size/type limit.

---

## 8. Frontend suggested architecture

```text
backmint-app/
  src/
    app/                    # Routes and layouts
    features/
      auth/ organizations/ verification/
      projects/ calls/ applications/ funding-offers/
      evaluations/ awards/ agreements/ milestones/
      funding/ disputes/ embeds/ dashboards/
    entities/               # UI read models and typed API models
    shared/
      ui/ api/ auth/ i18n/ wallet/ forms/ errors/
    widgets/                # Composite UI, not embed deployment only
  tests/
    unit/ component/ integration/ e2e/
```

- Build features vertically and keep business authority server-side / on-chain; UI state is not trusted.
- Use generated OpenAPI client from server contract instead of duplicate handwritten DTOs when feasible.
- Wallet adapter wraps wallet SDK and chain-specific signing; do not store private keys in web local storage.
- Chain observer is read-only unless user intentionally signs. Backend synchronizes confirmed chain events.
- Embed deployed as independently loadable restricted/public widget; protected application flow navigates to Backmint.
- Error boundary and observability separate transient failures from rejected business rules.

---

## 9. Delivery increments

### H0 — Hackathon MVP (must work end-to-end)

- Two demo Organizations (issuer/applicant) and wallet identities; clear testnet labels.
- Create FundingOffered `Call`, eligibility by Organization type, single/multiple winner mode, one or two milestone terms.
- Create Project, submit Application, issuer evaluates manually with optional AI summary and selects one applicant.
- Create/accept Agreement, deposit NEAR testnet, upload Evidence, approve Milestone, release and confirm one payout.
- Attempt invalid early release and show contract rejection; publish opportunity embed card.
- Single authoritative dashboard for statuses and chain tx links; test against server/chain mismatches.

### V1 — Commercial readiness (not automatically safe for money)

- Real KYB and representative authorization, full audit, committee scoring, reusable Project and templates, FundingRequested + FundingOffer, multiple awards, disputes, reconciliation, security review, localization, privacy controls.
- Regulatory classification and licensed-partner integrations required before real-money activity.

### V2 — Growth

- Multiple funders per Project, richer funding instruments, cross-chain providers, white-label workspace, API platform, formal impact evidence, native collaboration, full dispute support, institution/region policy packs.

---

## 10. Test and acceptance matrix

| Case | Expected result |
|---|---|
| Publish Call without eligibility/terms | Validation failure with field errors |
| Publish Project standalone | Works without Call reference |
| Apply to FundingRequested Project as executor | Not allowed unless explicit participation program is separately configured |
| Offer funding to FundingRequested Project | FundingOffer created; **no deposit yet** |
| Select two applicants when `maxAwards=1` | Second selection rejected |
| Close intake on active Project | No new submissions; active Agreements proceed |
| Funding target reached, no cap | Intake remains open if owner policy says so |
| Hide public Project with active Agreement | Public listing hidden, Agreement obligations untouched |
| AI says eligible but human rejects | Human decision recorded, AI not authoritative |
| AI says approved Milestone | Does **not** trigger payment |
| Approve Milestone lacking accepted Agreement | Rejected |
| Report transfer pending as paid | Forbidden |
| Embed from disallowed origin | Restricted or blocked per embedding policy |
| User acts via other Organization's membership | 403 and audit |
| Refund / dispute authorization not met | Contract rejects even if UI bypassed |

---

## 11. Cross-repository integration contract

- Server is authoritative for identity, eligibility, proposals, selection, legal document versions and evidence metadata.
- Contract is authoritative for escrow balances, on-chain authorization, release/refund finality, and token settlement.
- Frontend displays server read models that carry chain synchronization status and direct explorer links; client may query chain but not override server's signed reconciliation.
- Contract integration is defined in `backmint-contracts.md`; database and process rules in `backmint-server.md`.
- All three specifications share IDs and lifecycle definitions. If a field/event is changed, update all references in one reviewed change.

## 12. Security and legal disclaimer

- Testnet MVP only; financial service production requires contract audits, independent testing, KYB/AML/sanctions analysis and legal assessment by jurisdiction.
- App must not claim all projects are verified or outcomes guaranteed. “Verified Organization,” “Reviewed Evidence,” and “On-chain Confirmed Payment” are distinct claims.
- Backmint's dispute mediation powers are strictly limited to pre-accepted Agreement rules; platform administrator credentials cannot silently release or seize balances.

