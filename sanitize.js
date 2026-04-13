/**
 * WIB — Input Sanitisation Utilities
 * Provides safe HTML escaping and input validation helpers used by
 * all public-facing forms (reviews, enquiries, contact).
 */

/**
 * Escapes a value so it is safe to inject into HTML innerHTML.
 * Always call this on user-supplied data before rendering.
 */
function escapeHtml(val) {
  if (val === null || val === undefined) return '';
  return String(val)
    .replace(/&/g,  '&amp;')
    .replace(/</g,  '&lt;')
    .replace(/>/g,  '&gt;')
    .replace(/"/g,  '&quot;')
    .replace(/'/g,  '&#x27;');
}

/**
 * Sanitises a plain-text field (strips tags, trims whitespace).
 * Use for names, titles, short text.
 */
function sanitizeText(val, maxLen) {
  if (!val) return '';
  var s = String(val).replace(/<[^>]*>/g, '').trim();
  if (maxLen && s.length > maxLen) s = s.slice(0, maxLen);
  return s;
}

/**
 * Validates an email address (basic RFC 5322 check).
 */
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(email).trim());
}

/**
 * Validates a 10-digit Indian phone number.
 */
function isValidPhone(phone) {
  return /^[6-9]\d{9}$/.test(String(phone).replace(/[\s\-\(\)]/g, ''));
}

/**
 * Validates and sanitises review form inputs.
 * Returns { ok: true } or { ok: false, error: 'message' }.
 */
function validateReview(name, email, text, rating) {
  name  = sanitizeText(name,  100);
  email = sanitizeText(email, 200).toLowerCase();
  text  = sanitizeText(text, 2000);

  if (!name)               return { ok: false, error: 'Please enter your name.' };
  if (!isValidEmail(email)) return { ok: false, error: 'Please enter a valid email.' };
  if (!rating || rating < 1 || rating > 5)
                           return { ok: false, error: 'Please select a rating (1–5 stars).' };

  return { ok: true, name: name, email: email, text: text, rating: Number(rating) };
}

/**
 * Validates and sanitises enquiry form inputs.
 * Returns { ok: true } or { ok: false, error: 'message' }.
 */
function validateEnquiry(parentName, parentEmail, parentPhone) {
  parentName  = sanitizeText(parentName,  100);
  parentEmail = sanitizeText(parentEmail, 200).toLowerCase();
  parentPhone = sanitizeText(parentPhone,  20);

  if (!parentName)               return { ok: false, error: 'Please enter your name.' };
  if (!isValidEmail(parentEmail)) return { ok: false, error: 'Please enter a valid email address.' };
  if (parentPhone && !isValidPhone(parentPhone))
                                 return { ok: false, error: 'Please enter a valid 10-digit phone number.' };

  return { ok: true, parentName: parentName, parentEmail: parentEmail, parentPhone: parentPhone };
}
