# German Translation Quality Audit — `de/` Documentation

**Date:** 2026-04-21
**Scope:** All 138 .mdx files under `documentation/de/`
**Checklist:**
1. Du-Form — no Sie/Ihr/Ihnen (hard fail)
2. Umlaute korrekt — no ASCII substitutions like ae/oe/ue/ss for ä/ö/ü/ß (hard fail)
3. Natürlicher Sprachfluss
4. Deutsche Terminologie
5. Konsistente Begriffe
6. Keine englischen Satzmuster

**Summary:** 21 files FAIL (all on checklist item 2 — umlaut ASCII substitutions). 0 files fail on item 1 (Sie/Ihr/Ihnen). 117 files PASS.

---

## accounts/account-settings.mdx

PASS — Du-form throughout. Umlauts correct. Natural German flow. Terminology consistent.

---

## accounts/agency-playbook.mdx

PASS — Du-form throughout. Umlauts correct. Well-structured German prose.

---

## accounts/agency-settings.mdx

PASS — Du-form throughout. Umlauts correct. Clean terminology.

---

## accounts/api-keys.mdx

PASS — Du-form throughout. Umlauts correct.

---

## accounts/authentication.mdx

PASS — Du-form throughout. Umlauts correct.

---

## accounts/creating-accounts.mdx

PASS — Du-form throughout. Umlauts correct.

---

## accounts/integrations.mdx

PASS — Du-form throughout. Umlauts correct.

---

## accounts/operating-model.mdx

PASS — Du-form throughout. Umlauts correct. Natural German. Well-written.

---

## accounts/overview.mdx

PASS — Du-form throughout. Umlauts correct.

---

## accounts/secrets.mdx

PASS — Du-form throughout. Umlauts correct.

---

## accounts/security.mdx

PASS — Du-form throughout. Minimal body; umlauts correct in what is present.

---

## accounts/subaccounts.mdx

PASS — Du-form throughout. Umlauts correct.

---

## accounts/team-management.mdx

PASS — Du-form throughout. Umlauts correct.

---

## accounts/user-profile.mdx

PASS — Du-form throughout. Umlauts correct.

---

## accounts/webhook-implementation.mdx

PASS — Du-form throughout. Umlauts correct.

---

## accounts/webhooks.mdx

PASS — Du-form throughout. Minimal body; umlauts correct.

---

## api-reference/introduction.mdx

PASS — Du-form throughout. Umlauts correct.

---

## api-reference/python-sdk.mdx

PASS — Du-form throughout. Umlauts correct.

---

## api-reference/sdks.mdx

PASS — Du-form throughout. Umlauts correct.

---

## api-reference/typescript-sdk.mdx

PASS — Du-form throughout. Umlauts correct.

---

## billing/faq.mdx

PASS — Du-form throughout. Umlauts correct.

---

## billing/overview.mdx

PASS — Du-form throughout. Umlauts correct.

---

## billing/phone-numbers.mdx

PASS — Du-form throughout. Umlauts correct.

---

## billing/plans.mdx

PASS — Du-form throughout. Umlauts correct.

---

## billing/premium-features.mdx

PASS — Du-form throughout. Umlauts correct.

---

## build/advanced/announcements.mdx

**FAIL — Item 2: ASCII umlaut substitutions**

Examples (in the German example text block, lines ~136–138):
- `"gefuehrt"` → should be `"geführt"`
- `"Qualitaetszwecken"` → should be `"Qualitätszwecken"`

---

## build/advanced/conversation-privacy-controls.mdx

PASS — Du-form throughout. Umlauts correct.

---

## build/advanced/data-retention.mdx

PASS — Du-form throughout. Umlauts correct.

---

## build/advanced/dtmf-controls.mdx

PASS — Du-form throughout. Umlauts correct.

---

## build/advanced/dynamic-context.mdx

PASS — Du-form throughout. Umlauts correct.

---

## build/advanced/inactivity-timeout-settings.mdx

PASS — Du-form throughout. Umlauts correct.

---

## build/advanced/mcp-servers.mdx

**FAIL — Item 2: Pervasive ASCII umlaut substitutions**

Examples:
- `"Faehigkeiten"` → `"Fähigkeiten"`
- `"Waehrend des Gespraechs"` → `"Während des Gesprächs"`
- `"fuegst"` → `"fügst"`
- `"oeffnen"` → `"öffnen"`
- `"aendern"` → `"ändern"`
- `"auswaehlen"` → `"auswählen"`
- `"ausfuehren"` → `"ausführen"`
- `"noetig"` → `"nötig"`
- `"Aenderungen"` → `"Änderungen"`

---

## build/advanced/recording-opt-out.mdx

PASS — Du-form throughout. Umlauts correct.

---

## build/advanced/smart-filler.mdx

PASS — Du-form throughout. Umlauts correct.

---

## build/advanced/turn-taking-and-timing.mdx

PASS — Du-form throughout. Umlauts correct.

---

## build/advanced/vad-turn-detection.mdx

PASS — Du-form throughout. Umlauts correct.

---

## build/advanced/voicemail-handling.mdx

PASS — Du-form throughout. Umlauts correct.

---

## build/analytics/conversation-goals.mdx

PASS — Du-form throughout. Umlauts correct.

---

## build/analytics/gather-insights.mdx

PASS — Du-form throughout. Umlauts correct.

---

## build/analytics/overview.mdx

PASS — Du-form throughout. Umlauts correct. Natural German flow throughout.

---

## build/analytics/post-call-automation.mdx

PASS — Du-form throughout. Umlauts correct.

---

## build/basic-config/agent-identity.mdx

PASS — Du-form throughout. Umlauts correct.

---

## build/conversation/greeting-messages.mdx

**FAIL — Item 2: Pervasive ASCII umlaut substitutions**

Examples:
- `"Begruessungen"` → `"Begrüßungen"`
- `"fuer"` → `"für"`
- `"hoeren"` → `"hören"`
- `"Waehle"` → `"Wähle"`
- `"natuerliches"` → `"natürliches"`
- `"Einfuehrung"` → `"Einführung"`
- `"haeufig"` → `"häufig"`
- `"koennen"` → `"können"`
- `"Aeusserungen"` → `"Äußerungen"`
- `"enthaelt"` → `"enthält"`
- `"Ueberschreibungen"` → `"Überschreibungen"`

---

## build/conversation/prompt-engineering-guide.mdx

**FAIL — Item 2: Pervasive ASCII umlaut substitutions**

Examples:
- `"Personlichkeit"` → `"Persönlichkeit"`
- `"Gespraeche"` → `"Gespräche"`
- `"hoeren"` → `"hören"`
- `"laeuft"` → `"läuft"`
- `"muessen"` → `"müssen"`
- `"Einwaende"` → `"Einwände"`
- `"koennen"` → `"können"`
- `"naechste"` → `"nächste"`
- `"moechte"` → `"möchte"`
- `"spaeter"` → `"später"`
- `"haeufige"` → `"häufige"`

---

## build/conversation/prompt-templates.mdx

**FAIL — Item 2: Pervasive ASCII umlaut substitutions**

Examples:
- `"enthaelt"` → `"enthält"`
- `"geschuetzt"` → `"geschützt"`
- `"Fuer"` → `"Für"`
- `"naechste"` → `"nächste"`
- `"Oeffnungszeiten"` → `"Öffnungszeiten"`
- `"Verfuegbarkeit"` → `"Verfügbarkeit"`
- `"Vorlaeufige"` → `"Vorläufige"`
- `"oeffnen"` → `"öffnen"`
- `"Personlichkeit"` → `"Persönlichkeit"`
- `"Naechste"` → `"Nächste"`

---

## build/conversation/prompt.mdx

**FAIL — Item 2: Multiple ASCII umlaut substitutions**

Examples:
- `"Zaehler"` → `"Zähler"`
- `"vergroessere"` → `"vergrößere"`
- `"einfuegt"` → `"einfügt"`
- `"oeffnet"` → `"öffnet"`
- `"bewaehrte"` → `"bewährte"`
- `"Anwendungsfaelle"` → `"Anwendungsfälle"`
- `"eingefuegt"` → `"eingefügt"`
- `"erklaeren"` → `"erklären"`
- `"Gespraeche"` → `"Gespräche"`

---

## build/conversation/runtime-data-flow.mdx

**FAIL — Item 2: Several ASCII umlaut substitutions**

Examples:
- `"Gewuenschtes"` → `"Gewünschtes"`
- `"heisst"` → `"heißt"`
- `"Einschraenkung"` → `"Einschränkung"`
- `"nuetzlich"` → `"nützlich"`
- `"Gespraeche"` → `"Gespräche"`

---

## build/conversation/template-syntax.mdx

**FAIL — Item 2: Some ASCII umlaut substitutions**

Examples:
- `"Grossbuchstaben"` → `"Großbuchstaben"`
- `"Laenge"` → `"Länge"`
- `"zurueckgibst"` → `"zurückgibst"`
- `"verfuegbar"` → `"verfügbar"`

---

## build/conversation/variable-sources.mdx

**FAIL — Item 2: Minor ASCII umlaut substitutions**

Examples:
- `"erhaelt"` → `"erhält"`
- `"Gespraechsfelder"` → `"Gesprächsfelder"`

---

## build/getting-started/agent-editor.mdx

PASS — Du-form throughout. Umlauts correct.

---

## build/getting-started/create-first-agent.mdx

PASS — Du-form throughout. Umlauts correct.

---

## build/getting-started/share-agent-demo-links.mdx

PASS — Du-form throughout. Umlauts correct.

---

## build/knowledge/architecture.mdx

**FAIL — Item 2: Multiple ASCII umlaut substitutions**

Examples:
- `"erklaert"` → `"erklärt"`
- `"buendelt"` → `"bündelt"`
- `"grosse"` → `"große"`
- `"koennen"` → `"können"`
- `"erklaeren"` → `"erklären"`
- `"Ruecksendeprozess"` → `"Rücksendeprozess"`
- `"Loeschsymbol"` → `"Löschsymbol"`
- `"ueberall"` → `"überall"`

---

## build/knowledge/assign-knowledge.mdx

**FAIL — Item 2: Several ASCII umlaut substitutions**

Examples:
- `"oeffnest"` → `"öffnest"`
- `"auszuwahlen"` → `"auszuwählen"`
- `"uebersteigt"` → `"übersteigt"`
- `"auswaehlst"` → `"auswählst"`

---

## build/knowledge/content-types.mdx

**FAIL — Item 2: Minor ASCII umlaut substitutions**

Examples:
- `"ueberfluessige"` → `"überflüssige"`
- `"Groesse"` → `"Größe"`
- `"fehlschlaegt"` → `"fehlschlägt"`

---

## build/knowledge/context-vs-rag.mdx

**FAIL — Item 2: Multiple ASCII umlaut substitutions**

Examples:
- `"grosse"` → `"große"`
- `"Groessere"` → `"Größere"`
- `"Suchverzoegerung"` → `"Suchverzögerung"`
- `"hoeheren"` → `"höheren"`
- `"abhaengig"` → `"abhängig"`
- `"gewaehlt"` → `"gewählt"`
- `"haengt"` → `"hängt"`
- `"unvollstaendige"` → `"unvollständige"`
- `"widerspruechliche"` → `"widersprüchliche"`
- `"aufgeloest"` → `"aufgelöst"`

---

## build/knowledge/create-knowledge-bases.mdx

**FAIL — Item 2: Pervasive ASCII umlaut substitutions**

Examples:
- `"Fuellen"` → `"Füllen"`
- `"Ueberwachen"` → `"Überwachen"`
- `"Navigationsmenue"` → `"Navigationsmenü"`
- `"Hauptmenue"` → `"Hauptmenü"`
- `"auswaehlen"` → `"auswählen"`
- `"Dokumentzaehler"` → `"Dokumentzähler"`
- `"Fuege"` → `"Füge"`
- `"ausfuehren"` → `"ausführen"`
- `"verknuepfe"` → `"verknüpfe"`
- `"Inhaltsqualitaet"` → `"Inhaltsqualität"`

---

## build/tools/booking-calendar.mdx

**FAIL — Item 2: Multiple ASCII umlaut substitutions**

Examples:
- `"KI-gestuetzte"` → `"KI-gestützte"`
- `"Verfuegbarkeiten"` → `"Verfügbarkeiten"`
- `"bestaetigen"` → `"bestätigen"`
- `"Bestaetigungen"` → `"Bestätigungen"`
- `"Verfuegbarkeitsfenster"` → `"Verfügbarkeitsfenster"`
- `"Koennen"` → `"Können"`
- `"Personenliche"` → `"Persönliche"` (also a typo)
- `"Komplexitaet"` → `"Komplexität"`
- `"zukuenftige"` → `"zukünftige"`

---

## build/tools/calculator.mdx

**FAIL — Item 2: Multiple ASCII umlaut substitutions**

Examples:
- `"Menuepunkt"` → `"Menüpunkt"`
- `"loeschen"` → `"löschen"`
- `"zusaetzlichen"` → `"zusätzlichen"`
- `"Ausdruecke"` → `"Ausdrücke"`
- `"unterstuetzen"` → `"unterstützen"`
- `"praezise"` → `"präzise"`
- `"Gedaechtnis"` → `"Gedächtnis"`
- `"loesen"` → `"lösen"`

---

## build/tools/custom-api-actions.mdx

**FAIL — Item 2: Multiple ASCII umlaut substitutions**

Examples:
- `"persoenliche"` → `"persönliche"`
- `"Ausfuehrung"` → `"Ausführung"`
- `"unabhaengig"` → `"unabhängig"`
- `"Ungueltige"` → `"Ungültige"`
- `"Loesung"` → `"Lösung"`
- `"Wofuer"` → `"Wofür"`
- `"Ausfuehren"` → `"Ausführen"`

---

## build/tools/overview.mdx

**FAIL — Item 2: Multiple ASCII umlaut substitutions**

Examples:
- `"Faehigkeiten"` → `"Fähigkeiten"`
- `"ausfuehrt"` → `"ausführt"`
- `"Verstaendnis"` → `"Verständnis"`
- `"erklaeren"` → `"erklären"`
- `"loesen"` → `"lösen"`
- `"gruendlich"` → `"gründlich"`
- `"Testoberflaeche"` → `"Testoberfläche"`
- `"ausfuehren"` → `"ausführen"`
- `"Begruendung"` → `"Begründung"`
- `"noetigen"` → `"nötigen"`

---

## build/tools/transfer-tools.mdx

**FAIL — Item 2: Several ASCII umlaut substitutions**

Examples:
- `"gewaehlten"` → `"gewählten"`
- `"gueltige"` → `"gültige"`
- `"SIP-faehiges"` → `"SIP-fähiges"`
- `"Fuelle"` → `"Fülle"`

---

## build/tools/web-search.mdx

**FAIL — Item 2: Multiple ASCII umlaut substitutions**

Examples:
- `"zusaetzliche"` → `"zusätzliche"`
- `"zurueckgegebene"` → `"zurückgegebene"`
- `"Beschraenkungen"` → `"Beschränkungen"`
- `"Personlichkeit"` → `"Persönlichkeit"`
- `"Benoetigt"` → `"Benötigt"`
- `"haengt"` → `"hängt"`
- `"Laenge"` → `"Länge"`
- `"vertrauenswuerdige"` → `"vertrauenswürdige"`
- `"Guenstiger"` → `"Günstiger"`
- `"zaehlt"` → `"zählt"`

---

## build/voice-speech/ai-pipeline-guide.mdx

PASS — Du-form throughout. Umlauts correct.

---

## build/voice-speech/ambient-sound.mdx

PASS — Du-form throughout. Umlauts correct.

---

## build/voice-speech/choose-ai-model.mdx

PASS — Du-form throughout. Umlauts correct.

---

## build/voice-speech/custom-pronunciations.mdx

PASS — Du-form throughout. Umlauts correct.

---

## build/voice-speech/select-voice.mdx

PASS — Du-form throughout. Umlauts correct.

---

## build/voice-speech/thinking-sounds.mdx

PASS — Du-form throughout. Umlauts correct.

---

## build/voice-speech/transcriber.mdx

PASS — Du-form throughout. Umlauts correct.

---

## build/voice-speech/voice-cloning.mdx

**FAIL — Item 2: ASCII umlaut substitution**

Example (line 23, Warning block):
- `"ausdrueckliche"` → `"ausdrückliche"`

---

## build/voice-speech/voice-settings.mdx

PASS — Du-form throughout. Umlauts correct.

---

## changelog.mdx

PASS — Clean German throughout. Umlauts correct.

---

## examples/appointment-booking.mdx

PASS — Minimal German body text; frontmatter umlauts correct.

---

## examples/customer-support.mdx

PASS — Minimal German body text; frontmatter umlauts correct.

---

## examples/lead-qualification.mdx

PASS — Minimal German body text; frontmatter umlauts correct.

---

## examples/outbound-campaign.mdx

PASS — Minimal German body text; frontmatter umlauts correct.

---

## examples/receptionist.mdx

PASS — Minimal German body text; frontmatter umlauts correct.

---

## faq.mdx

PASS — Du-form throughout. Umlauts correct.

---

## glossary.mdx

PASS — Du-form throughout. Umlauts correct.

---

## introduction.mdx

PASS — Du-form throughout. Umlauts correct.

---

## launch/buy-numbers.mdx

PASS — Du-form throughout. Umlauts correct.

---

## launch/campaign-outbound-launch.mdx

PASS — Du-form throughout. Umlauts correct.

---

## launch/outbound-compliance.mdx

PASS — Du-form throughout. Umlauts correct.

---

## launch/overview.mdx

PASS — Du-form throughout. Umlauts correct.

---

## launch/phone-numbers.mdx

PASS — Du-form throughout. Umlauts correct.

---

## launch/production-checklist.mdx

PASS — Du-form throughout. Umlauts correct.

---

## launch/schedules.mdx

PASS — Du-form throughout. Umlauts correct.

---

## launch/sip-providers.mdx

PASS — Du-form throughout. Umlauts correct.

---

## launch/sip-providers/3cx.mdx

PASS — Du-form throughout. Umlauts correct.

---

## launch/sip-providers/easybell.mdx

PASS — Du-form throughout. Umlauts correct.

---

## launch/sip-providers/fonial.mdx

PASS — Du-form throughout. Umlauts correct.

---

## launch/sip-providers/fritzbox.mdx

PASS — Du-form throughout. Umlauts correct.

---

## launch/sip-providers/nfon.mdx

PASS — Du-form throughout. Umlauts correct.

---

## launch/sip-providers/placetel.mdx

PASS — Du-form throughout. Umlauts correct.

---

## launch/sip-providers/sipgate.mdx

PASS — Du-form throughout. Umlauts correct.

---

## launch/sip-providers/starface.mdx

PASS — Du-form throughout. Umlauts correct.

---

## launch/sip-providers/telnyx.mdx

PASS — Du-form throughout. Umlauts correct.

---

## launch/sip-providers/twilio.mdx

PASS — Du-form throughout. Umlauts correct.

---

## launch/sip-trunks.mdx

PASS — Du-form throughout. Umlauts correct.

---

## launch/troubleshooting-deployment.mdx

PASS — Du-form throughout. Umlauts correct.

---

## launch/web-widget-deployment.mdx

PASS — Du-form throughout. Umlauts correct.

---

## launch/web-widget-implementation.mdx

PASS — Du-form throughout. Umlauts correct.

---

## manage/campaigns/overview.mdx

PASS — Du-form throughout. Umlauts correct.

---

## manage/contacts/import-export.mdx

PASS — Du-form throughout. Umlauts correct.

---

## manage/contacts/overview.mdx

PASS — Du-form throughout. Umlauts correct.

---

## manage/conversations/detail.mdx

PASS — Du-form throughout. Umlauts correct.

---

## manage/conversations/overview.mdx

PASS — Du-form throughout. Umlauts correct.

---

## manage/dashboard.mdx

PASS — Du-form throughout. Umlauts correct.

---

## manage/notifications.mdx

PASS — Du-form throughout. Umlauts correct.

---

## manage/overview.mdx

PASS — Du-form throughout. Umlauts correct.

---

## manage/quality-studio/issues.mdx

PASS — Du-form throughout. Umlauts correct.

---

## manage/quality-studio/overview.mdx

PASS — Du-form throughout. Umlauts correct.

---

## manage/tasks/overview.mdx

PASS — Du-form throughout. Umlauts correct.

---

## manage/tasks/views.mdx

PASS — Du-form throughout. Umlauts correct.

---

## manage/trust-center/overview.mdx

PASS — Du-form throughout. Umlauts correct.

---

## manage/web-widgets/configuration.mdx

PASS — Du-form throughout. Umlauts correct.

---

## manage/web-widgets/overview.mdx

PASS — Du-form throughout. Umlauts correct.

---

## manage/web-widgets/share-links.mdx

PASS — Du-form throughout. Umlauts correct.

---

## mcp-docs/overview.mdx

PASS — Du-form throughout. Umlauts correct.

---

## partner-network/affiliate-program.mdx

PASS — Du-form throughout. Umlauts correct.

---

## partner-network/partner-program.mdx

PASS — Du-form throughout. Umlauts correct.

---

## phone-numbers/regulatory-bundles.mdx

PASS — Du-form throughout. Umlauts correct.

---

## quickstart.mdx

PASS — Du-form throughout. Umlauts correct.

---

## reference/error-codes.mdx

PASS — Placeholder body only (English stub sentence); frontmatter umlauts correct.

---

## reference/limits-quotas.mdx

PASS — Placeholder body only (English stub sentence); frontmatter umlauts correct.

---

## reference/simple-vs-expert.mdx

PASS — Placeholder body only (English stub sentence); frontmatter umlauts correct.

---

## reference/supported-providers.mdx

PASS — Placeholder body only (English stub sentence); frontmatter umlauts correct.

---

## reference/webhook-events.mdx

PASS — Placeholder body only (English stub sentence); frontmatter umlauts correct.

---

## test/debugging.mdx

PASS — Du-form throughout. Umlauts correct. Natural German prose.

---

## test/edge-cases.mdx

PASS — Du-form throughout. Umlauts correct. Well-written German.

---

## test/integration-testing.mdx

PASS — Du-form throughout. Umlauts correct. Natural German throughout.

---

## test/overview.mdx

PASS — Du-form throughout. Umlauts correct.

---

## test/phone-testing.mdx

PASS — Du-form throughout. Umlauts correct.

---

## test/test-scenarios.mdx

PASS — Du-form throughout. Umlauts correct. Natural German throughout.

---

## test/web-simulator.mdx

PASS — Du-form throughout. Umlauts correct.

---

## troubleshooting/call-quality.mdx

PASS — Placeholder body only (English stub sentence); frontmatter umlauts correct.

---

## troubleshooting/campaigns.mdx

PASS — Placeholder body only (English stub sentence); frontmatter umlauts correct.

---

## troubleshooting/common-issues.mdx

PASS — Placeholder body only (English stub sentence); frontmatter umlauts correct.

---

## troubleshooting/custom-actions.mdx

PASS — Placeholder body only (English stub sentence); frontmatter umlauts correct.

---

## troubleshooting/knowledge-issues.mdx

PASS — Placeholder body only (English stub sentence); frontmatter umlauts correct.

---

## troubleshooting/tools-integrations.mdx

PASS — Placeholder body only (English stub sentence); frontmatter umlauts correct.

---

## Files Requiring Fixes

The following 21 files all FAIL on **checklist item 2** (ASCII umlaut substitutions). No files fail on item 1 (Sie/Ihr/Ihnen). All substitutions follow the same pattern: ä→ae, ö→oe, ü→ue, ß→ss.

| File | Severity | Notes |
|------|----------|-------|
| `build/advanced/announcements.mdx` | Minor | 2 instances, in example text block |
| `build/advanced/mcp-servers.mdx` | Severe | 9+ instances throughout |
| `build/conversation/greeting-messages.mdx` | Severe | 11+ instances throughout |
| `build/conversation/prompt-engineering-guide.mdx` | Severe | 11+ instances throughout |
| `build/conversation/prompt-templates.mdx` | Severe | 10+ instances throughout |
| `build/conversation/prompt.mdx` | Moderate | 9 instances |
| `build/conversation/runtime-data-flow.mdx` | Moderate | 5 instances |
| `build/conversation/template-syntax.mdx` | Minor | 4 instances |
| `build/conversation/variable-sources.mdx` | Minor | 2 instances |
| `build/knowledge/architecture.mdx` | Moderate | 8 instances |
| `build/knowledge/assign-knowledge.mdx` | Moderate | 4 instances |
| `build/knowledge/content-types.mdx` | Minor | 3 instances |
| `build/knowledge/context-vs-rag.mdx` | Moderate | 10 instances |
| `build/knowledge/create-knowledge-bases.mdx` | Severe | 10+ instances throughout |
| `build/tools/booking-calendar.mdx` | Moderate | 9 instances |
| `build/tools/calculator.mdx` | Moderate | 8 instances |
| `build/tools/custom-api-actions.mdx` | Moderate | 7 instances |
| `build/tools/overview.mdx` | Moderate | 10 instances |
| `build/tools/transfer-tools.mdx` | Minor | 4 instances |
| `build/tools/web-search.mdx` | Moderate | 10 instances |
| `build/voice-speech/voice-cloning.mdx` | Minor | 1 instance |
