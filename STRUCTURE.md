# cloudX Website Structure

## Pagina Structuur

### Homepage (`/nl/index.html`, `/en/index.html`)
**Doel**: Overzicht en eerste indruk met USPs

**Inhoud**:
- Hero met security/compliance focus
  - "Data blijft veilig in AWS"
  - "Werk vanaf elk device met krachtige EC2"
- 3 Key Benefits (highlight cards)
  1. 🛡️ Data Security & Compliance
  2. 💪 Resource Efficiency
  3. ⚡ Developer Experience
- 3 Main Sections (met links):
  1. **Client** → Details over VSCode + cloudX-proxy
  2. **Server** → AWS deployment templates
  3. **Architecture** → Hoe alles samenwerkt
- CTA sectie

### Client Pagina (`/nl/client.html`, `/en/client.html`)
**Doel**: VSCode + cloudX-proxy setup

**Inhoud**:
- Prerequisites
- Installation steps (3-step process)
- Advanced options (1Password, multi-env, custom config)
- Troubleshooting

### Server Pagina (`/nl/server.html`, `/en/server.html`)
**Doel**: AWS infrastructure deployment

**Inhoud**:
- CloudFormation templates overview
- 3-step deployment:
  1. Environment setup
  2. Instance deployment
  3. User setup (optional)
- Multi-environment support
- Software packages

### Architecture Pagina (`/nl/architecture.html`, `/en/architecture.html`)
**Doel**: Complete flow en technical details

**Inhoud**:
- End-to-end architecture diagram
- Data flow visualization
- Security layers
- How client & server communicate
- Why data stays in AWS
- Performance benefits

## Key USPs (Unique Selling Points)

### 1. Data Security & Compliance
- Code en data verlaten **nooit** je AWS omgeving
- Geen sync naar lokale laptop/desktop
- Perfect voor gereguleerde sectoren (finance, healthcare, government)
- GDPR/compliance proof
- Full audit trail via CloudTrail

### 2. Resource Efficiency
- Werk vanaf **elk device** (zelfs zwakke laptop)
- Gebruik krachtige EC2 instances voor compute
- Compile, build, test op AWS hardware
- Bespaar op lokale hardware kosten
- Auto-stop voor kostenoptimalisatie

### 3. Developer Experience
- Lokale VSCode met remote compute
- Alle je extensies en settings
- Seamless integration
- Auto-start instances
- Cross-platform support

## Navigation Structure

```
Homepage
├── Client → /nl/client.html
├── Server → /nl/server.html
└── Architecture → /nl/architecture.html
```

Elke pagina heeft:
- Header met navigatie naar alle pagina's
- Dark mode toggle
- Language switcher (NL | EN)
- Footer met links

## Implementation Notes

- Shared CSS (`../styles.css`)
- Shared JavaScript (`../script.js`)
- Consistent design language
- Responsive mobile-first
- Dark mode support op alle pagina's
- SEO optimized per pagina
