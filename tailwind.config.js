const defaultTheme = require("tailwindcss/defaultTheme")
const plugin = require("tailwindcss/plugin")
module.exports = {
    content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
    darkMode: false, // or 'media' or 'class'
    theme: {
        customForms: (theme) => ({
            default: {
                radio: {
                    icon: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M7.8335 13.333C10.8711 13.333 13.3335 10.8706 13.3335 7.83301C13.3335 4.79544 10.8711 2.33301 7.8335 2.33301C4.79593 2.33301 2.3335 4.79544 2.3335 7.83301C2.3335 10.8706 4.79593 13.333 7.8335 13.333ZM7.8335 14.333C11.4233 14.333 14.3335 11.4229 14.3335 7.83301C14.3335 4.24316 11.4233 1.33301 7.8335 1.33301C4.24365 1.33301 1.3335 4.24316 1.3335 7.83301C1.3335 11.4229 4.24365 14.333 7.8335 14.333Z" fill="#BDBEC1"/>
                    </svg>
                    `,
                    "&:checked": {
                        icon: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.8335 10.4997C9.30626 10.4997 10.5002 9.30577 10.5002 7.83301C10.5002 6.36025 9.30626 5.16634 7.8335 5.16634C6.36074 5.16634 5.16683 6.36025 5.16683 7.83301C5.16683 9.30577 6.36074 10.4997 7.8335 10.4997Z" fill="#404040"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M14.3335 7.83301C14.3335 11.4229 11.4233 14.333 7.8335 14.333C4.24365 14.333 1.3335 11.4229 1.3335 7.83301C1.3335 4.24316 4.24365 1.33301 7.8335 1.33301C11.4233 1.33301 14.3335 4.24316 14.3335 7.83301ZM13.3335 7.83301C13.3335 10.8706 10.8711 13.333 7.8335 13.333C4.79593 13.333 2.3335 10.8706 2.3335 7.83301C2.3335 4.79544 4.79593 2.33301 7.8335 2.33301C10.8711 2.33301 13.3335 4.79544 13.3335 7.83301Z" fill="#404040"/>
                        </svg>`,
                    },
                },
            },
        }),
        extend: {
            screens: { cs800: "800px", "3xl": "1560px", "4xl": "2160", cs1920: "1900px" },
            dropShadow: { "3xl": "0px 5px 20px rgba(0, 0, 0, 0.25)" },
            colors: {
                myOrange: {
                    primary: "#eda84d",
                    secondary: "#eda84d",
                    DEFAULT: "#eda84d",
                },
            },
            fontFamily: {
                Montserrat: "'Montserrat', sans-serif",
                Rubik: "'Rubik', sans-serif",
                RobotoMono: "'Roboto Mono', monospace",
                IBMPlexSans: "'IBM Plex Sans', sans-serif",
            },
            transitionProperty: {
                width: "width",
                maxWidth: "max-width",
            },
            boxShadow: {
                drawerLeft:
                    "-10px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)",
                drawerRight:
                    "10px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)",
            },
            keyframes: {
                slideRight: {
                    "0%": { maxWidth: 0 },
                    "100%": { maxWidth: "30%" },
                },
                flipInVerleft: {
                    "0%": {
                        transform: "rotateY(80deg)",
                        opacity: 0,
                    },
                    "100%": {
                        transform: "rotateY(0)",
                        opacity: 1,
                    },
                },
            },
            animation: {
                slideRight: "slideRight 0.5s ease-in-out",
                flipInVerleft: "flipInVerleft 0.5s ease-in-out",
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [
        require("@tailwindcss/forms"),
        require("@tailwindcss/line-clamp"),
        require("@tailwindcss/aspect-ratio"),
        require("@tailwindcss/custom-forms"),
    ],
}
