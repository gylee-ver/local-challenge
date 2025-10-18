import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import { WalletProvider } from "@/lib/wallet-context"
import { LeagueProvider } from "@/lib/league-context"
import { IntroVideo } from "@/components/intro-video"
import "./globals.css"

export const metadata: Metadata = {
  title: "NH 로컬챌린지",
  description: "지역이 키운다, 청년이 만든다. 우리 동네 가게를 응원하고 리워드를 받아보세요.",
  generator: "v0.app",
  openGraph: {
    title: "NH 로컬챌린지",
    description: "지역이 키운다, 청년이 만든다. 우리 동네 가게를 응원하고 리워드를 받아보세요.",
    images: ["/local-og.png"],
    type: "website",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: "NH 로컬챌린지",
    description: "지역이 키운다, 청년이 만든다. 우리 동네 가게를 응원하고 리워드를 받아보세요.",
    images: ["/local-og.png"],
  },
  icons: {
    icon: "/local-favicon.ico",
    apple: "/local-favicon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css"
        />
      </head>
      <body className="font-pretendard antialiased">
        <WalletProvider>
          <LeagueProvider>
            <IntroVideo />
            {children}
            <Analytics />
          </LeagueProvider>
        </WalletProvider>
      </body>
    </html>
  )
}
