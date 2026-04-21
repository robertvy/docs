# Product Surface Validation Log

Published docs pages: 159

Use this log to validate each published docs page against the actual product surface:

- Frontend UI labels, routes, visible controls, and interaction states
- Backend Django models, serializers, views, tasks, and permissions
- Voice worker / runtime behavior where the page describes call execution, voice runtime, tools, telephony, or post-call processing
- Screenshot coverage and demo seed data where the page includes images

Mark a page as complete only when all applicable checks are done.

Columns:

- `Read`: page read in full
- `UI`: docs match the current frontend product surface
- `Backend/Worker`: docs match Django and runtime behavior
- `Images/Seed`: screenshots, screenshot scripts, and seed data checked if the page uses images
- `Done`: audit completed, with any needed fixes made and verified

> Leave `Images/Seed` unchecked only if the page has no screenshots or seeded product state to validate.

## Guides > Get Started

| Page | Read | UI | Backend/Worker | Images/Seed | Done | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| `introduction` | [x] | [x] | [x] | [x] | [x] | Docs IA page only. Checked links and terminology against current published sections, agent/editor naming, and launch/manage surfaces. No screenshots. |
| `quickstart` | [x] | [x] | [x] | [x] | [x] | Validated create/test/deploy flow against agent list, create modal, `TestAgentPopover`, phone-number dependency, and widget/campaign launch surfaces. |
| `glossary` | [x] | [x] | [x] | [x] | [x] | Validated terminology against current agent editor labels, Knowledge Base modes, telephony naming, subaccounts, Trust Center, and widget surfaces. No screenshots. |
| `faq` | [x] | [x] | [x] | [x] | [x] | Validated FAQ answers against current agent creation, test/deploy paths, phone-number import, campaigns, MFA route, KB limits/refresh, subaccount billing handoff, and API/webhook surfaces. Fixed stale 50 MB KB limit, overly fixed latency claim, and broad SDK wording. No screenshots. |

## Guides > Build > Agent Basics

| Page | Read | UI | Backend/Worker | Images/Seed | Done | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| `build/getting-started/create-first-agent` | [x] | [x] | [x] | [x] | [x] | Validated against `CreateAgentModal`, agent list route, template/language fields, and agent creation flow into the editor. |
| `build/getting-started/agent-editor` | [x] | [x] | [x] | [x] | [x] | Validated toolbar/tabs against `frontend/src/app/routes/app/agents/edit.tsx`. Fixed stale Call Flow screenshot caption/alt text. |
| `build/getting-started/runtime-architecture` | [x] | [x] | [x] | [x] | [x] | Validated lifecycle framing against Django public room creation, sharing/webhooks/post-call services, and voice worker inbound/outbound/session flow. No screenshots. |
| `build/getting-started/share-agent-demo-links` | [x] | [x] | [x] | [x] | [x] | Validated against `ShareLinkModal`, `ShareSettings`, `AgentShare`, share services, public payloads, demo caps, and allow-web-demo enforcement. |

## Guides > Build > Voice & Identity

| Page | Read | UI | Backend/Worker | Images/Seed | Done | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| `build/basic-config/agent-identity` | [x] | [x] | [x] | [x] | [x] | Validated `IdentitySection`, `MiscSection`, and agent model fields. Fixed docs to move tags/notes to `General → Miscellaneous` in Expert mode and corrected screenshot wording. |
| `build/voice-speech/ai-pipeline-guide` | [x] | [x] | [x] | [x] | [x] | Validated conceptual stack against `SpeakingSection`, `ThinkingSection`, transcriber/voice settings, pronunciation runtime, and runtime timing docs. No screenshots. |
| `build/voice-speech/transcriber` | [x] | [x] | [x] | [x] | [x] | Validated the `Understanding` UI, Simple mode language picker, Expert transcriber modal, keywords row, and Deepgram/Azure catalog YAML. Revamped docs to start with basics, then Simple language selection, then Expert provider/model/keyword settings. No screenshots. |
| `build/voice-speech/choose-ai-model` | [x] | [x] | [x] | [x] | [x] | Validated `ThinkingSection`, simple presets, provider catalog, custom LLM modal, temperature behavior, and YAML model catalog. Fixed stale search/model-parameters/versioning claims. No screenshots. |
| `build/voice-speech/select-voice` | [x] | [x] | [x] | [x] | [x] | Validated voice catalog providers from Django and `VoiceSettings`. Fixed provider list/access wording and removed stale Google-provider references. Screenshot files exist at 1728x1117. |
| `build/voice-speech/voice-settings` | [x] | [x] | [x] | [x] | [x] | Validated dynamic voice settings against frontend and `voice_catalog.py`. Fixed docs to state only ElevenLabs exposes adjustable settings in the dashboard. Screenshot files exist. |
| `build/voice-speech/voice-cloning` | [x] | [x] | [x] | [x] | [x] | Validated clone modal, provider limits, API views, and provider services. Fixed provider-specific formats/limits, visible status flow, validation wording, and removed unsupported visible re-clone action. Screenshot files exist. |
| `build/voice-speech/custom-pronunciations` | [x] | [x] | [x] | [x] | [x] | Validated pronunciation modal, CSV import/export, 500-entry cap, and voice synthesis replacement path. Fixed advanced markup wording to avoid unsupported IPA-format claims. No screenshots. |
| `build/voice-speech/ambient-sound` | [x] | [x] | [x] | [x] | [x] | Validated Sounds panel, ambient sound model fields, upload validation, and runtime fields. Fixed custom upload, supported formats, volume scale, and removed nonexistent Audio Library claim. Screenshot files exist. |
| `build/voice-speech/thinking-sounds` | [x] | [x] | [x] | [x] | [x] | Validated Sounds panel, `ThinkingSound` model, upload limits, delay setting, and runtime intent. Added delay/custom-sound controls that were missing from docs. No screenshots. |

## Guides > Build > Prompts & Instructions

| Page | Read | UI | Backend/Worker | Images/Seed | Done | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| `build/conversation/prompt` | [x] | [x] | [x] | [x] | [x] | Validated against `InstructionsSettings`, `PromptEditor`, prompt variable store, and Django `ContextProcessor`. Removed stale AI-suggestion UI, fixed button labels and runtime variables. Screenshot viewed; no loader. |
| `build/conversation/prompt-engineering-guide` | [x] | [x] | [x] | [x] | [x] | Validated conceptual guidance against prompt editor, tool/knowledge runtime framing, and `ContextProcessor` variables. Fixed stale `contact.phone` reference. No screenshots. |
| `build/conversation/voice-prompting-guide` | [x] | [x] | [x] | [x] | [x] | Validated voice-specific guidance against voice worker turn-taking, transfer/custom-pronunciation docs, and current agent prompt model. No screenshots. |
| `build/conversation/prompt-templates` | [x] | [x] | [x] | [x] | [x] | Validated against prompt template modal, frontend categories, read-only prompt-template API, and `seed_prompt_templates`. Removed unsupported settings/create/manage/merge/version claims. Screenshot viewed; modal is valid but shows collapsed categories rather than selected template content. |
| `build/conversation/variable-sources` | [x] | [x] | [x] | [x] | [x] | Validated against prompt variable store and Django `ContextProcessor`. Fixed `contact.phone_number`, `agent_uuid`, and current `medium` wording. No screenshots. |
| `build/conversation/runtime-data-flow` | [x] | [x] | [x] | [x] | [x] | Validated lifecycle against `construct_prompt`, Dynamic Context, action runtime inputs, post-call analyses, notifications, and `dyn_*` usage. Fixed stale contact/agent variable examples. No screenshots. |
| `build/conversation/variables-dynamic-content` | [x] | [x] | [x] | [x] | [x] | Validated Jinja support against sandboxed template processor and context processor tests. Fixed `contact.phone_number` examples and Test Agent entry point wording. No screenshots. |

## Guides > Build > Knowledge Bases

| Page | Read | UI | Backend/Worker | Images/Seed | Done | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| `build/knowledge/architecture` | [x] | [x] | [x] | [x] | [x] | Validated hierarchy and limits against `KB_LIMITS`, `KnowledgeItemCategory`, crawl models, and crawl API schemas. Fixed Website Crawl coverage, 10 MB file limit, and RAG-limit wording. Screenshot viewed; no loader. |
| `build/knowledge/create-knowledge-bases` | [x] | [x] | [x] | [x] | [x] | Validated editor/table/add-item flow against `KBTreeSidebar`, `KBFolderItemsView`, item forms, upload API, and crawl wizard. Fixed four ingestion methods, labels, file formats, table columns, and assignment flow. Regenerated editor/content-type/upload screenshots. |
| `build/knowledge/assign-knowledge` | [x] | [x] | [x] | [x] | [x] | Validated Agent Editor Knowledge tab against `KnowledgeSettings`, `AgentKBContentPanel`, `AgentKnowledge` flags, and context budget enforcement. Fixed modal name and mode-selection scope. No page screenshots. |
| `build/knowledge/context-vs-rag` | [x] | [x] | [x] | [x] | [x] | Validated Context injection through `construct_prompt` and RAG through voice worker `RAGManager`/Pinecone filter. Fixed unlimited wording, Test Agent entry point, and replaced stale screenshot with Agent Knowledge Expert screenshot. |
| `build/knowledge/content-types` | [x] | [x] | [x] | [x] | [x] | Validated accepted upload types, 10 MB validation, URL processing, vector statuses, and Website Crawl API/UI. Added Website Crawl section and fixed current tab labels. Regenerated content-type/upload screenshots. |
| `build/knowledge/manage-knowledge` | [x] | [x] | [x] | [x] | [x] | Validated row actions/status labels against `ItemTableView`, crawl pages modal, resync/rediscover/update pages mutations, and vector deletion/reindex services. Fixed crawl-source placement and actions. Screenshot now shows selected folder and rows. |

## Guides > Build > Tools & Actions

| Page | Read | UI | Backend/Worker | Images/Seed | Done | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| `build/tools/overview` | [x] | [x] | [x] | [x] | [x] | Validated Add menu against `ActionSettings`, action type constraints, and worker tool registry. Fixed Call End wording and narrowed hold-music testing to agent transfers. No page screenshots. |
| `build/tools/call-control` | [x] | [x] | [x] | [x] | [x] | Validated transfer setup and Call End against `TransferDialog`, `CallFlowTab`, `allow_auto_hangup`, and worker `end_conversation`. Removed legacy demo END action and regenerated transfer screenshots. |
| `build/tools/transfer-patterns` | [x] | [x] | [x] | [x] | [x] | Validated transfer types against frontend transfer dialog and worker transfer handler. Fixed caller-audio wording so music/ring behavior is limited to agent transfers. No screenshots. |
| `build/tools/transfer-details` | [x] | [x] | [x] | [x] | [x] | Validated agent/phone/SIP transfer fields, active-phone-call limits, history handoff, and multi-destination worker behavior. Regenerated transfer destination screenshots after seed cleanup. |
| `build/tools/booking-calendar` | [x] | [x] | [x] | [x] | [x] | Validated Smart Booking dialog, Cal.com integration status, event-type loading, booking worker functions, and booking SMS behavior. Added demo Cal.com event fallback, made action seeding idempotent, and regenerated booking screenshots with no error state. |
| `build/tools/custom-api-actions` | [x] | [x] | [x] | [x] | [x] | Validated Custom Action UI labels, Expert-only tabs, static endpoint URL, secret-backed auth, flat `{{variable}}` templating, SSRF protection, and worker timeout. Regenerated Expert-mode action builder screenshot. |
| `build/tools/web-search` | [x] | [x] | [x] | [x] | [x] | Validated Alpha UI state, singleton tool behavior, Tavily worker handler, 500-character query cap, 25-domain cap, max result range, and billable usage tracking. No screenshots. |
| `build/tools/calculator` | [x] | [x] | [x] | [x] | [x] | Validated Expert-only singleton UI and worker safe-AST evaluator. Fixed docs to list the actual operators, functions, constants, and 200-character expression limit. No screenshots. |
| `build/advanced/mcp-servers` | [x] | [x] | [x] | [x] | [x] | Validated MCP add/manage tools UI, URL/secret/header/query fields, explicit enabled-tool allow list, backend MCP services, and runtime resolution. Regenerated MCP screenshot after seed cleanup. |

## Guides > Build > Conversation Flow

| Page | Read | UI | Backend/Worker | Images/Seed | Done | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| `build/conversation/greeting-messages` | [x] | [x] | [x] | [x] | [x] | Validated `GreetingSettings`, Test Agent popover, prompt-variable rendering, and initial-message runtime config. Fixed `Call Flow` access label, delay range to 0-10s, Test Agent wording, and regenerated Simple/Expert/outbound screenshots. |
| `build/advanced/turn-taking-and-timing` | [x] | [x] | [x] | [x] | [x] | Validated as conceptual cross-link page against current Call Flow timing controls, VAD settings, inactivity settings, and Sounds/Ambient Sound pages. No screenshots. |
| `build/advanced/dynamic-context` | [x] | [x] | [x] | [x] | [x] | Validated `DynamicContextSettings`, saved-before-test behavior, Django `ContextProcessor`, SSRF guard, 30s request timeout, auth modes, headers/body, and top-level variable merge. Fixed Call Flow label, auth wording, response requirements, and test/save guidance. No screenshots. |
| `build/advanced/inactivity-timeout-settings` | [x] | [x] | [x] | [x] | [x] | Validated `InactivitySettings`, model defaults, voice worker `InactivityManager`, metadata timeout cap, and hidden pause tools. Rewrote stale standalone-page docs to match current Max Call Duration/Silence Reminders/Expert Timing UI. Regenerated screenshot; no loader. |
| `build/advanced/vad-turn-detection` | [x] | [x] | [x] | [x] | [x] | Validated `VADSettings`, dashboard-supported sliders, `smart_endpointing`, pipeline interruption fields, and worker VAD fallback. Rewrote stale threshold/prefix/preemptive-generation docs and fixed screenshot script to capture Expert mode with advanced controls. |
| `build/advanced/dtmf-controls` | [x] | [x] | [x] | [x] | [x] | Validated single Alpha `Enable DTMF during calls` toggle against `DTMFSettings` and worker `DTMFManager` send/capture tools. Fixed access label to Call Flow. No page screenshot. |
| `build/advanced/voicemail-handling` | [x] | [x] | [x] | [x] | [x] | Validated Test Agent phone-call AMD selector, campaign Expert settings, campaign `amd_mode` choices, and runtime external AMD participant flag. Fixed default-vs-ML wording and replaced wrong campaign-create AMD screenshot with campaign Settings screenshot. |
| `build/advanced/smart-filler` | [x] | [x] | [x] | [x] | [x] | Validated Expert-only General → Sounds panel, 0-2000ms delay slider, 2000-character prompt, and runtime fallback/secondary-model behavior. Added delay threshold and clarified perceived vs actual latency. No screenshot. |

## Guides > Build > Analytics & Goals

| Page | Read | UI | Backend/Worker | Images/Seed | Done | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| `build/analytics/conversation-goals` | [x] | [x] | [x] | [x] | [x] | Validated unified `AnalyticsTab` Post-Call Analytics table, goal dialog, archive/unarchive behavior, `AgentGoal` unique primary constraint, goal analysis runtime, conversation detail display, and dashboard metrics. Fixed stale separate Goals-section/tab wording and screenshot alt text. |
| `build/analytics/gather-insights` | [x] | [x] | [x] | [x] | [x] | Validated custom/default insight UI, Expert analytics model/language controls, six question types, backend normalization, post-call analysis prompts, and conversation detail result display. Added Data Point, Single Choice, and Multiple Choice docs. No page screenshot. |
| `build/analytics/post-call-automation` | [x] | [x] | [x] | [x] | [x] | Validated Notifications tab, template selection modal, email/team/task form fields, notification schemas, dynamic recipients, `dyn_*` extraction, secure Jinja rendering, and task/team notification runtime. Fixed unsupported `customer_first_name`, dashboard wording, and patched non-email notification runtime to proceed without email recipients. Screenshot viewed; no loader. |

## Guides > Build > Privacy & Compliance

| Page | Read | UI | Backend/Worker | Images/Seed | Done | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| `build/advanced/conversation-privacy-controls` | [x] | [x] | [x] | [x] | [x] | Validated conceptual privacy model against current Privacy tab, Trust Center retention defaults, widget/public trust surfaces, and recording opt-out runtime. No screenshots. |
| `build/advanced/announcements` | [x] | [x] | [x] | [x] | [x] | Validated Alpha Pre-call Announcement UI, upload/delete audio flow, accepted MIME types, 10 MB limit, API upload/delete endpoints, and pre-session audio playback/gating. Fixed stale upload-type/manual-save wording. No page screenshot. |
| `build/advanced/data-retention` | [x] | [x] | [x] | [x] | [x] | Validated Privacy tab retention rows, storage modes, 24-hour/keep-forever options, min-retention guardrails, anonymization support, Trust Center fallback, and retention services/tests. Fixed stale option list and removed unsupported plan-gating claim. Screenshot viewed; no loader. |
| `build/advanced/recording-opt-out` | [x] | [x] | [x] | [x] | [x] | Validated Caller Rights visibility, `allow_caller_recording_opt_out`, worker tool registration, `stop_and_delete_recording`, recording deletion request API, and runtime persistence suppression. Fixed transcript-deletion wording to clarify audio-only behavior. No page screenshot. |

## Guides > Test

| Page | Read | UI | Backend/Worker | Images/Seed | Done | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| `test/overview` | [x] | [x] | [x] | [x] | [x] | Validated test progression against `TestAgentPopover`, call-session store, call room creation, phone test endpoint, and conversation review tabs. Fixed UI label capitalization. No screenshots. |
| `test/web-simulator` | [x] | [x] | [x] | [x] | [x] | Validated Chat/Web call controls, popover layout, test-variable save-on-blur behavior, Dynamic Context test context, and single active session enforcement. Fixed stale right-side panel and Save Changes wording. No screenshots. |
| `test/phone-testing` | [x] | [x] | [x] | [x] | [x] | Validated Phone call test mode against From number/To number fields, E.164 validation, Text-based vs ML-based AMD selector, `makeCall` payload, and backend dialer test-call path. No screenshots. |
| `test/test-scenarios` | [x] | [x] | [x] | [x] | [x] | Validated scenario checklist against current Test Agent modes, conversation detail knowledge retrieval icon, Analytics tab, tool timeline, and voice interruption/silence/runtime behaviors. Fixed stale Analysis tab wording. No screenshots. |
| `test/edge-cases` | [x] | [x] | [x] | [x] | [x] | Validated edge-case guidance against VAD settings, inactivity manager, DTMF controls, voicemail handling, goal/insight post-call tasks, and Quality Studio links. No docs drift found. No screenshots. |
| `test/integration-testing` | [x] | [x] | [x] | [x] | [x] | Validated KB status/retrieval modal, transfer/booking/custom API runtime, account webhooks, and Notifications automation scope. Fixed stale post-call webhook-automation wording. No screenshots. |
| `test/debugging` | [x] | [x] | [x] | [x] | [x] | Validated debugging surfaces against Test Agent popover, Conversations detail tabs/timeline, General → Understanding/Speaking sections, tool details, and knowledge retrieval modal. Fixed panel and section-path wording. No screenshots. |

## Guides > Deploy

| Page | Read | UI | Backend/Worker | Images/Seed | Done | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| `launch/overview` | [x] | [x] | [x] | [x] | [x] | Validated launch paths against current sidebar and deployment surfaces: Telephony, Campaigns, Web Widgets, Schedules, and production troubleshooting. No screenshots. |
| `launch/production-checklist` | [x] | [x] | [x] | [x] | [x] | Validated checklist against agent editor, KB processing/vector status split, tools, Notifications tab, phone routing, widget editor, campaign settings, and Quality Studio. Fixed KB status and campaign phone/AMD wording. No screenshots. |
| `launch/campaign-outbound-launch` | [x] | [x] | [x] | [x] | [x] | Validated create modal, campaign settings, Add Contacts tabs, analytics question types, AMD mode choices, inbound callback matching, and campaign service defaults. Fixed stale AMD-in-create, old contact two-panel UI, Live monitor reference, ML label, interval list, and active/paused phone-number constraint. Campaign create screenshot viewed; no loader. |
| `launch/web-widget-deployment` | [x] | [x] | [x] | [x] | [x] | Validated create widget modal, editor tabs, Export tab platform guides, allowed domains, public Trust Center toggle, widget preview, and widget API fields. Fixed duplicate/wrong widget preview screenshot capture path and caption; regenerated `widget__web-call-widget`. |
| `launch/web-widget-implementation` | [x] | [x] | [x] | [x] | [x] | Validated staging/production guidance against widget domain restrictions, immediate saved-config behavior, preview/runtime requirements, and public widget/trust-center routes. No docs drift found. No page screenshots. |
| `launch/schedules` | [x] | [x] | [x] | [x] | [x] | Validated Schedules list/editor/create defaults, duplicate/delete actions, weekly time slots, override dialog labels, and `/v1/business-hours/` API. Fixed override label wording and screenshot script to open the Add override dialog; regenerated date screenshot. |
| `launch/outbound-compliance` | [x] | [x] | [x] | [x] | [x] | Product-control validation only: checked Schedules, campaign Business Hours, and Local legal compliance window surfaces. Added exact campaign control name. Legal/regulatory statements remain general guidance with the page's legal-advice warning. No screenshots. |
| `launch/troubleshooting-deployment` | [x] | [x] | [x] | [x] | [x] | Validated troubleshooting paths against Telephony routing, agent active/inactive state, AI Model settings, conversation detail, VAD labels, KB statuses, tools timeline, campaign status, and AMD docs. Fixed stale KB "Ready" status wording. No screenshots. |

## Guides > Deploy > Phone Numbers

| Page | Read | UI | Backend/Worker | Images/Seed | Done | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| `launch/phone-numbers` | [x] | [x] | [x] | [x] | [x] | Validated list columns, Add Number paths, inline SIP/routing controls, forwarded-from field, and phone-number CRUD services. Fixed managed-vs-BYOC SIP trunk wording and patched create/import so forwarded-from is saved at creation. Screenshot viewed; no loader. |
| `launch/buy-numbers` | [x] | [x] | [x] | [x] | [x] | Validated marketplace against DACH country allow-list, multi-select number types, compliance-profile gate, 50-result search, Stripe checkout modal, and number-marketplace APIs. Fixed broader-country and capabilities-column wording. Screenshot viewed; no loader. |
| `launch/sip-trunks` | [x] | [x] | [x] | [x] | [x] | Validated SIP trunk list/dialog against inbound/outbound tabs, inbound URI, allowed IPs, secret-backed auth, delete blocking for linked numbers, and SIP trunk CRUD services. Fixed inbound URI/delete behavior wording. Screenshot viewed; no loader. |
| `launch/sip-providers` | [x] | [x] | [x] | [x] | [x] | Validated provider index links against existing provider pages and shared SIP trunk/import-number flow. No screenshots. |
| `phone-numbers/regulatory-bundles` | [x] | [x] | [x] | [x] | [x] | Validated Compliance Profiles list/wizard against DACH country allow-list, profile columns, delete statuses, profile detail, document upload, and compliance APIs. Fixed country scope, list columns, deletion rules, and post-approval navigation. No screenshots. |

## Guides > Deploy > Phone Numbers > Provider Guides

| Page | Read | UI | Backend/Worker | Images/Seed | Done | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| `launch/sip-providers/twilio` | [x] | [x] | [x] | [x] | [x] | Validated product-side steps against SIP trunk create/import-number flow and current routing fields. External Twilio console labels not re-browsed in this product-surface pass. No screenshots. |
| `launch/sip-providers/telnyx` | [x] | [x] | [x] | [x] | [x] | Validated product-side steps against SIP trunk create/import-number flow and current routing fields. External Telnyx portal labels not re-browsed in this product-surface pass. No screenshots. |
| `launch/sip-providers/3cx` | [x] | [x] | [x] | [x] | [x] | Validated product-side steps against SIP trunk create/import-number flow and current routing fields. External 3CX admin labels not re-browsed in this product-surface pass. No screenshots. |
| `launch/sip-providers/sipgate` | [x] | [x] | [x] | [x] | [x] | Validated product-side steps against SIP trunk create/import-number flow and current routing fields. External Sipgate portal labels not re-browsed in this product-surface pass. No screenshots. |
| `launch/sip-providers/easybell` | [x] | [x] | [x] | [x] | [x] | Validated product-side steps against SIP trunk create/import-number flow and current routing fields. External Easybell portal labels not re-browsed in this product-surface pass. No screenshots. |
| `launch/sip-providers/fritzbox` | [x] | [x] | [x] | [x] | [x] | Validated product-side steps against SIP trunk create/import-number flow and current routing fields. External Fritzbox UI labels not re-browsed in this product-surface pass. No screenshots. |
| `launch/sip-providers/nfon` | [x] | [x] | [x] | [x] | [x] | Validated product-side steps against SIP trunk create/import-number flow and current routing fields. External NFON portal labels not re-browsed in this product-surface pass. No screenshots. |
| `launch/sip-providers/placetel` | [x] | [x] | [x] | [x] | [x] | Validated product-side steps against SIP trunk create/import-number flow and current routing fields. External Placetel portal labels not re-browsed in this product-surface pass. No screenshots. |
| `launch/sip-providers/starface` | [x] | [x] | [x] | [x] | [x] | Validated product-side steps against SIP trunk create/import-number flow and current routing fields. External Starface admin labels not re-browsed in this product-surface pass. No screenshots. |
| `launch/sip-providers/fonial` | [x] | [x] | [x] | [x] | [x] | Validated product-side steps against SIP trunk create/import-number flow and current routing fields. External Fonial portal labels not re-browsed in this product-surface pass. No screenshots. |

## Guides > Manage

| Page | Read | UI | Backend/Worker | Images/Seed | Done | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| `manage/overview` | [x] | [x] | [x] | [x] | [x] | Validated operational IA links against current dashboard, conversations, notifications, tasks, campaigns, contacts, Quality Studio, Trust Center, widget, and agency docs/routes. Tightened wording so cross-surface operations pages are not implied to all be in one sidebar group. No screenshots. |
| `manage/dashboard` | [x] | [x] | [x] | [x] | [x] | Validated dashboard route, date picker, customize mode, widget picker, 12 active backend widget templates, and default dashboard widget set. Seeded one TEST conversation so onboarding no longer covers screenshots; regenerated default/customize dashboard images with no loader. |
| `manage/notifications` | [x] | [x] | [x] | [x] | [x] | Validated Notifications sidebar page, unread/total counts, row expansion, Mark all as read, read/unread/delete actions, optional View details link, and notification inbox APIs. Removed stale bell-panel, Slack, push, and preferences coverage from this page. Screenshot viewed; no loader. |

## Guides > Manage > Conversations

| Page | Read | UI | Backend/Worker | Images/Seed | Done | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| `manage/conversations/overview` | [x] | [x] | [x] | [x] | [x] | Validated list route, toolbar, filter dialog, table columns, row actions, bulk delete, export formats/history, transcript search, and conversation list API filters/export task. Added Answer column docs, fixed Phone channel wording, narrowed status values, and documented that transcript search is not included in exports. List/filter screenshots viewed; no loader. |
| `manage/conversations/detail` | [x] | [x] | [x] | [x] | [x] | Validated detail route, prev/next header, action menu, Flag Issue flow, two-column layout, Overview/Analytics/Notifications/Config tabs, timeline ordering, recording URL resolution, soft delete, post-call results, goals, notification logs, and worker message/event persistence. Wired the notification Details button, fixed docs for tab layout/header actions/soft delete, seeded playable local recording audio, corrected demo transcript event timing, and regenerated detail/recording/timeline screenshots. |

## Guides > Manage > Tasks

| Page | Read | UI | Backend/Worker | Images/Seed | Done | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| `manage/tasks/overview` | [x] | [x] | [x] | [x] | [x] | Validated task routes, default Kanban redirect, create modal, detail sidebar shortcuts, status/priority/assignee fields, activity/comments/attachments, subtasks, task permissions, and task CRUD/subtask APIs. Fixed subtask create schema/service so visible status/due-date fields persist, clarified attachment wording, made task seed assignments idempotent, and regenerated Kanban screenshot with assignee avatars. |
| `manage/tasks/views` | [x] | [x] | [x] | [x] | [x] | Validated shared toolbar, Board/List/Calendar render modes, drag-and-drop status/date updates, view selector, search/assignee filters, and calendar scheduled-vs-due events. Fixed route-level view selection so `/tasks/list` and `/tasks/calendar` do not render the persisted board view, then added/regenerated list and calendar screenshots with no loaders. |

## Guides > Manage > Contacts

| Page | Read | UI | Backend/Worker | Images/Seed | Done | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| `manage/contacts/overview` | [x] | [x] | [x] | [x] | [x] | Validated Contacts list route, toolbar search/filter/sort, table columns, row actions, detail tabs, inline detail autosave, permissions, contact list/search/order/filter API, and bulk/delete-all job behavior. Fixed docs to remove tag search and stale conversation-count sorting, refreshed list/create/import screenshots, and confirmed no loaders. |
| `manage/contacts/import-export` | [x] | [x] | [x] | [x] | [x] | Validated CSV import dialog, preview validation, supported headers/aliases, 50k row limit, async job creation, duplicate update-by-phone behavior, tags, import history, and error CSV download path. Fixed frontend CSV limit from 10 MB to Django's 5 MB limit, removed stale column-mapping docs, and updated screenshot automation for current Add Contacts labels. |

## Guides > Manage > Campaigns

| Page | Read | UI | Backend/Worker | Images/Seed | Done | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| `manage/campaigns/overview` | [x] | [x] | [x] | [x] | [x] | Validated campaign list, create modal, status transitions, detail tabs, settings/phone-number rotation controls, contacts table, add contacts modal, campaign CSV import, export, goals, analyses, campaign CRUD API, contact endpoints, and dialer-facing campaign fields. Fixed docs from six tabs to four, moved AMD/rotation from create flow to settings, documented single-number creation plus later rotation setup, and patched create-modal filtering so additional rotation numbers from active/paused campaigns are not reused. Regenerated list/create/contacts/analytics screenshots and checked light/dark variants. |
| `manage/campaigns/analytics` | [x] | [x] | [x] | [x] | [x] | Validated Dashboard/Contacts/Analytics tab responsibilities, stats endpoints, campaign contacts filters/export, goals/analyses APIs, and supported insight question types. Updated docs to include Single Choice, Multiple Choice, Data Point, and Rating alongside Yes/No and Open; analytics screenshots show live seeded goals/insights with no loaders. |

## Guides > Manage > Web Widgets

| Page | Read | UI | Backend/Worker | Images/Seed | Done | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| `manage/web-widgets/overview` | [x] | [x] | [x] | [x] | [x] | Validated widget list, create modal, edit navigation, duplicate/delete actions, list columns, widget CRUD API, widget CORS/public config paths, and seeded widget rows. Regenerated list/create/editor screenshots and confirmed no loaders or stale placeholder states. |
| `manage/web-widgets/configuration` | [x] | [x] | [x] | [x] | [x] | Validated all eight editor tabs against `WidgetConfigurator`, per-tab components, widget action CRUD, export code generator, and widget model/config fields. Removed stale Setup status toggle, corrected tab order and embed snippet shape, expanded Actions documentation to cover auto-click, await response, timeout, end-call, trigger, and enabled controls. Added seeded widget actions so the Actions screenshot shows real action rows, regenerated setup/appearance/content/features/actions/privacy/export/web-call images, and checked light/dark variants. |
| `manage/web-widgets/share-links` | [x] | [x] | [x] | [x] | [x] | Validated share-link docs against `ShareTab`, `WidgetShareSettings`, widget share schemas, public share/trust endpoints, token validation tests, limits, revocation, and demo counters. Existing docs align with current create/manage/copy/revoke/reset-password flow; screenshots are covered by the editor/export/widget batches. |

## Guides > Manage > Quality Studio

| Page | Read | UI | Backend/Worker | Images/Seed | Done | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| `manage/quality-studio/overview` | [x] | [x] | [x] | [x] | [x] | Validated dashboard route, toolbar, issue stats API, insights generation API/task path, seeded `QualityInsight`, trend/breakdown/agent-health panels, and screenshot output. Updated docs from stale top metric cards to the current Issue Trends, Issues Breakdown, AI Insights, and Agent Health layout. Added dashboard screenshot capture and checked light/dark images. |
| `manage/quality-studio/issues` | [x] | [x] | [x] | [x] | [x] | Validated issues board/list UI, header search, assignee chips, create modal, flagged-conversation AI creation modal, detail view, comments, linked issues, keyboard menus, AI resolution stream, issue CRUD APIs, stats, comments, link/unlink, bulk delete service, and seed issues/comments. Removed stale docs for status/severity/tag/agent filter bar, favorites, expected behavior in manual create, inline title editing, and unreachable bulk action UI. Fixed a detail-page null `createdBy` crash that was captured in screenshots, regenerated board/detail images, and confirmed no error/loading states remain. |

## Guides > Manage > Trust Center

| Page | Read | UI | Backend/Worker | Images/Seed | Done | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| `manage/trust-center/overview` | [x] | [x] | [x] | [x] | [x] | Updated docs to match the current rendered Trust Center toolbar: Data Retention, Data Requests, and Public Trust Center. Removed stale extra-tab references from the overview. |

## Guides > Examples

| Page | Read | UI | Backend/Worker | Images/Seed | Done | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| `examples/receptionist` | [x] | [x] | [x] | [x] | [x] | Validated example flow against Prompt/Tools/Knowledge/Analytics/Call Flow tabs, transfer tool setup, KB attachment, goals/insights, Test Agent modes, Conversations, Quality Studio, and dashboard surfaces. No screenshots. |
| `examples/appointment-booking` | [x] | [x] | [x] | [x] | [x] | Validated against Smart Booking dialog, Cal.com integration page, booking worker contact/email/SMS handling, and booking test guidance. Fixed stale Days-to-look-ahead and Time-slots labels/ranges. No screenshots. |
| `examples/lead-qualification` | [x] | [x] | [x] | [x] | [x] | Validated agent creation, transfer/custom action tooling, KB usage, goal/insight types, notification variables, task creation, phone routing, campaign reuse, and campaign launch path. No screenshots. |
| `examples/customer-support` | [x] | [x] | [x] | [x] | [x] | Validated support example against KB folders/items, transfer destinations, post-call notifications, task creation, Quality Studio, and conversation review. No screenshots. |
| `examples/outbound-campaign` | [x] | [x] | [x] | [x] | [x] | Validated contact import, campaign create modal, campaign Settings tab, AMD mode choices, contacts add flow, campaign analytics, status transitions, and dashboard monitoring. Moved AMD recommendation from create-step table to Settings. No screenshots. |

## Guides > Troubleshooting

| Page | Read | UI | Backend/Worker | Images/Seed | Done | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| `troubleshooting/common-issues` | [x] | [x] | [x] | [x] | [x] | Validated quick-diagnosis links against current Prompt, VAD, transfer, booking, campaign, Conversations, webhook, billing, and team-management surfaces. Replaced stale generic campaign-log wording with Campaign Contacts and linked conversation detail. No screenshots. |
| `troubleshooting/call-quality` | [x] | [x] | [x] | [x] | [x] | Validated latency, VAD, interruptions, Thinking Sounds, Smart Filler, Response Style, transcriber, and inactivity guidance against current agent editor sections and runtime timing controls. No screenshots. |
| `troubleshooting/knowledge-issues` | [x] | [x] | [x] | [x] | [x] | Validated processing/vector statuses, reindex action behavior, KB assignment, retrieval timeline, Context/RAG modes, item limits, and backend upload validation. Fixed stale 50 MB upload limit to current 10 MB. No screenshots. |
| `troubleshooting/custom-actions` | [x] | [x] | [x] | [x] | [x] | Validated custom action troubleshooting against Endpoint/Authentication/Parameters/Variables tabs, runtime template substitution, 30s worker timeout, and conversation timeline tool events. No screenshots. |
| `troubleshooting/tools-integrations` | [x] | [x] | [x] | [x] | [x] | Validated transfer, booking, custom API, webhook, secrets, and MCP troubleshooting against current UI and backend/worker surfaces. Fixed timeout guidance so it no longer implies a configurable live-call timeout. No screenshots. |
| `troubleshooting/campaigns` | [x] | [x] | [x] | [x] | [x] | Validated campaign dashboard, spam score column, contact statuses, retry scheduling, AMD modes, settings fields, inbound callback matching, rotation settings, and campaign services. Fixed AMD path to Settings → Call Settings. No screenshots. |

## Guides > Reference

| Page | Read | UI | Backend/Worker | Images/Seed | Done | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| `reference/simple-vs-expert` | [x] | [x] | [x] | [x] | [x] | Validated Simple/Expert availability against current agent editor, campaign settings, conversation export toolbar, DTMF rendering, and screenshot files. Fixed stale Conversation tab naming to Call Flow and corrected greeting delay to 0-10 seconds. |
| `reference/supported-providers` | [x] | [x] | [x] | [x] | [x] | Validated provider families and Providers API paths against `ProviderAPIv1`, model/transcriber catalogs, and voice provider filters (`azure`, `cartesia`, `elevenlabs`). No screenshots. |
| `reference/webhook-events` | [x] | [x] | [x] | [x] | [x] | Validated event registry, trigger payloads, delivery headers, HMAC format, retry count, backoff base, timeout, and SSRF handling against `webhooks.events`, `services`, and `tasks`. Replaced stale `event/timestamp/account_id` examples with the actual `event_id/event_type/created/organization_uuid` envelope. No screenshots. |
| `reference/limits-quotas` | [x] | [x] | [x] | [x] | [x] | Validated throttle classes, file limits, public room limits, webhook throttle, sensitive-operation throttle, and unlimited agent creation. Removed unverifiable SLA/fixed-latency wording. No screenshots. |
| `reference/error-codes` | [x] | [x] | [x] | [x] | [x] | Validated API error schema/classes, conversation status serializer behavior, disconnect reasons, and outbound answer statuses against Django schemas/models. Fixed active conversation status from `in_progress` to `active`. No screenshots. |

## Guides > Workspace Admin

| Page | Read | UI | Backend/Worker | Images/Seed | Done | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| `accounts/overview` | [x] | [x] | [x] | [x] | [x] | Validated account hierarchy, switcher, account-level resources, downward access model, and support-only ownership/hierarchy changes against team/subaccount services and navigation. No stale screenshots. |
| `accounts/operating-model` | [x] | [x] | [x] | [x] | [x] | Validated standard workspace, team-member, subaccount, and agency-access framing against current Team/TeamMember/TeamRelationship model and agency settings UI. No screenshots. |
| `accounts/agency-playbook` | [x] | [x] | [x] | [x] | [x] | Reframed as Client Service Models: parent-billed subaccounts for reseller/API-integrator-style customer isolation, agency access for client-owned accounts, and hybrid setups. No screenshots. |
| `accounts/creating-accounts` | [x] | [x] | [x] | [x] | [x] | Validated account switcher create flow, main-account modal, subaccount modal, plan-limit gating, owner assignment, and support-only account lifecycle. Fixed stale `Sub Accounts` path, always-parent-billed wording, and owner deletion wording. Screenshots checked for loader/permission text. |
| `accounts/subaccounts` | [x] | [x] | [x] | [x] | [x] | Validated subaccount list columns, row navigation, switch action, create permission gate, detail tabs, billing handoff states, limits, permissions, and import tab against frontend routes and team/subaccount APIs. Fixed `agency_admin` RBAC to include `subaccounts.*`; regenerated screenshots and verified no loader/permission state. |
| `accounts/team-management` | [x] | [x] | [x] | [x] | [x] | Validated member list columns, pending invitations, invite/resend/cancel flows, role matrix, agency-access restrictions, owner role restrictions, and invitation acceptance flow against frontend members UI and invitation service. Screenshots checked. |
| `accounts/agency-settings` | [x] | [x] | [x] | [x] | [x] | Validated agency-only page visibility, default member permission matrix, category labels including Call Flow, and agency-admin gating against `TeamSettings`/default-permission surfaces. Screenshot checked. |
| `accounts/account-settings` | [x] | [x] | [x] | [x] | [x] | Validated display-name blur save, account ID copy, logo upload accept list, backend 5 MB image validation, and support-only account deletion. Screenshot checked and placeholder logo issue already resolved by seed assets. |
| `accounts/authentication` | [x] | [x] | [x] | [x] | [x] | Validated signup, login, reset password, email verification, invitation profile completion, MFA login prompt, and password minimum against auth UI/allauth flows. Signup screenshot checked. |
| `accounts/security` | [x] | [x] | [x] | [x] | [x] | Validated Security page sections for email, password, phone, MFA/TOTP recovery codes, active sessions, login activity, connected providers, and profile deletion against profile/auth components and APIs. No screenshots. |
| `accounts/user-profile` | [x] | [x] | [x] | [x] | [x] | Validated profile name/avatar, security-managed email/phone links, profile deletion, and separation from account settings. Updated metadata so it no longer claims notification settings live on the profile page. Screenshot checked. |
| `accounts/user-preferences` | [x] | [x] | [x] | [x] | [x] | Validated theme, Simple/Expert UI mode, language, timezone, date/time, and number-format preferences against `preferences-settings.tsx`. Fixed access path metadata/wording; no screenshot on this page. |

## Guides > Developers & Integrations

| Page | Read | UI | Backend/Worker | Images/Seed | Done | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| `accounts/api-keys` | [x] | [x] | [x] | [x] | [x] | Validated key list, `sk-` prefix, create/edit/revoke/reactivate/delete flows, optional expiration, owner permissions, and no per-key scopes against API key UI/service. Fixed docs and empty-state copy from scope-based wording to account-scoped keys, including current `/v1/accounts/*` examples, SDK method signatures, and `ITELLICOAI_API_KEY`. Screenshot checked. |
| `accounts/integrations` | [x] | [x] | [x] | [x] | [x] | Validated Integrations page cards: Cal.com connect/manage via saved secret and test-before-connect, Twilio/ElevenLabs disabled as Coming Soon, and separate Webhooks/MCP/Secrets paths. No screenshot. |
| `accounts/secrets` | [x] | [x] | [x] | [x] | [x] | Validated Secrets page columns, active/disabled/missing statuses, row expansion with usage references, create/edit/disable/delete behavior, and deletion block for referenced secrets against frontend and `SecretStoreAPIv1`. No screenshot. |
| `accounts/webhooks` | [x] | [x] | [x] | [x] | [x] | Validated webhook subscription list/create/test/delivery surfaces, supported event types, secret handling, delivery attempts, retries, and signing behavior against webhooks UI/services/tasks. No screenshot. |
| `accounts/webhook-implementation` | [x] | [x] | [x] | [x] | [x] | Validated implementation guidance against actual delivery headers, `X-Webhook-Signature-256`, timestamp handling, compact sorted HMAC payload format, retry policy, and event envelope. Fixed stale Flask example. No screenshot. |

## Guides > Billing & Usage

| Page | Read | UI | Backend/Worker | Images/Seed | Done | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| `billing/overview` | [x] | [x] | [x] | [x] | [x] | Validated Billing tabs, parent-billed state, setup-only handoff behavior, Usage permission gating, Manage Billing portal entry, and Pending Extra Charges card against billing route/components and billing APIs. No screenshot. |
| `billing/plans` | [x] | [x] | [x] | [x] | [x] | Validated active public plans against `seed_billing_plans`, public plan API, and Plans UI. Replaced stale Starter/old limit matrix with Free, Pay As You Go, Growth, Professional, Business, Enterprise; removed deprecated feature gates and white-label claims. No screenshot. |
| `billing/usage-pricing` | [x] | [x] | [x] | [x] | [x] | Validated included-minute, overage, usage analytics, date grouping, and extra-charge table behavior against Billing Usage APIs and frontend. Added knowledge-base and web-search charge categories. No screenshot. |
| `billing/premium-features` | [x] | [x] | [x] | [x] | [x] | Validated Pending Extra Charges labels against `ExtraCharges` UI and backend charge breakdown fields. Added Knowledge bases and Web search rows. No screenshot. |
| `billing/phone-numbers` | [x] | [x] | [x] | [x] | [x] | Validated pricing-oriented telephony paths against Buy Number, Phone Numbers, import, SIP trunk mapping, assignment, and delete flows. No screenshot on billing page; telephony screenshots covered in Launch section. |
| `billing/faq` | [x] | [x] | [x] | [x] | [x] | Validated billing answers against Billing route permissions, plan actions, Stripe portal handoff, usage visibility, subaccount billing authority, and extra-charge labels. Added knowledge-base and web-search charges. No screenshot. |

## Guides > Partner Network

| Page | Read | UI | Backend/Worker | Images/Seed | Done | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| `partner-network/partner-program` | [x] | [x] | [x] | [x] | [x] | Validated partner docs against account/subaccount agency surfaces and absence of a self-serve partner console or rebilling flow. Clarified application-based partner terms and replaced platform resale margin with managed service margin. No screenshot. |
| `partner-network/affiliate-program` | [x] | [x] | [x] | [x] | [x] | Validated affiliate content against in-app Affiliate route, Tolt portal links, 20%/18-month/60-day claims in locale/UI copy, signup/checkout Tolt referral capture, and Stripe metadata handling. No screenshot. |

## Guides > Legal

| Page | Read | UI | Backend/Worker | Images/Seed | Done | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| `legal/privacy-policy` | [x] | [x] | [x] | [x] | [x] | Reviewed for product-surface drift against demo, account, Trust Center, privacy, and data-export surfaces. No stale SSO, white-label, warm-transfer, SMS, or agent-versioning claims found. Legal/company facts still require counsel review. No screenshot. |
| `legal/terms-and-conditions` | [x] | [x] | [x] | [x] | [x] | Reviewed platform/admin terminology against current app surfaces. Replaced stale Admin Portal, consent-management, overage-toggle, and AI-training-control language with current platform, Trust Center, retention, data export, and DPA-governed wording. No screenshot. |
| `legal/dpa` | [x] | [x] | [x] | [x] | [x] | Reviewed DPA processing categories, retention, sub-processor, trust-center, and TOM references against current Trust Center, retention policy, data export, and provider surfaces. No product-feature drift found; legal text still needs counsel review. No screenshot. |
| `legal/service-level-agreement` | [x] | [x] | [x] | [x] | [x] | Reviewed SLA page against current plan packaging and legal terms. Updated metadata so SLA is clearly Enterprise-only under separate written agreement, not a standard in-app guarantee. No screenshot. |
| `legal/imprint` | [x] | [x] | [x] | [x] | [x] | Reviewed company/contact page for product-feature drift and links to legal pages. No app/backend dependency beyond contact/legal routing. No screenshot. |

## API reference > Getting started

| Page | Read | UI | Backend/Worker | Images/Seed | Done | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| `api-reference/introduction` | [x] | [x] | [x] | [x] | [x] | Validated public API overview against `api/v1/urls.py`, account-scoped controllers, API key auth, calls/conversations endpoints, and published SDK package methods. Fixed stale unscoped agent/conversation/call examples and current SDK imports. No screenshots. |

## SDKs > Overview

| Page | Read | UI | Backend/Worker | Images/Seed | Done | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| `api-reference/sdks` | [x] | [x] | [x] | [x] | [x] | Validated SDK overview against published `itellicoai@1.0.0` and PyPI `itellicoai 1.0.0` packages plus generated Django OpenAPI route shapes. Fixed TypeScript default import, account-scoped create/list calls, snake_case payload fields, and required agent provider blocks. Screenshot reuses API Keys image already checked. |

## SDKs > Server SDKs

| Page | Read | UI | Backend/Worker | Images/Seed | Done | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| `api-reference/python-sdk` | [x] | [x] | [x] | [x] | [x] | Validated against downloaded PyPI wheel metadata and resource modules: Python 3.9+, `Itellicoai`/`AsyncItellicoai`, `accounts.retrieve_current`, account-scoped agent methods, module-level error classes, and `ITELLICOAI_API_KEY`. Screenshot reuses API Keys image already checked. |
| `api-reference/typescript-sdk` | [x] | [x] | [x] | [x] | [x] | Validated against downloaded npm tarball declarations: default `Itellicoai` export, account-scoped resource methods, parameter order for agents/subaccounts/phone numbers/SIP trunks, provider voice filter, types namespace, and `ITELLICOAI_API_KEY`. Screenshot reuses API Keys image already checked. |

## MCP

| Page | Read | UI | Backend/Worker | Images/Seed | Done | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| `mcp-docs/overview` | [x] | [x] | [x] | [x] | [x] | Validated as the hosted documentation MCP surface, separate from product custom MCP servers already checked under `/build/advanced/mcp-servers`. Fixed the hosted docs MCP URL to include `https://`. No screenshots. |

## Changelog

| Page | Read | UI | Backend/Worker | Images/Seed | Done | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| `changelog` | [x] | [x] | [x] | [x] | [x] | Validated release-note feature summaries against current dashboard, wizard, tasks, contacts, campaigns, Quality Studio, Trust Center, widget, notifications, security, integrations, tools, voice cloning, and MCP docs/code. Removed stale push-notification/preferences, CSV/Excel column-mapping, and configurable-MCP-timeout claims. No screenshots. |

## Final Verification

Completed on 2026-04-21.

- `jq '[.. | objects | .pages? // empty | .[]? | strings] | length' documentation/docs.json` returned `159`.
- `rg -n "\[ \]" documentation/product-surface-validation-log.md` returned no unchecked rows.
- `node scripts/audit-en-docs.mjs --json` audited 159 pages with `0` missing pages, `0` broken links, `0` broken anchors, and `0` stale-pattern hits.
- `node scripts/audit-screenshot-coverage.mjs --json` found 107 docs-referenced image bases, 107 script-managed image bases, `0` missing image files, `0` docs refs not covered by scripts, and `0` unused image files.
- Targeted stale-claim scans found no remaining docs hits for unsupported SSO, white-label, warm transfer, agent versioning, stale SDK package names/imports, old API env vars, old unscoped public API paths, notification preferences, browser push notifications, CSV/Excel column mapping, or configurable MCP timeouts.
- `python3 -m py_compile backend/django_app/teams/permissions_catalogue.py backend/django_app/core/management/commands/seed_demo_workspace.py` passed.
