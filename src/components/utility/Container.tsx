import type { PropsWithChildren } from "react"

interface ContainerProps extends PropsWithChildren<{}> {
  margin?: string;
}

const Container = ({ children, margin='my-12' }: ContainerProps) => {
  return (
    <section className={`w-[80%] mx-auto ${margin} flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-0`}>
      {children}
    </section>
  )
}

export default Container