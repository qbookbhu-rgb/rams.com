import type { SVGProps } from "react"

export function GoogleIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48px" height="48px" {...props}>
      <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
      <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
      <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.222,0-9.519-3.487-11.187-8.166l-6.571,4.819C9.656,39.663,16.318,44,24,44z"/>
      <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574l6.19,5.238C39.99,35.936,44,30.417,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
    </svg>
  )
}

export function QrCodeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      shapeRendering="crispEdges"
      {...props}
    >
      <path fill="#000000" d="M0 0h100v100H0z" />
      <path fill="#FFFFFF" d="M10 10h10v10H10zM20 10h10v10H20zM30 10h10v10H30zM50 10h10v10H50zM70 10h10v10H70zM80 10h10v10H80zM10 20h10v10H10zM30 20h10v10H30zM50 20h10v10H50zM70 20h10v10H70zM80 20h10v10H80zM10 30h10v10H10zM20 30h10v10H20zM30 30h10v10H30zM50 30h10v10H50zM70 30h10v10H70zM80 30h10v10H80zM10 40h10v10H10zM20 40h10v10H20zM30 40h10v10H30zM50 40h10v10H50zM60 40h10v10H60zM80 40h10v10H80zM10 50h10v10H10zM30 50h10v10H30zM70 50h10v10H70zM80 50h10v10H80zM10 60h10v10H10zM20 60h10v10H20zM30 60h10v10H30zM50 60h10v10H50zM80 60h10v10H80zM10 70h10v10H10zM30 70h10v10H30zM50 70h10v10H50zM60 70h10v10H60zM70 70h10v10H70zM80 70h10v10H80zM10 80h10v10H10zM20 80h10v10H20zM30 80h10v10H30zM50 80h10v10H50zM60 80h10v10H60zM70 80h10v10H70zM80 80h10v10H80z"/>
    </svg>
  );
}

export function BotIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 8V4H8" />
      <rect width="16" height="12" x="4" y="8" rx="2" />
      <path d="M2 14h2" />
      <path d="M20 14h2" />
      <path d="M15 13v2" />
      <path d="M9 13v2" />
    </svg>
  )
}
