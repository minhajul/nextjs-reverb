import './globals.css'

const RootLayout = ({ children }) => {
    return (
        <html lang="en">
            <body className="antialiased">{children}</body>
        </html>
    )
}

export const metadata = {
    title: 'Laravel',
}

export default RootLayout
