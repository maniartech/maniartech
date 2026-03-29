# Frontend Integration Guide

This document provides step-by-step instructions for integrating the Price Estimator API into your frontend application, including reCAPTCHA verification and token-based authentication.

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Google reCAPTCHA v3 Setup](#google-recaptcha-v3-setup)
3. [API Overview](#api-overview)
4. [Implementation Steps](#implementation-steps)
5. [Error Handling](#error-handling)
6. [Testing](#testing)
7. [Best Practices](#best-practices)

---

## Prerequisites

Before starting, ensure you have:

- **Google reCAPTCHA v3 Site Key** (from the setup guide)
- **Backend API URL** (Lambda Function URL from AWS)
- **Frontend Framework** (Vue, React, Angular, vanilla JS, etc.)
- **HTTP Client Library** (axios, fetch, etc.)
- **Environment Variables Setup** (.env file in your frontend project)

---

## Google reCAPTCHA v3 Setup

### Step 1: Get Your Site Key

If you haven't already, follow the [reCAPTCHA Setup Guide](./DEPLOYMENT_SETUP.md#google-recaptcha-setup) to create a reCAPTCHA project and obtain your **Site Key**.

### Step 2: Add reCAPTCHA Script to Your HTML

Add this to the `<head>` section of your HTML file or main layout:

```html
<script src="https://www.google.com/recaptcha/api.js"></script>
```

### Step 3: Create a .env File (Frontend)

Create a `.env` or `.env.local` file in your frontend project root:

```env
VITE_API_BASE_URL=https://YOUR_LAMBDA_FUNCTION_URL
VITE_RECAPTCHA_SITE_KEY=YOUR_RECAPTCHA_SITE_KEY_HERE
```

**Note**: Different frameworks have different prefixes:

- **Vite/Nuxt**: `VITE_`
- **Create React App**: `REACT_APP_`
- **Next.js**: no prefix or `NEXT_PUBLIC_`
- **Angular**: use `environment.ts`

---

## API Overview

Your backend exposes two main endpoints:

### 1. POST /api/questions

**Purpose**: Generate clarifying questions based on user input

**Request:**

```json
{
  "file_type": "text", // "text", "pdf", "md", "markdown"
  "text": "string", // Direct text input
  "content": "base64-string", // Base64-encoded file bytes
  "files": [
    // Multiple files (optional)
    {
      "name": "filename.pdf",
      "file_type": "pdf",
      "content": "base64-string"
    }
  ],
  "prompt": "string", // User-provided prompt (optional)
  "recaptcha_token": "string" // reCAPTCHA token from Google
}
```

**Response (200 OK):**

```json
{
  "questions": [
    "What is the scope of the project?",
    "What is your timeline?",
    "Do you need ongoing support?"
  ],
  "estimate_token": "base64url_encoded_opaque_token"
}
```

**Error Response (400/500):**

```json
{
  "error": "reCAPTCHA verification failed"
}
```

---

### 2. POST /api/estimate

**Purpose**: Generate a cost estimate report

**Headers:**

```
Authorization: Bearer {estimate_token}
Content-Type: application/json
```

**Request:**

```json
{
  "file_type": "text",
  "text": "string",
  "content": "base64-string",
  "files": [],
  "answers": {
    "scope": "Value from question 1",
    "timeline": "Value from question 2",
    "support": "Value from question 3"
  }
}
```

**Response (200 OK):**

```json
{
  "total_estimate": 5000,
  "currency": "USD",
  "key_insights": [
    "Project requires experienced designers",
    "Timeline is tight but feasible"
  ],
  "action_items": ["Define branding guidelines", "Set up design system"],
  "cost_breakdown": [
    {
      "category": "Design",
      "estimated_hours": 40,
      "hourly_rate": 75,
      "total": 3000
    },
    {
      "category": "Implementation",
      "estimated_hours": 20,
      "hourly_rate": 100,
      "total": 2000
    }
  ]
}
```

---

## Implementation Steps

### Step 1: Create an API Service Module

Create a file `src/services/estimatorApi.js` (or `.ts` for TypeScript):

```javascript
class EstimatorAPIService {
  constructor(baseUrl, recaptchaSiteKey) {
    this.baseUrl = baseUrl;
    this.recaptchaSiteKey = recaptchaSiteKey;
  }

  /**
   * Get reCAPTCHA token from Google
   */
  async getRecaptchaToken(action = "submit") {
    return new Promise((resolve, reject) => {
      if (!window.grecaptcha) {
        reject(new Error("reCAPTCHA not loaded"));
        return;
      }
      window.grecaptcha.ready(() => {
        window.grecaptcha
          .execute(this.recaptchaSiteKey, { action })
          .then((token) => resolve(token))
          .catch(reject);
      });
    });
  }

  /**
   * Request clarifying questions
   */
  async getQuestions(payload) {
    try {
      // Add reCAPTCHA token to payload
      const recaptchaToken = await this.getRecaptchaToken("questions");
      const fullPayload = {
        ...payload,
        recaptcha_token: recaptchaToken,
      };

      const response = await fetch(`${this.baseUrl}/api/questions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fullPayload),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || `HTTP ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching questions:", error);
      throw error;
    }
  }

  /**
   * Request cost estimate (requires estimate_token from getQuestions)
   */
  async getEstimate(payload, estimateToken) {
    try {
      const response = await fetch(`${this.baseUrl}/api/estimate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${estimateToken}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || `HTTP ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching estimate:", error);
      throw error;
    }
  }
}

export default EstimatorAPIService;
```

### Step 2: Initialize API Service in Your App

**For Vue 3:**

```javascript
// src/main.js
import { createApp } from "vue";
import App from "./App.vue";
import EstimatorAPIService from "./services/estimatorApi";

const app = createApp(App);

const apiService = new EstimatorAPIService(
  import.meta.env.VITE_API_BASE_URL,
  import.meta.env.VITE_RECAPTCHA_SITE_KEY
);

app.provide("estimatorAPI", apiService);
app.mount("#app");
```

**For React:**

```javascript
// src/App.jsx
import { createContext, useContext } from "react";
import EstimatorAPIService from "./services/estimatorApi";

const EstimatorContext = createContext();

export const EstimatorProvider = ({ children }) => {
  const apiService = new EstimatorAPIService(
    process.env.REACT_APP_API_BASE_URL,
    process.env.REACT_APP_RECAPTCHA_SITE_KEY
  );

  return (
    <EstimatorContext.Provider value={apiService}>
      {children}
    </EstimatorContext.Provider>
  );
};

export const useEstimator = () => useContext(EstimatorContext);
```

---

## Error Handling

### Common Errors and Solutions

#### 1. reCAPTCHA Verification Failed (400)

**Cause**: Invalid or expired reCAPTCHA token

**Solution**:

- Verify Site Key matches in `.env`
- Token expires after 2 minutes
- Ensure domain is whitelisted in reCAPTCHA console

```javascript
try {
  const response = await estimatorAPI.getQuestions(payload);
} catch (error) {
  if (error.message.includes("reCAPTCHA")) {
    console.error("Please complete the security check");
    // Retry with new reCAPTCHA token
  }
}
```

#### 2. Unauthorized (401 on /api/estimate)

**Cause**: Missing or invalid Bearer token

**Solution**:

- Ensure `estimate_token` from `/api/questions` is saved
- Token is one-time use; request fresh questions if needed
- Token expires after 10 minutes

```javascript
const estimateToken = sessionStorage.getItem("estimateToken");
if (!estimateToken) {
  error.value = "Session expired. Please upload document again.";
  return;
}
```

#### 3. Network/CORS Errors

**Cause**: Frontend and backend on different origins

**Solution**: Backend handles CORS headers automatically; if still failing:

- Verify API URL is correct
- Check browser console for exact error
- Ensure Lambda Function URL is accessible from your domain

#### 4. File Upload Size Limit

**Cause**: File exceeds Lambda payload limit (~6 MB for synchronous calls)

**Solution**:

```javascript
const maxSizeMB = 5;
if (file.size > maxSizeMB * 1024 * 1024) {
  error.value = `File too large. Maximum ${maxSizeMB}MB`;
  return;
}
```

---

## Testing

### Manual Testing with cURL

```bash
# Step 1: Get questions
curl -X POST https://YOUR_API_URL/api/questions \
  -H "Content-Type: application/json" \
  -d '{
    "file_type": "text",
    "text": "Need a website built",
    "recaptcha_token": "test_token_here",
    "prompt": ""
  }' | jq .

# Save the estimate_token from response, then:

# Step 2: Get estimate
curl -X POST https://YOUR_API_URL/api/estimate \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ESTIMATE_TOKEN_HERE" \
  -d '{
    "file_type": "text",
    "text": "Need a website built",
    "answers": {"scope": "E-commerce", "timeline": "3 months"}
  }' | jq .
```

### Automated Testing with Jest/Vitest

```javascript
// __tests__/estimatorAPI.test.js
import { describe, it, expect, beforeEach, vi } from "vitest";
import EstimatorAPIService from "../services/estimatorApi";

describe("EstimatorAPIService", () => {
  let service;

  beforeEach(() => {
    service = new EstimatorAPIService("http://localhost:3001", "test_site_key");
    global.fetch = vi.fn();
  });

  it("should fetch questions with reCAPTCHA token", async () => {
    global.grecaptcha = {
      ready: (cb) => cb(),
      execute: vi.fn().mockResolvedValue("mock_token"),
    };

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        questions: ["Q1", "Q2"],
        estimate_token: "token123",
      }),
    });

    const result = await service.getQuestions({
      file_type: "text",
      text: "test",
    });

    expect(result.questions).toEqual(["Q1", "Q2"]);
    expect(result.estimate_token).toBe("token123");
  });

  it("should include Bearer token in estimate request", async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        total_estimate: 5000,
        currency: "USD",
        key_insights: [],
        action_items: [],
        cost_breakdown: [],
      }),
    });

    await service.getEstimate(
      { file_type: "text", text: "test", answers: {} },
      "token123"
    );

    const callArgs = global.fetch.mock.calls[0];
    expect(callArgs[1].headers.Authorization).toBe("Bearer token123");
  });
});
```

---

## Best Practices

### 1. **Token Management**

```javascript
// ✅ DO: Store token in sessionStorage for single-tab workflow
sessionStorage.setItem("estimateToken", response.estimate_token);

// ❌ DON'T: Store in localStorage (persists across tabs, single-use token risk)
localStorage.setItem("estimateToken", response.estimate_token);
```

### 2. **reCAPTCHA Security**

```javascript
// ✅ DO: Use unique action names
await estimatorAPI.getRecaptchaToken("questions"); // for /api/questions
await estimatorAPI.getRecaptchaToken("estimate"); // for /api/estimate

// ❌ DON'T: Reuse same token for multiple requests
const token = await grecaptcha.execute(siteKey);
await api.getQuestions({ token });
await api.getEstimate({ token }); // Token already used!
```

### 3. **Error Recovery**

```javascript
// ✅ DO: Provide user-friendly error messages
if (error.message.includes("401")) {
  userError = "Your session expired. Please upload a new document.";
}

// ✅ DO: Implement retry logic with exponential backoff
const retryRequest = async (fn, maxRetries = 3) => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (err) {
      if (i === maxRetries - 1) throw err;
      await new Promise((r) => setTimeout(r, Math.pow(2, i) * 1000));
    }
  }
};
```

### 4. **File Handling**

```javascript
// ✅ DO: Validate file type and size before uploading
const validTypes = ["application/pdf", "text/plain", "text/markdown"];
const maxSizeMB = 5;

if (!validTypes.includes(file.type)) {
  throw new Error("Invalid file type. Supported: PDF, TXT, MD");
}
if (file.size > maxSizeMB * 1024 * 1024) {
  throw new Error(`File too large. Maximum ${maxSizeMB}MB`);
}

// ✅ DO: Compress/optimize large files
const compressedContent = await compressFile(file);
```

### 5. **Performance**

```javascript
// ✅ DO: Debounce form submissions
const debouncedSubmit = debounce(submitAnswers, 300);

// ✅ DO: Show loading states
loading.value = true;
try {
  // ...
} finally {
  loading.value = false; // Always clear loading
}

// ✅ DO: Cache API responses if appropriate
const cachedEstimate = sessionStorage.getItem("lastEstimate");
```

---

## Environment Variables Reference

| Variable                  | Example                                     | Required | Notes                        |
| ------------------------- | ------------------------------------------- | -------- | ---------------------------- |
| `VITE_API_BASE_URL`       | `https://xxxxx.lambda-url.us-east-1.on.aws` | Yes      | Backend Lambda Function URL  |
| `VITE_RECAPTCHA_SITE_KEY` | `6Lf0ZM...`                                 | Yes      | Public reCAPTCHA v3 site key |
| `VITE_APP_NAME`           | `Price Estimator`                           | No       | App display name             |
| `VITE_APP_LOGO`           | `/logo.png`                                 | No       | Logo asset path              |

---

## Troubleshooting Checklist

- [ ] reCAPTCHA script loaded in HTML
- [ ] Site Key in .env matches reCAPTCHA admin console
- [ ] API URL points to correct Lambda Function URL
- [ ] `estimate_token` saved after `/api/questions` call
- [ ] Bearer token included in `/api/estimate` Authorization header
- [ ] Token TTL hasn't expired (10 minutes default)
- [ ] File size < 5 MB
- [ ] Supported file types (pdf, txt, md)
- [ ] Check browser console for network errors
- [ ] Check backend CloudWatch logs for 500 errors

---

## Support & Resources

- **reCAPTCHA Documentation**: https://developers.google.com/recaptcha/docs/v3
- **Fetch API**: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
- **Vue 3 Docs**: https://vuejs.org/
- **React Docs**: https://react.dev/
- **Backend Guide**: See `DEPLOYMENT_SETUP.md`

---

## Summary

Your frontend flow:

1. **Upload Step**

   - User selects file + adds optional prompt
   - Frontend gets reCAPTCHA token
   - Call `POST /api/questions` with token
   - Save `estimate_token` from response

2. **Questions Step**

   - Display questions returned from API
   - User answers each question
   - Call `POST /api/estimate` with Bearer token

3. **Result Step**
   - Display estimate breakdown
   - Show key insights and action items
   - Option to download/print/share

By following this guide, your frontend will seamlessly integrate with the Price Estimator API!
