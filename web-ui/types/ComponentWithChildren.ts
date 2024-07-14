export type ComponentWithChildren<T = {}> = Readonly<
  T & {
    children: React.ReactNode
  }
>
