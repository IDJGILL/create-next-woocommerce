import { Theme } from "@radix-ui/themes"
import { ThemeProvider as NextThemeProvider } from "next-themes"

export default function ThemeProvider({ ...props }: React.HTMLAttributes<HTMLElement>) {
  const {} = props

  return (
    <NextThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <Theme accentColor="blue" radius="medium" hasBackground={false}>
        {props.children}
      </Theme>
    </NextThemeProvider>
  )
}
