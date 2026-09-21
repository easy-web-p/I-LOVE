# Memory Website Builder — Entire Functional System Specification

**Document Status:** Approved Architecture & Functional System Specification  
**System Type:** Personal Memory & Surprise Website Builder  
**Core Concept:** Store memories once, select a template, generate a website, publish it, and share it with someone special.

---

## 1. Functional Architecture Overview

Firebase Authentication provides user identity services, while Firestore, Storage, and Security Rules enforce ownership-based access control. Cloud Storage integrates with Firebase Authentication for file-level access control.

```
+-------------------------------------------------------------+
|                      React Web App                          |
|  (Public Marketing, Member Application, Admin Portal)       |
+------------------------------+------------------------------+
                               |
            +------------------+------------------+
            |                  |                  |
            v                  v                  v
    +---------------+  +---------------+  +---------------+
    | Firebase Auth |  |Cloud Firestore|  | Cloud Storage |
    | (Identity)    |  |  (Database)   |  | (User Media)  |
    +---------------+  +---------------+  +---------------+
            ^                  ^                  ^
            |                  |                  |
            +------------------+------------------+
                               |
                     [Security Rules & RBAC]
```

---

## 2. User Roles & Plan Separation

Roles and commercial plans are decoupled:
```json
{
  "role": "USER",      // Controls administrative authority: GUEST, USER, ADMIN, SUPER_ADMIN
  "plan": "PREMIUM"    // Controls commercial feature access: FREE, PREMIUM, LIFETIME
}
```

| Role | Purpose | Main Permissions |
|---|---|---|
| **Guest** | Unauthenticated visitor | View public pages, examples, templates, and accessible published sites |
| **User** | Free registered member | Create limited projects (max 3), upload media (100MB), save memories, publish free websites |
| **Premium User** | Paying member | Use premium templates, unlimited projects, 5GB storage, password protection, scheduled reveal, remove branding, analytics |
| **Admin** | Operational administrator | Manage users, templates, reports, and website moderation |
| **Super Admin** | System owner | Full administration, roles, plans, payments, and system configuration |
| **Published-site Visitor** | Website recipient | View and interact with accessible published websites |

---

## 3. Main System Areas

1. **Public Marketing Website**: Introduces the product, showcases templates, pricing plans, authentication modals, and opens public/unlisted published websites.
2. **Member Application**: Dashboard, Project Management Wizard, 3-Column Website Builder, Memory Library, Important Dates & Countdown, Analytics, Settings & Billing.
3. **Administration Application**: Dedicated management view for platform metrics, user moderation, template activation, published website moderation, and audit logs.

---

## 4. Supported Section Types (Section 10.4)

| Type | Purpose | Key Content Fields |
|---|---|---|
| `HERO` | Opening cover with photo, title, badge, call-to-action button | `title`, `subtitle`, `badge`, `imageURL`, `buttonText`, `buttonTarget` |
| `MESSAGE` | Greeting or heartfelt love letter | `heading`, `message`, `author`, `date` |
| `IMAGE` | Single framed photo or polaroid highlight | `url`, `caption`, `frameStyle` (polaroid, round, cinema) |
| `GALLERY` | Multiple images with interactive lightbox | `title`, `subtitle`, `images: [{ url, caption }]` |
| `TIMELINE` | Chronological story milestones | `title`, `subtitle`, `events: [{ date, title, description, image }]` |
| `COUNTDOWN` | Countdown to event or count-up of days together | `title`, `startDate`, `mode` (`COUNT_DOWN` / `COUNT_UP`), `note` |
| `STATISTICS` | Memory summary statistics (e.g. days, trips, photos) | `title`, `stats: [{ label, value, unit }]` |
| `VIDEO` | Embedded video player (YouTube/Vimeo or video URL) | `title`, `videoUrl`, `caption` |
| `MUSIC` | Dedicated background music player with playback controls | `title`, `artist`, `audioUrl`, `autoPlay` |
| `QUOTE` | Meaningful quote card | `quote`, `author` |
| `SECRET_MESSAGE` | Interactive surprise box with confetti & secret note | `title`, `subtitle`, `secretText`, `buttonLabel` |
| `PERSON_PROFILE` | Couple or recipient profile card | `name`, `nickname`, `photoUrl`, `bio`, `birthday`, `tagline` |
| `MAP` | Location display of special spots | `title`, `locationName`, `address`, `mapQuery`, `note` |
| `BUTTON` | Call-to-action button | `label`, `actionUrl`, `subtext`, `buttonStyle` |
| `IMPORTANT_DATE` | Date card celebration | `title`, `date`, `description`, `badge` |
| `FOOTER` | Closing content and branding | `text`, `subtext` |

---

## 5. Canonical Firestore Structure (Section 23)

```
users/{uid}
├── notifications/{notificationId}
└── importantDates/{dateId}

projects/{projectId}
├── memoryRefs/{memoryId}
└── revisions/{revisionId}

memories/{memoryId}

media/{mediaId}

templates/{templateId}
└── versions/{versionId}

publishedSites/{slug}

siteAccessSessions/{sessionId}

subscriptions/{subscriptionId}
entitlements/{uid}
payments/{paymentId}

analyticsDaily/{projectId_date}

reports/{reportId}
auditLogs/{logId}

systemConfig/{configId}
```

---

## 6. Security Boundaries & Rules (Section 30)

- Users can only read/write documents where `ownerId == request.auth.uid`.
- Draft projects are never publicly readable.
- Published sites in `publishedSites/{slug}` are sanitized public snapshots without private fields.
- Password hashes are stored securely and never returned to the browser.
- Cloud Storage paths enforce ownership: `users/{uid}/media/{file}`.
