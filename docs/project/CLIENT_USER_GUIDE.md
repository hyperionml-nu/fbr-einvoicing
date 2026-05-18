# FBR Z E-Invoicing Portal - Client User Guide

Date: 18 May 2026

## 1. Overview

FBR Z E-Invoicing Portal is a web application designed to help businesses manage FBR digital invoicing workflows. The portal supports invoice creation, customer management, product and service setup, invoice tracking, offline queue handling, sandbox readiness, and PDF invoice download.

Application URL:

```text
https://fbr-einvoicing.vercel.app/
```

## 2. Login

Open the application URL in a browser and sign in using the credentials provided by the system administrator.

Recommended browser:

```text
Google Chrome
```

If login fails:

- Confirm the email and password are correct.
- Check internet connectivity.
- Contact the system administrator if the issue continues.

## 3. Dashboard

The Dashboard provides a quick overview of invoice activity and FBR readiness.

Main areas:

- Total invoices
- Submitted invoices
- Failed invoices
- Draft invoices
- Invoice activity chart
- Recent FBR invoices
- FBR readiness panel
- Queue and validation status

Use the Dashboard to quickly understand the current submission status and whether the system is ready for FBR activity.

## 4. Company Profile

The Company Profile page stores seller information used during invoice creation.

Typical details include:

- Company name
- NTN or CNIC
- Business type
- Province
- Address
- Phone number
- Email address

Keeping this information updated helps the Add Invoice page automatically fill seller details.

## 5. Customers

The Customers page is used to manage buyer information.

Available actions:

- Add a new customer
- Edit customer details
- Search customers
- View customer records
- Remove customer records if required

Customer records are used by the Add Invoice page for buyer autocomplete.

## 6. Products

The Products page is used to manage product mappings for invoice item entry.

Product information may include:

- Product name
- HS code
- HS description
- Sales tax rate
- Unit of measurement
- Sale type
- SRO schedule details, if applicable

Correct product mapping helps reduce repeated manual entry during invoice creation.

## 7. Services

The Services page is used to manage service catalog records.

Available actions:

- Add service
- Edit service
- Search services
- View service records

This keeps service-related billing information organized in the portal.

## 8. Create Invoice

The Add Invoice page is used to create and submit invoices.

Basic flow:

1. Open the Invoices section.
2. Click Create Invoice.
3. Confirm seller details are filled from Company Profile.
4. Select or enter buyer details.
5. Add invoice items.
6. Select product mappings where applicable.
7. Review calculated values.
8. Save, submit, or queue the invoice depending on the available action.

Important:

- Make sure seller and buyer details are correct before submission.
- Confirm HS code, sale type, tax rate, and quantity before submitting.
- Failed invoices should be reviewed and corrected before retrying.

## 9. Invoice Registry

The Invoice Registry lists created and submitted invoice records.

Available actions:

- Search invoices
- Filter invoices by status
- View invoice details
- Download invoice PDF
- Review submitted, failed, and draft invoices

Status meanings:

```text
Submitted - Invoice has been accepted or recorded as submitted.
Failed - Invoice submission failed and needs review.
Draft - Invoice is saved but not submitted.
Queued - Invoice is waiting for later submission.
```

## 10. Upload Invoice

The Upload Invoice page supports invoice import workflows where available.

Use this page to:

- Upload invoice files
- Review file format guidance
- Validate uploaded invoice data
- Process invoice rows based on supported templates

If upload fails, check that the file follows the required format.

## 11. Offline Queue

The Offline Queue page shows invoices waiting to be submitted later.

This is useful when:

- FBR connectivity is unavailable.
- The invoice needs to be retried.
- Submission is delayed due to temporary service issues.

Available actions may include:

- View queued invoices
- Review failed queue items
- Retry queue submission
- Check queue status

## 12. Settings

The Settings page controls FBR-related configuration and readiness.

Main areas:

- Active environment
- Sandbox or production mode
- FBR token readiness
- Mock mode status
- Outbound IP information
- Token validation status

Important:

- Sandbox should be used for testing.
- Production should only be used after approval and token setup.
- Token values should only be handled by authorized users.

## 13. Sandbox

The Sandbox page is used for FBR testing and readiness validation.

Use this page to:

- View sandbox scenario status
- Run validation scenarios
- Review pass/fail results
- Track readiness for production approval

Production should not be used until required sandbox testing is complete.

## 14. Staff

The Staff page is used to manage internal staff records.

Available actions:

- Add staff member
- Edit staff member
- Search staff
- View staff details

## 15. Support

The Support page provides help and support information for users.

Use this section when:

- You need help with a portal feature.
- You face an invoice submission issue.
- You need assistance with settings or token readiness.

## 16. Common Issues

Login does not work:

- Check email and password.
- Confirm the internet connection is active.
- Contact the administrator.

Dashboard does not load:

- Refresh the page.
- Confirm backend service is available.
- Try again after a few seconds if the server was inactive.

Invoice submission fails:

- Review required invoice fields.
- Check buyer and seller details.
- Confirm product HS code and tax fields.
- Review the error message shown by the portal.

PDF does not download:

- Make sure popups/downloads are allowed in the browser.
- Try again from the Invoice Registry or Invoice Preview page.

Offline Queue has pending invoices:

- Check internet connectivity.
- Retry submission when service is available.
- Contact support if queue items continue to fail.

## 17. Recommended Usage Notes

- Keep company profile details updated.
- Add customers before creating frequent invoices.
- Add product mappings for commonly used products.
- Review invoice values before submission.
- Use sandbox testing before production use.
- Contact the administrator before changing FBR token settings.

