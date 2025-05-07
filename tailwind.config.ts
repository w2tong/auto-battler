/** @type {import('tailwindcss').Config} */
module.exports = {
    theme: {
        extend: {
            colors: {
                'health': '#16a34a',
                'health-bg': '#450a0a',

                'mana': '#2563eb',
                'mana-bg': '#374151',

                tier: {
                    0: '#9d9d9d',
                    1: '#ffffff',
                    2: '#1eff00',
                    3: '#0070dd',
                    4: '#a335ee',
                    5: '#ff8000'
                }
            },
        }
    }
};