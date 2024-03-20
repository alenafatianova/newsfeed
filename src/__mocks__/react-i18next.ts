const MockI18Next = {
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}

export const useTranslation = MockI18Next.useTranslation

export default MockI18Next
