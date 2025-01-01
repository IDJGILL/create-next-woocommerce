type DynamicParams = Record<string, string>

type PageProps<TParams extends DynamicParams = DynamicParams> = {
  params: Promise<TParams>
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

type LayoutProps<TParams extends DynamicParams = DynamicParams> = {
  params: Promise<TParams>
  children: React.ReactNode
}

type Remove<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

type Select<T, K extends keyof T> = Pick<T, K>

type SafeSelect<T, K extends keyof T> = T extends undefined ? undefined : T[K]

type Nullish<T> = T | null | undefined

type NonEmptyArray<T> = [T, ...T[]]

type Nullable<T> = T | null
