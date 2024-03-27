const MockI18Next = {
  useTranslation: (): { t: (key: string, options?: Record<string, string>) => string } => ({
    t: (key: string, options?: Record<string, string>) => {
      return `${key}${options ? `${Object.values(options).join(' ')}` : ''}`
    },
  }),
}

export const useTranslation = MockI18Next.useTranslation

export default MockI18Next
