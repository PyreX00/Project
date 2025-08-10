'use server'

import { cookies } from "next/headers";

export async function handleRefresh() {
    try {
        const refreshToken = await getRefreshToken();
        
        if (!refreshToken) {
            console.log('No refresh token available');
            await resetAuthCookies();
            return null;
        }

        const response = await fetch('http://localhost:8000/api/auth/token/refresh/', {
            method: 'POST',
            body: JSON.stringify({
                refresh: refreshToken
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            console.log('Refresh token request failed:', response.status);
            await resetAuthCookies();
            return null;
        }

        const json = await response.json();
        console.log("Response - Refresh", json);

        if (json.access) {
            // Set the new access token
            (await cookies()).set('session_access_token', json.access, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 60 * 60, // 1 hour
                path: '/'
            });

            return json.access;
        } else {
            console.log('No access token in refresh response');
            await resetAuthCookies();
            return null;
        }
    } catch (error) {
        console.log('Error in handleRefresh:', error);
        await resetAuthCookies();
        return null;
    }
}

export async function handleLogin(userId: string, accessToken: string, refreshToken: string) {
    try {
        (await cookies()).set('session_userid', userId, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 7, // 7 days
            path: '/'
        });

        (await cookies()).set('session_access_token', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60, // 1 hour
            path: '/'
        });

        (await cookies()).set('session_refresh_token', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 7, // 7 days
            path: '/'
        });

        console.log('Login cookies set successfully');
    } catch (error) {
        console.error('Error setting login cookies:', error);
        throw error;
    }
}

export async function resetAuthCookies() {
    try {
        const cookieStore = await cookies();
        
        // Delete cookies by setting them with past expiration
        cookieStore.delete('session_userid');
        cookieStore.delete('session_access_token');
        cookieStore.delete('session_refresh_token');
        
        console.log('Auth cookies reset');
    } catch (error) {
        console.error('Error resetting cookies:', error);
    }
}

// Get data functions
export async function getUserId() {
    try {
        const userId = (await cookies()).get('session_userid')?.value;
        return userId || null;
    } catch (error) {
        console.error('Error getting user ID:', error);
        return null;
    }
}

// FIXED: Remove automatic refresh to prevent infinite loop
export async function getAccessToken() {
    try {
        const accessToken = (await cookies()).get('session_access_token')?.value;
        return accessToken || null;
    } catch (error) {
        console.error('Error getting access token:', error);
        return null;
    }
}

export async function getRefreshToken() {
    try {
        const refreshToken = (await cookies()).get('session_refresh_token')?.value;
        return refreshToken || null;
    } catch (error) {
        console.error('Error getting refresh token:', error);
        return null;
    }
}

// FIXED: Better authentication check
export async function isAuthenticated() {
    const userId = await getUserId();
    const accessToken = await getAccessToken();
    const refreshToken = await getRefreshToken();
    
    // User is authenticated if they have userId and either access token OR refresh token
    return !!(userId && (accessToken || refreshToken));
}

// NEW: Function to get access token with refresh fallback
export async function getValidAccessToken() {
    try {
        // First try to get existing access token
        let accessToken = await getAccessToken();
        
        if (accessToken) {
            return accessToken;
        }
        
        // If no access token, try to refresh (only if we have a refresh token)
        const refreshToken = await getRefreshToken();
        if (refreshToken) {
            console.log('No access token found, attempting refresh...');
            accessToken = await handleRefresh();
            return accessToken;
        }
        
        // No tokens available
        console.log('No tokens available for authentication');
        return null;
    } catch (error) {
        console.error('Error getting valid access token:', error);
        return null;
    }
}