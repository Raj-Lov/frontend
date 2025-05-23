# API Fallback System

This document explains how to handle API connection issues in the Vetnol frontend application.

## Overview

The frontend application is designed to work with a backend API, but it also includes a fallback mechanism to use mock data when the API is unavailable. This ensures that the application remains functional for development and demonstration purposes even when the backend is not running.

## How It Works

1. The application first attempts to fetch data from the API.
2. If the API request fails, the application automatically falls back to using mock data.
3. Mock data is stored in `src/lib/mockData.ts` and includes sample categories, articles, comments, and users.

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
- `NEXT_PUBLIC_USE_MOCK_DATA`: When set to `true`, the application will always use mock data, bypassing API calls. When set to `false`, the application will attempt to use the API and only fall back to mock data if the API is unavailable.

## Mock Data

Mock data is provided for:

- Categories
- Articles
- Comments
- Users
- Search results

The mock data is structured to match the API response format, ensuring that components work correctly regardless of whether they're using real or mock data.

## Development Workflow

1. **API Available**: Set `NEXT_PUBLIC_USE_MOCK_DATA=false` to use the real API.
2. **API Unavailable**: Set `NEXT_PUBLIC_USE_MOCK_DATA=true` to use mock data.
3. **Mixed Mode**: Leave `NEXT_PUBLIC_USE_MOCK_DATA=false` and the application will automatically fall back to mock data for any API endpoints that fail.

## Customizing Mock Data

You can customize the mock data by editing `src/lib/mockData.ts`. This is useful for testing specific scenarios or adding more sample content.

## Troubleshooting

If you encounter issues with the API connection:

1. Check that the backend API is running at the URL specified in `NEXT_PUBLIC_API_URL`.
2. Verify that CORS is properly configured on the backend to allow requests from the frontend.
3. Check the browser console for specific error messages.
4. If needed, set `NEXT_PUBLIC_USE_MOCK_DATA=true` to bypass API calls and use mock data.

## Production Considerations

In production, you should:

1. Set `NEXT_PUBLIC_USE_MOCK_DATA=false` to ensure the application uses the real API.
2. Implement proper error handling and user feedback for API failures.
3. Consider implementing a more sophisticated caching strategy for API responses.