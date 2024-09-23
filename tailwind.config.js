/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "image-backdrop": " linear-gradient(0deg, rgba(51,52,52,1) 0%, rgba(6,4,0,1) 100%);",
        "nav-gradient": "linear-gradient(90deg, rgba(68,41,2,1) 1%, rgba(6,1,1,1) 5%, rgba(10,1,1,1) 95%, rgba(99,1,1,1) 100%);",
        "fitness": " radial-gradient(circle, rgba(95,13,17,1) 34%, rgba(20,17,17,1) 80%);"
      },
      colors: {
        customGradient: '#000',
        darkColor: "#000",
        darkTexts: "linear-gradient(90deg, rgba(108,44,3,0.9724264705882353) 0%, rgba(6,1,1,1) 9%, rgba(6,1,1,1) 17%, rgba(8,4,2,1) 87%, rgba(32,6,2,1) 91%, rgba(138,15,5,1) 100%, rgba(252,90,69,1) 100%);"
      },
    },
  },
  plugins: [],
}
