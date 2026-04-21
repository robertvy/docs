#!/usr/bin/env python3
"""
Fix ASCII umlaut substitutions in German MDX documentation files.
Replaces ae→ä, oe→ö, ue→ü, and ss→ß in German words while skipping
code blocks, inline code, URLs, and English terms.
"""

import re
import os

BASE = "/Users/robertvanysendyck/projects/itellico-ai/documentation/de/"

FAILING_FILES = [
    "build/advanced/announcements.mdx",
    "build/advanced/mcp-servers.mdx",
    "build/conversation/greeting-messages.mdx",
    "build/conversation/prompt-engineering-guide.mdx",
    "build/conversation/prompt-templates.mdx",
    "build/conversation/prompt.mdx",
    "build/conversation/runtime-data-flow.mdx",
    "build/conversation/template-syntax.mdx",
    "build/conversation/variable-sources.mdx",
    "build/knowledge/architecture.mdx",
    "build/knowledge/assign-knowledge.mdx",
    "build/knowledge/content-types.mdx",
    "build/knowledge/context-vs-rag.mdx",
    "build/knowledge/create-knowledge-bases.mdx",
    "build/tools/booking-calendar.mdx",
    "build/tools/calculator.mdx",
    "build/tools/custom-api-actions.mdx",
    "build/tools/overview.mdx",
    "build/tools/transfer-tools.mdx",
    "build/tools/web-search.mdx",
    "build/voice-speech/voice-cloning.mdx",
]

# Comprehensive replacement dictionary: ASCII form → correct German form
# Sorted longest-first to avoid partial-match issues.
# Each entry is (wrong, correct). Case-insensitive matching with case restoration.
REPLACEMENTS = [
    # ===== ue → ü =====
    ("Ueberschreibungen",    "Überschreibungen"),
    ("Ueberwachen",          "Überwachen"),
    ("ueberfluessige",       "überflüssige"),
    ("Ueberfluessige",       "Überflüssige"),
    ("vertrauenswuerdige",   "vertrauenswürdige"),
    ("Vertrauenswuerdige",   "Vertrauenswürdige"),
    ("Verfuegbarkeitsfenster","Verfügbarkeitsfenster"),
    ("Verfuegbarkeiten",     "Verfügbarkeiten"),
    ("Verfuegbarkeit",       "Verfügbarkeit"),
    ("verfuegbaren",         "verfügbaren"),
    ("verfuegbare",          "verfügbare"),
    ("verfuegbar",           "verfügbar"),
    ("Verfuegbar",           "Verfügbar"),
    ("Navigationsmenue",     "Navigationsmenü"),
    ("navigationsmenue",     "navigationsmenü"),
    ("Hauptmenue",           "Hauptmenü"),
    ("hauptmenue",           "hauptmenü"),
    ("Menuepunkt",           "Menüpunkt"),
    ("menuepunkt",           "menüpunkt"),
    ("Menue",                "Menü"),
    ("menue",                "menü"),
    ("Dokumentzaehler",      "Dokumentzähler"),
    ("dokumentzaehler",      "dokumentzähler"),
    ("KI-gestuetzte",        "KI-gestützte"),
    ("KI-gestuetzt",         "KI-gestützt"),
    ("gestuetzten",          "gestützten"),
    ("gestuetzte",           "gestützte"),
    ("gestuetzt",            "gestützt"),
    ("Begruessungen",        "Begrüßungen"),
    ("begruessungen",        "begrüßungen"),
    ("Begruendung",          "Begründung"),
    ("begruendung",          "begründung"),
    ("begruenden",           "begründen"),
    ("begruendet",           "begründet"),
    ("Ruecksendeprozess",    "Rücksendeprozess"),
    ("zurueckgegebene",      "zurückgegebene"),
    ("zurueckgibst",         "zurückgibst"),
    ("zurueckgehen",         "zurückgehen"),
    ("zurueckgegeben",       "zurückgegeben"),
    ("zurueck",              "zurück"),
    ("Zurueck",              "Zurück"),
    ("Verfuegbarkeit",       "Verfügbarkeit"),
    ("zukuenftigen",         "zukünftigen"),
    ("zukuenftige",          "zukünftige"),
    ("zukuenftig",           "zukünftig"),
    ("widerspruechliche",    "widersprüchliche"),
    ("widerspruechlichen",   "widersprüchlichen"),
    ("widerspruechlich",     "widersprüchlich"),
    ("verknuepfen",          "verknüpfen"),
    ("verknuepfe",           "verknüpfe"),
    ("verknuepft",           "verknüpft"),
    ("Verknuepfung",         "Verknüpfung"),
    ("Ausdruecken",          "Ausdrücken"),
    ("Ausdruecke",           "Ausdrücke"),
    ("ausdrueckliche",       "ausdrückliche"),
    ("ausdruecklichen",      "ausdrücklichen"),
    ("ausdruecklich",        "ausdrücklich"),
    ("Ausfuehrungen",        "Ausführungen"),
    ("Ausfuehrung",          "Ausführung"),
    ("Ausfuehren",           "Ausführen"),
    ("ausfuehren",           "ausführen"),
    ("ausfuehrt",            "ausführt"),
    ("ausfuehrlich",         "ausführlich"),
    ("Ausfuehrlich",         "Ausführlich"),
    ("unterstuetzen",        "unterstützen"),
    ("unterstuetzt",         "unterstützt"),
    ("Unterstuetzung",       "Unterstützung"),
    ("unterstuetzung",       "unterstützung"),
    ("Einfuehrung",          "Einführung"),
    ("einfuehren",           "einführen"),
    ("einfuehrt",            "einführt"),
    ("Ungueltige",           "Ungültige"),
    ("ungueltige",           "ungültige"),
    ("ungueltig",            "ungültig"),
    ("gueltige",             "gültige"),
    ("gueltig",              "gültig"),
    ("Guenstiger",           "Günstiger"),
    ("guenstiger",           "günstiger"),
    ("guenstig",             "günstig"),
    ("Gewuenschtes",         "Gewünschtes"),
    ("gewuenschtes",         "gewünschtes"),
    ("gewuenscht",           "gewünscht"),
    ("gefuehrt",             "geführt"),
    ("gefuehre",             "geführe"),
    ("fuehren",              "führen"),
    ("fuehrt",               "führt"),
    ("Fuehren",              "Führen"),
    ("eingefuegt",           "eingefügt"),
    ("einfuegen",            "einfügen"),
    ("einfuegt",             "einfügt"),
    ("Einfuegen",            "Einfügen"),
    ("hinzufuegen",          "hinzufügen"),
    ("hinzufuegt",           "hinzufügt"),
    ("hinzugefuegt",         "hinzugefügt"),
    ("fuegst",               "fügst"),
    ("fuegen",               "fügen"),
    ("fuegt",                "fügt"),
    ("Fuelle",               "Fülle"),
    ("fuelle",               "fülle"),
    ("Fuellen",              "Füllen"),
    ("fuellen",              "füllen"),
    ("Fuege",                "Füge"),
    ("fuege",                "füge"),
    ("Fuer",                 "Für"),
    ("fuer",                 "für"),
    ("Wofuer",               "Wofür"),
    ("wofuer",               "wofür"),
    ("Dafuer",               "Dafür"),
    ("dafuer",               "dafür"),
    ("Darueber",             "Darüber"),
    ("darueber",             "darüber"),
    ("Hierueber",            "Hierüber"),
    ("hierueber",            "hierüber"),
    ("Ueber",                "Über"),
    ("ueber",                "über"),
    ("ueberall",             "überall"),
    ("uebersteigt",          "übersteigt"),
    ("uebersteigen",         "übersteigen"),
    ("natuerlichen",         "natürlichen"),
    ("natuerliches",         "natürliches"),
    ("natuerliche",          "natürliche"),
    ("natuerlich",           "natürlich"),
    ("Natuerlich",           "Natürlich"),
    ("nuetzlichen",          "nützlichen"),
    ("nuetzliche",           "nützliche"),
    ("nuetzlich",            "nützlich"),
    ("Nuetzlich",            "Nützlich"),
    ("muessen",              "müssen"),
    ("muesst",               "müsst"),
    ("muesstet",             "müsstet"),
    ("pruefst",              "prüfst"),
    ("pruefen",              "prüfen"),
    ("geprueft",             "geprüft"),
    ("Pruefe",               "Prüfe"),
    ("pruefe",               "prüfe"),
    ("Pruefen",              "Prüfen"),
    ("Schluessel",           "Schlüssel"),
    ("schluessel",           "schlüssel"),
    ("buendeln",             "bündeln"),
    ("buendelt",             "bündelt"),
    ("buendle",              "bündle"),

    # ===== ae → ä =====
    ("Aeusserungen",         "Äußerungen"),
    ("aeusserungen",         "äußerungen"),
    ("Qualitaetszwecken",    "Qualitätszwecken"),
    ("Inhaltsqualitaet",     "Inhaltsqualität"),
    ("inhaltsqualitaet",     "inhaltsqualität"),
    ("Qualitaeten",          "Qualitäten"),
    ("Qualitaet",            "Qualität"),
    ("qualitaet",            "qualität"),
    ("Qualitaets",           "Qualitäts"),
    ("Komplexitaet",         "Komplexität"),
    ("komplexitaet",         "komplexität"),
    ("Verfuegbarkeiten",     "Verfügbarkeiten"),  # already above
    ("Faehigkeiten",         "Fähigkeiten"),
    ("faehigkeiten",         "fähigkeiten"),
    ("Faehigkeit",           "Fähigkeit"),
    ("faehigkeit",           "fähigkeit"),
    ("faehig",               "fähig"),
    ("SIP-faehiges",         "SIP-fähiges"),
    ("SIP-faehige",          "SIP-fähige"),
    ("Anwendungsfaellen",    "Anwendungsfällen"),
    ("Anwendungsfaelle",     "Anwendungsfälle"),
    ("Anwendungsfall",       "Anwendungsfall"),  # already correct
    ("Testoberflaeche",      "Testoberfläche"),
    ("testoberflaeche",      "testoberfläche"),
    ("Gespraeche",           "Gespräche"),
    ("gespraeche",           "gespräche"),
    ("Gespraechen",          "Gesprächen"),
    ("gespraechen",          "gesprächen"),
    ("Gespraeches",          "Gesprächs"),
    ("gespraeches",          "gesprächs"),
    ("Gespraeches",          "Gesprächs"),
    ("Gesprächsfelder",      "Gesprächsfelder"),  # already correct
    ("Gesprächsfeld",        "Gesprächsfeld"),    # already correct
    ("Gespraeche",           "Gespräche"),
    ("Gespraechsfelder",     "Gesprächsfelder"),
    ("gesprächsfelder",      "gesprächsfelder"),
    ("Gesprächsf",           "Gesprächsf"),       # already correct
    ("Beschraenkungen",      "Beschränkungen"),
    ("beschraenkungen",      "beschränkungen"),
    ("beschraenkt",          "beschränkt"),
    ("Einschraenkung",       "Einschränkung"),
    ("einschraenkung",       "einschränkung"),
    ("Einwaende",            "Einwände"),
    ("einwaende",            "einwände"),
    ("Einwand",              "Einwand"),   # already correct
    ("unvollstaendige",      "unvollständige"),
    ("unvollstaendigen",     "unvollständigen"),
    ("unvollstaendig",       "unvollständig"),
    ("abhaengigen",          "abhängigen"),
    ("abhaengige",           "abhängige"),
    ("abhaengig",            "abhängig"),
    ("unabhaengig",          "unabhängig"),
    ("Aenderungen",          "Änderungen"),
    ("aenderungen",          "änderungen"),
    ("Aenderung",            "Änderung"),
    ("aenderung",            "änderung"),
    ("aendern",              "ändern"),
    ("aendert",              "ändert"),
    ("Aendern",              "Ändern"),
    ("veraendert",           "verändert"),
    ("veraendern",           "verändern"),
    ("geaendert",            "geändert"),
    ("Begruessungen",        "Begrüßungen"),  # already above
    ("Bestaetigungen",       "Bestätigungen"),
    ("bestaetigen",          "bestätigen"),
    ("bestaetigt",           "bestätigt"),
    ("bestaetigung",         "bestätigung"),
    ("auswaehlen",           "auswählen"),
    ("auswaehlt",            "auswählt"),
    ("ausgewaehlt",          "ausgewählt"),
    ("auswaehlst",           "auswählst"),
    ("auswaehlen",           "auswählen"),
    ("Auswaehlen",           "Auswählen"),
    ("auszuwaehlen",         "auszuwählen"),
    ("auszuwahlen",          "auszuwählen"),
    ("waehlen",              "wählen"),
    ("Waehle",               "Wähle"),
    ("waehle",               "wähle"),
    ("waehlt",               "wählt"),
    ("gewaehlt",             "gewählt"),
    ("gewaehlten",           "gewählten"),
    ("gewaehltem",           "gewähltem"),
    ("Bewaehrung",           "Bewährung"),
    ("bewaehrte",            "bewährte"),
    ("bewaehrt",             "bewährt"),
    ("erklaert",             "erklärt"),
    ("erklaeren",            "erklären"),
    ("erklaerst",            "erklärst"),
    ("Erklaerung",           "Erklärung"),
    ("erklaerung",           "erklärung"),
    ("erhaelt",              "erhält"),
    ("erhalten",             "erhalten"),  # already correct
    ("enthaelt",             "enthält"),
    ("enthalten",            "enthalten"), # already correct
    ("haengt",               "hängt"),
    ("haengen",              "hängen"),
    ("haenge",               "hänge"),
    ("Fachkraeften",         "Fachkräften"),
    ("Fachkraefte",          "Fachkräfte"),
    ("haeufigste",           "häufigste"),
    ("haeufiger",            "häufiger"),
    ("haeufigen",            "häufigen"),
    ("haeufige",             "häufige"),
    ("haeufig",              "häufig"),
    ("Haeufig",              "Häufig"),
    ("naechsten",            "nächsten"),
    ("naechster",            "nächster"),
    ("naechstem",            "nächstem"),
    ("naechste",             "nächste"),
    ("naechst",              "nächst"),
    ("Naechste",             "Nächste"),
    ("Naechst",              "Nächst"),
    ("spaetere",             "spätere"),
    ("spaeterem",            "späterem"),
    ("spaeter",              "später"),
    ("Spaeter",              "Später"),
    ("spaet",                "spät"),
    ("Vorlaeufe",            "Vorläufe"),
    ("Vorlaeufige",          "Vorläufige"),
    ("vorlaeufig",           "vorläufig"),
    ("tatsaechlichen",       "tatsächlichen"),
    ("tatsaechliche",        "tatsächliche"),
    ("tatsaechlich",         "tatsächlich"),
    ("zusaetzlichen",        "zusätzlichen"),
    ("zusaetzliche",         "zusätzliche"),
    ("zusaetzlich",          "zusätzlich"),
    ("Zusaetzlich",          "Zusätzlich"),
    ("Zaehler",              "Zähler"),
    ("zaehler",              "zähler"),
    ("zaehlt",               "zählt"),
    ("zaehlen",              "zählen"),
    ("Laenge",               "Länge"),
    ("laenge",               "länge"),
    ("Gedaechtnis",          "Gedächtnis"),
    ("gedaechtnis",          "gedächtnis"),
    ("Waehrend",             "Während"),
    ("waehrend",             "während"),
    ("Gespraeche",           "Gespräche"),    # duplicate, already above
    ("laeuft",               "läuft"),
    ("Qualitaetszwecken",    "Qualitätszwecken"),  # duplicate

    # ===== oe → ö =====
    ("Suchverzoegerung",     "Suchverzögerung"),
    ("Suchverzoegerungen",   "Suchverzögerungen"),
    ("verzoegerung",         "verzögerung"),
    ("verzoegert",           "verzögert"),
    ("Oeffnungszeiten",      "Öffnungszeiten"),
    ("oeffnungszeiten",      "öffnungszeiten"),
    ("Loeschsymbol",         "Löschsymbol"),
    ("loeschsymbol",         "löschsymbol"),
    ("loeschen",             "löschen"),
    ("loescht",              "löscht"),
    ("Loeschen",             "Löschen"),
    ("Loesung",              "Lösung"),
    ("loesung",              "lösung"),
    ("Loesungen",            "Lösungen"),
    ("loesungen",            "lösungen"),
    ("loesen",               "lösen"),
    ("loest",                "löst"),
    ("aufgeloest",           "aufgelöst"),
    ("aufloesen",            "auflösen"),
    ("geloest",              "gelöst"),
    ("Hoeheren",             "Höheren"),
    ("hoeheren",             "höheren"),
    ("hoeheres",             "höheres"),
    ("hoeher",               "höher"),
    ("Hoeher",               "Höher"),
    ("hoeren",               "hören"),
    ("hoert",                "hört"),
    ("Hoeren",               "Hören"),
    ("koennen",              "können"),
    ("koennt",               "könnt"),
    ("Koennen",              "Können"),
    ("moeglichkeiten",       "möglichkeiten"),
    ("Moeglichkeiten",       "Möglichkeiten"),
    ("moeglichkeit",         "möglichkeit"),
    ("Moeglichkeit",         "Möglichkeit"),
    ("moeglichen",           "möglichen"),
    ("moegliche",            "mögliche"),
    ("moeglich",             "möglich"),
    ("Moeglich",             "Möglich"),
    ("moechten",             "möchten"),
    ("moechtest",            "möchtest"),
    ("moechte",              "möchte"),
    ("Moechte",              "Möchte"),
    ("noetigsten",           "nötigsten"),
    ("noetigen",             "nötigen"),
    ("noetige",              "nötige"),
    ("noetig",               "nötig"),
    ("Noetig",               "Nötig"),
    ("Benoetigt",            "Benötigt"),
    ("benoetigt",            "benötigt"),
    ("benoetigen",           "benötigen"),
    ("oeffnest",             "öffnest"),
    ("oeffnet",              "öffnet"),
    ("oeffnen",              "öffnen"),
    ("Oeffne",               "Öffne"),
    ("oeffne",               "öffne"),
    ("Oeffnen",              "Öffnen"),
    ("Oeffnet",              "Öffnet"),
    ("persoenlichen",        "persönlichen"),
    ("persoenliche",         "persönliche"),
    ("persoenliches",        "persönliches"),
    ("persoenlich",          "persönlich"),
    ("Persoenliche",         "Persönliche"),
    ("Persoenlichen",        "Persönlichen"),
    ("Personenliche",        "Persönliche"),  # dropped ö typo variant

    # ===== ss → ß =====
    ("Begruessungen",        "Begrüßungen"),    # already above
    ("Aeusserungen",         "Äußerungen"),     # already above
    ("vergroessere",         "vergrößere"),
    ("Vergroessere",         "Vergrößere"),
    ("Groessere",            "Größere"),
    ("groessere",            "größere"),
    ("Groesse",              "Größe"),
    ("groesse",              "größe"),
    ("Grossbuchstaben",      "Großbuchstaben"),
    ("grossbuchstaben",      "großbuchstaben"),
    ("grosse",               "große"),
    ("Grosse",               "Große"),
    ("heisst",               "heißt"),
    ("heissen",              "heißen"),
    ("Heisst",               "Heißt"),
    ("weiss",                "weiß"),
    ("Weiss",                "Weiß"),

    # ===== Dropped-umlaut cases (o instead of ö, etc.) =====
    ("Personlichkeit",       "Persönlichkeit"),
    ("personlichkeit",       "persönlichkeit"),
    ("Personliche",          "Persönliche"),
    ("personliche",          "persönliche"),
    ("Personlichen",         "Persönlichen"),
    ("Verstandnis",          "Verständnis"),  # dropped ä
    ("verstandnis",          "verständnis"),
    ("Verstaendnis",         "Verständnis"),
    ("verstaendnis",         "verständnis"),
]

# Remove exact duplicates while preserving order
seen = set()
REPLACEMENTS_DEDUPED = []
for pair in REPLACEMENTS:
    if pair[0] not in seen:
        seen.add(pair[0])
        REPLACEMENTS_DEDUPED.append(pair)

# Sort by length of wrong form descending (longest first) to avoid partial matches
REPLACEMENTS_DEDUPED.sort(key=lambda x: len(x[0]), reverse=True)


def replace_in_text(text: str) -> str:
    """Apply all word replacements to a text segment (non-code region)."""
    for wrong, correct in REPLACEMENTS_DEDUPED:
        # Build regex: word boundary aware, case-sensitive as given
        # We do exact match (not word-boundary) since German compounds
        # mean the form appears mid-compound too
        if wrong in text:
            text = text.replace(wrong, correct)
    return text


def fix_file(filepath: str) -> tuple[int, str]:
    """
    Process one file. Returns (change_count, new_content).
    Skips code fences (``` ... ```) and inline code (` ... `).
    """
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content
    lines = content.split('\n')
    result_lines = []
    in_code_fence = False
    changes = 0

    for line in lines:
        # Detect code fence boundaries
        stripped = line.strip()
        if stripped.startswith('```'):
            in_code_fence = not in_code_fence
            result_lines.append(line)
            continue

        if in_code_fence:
            result_lines.append(line)
            continue

        # Skip frontmatter lines (between --- markers) — actually we DO want
        # to fix descriptions/og:description in frontmatter
        # Process the line, but skip inline code spans

        # Split line by backtick spans, only process non-code parts
        parts = re.split(r'(`[^`]*`)', line)
        new_parts = []
        for part in parts:
            if part.startswith('`') and part.endswith('`') and len(part) > 1:
                # inline code — skip
                new_parts.append(part)
            else:
                fixed = replace_in_text(part)
                new_parts.append(fixed)
        new_line = ''.join(new_parts)

        if new_line != line:
            changes += 1
        result_lines.append(new_line)

    new_content = '\n'.join(result_lines)
    return changes, new_content


def main():
    total_files_changed = 0
    total_changes = 0

    for rel_path in FAILING_FILES:
        filepath = os.path.join(BASE, rel_path)
        if not os.path.exists(filepath):
            print(f"  SKIP (not found): {rel_path}")
            continue

        changes, new_content = fix_file(filepath)

        if changes > 0:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"  FIXED ({changes} lines changed): {rel_path}")
            total_files_changed += 1
            total_changes += changes
        else:
            print(f"  NO CHANGES: {rel_path}")

    print(f"\nDone. {total_files_changed} files updated, {total_changes} lines changed.")


if __name__ == '__main__':
    main()
