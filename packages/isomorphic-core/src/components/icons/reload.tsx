export default function ReloadIcon({
    ...props
  }: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path fill={props.color || "#91def5"} d="M9.45247 0.25H12.5475C14.3865 0.249991 15.8308 0.249983 16.9694 0.378599C18.1316 0.509878 19.074 0.78362 19.8574 1.40229C20.0919 1.58749 20.3093 1.79205 20.507 2.0138C21.6189 3.26097 21.726 4.99379 21.7462 7.49392C21.7496 7.90812 21.4165 8.24662 21.0023 8.24998C20.5881 8.25333 20.2496 7.92028 20.2463 7.50608C20.2441 7.23878 20.2405 6.98716 20.2349 6.75H1.76458C1.75033 7.39612 1.75 8.13785 1.75 9C1.75 10.7886 1.75143 12.0589 1.87558 13.0324C1.99708 13.9852 2.22599 14.5543 2.61262 14.988C2.7517 15.144 2.90545 15.2888 3.07229 15.4205C3.54359 15.7927 4.16816 16.0144 5.19895 16.1309C6.24353 16.2489 7.60311 16.25 9.5 16.25H11.5C11.9142 16.25 12.25 16.5858 12.25 17C12.25 17.4142 11.9142 17.75 11.5 17.75H9.45246C7.61345 17.75 6.16917 17.75 5.03058 17.6214C3.86842 17.4901 2.926 17.2164 2.14263 16.5977C1.90811 16.4125 1.69068 16.2079 1.49298 15.9862C0.826807 15.239 0.529322 14.3333 0.387626 13.2222C0.249975 12.1427 0.249986 10.7768 0.25 9.05274V8.94727C0.249986 7.22326 0.249975 5.85727 0.387626 4.77785C0.529322 3.66669 0.826807 2.76101 1.49298 2.0138C1.69068 1.79205 1.90811 1.58749 2.14263 1.40229C2.926 0.78362 3.86842 0.509878 5.03058 0.378599C6.16917 0.249983 7.61345 0.249991 9.45247 0.25ZM1.84374 5.25H20.155C20.0466 4.14221 19.8238 3.50155 19.3874 3.012C19.2483 2.856 19.0946 2.71122 18.9277 2.57946C18.4564 2.20725 17.8318 1.98556 16.8011 1.86912C15.7565 1.75112 14.3969 1.75 12.5 1.75H9.5C7.60311 1.75 6.24353 1.75112 5.19895 1.86912C4.16816 1.98556 3.54359 2.20725 3.07229 2.57946C2.90545 2.71122 2.7517 2.856 2.61262 3.012C2.22599 3.44566 1.99708 4.01479 1.87558 4.96759C1.86391 5.05905 1.85333 5.15312 1.84374 5.25Z"/>
            
            <path fill={props.color || "#91def5"} d="M17.5 9.25C17.9142 9.25 18.25 9.58579 18.25 10V12.75H21C21.4142 12.75 21.75 13.0858 21.75 13.5C21.75 13.9142 21.4142 14.25 21 14.25H18.25V17C18.25 17.4142 17.9142 17.75 17.5 17.75C17.0858 17.75 16.75 17.4142 16.75 17V14.25H14C13.5858 14.25 13.25 13.9142 13.25 13.5C13.25 13.0858 13.5858 12.75 14 12.75H16.75V10C16.75 9.58579 17.0858 9.25 17.5 9.25Z"/>
        </svg>
    );
  }
  