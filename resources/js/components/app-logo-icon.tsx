import type { SVGAttributes } from 'react';

export default function AppLogoIcon(props: SVGAttributes<SVGElement>) {
    return (
        <svg {...props} viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
            <rect width="40" height="40" rx="12" className="fill-primary" />
            <path
                d="M26 13C24.5 11.5 22.5 10.5 20 10.5C14.75 10.5 10.5 14.75 10.5 20C10.5 25.25 14.75 29.5 20 29.5C22.5 29.5 24.5 28.5 26 27L23 24C22.25 24.75 21.25 25.25 20 25.25C17.1 25.25 14.75 22.9 14.75 20C14.75 17.1 17.1 14.75 20 14.75C21.25 14.75 22.25 15.25 23 16L26 13Z"
                fill="white"
            />
        </svg>
    );
}
