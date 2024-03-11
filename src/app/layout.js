import Header from './components/Header';

export const metadata = {
  title: 'My app',
  description: 'Generated by create next app',
}
export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <script src="https://apis.google.com/js/platform.js" async defer></script>
        <meta name="google-signin-client_id" content="168168387862-iqhvspre972b2ols23km8nmrkie70hrd.apps.googleusercontent.com" />
        <style>
          {`
            body, #__next {
              background: #FFECEC;
              margin: 0;
              padding: 0;
            }
          `}
        </style>
      </head>
      <body>
        <Header />
        {children}
      </body>
    </html>
  )
}