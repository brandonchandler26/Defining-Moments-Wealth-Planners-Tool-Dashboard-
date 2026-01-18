/**
 * Global State Manager for Financial Dashboard
 * Handles cross-tool communication via localStorage + postMessage
 * Version 2.0 - Unified storage with legacy migration
 */

const GlobalStateManager = {
    STORAGE_KEY: 'financialDashboard_globalState',
    // Legacy keys to migrate from (will be cleaned up after migration)
    LEGACY_PROFILE_KEY: 'dm_client_profile_v1',

    // Income type definitions
    INCOME_TYPES: {
        'w2': { name: 'W-2 Wages', hasFICA: true, has401k: true },
        'w2_bonus': { name: 'W-2 Bonus/Commission', hasFICA: true, has401k: true },
        '1099r_pension': { name: '1099-R Pension', hasFICA: false, has401k: false },
        '1099r_ira': { name: '1099-R IRA Distribution', hasFICA: false, has401k: false },
        'ssa_1099': { name: 'Social Security (SSA-1099)', hasFICA: false, has401k: false },
        '1099_div': { name: '1099-DIV Dividends', hasFICA: false, has401k: false },
        '1099_int': { name: '1099-INT Interest', hasFICA: false, has401k: false },
        '1099_nec': { name: '1099-NEC Self-Employment', hasFICA: false, has401k: false, hasSETax: true },
        'k1': { name: 'K-1 Partnership/S-Corp', hasFICA: false, has401k: false },
        'rental': { name: 'Rental Income', hasFICA: false, has401k: false },
        'deferred_comp': { name: 'Deferred Compensation', hasFICA: false, has401k: false },
        'other': { name: 'Other Income', hasFICA: false, has401k: false }
    },

    // Asset account type definitions
    ASSET_TYPES: {
        // Retirement - Pre-Tax
        '401k': { name: '401(k)', category: 'retirement', taxType: 'preTax' },
        '403b': { name: '403(b)', category: 'retirement', taxType: 'preTax' },
        '457b': { name: '457(b)', category: 'retirement', taxType: 'preTax' },
        'trad_ira': { name: 'Traditional IRA', category: 'retirement', taxType: 'preTax' },
        'sep_ira': { name: 'SEP IRA', category: 'retirement', taxType: 'preTax' },
        'simple_ira': { name: 'SIMPLE IRA', category: 'retirement', taxType: 'preTax' },
        'rollover_ira': { name: 'Rollover IRA', category: 'retirement', taxType: 'preTax' },
        'inherited_ira': { name: 'Inherited IRA', category: 'retirement', taxType: 'preTax' },
        'pension_db': { name: 'Pension (DB)', category: 'retirement', taxType: 'preTax' },
        'annuity': { name: 'Annuity', category: 'retirement', taxType: 'preTax' },
        // Retirement - Roth
        'roth_ira': { name: 'Roth IRA', category: 'retirement', taxType: 'roth' },
        'roth_401k': { name: 'Roth 401(k)', category: 'retirement', taxType: 'roth' },
        // Investment
        'taxable_ind': { name: 'Individual Taxable', category: 'investment', taxType: 'taxable' },
        'taxable_joint': { name: 'Joint Taxable', category: 'investment', taxType: 'taxable' },
        'trust': { name: 'Trust', category: 'investment', taxType: 'taxable' },
        // Cash & Savings
        'savings': { name: 'Savings/Checking', category: 'cash', taxType: 'taxable' },
        'hsa': { name: 'HSA', category: 'cash', taxType: 'hsa' },
        '529': { name: '529 Plan', category: 'cash', taxType: 'taxFree' },
        // Real Estate & Other
        'primary_home': { name: 'Primary Residence', category: 'property', taxType: 'property' },
        'investment_property': { name: 'Investment Property', category: 'property', taxType: 'property' },
        'other_real_estate': { name: 'Other Real Estate', category: 'property', taxType: 'property' },
        'business_equity': { name: 'Business Equity', category: 'other', taxType: 'other' },
        'other': { name: 'Other Assets', category: 'other', taxType: 'other' }
    },

    // Liability type definitions
    LIABILITY_TYPES: {
        'mortgage': { name: 'Mortgage (Primary)' },
        'mortgage_inv': { name: 'Mortgage (Investment)' },
        'auto': { name: 'Auto Loan' },
        'student': { name: 'Student Loan' },
        'heloc': { name: 'Home Equity LOC' },
        'credit_card': { name: 'Credit Cards' },
        'other': { name: 'Other Liabilities' }
    },

    // Default state structure
    defaultState: {
        client1: {
            name: '',
            dob: null,
            age: 60,
            retirementAge: 65,
            lifeExpectancy: 95
        },
        client2: {
            enabled: false,
            name: '',
            dob: null,
            age: 58,
            retirementAge: 65,
            lifeExpectancy: 95
        },
        filingStatus: 'mfj',
        state: 'MO',
        // Income sources array (dynamic list)
        incomeSources: [],
        // Asset accounts array (dynamic list)
        assets: [],
        // Liabilities array (dynamic list)
        liabilities: [],
        // Legacy portfolio totals (computed from assets)
        portfolio: {
            preTax: 0,
            roth: 0,
            taxable: 0,
            cash: 0
        },
        socialSecurity: {
            client1FRA: 0,
            client1ClaimAge: 67,
            client2FRA: 0,
            client2ClaimAge: 67
        },
        spending: {
            essential: 60000,
            discretionary: 30000,
            healthcarePre: 18000,
            healthcarePost: 8000
        },
        lastUpdated: null
    },

    /**
     * Initialize state manager
     */
    init: function () {
        // Migrate any legacy data first
        this.migrateLegacyData();

        // Listen for storage changes from other tabs/tools
        window.addEventListener('storage', (e) => {
            if (e.key === this.STORAGE_KEY) {
                this.notifyListeners(JSON.parse(e.newValue));
            }
        });

        // Listen for postMessage from parent/child frames
        window.addEventListener('message', (e) => {
            if (e.data && e.data.type === 'STATE_UPDATE') {
                this.setState(e.data.payload, false);
            }
            if (e.data && e.data.type === 'STATE_REQUEST') {
                this.broadcastState();
            }
            if (e.data && e.data.type === 'PROFILE_UPDATED') {
                this.setState(e.data.payload, false);
            }
        });

        this.listeners = [];
        return this;
    },

    /**
     * Migrate data from legacy storage keys
     */
    migrateLegacyData: function () {
        try {
            // Check for old dm_client_profile_v1 data
            const legacyProfile = localStorage.getItem(this.LEGACY_PROFILE_KEY);
            if (legacyProfile) {
                const legacy = JSON.parse(legacyProfile);
                const currentState = this.getState();

                // Only migrate if we don't have data already
                if (!currentState.client1?.name && legacy.personal?.name) {
                    const migrated = {
                        client1: {
                            name: legacy.personal?.name || '',
                            salary: legacy.income?.salary || 0
                        },
                        filingStatus: legacy.personal?.filingStatus || 'mfj',
                        portfolio: {
                            preTax: legacy.assets?.trad || 0,
                            roth: legacy.assets?.roth || 0,
                            taxable: legacy.assets?.taxable || 0
                        },
                        socialSecurity: {
                            client1FRA: legacy.income?.ss || 0
                        }
                    };

                    // If birthYear exists, calculate DOB (Jan 1)
                    if (legacy.personal?.birthYear) {
                        migrated.client1.dob = legacy.personal.birthYear + '-01-01';
                        migrated.client1.age = this.calculateAge(migrated.client1.dob);
                    }

                    this.setState(migrated, false);
                    console.log('GlobalStateManager: Migrated legacy profile data');
                }

                // Clean up legacy key
                localStorage.removeItem(this.LEGACY_PROFILE_KEY);
            }
        } catch (e) {
            console.error('GlobalStateManager: Legacy migration failed:', e);
        }
    },

    /**
     * Calculate age from date of birth (timezone-aware)
     */
    calculateAge: function (dob) {
        if (!dob) return null;
        // Parse date parts to avoid timezone issues
        const parts = String(dob).split('-');
        if (parts.length !== 3) return null;
        const birthYear = parseInt(parts[0], 10);
        const birthMonth = parseInt(parts[1], 10) - 1; // JS months are 0-indexed
        const birthDay = parseInt(parts[2], 10);
        if (isNaN(birthYear) || isNaN(birthMonth) || isNaN(birthDay)) return null;

        const today = new Date();
        let age = today.getFullYear() - birthYear;
        const monthDiff = today.getMonth() - birthMonth;
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDay)) {
            age--;
        }
        return Math.max(0, age); // Ensure non-negative
    },

    /**
     * Get current state
     */
    getState: function () {
        try {
            const stored = localStorage.getItem(this.STORAGE_KEY);
            if (stored) {
                return { ...this.defaultState, ...JSON.parse(stored) };
            }
        } catch (e) {
            console.error('GlobalStateManager: Failed to load state:', e);
        }
        return { ...this.defaultState };
    },

    /**
     * Set state (partial update)
     */
    setState: function (updates, broadcast) {
        broadcast = broadcast !== false;
        const currentState = this.getState();
        const newState = this.deepMerge(currentState, updates);
        newState.lastUpdated = new Date().toISOString();

        try {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(newState));
        } catch (e) {
            console.error('CRITICAL: Failed to save state:', e);
            // Show prominent error banner immediately
            if (typeof window !== 'undefined' && typeof document !== 'undefined') {
                // Remove any existing error banner
                const existing = document.getElementById('storage-error-banner');
                if (existing) existing.remove();

                // Create prominent error banner
                const banner = document.createElement('div');
                banner.id = 'storage-error-banner';
                banner.style.cssText = 'position:fixed;top:0;left:0;right:0;background:#dc2626;color:white;padding:12px 20px;z-index:99999;font-family:sans-serif;font-size:14px;display:flex;justify-content:space-between;align-items:center;box-shadow:0 4px 12px rgba(0,0,0,0.3);';
                banner.innerHTML = `
                    <span>⚠️ <strong>Cannot save data!</strong> Browser storage may be full. Export your work immediately to avoid data loss.</span>
                    <button onclick="this.parentElement.remove()" style="background:white;color:#dc2626;border:none;padding:4px 12px;border-radius:4px;cursor:pointer;font-weight:bold;">Dismiss</button>
                `;
                document.body.prepend(banner);

                // Also dispatch event for any listeners
                const event = new CustomEvent('storageError', {
                    detail: { message: 'Failed to save data. Storage may be full.', error: e }
                });
                window.dispatchEvent(event);
            }
        }

        if (broadcast) {
            this.broadcastState(newState);
        }

        this.notifyListeners(newState);
        return newState;
    },

    /**
     * Deep merge objects with type validation
     */
    deepMerge: function (target, source) {
        if (!source || typeof source !== 'object') return target;
        const result = { ...target };
        for (const key in source) {
            if (!Object.prototype.hasOwnProperty.call(source, key)) continue;
            const sourceVal = source[key];
            const targetVal = target[key];

            // Type-safe merge: preserve array/object types from target when possible
            if (Array.isArray(targetVal) && !Array.isArray(sourceVal) && sourceVal !== null && sourceVal !== undefined) {
                console.warn(`deepMerge: Skipping invalid type for '${key}' (expected array)`);
                continue; // Don't overwrite array with non-array
            }
            if (sourceVal && typeof sourceVal === 'object' && !Array.isArray(sourceVal)) {
                result[key] = this.deepMerge(targetVal || {}, sourceVal);
            } else {
                result[key] = sourceVal;
            }
        }
        return result;
    },

    /**
     * Broadcast state to parent/child frames (same-origin only for security)
     */
    broadcastState: function (state) {
        state = state || this.getState();
        const message = { type: 'STATE_UPDATE', payload: state };
        const targetOrigin = window.location.origin;

        // To parent (same origin only)
        if (window.parent !== window) {
            try {
                window.parent.postMessage(message, targetOrigin);
            } catch (e) { /* Cross-origin parent, skip */ }
        }

        // To all iframes (same origin only)
        const iframes = document.querySelectorAll('iframe');
        iframes.forEach(iframe => {
            try {
                iframe.contentWindow.postMessage(message, targetOrigin);
            } catch (e) { /* Cross-origin iframe, skip */ }
        });
    },

    /**
     * Request state from parent (same-origin only)
     */
    requestState: function () {
        if (window.parent !== window) {
            try {
                window.parent.postMessage({ type: 'STATE_REQUEST' }, window.location.origin);
            } catch (e) { /* Cross-origin parent, skip */ }
        }
    },

    /**
     * Subscribe to state changes
     */
    subscribe: function (callback) {
        this.listeners.push(callback);
        return () => {
            this.listeners = this.listeners.filter(l => l !== callback);
        };
    },

    /**
     * Notify all listeners
     */
    notifyListeners: function (state) {
        this.listeners.forEach(callback => {
            try {
                callback(state);
            } catch (e) {
                console.warn('Listener error:', e);
            }
        });
    },

    /**
     * Get client profile (alias for getState for backwards compatibility)
     */
    getProfile: function () {
        return this.getState();
    },

    /**
     * Save client profile (alias for setState for backwards compatibility)
     */
    saveProfile: function (profile) {
        this.setState(profile);
    },

    /**
     * Clear all data
     */
    clearAll: function () {
        localStorage.removeItem(this.STORAGE_KEY);
        localStorage.removeItem(this.LEGACY_PROFILE_KEY);
        this.notifyListeners(this.defaultState);
    },

    /**
     * Get current year for calculations
     */
    getCurrentYear: function () {
        return new Date().getFullYear();
    },

    /**
     * Get birth year from DOB
     */
    getBirthYear: function (clientNum) {
        const state = this.getState();
        const client = clientNum === 2 ? state.client2 : state.client1;
        if (client?.dob) {
            return new Date(client.dob).getFullYear();
        }
        // Fallback: calculate from age
        if (client?.age) {
            return this.getCurrentYear() - client.age;
        }
        return null;
    },

    /**
     * Hydrate form fields from state
     */
    hydrateForm: function (fieldMap) {
        const state = this.getState();
        for (const [fieldId, statePath] of Object.entries(fieldMap)) {
            const element = document.getElementById(fieldId);
            if (!element) continue;

            const value = this.getNestedValue(state, statePath);
            if (value !== undefined && value !== null) {
                if (element.type === 'checkbox') {
                    element.checked = !!value;
                } else {
                    element.value = value;
                }
            }
        }
    },

    /**
     * Get nested value from object path
     */
    getNestedValue: function (obj, path) {
        return path.split('.').reduce((current, key) => {
            return current && current[key] !== undefined ? current[key] : undefined;
        }, obj);
    },

    /**
     * Watch form fields and update state
     */
    watchForm: function (fieldMap) {
        for (const [fieldId, statePath] of Object.entries(fieldMap)) {
            const element = document.getElementById(fieldId);
            if (!element) continue;

            element.addEventListener('change', () => {
                const value = element.type === 'checkbox' ? element.checked :
                    element.type === 'number' ? parseFloat(element.value) : element.value;

                const update = {};
                const keys = statePath.split('.');
                let current = update;
                for (let i = 0; i < keys.length - 1; i++) {
                    current[keys[i]] = {};
                    current = current[keys[i]];
                }
                current[keys[keys.length - 1]] = value;

                this.setState(update);
            });
        }
    },

    /**
     * Compute portfolio totals from assets array
     */
    getPortfolioTotals: function () {
        const state = this.getState();
        const assets = state.assets || [];
        const totals = { preTax: 0, roth: 0, taxable: 0, cash: 0, property: 0, other: 0, total: 0 };

        assets.forEach(asset => {
            const typeDef = this.ASSET_TYPES[asset.type];
            if (!typeDef) return;
            const balance = parseFloat(asset.balance) || 0;

            if (typeDef.taxType === 'preTax') totals.preTax += balance;
            else if (typeDef.taxType === 'roth') totals.roth += balance;
            else if (typeDef.taxType === 'taxable' || typeDef.taxType === 'hsa' || typeDef.taxType === 'taxFree') totals.taxable += balance;
            else if (typeDef.taxType === 'property') totals.property += balance;
            else totals.other += balance;

            totals.total += balance;
        });

        return totals;
    },

    /**
     * Compute total annual income from sources
     */
    getTotalIncome: function () {
        const state = this.getState();
        const sources = state.incomeSources || [];
        let total = 0;

        sources.forEach(source => {
            total += parseFloat(source.amount) || 0;
        });

        return total;
    },

    /**
     * Compute total liabilities
     */
    getTotalLiabilities: function () {
        const state = this.getState();
        const liabilities = state.liabilities || [];
        let total = 0;

        liabilities.forEach(liability => {
            total += parseFloat(liability.balance) || 0;
        });

        return total;
    },

    /**
     * Compute net worth (assets - liabilities)
     */
    getNetWorth: function () {
        return this.getPortfolioTotals().total - this.getTotalLiabilities();
    },

    /**
     * Get client names for personalized labels
     * Falls back to "Client 1/2" if names not set
     */
    getClientNames: function () {
        const state = this.getState();
        const name1 = state.client1?.name || '';
        const name2 = state.client2?.name || '';
        return {
            client1: name1 || 'Client 1',
            client2: name2 || 'Client 2',
            joint: (name1 && name2) ? `${name1} & ${name2}` : 'Joint',
            // Short versions for compact displays
            c1Short: name1 || 'C1',
            c2Short: name2 || 'C2'
        };
    },

    /**
     * Generate unique ID for list items (cryptographically strong)
     */
    generateId: function () {
        // Use crypto.randomUUID if available (modern browsers)
        if (typeof crypto !== 'undefined' && crypto.randomUUID) {
            return crypto.randomUUID();
        }
        // Fallback: timestamp + strong random component
        const timestamp = Date.now().toString(36);
        const randomPart = (typeof crypto !== 'undefined' && crypto.getRandomValues)
            ? Array.from(crypto.getRandomValues(new Uint8Array(8)))
                .map(b => b.toString(16).padStart(2, '0')).join('')
            : Math.random().toString(36).substr(2, 16);
        return `${timestamp}-${randomPart}`;
    }
};

// Auto-initialize
GlobalStateManager.init();

// Make available globally
if (typeof window !== 'undefined') {
    window.GlobalStateManager = GlobalStateManager;
}
