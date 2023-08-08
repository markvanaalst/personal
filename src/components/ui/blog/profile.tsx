import Image from 'next/image'

const Profile = () => {
  return (
    <div className="w-full max-w-xs p-4 mt-4 mb-8 overflow-hidden bg-theme-bg-alt text-theme-text ">
      <Image
        className="mx-auto border rounded-full"
        src="/images/mva_profile.webp"
        alt="avatar"
        width={112}
        height={112}
      />

      <div className="p-5 text-center">
        <a href="#" className="block text-xl font-bold" role="link">
          Mark van Aalst
        </a>
        <span className="text-xs text-theme-text">
          Focussing on developer experience and developer relations
        </span>
      </div>

      <div className="items-center w-full gap-3 p-4 text-center sm:gap-x-5">
        <button className="bg-theme-bg dark:border-theme-border dark:hover:bg-theme-bg-alt rounded-lg duration-300 transition-colors border px-8 py-2.5">
          <a href="https://twitter.com/markvanaalst">
            <svg
              width="24"
              height="24"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="#98A2B3"
                stroke="none"
                d="M459.37 151.72c.33 4.54.33 9.1.33 13.64 0 138.72-105.59 298.56-298.56 298.56-59.45 0-114.68-17.22-161.14-47.1 8.45.97 16.57 1.3 25.34 1.3 49.05 0 94.21-16.58 130.27-44.84a105.12 105.12 0 01-98.1-72.77c6.49.97 12.99 1.62 19.81 1.62 9.42 0 18.84-1.3 27.61-3.57A104.95 104.95 0 0120.8 195.57v-1.3a105.68 105.68 0 0047.43 13.32 104.86 104.86 0 01-46.78-87.39c0-19.49 5.2-37.36 14.3-52.95a298.27 298.27 0 00216.36 109.8c-1.62-7.8-2.6-15.91-2.6-24.03 0-57.83 46.78-104.94 104.94-104.94 30.2 0 57.5 12.67 76.67 33.14a206.6 206.6 0 0066.6-25.34 104.65 104.65 0 01-46.14 57.83c21.12-2.28 41.59-8.13 60.43-16.25a225.57 225.57 0 01-52.63 54.26z"
              ></path>
            </svg>
            <span className="sr-only">Link to Twitter profile</span>
          </a>
        </button>

        <button className="bg-theme-bg dark:border-theme-border dark:hover:bg-theme-bg-alt rounded-lg duration-300 transition-colors border px-8 py-2.5">
          <a href="https://www.linkedin.com/in/markvanaalst">
            <svg
              width="19"
              height="22"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path
                fill="#98A2B3"
                stroke="none"
                d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"
              ></path>
            </svg>
            <span className="sr-only">Link to LinkedIn</span>
          </a>
        </button>
      </div>
    </div>
  )
}

export default Profile
