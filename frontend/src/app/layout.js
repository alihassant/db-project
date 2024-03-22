// add bootstrap css
import "bootstrap/dist/css/bootstrap.css";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.12.0/css/all.css"
        /> */}
      </head>
      {/* <body className={inter.className}>{children}</body> */}
      <body>
        <div className="bg-light overflow-hidden min-vh-100">
          <div>{children}</div>
        </div>
      </body>
    </html>
  );
}
