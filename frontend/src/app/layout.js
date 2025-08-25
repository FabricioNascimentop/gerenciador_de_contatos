import '../../public/output.css'
export default function RootLayout({ children }) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body>
        {children}
      </body>
    </html>
  );
}
