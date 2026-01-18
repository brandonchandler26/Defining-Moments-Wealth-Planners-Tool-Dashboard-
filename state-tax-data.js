/**
 * State Tax Data - Centralized State Tax Configurations
 * All 50 states + DC tax brackets, rates, and rules for 2026
 * Source: Various state tax authorities
 * Updated: January 2026
 */

const StateTaxData = {
    'AL': {
        name: 'Alabama', type: 'graduated', socialSecurityExempt: true, retirement: { exempt: ['definedBenefit'], partial: { amount: 6000, age: 65, types: ['401k', 'ira'] } }, capitalGains: {
            notes: 'Taxed as ordinary income.'
        }, deductions: { standard: { single: 2500, mfj: 7500, mfs: 3750, hoh: 2500 }, federalTaxDeductible: true }, exemptions: { personal: { single: 1500, mfj: 3000, hoh: 3000, mfs: 1500 }, dependent: { amount: 500 } }, brackets: { single: [{ rate: 0.02, max: 500 }, { rate: 0.04, max: 3000 }, { rate: 0.05, max: Infinity }], mfj: [{ rate: 0.02, max: 1000 }, { rate: 0.04, max: 6000 }, { rate: 0.05, max: Infinity }], }, summary: 'Graduated tax. Standard deduction phases out for higher incomes. Exempts SS & most pensions. Allows deduction for federal taxes paid.'
    },
    'AK': {
        name: 'Alaska', type: 'none', socialSecurityExempt: true, summary: 'No individual income tax.'
    },
    'AZ': {
        name: 'Arizona', type: 'flat', rate: 0.025, socialSecurityExempt: true, retirement: { partial: { amount: 2500, types: ['usCivilService', 'azStateLocalPension'] }, exempt: ['military'] }, capitalGains: {
            deductionRate: 0.25, notes: '25% of net long-term gains are deductible.'
        }, deductions: { federalConformity: true }, summary: 'Flat 2.5% tax. Exempts SS benefits. Conforms to 2026 federal standard deduction ($16,100/$32,200). Offers a 25% deduction for long-term capital gains.'
    },
    'AR': {
        name: 'Arkansas', type: 'graduated', socialSecurityExempt: true, retirement: { partial: { amount: 6000, age: 59.5, types: ['pension', '401k', 'ira'] } }, capitalGains: {
            deductionRate: 0.50, notes: '50% of net long-term gains are deductible.'
        }, deductions: { standard: { single: 2340, mfj: 4680, mfs: 2340, hoh: 2340 } }, credits: { personal: 29, dependent: 29 }, brackets: { all: [{ rate: 0.0, max: 5499 }, { rate: 0.02, max: 10899 }, { rate: 0.03, max: 15599 }, { rate: 0.034, max: 25699 }, { rate: 0.039, max: 92300 }, { rate: 0.039, max: Infinity }] }, summary: 'Graduated tax with a top rate of 3.9%. Exempts SS benefits and offers a $6,000 retirement income exclusion for those 59.5+. 50% of LTCG are deductible.'
    },
    'CA': {
        name: 'California', type: 'graduated', socialSecurityExempt: true, retirement: {
            taxable: true, notes: 'No special exemptions for retirement income.'
        }, capitalGains: {
            notes: 'Taxed as ordinary income, up to 13.3% (including surtax).'
        }, deductions: { standard: { single: 5690, mfj: 11380, mfs: 5690, hoh: 11380 } }, credits: { personal: 168.00, dependent: 460.00 }, brackets: {
            single: [{ rate: 0.01, max: 11051 }, { rate: 0.02, max: 26200 }, { rate: 0.04, max: 41351 }, { rate: 0.06, max: 57402 }, { rate: 0.08, max: 72547 }, { rate: 0.093, max: 370577 }, { rate: 0.103, max: 444688 }, { rate: 0.113, max: 741150 }, { rate: 0.123, max: Infinity }], mfj: [{ rate: 0.01, max: 22102 }, { rate: 0.02, max: 52400 }, { rate: 0.04, max: 82702 }, {
                rate:
                    0.06, max: 114804
            }, { rate: 0.08, max: 145094 }, { rate: 0.093, max: 741154 }, { rate: 0.103, max: 889376 }, { rate: 0.113, max: 1482300 }, { rate: 0.123, max: Infinity }],
        }, surtax: { rate: 0.01, threshold: 1000000, appliesTo: 'taxableIncome' }, summary: 'Highly progressive tax up to 13.3% (including 1% MHSA surtax). Brackets and Standard Deduction indexed ~2.75% for 2026. Exempts SS, but fully taxes retirement income and capital gains.'
    },
    'CO': {
        name: 'Colorado', type: 'flat', rate: 0.044, socialSecurityExempt: false, retirement: { partial: { amount: 24000, age: 65, types: ['pension', '401k', 'ira', 'socialSecurity'] }, notes: 'For age 65+, all federally taxed Social Security is deductible. For ages 55-64, the deduction is $20,000.' }, capitalGains: {
            notes: 'Taxed at the flat 4.40% rate.'
        }, deductions: { federalConformity: true }, summary: 'Flat 4.4% tax. SS is conditionally taxed but fully deductible for those 65+. Conforms to increased 2026 federal standard deduction.'
    },
    'CT': {
        name: 'Connecticut', type: 'graduated', socialSecurityExempt: false, retirement: { partial: { notes: 'SS benefits are fully deductible for those with AGI below $75k (single) / $100k (MFJ). For those above, 75% of benefits are exempt.' } }, capitalGains: {
            notes: 'Taxed at ordinary income rates.'
        }, deductions: { standard: { single: 0 } }, exemptions: { personal: { single: 15000, mfj: 24000, hoh: 19000 } }, brackets: {
            single: [{ rate: 0.02, max: 10000 }, { rate: 0.045, max: 50000 }, { rate: 0.055, max: 100000 }, { rate: 0.06, max: 200000 }, { rate: 0.065, max: 250000 }, { rate: 0.069, max: 500000 }, { rate: 0.0699, max: Infinity }], mfj: [{ rate: 0.02, max: 20000 }, { rate: 0.045, max: 100000 }, { rate: 0.055, max: 200000 }, { rate: 0.06, max: 400000 }, { rate: 0.065, max: 500000 }, {
                rate: 0.069,
                max: 1000000
            }, { rate: 0.0699, max: Infinity }],
        }, summary: 'Graduated tax up to 6.99%. Conditionally taxes SS based on AGI. Withholding suspended on certain lump-sum distributions through 2026.'
    },
    'DE': {
        name: 'Delaware', type: 'graduated', socialSecurityExempt: true, retirement: {
            partial: { amount: 12500, age: 60, types: ['pension', '401k', 'ira'] }, notes: 'Or $2,000 for under 60.'
        }, capitalGains: { notes: 'Taxed as ordinary income.' }, deductions: { standard: { single: 3250, mfj: 6500, mfs: 3250, hoh: 3250 } }, credits: { personal: 110, dependent: 110, age60plus: 110 }, brackets: { all: [{ rate: 0.0, max: 2000 }, { rate: 0.022, max: 5000 }, { rate: 0.039, max: 10000 }, { rate: 0.048, max: 20000 }, { rate: 0.052, max: 25000 }, { rate: 0.0555, max: 60000 }, { rate: 0.066, max: Infinity }] }, summary: 'Graduated tax up to 6.6%. Exempts SS and offers a $12,500 retirement income exclusion for those 60+. Standard deduction is significantly lower than federal.'
    },
    'DC': {
        name: 'District of Columbia', type: 'graduated', socialSecurityExempt: true, retirement: { taxable: true }, capitalGains: {
            notes: 'Taxed as ordinary income.'
        }, deductions: {
            federalConformity: true, notes: 'Decouples from SALT cap.'
        }, brackets: { all: [{ rate: 0.04, max: 10000 }, { rate: 0.06, max: 40000 }, { rate: 0.065, max: 60000 }, { rate: 0.085, max: 250000 }, { rate: 0.0925, max: 500000 }, { rate: 0.0975, max: 1000000 }, { rate: 0.1075, max: Infinity }] }, summary: 'Progressive tax up to 10.75%. Exempts SS but taxes other retirement income. Conforms to federal standard deduction.'
    },
    'FL': {
        name: 'Florida', type: 'none', socialSecurityExempt: true, summary: 'No individual income tax.'
    },
    'GA': {
        name: 'Georgia', type: 'flat', rate: 0.0509, socialSecurityExempt: true, retirement: {
            partial: { amount: 65000, age: 65, types: ['pension', '401k', 'ira', 'capitalGains', 'interest', 'dividends'] }, notes: 'Or $35,000 for ages 62-64.'
        }, capitalGains: {
            notes: 'Taxed at flat rate, but eligible for retirement exclusion.'
        }, deductions: { standard: { single: 12000, mfj: 24000, mfs: 12000, hoh: 12000 } }, exemptions: { personal: { mfj: 20000 }, dependent: { amount: 4000 } }, summary: 'Flat rate reduced to 5.09% for 2026. Exempts SS and offers a very large retirement income exclusion for those 62+. MFJ Personal Exemption increased to $20,000.'
    },
    'HI': {
        name: 'Hawaii', type: 'graduated', socialSecurityExempt: true, retirement: { exempt: ['pension'], taxable: ['401k', 'ira'], notes: 'Employer-funded pensions are exempt. Employee contributions/401k/IRA are taxable.' }, capitalGains: {
            preferentialRate: 0.0725, notes: 'Preferential flat rate of 7.25% for LTCG.'
        }, deductions: {
            standard: { single: 8000, mfj: 16000, mfs: 8000, hoh: 12000 }, notes: 'Increased 2026 statutory standard deduction.'
        }, brackets: {
            single: [{ rate: 0.014, max: 9600 }, { rate: 0.032, max: 19200 }, { rate: 0.055, max: 28800 }, { rate: 0.064, max: 38400 }, { rate: 0.068, max: 57600 }, { rate: 0.072, max: 76800 }, { rate: 0.076, max: 96000 }, { rate: 0.079, max: 115200 }, { rate: 0.0825, max: 175000 }, { rate: 0.09, max: 225000 }, { rate: 0.10, max: 275000 }, { rate: 0.11, max: 325000 }, { rate: 0.11, max: Infinity }], mfj: [{ rate: 0.014, max: 19200 }, { rate: 0.032, max: 38400 }, {
                rate: 0.055, max: 57600
            }, { rate: 0.064, max: 76800 }, { rate: 0.068, max: 115200 }, { rate: 0.072, max: 153600 }, { rate: 0.076, max: 192000 }, { rate: 0.079, max: 230400 }, { rate: 0.0825, max: 350000 }, { rate: 0.09, max: 450000 }, { rate: 0.10, max: 550000 }, { rate: 0.11, max: 650000 }, { rate: 0.11, max: Infinity }],
        }, summary: 'Progressive tax up to 11%. Standard deduction increased for 2026. Exempts SS and most pensions, but taxes 401k/IRA income. Favorable 7.25% capital gains rate.'
    },
    'ID': {
        name: 'Idaho', type: 'flat', rate: 0.053, socialSecurityExempt: true, retirement: {
            partial: {
                amount: 'Varies', age: 65, types: ['publicPension', 'military'], notes: 'Deduction reduced by SS benefits received (not modeled).'
            }
        }, capitalGains: {
            notes: 'Taxed at the flat 5.3% rate.'
        }, deductions: { federalConformity: true }, summary: 'Flat 5.3% tax (target rate). Exempts SS benefits. Conforms to increased 2026 federal standard deduction ($16,100/$32,200).'
    },
    'IL': {
        name: 'Illinois', type: 'flat', rate: 0.0495, socialSecurityExempt: true, retirement: { exempt: ['pension', '401k', 'ira'] }, capitalGains: {
            notes: 'Taxed at the flat 4.95% rate.'
        }, exemptions: {
            personal: { amount: 2925 }, dependent: { amount: 2925 }, notes: 'Phased out at AGI > $500k MFJ / $250k Single (not modeled). Adjusted for inflation.'
        }, summary: 'Flat 4.95% tax. Fully exempts all Social Security and retirement income.'
    },
    'IN': {
        name: 'Indiana', type: 'flat', rate: 0.0295, socialSecurityExempt: true, retirement: { taxable: true }, capitalGains: {
            notes: 'Taxed at the flat 2.95% rate.'
        }, exemptions: { personal: { amount: 1000 }, dependent: { amount: 2500, notes: '$1k standard + $1.5k additional child' } }, localTax: true, summary: 'Flat rate reduced to 2.95% for 2026, plus mandatory county income taxes. Exempts SS but taxes other retirement income.'
    },
    'IA': {
        name: 'Iowa', type: 'flat', rate: 0.038, taxableIncomeBasis: 'federalTaxableIncome', socialSecurityExempt: true, retirement: { exempt: ['pension', '401k', 'ira'], age: 55 }, capitalGains: {
            notes: 'Taxed at the flat 3.8% rate.'
        }, deductions: {
            federalConformity: true, notes: 'Starts with Federal Taxable Income.'
        }, summary: 'Flat 3.8% tax fully implemented for 2026. Starts with federal taxable income. Fully exempts SS and all retirement income for those 55+.'
    },
    'KS': {
        name: 'Kansas', type: 'graduated', socialSecurityExempt: true, retirement: {
            taxable: true, notes: 'Generally taxable, with some exceptions for public pensions.'
        }, capitalGains: { notes: 'Taxed at ordinary income rates.' }, deductions: { standard: { single: 3000, mfj: 7500, mfs: 3750, hoh: 5500 } }, exemptions: { personal: { amount: 2250 }, dependent: { amount: 2250 } }, brackets: { single: [{ rate: 0.052, max: 23000 }, { rate: 0.0558, max: Infinity }], mfj: [{ rate: 0.052, max: 46000 }, { rate: 0.0558, max: Infinity }], }, summary: 'New two-bracket system for 2026 (5.2% and 5.58%). Social Security is now fully exempt for all taxpayers.'
    },
    'KY': {
        name: 'Kentucky', type: 'flat', rate: 0.035, socialSecurityExempt: true, retirement: { partial: { amount: 31110, types: ['pension', '401k', 'ira'] } }, capitalGains: {
            notes: 'Taxed at the flat 3.5% rate.'
        }, deductions: { standard: { single: 3360, mfj: 3360, mfs: 3360, hoh: 3360 } }, localTax: true, summary: 'Rate reduced to 3.5% for 2026. Exempts SS and offers a large $31,110 retirement income exclusion. Widespread local income taxes.'
    },
    'LA': {
        name: 'Louisiana', type: 'flat', rate: 0.030, socialSecurityExempt: true, retirement: { partial: { amount: 12000, age: 65, types: ['pension', '401k', 'ira'] } }, capitalGains: {
            notes: 'Taxed at the flat 3.0% rate.'
        }, deductions: { standard: { single: 12500, mfj: 25000, mfs: 12500, hoh: 25000 }, federalTaxDeductible: true, notes: 'Standard deduction now indexed for inflation starting 2026.' }, summary: 'Flat 3.0% tax. Deductions indexed for 2026. Exempts SS, offers a $12k retirement exclusion for 65+, and allows federal tax deduction.'
    },
    'ME': {
        name: 'Maine', type: 'graduated', socialSecurityExempt: true, retirement: {
            partial: {
                amount: 'Varies', notes: 'Pension deduction up to max SS benefit, reduced by SS received.'
            }
        }, capitalGains: { notes: 'Taxed as ordinary income.' }, deductions: {
            standard: { single: 15300, mfj: 30600 }, notes: '2026 Inflation Adjusted Amounts.'
        }, exemptions: {
            personal: { amount: 5300 }, dependent: { amount: 5300 }, notes: 'Phased out at high income.'
        }, brackets: { single: [{ rate: 0.058, max: 27400 }, { rate: 0.0675, max: 64850 }, { rate: 0.0715, max: Infinity }], mfj: [{ rate: 0.058, max: 54850 }, { rate: 0.0675, max: 129750 }, { rate: 0.0715, max: Infinity }], }, summary: 'Graduated tax up to 7.15%. Brackets and Standard Deduction significantly adjusted for 2026 inflation. Exempts SS.'
    },
    'MD': {
        name: 'Maryland', type: 'graduated', socialSecurityExempt: true, retirement: { partial: { amount: 39500, age: 65, types: ['pension', '401k', 'ira'] } }, capitalGains: {
            notes: 'Taxed as ordinary income.'
        }, deductions: {
            standard: {
                max: 2800, notes: '15% of AGI, min $1,850, max $2,800.'
            }
        }, exemptions: { personal: { amount: 3200 }, dependent: { amount: 3200 } }, brackets: {
            single: [{ rate: 0.02, max: 1000 }, { rate: 0.03, max: 2000 }, { rate: 0.04, max: 3000 }, { rate: 0.0475, max: 100000 }, { rate: 0.05, max: 125000 }, { rate: 0.0525, max: 150000 }, { rate: 0.055, max: 250000 }, { rate: 0.0575, max: Infinity }], mfj: [{ rate: 0.02, max: 1000 }, { rate: 0.03, max: 2000 }, { rate: 0.04, max: 3000 }, { rate: 0.0475, max: 150000 }, { rate: 0.05, max: 175000 }, {
                rate: 0.0525,
                max: 225000
            }, { rate: 0.055, max: 300000 }, { rate: 0.0575, max: Infinity }],
        }, localTax: true, summary: 'Graduated state tax plus mandatory county income tax (enter local taxes separately). Exempts SS and offers a large pension exclusion for 65+.'
    },
    'MA': {
        name: 'Massachusetts', type: 'flat', rate: 0.05, socialSecurityExempt: true, retirement: { exempt: ['publicPension'], taxable: ['401k', 'ira'] }, capitalGains: {
            shortTermRate: 0.085, notes: 'Most LTCG taxed at 5.0%, but STCG taxed at 8.5%.'
        }, deductions: { standard: { single: 0 } }, surtax: { rate: 0.04, threshold: 1110000, appliesTo: 'agi', notes: 'Surtax threshold indexed for 2026.' }, summary: '5% flat tax, plus a 4% surtax on income over ~$1.11 million (indexed). Exempts SS and public pensions. Short-term capital gains taxed at 8.5%.'
    },
    'MI': {
        name: 'Michigan', type: 'flat', rate: 0.0425, socialSecurityExempt: true, retirement: { exempt: ['pension', '401k', 'ira'], notes: 'Retirement income exemption fully phased in for 2026.' }, capitalGains: {
            notes: 'Taxed at the flat 4.25% rate.'
        }, exemptions: { personal: { amount: 5600 }, dependent: { amount: 5600 } }, localTax: true, summary: 'Flat 4.25% tax plus city income taxes. Exempts SS. Retirement income is now fully exempt.'
    },
    'MN': {
        name: 'Minnesota', type: 'graduated', socialSecurityExempt: false, retirement: {
            taxable: true, notes: 'SS benefits are subject to state subtraction based on AGI.'
        }, capitalGains: { notes: 'Taxed as ordinary income.' }, deductions: {
            standard: { single: 15380, mfj: 30765, mfs: 15380, hoh: 23150 }, notes: 'Projected 2026 Inflation adjustment.'
        }, exemptions: {
            dependent: { amount: 5350 }, notes: 'Phase out at high AGI.'
        }, brackets: { single: [{ rate: 0.0535, max: 24475 }, { rate: 0.068, max: 97250 }, { rate: 0.0785, max: 169800 }, { rate: 0.0985, max: Infinity }], mfj: [{ rate: 0.0535, max: 48950 }, { rate: 0.068, max: 194500 }, { rate: 0.0785, max: 339600 }, { rate: 0.0985, max: Infinity }], }, summary: 'Progressive tax up to 9.85%. Brackets and deductions indexed ~2.8% for 2026. Social Security and retirement income are conditionally taxable.'
    },
    'MS': {
        name: 'Mississippi', type: 'flat', rate: 0.040, socialSecurityExempt: true, retirement: { exempt: ['pension', '401k', 'ira'] }, capitalGains: {
            notes: 'Taxed at the flat rate.'
        }, deductions: { standard: { single: 2300, mfj: 4600, mfs: 2300, hoh: 3400 } }, exemptions: { personal: { single: 6000, mfj: 12000, hoh: 8000 }, dependent: { amount: 1500 } }, brackets: { all: [{ rate: 0.0, max: 10000 }, { rate: 0.040, max: Infinity }] }, summary: 'Rate reduced to 4.0% for 2026 (applies to income over $10k). Fully exempts all SS and retirement income.'
    },
    'MO': {
        name: 'Missouri', type: 'graduated', socialSecurityExempt: true, retirement: { partial: { notes: 'Public pension deduction available. Private pension deduction phased out by AGI.' } }, capitalGains: {
            notes: 'Taxed as ordinary income.'
        }, deductions: { federalConformity: true, federalTaxDeductible: true, federalTaxDeductibleCap: { single: 5000, mfj: 10000 } }, brackets: { all: [{ rate: 0.0, max: 1000 }, { rate: 0.02, max: 2000 }, { rate: 0.03, max: 3000 }, { rate: 0.04, max: 4000 }, { rate: 0.045, max: 5000 }, { rate: 0.048, max: Infinity }] }, summary: 'Graduated tax. SS is fully exempt. Conforms to increased 2026 federal standard deduction ($16,100/$32,200) and allows limited deduction for federal taxes paid.'
    },
    'MT': {
        name: 'Montana', type: 'graduated', taxableIncomeBasis: 'federalTaxableIncome', socialSecurityExempt: false, retirement: {
            partial: { amount: 5500, age: 65, types: ['pension', '401k', 'ira'] }, notes: 'SS is partially taxable based on federal rules and AGI thresholds.'
        }, capitalGains: {
            preferentialBrackets: true, notes: 'Preferential rates of 3.0% and 4.1% (modeled using ordinary brackets).'
        }, deductions: {
            federalConformity: true, notes: 'Starts with Federal Taxable Income.'
        }, brackets: { single: [{ rate: 0.047, max: 47500 }, { rate: 0.0565, max: Infinity }], mfj: [{ rate: 0.047, max: 95000 }, { rate: 0.0565, max: Infinity }], }, summary: 'Simplified two-bracket system for 2026 (4.7% and 5.65%). Starts with federal taxable income.'
    },
    'NE': {
        name: 'Nebraska', type: 'graduated', socialSecurityExempt: true, retirement: { taxable: true }, capitalGains: {
            notes: 'Taxed as ordinary income.'
        }, deductions: { standard: { single: 16100, mfj: 32200 }, notes: 'Conforms to 2026 Federal Standard Deduction.' }, brackets: { single: [{ rate: 0.0246, max: 2999 }, { rate: 0.0351, max: 17999 }, { rate: 0.0501, max: 28999 }, { rate: 0.0520, max: Infinity }], mfj: [{ rate: 0.0246, max: 5999 }, { rate: 0.0351, max: 35999 }, { rate: 0.0501, max: 57999 }, { rate: 0.0520, max: Infinity }], }, summary: 'Graduated tax system. Social Security benefits are fully exempt. Conforms to federal standard deduction.'
    },
    'NV': {
        name: 'Nevada', type: 'none', socialSecurityExempt: true, summary: 'No individual income tax.'
    },
    'NH': {
        name: 'New Hampshire', type: 'none', socialSecurityExempt: true, summary: 'No individual income tax (Interest & Dividends Tax fully repealed for 2026).'
    },
    'NJ': {
        name: 'New Jersey', type: 'graduated', socialSecurityExempt: true, retirement: { partial: { amount: 100000, age: 62, types: ['pension', '401k', 'ira'], notes: 'For MFJ with AGI < $150k.' } }, capitalGains: {
            notes: 'Taxed as ordinary income.'
        }, deductions: { standard: { single: 0 } }, exemptions: { personal: { amount: 1000 }, dependent: { amount: 1500 } }, brackets: {
            single: [{ rate: 0.014, max: 20000 }, { rate: 0.0175, max: 35000 }, { rate: 0.035, max: 40000 }, { rate: 0.05525, max: 75000 }, { rate: 0.0637, max: 500000 }, { rate: 0.0897, max: 1000000 }, { rate: 0.1075, max: Infinity }], mfj: [{ rate: 0.014, max: 20000 }, { rate: 0.0175, max: 50000 }, { rate: 0.035, max: 70000 }, { rate: 0.05525, max: 80000 }, { rate: 0.0637, max: 150000 }, {
                rate:
                    0.0897, max: 1000000
            }, { rate: 0.1075, max: Infinity }],
        }, summary: 'Graduated tax up to 10.75%. Exempts SS and offers a very large retirement income exclusion for most retirees.'
    },
    'NM': {
        name: 'New Mexico', type: 'graduated', socialSecurityExempt: false, retirement: {
            taxable: true, notes: 'SS benefits are deductible for most, with a full deduction available for single filers up to $100k AGI and joint filers up to $150k AGI.'
        }, capitalGains: {
            notes: 'Deduction of up to $2,500 for gains from a NM business.'
        }, deductions: { federalConformity: true }, brackets: { single: [{ rate: 0.017, max: 5500 }, { rate: 0.032, max: 11000 }, { rate: 0.047, max: 16000 }, { rate: 0.049, max: 210000 }, { rate: 0.059, max: Infinity }], mfj: [{ rate: 0.017, max: 8000 }, { rate: 0.032, max: 16000 }, { rate: 0.047, max: 24000 }, { rate: 0.049, max: 315000 }, { rate: 0.059, max: Infinity }], }, summary: 'Graduated tax up to 5.9%. SS is conditionally taxed, but exempt for most via high AGI thresholds. Conforms to increased 2026 federal standard deduction ($16,100/$32,200).'
    },
    'NY': {
        name: 'New York', type: 'graduated', socialSecurityExempt: true, retirement: { partial: { amount: 20000, age: 59.5, types: ['privatePension', '401k', 'ira'] }, exempt: ['publicPension'] }, capitalGains: {
            notes: 'Taxed as ordinary income.'
        }, deductions: { standard: { single: 8000, mfj: 16050, mfs: 8000, hoh: 11200 }, notes: 'Does not conform to federal increases.' }, localTax: true, brackets: {
            single: [{ rate: 0.04, max: 8500 }, { rate: 0.045, max: 11700 }, { rate: 0.0525, max: 13900 }, { rate: 0.0585, max: 80650 }, { rate: 0.0625, max: 215400 }, { rate: 0.0685, max: 1077550 }, { rate: 0.0965, max: 5000000 }, { rate: 0.103, max: 25000000 }, { rate: 0.109, max: Infinity }], mfj: [{ rate: 0.04, max: 17150 }, { rate: 0.045, max: 23600 }, { rate: 0.0525, max: 27900 }, { rate: 0.0585, max: 161550 }, {
                rate: 0.0625, max: 323200
            }, { rate: 0.0685, max: 2155350 }, { rate: 0.0965, max: 5000000 }, { rate: 0.103, max: 25000000 }, { rate: 0.109, max: Infinity }],
        }, summary: 'Highly progressive state tax plus NYC/Yonkers local tax. Exempts SS and public pensions, with a $20k exclusion for private retirement income. Standard deduction is decoupled from federal.'
    },
    'NC': {
        name: 'North Carolina', type: 'flat', rate: 0.0399, socialSecurityExempt: true, retirement: {
            taxable: true, notes: 'Fully taxable unless it qualifies for the limited "Bailey" exclusion.'
        }, capitalGains: {
            notes: 'Taxed at the flat 3.99% rate.'
        }, deductions: { standard: { single: 12750, mfj: 25500, mfs: 12750, hoh: 19125 }, notes: 'Fixed state standard deduction (decoupled from federal).' }, summary: 'Flat 3.99% tax for 2026. Exempts SS. Uses fixed state standard deduction (does not conform to federal).'
    },
    'ND': {
        name: 'North Dakota', type: 'graduated', socialSecurityExempt: true, retirement: { taxable: true }, capitalGains: {
            notes: 'Taxed as ordinary income.'
        }, deductions: { federalConformity: true }, brackets: { single: [{ rate: 0.0, max: 48475 }, { rate: 0.0195, max: 103350 }, { rate: 0.0227, max: 250525 }, { rate: 0.025, max: Infinity }], mfj: [{ rate: 0.0, max: 96950 }, { rate: 0.0195, max: 206700 }, { rate: 0.0227, max: 501050 }, { rate: 0.025, max: Infinity }], }, summary: 'Extremely low rates (0% to 2.5%). Exempts SS. Conforms to increased 2026 federal standard deduction ($16,100/$32,200).'
    },
    'OH': {
        name: 'Ohio', type: 'flat', rate: 0.0275, socialSecurityExempt: true, retirement: { taxable: true }, capitalGains: {
            notes: 'Taxed as ordinary income.'
        }, exemptions: { personal: { amount: 2400 }, dependent: { amount: 2400 }, notes: 'Income under $26,050 is effectively exempt (0% bracket).' }, localTax: true, brackets: { all: [{ rate: 0.0, max: 26050 }, { rate: 0.0275, max: Infinity }], }, summary: 'Flat 2.75% tax for 2026. Income under $26,050 is exempt. Widespread and mandatory city income taxes.'
    },
    'OK': {
        name: 'Oklahoma', type: 'graduated', socialSecurityExempt: true, retirement: { partial: { amount: 10000, types: ['pension', '401k', 'ira'] } }, capitalGains: {
            notes: 'Taxed as ordinary income.'
        }, deductions: { standard: { single: 6350, mfj: 12700, mfs: 6350, hoh: 9350 } }, exemptions: { personal: { amount: 1000 }, dependent: { amount: 1000 } }, brackets: {
            single: [{ rate: 0.005, max: 1000 }, { rate: 0.01, max: 2500 }, { rate: 0.02, max: 3750 }, { rate: 0.03, max: 4900 }, { rate: 0.04, max: 7200 }, { rate: 0.0475, max: Infinity }], mfj: [{ rate: 0.005, max: 2000 }, { rate: 0.01, max: 5000 }, { rate: 0.02, max: 7500 }, { rate: 0.03, max: 9800 }, { rate: 0.04, max: 12200 }, {
                rate:
                    0.0475, max: Infinity
            }],
        }, summary: 'Graduated tax up to 4.75%. Exempts SS and offers a $10,000 retirement income exclusion.'
    },
    'OR': {
        name: 'Oregon', type: 'graduated', socialSecurityExempt: true, retirement: {
            taxable: true, notes: 'Limited credit available for some pension income.'
        }, capitalGains: { notes: 'Taxed as ordinary income.' }, deductions: {
            federalConformity: true, notes: 'Decouples from SALT cap. Metro tax threshold indexed to $128k(S)/$205k(J).'
        }, brackets: { single: [{ rate: 0.0475, max: 4450 }, { rate: 0.0675, max: 11200 }, { rate: 0.0875, max: 125000 }, { rate: 0.099, max: Infinity }], mfj: [{ rate: 0.0475, max: 8900 }, { rate: 0.0675, max: 22400 }, { rate: 0.0875, max: 250000 }, { rate: 0.099, max: Infinity }], }, summary: 'Graduated tax up to 9.9%. Exempts SS. Conforms to increased 2026 federal standard deduction ($16,100/$32,200).'
    },
    'PA': {
        name: 'Pennsylvania', type: 'flat', rate: 0.0307, socialSecurityExempt: true, retirement: { exempt: ['pension', '401k', 'ira'], age: 59.5 }, capitalGains: {
            notes: 'Taxed at the flat 3.07% rate.'
        }, localTax: true, summary: 'Flat 3.07% tax plus local income taxes. Exempts SS. All retirement income is exempt for those 59.5+.'
    },
    'RI': {
        name: 'Rhode Island', type: 'graduated', socialSecurityExempt: false, retirement: { partial: { amount: 20000, types: ['pension', '401k', 'ira'], notes: 'For taxpayers who have reached FRA. Phased out by AGI > ~$283k.' } }, capitalGains: {
            notes: 'Taxed as ordinary income.'
        }, deductions: { federalConformity: true }, brackets: { all: [{ rate: 0.0375, max: 73450 }, { rate: 0.0475, max: 166950 }, { rate: 0.0599, max: Infinity }], }, summary: 'Graduated tax up to 5.99%. SS is conditionally taxed based on AGI. Offers a $20,000 retirement income exclusion for those at FRA, subject to AGI phase-out.'
    },
    'SC': {
        name: 'South Carolina', type: 'graduated', socialSecurityExempt: true, retirement: {
            partial: { amount: 10000, age: 65, types: ['pension', '401k', 'ira'] }, notes: 'Plus a separate $15,000 general deduction for 65+.'
        }, capitalGains: {
            deductionRate: 0.44, notes: '44% of net long-term gains are deductible.'
        }, brackets: { all: [{ rate: 0.0, max: 3710 }, { rate: 0.03, max: 18590 }, { rate: 0.06, max: Infinity }], }, summary: 'Top marginal rate reduced to 6.0% for 2026. Exempts SS, offers retirement deductions, and a large 44% deduction for long-term capital gains.'
    },
    'SD': {
        name: 'South Dakota', type: 'none', socialSecurityExempt: true, summary: 'No individual income tax.'
    },
    'TN': {
        name: 'Tennessee', type: 'none', socialSecurityExempt: true, summary: 'No individual income tax.'
    },
    'TX': {
        name: 'Texas', type: 'none', socialSecurityExempt: true, summary: 'No individual income tax.'
    },
    'UT': {
        name: 'Utah', type: 'flat', rate: 0.045, socialSecurityExempt: false, retirement: {
            taxable: true, notes: 'Social Security is taxable, but a nonrefundable tax credit is available.'
        }, capitalGains: {
            notes: 'Taxed at the flat 4.5% rate.'
        }, credits: {
            notes: 'Offers a non-refundable credit to offset tax on Social Security for certain taxpayers.'
        }, summary: 'Flat rate reduced to 4.5% for 2026. SS is conditionally taxed, but a credit is available for many retirees.'
    },
    'VT': {
        name: 'Vermont', type: 'graduated', socialSecurityExempt: false, retirement: {
            taxable: true, notes: 'SS is conditionally taxed, with a full exemption for AGI below $50k (single) / $65k (joint) that phases out.'
        }, capitalGains: { notes: 'Taxed as ordinary income.' }, deductions: { standard: { single: 7150, mfj: 14350, hoh: 10750 } }, brackets: { single: [{ rate: 0.0335, max: 48475 }, { rate: 0.066, max: 103350 }, { rate: 0.076, max: 250525 }, { rate: 0.0875, max: Infinity }], mfj: [{ rate: 0.0335, max: 96950 }, { rate: 0.066, max: 206700 }, { rate: 0.076, max: 315550 }, { rate: 0.0875, max: Infinity }], }, summary: 'Graduated tax up to 8.75%. Brackets indexed. SS is taxed based on AGI thresholds.'
    },
    'VA': {
        name: 'Virginia', type: 'graduated', socialSecurityExempt: true, retirement: { partial: { amount: 12000, age: 65, types: ['pension', '401k', 'ira'] } }, capitalGains: {
            notes: 'Taxed as ordinary income.'
        }, deductions: { standard: { single: 8750, mfj: 17500 } }, exemptions: { personal: { amount: 930 }, dependent: { amount: 930 } }, brackets: { all: [{ rate: 0.02, max: 3000 }, { rate: 0.03, max: 5000 }, { rate: 0.05, max: 17000 }, { rate: 0.0575, max: Infinity }], }, summary: 'Graduated tax up to 5.75%. Standard deduction increased to $8,750(S)/$17,500(J) for 2026. Exempts SS and offers a $12,000 retirement income deduction for those 65+.'
    },
    'WA': {
        name: 'Washington', type: 'capitalGainsOnly', socialSecurityExempt: true, capitalGains: {
            rate: 0.07, threshold: 270000, notes: '7% tax on long-term capital gains over an inflation-adjusted threshold (approx $270k).'
        }, summary: 'No general income tax, but a 7% tax on long-term capital gains exceeding ~$270k. New 0.5% surcharge on income over $250M.'
    },
    'WV': {
        name: 'West Virginia', type: 'graduated', socialSecurityExempt: true, retirement: {
            partial: { amount: 8000, types: ['pension', '401k', 'ira'] }, notes: 'SS is 100% exempt for 2026.'
        }, capitalGains: {
            notes: 'Taxed as ordinary income.'
        }, brackets: { single: [{ rate: 0.0236, max: 10000 }, { rate: 0.0315, max: 25000 }, { rate: 0.0354, max: 40000 }, { rate: 0.0472, max: 60000 }, { rate: 0.0482, max: Infinity }], mfj: [{ rate: 0.0236, max: 10000 }, { rate: 0.0315, max: 25000 }, { rate: 0.0354, max: 40000 }, { rate: 0.0472, max: 60000 }, { rate: 0.0482, max: Infinity }], }, summary: 'Top rate projected to decrease to 4.82% for 2026. Social Security is now 100% exempt. Also offers an $8,000 retirement income deduction.'
    },
    'WI': {
        name: 'Wisconsin', type: 'graduated', socialSecurityExempt: true, retirement: {
            partial: {
                amount: 5000, age: 65, types: ['pension', '401k', 'ira'], notes: 'For AGI below $15k Single / $30k MFJ.'
            }
        }, capitalGains: {
            deductionRate: 0.30, notes: '30% of net long-term gains are deductible.'
        }, deductions: { standard: { single: 13860, mfj: 25690, mfs: 12190, hoh: 17870 }, notes: 'Indexed for inflation.' }, brackets: { single: [{ rate: 0.035, max: 14320 }, { rate: 0.044, max: 28640 }, { rate: 0.053, max: 315340 }, { rate: 0.0765, max: Infinity }], mfj: [{ rate: 0.035, max: 19090 }, { rate: 0.044, max: 38190 }, { rate: 0.053, max: 420420 }, { rate: 0.0765, max: Infinity }], }, summary: 'Graduated tax up to 7.65%. Exempts SS and offers a 30% deduction for long-term capital gains.'
    },
    'WY': { name: 'Wyoming', type: 'none', socialSecurityExempt: true, summary: 'No individual income tax.' },
};

/**
 * Safe accessor for state tax data with fallback
 * Returns default 'none' tax structure if state not found
 * @param {string} stateCode - Two-letter state code (e.g., 'CA', 'TX')
 * @returns {object} State tax data or fallback
 */
function getStateTaxData(stateCode) {
    const code = (stateCode || '').toUpperCase().trim();

    if (StateTaxData[code]) {
        return StateTaxData[code];
    }

    // Log warning for invalid state code
    console.warn(`StateTaxData: Unknown state code "${stateCode}" - using no-tax fallback`);

    // Return safe fallback (no income tax state)
    return {
        name: 'Unknown State',
        type: 'none',
        socialSecurityExempt: true,
        summary: 'State not found - no tax calculated. Please select a valid state.'
    };
}

// Make available globally
if (typeof window !== 'undefined') {
    window.StateTaxData = StateTaxData;
    window.getStateTaxData = getStateTaxData;
}
