export function encodeBase64Modern(str) {
	if (str) {
		return btoa(String.fromCharCode(...new TextEncoder().encode(str)))
	}
	return str
}

export function decodeBase64Modern(base64Str) {
	if (base64Str) {
		return new TextDecoder().decode(Uint8Array.from(atob(base64Str), c => c.charCodeAt(0)))
	}
	return base64Str
}