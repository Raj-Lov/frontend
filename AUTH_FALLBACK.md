# Authentication Fallback System

This document explains how to handle authentication issues in the Vetnol frontend application.

## Overview

The frontend application is designed to work with a backend authentication API, but it also includes a fallback mechanism to use mock authentication when the API is unavailable. This ensures that the application remains functional for development and demonstration purposes even when the backend is not running.

## How It Works

1. The application first attempts to authenticate with the API.
2. If the API request fails, the application automatically falls back to using mock authentication.
3. Mock user data is used to simulate a logged-in user.

## Configuration

You can control the fallback behavior using environment variables:

### .env.local

```
# API URL
NEXT_PUBLIC_API_URL=http://localhost:8000

# Use mock data when API is not available
NEXT_PUBLIC_USE_MOCK_DATA=true
```

- `NEXT_PUBLIC_API_URL`: The URL of the backend API.
- `NEXT_PUBLIC_USE_MOCK_DATA`: When set to `true`, the application will always use mock authentication, bypassing API calls. When set to `false`, the application will attempt to use the API and only fall back to mock authentication if the API is unavailable.

## Mock Authentication

The mock authentication system provides:

- Login functionality with any username/password
- User profile data
- Token generation
- Role-based access control

## Login Process

1. Enter any username and password on the login page.
2. The system will create a mock token and user profile.
3. You will be redirected to the dashboard.

## Dashboard Access

The dashboard page checks for authentication and:

1. Redirects to the login page if no token is found
2. Displays user information from the mock data
3. Provides logout functionality

## Troubleshooting

If you encounter issues with authentication:

1. Check that `NEXT_PUBLIC_USE_MOCK_DATA=true` is set in your .env.local file.
2. Make sure you're using the login page to authenticate.
3. Check the browser console for specific error messages.
4. Try clearing your browser's local storage if you're experiencing persistent issues.

## Production Considerations

In production, you should:

1. Set `NEXT_PUBLIC_USE_MOCK_DATA=false` to ensure the application uses the real authentication API.
2. Implement proper error handling and user feedback for authentication failures.
3. Consider implementing a more sophisticated authentication system with refresh tokens and secure storage.