# Farm Helper Connect

FarmFleet

Build a production-quality, high-fidelity frontend for a web application called FarmFleet.

Treat this as if you are building a real product that will be used by farmers across rural India. Do not build a concept, wireframe, mockup, placeholder interface, or AI-style demo. The application should feel complete, polished, trustworthy, and ready for pilot deployment.

Use realistic local mock data throughout the application. Never use placeholder text like "Lorem Ipsum", "John Doe", "Item 1", or repeated dummy content.

The application should look and behave like an actual product, with believable interactions, realistic states, polished animations, and consistent data across every screen.

About FarmFleet

FarmFleet is an offline-first agricultural machinery request platform connecting farmers with their nearby Custom Hiring Center (CHC).

This is not a marketplace.

Farmers do not browse multiple vendors or list machinery.

Every farmer belongs to one nearby CHC.

The CHC owns and manages all equipment.

The farmer's responsibilities are simply to:

view available machinery

request machinery

contact the CHC

receive updates

track request status

The application should always reinforce that the CHC is the trusted service provider.

Target Users

Design specifically for rural Indian farmers.

Many users may:

have low digital literacy

be first-time smartphone users

use older Android devices

have unreliable internet connectivity

use the application outdoors

prefer simple language over technical terminology

Every screen should minimize cognitive load.

Users should never wonder what to do next.

Primary actions should always be obvious.

Design Language

The interface should feel:

warm

trustworthy

friendly

modern but simple

government-service quality

agricultural

calm

approachable

Avoid:

enterprise dashboards

SaaS admin layouts

unnecessary complexity

clutter

excessive cards

long paragraphs

tiny buttons

Visual Style

Use an agricultural-inspired palette.

Primary Green

Earth Brown

Cream

Muted Yellow

Beige

White

Soft Gray

Large typography.

Large touch targets.

Rounded corners.

Comfortable spacing.

Soft shadows.

Consistent iconography.

Smooth micro-interactions.

Use Lucide icons.

Offline-first Experience

The application should naturally communicate reliability.

Include subtle offline behavior.

Examples:

Offline indicator

Sync status

Last synced timestamp

Requests saved locally

Automatic synchronization when connection returns

Friendly offline messages

The user should always feel confident that their request is safe.

Demo Environment

Although this behaves like a production application, include a Demo Mode for presentations and usability testing.

Provide a Demo Mode switcher that allows changing the active farmer without authentication.

Display:

Demo Mode • Viewing as Murugan

Switching users should instantly update:

request history

notifications

villages

preferred machinery

profile

request statuses

Create realistic farmer profiles.

M. Murugan

Village: Kallakurichi

2 acres

Returning farmer

Pending Tractor Request

Completed Rotavator Request

Lakshmi Ammal

Village: Chinnasalem

1.5 acres

Approved Power Sprayer Request

R. Selvam

Village: Ulundurpet

5 acres

Scheduled Harvester Booking

Kumaravel

Village: Sankarapuram

New farmer

No previous requests

Helpful empty states

CHC Data

Green Harvest Custom Hiring Center

Government Registered

Manager:

Mr. Ramesh Kumar

Address:

12 Main Road

Kallakurichi

Tamil Nadu

606202

Phone

+91 98765 43210

WhatsApp

+91 98765 43210

Working Hours

Monday–Saturday

8:00 AM–6:00 PM

Equipment

Create realistic machinery cards.

Include:

Mahindra 575 DI Tractor

John Deere Rotavator

Power Sprayer

Combine Harvester

Seed Drill

Disc Plough

Every card should contain:

image

availability

estimated waiting time

suitable purpose

current status

short description

Do not include pricing.

Do not include shopping or marketplace functionality.

Pages

Home

Display:

Welcome message

CHC information

Working hours

Trust badge

Equipment preview

Recent announcements

Call button

WhatsApp button

Request Machinery button

Village map preview

Nearby CHC information

Request Machinery

Create a simple form.

Fields:

Farmer Name

Mobile Number

Village

Machine Required

Preferred Date

Land Size (Optional)

Notes (Optional)

Large Submit button.

After submission display:

Success animation

Generated Request ID

Current status

Expected callback

Buttons:

View Request

Call CHC

Back Home

Request Status

Display realistic request cards.

Statuses:

Pending

Approved

Scheduled

Completed

Rejected

Each request should include:

Timeline

Submission date

Machine

Scheduled date

Status badge

Contact CHC button

Request ID

Equipment

Show equipment cards with:

Images

Availability

Description

Suitable crops

Waiting time

Current status

Contact

Display:

Large Call Now button

WhatsApp button

Business hours

Address

Village

Manager

Map preview

Urgent contact note

Notifications

Include realistic notifications.

Examples:

Request received

Request approved

Machine assigned

Scheduled time updated

Reminder

CHC attempted to call

Request completed

Display timestamps.

Bottom Navigation

Home

Request

Status

Equipment

Contact

Highlight the active tab.

Interactive Behaviors

Everything should feel alive.

Include:

Loading skeletons

Success toasts

Error messages

Confirmation dialogs

Smooth transitions

Pull to refresh

Button animations

Status updates

Interactive notifications

Equipment detail pages

Search

Equipment filters

Demo Controls

Include a floating Demo Controls panel for presentations.

Allow switching between:

Different farmers

Online

Offline

Morning

Afternoon

Evening

English

தமிழ்

Reset demo data

Generate notification

Generate request

Clear requests

The controls should update the application instantly without refreshing.

Realistic Data

Generate believable Indian content.

Use:

Indian names

Tamil Nadu villages

Realistic request IDs

Realistic dates

Meaningful notifications

Natural phone numbers

Authentic equipment descriptions

Avoid duplicated content.

Every request should have its own history.

Every farmer should feel like a real person.

Empty States

Design thoughtful empty states.

Example:

"You haven't requested any machinery yet.

Need a tractor?

Request one in less than a minute."

Include illustrations and clear CTAs.

Accessibility

Large buttons.

Readable typography.

High contrast.

Clear icons.

Simple labels.

Friendly language.

Technical

Mobile-first (390px width as primary target)

Responsive layout

React architecture

Reusable components

Local mock data only (no backend)

Fully interactive navigation

Fully interactive forms

Persistent local state using browser storage

Smooth animations

Production-quality UI polish

Final Goal

The final application should be indistinguishable from a real, production-ready product. Someone opening it should believe FarmFleet is an existing service already being used by farmers in Tamil Nadu. Every screen, interaction, animation, notification, piece of data, and state should reinforce authenticity and trust. Do not take shortcuts, simplify features unnecessarily, or leave placeholder content. Build the experience with the level of detail, consistency, and polish expected from a shipping application rather than a design exercise.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://seed-to-field-app.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/3e2332c9-45be-42ba-a692-1e8efce66966).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
