// Define the Spotify authorization URL
export const AUTH_URL =
  `https://accounts.spotify.com/authorize?client_id=60e38dde15b847ddb34db989a19e4c97
  &response_type=code
  &redirect_uri=http://localhost:5173/callback
  &scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`;

// Generates a code verifier for PKCE
export function generateCodeVerifier(length = 128) {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
    return Array.from(crypto.getRandomValues(new Uint8Array(length)))
        .map((byte) => possible[byte % possible.length])
        .join('');
}

// Generates a code challenge based on the verifier
export async function generateCodeChallenge(codeVerifier) {
    const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(codeVerifier));
    return btoa(String.fromCharCode(...new Uint8Array(digest)))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}

// Redirects user to Spotify's authorization page
export async function redirectToAuthCodeFlow(clientId) {
    const verifier = generateCodeVerifier();
    const challenge = await generateCodeChallenge(verifier);
    localStorage.setItem('verifier', verifier);

    const params = new URLSearchParams({
        client_id: clientId,
        response_type: 'code',
        redirect_uri: 'http://localhost:5173/callback',
        scope: 'playlist-read-private playlist-read-collaborative',
        code_challenge_method: 'S256',
        code_challenge: challenge,
    });

    window.location.href = `https://accounts.spotify.com/authorize?${params}`;
}

// Exchanges authorization code for an access token
export async function getAccessToken(clientId, code) {
    const verifier = localStorage.getItem('verifier');
    const params = new URLSearchParams({
        client_id: clientId,
        grant_type: 'authorization_code',
        code,
        redirect_uri: 'http://localhost:5173/callback',
        code_verifier: verifier,
    });

    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString(),
    });

    const data = await response.json();
    localStorage.setItem('accessToken', data.access_token);
    localStorage.setItem('refreshToken', data.refresh_token);
    localStorage.setItem('expiresIn', Date.now() + data.expires_in * 1000); // Store expiry time
}

// Refreshes the access token using a refresh token
export async function refreshAccessToken(clientId) {
    const refreshToken = localStorage.getItem('refreshToken');
    const params = new URLSearchParams({
        client_id: clientId,
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
    });

    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString(),
    });

    const data = await response.json();
    localStorage.setItem('accessToken', data.access_token);
    localStorage.setItem('expiresIn', Date.now() + data.expires_in * 1000); // Update expiry time
}

// Clears the stored tokens
export function clearTokens() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('expiresIn');
}
