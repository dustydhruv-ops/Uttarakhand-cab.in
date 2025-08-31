/**
 * Utility Functions
 * Common utility functions for DOM manipulation, validation, and helpers
 */

// ==========================================================================
// DOM Utilities
// ==========================================================================

/**
 * Safely select a DOM element
 * @param {string} selector - CSS selector
 * @param {Element} context - Optional context element
 * @returns {Element|null} The selected element or null
 */
function $(selector, context = document) {
    return context.querySelector(selector);
}

/**
 * Safely select multiple DOM elements
 * @param {string} selector - CSS selector
 * @param {Element} context - Optional context element
 * @returns {NodeList} List of selected elements
 */
function $$(selector, context = document) {
    return context.querySelectorAll(selector);
}

/**
 * Add event listener with automatic cleanup
 * @param {Element} element - Target element
 * @param {string} event - Event type
 * @param {Function} handler - Event handler
 * @param {Object} options - Event options
 */
function addEvent(element, event, handler, options = {}) {
    if (!element || typeof handler !== 'function') return;
    element.addEventListener(event, handler, options);
    // Return cleanup function
    return () => element.removeEventListener(event, handler, options);
}

/**
 * Add class to element
 * @param {Element} element - Target element
 * @param {string} className - Class name to add
 */
function addClass(element, className) {
    if (!element || !className) return;
    element.classList.add(className);
}

/**
 * Remove class from element
 * @param {Element} element - Target element
 * @param {string} className - Class name to remove
 */
function removeClass(element, className) {
    if (!element || !className) return;
    element.classList.remove(className);
}

/**
 * Toggle class on element
 * @param {Element} element - Target element
 * @param {string} className - Class name to toggle
 * @returns {boolean} True if class was added, false if removed
 */
function toggleClass(element, className) {
    if (!element || !className) return false;
    return element.classList.toggle(className);
}

/**
 * Check if element has class
 * @param {Element} element - Target element
 * @param {string} className - Class name to check
 * @returns {boolean} True if element has class
 */
function hasClass(element, className) {
    if (!element || !className) return false;
    return element.classList.contains(className);
}

// ==========================================================================
// Validation Utilities
// ==========================================================================

/**
 * Email validation
 * @param {string} email - Email address to validate
 * @returns {boolean} True if valid email
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Check if string is empty or only whitespace
 * @param {string} str - String to check
 * @returns {boolean} True if empty
 */
function isEmpty(str) {
    return !str || str.trim().length === 0;
}

/**
 * Validate required field
 * @param {string} value - Value to validate
 * @param {string} fieldName - Name of the field for error message
 * @returns {Object} Validation result with valid boolean and message
 */
function validateRequired(value, fieldName = 'Field') {
    if (isEmpty(value)) {
        return {
            valid: false,
            message: `${fieldName} is required`
        };
    }
    return { valid: true, message: '' };
}

/**
 * Validate email field
 * @param {string} email - Email to validate
 * @returns {Object} Validation result with valid boolean and message
 */
function validateEmail(email) {
    if (isEmpty(email)) {
        return {
            valid: false,
            message: 'Email is required'
        };
    }
    if (!isValidEmail(email)) {
        return {
            valid: false,
            message: 'Please enter a valid email address'
        };
    }
    return { valid: true, message: '' };
}

/**
 * Validate minimum length
 * @param {string} value - Value to validate
 * @param {number} minLength - Minimum length required
 * @param {string} fieldName - Name of the field for error message
 * @returns {Object} Validation result with valid boolean and message
 */
function validateMinLength(value, minLength, fieldName = 'Field') {
    if (value.trim().length < minLength) {
        return {
            valid: false,
            message: `${fieldName} must be at least ${minLength} characters long`
        };
    }
    return { valid: true, message: '' };
}

// ==========================================================================
// Helper Utilities
// ==========================================================================

/**
 * Debounce function execution
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @param {boolean} immediate - Execute immediately on first call
 * @returns {Function} Debounced function
 */
function debounce(func, wait, immediate = false) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func.apply(this, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(this, args);
    };
}

/**
 * Throttle function execution
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {Function} Throttled function
 */
function throttle(func, limit) {
    let inThrottle;
    return function executedFunction(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Deep clone an object
 * @param {Object} obj - Object to clone
 * @returns {Object} Cloned object
 */
function deepClone(obj) {
    if (obj === null || typeof obj !== 'object') return obj;
    if (obj instanceof Date) return new Date(obj.getTime());
    if (obj instanceof Array) return obj.map(item => deepClone(item));
    if (typeof obj === 'object') {
        const clonedObj = {};
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                clonedObj[key] = deepClone(obj[key]);
            }
        }
        return clonedObj;
    }
}

/**
 * Generate a random ID
 * @param {number} length - Length of the ID
 * @returns {string} Random ID
 */
function generateId(length = 8) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

/**
 * Format date in a readable format
 * @param {Date} date - Date to format
 * @param {Object} options - Intl.DateTimeFormat options
 * @returns {string} Formatted date string
 */
function formatDate(date, options = {}) {
    const defaultOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    const formatOptions = { ...defaultOptions, ...options };
    return new Intl.DateTimeFormat('en-US', formatOptions).format(date);
}

/**
 * Smooth scroll to element
 * @param {Element|string} target - Target element or selector
 * @param {number} offset - Offset from top in pixels
 */
function scrollToElement(target, offset = 0) {
    const element = typeof target === 'string' ? $(target) : target;
    if (!element) return;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;
    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });
}

/**
 * Check if element is in viewport
 * @param {Element} element - Element to check
 * @param {number} threshold - Threshold percentage (0-1)
 * @returns {boolean} True if element is in viewport
 */
function isInViewport(element, threshold = 0) {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const windowWidth = window.innerWidth || document.documentElement.clientWidth;
    const vertInView = (rect.top <= windowHeight * (1 - threshold)) &&
        ((rect.top + rect.height) >= windowHeight * threshold);
    const horInView = (rect.left <= windowWidth * (1 - threshold)) &&
        ((rect.left + rect.width) >= windowWidth * threshold);
    return vertInView && horInView;
}

// ==========================================================================
// Local Storage Utilities
// ==========================================================================

/**
 * Set item in localStorage with error handling
 * @param {string} key - Storage key
 * @param {*} value - Value to store
 * @returns {boolean} True if successful
 */
function setLocalStorage(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch (error) {
        console.warn('Failed to save to localStorage:', error);
        return false;
    }
}

/**
 * Get item from localStorage with error handling
 * @param {string} key - Storage key
 * @param {*} defaultValue - Default value if key doesn't exist
 * @returns {*} Stored value or default value
 */
function getLocalStorage(key, defaultValue = null) {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
        console.warn('Failed to read from localStorage:', error);
        return defaultValue;
    }
}

/**
 * Remove item from localStorage
 * @param {string} key - Storage key
 * @returns {boolean} True if successful
 */
function removeLocalStorage(key) {
    try {
        localStorage.removeItem(key);
        return true;
    } catch (error) {
        console.warn('Failed to remove from localStorage:', error);
        return false;
    }
}

// ==========================================================================
// Export utilities for potential module use
// ==========================================================================

// If running in a module environment, export the utilities
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        $, $$, addEvent, addClass, removeClass, toggleClass, hasClass,
        isValidEmail, isEmpty, validateRequired, validateEmail, validateMinLength,
        debounce, throttle, deepClone, generateId, formatDate, scrollToElement, isInViewport,
        setLocalStorage, getLocalStorage, removeLocalStorage
    };
}
